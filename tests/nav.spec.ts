import { expect, test, type Page } from "@playwright/test";

/** True when focus is on or inside the section, or anywhere after it in the page. */
const focusFromSection = (page: Page, id: string) =>
  page.evaluate((id) => {
    const section = document.getElementById(id)!;
    const active = document.activeElement!;
    return section.contains(active) || !!(section.compareDocumentPosition(active) & Node.DOCUMENT_POSITION_FOLLOWING);
  }, id);

test.describe("section links (desktop bar)", () => {
  test.skip(({ isMobile }) => isMobile, "the bar's section links are in the Menu on phones");

  for (const [from, label, id] of [
    ["/", "Skills", "skills"],
    ["/projects/comp-atlas", "Contact", "contact"],
  ] as const) {
    test(`from ${from}, "${label}" moves keyboard focus to the section`, async ({ page }) => {
      await page.goto(from);
      await page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: label }).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/#${id}$`));
      await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe(id);
      await page.keyboard.press("Tab");
      expect(await focusFromSection(page, id)).toBe(true);
      expect(await page.evaluate(() => !!document.activeElement?.closest(".site-header"))).toBe(false);
    });
  }
});

test.describe("phone menu", () => {
  test.skip(({ isMobile }) => !isMobile, "the Menu only shows at 860px and below");

  test("opens the section links, and closes on Escape, outside clicks and navigation", async ({ page }) => {
    await page.goto("/projects/bargainy");
    const menu = page.locator(".nav-menu");
    const button = menu.locator("summary");
    const sections = page.getByRole("navigation", { name: "Sections" });
    await expect(button).toHaveText("Menu");
    await expect(sections).toBeHidden();

    await button.click();
    await expect(menu).toHaveJSProperty("open", true);
    await expect(sections.getByRole("link")).toHaveText(["Work", "Experience", "Skills", "Contact"]);
    // The bar has no room for the CV button on a phone, so the menu holds it.
    await expect(menu.getByRole("link", { name: "Download CV" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toHaveJSProperty("open", false);
    await expect(button).toBeFocused();

    await button.click();
    // A tap on the page, clear of the panel (which hangs from the bar's right edge).
    await page.getByRole("heading", { level: 1 }).click({ position: { x: 4, y: 4 } });
    await expect(menu).toHaveJSProperty("open", false);

    await button.click();
    await sections.getByRole("link", { name: "Skills" }).click();
    await expect(page).toHaveURL(/\/#skills$/);
    await expect(menu).toHaveJSProperty("open", false);
    await expect(page.locator("#skills")).toBeInViewport();
    await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe("skills");
  });

  test("tabbing out of the open menu closes it", async ({ page }) => {
    await page.goto("/");
    const menu = page.locator(".nav-menu");
    await menu.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveJSProperty("open", true);
    // Four links and the CV button, then out of the menu to the theme toggle.
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    await expect(page.locator(".theme-toggle")).toBeFocused();
    await expect(menu).toHaveJSProperty("open", false);
  });
});

test.describe("phone menu without JavaScript", () => {
  test.skip(({ isMobile }) => !isMobile, "the Menu only shows at 860px and below");
  test.use({ javaScriptEnabled: false });

  test("still opens", async ({ page }) => {
    await page.goto("/experience/wake");
    await page.locator(".nav-menu summary").click();
    await expect(page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: "Work" })).toBeVisible();
  });
});

test("a new page starts at the top, without scrolling up from the old offset", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#work a.card-link").last();
  await card.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(300);
  await card.click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => scrollY)).toBe(0);
});
