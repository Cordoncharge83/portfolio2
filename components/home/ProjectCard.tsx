import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectMedia } from "@/components/entry/ProjectMedia";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tags } from "@/components/ui/Tags";

const categoryLabel = { software: "Software", game: "Game" } as const;

export function ProjectCard({ project }: { project: Project }) {
  const live = project.links.find((l) => (l.kind === "live" || l.kind === "site") && l.href);
  const stack = project.stack.length > 5 ? [...project.stack.slice(0, 5), `+${project.stack.length - 5}`] : project.stack;

  return (
    <article className="card">
      <div className="card-media">
        <ProjectMedia project={project} variant="card" />
        <span className="tag-cat">{categoryLabel[project.category]}</span>
        <StatusBadge status={project.status} />
      </div>
      <div className="card-body">
        <h3>
          <Link href={`/projects/${project.slug}`} className="card-title-link">
            {project.title}
          </Link>
        </h3>
        {project.tagline && <p className="label card-kicker">{project.tagline}</p>}
        <p className="card-summary">{project.summary}</p>
        <Tags items={stack} label={`${project.title} stack`} />
        <div className="card-foot">
          <span aria-hidden="true" className="text-forest-ink">
            Case study →
          </span>
          {live && (
            <a href={live.href!} rel="noopener">
              {live.kind === "live" ? "Live site ↗" : "Site ↗"}
              <span className="sr-only"> for {project.title}</span>
            </a>
          )}
          <span className="meta">{project.period.label}</span>
        </div>
      </div>
    </article>
  );
}
