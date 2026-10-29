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
    const animations = () =>
      page.evaluate(() =>
        [".hero .twinkle", ".now-dot"].map((s) => getComputedStyle(document.querySelector(s)!).animationName),
      );
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
