import Link from "next/link";
import type { ProjectStatus, Section } from "@/lib/content";
import { Starfield } from "@/components/scene/Starfield";
import { StatusBadge } from "@/components/ui/StatusBadge";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function sectionsToHtml(sections: Section[]) {
  return sections.map((s) => (s.heading ? `<h2 id="${s.id}">${escapeHtml(s.heading)}</h2>${s.html}` : s.html)).join("");
}

export interface Neighbour {
  href: string;
  title: string;
}

/**
 * Case-study and experience pages: a starry header behind the nav, the screenshot, the write-up
 * beside an "at a glance" card, then links to the previous and next entries.
 */
export function EntryLayout({
  back,
  navLabel,
  status,
  kicker,
  title,
  tagline,
  liveUrl,
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
  /** Accessible name of the previous/next navigation, e.g. "More projects". */
  navLabel: string;
  status?: ProjectStatus;
  kicker: string;
  title: string;
  tagline?: string | null;
  /** Adds a "Visit <title>" button to the header. */
  liveUrl?: string | null;
  hero?: React.ReactNode;
  heroIsIllustration?: boolean;
  /** Natural size of a screenshot hero: it is never stretched past its own width. */
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
      <header className={hero ? "case-head" : "case-head case-head-solo"}>
        <Starfield preset="header" />
        <div className="container case-head-in">
          <Link href={back.href} className="px case-back" prefetch={false}>
            <span aria-hidden="true">&lt; </span>
            {back.label}
          </Link>
          <div className="case-meta">
            {status && <StatusBadge status={status} />}
            <span className="px case-kicker">{kicker}</span>
          </div>
          <h1>{title}</h1>
          {tagline && <p className="case-tagline">{tagline}</p>}
          {liveUrl && (
            <div className="case-actions">
              <a className="btn" href={liveUrl} rel="noopener">
                Visit {title}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 9 9 3M4 3h5v5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </header>

      {hero && (
        <div className="container">
          <figure
            className={heroIsIllustration ? "case-shot is-illustration" : "case-shot dither-edge dither-edge-lg"}
            style={heroSize && { maxWidth: heroSize.width }}
          >
            {hero}
          </figure>
        </div>
      )}

      <div className="container case-grid">
        <div className="case-main">
          {draft && (
            <p className="draft-note">
              Draft write-up assembled from the project&apos;s repository and dev log. It will be revised.
            </p>
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: sectionsToHtml(sections) }} />
          {after}
        </div>
        <aside className="glance panel" aria-label="At a glance">
          {aside}
        </aside>
      </div>

      {(prev || next) && (
        <div className="container">
          <nav className="case-nav" aria-label={navLabel}>
            {prev && (
              <Link href={prev.href} className="prev" prefetch={false}>
                <span className="px">
                  <span aria-hidden="true">&lt; </span>Previous
                </span>
                <span className="case-nav-title">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link href={next.href} className="next" prefetch={false}>
                <span className="px">
                  Next<span aria-hidden="true"> &gt;</span>
                </span>
                <span className="case-nav-title">{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </article>
  );
}
