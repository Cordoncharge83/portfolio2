// Verifies the static export: expected files exist and every internal link resolves to a file.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const errors = [];
const exists = (p) => fs.statSync(path.join(out, p), { throwIfNoEntry: false })?.isFile() ?? false;

const content = JSON.parse(fs.readFileSync(path.join(out, "content.json"), "utf8"));
const required = ["index.html", "404.html", "sitemap.xml", "robots.txt", "content.json", "opengraph-image", "_headers"];
for (const p of content.projects.filter((p) => p.tier === "featured")) {
  required.push(`projects/${p.slug}.html`, `projects/${p.slug}/opengraph-image`);
}
for (const e of content.journal) required.push(`experience/${e.slug}.html`, `experience/${e.slug}/opengraph-image`);
for (const f of required) if (!exists(f)) errors.push(`missing out/${f}`);

// Paths served by another Worker on the same domain (the village game at /village),
// so they are not part of this export.
const mountedElsewhere = new Set(["/village"]);
const villageUrl = process.env.NEXT_PUBLIC_VILLAGE_URL;
if (villageUrl?.startsWith("/")) mountedElsewhere.add(villageUrl.replace(/\/$/, ""));
const isMountedElsewhere = (clean) =>
  [...mountedElsewhere].some((m) => clean === m || clean.startsWith(`${m}/`));

const resolves = (href) => {
  const clean = decodeURIComponent(href.split(/[?#]/)[0]);
  if (isMountedElsewhere(clean.replace(/\/$/, ""))) return true;
  if (clean === "" || clean === "/") return exists("index.html");
  const rel = clean.replace(/^\//, "").replace(/\/$/, "");
  return exists(rel) || exists(`${rel}.html`) || exists(`${rel}/index.html`);
};

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
walk(out);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const [, attr, url] of html.matchAll(/\s(href|src)="(\/[^"]*)"/g)) {
    if (url.startsWith("//")) continue;
    if (!resolves(url)) errors.push(`${path.relative(out, file)}: ${attr}="${url}" does not resolve`);
  }
  if (/\b(TODO|lorem ipsum)\b/i.test(html)) errors.push(`${path.relative(out, file)}: contains placeholder text`);
}

// Content still to fill in: reported, never fatal.
const gaps = [];
for (const p of content.projects) {
  for (const l of p.links) if (!l.href) gaps.push(`${p.slug}: "${l.label}" has no URL yet (hidden on the site)`);
  if (p.tier === "featured" && !p.cover) gaps.push(`${p.slug}: no screenshot yet (placeholder shown)`);
  if (p.draft) gaps.push(`${p.slug}: draft copy`);
}
if (!content.profile.email) gaps.push("profile: no email");
if (!content.profile.cvUrl) gaps.push("profile: no CV");
if (gaps.length) console.log(`content gaps (${gaps.length}):\n  - ${gaps.join("\n  - ")}`);

if (errors.length) {
  console.error(`check-out: ${errors.length} problem(s)\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-out: ${required.length} required files present, ${htmlFiles.length} HTML files with resolvable links`);
