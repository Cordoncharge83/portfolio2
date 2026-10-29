import { getJournal, getJournalEntry, journalKindLabel, yearSpan } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const dynamicParams = false;
export const alt = "Experience entry from Mouadh's portfolio, over a moonlit pine forest";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getJournal().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getJournalEntry((await params).slug)!;
  return renderOgImage({
    // Years only: the full dates would wrap the kicker beside the moon.
    kicker: `${journalKindLabel[entry.kind]} · ${yearSpan([entry.period])}`,
    title: entry.org,
    subtitle: entry.role,
  });
}
