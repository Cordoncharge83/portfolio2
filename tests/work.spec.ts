import { expect, test } from "@playwright/test";

test("work filter shows one category at a time", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  const visibleCards = work.locator(".cards > li:visible");
  const total = await visibleCards.count();
  expect(total).toBeGreaterThan(3);

  const software = work.getByRole("button", { name: "Software" });
  await software.click();
  await expect(software).toHaveAttribute("aria-pressed", "true");
  await expect(work.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  for (const tag of await visibleCards.locator(".tag-cat").allTextContents()) expect(tag).toBe("Software");

  await work.getByRole("button", { name: "Games" }).click();
  for (const tag of await visibleCards.locator(".tag-cat").allTextContents()) expect(tag).toBe("Game");

  await work.getByRole("button", { name: "All" }).click();
  await expect(visibleCards).toHaveCount(total);
});

test("each card links to its case study", async ({ page }) => {
  await page.goto("/");
  await page.locator("#work").getByRole("link", { name: "Bargainy", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/bargainy$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bargainy");
});
