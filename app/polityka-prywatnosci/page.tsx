import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności | Kosztorysant AI",
  description:
    "Informacje o przetwarzaniu danych osobowych w serwisie Kosztorysant AI i formularzu kwalifikacyjnym.",
  alternates: { canonical: "/polityka-prywatnosci" },
  openGraph: {
    title: "Polityka prywatności | Kosztorysant AI",
    description:
      "Informacje o przetwarzaniu danych osobowych w serwisie Kosztorysant AI i formularzu kwalifikacyjnym.",
    url: "/polityka-prywatnosci",
  },
};

const controllerDetails = [
  {
    title: "AgentLayer AI L.L.C-FZ",
    rows: [
      [
        "Adres",
        "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
      ],
      ["E-mail", "dk@ki-kalkulant.de"],
      ["Reprezentowana przez", "Daniil Klubov"],
    ],
  },
  {
    title: "AgentenWerk KI GmbH in Gründung",
    rows: [
      ["Adres", "Argentinierstraße 42-35, 1040 Wien, Österreich"],
      ["E-mail", "rares@ki-kalkulant.de"],
      ["Telefon", "+43 670 608 45 69"],
      ["Reprezentowana przez", "Alexandru-Rares Bacila"],
    ],
  },
];

const formData = [
  "imię i nazwisko, firma, adres e-mail oraz opcjonalnie numer telefonu",
  "lokalizacja lub miasto",
  "liczba wycen w miesiącu i wielkość zespołu kosztorysowego",
  "branże, formaty plików, używane systemy i dostępność danych",
  "dane techniczne, takie jak czas wysłania, strona odsyłająca i informacje o przeglądarce przekazywane w nagłówku User-Agent",
];

const rights = [
  "dostęp do swoich danych osobowych",
  "sprostowanie nieprawidłowych danych",
  "usunięcie danych lub ograniczenie ich przetwarzania",
  "przenoszenie danych — jeżeli ma zastosowanie",
  "sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie",
  "wycofanie zgody w dowolnym momencie ze skutkiem na przyszłość",
  "wniesienie skargi do właściwego organu nadzorczego",
];

const summaryItems = [
  [
    "Bez analitycznych plików cookie",
    "Obecnie nie używamy narzędzi śledzących, pikseli ani plików cookie, które nie są niezbędne.",
  ],
  [
    "Formularz kontaktowy",
    "Zgłoszenia trafiają do naszego wewnętrznego systemu obsługi zapytań w celu oceny dopasowania i kontaktu.",
  ],
  [
    "Dwa punkty kontaktowe",
    "Z żądaniem dotyczącym danych można zwrócić się do każdego z podmiotów wskazanych poniżej.",
  ],
];

