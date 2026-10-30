# Mouadh's portfolio

The classic, quick-read companion to the village game. The same projects and experience are here as plain, scannable pages, with the game's pixel details: a day landscape and a starry night, pixel type for labels and dithered edges.

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
- `content/profile.ts`: headline, intro, the hero's two screenshots (`heroShots`), the Now strip, email, CV link and file name, socials, and the home page's Open Graph subtitle.
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
3. Run `node scripts/optimize-shots.mjs <rawDir>`, which writes `public/shots/<slug>/<name>-{640,960,1280,1920}.webp`. A `"native": true` shot keeps its own framing and size as `<name>.webp`; add `"card": true` when it is a cover, to also get a 640px card copy, `<name>-640.webp`.
4. Reference the files from the entry's `cover` / `gallery`: the `-1920` file as `src`, the `-960` file as `cardSrc` (a native cover's `-640` copy). Pages build their `srcset` from those names (`lib/images.ts`); cards and the home hero stop at 960.

Night variants (`darkSrc`, `darkCardSrc`) are shown automatically in the night theme.

## Site settings

`lib/site.ts` holds the canonical URL and the game URL. Production uses `https://portfolio.moudka.com`, with the game at `/village/`. Both can be set at build time:

- `NEXT_PUBLIC_SITE_URL` (default `https://portfolio.moudka.com`) is used for canonical links, the sitemap and OG tags.
- `NEXT_PUBLIC_VILLAGE_URL` is the game. Its production build value is `https://portfolio.moudka.com/village/`. Until it is set, the header link is hidden and the Now strip says the village is being built; once set, both link to it. The game's own card and case study come from `content/projects/sleeping-village.md`, like every other project.

## Design

### Theme: day and night

- **Day** (the light theme): Warm Ivory `#F9EBD7` background, Emerald `#046A38` for primary text and buttons, Vermillion `#E34222` for the highlight, the sun and underlines.
- **Night** (the dark theme): Ink Black `#031211` background, Warm Ivory `#E8E4D3` text, Electric Teal `#00AEBB` for accents, with stars and the moon.
- All tokens live in `styles/tokens.css`. Bare `:root` holds day; night applies via `prefers-color-scheme` or `data-theme="dark"`. Vermillion is only 3.5:1 on the background, so it is used for large text and decoration only (see the comment at the top of the file).
- The OS preference applies by default. The sun/moon button stores an explicit choice in `localStorage` (`theme`: `"light"` or `"dark"`), and `components/site/ThemeScript.tsx` applies it as `data-theme` on `<html>` before first paint. The toggle clears the stored choice when it matches the OS again.
- ThemeScript also points the browser's `theme-color` and the night screenshots at an explicit choice, and keeps them in step after client-side navigations.
- Tailwind's `dark:` variant covers both cases (see `app/globals.css`), and so do the `.day-only` / `.night-only` classes in `styles/base.css`.
- Eager screenshots with a night variant (the home hero, the case-study screenshot) are a `<picture>` with a dark `<source>` (`components/ui/NightSource.tsx`), so only the visible variant downloads. Lazy pairs (cards, gallery) use `.day-only` / `.night-only`.
- Night is screen-only: printing always uses the day palette.

### Fonts

All three are self-hosted through `next/font` (`app/fonts.ts`), Latin subset:

- **Pixelify Sans**: headings, the wordmark, menu links and buttons.
- **Instrument Sans**: running text.
- **Silkscreen**: the small pixel labels (eyebrows, tags, dates, filters, footer), 12px uppercase.

Font sizes are set in `rem` (1rem = 16px by default), so they follow the visitor's default text size in the browser settings.

The Open Graph images use static TTF copies in `assets/fonts` (see `OFL-NOTICE.txt`).

### Styles

`app/globals.css` loads Tailwind, the tokens and one stylesheet per area, all in the `components` layer:

| File | Holds |
| --- | --- |
| `styles/base.css` | Layout (`.container`, `.section`), `.px` labels, tags, chips, buttons, links, `.day-only` / `.night-only`, the scene kit |
| `styles/chrome.css` | The floating nav bar, the phone menu, theme toggle and footer |
| `styles/hero.css` | Home hero and the Now strip |
| `styles/work.css` | Filters, project cards, smaller projects |
| `styles/home.css` | Experience, skills and the contact band |
| `styles/entry.css` | Case-study and experience pages, the 404 page |

The nav bar floats over the top of every page, so each page's first block paints its background behind it and pads its top by `--nav-space`. At 860px and below the section links move into a "Menu" disclosure in the bar (`components/site/NavMenu.tsx`, a `<details>` that works without JavaScript), which also holds the CV button at 540px and below. These two breakpoints are in em (53.75em and 33.75em), so with a larger default text size the bar switches earlier instead of overflowing. Section links move keyboard focus to their section (`components/site/SectionLink.tsx`).

### Scene kit

The skies and pines are generated at build time from a seeded PRNG (`lib/sky.ts`) and rendered by server components in `components/scene/`, so they ship as a few SVG paths and no client JavaScript:

- `Starfield`: a night-only starfield (presets `hero`, `band`, `header`), stars batched into a handful of paths; some twinkle unless reduced motion is on.
- `HeroScene`: the sun by day, the moon at night, ridges and pines, then a pixel dissolve into the page (home hero and 404).
- `PinesBand`: the pine silhouette along the bottom of the contact band.

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
5. `wrangler.jsonc` assigns `portfolio.moudka.com/*` to this Worker. The hostname already has a proxied DNS record pointing at the older Pages portfolio; routing serves this new site in front of it. Other hostnames and DNS records are unchanged.

## The village game at `/village`

The game is a separate repo and Worker, mounted on this site's domain under `/village`:

- **Game Worker:** in its `wrangler.jsonc`, a route instead of a custom domain:
  `"routes": [{ "pattern": "portfolio.moudka.com/village", "zone_name": "moudka.com" }, { "pattern": "portfolio.moudka.com/village/*", "zone_name": "moudka.com" }]`.
  These specific routes take precedence over this site's `portfolio.moudka.com/*` route. The game gets `/village/` and its assets; everything else reaches the portfolio. `public/_redirects` also normalizes bare `/village` links (including query strings) to `/village/` while preserving the existing CV redirect.
- **Game build:** everything must live under `/village/`. Use `base: "/village/"` for Vite, or relative asset paths in an engine's web export. Put the files in a `village/` folder inside the asset directory (e.g. `dist/village/index.html` with `assets.directory: "./dist"`).
- **This site:** set the build variable `NEXT_PUBLIC_VILLAGE_URL=/village` once the game is live. `check:out` treats `/village` as served elsewhere.
- **Shared origin:** the game can fetch `/content.json` directly. Both sites share `localStorage`, so prefix the game's keys (e.g. `village:`); the `theme` key is the site's day/night choice, if the game wants to follow it.
