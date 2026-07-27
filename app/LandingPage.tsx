"use client";

import { FormEvent, ReactNode, useRef, useState } from "react";

const facts = [
  "Przedmiar robót",
  "KNR / KNNR",
  "ATH / KST / XML",
  "Excel / PDF",
  "Norma / ZUZIA / Rodos",
];

const heroWorkflow = [
  { title: "Przedmiar odczytany", text: "128 pozycji" },
  { title: "Ceny odnalezione", text: "oferty dopasowane" },
  { title: "Stawki gotowe", text: "wraz ze źródłem" },
  { title: "Kontrola skupiona", text: "tylko 13 punktów" },
];

const reviewRows = [
  {
    title: "Pompa ciepła 80 kW",
    code: "Poz. 3.2.15",
    value: "76 439 zł",
    status: "Do akceptacji",
  },
  {
    title: "Separator zanieczyszczeń",
    code: "Poz. 3.4.08",
    value: "sprawdź",
    status: "Punkt kontroli",
  },
];

const problemPoints = [
  {
    label: "Cena jedn.",
    title: "Uzupełnianie cen jednostkowych",
    text: "Materiały, robocizna, sprzęt, narzuty i komentarze ponownie trafiają do Normy, ZUZII, Rodosa albo Excela.",
  },
  {
    label: "Źródła",
    title: "Szukanie danych",
    text: "Cenniki, oferty dostawców, poprzednie realizacje, pliki PDF i załączniki są rozproszone po wielu folderach.",
  },
  {
    label: "Nietypowe",
    title: "Weryfikacja trudnych pozycji",
    text: "Rozwiązania równoważne, podobne realizacje i aktualne ceny trzeba porównać przed upływem terminu.",
  },
  {
    label: "Ryzyko",
    title: "Wychwytywanie braków",
    text: "Niejasne wymagania, brakujące zakresy, alternatywy i odchylenia cenowe nie mogą umknąć w natłoku danych.",
  },
];

const agentPoints = [
  {
    step: "1",
    title: "Czyta dokumentację",
    text: "Przedmiar, STWiORB, pliki PDF, ATH/KST, Excel i załączniki.",
  },
  {
    step: "2",
    title: "Znajduje dopasowania",
    text: "Cenniki, oferty dostawców, archiwalne realizacje i podobne pozycje.",
  },
  {
    step: "3",
    title: "Przygotowuje propozycje",
    text: "Ceny jednostkowe, źródła, poziom pewności i komentarze.",
  },
  {
    step: "4",
    title: "Oznacza kwestie otwarte",
    text: "Braki danych, założenia, rozbieżności i punkty kontroli.",
  },
];

const todayRows = [
  { title: "Szuka", text: "pozycji, załączników i wymagań" },
  { title: "Porównuje", text: "cenniki, oferty i archiwalne realizacje" },
  { title: "Dobiera", text: "nakłady, normatywy i stawki" },
  { title: "Przenosi", text: "ceny, komentarze i źródła" },
  { title: "Zapamiętuje", text: "braki, warianty i odchylenia" },
];

const aiRows = [
  { title: "Analizuje", text: "przedmiar i załączniki" },
  { title: "Proponuje", text: "ceny, źródła i dane porównawcze" },
  { title: "Odnajduje", text: "podobne realizacje i stawki" },
  { title: "Oznacza", text: "niepewności i braki w zakresie" },
  { title: "Przekazuje", text: "pozycje do sprawdzenia i akceptacji" },
];

const preparationSteps = [
  {
    title: "Karta techniczna odnaleziona",
    text: "Karta doboru · pompa ciepła 80 kW",
  },
  {
    title: "Oferta dostawcy przypisana",
    text: "Oferta 26/0257 · 76 439,46 zł netto",
  },
  {
    title: "Archiwalne realizacje sprawdzone",
    text: "Znaleziono 2 analogiczne pozycje",
  },
  {
    title: "Punkt kontroli oznaczony",
    text: "Potwierdzić parametry rozwiązania równoważnego",
  },
];

const benefits = [
  {
    icon: "↘",
    title: "Mniej ręcznego wprowadzania",
    text: "Pozycje są przygotowane, a nie składane od zera.",
  },
  {
    icon: "◷",
    title: "Szybsze przygotowanie oferty",
    text: "Powtarzalne pozycje są od razu gotowe do sprawdzenia.",
  },
  {
    icon: "✓",
    title: "Łatwiejsza weryfikacja",
    text: "Każda propozycja pokazuje źródło i poziom pewności.",
  },
  {
    icon: "!",
    title: "Mniejsze ryzyko",
    text: "Braki i odchylenia są widoczne przed złożeniem oferty.",
  },
  {
    icon: "↻",
    title: "Wiedza zostaje w firmie",
    text: "Archiwalne kosztorysy stają się użytecznym punktem odniesienia.",
  },
];

