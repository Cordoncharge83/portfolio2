import { profile } from "@/content/profile";
import { site } from "@/lib/site";

/**
 * The current project, under the hero. Static text, so it is a labelled region rather than a
 * live status. Once the village is published, the main line announces it and links to it.
 */
export function NowStrip() {
  const villageUrl = site.village.url;
  const { note } = profile.now;

  return (
    <div className="container now-wrap">
      <section className="panel now" aria-labelledby="now-label">
        <span id="now-label" className="px now-label">
          Now
        </span>
        <span className="now-dot" aria-hidden="true" />
        <strong className="now-main">{villageUrl ? <a href={villageUrl}>{profile.now.live}</a> : profile.now.soon}</strong>
        {note && <span className="now-note">{note}</span>}
      </section>
    </div>
  );
}
