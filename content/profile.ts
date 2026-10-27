export interface SocialLink {
  label: string;
  href: string;
}

export const profile = {
  shortName: "Mouadh",
  roleLine: "Software engineer & game developer",
  /** Rendered as Markdown inline; *emphasis* becomes the terracotta italic. */
  headline: "I build AI products, dependable backends and the occasional *small world*.",
  lede: [
    "Software engineering graduate of IMT Atlantique. I built a retrieval-augmented assistant at La Banque Postale, maintained a 200,000-line healthcare system at Sopra Steria, and ship my own products on Cloudflare.",
    "This is the quick read. The same stories live in a woodland village, if you'd rather wander.",
  ],
  /** Fill these in to show them; null values are hidden. */
  email: null as string | null,
  cvUrl: null as string | null,
  socials: [{ label: "GitHub", href: "https://github.com/Cordoncharge83" }] as SocialLink[],
  alumniOf: "IMT Atlantique",
};
