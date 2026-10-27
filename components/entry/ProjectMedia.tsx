import type { Project } from "@/lib/content";
import { Thumb } from "@/components/thumbs/Thumb";

/**
 * Screenshot when one exists, otherwise the illustrated thumbnail. When a dusk
 * variant exists both are rendered and CSS shows the one matching the theme.
 * Plain <img>: the static export serves pre-sized WebP files, no optimizer.
 */
export function ProjectMedia({ project, variant }: { project: Project; variant: "card" | "hero" }) {
  const cover = project.cover;
  if (!cover) return <Thumb kind={project.thumb} fit={variant === "hero" ? "meet" : "slice"} />;

  const card = variant === "card";
  const light = (card && cover.cardSrc) || cover.src;
  const dark = (card && cover.darkCardSrc) || cover.darkSrc;
  const common = {
    width: cover.width,
    height: cover.height,
    decoding: "async" as const,
    loading: card ? ("lazy" as const) : ("eager" as const),
    fetchPriority: card ? undefined : ("high" as const),
  };

  /* eslint-disable @next/next/no-img-element */
  if (!dark) return <img src={light} alt={cover.alt} {...common} />;
  return (
    <>
      <img src={light} alt={cover.alt} className="dark:hidden" {...common} />
      <img src={dark} alt={cover.alt} className="hidden dark:block" {...common} />
    </>
  );
  /* eslint-enable @next/next/no-img-element */
}
