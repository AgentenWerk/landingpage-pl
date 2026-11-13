const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Exercise the real route and forwarding module without running a Next server.
function loadTypeScript(relativePath, imports = {}) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const requireModule = mod.require.bind(mod);
  mod.require = (id) => imports[id] ?? requireModule(id);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  mod._compile(outputText, filename);
  return mod.exports;
}

const forwarding = loadTypeScript("lib/inquiry-dashboard.ts");
const { POST } = loadTypeScript("app/api/qualification/route.ts", {
  "@/lib/inquiry-dashboard": forwarding,
});
const originalFetch = global.fetch;
const keys = ["INQUIRY_DASHBOARD_URL", "INQUIRY_DASHBOARD_ENDPOINT", "INQUIRY_DASHBOARD_API_KEY"];
const originalEnv = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
after(() => {
  global.fetch = originalFetch;
  for (const key of keys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

const values = {
  name: "  Jan Żółć  ", company: "Test sp. z o.o.", email: "test@example.com",
  phone: "+48 123 456 789", city: "Łódź", tenders: "3–5", teamSize: "2",
  trades: ["Ogrzewanie i technologia cieplna", "Instalacje wod.-kan."],
  formatsAndSystems: ["Norma PRO / EXPERT", "ATH / ATH2 / KST / XML"],
  dataAvailability: "Częściowo",
};
function request(body, headers = {}) {
  return new Request("https://kosztorysant-ai.pl/api/qualification", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("invalid and oversized submissions never reach the dashboard", async () => {
  global.fetch = async () => assert.fail("Invalid data reached the dashboard");
  for (const body of ["{", "[]", {}, { ...values, email: "invalid" }, { ...values, name: " " }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal((await POST(request({ ...values, company: "x".repeat(17000) }))).status, 413);
});

test("honeypot and rate limit block automated submissions", async () => {
  global.fetch = async () => assert.fail("Spam reached the dashboard");
  assert.equal((await POST(request({ website: "spam.example" }))).status, 200);
  for (let i = 0; i < 5; i++) {
    await POST(request({}, { "x-nf-client-connection-ip": "192.0.2.1" }));
  }
  const response = await POST(request({}, { "x-nf-client-connection-ip": "192.0.2.1" }));
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("Retry-After")) > 0);
});

test("missing credentials cannot produce a false success", async () => {
  for (const key of keys) delete process.env[key];
  global.fetch = async () => assert.fail("Called dashboard without credentials");
  const response = await POST(request(values));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});

test("Polish answers reach the Polish source used by recipient scopes", async () => {
  process.env.INQUIRY_DASHBOARD_URL = "https://dashboard.example/";
  process.env.INQUIRY_DASHBOARD_API_KEY = "test-only-key";
  global.fetch = async (url, options) => {
    assert.equal(url, "https://dashboard.example/api/inquiries");
    assert.equal(options.headers.Authorization, "Bearer test-only-key");
    const body = JSON.parse(options.body);
    assert.equal(body.source, "ki-kalkulant-pl");
    assert.match(body.externalId, /^lead_/);
    assert.match(body.summary, /^\[PL\]/);
    assert.equal(body.contact.name, "Jan Żółć");
    assert.deepEqual(body.payload, { ...values, name: "Jan Żółć" });
    assert.equal(body.metadata.locale, "pl-PL");
    assert.equal(body.metadata.landingPage, "kosztorysant-ai");
    return Response.json({ ok: true, inquiryId: "saved-test-inquiry" }, { status: 201 });
  };
  const response = await POST(request(values));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});

test("dashboard rejection, timeout, and unconfirmed saves remain failures", async () => {
  for (const fakeFetch of [
    async () => Response.json({ ok: false }, { status: 403 }),
    async () => { throw new Error("Timed out"); },
    async () => Response.json({ ok: false }),
    async () => Response.json({ ok: true }),
    async () => new Response("not JSON"),
  ]) {
    global.fetch = fakeFetch;
    const response = await POST(request(values));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  }
});
