import { getCompactProjects, getFeaturedProjects } from "@/lib/content";
import { Chapter } from "@/components/ui/Chapter";
import { ProjectCard } from "./ProjectCard";
import { CompactCard } from "./CompactCard";
import { FilterableWork } from "./FilterableWork";

export function WorkSection() {
  const featured = getFeaturedProjects().map((p) => ({
    slug: p.slug,
    category: p.category,
    node: <ProjectCard project={p} />,
  }));
  const compact = getCompactProjects().map((p) => ({
    slug: p.slug,
    category: p.category,
    node: <CompactCard project={p} />,
  }));
  return (
    <Chapter id="work" numeral="I." title="Selected work" note="each one has its building in the village">
      <FilterableWork featured={featured} compact={compact} />
    </Chapter>
  );
}
