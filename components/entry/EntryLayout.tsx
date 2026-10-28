import Link from "next/link";
import type { Section } from "@/lib/content";
import { VillageBanner } from "@/components/site/VillageBanner";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function sectionsToHtml(sections: Section[]) {
  return sections
    .map((s) => (s.heading ? `<h2 id="${s.id}">${escapeHtml(s.heading)}</h2>${s.html}` : s.html))
    .join("");
}

export interface Neighbour {
  href: string;
  title: string;
}

export function EntryLayout({
  back,
  kicker,
  title,
  tagline,
  meta,
  hero,
  heroIsIllustration = false,
  heroSize,
  draft,
  sections,
  after,
  aside,
  prev,
  next,
}: {
  back: { href: string; label: string };
  kicker: string;
  title: string;
  tagline?: string | null;
  meta?: React.ReactNode;
  hero?: React.ReactNode;
  heroIsIllustration?: boolean;
  /** Natural size of a screenshot hero: keeps its proportions and never upscales it. */
  heroSize?: { width: number; height: number };
  draft?: boolean;
  sections: Section[];
  after?: React.ReactNode;
  aside: React.ReactNode;
  prev?: Neighbour;
  next?: Neighbour;
}) {
  return (
    <article>
      <header className="entry-header">
        <Link href={back.href} className="back-link">
          ← {back.label}
        </Link>
        <p className="label">{kicker}</p>
        <h1>{title}</h1>
        {tagline && <p className="tagline">{tagline}</p>}
        {meta && <div className="entry-meta-row">{meta}</div>}
      </header>

      {hero && (
        <div
          className={heroIsIllustration ? "entry-hero is-illustration" : "entry-hero"}
          style={heroSize && { aspectRatio: `${heroSize.width} / ${heroSize.height}`, maxWidth: `${heroSize.width}px` }}
        >
          {hero}
        </div>
      )}

      <div className="entry-grid">
        <div className="prose-journal">
          {draft && (
            <p className="draft-note">
              Draft write-up assembled from the project&apos;s repository and dev log. It will be revised.
            </p>
          )}
          <div className="contents" dangerouslySetInnerHTML={{ __html: sectionsToHtml(sections) }} />
          {after}
        </div>
        <aside className="at-a-glance" aria-label="At a glance">
          {aside}
        </aside>
      </div>

      {(prev || next) && (
        <nav className="entry-nav" aria-label="More entries">
          {prev ? (
            <Link href={prev.href} className="prev">
              <span className="label">← Previous</span>
              <span className="entry-nav-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={next.href} className="next">
              <span className="label">Next →</span>
              <span className="entry-nav-title">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      <div className="mt-12">
        <VillageBanner headingLevel="h2" />
      </div>
    </article>
  );
}
