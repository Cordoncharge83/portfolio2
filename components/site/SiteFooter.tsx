import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        © 2026 {site.name}. Built with Next.js, hosted on Cloudflare.
      </span>
    </footer>
  );
}
