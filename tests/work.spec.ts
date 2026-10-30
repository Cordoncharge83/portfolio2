import { expect, test } from "@playwright/test";

test("work filter shows one category at a time", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  const visibleItems = work.locator(".cards > li:visible, .minor-list > li:visible");
  const categories = () => visibleItems.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.category));
  const total = await visibleItems.count();
  expect(total).toBeGreaterThan(3);
  expect(new Set(await categories())).toEqual(new Set(["software", "game"]));

  const software = work.getByRole("button", { name: "Software" });
  await software.click();
  await expect(software).toHaveAttribute("aria-pressed", "true");
  await expect(work.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  const softwareOnly = await categories();
  expect(softwareOnly.length).toBeGreaterThan(0);
  expect(softwareOnly.every((c) => c === "software")).toBe(true);
  await expect(work.getByRole("status")).toHaveText(`Showing ${softwareOnly.length} projects`);

  await work.getByRole("button", { name: "Games" }).click();
  const gamesOnly = await categories();
  expect(gamesOnly.length).toBeGreaterThan(0);
  expect(gamesOnly.every((c) => c === "game")).toBe(true);
  expect(softwareOnly.length + gamesOnly.length).toBe(total);

  await work.getByRole("button", { name: "All" }).click();
  await expect(visibleItems).toHaveCount(total);
});

test("the village is a game card with its case study and a link to play it", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  const village = work.locator(".cards > li", { has: page.getByRole("heading", { name: "The Sleeping Village" }) });
  await expect(village).toBeVisible();
  await expect(village).toHaveAttribute("data-category", "game");
  await expect(village.getByRole("link", { name: /Play the village/ })).toHaveAttribute("href", /\/village\/$/);

  await work.getByRole("button", { name: "Software" }).click();
  await expect(village).toBeHidden();
  await work.getByRole("button", { name: "Games" }).click();
  await expect(village).toBeVisible();

  await village.getByRole("link", { name: "The Sleeping Village", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/sleeping-village$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Sleeping Village");
});

test("each card links to its case study", async ({ page }) => {
  await page.goto("/");
  await page.locator("#work").getByRole("link", { name: "Bargainy", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/bargainy$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bargainy");
});
