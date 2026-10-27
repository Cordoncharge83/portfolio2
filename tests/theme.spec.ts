import { expect, test } from "@playwright/test";

const DUSK_BG = "rgb(20, 27, 23)";
const DAY_BG = "rgb(244, 236, 221)";
const bodyBg = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme", () => {
  test("follows the OS preference by default", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    expect(await bodyBg(page)).toBe(DUSK_BG);
    await page.emulateMedia({ colorScheme: "light" });
    expect(await bodyBg(page)).toBe(DAY_BG);
  });

  test("a stored choice wins over the OS before first paint", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForSelector("body");
    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
    expect(await bodyBg(page)).toBe(DUSK_BG);
  });

  test("the toggle persists, and switching back to the OS theme clears the override", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to dusk theme/i });
    await toggle.click();
    expect(await bodyBg(page)).toBe(DUSK_BG);
    await page.reload();
    expect(await bodyBg(page)).toBe(DUSK_BG);
    await page.getByRole("button", { name: /switch to day theme/i }).click();
    expect(await bodyBg(page)).toBe(DAY_BG);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  });

  test("reduced motion stops the window flicker", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const name = await page.locator(".glow").first().evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toBe("none");
  });
});
