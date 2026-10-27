import { profile } from "@/content/profile";
import { Chapter } from "@/components/ui/Chapter";
import { VillageBanner } from "@/components/site/VillageBanner";

export function ContactSection() {
  return (
    <>
      <section className="chapter" aria-label="The village">
        <VillageBanner />
      </section>
      <Chapter id="contact" numeral="IV." title="Contact">
        <p className="max-w-[40rem] text-muted">
          For work, collaborations or questions about any of these projects.
        </p>
        <ul className="contact-list">
          {profile.email && (
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          )}
          {profile.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} rel="me noopener">
                {s.label} ↗
              </a>
            </li>
          ))}
          {profile.cvUrl && (
            <li>
              <a href={profile.cvUrl}>CV (PDF)</a>
            </li>
          )}
        </ul>
      </Chapter>
    </>
  );
}
