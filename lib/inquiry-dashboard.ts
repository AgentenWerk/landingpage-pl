export type PolishQualificationValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  tenders: string;
  teamSize: string;
  trades: string[];
  formatsAndSystems: string[];
  dataAvailability: string;
};

type ForwardResult =
  | { ok: true }
  | { ok: false; skipped?: boolean; error: string };

function dashboardEndpoint(): string | null {
  const explicit = process.env.INQUIRY_DASHBOARD_ENDPOINT?.trim();
  if (explicit) return explicit;

  const baseUrl = process.env.INQUIRY_DASHBOARD_URL?.trim().replace(/\/+$/, "");
  return baseUrl ? `${baseUrl}/api/inquiries` : null;
}

export async function forwardPolishInquiryToDashboard(
  values: PolishQualificationValues,
  leadId: string,
  request: Request,
): Promise<ForwardResult> {
  const endpoint = dashboardEndpoint();
  const apiKey = process.env.INQUIRY_DASHBOARD_API_KEY?.trim();

  if (!endpoint || !apiKey) {
    const error =
      "INQUIRY_DASHBOARD_URL/ENDPOINT or INQUIRY_DASHBOARD_API_KEY is missing.";

    if (process.env.NODE_ENV === "production") {
      return { ok: false, error };
    }

    console.warn(`[inquiry-dashboard] skipped forwarding; ${error}`);
    return { ok: false, skipped: true, error };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        source: "ki-kalkulant-pl",
        externalId: leadId,
        contact: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
        },
        summary: `${values.company} - ${values.name}`,
        payload: values,
        metadata: {
          landingPage: "ki-kalkulant-pl",
          locale: "pl-PL",
          localReceivedAt: new Date().toISOString(),
          referer: request.headers.get("referer"),
          userAgent: request.headers.get("user-agent"),
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        ok: false,
        error: `Dashboard returned ${response.status}: ${text}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown forwarding error",
    };
  }
}
