import { profile } from "@/content/profile";
import { renderInline } from "@/lib/content";
import { DuskVillage } from "@/components/scene/DuskVillage";

export function Hero() {
  return (
    <section className="grid gap-8 pt-12 pb-4" aria-labelledby="hero-title">
      <div className="grid gap-5 max-w-[42rem]">
        <p className="label">{profile.roleLine}</p>
        <h1
          id="hero-title"
          className="hero-title"
          dangerouslySetInnerHTML={{ __html: renderInline(profile.headline) }}
        />
        <div className="grid gap-3 text-[1.25rem] text-muted max-w-[36rem]">
          {profile.lede.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a className="btn btn-primary" href="#work">
            View work
          </a>
          {profile.cvUrl && (
            <a className="btn btn-ghost" href={profile.cvUrl}>
              Download CV
            </a>
          )}
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <DuskVillage />
    </section>
  );
}
