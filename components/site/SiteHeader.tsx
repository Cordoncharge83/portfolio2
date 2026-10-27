import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        {site.name}
        <span aria-hidden="true">.</span>
      </Link>
      <nav className="site-nav" aria-label="Sections">
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#skills">Skills</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <div className="header-tools">
        <a className="village-link" href={site.village.url ?? "/#village"}>
          Explore the village →
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
