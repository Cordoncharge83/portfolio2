import Link from "next/link";
import { getJournal } from "@/lib/content";
import { Chapter } from "@/components/ui/Chapter";
import { Tags } from "@/components/ui/Tags";

export function ExperienceSection() {
  const journal = getJournal();
  const work = journal.filter((e) => e.kind === "work");
  const other = journal.filter((e) => e.kind !== "work");

  return (
    <Chapter id="experience" numeral="II." title="Experience">
      <ol className="timeline">
        {work.map((e) => (
          <li key={e.slug} className="entry">
            <span className="when">{e.period.label}</span>
            <h3>
              <Link href={`/experience/${e.slug}`}>
                {e.role} · {e.org}
              </Link>
            </h3>
            <p>{e.summary}</p>
            {e.highlights.length > 0 && <Tags items={e.highlights} label={`${e.org} highlights`} />}
            <Link href={`/experience/${e.slug}`} className="read-more">
              Read the full entry<span className="sr-only"> on {e.org}</span> →
            </Link>
          </li>
        ))}
      </ol>
      <div className="side-entries">
        {other.map((e) => (
          <article key={e.slug} className="side-entry">
            <span className="label">{e.kind === "education" ? "Studies" : "Beyond the code"}</span>
            <h3>
              <Link href={`/experience/${e.slug}`} className="text-ink no-underline hover:text-clay">
                {e.org}
              </Link>
            </h3>
            <p className="label">
              {e.role} · {e.period.label}
            </p>
            <p>{e.summary}</p>
            <Link href={`/experience/${e.slug}`} className="read-more">
              Read more<span className="sr-only"> about {e.org}</span> →
            </Link>
          </article>
        ))}
      </div>
    </Chapter>
  );
}
