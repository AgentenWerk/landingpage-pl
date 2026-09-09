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

Formularz wysyła zgłoszenia do wspólnego panelu zapytań. Do uruchomienia
integracji potrzebne są zmienne środowiskowe opisane w `.env.example`.
W środowisku lokalnym, bez tych zmiennych, przekazanie zgłoszenia jest pomijane.
Karta podglądu linku znajduje się w `public/og.png`.

## Netlify

Projekt korzysta ze standardowego Next.js, tak jak niemiecka wersja strony.
Po podłączeniu repozytorium w Netlify framework i ustawienia kompilacji są
wykrywane automatycznie. Polecenie kompilacji to `npm run build`.
