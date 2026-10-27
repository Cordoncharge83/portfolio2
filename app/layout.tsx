import type { Metadata, Viewport } from "next";
import { alegreya, alegreyaSC, caveat, fraunces } from "./fonts";
import { site } from "@/lib/site";
import { ThemeScript } from "@/components/site/ThemeScript";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import "./globals.css";

const description =
  "Software engineer building AI applications, dependable backends and products on Cloudflare, plus the occasional game. Case studies: Smosh Story Finder, Bargainy, DuelSync, Comp Atlas.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Software engineer & game developer`, template: `%s · ${site.name}` },
  description,
  openGraph: { siteName: site.name, locale: "en", type: "website", description },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4ecdd" },
    { media: "(prefers-color-scheme: dark)", color: "#141b17" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${alegreya.variable} ${alegreyaSC.variable} ${caveat.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="wrap">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
