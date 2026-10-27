/**
 * Deployment-level settings. Domains are not decided yet, so everything that
 * depends on them lives here.
 */
export const site = {
  /** Canonical origin of the portfolio, used for metadata, sitemap and OG tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moudka.com",
  name: "Mouadh",
  /** The village game. Leave `url` null until it is published. */
  village: {
    url: (process.env.NEXT_PUBLIC_VILLAGE_URL ?? null) as string | null,
  },
} as const;
