import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeaturedProjects, getProject } from "@/lib/content";
import { EntryLayout } from "@/components/entry/EntryLayout";
import { ProjectMedia } from "@/components/entry/ProjectMedia";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tags } from "@/components/ui/Tags";
import { Gallery } from "@/components/entry/Gallery";
import { baseOpenGraph } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeaturedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project || project.tier !== "featured") notFound();

  const all = getFeaturedProjects();
  const i = all.findIndex((p) => p.slug === project.slug);
  const toNeighbour = (p?: (typeof all)[number]) => p && { href: `/projects/${p.slug}`, title: p.title };
  const links = project.links.filter((l) => l.href);
  const pending = project.links.filter((l) => !l.href && l.note);

  return (
    <EntryLayout
      back={{ href: "/#work", label: "All work" }}
      kicker={`${project.contextLabel} · ${project.period.label}`}
      title={project.title}
      tagline={project.tagline}
      meta={
        <>
          <StatusBadge status={project.status} />
          {project.liveUrl && (
            <a className="btn btn-primary" href={project.liveUrl} rel="noopener">
              Visit {project.title} ↗
            </a>
          )}
        </>
      }
      hero={<ProjectMedia project={project} variant="hero" />}
      heroIsIllustration={!project.cover}
      draft={project.draft}
      sections={project.sections}
      after={<Gallery images={project.gallery} />}
      prev={toNeighbour(all[i - 1])}
      next={toNeighbour(all[i + 1])}
      aside={
        <dl>
          {project.statusNote && (
            <div>
              <dt>Status</dt>
              <dd>{project.statusNote}</dd>
            </div>
          )}
          <div>
            <dt>Context</dt>
            <dd>
              {project.contextLabel}, {project.period.label}
            </dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd className="mt-1.5">
              <Tags items={project.stack} label={`${project.title} stack`} />
            </dd>
          </div>
          {(links.length > 0 || pending.length > 0) && (
            <div>
              <dt>Links</dt>
              <dd>
                <ul className="links">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href!} rel="noopener">
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                  {pending.map((l) => (
                    <li key={l.label} className="text-muted">
                      {l.note}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      }
    />
  );
}