export default function PrivacyPolicyPage() {
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
              Polityka prywatności
            </h1>
            <p className="mt-4 text-base leading-7 text-[#d8e4e8]">
              Informacje o przetwarzaniu danych osobowych w tym serwisie oraz w
              formularzu kwalifikacyjnym.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="grid gap-3 sm:grid-cols-3">
            {summaryItems.map(([title, text]) => (
              <article
                key={title}
                className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-4"
              >
                <h2 className="text-sm font-bold text-[#17202a]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#4d5961]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div>
            <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
              Administratorzy
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight">
              Kto odpowiada za przetwarzanie danych
            </h2>
          </div>
          <div className="grid gap-5">
            {controllerDetails.map((controller) => (
              <article
                key={controller.title}
                className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-5"
              >
                <h3 className="text-lg font-semibold">{controller.title}</h3>
                <dl className="mt-4 grid gap-3">
                  {controller.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid gap-1 sm:grid-cols-[9rem_1fr]"
                    >
                      <dt className="text-sm font-bold text-[#17202a]">
                        {label}
                      </dt>
                      <dd className="text-sm leading-6 text-[#4d5961]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
            <p className="rounded-lg border border-[#d9dedc] bg-white p-5 text-sm leading-7 text-[#4d5961]">
              Wskazane podmioty mogą wspólnie odpowiadać za przetwarzanie danych
              związane z działaniem serwisu i obsługą zapytań. Z żądaniem
              dotyczącym danych można zwrócić się do każdego z nich. Wewnętrznie
              zapytania są obsługiwane przez podmiot właściwy ze względu na ich
              treść i zakres.
            </p>
          </div>
        </div>
      </section>

      <LegalSection
        eyebrow="Serwis"
        title="Dane serwerowe i techniczne działanie strony"
      >
        <p>
          Podczas korzystania z serwisu operator techniczny serwera przetwarza
          dane dostępowe potrzebne do wyświetlenia strony, zapewnienia jej
          stabilnego działania i ochrony przed nadużyciami. Mogą to być w
          szczególności: adres IP, data i godzina dostępu, odwiedzane podstrony,
          strona odsyłająca, informacje o przeglądarce i systemie operacyjnym
          oraz techniczne komunikaty o błędach.
        </p>
        <p>
          Podstawą prawną jest nasz prawnie uzasadniony interes polegający na
          zapewnieniu bezpiecznego i sprawnego działania serwisu (art. 6 ust. 1
          lit. f RODO). Logi techniczne są przechowywane tylko tak długo, jak
          jest to konieczne do obsługi serwisu, zapewnienia bezpieczeństwa i
          analizy błędów.
        </p>
      </LegalSection>

      <LegalSection eyebrow="Formularz" title="Zapytanie kwalifikacyjne">
        <p>
          Dane podane w formularzu trafiają do naszego wewnętrznego systemu
          obsługi zapytań i są przetwarzane w
          celu oceny zapytania, kontaktu i przygotowania pierwszej rozmowy.
        </p>
        <ul className="grid gap-2">
          {formData.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Podstawą przetwarzania są działania
          podejmowane na Państwa żądanie przed zawarciem umowy oraz nasz prawnie
          uzasadniony interes polegający na sprawnej obsłudze zapytań i
          komunikacji z potencjalnymi klientami, w szczególności art. 6 ust. 1
          lit. b i f RODO.
        </p>
      </LegalSection>

      <LegalSection eyebrow="Odbiorcy" title="Udostępnianie danych i usługodawcy">
        <p>
          Dane udostępniamy wyłącznie w zakresie niezbędnym do działania
          serwisu, obsługi zapytania lub wykonania obowiązków prawnych. Ich
          odbiorcami mogą być dostawcy hostingu i usług technicznych, wewnętrzny
          system obsługi zapytań, dostawcy poczty elektronicznej i narzędzi
          komunikacyjnych, a także doradcy prawni, podatkowi lub księgowi.
        </p>
        <p>
          Jeżeli usługodawca przetwarza dane osobowe w naszym imieniu, jest
          umownie zobowiązany do działania zgodnie z instrukcjami, zachowania
          poufności i stosowania odpowiednich zabezpieczeń.
        </p>
      </LegalSection>

      <LegalSection
        eyebrow="Państwa trzecie"
        title="Przetwarzanie danych poza EOG"
      >
        <p>
          W obsługę zapytań mogą być zaangażowani administratorzy lub
          usługodawcy mający siedzibę poza Unią Europejską lub Europejskim
          Obszarem Gospodarczym, w szczególności w Zjednoczonych Emiratach
          Arabskich. W takim przypadku stosujemy odpowiednie zabezpieczenia,
          postanowienia umowne lub inną podstawę przekazania wymaganą przez
          przepisy o ochronie danych.
        </p>
      </LegalSection>

      <LegalSection eyebrow="Linki zewnętrzne" title="LinkedIn i inne serwisy">
        <p>
          Na stronie z informacjami prawnymi znajdują się linki do profili w
          serwisie LinkedIn. Po kliknięciu linku zewnętrznego opuszczają Państwo
          nasz serwis. Za dalsze przetwarzanie danych osobowych odpowiada
          operator zewnętrznego serwisu.
        </p>
      </LegalSection>

      <LegalSection
        eyebrow="Automatyzacja"
        title="Brak zautomatyzowanego podejmowania decyzji"
      >
        <p>
          Na podstawie informacji z formularza nie podejmujemy wyłącznie
          zautomatyzowanych decyzji wywołujących skutki prawne ani decyzji, które
          w podobny sposób istotnie na Państwa wpływają. Dane służą jedynie do
          przygotowania i ustalenia kolejności ręcznej obsługi zapytań.
        </p>
      </LegalSection>

      <LegalSection
        eyebrow="Przechowywanie"
        title="Okres przechowywania i usuwanie danych"
      >
        <p>
          Dane dotyczące zapytania usuwamy, gdy przestają być potrzebne do jego
          obsługi. Jeżeli nie dojdzie do nawiązania współpracy, dane kontaktowe
          co do zasady usuwamy lub anonimizujemy najpóźniej po 12 miesiącach.
          Jeżeli zostanie nawiązana współpraca lub zawarta umowa, zastosowanie
          mogą mieć dłuższe okresy przechowywania wynikające z przepisów, w
          szczególności podatkowych i rachunkowych.
        </p>
      </LegalSection>

      <LegalSection
        eyebrow="Pliki cookie"
        title="Pliki cookie, analityka i śledzenie"
      >
        <p>
          Obecnie ten serwis nie używa plików cookie, które nie są niezbędne,
          zewnętrznych pikseli analitycznych ani śledzenia zachowania
          użytkowników. Jeżeli w przyszłości wdrożymy takie rozwiązania, najpierw
          zaktualizujemy tę politykę prywatności i — jeżeli będzie to wymagane —
          poprosimy o zgodę.
        </p>
      </LegalSection>

      <LegalSection eyebrow="Prawa" title="Prawa związane z ochroną danych">
        <p>
          Osobom, których dane dotyczą, przysługują — na zasadach określonych w
          RODO — w szczególności następujące prawa:
        </p>
        <ul className="grid gap-2">
          {rights.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Aby skorzystać z tych praw, wystarczy wysłać wiadomość na jeden z
          podanych wyżej adresów kontaktowych. Mogą Państwo również wnieść
          skargę do właściwego organu nadzorczego, w szczególności do Prezesa
          Urzędu Ochrony Danych Osobowych (UODO) w Polsce.
        </p>
      </LegalSection>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <p className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-5 text-sm leading-7 text-[#4d5961]">
            Stan na: 27.07.2026. Polityka prywatności będzie aktualizowana, gdy
            zmienią się cele przetwarzania, dostawcy techniczni lub używane
            narzędzia.
          </p>
        </div>
      </section>
    </main>
  );
}

function LegalSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--line)] bg-[#f8f7f2]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight">{title}</h2>
        </div>
        <div className="grid gap-5 text-sm leading-7 text-[#4d5961] sm:text-base">
          {children}
        </div>
      </div>
    </section>
  );
}
