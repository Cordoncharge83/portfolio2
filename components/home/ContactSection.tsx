import { profile } from "@/content/profile";
import { PinesBand } from "@/components/scene/PinesBand";
import { Starfield } from "@/components/scene/Starfield";

/** The closing band: email, CV and socials over a pine silhouette (and stars at night). */
export function ContactSection() {
  const socials = profile.socials.filter((s) => s.href);

  return (
    <section id="contact" className="band" aria-labelledby="contact-title">
      <Starfield preset="band" className="band-sky" />
      <div className="container band-in">
        <p className="px band-label">Contact</p>
        <h2 id="contact-title">Let&apos;s build something</h2>
        <p className="band-lede">For work, collaborations or questions about any of these projects.</p>
        {profile.email && (
          <a className="band-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        )}
        {(profile.cvUrl || socials.length > 0) && (
          <div className="band-btns">
            {profile.cvUrl && (
              <a className="btn" href={profile.cvUrl} download="Mouadh-Bondka-CV.pdf">
                Download CV
              </a>
            )}
            {socials.map((s) => (
              <a key={s.href} className="btn-line" href={s.href} rel="me noopener">
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <PinesBand />
    </section>
  );
}
