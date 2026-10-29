import Link from "next/link";
import { getJournal, journalKindLabel, metaLabel, yearSpan } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Tags } from "@/components/ui/Tags";

/** Jobs as dated rows, then studies and leadership as two cards. Each links to its journal page. */
export function ExperienceSection() {
  const journal = getJournal();
  const work = journal.filter((e) => e.kind === "work");
  const other = journal.filter((e) => e.kind !== "work");

  return (
    <section id="experience" className="section section-alt" aria-labelledby="experience-title" tabIndex={-1}>
      <div className="container">
        <SectionHead id="experience-title" eyebrow={yearSpan(journal.map((e) => e.period))} title="Experience" />
        <ol className="xp-list">
          {work.map((e) => (
            <li key={e.slug} className="xp-item">
              <h3>
                <Link href={`/experience/${e.slug}`} className="xp-link" prefetch={false}>
                  {e.org} <span className="xp-role">·&nbsp;{e.role}</span>
                </Link>
              </h3>
              {/* In the left column on screen, read after the title. */}
              <p className="px xp-when">{e.period.label}</p>
              <p className="xp-summary">{e.summary}</p>
              {e.highlights.length > 0 && <Tags items={e.highlights} label={`${e.org} highlights`} />}
            </li>
          ))}
        </ol>
        {other.length > 0 && (
          <div className="pair">
            {other.map((e) => (
              <article key={e.slug} className="panel pair-card">
                <h3>
                  {/* Stretched over the whole card (.pair-link::after). */}
                  <Link href={`/experience/${e.slug}`} className="pair-link" prefetch={false}>
                    {e.org}
                  </Link>
                </h3>
                {/* Shown above the title (CSS order), read after it. */}
                <p className="px pair-meta">{metaLabel(journalKindLabel[e.kind], e.period.label)}</p>
                <p className="pair-summary">{e.summary}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
