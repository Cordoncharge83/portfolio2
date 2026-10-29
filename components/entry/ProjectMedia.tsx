import type { Project } from "@/lib/content";
import { cardSrcSetFor, srcSetFor } from "@/lib/images";
import { NightSource } from "@/components/ui/NightSource";
import { ProjectIcon } from "@/components/ui/ProjectIcon";

/** The case-study screenshot spans the content column (1160px at most, minus the gutters below that). */
const heroSizes = "(min-width: 1240px) 1160px, (min-width: 861px) calc(100vw - 80px), calc(100vw - 44px)";
/** Card thumbnails: at most about 330px in the grid; the column minus the card's padding on phones. */
const cardSizes = "(min-width: 861px) 330px, calc(100vw - 92px)";

/**
 * Screenshot when one exists, otherwise a plain panel with the project's icon.
 *
 * Night variants: on cards both copies are lazy and CSS shows the one matching the theme, so the
 * hidden (display: none) copy is never downloaded. The case-study screenshot is eager, so a night
 * variant is a <picture> source instead (see NightSource): only the matching variant downloads.
 * Plain <img>: the static export serves pre-sized WebP files, no optimizer.
 */
export function ProjectMedia({ project, variant }: { project: Project; variant: "card" | "hero" }) {
  const cover = project.cover;
  if (!cover) {
    return (
      <div className="media-placeholder" aria-hidden="true">
        <ProjectIcon kind={project.thumb} />
      </div>
    );
  }

  const card = variant === "card";
  const light = (card && cover.cardSrc) || cover.src;
  const dark = (card && cover.darkCardSrc) || cover.darkSrc;
  const alt = cover.alt;
  const base = { width: cover.width, height: cover.height, decoding: "async" as const };

  /* eslint-disable @next/next/no-img-element */
  if (card) {
    const lazy = { ...base, sizes: cardSizes, loading: "lazy" as const };
    return dark ? (
      <>
        <img src={light} srcSet={cardSrcSetFor(light, cover)} alt={alt} {...lazy} className="day-only" />
        <img src={dark} srcSet={cardSrcSetFor(dark, cover)} alt={alt} {...lazy} className="night-only" />
      </>
    ) : (
      <img src={light} srcSet={cardSrcSetFor(light, cover)} alt={alt} {...lazy} />
    );
  }
  const img = <img src={light} srcSet={srcSetFor(light)} sizes={heroSizes} alt={alt} {...base} />;
  return dark ? (
    <picture>
      <NightSource srcSet={srcSetFor(dark) ?? dark} sizes={heroSizes} />
      {img}
    </picture>
  ) : (
    img
  );
  /* eslint-enable @next/next/no-img-element */
}
