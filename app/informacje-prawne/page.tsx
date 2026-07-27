import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informacje prawne | Kosztorysant AI",
  description:
    "Dane podmiotów odpowiedzialnych za serwis Kosztorysant AI.",
  alternates: { canonical: "/informacje-prawne" },
  openGraph: {
    title: "Informacje prawne | Kosztorysant AI",
    description:
      "Dane podmiotów odpowiedzialnych za serwis Kosztorysant AI.",
    url: "/informacje-prawne",
  },
};

type DetailRow = [string, React.ReactNode];

const dubaiDetails: DetailRow[] = [
  ["Firma", "AgentLayer AI L.L.C-FZ"],
  ["Forma prawna", "Limited Liability Company, Meydan Free Zone"],
  ["Numer licencji", "2650237.01"],
  ["Numer rejestracyjny", "2650237"],
  [
    "Adres",
    "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
  ],
  ["E-mail", "dk@ki-kalkulant.de"],
  [
    "Dyrektor zarządzający (CEO)",
    <ExternalLink
      key="daniil-klubov"
      href="https://www.linkedin.com/in/daniil-klubov/"
    >
      Daniil Klubov
    </ExternalLink>,
  ],
  ["Ważność licencji", "od 25.06.2026 do 24.06.2027"],
  [
    "Zakres działalności",
    "Innovation & Artificial Intelligence Research & Consultancies; Artificial Intelligence Developing",
  ],
  [
    "Rola w serwisie",
    "Współodpowiedzialny operator niniejszego serwisu internetowego",
  ],
];

const viennaDetails: DetailRow[] = [
  ["Firma", "AgentenWerk KI GmbH in Gründung"],
  ["Siedziba", "Wiedeń, Austria"],
  [
    "Adres prowadzenia działalności",
    "Argentinierstraße 42-35, 1040 Wien, Österreich",
  ],
  ["E-mail", "rares@ki-kalkulant.de"],
  ["Telefon", "+43 670 608 45 69"],
  [
    "Wspólnik zarządzający",
    <ExternalLink
      key="alexandru-rares-bacila"
      href="https://www.linkedin.com/in/alexandru-rares-bacila-791005135/"
    >
      Alexandru-Rares Bacila
    </ExternalLink>,
  ],
  ["Numer w rejestrze przedsiębiorców", "w trakcie rejestracji"],
  ["Sąd rejestrowy", "zostanie uzupełniony po rejestracji"],
  ["Numer VAT UE", "zostanie uzupełniony po nadaniu"],
  [
    "Przedmiot działalności",
    "Rozwój i doradztwo w zakresie oprogramowania wykorzystującego AI w procesach kosztorysowania i ofertowania",
  ],
  [
    "Rola w serwisie",
    "Współodpowiedzialny operator niniejszego serwisu internetowego",
  ],
  [
    "Profil serwisu",
    "Informacje o procesach wspieranych przez AI w kosztorysowaniu instalacji sanitarnych, HVAC, elektrycznych i teletechnicznych",
  ],
];

export default function LegalInformationPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#17202a]">
      <section className="border-b border-[var(--line)] bg-[#15202a] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-[#d8e4e8] transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Wróć na stronę główną
          </Link>
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Informacje prawne
            </h1>
            <p className="mt-4 text-base leading-7 text-[#d8e4e8]">
              Dane usługodawców i podmiotów odpowiedzialnych za serwis
              Kosztorysant AI.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f2]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:px-10">
          <EntityCard
            eyebrow="Dubaj"
            title="AgentLayer AI L.L.C-FZ"
            details={dubaiDetails}
          />
          <EntityCard
            eyebrow="Wiedeń"
            title="AgentenWerk KI GmbH in Gründung"
            details={viennaDetails}
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
          <p className="rounded-lg border border-[#d9dedc] bg-white p-5 text-sm leading-7 text-[#4d5961]">
            Spółka AgentenWerk KI GmbH jest w trakcie tworzenia i rejestracji.
            Numer w rejestrze przedsiębiorców, właściwy sąd rejestrowy oraz
            numer VAT UE zostaną uzupełnione po ich nadaniu.
          </p>
        </div>
      </section>
    </main>
  );
}

function EntityCard({
  eyebrow,
  title,
  details,
}: {
  eyebrow: string;
  title: string;
  details: DetailRow[];
}) {
  return (
    <article className="rounded-lg border border-[#d9dedc] bg-white p-5 shadow-[0_18px_50px_rgba(23,32,42,0.06)] sm:p-6">
      <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight">{title}</h2>
      <dl className="mt-6 grid gap-4">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 border-t border-[#e6ebe9] pt-4 sm:grid-cols-[11rem_1fr] sm:gap-4"
          >
            <dt className="text-sm font-bold text-[#17202a]">{label}</dt>
            <dd className="text-sm leading-6 text-[#4d5961]">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-[var(--accent-dark)] underline decoration-[#9db8c9] underline-offset-4 transition hover:text-[var(--accent)]"
    >
      {children}
    </a>
  );
}
