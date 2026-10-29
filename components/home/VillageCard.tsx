import { site } from "@/lib/site";
import { profile } from "@/content/profile";
import { PixelVillage } from "@/components/scene/PixelVillage";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** The village game's card in the work grid: "Coming soon" until site.village.url is set. */
export function VillageCard() {
  const url = site.village.url;
  const copy = profile.village;
  return (
    <article className="card card-village panel">
      <span className="card-icon">
        <ProjectIcon kind="village" />
      </span>
      <h3>{copy.title}</h3>
      <div className="card-meta">{url ? <StatusBadge status="live" /> : <span className="tag">Coming soon</span>}</div>
      <p className="card-summary">{copy.summary}</p>
      <div className="card-art">
        <PixelVillage />
      </div>
      {/* Kept even when empty, so the art lines up with the screenshots in the same row. */}
      <div className="card-foot">
        {url && (
          <a className="text-link" href={url}>
            Open the village<span aria-hidden="true"> ↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
