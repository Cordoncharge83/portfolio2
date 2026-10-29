import Link from "next/link";
import { site } from "@/lib/site";
import { profile } from "@/content/profile";
import { NavMenu } from "./NavMenu";
import { SectionLink } from "./SectionLink";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * The floating nav bar; it sits over the first block of every page (see --nav-space). Above
 * 860px the section links sit in the bar; at 860px and below they move into the Menu, which
 * also holds the CV button once the bar hides it (480px and below).
 */
export function SiteHeader() {
  const villageUrl = site.village.url;
  const cv = profile.cvUrl && (
    <a className="btn nav-cv" href={profile.cvUrl} download={profile.cvFileName}>
      Download CV
    </a>
  );

  return (
    <header className="site-header">
      <div className="nav-bar">
        <Link className="wordmark" href="/" prefetch={false}>
          <svg viewBox="0 0 16 22" aria-hidden="true">
            <rect x="3" y="4" width="10" height="14" rx="2" fill="currentColor" />
            <rect x="2" y="2" width="12" height="3" rx="1" fill="currentColor" opacity=".7" />
            <rect x="2" y="17" width="12" height="3" rx="1" fill="currentColor" opacity=".7" />
          </svg>
          {site.name}
        </Link>
        <nav className="nav-links" aria-label="Sections">
          {sections.map((s) => (
            <SectionLink key={s.id} id={s.id}>
              {s.label}
            </SectionLink>
          ))}
          {villageUrl && <a href={villageUrl}>Village</a>}
        </nav>
        <NavMenu>
          <nav aria-labelledby="nav-menu-title">
            <p id="nav-menu-title" className="px nav-menu-title">
              Sections
            </p>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <SectionLink id={s.id}>{s.label}</SectionLink>
                </li>
              ))}
              {villageUrl && (
                <li>
                  <a href={villageUrl}>Village</a>
                </li>
              )}
            </ul>
          </nav>
          {profile.cvUrl && (
            <a className="btn nav-menu-cv" href={profile.cvUrl} download={profile.cvFileName}>
              Download CV
            </a>
          )}
        </NavMenu>
        {cv}
        <ThemeToggle />
      </div>
    </header>
  );
}
