// Visual check: screenshots of key routes at desktop and phone width, in both themes.
// Usage: node scripts/screens.mjs [baseUrl] [outDir]
import { chromium } from "playwright";
import fs from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:8787";
const outDir = process.argv[3] ?? "screenshots";
const routes = process.env.ROUTES?.split(",") ?? ["/", "/projects/smosh-story-finder", "/experience/sopra-steria", "/nope"];
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [device, width, height] of [["desktop", 1280, 800], ["phone", 390, 844]]) {
  for (const scheme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme: scheme, deviceScaleFactor: 1 });
    page.on("pageerror", (e) => console.log(`[${device}/${scheme}] pageerror`, e.message));
    page.on("console", (m) => m.type() === "error" && console.log(`[${device}/${scheme}] console`, m.text()));
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      // Scroll through so lazy images load before the full-page capture.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) console.log(`[${device}/${scheme}] ${route} overflows by ${overflow}px`);
      const name = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
      await page.screenshot({ path: `${outDir}/${name}-${device}-${scheme}.png`, fullPage: true });
    }
    await page.close();
  }
}
await browser.close();
console.log("done");
