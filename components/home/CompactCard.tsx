import type { Project } from "@/lib/content";
import { Thumb } from "@/components/thumbs/Thumb";

export function CompactCard({ project }: { project: Project }) {
  const repo = project.links.find((l) => l.kind === "repo" && l.href);
  return (
    <article className="compact-card">
      <div className="thumb-mini">
        <Thumb kind={project.thumb} square />
      </div>
      <div className="grid gap-1.5 min-w-0">
        <h4>{project.title}</h4>
        <p className="label">
          {project.contextLabel} · {project.period.label}
        </p>
        <p>{project.summary}</p>
        {repo && (
          <a href={repo.href!} rel="noopener" className="justify-self-start font-medium">
            Source on GitHub ↗<span className="sr-only"> for {project.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}
