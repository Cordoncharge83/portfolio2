import type { Project } from "@/lib/content";

export function CompactCard({ project }: { project: Project }) {
  const repo = project.links.find((l) => l.kind === "repo" && l.href);
  return (
    <article className="minor-item">
      <h4>{project.title}</h4>
      {/* Shown above the title (CSS order), read after it. */}
      <p className="px minor-meta">
        {project.contextLabel} · {project.period.label}
      </p>
      <p className="minor-summary">{project.summary}</p>
      {repo && (
        <a className="text-link" href={repo.href!} rel="noopener">
          Source on GitHub<span className="sr-only"> for {project.title}</span>
        </a>
      )}
    </article>
  );
}
