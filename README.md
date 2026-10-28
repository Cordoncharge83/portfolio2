# Mouadh's portfolio

The classic, quick-read companion to the village game. The same projects and experience are here as plain, scannable pages, in the game's day/dusk "traveller's journal" style.

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
| `npm run screens` | Full-page screenshots of key routes (desktop/phone × day/dusk) into `screenshots/` |
| `npm run deploy` | Build and `wrangler deploy` (needs `wrangler login`) |

Restart `npm run preview` after each build: Wrangler does not pick up a rebuilt `out/` while running.

## Editing content

Everything visitors read lives in `content/`:

- `content/projects/<slug>.md`: one file per project. YAML frontmatter holds the structured fields (status, stack, links, cover, gallery…). The body's `## Heading` blocks become the case-study sections.
  - `tier: featured` gets a card and a `/projects/<slug>` page.
  - `tier: compact` gets a small card under "Earlier games".
- `content/journal/<slug>.md`: experience, education and leadership (`kind: work | education | leadership`), each with its own `/experience/<slug>` page.
- `content/profile.ts`: headline, intro, email, CV link, socials.
- `content/skills.ts`: skill groups, languages and other tools.

`lib/content.ts` validates the frontmatter at build time with zod, so a typo fails the build and names the file and field.

Conventions:

- A link with `href: null` is never rendered. Use it for URLs you don't have yet. `npm run check:out` lists them.
- `draft: true` shows a "draft write-up" note on the page. The three game entries are drafts assembled from their repos; review them and remove the flag.
- `/content.json` publishes all content as JSON (CORS-enabled) so the village game can reuse it, keyed by `slug`.

### Screenshots

Projects without a `cover` show an illustrated thumbnail (`components/thumbs/Thumb.tsx`).

To add real screenshots:

1. Capture at 1280×720 @2x.
2. Add each one to `scripts/shots.config.json`.
3. Run `node scripts/optimize-shots.mjs <rawDir>`, which writes `public/shots/<slug>/<name>-{960,1920}.webp`.
4. Reference the files from the entry's `cover` / `gallery`.

Dusk variants (`darkSrc`, `darkCardSrc`) are shown automatically in the dark theme.

## Site settings

`lib/site.ts` holds the canonical URL and the game URL. The domains aren't decided yet, so both can be set at build time:

- `NEXT_PUBLIC_SITE_URL` (default `https://portfolio.moudka.com`) is used for canonical links, the sitemap and OG tags.
- `NEXT_PUBLIC_VILLAGE_URL` is the game. Until it is set, the header link is hidden and the intro, work note and banner say the village is on its way. The plan is `/village` (see below); set it only once the game is deployed, otherwise `/village` shows this site's 404 page.

## Theme

- Day (parchment) and dusk (forest-night) tokens live in `styles/tokens.css`. Bare `:root` holds day; dusk applies via `prefers-color-scheme` or `data-theme="dark"`.
- `components/site/ThemeScript.tsx` applies a stored choice before first paint.
- The toggle clears the stored choice when it matches the OS again.
- Tailwind's `dark:` variant covers both cases (see `app/globals.css`).

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
- **Shared origin:** the game can fetch `/content.json` directly. Both sites share `localStorage`, so prefix the game's keys (e.g. `village:`); the `theme` key is the site's day/dusk choice, if the game wants to follow it.
