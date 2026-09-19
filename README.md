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

Hero, 4 kategorie, sekcja "Rzemiosło" i galeria Realizacje używają teraz **prawdziwych zdjęć realizacji Becker Mebel** (dostarczonych przez klienta, lekko ujednoliconych stylistycznie). Logo wciąż jest **placeholderem** wyciętym z przekazanego mockupu — czeka na finalny plik wektorowy (patrz `docs/branding/BECKER_MEBEL_LOGO_MASTER_SPEC.md`, sekcja 19 „Decision Log” — master wektorowy i finalne kolory nie są jeszcze zamknięte).

Żeby podmienić:
- **zdjęcia** — przez panel `/admin` (opisane niżej) albo ręcznie w `public/images/...` + aktualizacja ścieżki w odpowiednim pliku JSON. Sekcja Realizacje (`src/data/realizacje.json`, pole `items`) nie ma limitu liczby zdjęć — nowe pozycje dodane przez panel same dołączą się do siatki.
- **logo** — po otrzymaniu plików wektorowych (SVG/AI) podmień pliki w `public/images/logo/` (najlepiej wyeksportować z wektora te same warianty: `symbol.png`, `symbol-light.png`, `lockup-dark.png`, `lockup-light.png`, `symbol-3d.jpg`, `symbol-2d.png`/`favicon-32.png`).

## Konfiguracja panelu treści

Panel (Sveltia CMS) loguje się bezpośrednio do GitHuba — **nie** przez Netlify Identity/Git Gateway (ta ścieżka jest przestarzała i Sveltia CMS jej już nie obsługuje, mimo że tak bywa opisywana w starszych poradnikach). Są dwie opcje logowania do wyboru; wystarczy jedna:

### Opcja A — logowanie przez GitHub (zalecane, dla stałego użytku)

Wymaga jednorazowej rejestracji małej aplikacji OAuth na GitHubie i wpięcia jej do Netlify (Netlify pełni rolę pośrednika w logowaniu, bez potrzeby własnego serwera):

1. Wdróż repo na [Netlify](https://app.netlify.com) (New site from Git → to repozytorium, branch `main` — build command i publish dir są już ustawione w `netlify.toml`).
2. Na GitHubie: **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: adres Twojej strony na Netlify (np. `https://becker-mebel.netlify.app`)
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. Po utworzeniu skopiuj **Client ID** i **Client Secret**.
4. W Netlify: **Site configuration → Access control → OAuth** (czasem sekcja nazywa się podobnie) → dodaj dostawcę **GitHub**, wklej Client ID i Secret.
5. Wejdź na `https://twoja-domena/admin/` i kliknij **„Sign In with GitHub"**.

### Opcja B — token dostępu (szybsze na start, jedna osoba)

Na GitHubie: **Settings → Developer settings → Personal access tokens** → wygeneruj token z uprawnieniem do repo. Na `/admin/` kliknij **„Sign In Using Access Token"** i wklej token. Zero konfiguracji w Netlify, ale token trzeba samemu bezpiecznie przechowywać i w razie potrzeby odświeżyć/unieważnić na GitHubie.

Od tego momentu edycja treści/zdjęć w `/admin` = commit do repo = automatyczny redeploy strony. Panel jest używany rzadko, więc to jednorazowa konfiguracja.

### Edycja lokalna (bez logowania, bez Netlify)

Na `/admin/` jest przycisk **„Work with Local Repository"** (działa w Chrome/Edge dzięki File System Access API) — po kliknięciu wskazujesz folder z lokalnym sklonowanym repo, a panel czyta i zapisuje pliki bezpośrednio na dysku, bez logowania i bez żadnego dodatkowego serwera. Wystarczy mieć uruchomione `npm run dev` i otworzyć `http://localhost:4321/admin/`.

## Co dalej (poza zakresem tego etapu)

Zgodnie z `docs/marketing/BECKER_MEBEL_MARKETING_MASTER_PLAN.md` w tym etapie budujemy **wyłącznie landing + panel treści**. Instagram, Facebook, Google Business Profile, SEO i reklama płatna to kolejne, osobne etapy — po zatwierdzeniu i uruchomieniu WWW.
