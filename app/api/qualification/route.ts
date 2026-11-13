import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  forwardInquiryToDashboard,
  type QualificationValues,
} from "@/lib/inquiry-dashboard";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

const fieldLimits: Partial<Record<keyof QualificationValues, number>> = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  city: 120,
  tenders: 40,
  teamSize: 40,
  dataAvailability: 40,
};

type BodyReadResult =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; status: 400 | 413; error: string };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalise(body: Record<string, unknown>): QualificationValues {
  return {
    name: asString(body.name),
    company: asString(body.company),
    email: asString(body.email),
    phone: asString(body.phone),
    city: asString(body.city),
    tenders: asString(body.tenders),
    teamSize: asString(body.teamSize),
    trades: asStringArray(body.trades),
    formatsAndSystems: asStringArray(body.formatsAndSystems),
    dataAvailability: asString(body.dataAvailability),
  };
}

function validate(values: QualificationValues): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of [
    "name",
    "company",
    "email",
    "city",
    "tenders",
    "teamSize",
    "dataAvailability",
  ] as const) {
    if (!values[field]) errors[field] = "To pole jest wymagane.";
  }

  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "Prosimy podać prawidłowy adres e-mail.";
  }

  for (const [field, limit] of Object.entries(fieldLimits) as [
    keyof QualificationValues,
    number,
  ][]) {
    const value = values[field];
    if (typeof value === "string" && value.length > limit) {
      errors[field] = "Ta wartość jest zbyt długa.";
    }
  }

  if (
    values.trades.length > 10 ||
    values.formatsAndSystems.length > 10 ||
    [...values.trades, ...values.formatsAndSystems].some(
      (value) => value.length > 120,
    )
  ) {
    errors.form = "Dane formularza są nieprawidłowe.";
  }

  return errors;
}

function clientAddress(request: Request): string | null {
  const netlifyAddress = request.headers
    .get("x-nf-client-connection-ip")
    ?.trim();
  if (netlifyAddress) return netlifyAddress;

  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

function retryAfterSeconds(request: Request): number | null {
  const address = clientAddress(request);
  if (!address) return null;

  const now = Date.now();
  if (requestCounts.size > 500) {
    for (const [storedAddress, entry] of requestCounts) {
      if (entry.resetAt <= now) requestCounts.delete(storedAddress);
    }
  }

  const current = requestCounts.get(address);

  if (!current || current.resetAt <= now) {
    requestCounts.set(address, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return null;
  }

  current.count += 1;
  if (current.count <= RATE_LIMIT_MAX_REQUESTS) return null;

  return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
}

async function readJsonObject(request: Request): Promise<BodyReadResult> {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return {
      ok: false,
      status: 413,
      error: "Przesłane dane są zbyt duże.",
    };
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "Nieprawidłowe dane JSON." };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let receivedBytes = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    receivedBytes += value.byteLength;
    if (receivedBytes > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => undefined);
      return {
        ok: false,
        status: 413,
        error: "Przesłane dane są zbyt duże.",
      };
    }

    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, status: 400, error: "Nieprawidłowe dane JSON." };
  }

  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { ok: false, status: 400, error: "Oczekiwano obiektu JSON." };
  }

  return { ok: true, value: raw as Record<string, unknown> };
}

export async function POST(request: Request) {
  const retryAfter = retryAfterSeconds(request);
  if (retryAfter !== null) {
    return NextResponse.json(
      {
        ok: false,
        error: "Zbyt wiele zgłoszeń. Prosimy spróbować ponownie za chwilę.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  const body = await readJsonObject(request);
  if (!body.ok) {
    return NextResponse.json(
      { ok: false, error: body.error },
      { status: body.status },
    );
  }

  if (asString(body.value.website)) {
    return NextResponse.json({
      ok: true,
      leadId: `lead_${randomUUID()}`,
      message:
        "Dziękujemy. Skontaktujemy się, aby ustalić dogodny termin rozmowy.",
    });
  }

  const values = normalise(body.value);
  const fields = validate(values);

  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Niektóre dane są niekompletne lub nieprawidłowe.", fields },
      { status: 400 },
    );
  }

  const leadId = `lead_${randomUUID()}`;
  const forwarding = await forwardInquiryToDashboard(values, leadId, request);

  if (!forwarding.ok) {
    console.error("[inquiry-dashboard] forwarding failed:", forwarding.error);
    return NextResponse.json(
      { ok: false, error: "Nie udało się zapisać zgłoszenia. Prosimy spróbować ponownie." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    leadId,
    message:
      "Dziękujemy. Skontaktujemy się, aby ustalić dogodny termin rozmowy.",
  });
}
