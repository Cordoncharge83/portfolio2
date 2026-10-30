export interface SocialLink {
  label: string;
  href: string;
}

export const profile = {
  shortName: "Mouadh",
  /** Used in search-engine data (JSON-LD, author meta) so the site matches the CV and LinkedIn. */
  fullName: "Mouadh Bondka",
  roleLine: "Software engineer & game developer",
  /** Rendered as Markdown inline; *emphasis* marks the highlighted words. */
  headline: "AI products, solid backends & *small worlds*",
  lede: "Software engineering graduate of IMT Atlantique. I built a retrieval-augmented assistant at La Banque Postale, maintained a 200,000-line healthcare system at Sopra Steria, and ship my own products on Cloudflare.",
  /** The home page's Open Graph image: the headline as plain text, under the name. */
  ogSubtitle: "AI products, solid backends and small worlds.",
  /** Project slugs whose covers sit beside the headline: [back, front]. Each needs a `cover`. */
  heroShots: ["comp-atlas", "smosh-story-finder"] as [string, string],
  /** The hero's "Now" strip: the main line depends on whether the village game is published. */
  now: {
    soon: "Building the village, a playable version of this portfolio.",
    live: "The village is open: a playable version of this portfolio.",
    /** Shown after the main line; null hides it. */
    note: "Comp Atlas is in closed beta." as string | null,
  },
  /** Intro under the "Selected work" heading. */
  workIntro: "Four products I build and ship myself, a tactical RPG, and this portfolio as a village you can explore.",
  /** Fill these in to show them; null values are hidden. */
  email: "contact@moudka.com" as string | null,
  cvUrl: "/cv.pdf" as string | null,
  /** File name the CV is saved under. */
  cvFileName: "Mouadh-Bondka-CV.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mouadh-bondka-57870a28a/" },
    { label: "GitHub", href: "https://github.com/Cordoncharge83" },
  ] as SocialLink[],
  alumniOf: "IMT Atlantique",
};
