import type { MetadataRoute } from "next";
import { getFeaturedProjects, getJournal } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    ...getFeaturedProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.8 })),
    ...getJournal().map((e) => ({ url: `${site.url}/experience/${e.slug}`, priority: 0.6 })),
  ];
}
