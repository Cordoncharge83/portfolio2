import { defineConfig, devices } from "@playwright/test";

const port = 8787;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  // Serve the static export through Wrangler so routing matches Cloudflare (404 page, trailing slashes, _headers).
  webServer: {
    command: `npx wrangler dev --port ${port} --ip 127.0.0.1`,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
  ],
});
