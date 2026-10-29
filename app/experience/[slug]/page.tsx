import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournal, getJournalEntry, journalKindLabel, metaLabel } from "@/lib/content";
import { EntryLayout } from "@/components/entry/EntryLayout";
import { Tags } from "@/components/ui/Tags";
import { baseOpenGraph } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getJournal().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experience/[slug]">): Promise<Metadata> {
  const entry = getJournalEntry((await params).slug);
  if (!entry) return {};
  const title = entry.kind === "work" ? `${entry.role} at ${entry.org}` : entry.org;
  return {
    title,
    description: entry.summary,
    alternates: { canonical: `/experience/${entry.slug}` },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url: `/experience/${entry.slug}`,
      title,
      description: entry.summary,
    },
  };
}

export default async function ExperiencePage({ params }: PageProps<"/experience/[slug]">) {
  const entry = getJournalEntry((await params).slug);
  if (!entry) notFound();

  const all = getJournal();
  const i = all.findIndex((e) => e.slug === entry.slug);
  const toNeighbour = (e?: (typeof all)[number]) => e && { href: `/experience/${e.slug}`, title: e.org };

  return (
    <EntryLayout
      back={{ href: "/#experience", label: "All experience" }}
      navLabel="More experience"
      kicker={metaLabel(journalKindLabel[entry.kind], entry.period.label)}
      title={entry.org}
      tagline={entry.role}
      sections={entry.sections}
      draft={entry.draft}
      prev={toNeighbour(all[i - 1])}
      next={toNeighbour(all[i + 1])}
      aside={
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{entry.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{entry.period.label}</dd>
          </div>
          {entry.location && (
            <div>
              <dt>Where</dt>
              <dd>{entry.location}</dd>
            </div>
          )}
          {entry.highlights.length > 0 && (
            <div>
              <dt>Highlights</dt>
              <dd>
                <ul className="glance-list">
                  {entry.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {entry.stack.length > 0 && (
            <div>
              <dt>Stack</dt>
              <dd>
                <Tags items={entry.stack} label={`${entry.org} stack`} />
              </dd>
            </div>
          )}
        </dl>
      }
    />
  );
}
