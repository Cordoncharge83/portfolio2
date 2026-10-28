export interface SocialLink {
  label: string;
  href: string;
}

export const profile = {
  shortName: "Mouadh",
  /** Used in search-engine data (JSON-LD, author meta) so the site matches the CV and LinkedIn. */
  fullName: "Mouadh Bondka",
  roleLine: "Software engineer & game developer",
  /** Rendered as Markdown inline; *emphasis* becomes the terracotta italic. */
  headline: "I build AI products, dependable backends and the occasional *small world*.",
  lede: "Software engineering graduate of IMT Atlantique. I built a retrieval-augmented assistant at La Banque Postale, maintained a 200,000-line healthcare system at Sopra Steria, and ship my own products on Cloudflare.",
  /** Second line of the intro, depending on whether the village game is published. */
  villageLine: {
    live: "This is the quick read. The same stories live in a woodland village, if you'd rather wander.",
    soon: "This is the quick read. A woodland village to wander through the same stories is on its way.",
  },
  /** Fill these in to show them; null values are hidden. */
  email: "contact@moudka.com" as string | null,
  cvUrl: null as string | null,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mouadh-bondka-57870a28a/" },
    { label: "GitHub", href: "https://github.com/Cordoncharge83" },
  ] as SocialLink[],
  alumniOf: "IMT Atlantique",
};
