// Converts raw screenshots into the WebP renditions the site serves.
// Usage: node scripts/optimize-shots.mjs <rawDir>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rawDir = process.argv[2];
if (!rawDir) {
  console.error("usage: node scripts/optimize-shots.mjs <rawDir>");
  process.exit(1);
}
const { shots } = JSON.parse(fs.readFileSync(new URL("./shots.config.json", import.meta.url), "utf8"));

for (const shot of shots) {
  const input = path.join(rawDir, shot.raw);
  const outDir = path.join("public", "shots", shot.slug);
  fs.mkdirSync(outDir, { recursive: true });
  for (const width of [960, 1920]) {
    const file = path.join(outDir, `${shot.name}-${width}.webp`);
    const info = await sharp(input)
      .resize({ width, height: Math.round((width * 9) / 16), fit: "cover", position: "top" })
      .webp({ quality: 80, effort: 6 })
      .toFile(file);
    console.log(`${file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
