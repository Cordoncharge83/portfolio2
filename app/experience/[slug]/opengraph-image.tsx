import { getJournal, getJournalEntry } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const dynamicParams = false;
export const alt = "Experience entry from Mouadh's portfolio, over a dusk village scene";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getJournal().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getJournalEntry((await params).slug)!;
  return renderOgImage({ kicker: entry.period.label, title: entry.org, subtitle: entry.role });
}
