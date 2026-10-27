import { expect, test } from "@playwright/test";
import { routes } from "./routes";

for (const route of routes) {
  test(`${route} renders without errors or horizontal scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("unknown paths return the 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("isn't on the map");
});

test("section links work from a detail page", async ({ page }) => {
  await page.goto("/projects/bargainy");
  await page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/\/#experience$/);
  await expect(page.locator("#experience")).toBeInViewport();
});

test("content.json exposes every entry for the game", async ({ request }) => {
  const res = await request.get("/content.json");
  expect(res.headers()["content-type"]).toContain("application/json");
  const data = await res.json();
  expect(data.schemaVersion).toBe(1);
  expect(data.projects.map((p: { slug: string }) => p.slug)).toContain("smosh-story-finder");
  expect(data.journal).toHaveLength(4);
});

test("Open Graph images are served as PNG", async ({ request }) => {
  for (const path of ["/opengraph-image", "/projects/duelsync/opengraph-image", "/experience/wake/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
  }
});
