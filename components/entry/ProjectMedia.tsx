import type { Project } from "@/lib/content";
import { srcSetFor } from "@/lib/images";
import { ProjectIcon } from "@/components/ui/ProjectIcon";

/** The case-study screenshot spans the content column (1160px at most, minus the gutters below that). */
const heroSizes = "(min-width: 1240px) 1160px, (min-width: 861px) calc(100vw - 80px), calc(100vw - 44px)";

/**
 * Screenshot when one exists, otherwise a plain panel with the project's icon. When a night
 * variant exists both are rendered and CSS shows the one matching the theme;
 * the night one is lazy so a hidden (display: none) copy is never downloaded.
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
    return dark ? (
      <>
        <img src={light} alt={alt} {...base} loading="lazy" className="day-only" />
        <img src={dark} alt={alt} {...base} loading="lazy" className="night-only" />
      </>
    ) : (
      <img src={light} alt={alt} {...base} loading="lazy" />
    );
  }
  return dark ? (
    <>
      <img src={light} srcSet={srcSetFor(light)} sizes={heroSizes} alt={alt} {...base} className="day-only" />
      <img
        src={dark}
        srcSet={srcSetFor(dark)}
        sizes={heroSizes}
        alt={alt}
        {...base}
        loading="lazy"
        className="night-only"
      />
    </>
  ) : (
    <img src={light} srcSet={srcSetFor(light)} sizes={heroSizes} alt={alt} {...base} />
  );
  /* eslint-enable @next/next/no-img-element */
}
