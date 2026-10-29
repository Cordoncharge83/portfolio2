import { expect, test } from "@playwright/test";

const NIGHT_BG = "rgb(3, 18, 17)"; // Ink Black #031211
const DAY_BG = "rgb(249, 235, 215)"; // Warm Ivory #F9EBD7
const bodyBg = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme", () => {
  test("follows the OS preference by default", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    expect(await bodyBg(page)).toBe(NIGHT_BG);
    await page.emulateMedia({ colorScheme: "light" });
    expect(await bodyBg(page)).toBe(DAY_BG);
  });

  test("a stored choice wins over the OS before first paint", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForSelector("body");
    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
    expect(await bodyBg(page)).toBe(NIGHT_BG);
  });

  test("the toggle persists, and switching back to the OS theme clears the override", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to night theme/i });
    await toggle.click();
    expect(await bodyBg(page)).toBe(NIGHT_BG);
    await page.reload();
    expect(await bodyBg(page)).toBe(NIGHT_BG);
    await page.getByRole("button", { name: /switch to day theme/i }).click();
    expect(await bodyBg(page)).toBe(DAY_BG);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  });

  test("stars only come out at night", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const skies = page.locator("svg.starfield");
    // The hero sky and the contact band's sky.
    await expect(skies).toHaveCount(2);
    for (const sky of await skies.all()) await expect(sky).toBeHidden();

    await page.getByRole("button", { name: /switch to night theme/i }).click();
    for (const sky of await skies.all()) await expect(sky).toBeAttached();
    await expect(page.locator(".hero svg.starfield")).toBeVisible();
    await expect(page.locator("#contact svg.starfield")).toBeVisible();
  });

  test("reduced motion stops the twinkling stars and the pulsing dot", async ({ page }) => {
    // The dot's ring pulses on its ::after (transform and opacity only).
    const animations = () =>
      page.evaluate(() => [
        getComputedStyle(document.querySelector(".hero .twinkle")!).animationName,
        getComputedStyle(document.querySelector(".now-dot")!, "::after").animationName,
      ]);
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    expect(await animations()).toEqual(["twinkle", "now-pulse"]);

    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    expect(await animations()).toEqual(["none", "none"]);
  });
});

test("an explicit choice also sets the browser theme-color", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: /switch to night theme/i }).click();
  const colors = await page.locator('meta[name="theme-color"]').evaluateAll((ms) =>
    ms.map((m) => [m.getAttribute("media"), (m as HTMLMetaElement).content]),
  );
  expect(colors.length).toBeGreaterThan(0);
  expect(colors.every(([media, c]) => media === null && c === "#031211")).toBe(true);
});

/** The theme-color the browser uses: the first meta whose media matches (or has none). */
const themeColor = (page: import("@playwright/test").Page) =>
  page.evaluate(
    () =>
      [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')].find(
        (m) => !m.media || matchMedia(m.media).matches,
      )?.content,
  );

test("an explicit choice keeps the theme-color after a client-side navigation", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: /switch to night theme/i }).click();
  await page.locator("#work a.card-link").first().click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect.poll(() => themeColor(page)).toBe("#031211");
});

test.describe("night screenshots", () => {
  test("a night visitor downloads only the night copy of the hero screenshot", async ({ page }) => {
    const requested: string[] = [];
    page.on("request", (r) => r.url().includes("/shots/smosh-story-finder/") && requested.push(r.url()));
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const front = page.locator(".hero-shot-front img");
    await expect.poll(() => front.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/home-dark-\d+\.webp$/);
    expect(requested.filter((u) => u.includes("home-light"))).toEqual([]);
  });

  test("an explicit choice picks the matching screenshot", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/projects/smosh-story-finder");
    const shot = page.locator(".case-shot img");
    await expect.poll(() => shot.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/home-dark-\d+\.webp$/);
    // Back to day with the toggle: the day copy.
    await page.getByRole("button", { name: /switch to day theme/i }).click();
    await expect.poll(() => shot.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/home-light-\d+\.webp$/);
  });
});

test("print always uses the day palette", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/projects/comp-atlas");
  await page.emulateMedia({ colorScheme: "dark", media: "print" });
  const ink = await page.evaluate(() => getComputedStyle(document.querySelector("h1")!).color);
  expect(ink).toBe("rgb(20, 38, 28)"); // --ink by day, #14261c
  await expect(page.locator(".case-head svg.starfield")).toBeHidden();
});

test("text follows the browser's default font size", async ({ page }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Page.setFontSizes", { fontSizes: { standard: 24 } });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.body).fontSize)).toBe("25.5px"); // 1.0625rem
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