const trustPoints = [
  {
    title: "Nieuporządkowane dane to norma",
    text: "Foldery projektowe, pliki PDF, arkusze i stare oferty są najpierw porządkowane.",
  },
  {
    title: "Każda cena ma uzasadnienie",
    text: "Każda propozycja pokazuje źródło, poziom pewności i punkt do sprawdzenia.",
  },
  {
    title: "Kontrola zostaje po Państwa stronie",
    text: "Nie ma automatycznej akceptacji. Kosztorysant koryguje i zatwierdza.",
  },
];

const dataItems = [
  "archiwalne kosztorysy, przedmiary i oferty",
  "kalkulacje własne i rozliczenia wykonawcze",
  "cenniki, katalogi KNR/KNNR i karty materiałowe",
  "oferty dostawców i podwykonawców",
  "ATH, ATH2, KST, XML, Excel, PDF oraz IFC",
  "akceptacje i punkty kontroli",
];

const implementationModules = [
  {
    label: "Główny proces",
    time: "ok. 12 tygodni",
    title: "Wycena przedmiarów",
    text: "Analiza przedmiarów, propozycje cen, oznaczanie punktów kontroli i przygotowanie do zatwierdzenia.",
    bullets: [
      "archiwalne realizacje, cenniki i oferty",
      "materiały, nakłady, normy i źródła",
      "ostateczna akceptacja kosztorysanta",
    ],
    primary: true,
  },
  {
    label: "Moduł dodatkowy",
    time: "ok. 6 tygodni",
    title: "PFU i opisy funkcjonalne",
    text: "Przekładanie wymagań funkcjonalnych na wewnętrzne pozycje i zakresy systemów.",
    bullets: [
      "więcej interpretacji technicznej",
      "szersza kontrola ekspercka",
    ],
  },
  {
    label: "Moduł dodatkowy",
    time: "ok. 3–4 tygodni",
    title: "Zapytania do dostawców",
    text: "Wysyłanie zapytań, przypomnienia, porównanie ofert i przygotowanie zestawienia cen.",
    bullets: [
      "dobór dostawców według grup materiałowych",
      "porównanie i uporządkowanie ofert",
    ],
  },
];

const goodFit = [
  "regularnie przygotowują kosztorysy ofertowe na podstawie przedmiarów robót",
  "pracują w Normie, ZUZII, Rodosie lub Excelu",
  "wykorzystują cenniki, oferty i archiwalne kosztorysy",
  "tracą czas przed terminem złożenia oferty",
  "chcą składać więcej ofert tym samym zespołem",
];

const badFit = [
  "wyceniają roboty tylko sporadycznie",
  "nie mają niemal żadnych danych historycznych",
  "nie mają powtarzalnego procesu kosztorysowania",
  "oczekują gotowego programu bez dopasowania",
];

const cities = [
  "Warszawa",
  "Kraków",
  "Wrocław",
  "Poznań",
  "Gdańsk",
  "Łódź",
  "Katowice",
  "Szczecin",
  "Lublin",
  "Bydgoszcz",
  "Rzeszów",
  "Białystok",
];

const trades = [
  "Ogrzewanie i technologia cieplna",
  "Instalacje wod.-kan.",
  "Wentylacja i klimatyzacja",
  "Chłodnictwo",
  "Automatyka i BMS",
  "Instalacje elektryczne i teletechniczne",
  "Generalne wykonawstwo",
  "Inny zakres",
];

