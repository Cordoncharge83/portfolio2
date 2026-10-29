import { getFeaturedProjects, getProject } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const dynamicParams = false;
export const alt = "Project case study from Mouadh's portfolio, over a moonlit pine forest";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getFeaturedProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return renderOgImage({
    kicker: `${project.contextLabel} · ${project.period.label}`,
    title: project.title,
    subtitle: project.tagline,
  });
}
