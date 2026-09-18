# Becker Mebel — landing page + panel treści

Jednostronicowy landing page dla J. Becker Mebel (meble na wymiar, Poznań i okolice) wraz z prostym panelem do samodzielnej edycji treści i zdjęć.

## Stack

- **[Astro](https://astro.build/)** + **Tailwind CSS** — statyczna strona, szybka i lekka.
- **Treści** trzymane w plikach JSON w `src/data/` — komponenty czytają je bezpośrednio, bez bazy danych.
- **Panel admina**: [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (nowocześniejszy, kompatybilny fork Decap/Netlify CMS) pod adresem `/admin`. Edycja w formularzu → zapis jako commit do repo → automatyczny redeploy.
- **Hosting**: Netlify (auto-build z brancha `main` po każdym pushu/commicie z panelu).

## Struktura projektu

```
src/
  data/            # treści strony (edytowalne przez panel /admin)
    site.json      # nazwa marki, nawigacja, stopka
    hero.json      # sekcja hero
    categories.json# 4 kafelki kategorii
    brand.json     # sekcja "O firmie / rzemiośle"
    process.json   # 5 kroków procesu współpracy
    contact.json   # dane kontaktowe, godziny, sekcja kontaktowa
  components/      # komponenty Astro (Header, Hero, CategoryGrid, ...)
  layouts/         # BaseLayout.astro (meta, fonty, favicon)
  pages/           # index.astro + podstrony (polityka prywatności, cookies)
public/
  images/          # zdjęcia i logo (w tym uploads/ dla nowych plików z panelu)
  admin/           # panel CMS (index.html + config.yml)
```

## Uruchomienie lokalnie

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build produkcyjny do dist/
npm run preview   # podgląd builda produkcyjnego
```

## Stan zdjęć i logo (ważne)

Zdjęcia wnętrz i logo widoczne obecnie na stronie to **placeholdery** wycięte z przekazanego mockupu — mają wypełnić layout do czasu dostarczenia prawdziwych zdjęć realizacji i finalnego wektorowego logo (patrz `docs/branding/BECKER_MEBEL_LOGO_MASTER_SPEC.md`, sekcja 19 „Decision Log” — master wektorowy i finalne kolory nie są jeszcze zamknięte).

Żeby podmienić:
- **zdjęcia** — przez panel `/admin` (opisane niżej) albo ręcznie w `public/images/...` + aktualizacja ścieżki w odpowiednim pliku JSON,
- **logo** — po otrzymaniu plików wektorowych (SVG/AI) podmień pliki w `public/images/logo/` (najlepiej wyeksportować z wektora te same warianty: `symbol.png`, `symbol-light.png`, `lockup-dark.png`, `lockup-light.png`, `symbol-3d.jpg`, `symbol-2d.png`/`favicon-32.png`).

## Konfiguracja panelu treści (Netlify)

Panel działa w oparciu o **Netlify Identity + Git Gateway** — to jedyne kroki, które trzeba wykonać ręcznie w panelu Netlify (raz, po pierwszym deployu):

1. Wdróż repo na [Netlify](https://app.netlify.com) (New site from Git → wybierz to repozytorium, branch `main`, build command i publish dir są już ustawione w `netlify.toml`).
2. W ustawieniach strony: **Site configuration → Identity → Enable Identity**.
3. Tamże: **Identity → Services → Git Gateway → Enable Git Gateway** (to on pozwala panelowi commitować zmiany do repo w Twoim imieniu, bez udostępniania tokenów GitHub).
4. **Identity → Invite users** — zaproś swój e-mail (np. jacek@mocpartnerstwa.pl). Dostaniesz maila z linkiem do ustawienia hasła.
5. Wejdź na `https://twoja-domena/admin/`, zaloguj się e-mailem i hasłem ustawionym w kroku 4.

Od tego momentu edycja treści/zdjęć w `/admin` = commit do repo = automatyczny redeploy strony. Panel jest używany rzadko, więc to jednorazowa konfiguracja.

### Edycja lokalna (opcjonalnie, bez Netlify)

Panel ma włączone `local_backend: true` w `public/admin/config.yml`. Żeby edytować treści lokalnie przed wdrożeniem:

```bash
npx netlify-cms-proxy-server &
npm run dev
```

i wejdź na `http://localhost:4321/admin/` — zmiany zapiszą się bezpośrednio w plikach na dysku (bez logowania).

## Co dalej (poza zakresem tego etapu)

Zgodnie z `docs/marketing/BECKER_MEBEL_MARKETING_MASTER_PLAN.md` w tym etapie budujemy **wyłącznie landing + panel treści**. Instagram, Facebook, Google Business Profile, SEO i reklama płatna to kolejne, osobne etapy — po zatwierdzeniu i uruchomieniu WWW.
