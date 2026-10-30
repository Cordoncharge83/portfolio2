import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/*
 * Content lives in Markdown files with YAML frontmatter (content/projects, content/journal).
 * Everything here runs at build time; the parsed bundle is also published as /content.json
 * so the village game can reuse the same data, keyed by slug.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

const period = z.object({
  start: z.string().regex(/^\d{4}(-\d{2})?$/),
  end: z
    .string()
    .regex(/^\d{4}(-\d{2})?$/)
    .nullish(),
  label: z.string(),
});

const link = z.object({
  kind: z.enum(["live", "site", "docs", "writeup", "repo", "access"]),
  label: z.string(),
  href: z.url().nullable(),
  note: z.string().optional(),
});

const image = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** Optional night variant shown when the dark theme is active. */
  darkSrc: z.string().optional(),
  /** Smaller rendition for cards. */
  cardSrc: z.string().optional(),
  darkCardSrc: z.string().optional(),
});

const galleryImage = z.object({
  src: z.string(),
  darkSrc: z.string().optional(),
  alt: z.string(),
  caption: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const thumbKey = z.enum(["search", "chat", "bracket", "ranks", "grid", "vr", "island", "village"]);

const projectFrontmatter = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  tagline: z.string().nullish(),
  category: z.enum(["software", "game"]),
  tier: z.enum(["featured", "compact"]),
  contextLabel: z.string(),
  period,
  status: z.enum(["live", "beta", "closed-beta", "in-development", "archived"]),
  statusNote: z.string().nullish(),
  liveUrl: z.url().nullable(),
  order: z.number(),
  summary: z.string().max(240),
  highlights: z.array(z.string()).default([]),
  takeaway: z.string().nullish(),
  stack: z.array(z.string()),
  links: z.array(link).default([]),
  cover: image.nullish(),
  gallery: z.array(galleryImage).default([]),
  thumb: thumbKey,
  draft: z.boolean().default(false),
});

const journalFrontmatter = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  kind: z.enum(["work", "education", "leadership"]),
  title: z.string(),
  org: z.string(),
  role: z.string(),
  focus: z.string().nullish(),
  location: z.string().nullish(),
  period,
  order: z.number(),
  summary: z.string().max(240),
  highlights: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type Period = z.infer<typeof period>;
export type Link = z.infer<typeof link>;
export type ProjectImage = z.infer<typeof image>;
export type GalleryImage = z.infer<typeof galleryImage>;
export type ThumbKey = z.infer<typeof thumbKey>;
export type ProjectStatus = z.infer<typeof projectFrontmatter>["status"];

export interface Section {
  id: string;
  heading: string;
  html: string;
}

export type Project = z.infer<typeof projectFrontmatter> & { sections: Section[] };
export type JournalEntry = z.infer<typeof journalFrontmatter> & { sections: Section[] };

const markdown = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify);

export function renderMarkdown(source: string): string {
  // Code blocks scroll sideways on narrow screens, so keyboard users must be able to focus them.
  return String(markdown.processSync(source)).replace(/<pre>/g, '<pre tabindex="0">');
}

/** Render a one-line Markdown string (e.g. a summary with *emphasis*) without the wrapping <p>. */
export function renderInline(source: string): string {
  return renderMarkdown(source)
    .trim()
    .replace(/^<p>([\s\S]*)<\/p>$/, "$1");
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function splitSections(body: string): Section[] {
  const sections: Section[] = [];
  const parts = body.split(/^## +/m);
  const intro = parts.shift()?.trim();
  if (intro) sections.push({ id: "overview", heading: "", html: renderMarkdown(intro) });
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const heading = (newline === -1 ? part : part.slice(0, newline)).trim();
    const text = newline === -1 ? "" : part.slice(newline + 1).trim();
    sections.push({ id: slugify(heading), heading, html: renderMarkdown(text) });
  }
  return sections;
}

function readDir<T>(dir: string, parse: (data: unknown, file: string) => T): T[] {
  const full = path.join(CONTENT_DIR, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      const entry = parse(data, file) as T & { slug: string; sections: Section[] };
      if (`${entry.slug}.md` !== file) throw new Error(`content/${dir}/${file}: slug "${entry.slug}" must match file name`);
      entry.sections = splitSections(content);
      return entry;
    });
}

function parseWith<S extends z.ZodType>(schema: S, dir: string) {
  return (data: unknown, file: string): z.infer<S> & { sections: Section[] } => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error(`content/${dir}/${file} has invalid frontmatter:\n${z.prettifyError(result.error)}`);
    }
    return Object.assign({}, result.data as z.infer<S>, { sections: [] as Section[] });
  };
}

let cache: { projects: Project[]; journal: JournalEntry[] } | null = null;

function load() {
  if (cache) return cache;
  const projects = readDir<Project>("projects", parseWith(projectFrontmatter, "projects")).sort(
    (a, b) => a.order - b.order,
  );
  const journal = readDir<JournalEntry>("journal", parseWith(journalFrontmatter, "journal")).sort(
    (a, b) => a.order - b.order,
  );
  cache = { projects, journal };
  return cache;
}

export const getProjects = () => load().projects;
export const getFeaturedProjects = () => load().projects.filter((p) => p.tier === "featured");
export const getCompactProjects = () => load().projects.filter((p) => p.tier === "compact");
export const getProject = (slug: string) => load().projects.find((p) => p.slug === slug);

export const getJournal = () => load().journal;
export const getJournalEntry = (slug: string) => load().journal.find((e) => e.slug === slug);

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "closed-beta": "Closed beta",
  "in-development": "In development",
  archived: "Archived",
};

/** What each kind of journal entry is called on the site ("Studies", not "Education"). */
export const journalKindLabel: Record<JournalEntry["kind"], string> = {
  work: "Work",
  education: "Studies",
  leadership: "Leadership",
};

/**
 * "Context · period" for the pixel labels. Non-breaking spaces keep a month with its year, "·"
 * and "–" at the end of a line (never the start), and a one-word period ("2024") with the "·"
 * before it, so a year is never left alone on a line.
 */
export function metaLabel(context: string, period: string): string {
  const glued = period.replace(/ (\d{4})/g, "\u00a0$1").replace(/ – /g, "\u00a0– ");
  return `${context}\u00a0·${glued.includes(" ") ? " " : "\u00a0"}${glued}`;
}

/** "2022–2025": the earliest start year to the latest end (or start) year. */
export function yearSpan(periods: Period[]): string {
  const year = (date: string) => Number(date.slice(0, 4));
  const first = Math.min(...periods.map((p) => year(p.start)));
  const last = Math.max(...periods.map((p) => year(p.end ?? p.start)));
  return first === last ? `${first}` : `${first}–${last}`;
}
