/**
 * Deployment-level settings. Everything that depends on the domain lives here.
 */
export const site = {
  /** Canonical origin of the portfolio, used for metadata, sitemap and OG tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.moudka.com",
  name: "Mouadh",
  /** The village game. Leave `url` null until it is published. */
  village: {
    url: (process.env.NEXT_PUBLIC_VILLAGE_URL ?? null) as string | null,
  },
} as const;

/** Fields every page's openGraph must repeat, because Next replaces (not merges) nested openGraph objects. */
export const baseOpenGraph = { siteName: site.name, locale: "en_GB" } as const;
