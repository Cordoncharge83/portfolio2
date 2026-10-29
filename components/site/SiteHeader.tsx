import Link from "next/link";
import { site } from "@/lib/site";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

/** The floating nav bar; it sits over the first block of every page (see --nav-space). */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-bar">
        <Link className="wordmark" href="/">
          <svg viewBox="0 0 16 22" aria-hidden="true">
            <rect x="3" y="4" width="10" height="14" rx="2" fill="currentColor" />
            <rect x="2" y="2" width="12" height="3" rx="1" fill="currentColor" opacity=".7" />
            <rect x="2" y="17" width="12" height="3" rx="1" fill="currentColor" opacity=".7" />
          </svg>
          {site.name}
        </Link>
        <nav className="nav-links" aria-label="Sections">
          <Link href="/#work">Work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#contact">Contact</Link>
          {site.village.url && <a href={site.village.url}>Village</a>}
        </nav>
        {profile.cvUrl && (
          <a className="btn nav-cv" href={profile.cvUrl} download="Mouadh-Bondka-CV.pdf">
            Download CV
          </a>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
