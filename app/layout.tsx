import type { Metadata, Viewport } from "next";
import { instrumentSans, instrumentSansItalic, pixelify, silkscreen } from "./fonts";
import { baseOpenGraph, site } from "@/lib/site";
import { profile } from "@/content/profile";
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
  authors: [{ name: profile.fullName, url: site.url }],
  openGraph: { ...baseOpenGraph, type: "website", url: "/", description },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9ebd7" },
    { media: "(prefers-color-scheme: dark)", color: "#031211" },
  ],
};

const fontVariables = [pixelify, instrumentSans, instrumentSansItalic, silkscreen].map((f) => f.variable).join(" ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: Next turns smooth scrolling off during route changes, so a new page starts at the top.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={fontVariables}>
      <head>
        <ThemeScript />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* The header floats over the first block of each page. */}
        <div className="page">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
