import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container px">
        <span>© 2026 {site.name}</span>
        <span>{new URL(site.url).host}</span>
      </div>
    </footer>
  );
}
