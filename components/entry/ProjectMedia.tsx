import type { Project } from "@/lib/content";
import { srcSetFor } from "@/lib/images";
import { Thumb } from "@/components/thumbs/Thumb";

const sizes = {
  card: "(min-width: 68rem) 33rem, (min-width: 52rem) 50vw, 100vw",
  hero: "(min-width: 68rem) 66rem, 100vw",
};

/**
 * Screenshot when one exists, otherwise the illustrated thumbnail. When a dusk
 * variant exists both are rendered and CSS shows the one matching the theme;
 * the dusk one is lazy so a hidden (display: none) copy is never downloaded.
 * Plain <img>: the static export serves pre-sized WebP files, no optimizer.
 */
export function ProjectMedia({ project, variant }: { project: Project; variant: "card" | "hero" }) {
  const cover = project.cover;
  if (!cover) return <Thumb kind={project.thumb} fit={variant === "hero" ? "meet" : "slice"} />;

  const card = variant === "card";
  const light = (card && cover.cardSrc) || cover.src;
  const dark = (card && cover.darkCardSrc) || cover.darkSrc;
  const alt = cover.alt;
  const base = { width: cover.width, height: cover.height, decoding: "async" as const };

  /* eslint-disable @next/next/no-img-element */
  if (card) {
    return dark ? (
      <>
        <img src={light} alt={alt} {...base} loading="lazy" className="dark:hidden" />
        <img src={dark} alt={alt} {...base} loading="lazy" className="hidden dark:block" />
      </>
    ) : (
      <img src={light} alt={alt} {...base} loading="lazy" />
    );
  }
  return dark ? (
    <>
      <img src={light} srcSet={srcSetFor(light)} sizes={sizes.hero} alt={alt} {...base} className="dark:hidden" />
      <img src={dark} srcSet={srcSetFor(dark)} sizes={sizes.hero} alt={alt} {...base} loading="lazy" className="hidden dark:block" />
    </>
  ) : (
    <img src={light} srcSet={srcSetFor(light)} sizes={sizes.hero} alt={alt} {...base} />
  );
  /* eslint-enable @next/next/no-img-element */
}
