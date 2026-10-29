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
  if (shot.native) {
    const file = path.join(outDir, `${shot.name}.webp`);
    const info = await sharp(input)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(file);
    console.log(`${file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
    if (shot.card) {
      // The card copy for a native cover (its cardSrc), same framing.
      const cardFile = path.join(outDir, `${shot.name}-640.webp`);
      const card = await sharp(input).resize({ width: 640 }).webp({ quality: 80, effort: 6 }).toFile(cardFile);
      console.log(`${cardFile}  ${card.width}x${card.height}  ${Math.round(card.size / 1024)} KB`);
    }
    continue;
  }
  // Keep in step with the widths in lib/images.ts.
  for (const width of [640, 960, 1280, 1920]) {
    const file = path.join(outDir, `${shot.name}-${width}.webp`);
    const info = await sharp(input)
      .resize({ width, height: Math.round((width * 9) / 16), fit: "cover", position: "top" })
      .webp({ quality: 80, effort: 6 })
      .toFile(file);
    console.log(`${file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
