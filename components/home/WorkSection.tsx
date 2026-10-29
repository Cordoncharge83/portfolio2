import { getCompactProjects, getFeaturedProjects, yearSpan } from "@/lib/content";
import { profile } from "@/content/profile";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectCard } from "./ProjectCard";
import { CompactCard } from "./CompactCard";
import { VillageCard } from "./VillageCard";
import { FilterableWork, type WorkItem } from "./FilterableWork";

export function WorkSection() {
  const featuredProjects = getFeaturedProjects();
  const compactProjects = getCompactProjects();

  const featured: WorkItem[] = [
    ...featuredProjects.map((p) => ({ slug: p.slug, category: p.category, node: <ProjectCard project={p} /> })),
    { slug: "village", category: "game", node: <VillageCard /> },
  ];
  const compact: WorkItem[] = compactProjects.map((p) => ({
    slug: p.slug,
    category: p.category,
    node: <CompactCard project={p} />,
  }));

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          id="work-title"
          eyebrow={`Projects · ${yearSpan([...featuredProjects, ...compactProjects].map((p) => p.period))}`}
          title="Selected work"
          intro={profile.workIntro}
        />
        <FilterableWork featured={featured} compact={compact} />
      </div>
    </section>
  );
}
