# Mouadh's portfolio

The classic, quick-read companion to the village game. The same projects and experience are here as plain, scannable pages, with the game's pixel details: a day landscape and a starry night, pixel type for labels, dithered edges and a small pixel-art village.

Next.js 16 (App Router, static export) · Tailwind CSS 4 · Cloudflare Workers static assets.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server on http://localhost:3000 |
| `npm run build` | Static export to `out/` |
| `npm run check:out` | Checks the export (required files, internal links) and lists content still to fill in |
| `npm run preview` | Serves `out/` with Wrangler on :8787, with the same routing as production (404 page, `_headers`) |
| `npm run test:e2e` | Playwright: routes, theme, filter, 404, OG images, axe WCAG 2.2 AA checks (desktop + phone) |
| `npm run verify` | lint + typecheck + build + check:out + e2e |
| `npm run screens` | Full-page screenshots of key routes (desktop/phone × day/night) into `screenshots/` |
| `npm run deploy` | Build and `wrangler deploy` (needs `wrangler login`) |

Restart `npm run preview` after each build: Wrangler does not pick up a rebuilt `out/` while running.

## Editing content

Everything visitors read lives in `content/`:

- `content/projects/<slug>.md`: one file per project. YAML frontmatter holds the structured fields (status, stack, links, cover, gallery…). The body's `## Heading` blocks become the case-study sections.
  - `tier: featured` gets a card and a `/projects/<slug>` page.
  - `tier: compact` gets a small card under "Smaller and earlier projects".
- `content/journal/<slug>.md`: experience, education and leadership (`kind: work | education | leadership`), each with its own `/experience/<slug>` page.
- `content/profile.ts`: headline, intro, the Now strip, the village card, email, CV link, socials.
- `content/skills.ts`: skill groups, languages and other tools.

`lib/content.ts` validates the frontmatter at build time with zod, so a typo fails the build and names the file and field.

Conventions:

- A link with `href: null` is never rendered. Use it for URLs you don't have yet. `npm run check:out` lists them.
- `draft: true` shows a "draft write-up" note on the page. The three game entries are drafts assembled from their repos; review them and remove the flag.
- `/content.json` publishes all content as JSON (CORS-enabled) so the village game can reuse it, keyed by `slug`.

### Screenshots

Projects without a `cover` show a plain panel with the project's icon (`thumb` in the frontmatter, drawn by `components/ui/ProjectIcon.tsx`).

To add real screenshots:

1. Capture at 1280×720 @2x.
2. Add each one to `scripts/shots.config.json`.
3. Run `node scripts/optimize-shots.mjs <rawDir>`, which writes `public/shots/<slug>/<name>-{960,1920}.webp`.
4. Reference the files from the entry's `cover` / `gallery`.

Night variants (`darkSrc`, `darkCardSrc`) are shown automatically in the night theme.

## Site settings

`lib/site.ts` holds the canonical URL and the game URL. The domains aren't decided yet, so both can be set at build time:

- `NEXT_PUBLIC_SITE_URL` (default `https://portfolio.moudka.com`) is used for canonical links, the sitemap and OG tags.
- `NEXT_PUBLIC_VILLAGE_URL` is the game. Until it is set, the header link is hidden, the Now strip says the village is being built and its card says "Coming soon"; once set, both link to it. The plan is `/village` (see below); set it only once the game is deployed, otherwise `/village` shows this site's 404 page.

## Design

### Theme: day and night

- **Day** (the light theme): Warm Ivory `#F9EBD7` background, Emerald `#046A38` for primary text and buttons, Vermillion `#E34222` for the highlight, the sun and underlines.
- **Night** (the dark theme): Ink Black `#031211` background, Warm Ivory `#E8E4D3` text, Electric Teal `#00AEBB` for accents, with stars and the moon.
- All tokens live in `styles/tokens.css`. Bare `:root` holds day; night applies via `prefers-color-scheme` or `data-theme="dark"`. Vermillion is only 3.5:1 on the background, so it is used for large text and decoration only (see the comment at the top of the file).
- The OS preference applies by default. The sun/moon button stores an explicit choice in `localStorage` (`theme`: `"light"` or `"dark"`), and `components/site/ThemeScript.tsx` applies it as `data-theme` on `<html>` before first paint. The toggle clears the stored choice when it matches the OS again.
- Tailwind's `dark:` variant covers both cases (see `app/globals.css`), and so do the `.day-only` / `.night-only` classes in `styles/base.css`.

