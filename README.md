# Kosztorysant AI

Polska wersja landing page produktu wspierającego kosztorysantów w analizie
przedmiarów, wyszukiwaniu cen, przygotowaniu stawek i kontroli ryzyk.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona będzie dostępna pod adresem `http://localhost:3000`.

## Weryfikacja

```bash
npm run build
npm run typecheck
```

Formularz wysyła dane przez `POST /api/qualification` do LP Dashboard,
tego samego systemu obsługującego niemiecką stronę. Przed uruchomieniem
skopiuj `.env.example` do `.env.local` i ustaw prywatny
`INQUIRY_DASHBOARD_API_KEY`. Klucz pozostaje wyłącznie na serwerze.
Brak konfiguracji lub błąd dashboardu powoduje błąd zgłoszenia, nigdy
pozorne potwierdzenie sukcesu.

Zgłoszenia korzystają ze źródła `ki-kalkulant-pl` (Kosztorysant AI Polska).
Klucz API musi być przypisany do tego samego polskiego źródła. Nie używaj
klucza niemieckiego źródła `ki-kalkulant`: źródło decyduje o odbiorcach
wiadomości, a metadane języka nie zmieniają zakresu odbiorców.
Polskie zgłoszenia mają prefiks `[PL]` w tytule
oraz metadane `landingPage: kosztorysant-ai`, `locale: pl-PL` i `country: PL`.
Wszystkie odpowiedzi formularza są zachowane w `payload`.
Karta podglądu linku znajduje się w `public/og.png`.

## Netlify

Projekt korzysta ze standardowego Next.js, tak jak niemiecka wersja strony.
Po podłączeniu repozytorium w Netlify framework i ustawienia kompilacji są
wykrywane automatycznie. Polecenie kompilacji to `npm run build`.
Zmienne `INQUIRY_DASHBOARD_URL` i `INQUIRY_DASHBOARD_API_KEY` muszą być
ustawione również w Netlify dla funkcji serwerowych.

Przy zmianie istniejącej konfiguracji z niemieckiego źródła ustaw w Netlify
`INQUIRY_DASHBOARD_API_KEY` na klucz polskiego źródła `ki-kalkulant-pl`
i wdróż wersję kodu korzystającą z tego źródła. Zmiana samego klucza
lub samego kodu spowoduje odrzucenie zgłoszenia przez dashboard (403).
Wcześniej zapisane zgłoszenia i wiadomości wymagają osobnej korekty;
wdrożenie nie przeklasyfikuje ich ani nie wyśle ponownie.
