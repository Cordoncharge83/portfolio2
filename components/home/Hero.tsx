import { getProject, renderInline, type ProjectImage } from "@/lib/content";
import { cardSrcSetFor } from "@/lib/images";
import { profile } from "@/content/profile";
import { HeroScene } from "@/components/scene/HeroScene";
import { Starfield } from "@/components/scene/Starfield";
import { NightSource } from "@/components/ui/NightSource";

/* About 450px beside the headline; 80% of the column on phones. */
const sizes = "(min-width: 861px) 460px, 80vw";

/**
 * One decorative screenshot beside the headline, from a project's cover. Card-sized files, so the
 * home page never loads the full-size renditions. It is in the first screen, so it is eager: a
 * night variant is a <picture> source, and only the variant matching the theme is downloaded.
 */
function Shot({ image, className }: { image: ProjectImage; className: string }) {
  const light = image.cardSrc ?? image.src;
  const dark = image.darkCardSrc ?? image.darkSrc;
  const img = { width: image.width, height: image.height, sizes, decoding: "async" as const };

  /* eslint-disable @next/next/no-img-element -- static export: pre-sized WebP files, no optimizer */
  return (
    <div className={`hero-shot ${className}`}>
      {dark ? (
        <picture>
          <NightSource srcSet={cardSrcSetFor(dark, image) ?? dark} sizes={sizes} />
          <img src={light} srcSet={cardSrcSetFor(light, image)} alt="" {...img} />
        </picture>
      ) : (
        <img src={light} srcSet={cardSrcSetFor(light, image)} alt="" {...img} />
      )}
    </div>
  );
  /* eslint-enable @next/next/no-img-element */
}

/** The cover of each project named in profile.heroShots; a missing one fails the build. */
function heroShot(slug: string): ProjectImage {
  const cover = getProject(slug)?.cover;
  if (!cover) throw new Error(`content/profile.ts heroShots: "${slug}" is not a project with a cover`);
  return cover;
}

export function Hero() {
  const [back, front] = profile.heroShots.map(heroShot);

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
          <Shot image={back} className="hero-shot-back" />
          <Shot image={front} className="hero-shot-front" />
        </div>
      </div>
    </section>
  );
}