const formatsAndSystems = [
  "Norma PRO / EXPERT",
  "ZUZIA / Rodos / SeKo",
  "ATH / ATH2 / KST / XML",
  "KNR / KNNR / Sekocenbud / Intercenbud",
  "BIM / IFC",
  "Excel / PDF / własne zestawienia",
  "ERP, system wewnętrzny lub inny",
];

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <AgentExplanationSection />
      <SolutionSection />
      <ExampleWorkflowSection />
      <InlineCTA />
      <BenefitsSection />
      <DataTrustSection />
      <ImplementationSection />
      <AudienceSection />
      <CTASection />
      <QualificationForm />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-[#fbfaf6]/90">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 px-5 py-8 sm:px-8 lg:min-h-[78svh] lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-12">
        <div className="min-w-0 max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-[#b8c9d4] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[var(--accent-dark)] sm:text-sm">
            Proces AI dla instalacji sanitarnych, HVAC i elektrycznych
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-[#111820] sm:text-5xl lg:text-6xl">
            Kosztorysant AI
          </h1>
          <p className="mt-5 max-w-xl text-2xl font-semibold leading-8 text-[#17202a] sm:text-3xl sm:leading-10">
            Więcej kosztorysów ofertowych. Bez dodatkowej pracy ręcznej.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#4d5961] sm:text-lg">
            Czyta przedmiary, znajduje ceny, proponuje stawki i wskazuje ryzyka.
            Kosztorysant sprawdza już tylko kwestie wymagające fachowej decyzji.
          </p>
          <div className="mt-6">
            <PrimaryLink>Sprawdź dopasowanie</PrimaryLink>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#68737a]">
            Dla polskich wykonawców, którzy regularnie wyceniają przedmiary i
            przygotowują oferty przetargowe.
          </p>
          <div className="mt-4 flex max-w-xl flex-wrap gap-2">
            {facts.map((item) => (
              <span
                key={item}
                className="rounded-md border border-[#dfe5e3] bg-white/45 px-2 py-1 text-[11px] font-semibold leading-4 text-[#5f6b72]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative min-w-0"
          aria-label="Proces Kosztorysanta AI"
        >
          <div className="absolute -inset-3 rounded-[1.5rem] bg-[#1f5f8f]/8 blur-2xl" />
          <div className="hero-product-card relative min-w-0 overflow-hidden rounded-lg border border-[#cbd7dc] bg-white shadow-[0_24px_70px_rgba(23,32,42,0.12)]">
            <div className="border-b border-[#dce4e4] bg-[#15202a] px-4 py-3 text-white">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase text-[#9dc3dc]">
                    Projekt WAW-2026-041
                  </p>
                  <p className="mt-1 text-base font-semibold leading-tight">
                    Przedmiar instalacji · Pompy ciepła
                  </p>
                </div>
                <span className="rounded-md bg-[#e6f0f5] px-3 py-1 text-xs font-bold text-[#16476b]">
                  Plik ATH gotowy
                </span>
              </div>
            </div>

            <div className="bg-[#f5f6f3] p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-2">
                <WorkflowNode label="Przedmiar" value="128 pozycji" />
                <WorkflowNode label="Kosztorysant" value="13 punktów do decyzji" />
              </div>

              <div className="hero-metric mt-3 rounded-md border border-[#cfe3d5] bg-[#f1f8f3] px-3 py-2">
                <p className="text-sm font-bold leading-5 text-[#28533b]">
                  31 pozycji gotowych do akceptacji · 91% ze źródłem
                </p>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[0.82fr_1.18fr]">
                <section className="rounded-md border border-[#d9dedc] bg-white p-3">
                  <p className="text-xs font-bold uppercase text-[var(--accent-dark)]">
                    AI przygotowało
                  </p>
                  <ol className="mt-3 grid gap-2">
                    {heroWorkflow.map((step, index) => (
                      <li
                        key={step.title}
                        className="hero-agent-step flex items-center gap-3 rounded-md bg-[#fbfaf6] px-3 py-2"
                      >
                        <span className="hero-agent-dot flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-dark)] text-[11px] font-bold text-white ring-[3px] ring-[#e7f0f5]">
                          {index + 1}
                        </span>
                        <div className="grid min-w-0 flex-1 gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                          <p className="text-xs font-bold leading-4 text-[#17202a]">
                            {step.title}
                          </p>
                          <p className="text-[11px] leading-4 text-[#64717a] sm:text-right">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="rounded-md border border-[#d9dedc] bg-white p-3">
                  <p className="inline-flex rounded-md bg-[#eef5f8] px-2 py-1 text-xs font-bold uppercase text-[var(--accent-dark)]">
                    Punkty do decyzji
                  </p>
                  <div className="mt-3 grid gap-2">
                    {reviewRows.map((row) => (
                      <article
                        key={row.code}
                        className="hero-position-row rounded-md border border-[#d9dedc] bg-[#fbfaf6] px-3 py-2"
                      >
                        <div className="grid grid-cols-[1fr_auto] gap-3">
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[var(--accent-dark)]">
                              {row.code}
                            </p>
                            <p className="truncate text-sm font-semibold leading-5 text-[#17202a]">
                              {row.title}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-[#17202a]">
                              {row.value}
                            </p>
                            <span
                              className={
                                row.status === "Do akceptacji"
                                  ? "hero-status-chip mt-1 inline-flex rounded-md bg-[#edf7f0] px-2 py-1 text-[10px] font-bold text-[#28533b]"
                                  : "hero-status-chip mt-1 inline-flex rounded-md bg-[#fff8e7] px-2 py-1 text-[10px] font-bold text-[#785b17]"
                              }
                            >
                              {row.status}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowNode({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#d9dedc] bg-white px-2 py-2 sm:px-3">
      <p className="text-[10px] font-bold uppercase leading-3 text-[#59666e] sm:text-[11px]">
        {label}
      </p>
      <p className="mt-1 text-xs font-semibold leading-4 text-[#17202a] sm:text-sm sm:leading-5">
        {value}
      </p>
    </div>
  );
}

function ProblemSection() {
  return (
    <SectionShell
      eyebrow="Problem"
      title="Za dużo przygotowań przed właściwym kosztorysowaniem."
      intro="Przedmiar robót to często 100–400 pozycji, kilka źródeł danych i krótki termin na złożenie oferty."
      tone="white"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {problemPoints.map((point) => (
          <article
            key={point.title}
            className="min-w-0 rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-4 shadow-[0_10px_30px_rgba(23,32,42,0.04)] sm:p-5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex shrink-0 items-center justify-center rounded-md border border-[#b8c9d4] bg-white px-2.5 py-1 text-xs font-bold text-[var(--accent-dark)]">
                {point.label}
              </span>
              <h3 className="min-w-0 text-lg font-semibold leading-6 text-[#17202a]">
                {point.title}
              </h3>
            </div>
            <p className="break-words text-sm leading-6 text-[#3f4b54] sm:text-base sm:leading-7">
              {point.text}
            </p>
          </article>
        ))}
      </div>
      <Callout>
        Wąskim gardłem nie jest wiedza kosztorysanta. Jest nim czas tracony na
        szukanie danych.
      </Callout>
    </SectionShell>
  );
}

function AgentExplanationSection() {
  return (
    <SectionShell
      eyebrow="Czym jest agent AI?"
      title="Agent AI to cyfrowy asystent kosztorysanta."
      intro="Nie działa na własną rękę. Realizuje ustalony proces, przygotowuje dane do decyzji i jasno pokazuje, co wymaga fachowej weryfikacji."
      tone="white"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {agentPoints.map((point) => (
          <article
            key={point.title}
            className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-4 shadow-[0_10px_30px_rgba(23,32,42,0.04)] sm:p-5"
          >
            <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#b8c9d4] bg-white text-sm font-bold text-[var(--accent-dark)]">
              {point.step}
            </div>
            <h3 className="text-base font-semibold leading-6 text-[#17202a] sm:text-lg">
              {point.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#52616b]">
              {point.text}
            </p>
          </article>
        ))}
      </div>
      <Callout>
        Krótko mówiąc: AI wykonuje pracę przygotowawczą. Kosztorysant podejmuje
        decyzję.
      </Callout>
    </SectionShell>
  );
}

function SolutionSection() {
  return (
    <SectionShell
      eyebrow="Rozwiązanie"
      title="Kosztorysant pozostaje ekspertem. AI przejmuje pracę przygotowawczą."
      intro="Kosztorysant AI zamienia rozproszone dokumenty w uporządkowaną podstawę do podjęcia decyzji."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RoleCard
          eyebrow="Dzisiaj"
          title="Kosztorysant zajęty szukaniem danych"
          rows={todayRows}
          tone="muted"
        />
        <RoleCard
          eyebrow="Z Kosztorysantem AI"
          title="Kosztorysant skupiony na decyzjach technicznych"
          rows={aiRows}
          tone="success"
        />
      </div>
      <div className="mt-5 rounded-lg border border-[#cbd7dc] bg-[#eef5f8] p-4 sm:p-5">
        <p className="text-lg font-semibold leading-7 text-[#17202a]">
          AI szuka i porównuje. Kosztorysant decyduje.
        </p>
      </div>
    </SectionShell>
  );
}

function RoleCard({
  eyebrow,
  title,
  rows,
  tone,
}: {
  eyebrow: string;
  title: string;
  rows: typeof todayRows;
  tone: "muted" | "success";
}) {
  const success = tone === "success";
  return (
    <article
      className={
        success
          ? "rounded-lg border border-[#bfd8ca] bg-[#f4faf6] p-4 shadow-[0_14px_36px_rgba(23,32,42,0.05)] sm:p-5"
          : "rounded-lg border border-[#d9dedc] bg-white p-4 shadow-[0_10px_30px_rgba(23,32,42,0.035)] sm:p-5"
      }
    >
      <p
        className={
          success
            ? "text-sm font-bold uppercase text-[#28533b]"
            : "text-sm font-bold uppercase text-[#66727a]"
        }
      >
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-7 text-[#17202a] sm:text-2xl sm:leading-8">
        {title}
      </h3>
      <div className="mt-5 grid gap-2">
        {rows.map((row) => (
          <div
            key={row.title}
            className={
              success
                ? "flex gap-3 rounded-md border border-[#cfe3d5] bg-white px-3 py-2.5"
                : "flex gap-3 rounded-md border border-[#e1e5e3] bg-[#fbfaf6] px-3 py-2.5"
            }
          >
            <span
              className={
                success
                  ? "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4a8f64]"
                  : "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#9aa5aa]"
              }
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-semibold leading-5 text-[#17202a] sm:text-base sm:leading-6">
                {row.title}
              </h4>
              <p className="mt-0.5 text-sm leading-5 text-[#52616b]">
                {row.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function ExampleWorkflowSection() {
  const decisionItems = [
    { label: "Proponowana cena jedn.", value: "76 439,46 zł", tone: "blue" },
    { label: "Poziom pewności", value: "91%", tone: "blue" },
    { label: "Status", value: "Pozycja gotowa do akceptacji", tone: "green" },
    {
      label: "Kwestia otwarta",
      value: "Potwierdzić parametry i równoważność urządzenia",
      tone: "amber",
    },
  ];

  return (
    <SectionShell
      eyebrow="Przykład"
      title="Jedna pozycja przedmiarowa. Kompletnie przygotowana."
      intro="Kosztorysant AI gromadzi źródła, proponuje cenę jednostkową i oznacza kwestię wymagającą decyzji technicznej — zanim kosztorysant zacznie szukać."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-[#cfd9dc] bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
            Przedmiar robót
          </p>
          <p className="mt-4 text-sm font-bold text-[var(--accent-dark)]">
            Poz. 3.2.15
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-[#17202a] sm:text-2xl">
            Pompa ciepła powietrze/woda 80 kW
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#52616b]">
            2,000 kpl. · urządzenie równoważne wg STWiORB
          </p>
          <p className="mt-4 text-sm leading-6 text-[#52616b]">
            Przedmiar określa zakres, a w dokumentacji projektowej znajdują się
            parametry techniczne, oferta dostawcy i możliwe pozycje porównawcze.
          </p>
          <div className="mt-5 rounded-md border border-[#ead8aa] bg-[#fff9e9] p-4">
            <p className="text-sm font-semibold leading-6 text-[#785b17]">
              Wymóg równoważności: potwierdzić parametry oferowanego urządzenia
            </p>
          </div>
          <p className="mt-4 rounded-md border border-[#d9dedc] bg-[#fbfaf6] px-3 py-2 text-xs font-semibold text-[#59666e]">
            Źródło: przedmiar i STWiORB · 107 stron
          </p>
        </article>

        <article className="rounded-lg border border-[#cfd9dc] bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
            AI przygotowuje
          </p>
          <ul className="mt-4 grid gap-2">
            {preparationSteps.map((step) => (
              <li
                key={step.title}
                className="flex gap-3 rounded-md border border-[#d9dedc] bg-[#fbfaf6] px-3 py-2.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e7f0f5] text-xs font-bold text-[var(--accent-dark)]">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-bold leading-5 text-[#17202a]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#64717a]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-[#cfd9dc] bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
            Kosztorysant decyduje
          </p>
          <dl className="mt-4 grid gap-2">
            {decisionItems.map((item) => (
              <div
                key={item.label}
                className={
                  item.tone === "green"
                    ? "rounded-md border border-[#cfe3d5] bg-[#f1f8f3] p-3"
                    : item.tone === "amber"
                      ? "rounded-md border border-[#ead8aa] bg-[#fff9e9] p-3"
                      : "rounded-md border border-[#d9dedc] bg-[#fbfaf6] p-3"
                }
              >
                <dt className="text-xs font-bold uppercase text-[#59666e]">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-5 text-[#17202a]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-md border border-[#bad4c5] bg-[#edf7f0] p-3">
            <p className="text-sm font-semibold leading-6 text-[#28533b]">
              Sprawdź merytorycznie. Nie szukaj od początku.
            </p>
          </div>
        </article>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 rounded-lg border border-[#cfd9dc] bg-white p-4 shadow-sm md:grid-cols-2">
        <div className="rounded-md border border-[#d9dedc] bg-[#fbfaf6] p-4">
          <p className="text-xs font-bold uppercase text-[#59666e]">Wcześniej</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#34434c]">
            Przeczytaj przedmiar · znajdź ofertę · przepisz cenę · pamiętaj o
            brakach
          </p>
        </div>
        <div className="rounded-md border border-[#cfe3d5] bg-[#f1f8f3] p-4">
          <p className="text-xs font-bold uppercase text-[#28533b]">
            Z Kosztorysantem AI
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#28533b]">
            Propozycja, źródło, poziom pewności i punkt kontroli są już gotowe
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function InlineCTA() {
  return (
    <section className="border-b border-[#263642] bg-[#15202a]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xl font-semibold leading-7 text-white">
            Regularnie otrzymują Państwo przedmiary do wyceny?
          </p>
          <p className="mt-1 text-sm leading-6 text-[#c9d8df]">
            Sprawdzimy, czy Kosztorysant AI pasuje do liczby ofert, dostępnych
            danych i obecnego procesu.
          </p>
        </div>
        <a
          href="#formularz"
          className="inline-flex w-full shrink-0 items-center justify-center rounded-md bg-white px-5 py-3 text-base font-semibold text-[#15202a] transition hover:bg-[#e7f0f5] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#15202a] sm:w-auto"
        >
          Sprawdź dopasowanie
        </a>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <SectionShell
      eyebrow="Rezultat"
      title="Większa wydajność zespołu kosztorysowego bez zwiększania etatów."
      intro="Największą korzyścią nie jest zastąpienie wiedzy eksperckiej, lecz usunięcie czasochłonnego wyszukiwania."
      tone="white"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-4 sm:p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#e7f0f5] text-lg font-bold text-[var(--accent-dark)]">
              {benefit.icon}
            </div>
            <h3 className="text-base font-semibold leading-6 text-[#17202a] sm:text-lg">
              {benefit.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#52616b]">
              {benefit.text}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function DataTrustSection() {
  return (
    <SectionShell
      eyebrow="Dane i kontrola"
      title="Dane nie muszą być idealne. Muszą być użyteczne."
      intro="Porządkujemy dostępne przedmiary, oferty i cenniki, aby AI mogło rzetelnie wyszukiwać, porównywać i uzasadniać propozycje."
      tone="white"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="grid gap-4">
          {trustPoints.map((point, index) => (
            <article
              key={point.title}
              className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-4 shadow-[0_10px_30px_rgba(23,32,42,0.035)] sm:p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#e7f0f5] text-sm font-bold text-[var(--accent-dark)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#17202a]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#52616b]">
                    {point.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <article className="rounded-lg border border-[#cfd9dc] bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
            Co trafia do bazy wiedzy
          </p>
          <ul className="mt-4 grid gap-2">
            {dataItems.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-[#edf0ef] pb-2 text-sm text-[#46545e] last:border-b-0 last:pb-0 sm:text-base"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-md border border-[#cfe3d5] bg-[#f1f8f3] px-4 py-3">
            <p className="text-base font-semibold leading-7 text-[#28533b]">
              Rezultat: podobne pozycje, źródła i niepewne wartości są od razu
              widoczne.
            </p>
          </div>
        </article>
      </div>
    </SectionShell>
  );
}

function ImplementationSection() {
  return (
    <SectionShell
      eyebrow="Wdrożenie"
      title="W ciągu 12 tygodni Kosztorysant AI może pracować w Państwa procesie."
      intro="Start jest szybki i konkretny: analiza przedmiarów, przygotowanie cen i źródeł, oznaczenie punktów kontroli oraz czytelna ścieżka akceptacji."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.875fr_0.875fr]">
        {implementationModules.map((module) => (
          <article
            key={module.title}
            className={
              module.primary
                ? "rounded-lg border border-[#bfd8ca] bg-[#f4faf6] p-4 shadow-[0_18px_44px_rgba(23,32,42,0.08)] sm:p-5"
                : "rounded-lg border border-[#d9dedc] bg-white p-4 shadow-[0_10px_30px_rgba(23,32,42,0.035)] sm:p-5"
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={
                  module.primary
                    ? "rounded-md bg-[#dfeee4] px-2.5 py-1 text-xs font-bold text-[#28533b]"
                    : "rounded-md bg-[#eef5f8] px-2.5 py-1 text-xs font-bold text-[var(--accent-dark)]"
                }
              >
                {module.label}
              </span>
              <span className="rounded-md border border-[#d8e0df] bg-white px-2.5 py-1 text-xs font-bold text-[#52616b]">
                {module.time}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold leading-7 text-[#17202a] sm:text-2xl sm:leading-8">
              {module.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#52616b] sm:text-base sm:leading-7">
              {module.text}
            </p>
            <ul className="mt-4 grid gap-2">
              {module.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-sm leading-6 text-[#46545e]"
                >
                  <span
                    className={
                      module.primary
                        ? "mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4a8f64]"
                        : "mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                    }
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Callout>
        Po wdrożeniu głównego procesu można dodać obsługę PFU oraz zapytań do
        dostawców.
      </Callout>
    </SectionShell>
  );
}

function AudienceSection() {
  return (
    <SectionShell
      eyebrow="Dopasowanie"
      title="Warto, jeśli kosztorysowanie jest realnym wąskim gardłem."
      intro="Rozwiązanie najlepiej sprawdza się w firmach z regularnym napływem przedmiarów, ograniczoną przepustowością zespołu i danymi, które można ponownie wykorzystać."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-[#bfd8ca] bg-[#f4faf6] p-4 shadow-[0_14px_36px_rgba(23,32,42,0.05)] sm:p-5">
          <h3 className="text-xl font-semibold text-[#17202a] sm:text-2xl">
            Dobre dopasowanie dla firm, które:
          </h3>
          <BulletList items={goodFit} tone="success" />
        </article>
        <article className="rounded-lg border border-[#d9dedc] bg-[#fbfaf6] p-4 sm:p-5">
          <h3 className="text-xl font-semibold text-[#17202a] sm:text-2xl">
            Słabsze dopasowanie dla firm, które:
          </h3>
          <BulletList items={badFit} tone="muted" />
          <div className="mt-6 rounded-md border border-[#cbd7dc] bg-white p-4">
            <p className="font-semibold text-[#17202a]">
              To nie jest standardowy program z półki.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#52616b]">
              Proces powstaje wokół Państwa przedmiarów, źródeł danych i
              zasad akceptacji.
            </p>
          </div>
        </article>
      </div>
    </SectionShell>
  );
}

function BulletList({
  items,
  tone,
}: {
  items: string[];
  tone: "success" | "muted";
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[#46545e]">
          <span
            className={
              tone === "success"
                ? "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4a8f64]"
                : "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#9ca8ad]"
            }
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CTASection() {
  return (
    <section className="border-b border-[var(--line)] bg-[#15202a]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-12 text-white sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
        <div>
          <p className="text-sm font-bold uppercase text-[#9dc3dc]">
            Pierwsza rozmowa
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            Chcą Państwo sprawdzić, czy Kosztorysant AI pasuje do obecnego
            procesu?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#d8e4e8] sm:text-lg sm:leading-8">
            Prosimy wypełnić formularz. Następnie porozmawiamy o liczbie
            ofert, dostępnych danych i obecnym procesie pracy z przedmiarami.
          </p>
        </div>
        <a
          href="#formularz"
          className="inline-flex w-full items-center justify-center rounded-md bg-white px-5 py-3 text-base font-semibold text-[#15202a] transition hover:bg-[#e7f0f5] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#15202a] sm:w-auto"
        >
          Sprawdź dopasowanie
        </a>
      </div>
    </section>
  );
}

function QualificationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleRequest();
  }

  async function handleRequest() {
    const form = formRef.current;

    if (!form?.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      city: String(formData.get("city") ?? ""),
      tenders: String(formData.get("tenders") ?? ""),
      teamSize: String(formData.get("teamSize") ?? ""),
      trades: formData.getAll("trades").map(String),
      formatsAndSystems: formData.getAll("formatsAndSystems").map(String),
      dataAvailability: String(formData.get("dataAvailability") ?? ""),
    };

    setSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/qualification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setServerError(
          data.error ??
            "Nie udało się wysłać formularza. Prosimy spróbować ponownie.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError(
        "Nie udało się wysłać formularza. Prosimy spróbować ponownie.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="formularz" className="scroll-mt-6 bg-[#f8f7f2]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-18">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
            Sprawdź dopasowanie
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#121a22] sm:text-4xl">
            Czy Kosztorysant AI pasuje do Państwa firmy?
          </h2>
          <p className="mt-4 text-base leading-7 text-[#4d5961] sm:text-lg sm:leading-8">
            Trzy minuty wystarczą, aby wstępnie ocenić, czy ten proces ma
            sens w Państwa procesie.
          </p>
          <div className="mt-6 rounded-lg border border-[#cfd9dc] bg-white p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-[#17202a]">
              Podczas pierwszej rozmowy omówimy:
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#53616a] sm:text-base">
              {[
                "liczbę wycen przygotowywanych w miesiącu",
                "najbardziej czasochłonny etap przygotowania oferty",
                "używane formaty, systemy i dostępne dane",
                "zakres pierwszego pilotażu",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#cfd9dc] bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Imię i nazwisko" name="name" autoComplete="name" required />
            <TextField label="Firma" name="company" autoComplete="organization" required />
            <TextField label="E-mail" name="email" type="email" autoComplete="email" required />
            <TextField label="Numer telefonu" name="phone" type="tel" autoComplete="tel" />
            <TextField
              label="Siedziba / miasto"
              name="city"
              autoComplete="address-level2"
              list="city-options"
              required
            />
            <SelectField
              label="Liczba wycen w miesiącu"
              name="tenders"
              options={["1–2", "3–5", "6–10", "Więcej niż 10"]}
              required
            />
            <SelectField
              label="Liczba osób w zespole kosztorysowym"
              name="teamSize"
              options={["1", "2", "3–5", "Więcej niż 5"]}
              required
            />
          </div>
          <datalist id="city-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

          <CheckboxGroup
            legend="Jakie zakresy wyceniają Państwo najczęściej?"
            name="trades"
            options={trades}
          />
          <CheckboxGroup
            legend="Z jakich formatów lub systemów Państwo korzystają?"
            name="formatsAndSystems"
            options={formatsAndSystems}
          />

          <fieldset className="mt-6 rounded-md border border-[#d9dedc] p-4">
            <legend className="text-sm font-semibold text-[#26343e]">
              Czy dane historyczne są dostępne cyfrowo?
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Tak", "Częściowo", "Nie"].map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-3 rounded-md border border-[#d9dedc] px-3 py-3 text-sm font-medium text-[#40505a]"
                >
                  <input
                    type="radio"
                    name="dataAvailability"
                    value={value}
                    required
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-md bg-[var(--accent)] px-5 py-3 text-base font-semibold text-white transition hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Wysyłanie..." : "Poproś o wstępną ocenę"}
          </button>

          <p className="mt-4 max-w-2xl text-xs leading-5 text-[#68737a]">
            Dane z formularza są przetwarzane w celu oceny zapytania i
            przygotowania pierwszej rozmowy, zgodnie z zasadami opisanymi w{" "}
            <a
              href="/polityka-prywatnosci"
              className="font-semibold text-[var(--accent-dark)] underline decoration-[#9db8c9] underline-offset-4 transition hover:text-[var(--accent)]"
            >
              polityce prywatności
            </a>
            .
          </p>

          {serverError ? (
            <p
              role="alert"
              className="mt-5 rounded-md border border-[#efc5c0] bg-[#fff5f3] px-4 py-3 text-sm font-semibold text-[#8a2d24]"
            >
              {serverError}
            </p>
          ) : null}

          {submitted ? (
            <p
              role="status"
              className="mt-5 rounded-md border border-[#bad4c5] bg-[#edf7f0] px-4 py-3 text-sm font-semibold text-[#28533b]"
            >
              Dziękujemy. Skontaktujemy się z Państwem, aby ustalić termin
              pierwszej rozmowy.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  list,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  list?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#26343e]">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        list={list}
        required={required}
        className="mt-2 w-full rounded-md border border-[#cdd8dc] bg-white px-3 py-3 text-[#17202a] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[#1f5f8f]/20"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#26343e]">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 w-full rounded-md border border-[#cdd8dc] bg-white px-3 py-3 text-[#17202a] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[#1f5f8f]/20"
      >
        <option value="" disabled>
          Wybierz opcję
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset className="mt-6 rounded-md border border-[#d9dedc] p-4">
      <legend className="text-sm font-semibold text-[#26343e]">{legend}</legend>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-12 items-center gap-3 rounded-md border border-[#d9dedc] px-3 py-3 text-sm font-medium leading-5 text-[#40505a]"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="h-4 w-4 shrink-0 accent-[var(--accent)]"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#5a6871] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <p className="font-semibold text-[#17202a]">
            Agenci AI do kosztorysowania instalacji
          </p>
          <p className="mt-1">
            Proces dla przedmiarów, ATH/KST/XML, Excela i akceptacji.
          </p>
        </div>
        <nav aria-label="Informacje prawne" className="flex flex-wrap gap-2">
          <FooterLink href="/informacje-prawne">
            Informacje prawne
          </FooterLink>
          <FooterLink href="/polityka-prywatnosci">
            Polityka prywatności
          </FooterLink>
        </nav>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex w-fit items-center justify-center rounded-md border border-[#cbd7dc] bg-[#fbfaf6] px-4 py-2 font-semibold text-[#16476b] transition hover:border-[#9db8c9] hover:bg-[#eef5f8] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
    >
      {children}
    </a>
  );
}

function SectionShell({
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "light" | "white";
}) {
  return (
    <section
      className={
        tone === "white"
          ? "border-b border-[var(--line)] bg-white"
          : "border-b border-[var(--line)] bg-[#f8f7f2]"
      }
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-18">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-bold uppercase text-[var(--accent-dark)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-balance text-2xl font-semibold leading-tight text-[#121a22] sm:text-4xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-base leading-7 text-[#4d5961] sm:text-lg sm:leading-8">
              {intro}
            </p>
          ) : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 rounded-lg border border-[#cbd7dc] bg-[#eef5f8] p-4 text-base font-semibold leading-7 text-[#23313b] sm:p-5 sm:text-lg">
      {children}
    </div>
  );
}

function PrimaryLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#formularz"
      className="inline-flex w-full items-center justify-center rounded-md bg-[var(--accent)] px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 sm:w-auto"
    >
      {children}
    </a>
  );
}
