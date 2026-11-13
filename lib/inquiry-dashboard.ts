export type QualificationValues = {
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
  | { ok: false; error: string };

function dashboardEndpoint(): string | null {
  const explicit = process.env.INQUIRY_DASHBOARD_ENDPOINT?.trim();
  if (explicit) return explicit;

  const baseUrl = process.env.INQUIRY_DASHBOARD_URL?.trim().replace(/\/+$/, "");
  return baseUrl ? `${baseUrl}/api/inquiries` : null;
}

export async function forwardInquiryToDashboard(
  values: QualificationValues,
  leadId: string,
  request: Request,
): Promise<ForwardResult> {
  const endpoint = dashboardEndpoint();
  const apiKey = process.env.INQUIRY_DASHBOARD_API_KEY?.trim();

  if (!endpoint || !apiKey) {
    const error =
      "INQUIRY_DASHBOARD_URL/ENDPOINT or INQUIRY_DASHBOARD_API_KEY is missing.";

    return { ok: false, error };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        // The existing dashboard API key is scoped to this inbox.
        source: "ki-kalkulant",
        externalId: leadId,
        contact: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
        },
        summary: `[PL] ${values.company} - ${values.name}`,
        payload: values,
        metadata: {
          landingPage: "kosztorysant-ai",
          website: "https://kosztorysant-ai.pl",
          locale: "pl-PL",
          country: "PL",
          localReceivedAt: new Date().toISOString(),
          referer: request.headers.get("referer"),
          userAgent: request.headers.get("user-agent"),
        },
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `Dashboard returned ${response.status}`,
      };
    }

    const result = (await response.json()) as { ok?: boolean; inquiryId?: string };
    if (result.ok !== true || !result.inquiryId) {
      return { ok: false, error: "Dashboard did not confirm the saved inquiry." };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown forwarding error",
    };
  }
}
