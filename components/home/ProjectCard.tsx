import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectMedia } from "@/components/entry/ProjectMedia";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ProjectCard({ project }: { project: Project }) {
  const live = project.links.find((l) => (l.kind === "live" || l.kind === "site") && l.href);

  return (
    <article className="card panel">
      <span className="card-icon">
        <ProjectIcon kind={project.thumb} />
      </span>
      <h3>
        {/* Stretched over the whole card (.card-link::after), so the cue below needs no link of its own. */}
        <Link href={`/projects/${project.slug}`} className="card-link" prefetch={false}>
          {project.title}
        </Link>
      </h3>
      <div className="card-meta">
        <StatusBadge status={project.status} />
        <span className="px card-period">{project.period.label}</span>
      </div>
      <p className="card-summary">{project.summary}</p>
      <div className="card-thumb dither-edge">
        <ProjectMedia project={project} variant="card" />
      </div>
      <div className="card-foot">
        <span className="text-link card-cue" aria-hidden="true">
          Read the case study
        </span>
        {live && (
          <a className="text-link card-site" href={live.href!} rel="noopener">
            {live.label}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> for {project.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}
