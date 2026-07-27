import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Polish Kosztorysant AI landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pl"/i);
  assert.match(
    html,
    /<title>Kosztorysant AI \| Szybsze kosztorysy z przedmiarów i ofert<\/title>/i,
  );
  assert.match(html, /Kosztorysant AI/);
  assert.match(html, /Więcej kosztorysów ofertowych/);
  assert.match(html, /Norma \/ ZUZIA \/ Rodos/);
  assert.match(html, /id="formularz"/);
  assert.match(html, /Poproś o wstępną ocenę/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("includes Polish legal pages with localized privacy language", async () => {
  const [legalResponse, privacyResponse] = await Promise.all([
    render("/informacje-prawne"),
    render("/polityka-prywatnosci"),
  ]);

  assert.equal(legalResponse.status, 200);
  assert.equal(privacyResponse.status, 200);

  const [legalHtml, privacyHtml] = await Promise.all([
    legalResponse.text(),
    privacyResponse.text(),
  ]);

  assert.match(legalHtml, /Informacje prawne/);
  assert.match(legalHtml, /AgentLayer AI L\.L\.C-FZ/);
  assert.match(legalHtml, /105507193800001/);
  assert.match(legalHtml, /AgentenWerk KI GmbH in Gründung/);
  assert.match(privacyHtml, /Polityka prywatności/);
  assert.match(privacyHtml, /trybie demonstracyjnym i nie przesyła/);
  assert.match(privacyHtml, /art\. 6 ust\. 1 lit\. b i f RODO/);
  assert.match(privacyHtml, /Prezesa Urzędu Ochrony Danych Osobowych/);
  assert.match(privacyHtml, /Zjednoczonych Emiratach Arabskich/);
});

test("removes starter assets and includes the Polish social card", async () => {
  const [page, layout, landing, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LandingPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<LandingPage \/>/);
  assert.match(layout, /lang="pl"/);
  assert.match(layout, /Inter/);
  assert.match(layout, /og\.png/);
  assert.match(landing, /Proces AI dla instalacji sanitarnych/);
  assert.match(packageJson, /"name": "kosztorysant-ai-landing-page"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("../app/qa-mobile", import.meta.url)));
  await access(new URL(".openai/hosting.json", projectRoot));
});
