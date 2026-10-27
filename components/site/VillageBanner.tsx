import { site } from "@/lib/site";
import { Lantern } from "@/components/scene/Lantern";

export function VillageBanner({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const url = site.village.url;
  return (
    <aside className="village-banner" id="village" aria-labelledby="village-title">
      <Lantern />
      <div className="grid gap-1.5 min-w-0">
        <Heading id="village-title">Prefer to wander?</Heading>
        <p>
          The same projects and stories live in a small woodland village. Walk in, open the doors, read the
          journal.
        </p>
      </div>
      {url ? (
        <a className="btn btn-lamp" href={url}>
          Explore the village →
        </a>
      ) : (
        <p className="soon">The village is still being built</p>
      )}
    </aside>
  );
}
