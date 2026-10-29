import { getProject, renderInline, type ProjectImage } from "@/lib/content";
import { profile } from "@/content/profile";
import { HeroScene } from "@/components/scene/HeroScene";
import { Starfield } from "@/components/scene/Starfield";

/**
 * One decorative screenshot beside the headline, from a project's cover. Card-sized files, so the
 * home page never loads the 1920px renditions. The light image is eager (it is in the first
 * screen); the night variant is lazy, so the hidden copy is never downloaded by day.
 */
function Shot({ image, className }: { image: ProjectImage; className: string }) {
  const light = image.cardSrc ?? image.src;
  const dark = image.darkCardSrc ?? image.darkSrc;
  const size = { width: image.width, height: image.height, decoding: "async" as const };

  /* eslint-disable @next/next/no-img-element -- static export: pre-sized WebP files, no optimizer */
  return (
    <div className={`hero-shot ${className}`}>
      {dark ? (
        <>
          <img src={light} alt="" {...size} className="day-only" />
          <img src={dark} alt="" {...size} loading="lazy" className="night-only" />
        </>
      ) : (
        <img src={light} alt="" {...size} />
      )}
    </div>
  );
  /* eslint-enable @next/next/no-img-element */
}

export function Hero() {
  const back = getProject("comp-atlas")?.cover;
  const front = getProject("smosh-story-finder")?.cover;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Starfield preset="hero" className="hero-sky" />
      <HeroScene />
      <div className="container hero-in">
        <div>
          <p className="px hero-eyebrow">{profile.roleLine}</p>
          <h1
            id="hero-title"
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: renderInline(profile.headline) }}
          />
          <p className="hero-lede">{profile.lede}</p>
          <div className="hero-actions">
            <a className="btn" href="#work">
              View work
            </a>
            <a className="ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        {/* Two overlapping screenshots; decoration only, the projects are described below. */}
        <div className="hero-shots" aria-hidden="true">
          {back && <Shot image={back} className="hero-shot-back" />}
          {front && <Shot image={front} className="hero-shot-front" />}
        </div>
      </div>
    </section>
  );
}