### Fonts

All three are self-hosted through `next/font` (`app/fonts.ts`), Latin subset:

- **Pixelify Sans**: headings, the wordmark, menu links and buttons.
- **Instrument Sans**: running text.
- **Silkscreen**: the small pixel labels (eyebrows, tags, dates, filters, footer), 12px uppercase.

The Open Graph images use static TTF copies in `assets/fonts` (see `OFL-NOTICE.txt`).

### Styles

`app/globals.css` loads Tailwind, the tokens and one stylesheet per area, all in the `components` layer:

| File | Holds |
| --- | --- |
| `styles/base.css` | Layout (`.container`, `.section`), `.px` labels, tags, chips, buttons, links, `.day-only` / `.night-only`, the scene kit |
| `styles/chrome.css` | The floating nav bar, theme toggle and footer |
| `styles/hero.css` | Home hero and the Now strip |
| `styles/work.css` | Filters, project cards, the village card, smaller projects |
| `styles/home.css` | Experience, skills and the contact band |
| `styles/entry.css` | Case-study and experience pages, the 404 page |

The nav bar floats over the top of every page, so each page's first block paints its background behind it and pads its top by `--nav-space`.

### Scene kit

The skies, pines and pixel village are generated at build time from a seeded PRNG (`lib/sky.ts`) and rendered by server components in `components/scene/`, so they ship as a few SVG paths and no client JavaScript:

- `Starfield`: a night-only starfield (presets `hero`, `band`, `header`), stars batched into a handful of paths; some twinkle unless reduced motion is on.
- `HeroScene`: the sun by day, the moon at night, ridges and pines, then a pixel dissolve into the page (home hero and 404).
- `PinesBand`: the pine silhouette along the bottom of the contact band.
- `PixelVillage`: the 48 × 27 pixel-art village on the village card.

`lib/og.tsx` reuses the same generators for the Open Graph images.

## Deploying to Cloudflare

The site is a pure static export, served by Workers static assets. There is no Worker script and no OpenNext. Config: `wrangler.jsonc` (assets from `./out`, `404-page` handling) and `public/_headers`.

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create application → Import a repository** and pick it.
3. Fill in the build settings:
   - Project name: `portfolio` (must match `name` in `wrangler.jsonc`)
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Optionally add `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_VILLAGE_URL` as build variables.
4. Deploy and check `portfolio.<account>.workers.dev`. Pull requests get preview URLs.
5. Once the domain is chosen, add it under **Worker → Settings → Domains & Routes → Custom domain**, or add `routes` to `wrangler.jsonc`.

## The village game at `/village`

The game is a separate repo and Worker, mounted on this site's domain under `/village`:

- **Game Worker:** in its `wrangler.jsonc`, a route instead of a custom domain:
  `"routes": [{ "pattern": "portfolio.moudka.com/village*", "zone_name": "moudka.com" }]`.
  Routes run before this site's custom domain, so `/village…` reaches the game and everything else reaches the portfolio.
- **Game build:** everything must live under `/village/`. Use `base: "/village/"` for Vite, or relative asset paths in an engine's web export. Put the files in a `village/` folder inside the asset directory (e.g. `dist/village/index.html` with `assets.directory: "./dist"`).
- **This site:** set the build variable `NEXT_PUBLIC_VILLAGE_URL=/village` once the game is live. `check:out` treats `/village` as served elsewhere.
- **Shared origin:** the game can fetch `/content.json` directly. Both sites share `localStorage`, so prefix the game's keys (e.g. `village:`); the `theme` key is the site's day/night choice, if the game wants to follow it.
