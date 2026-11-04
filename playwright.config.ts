import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  reporter: [['list'], ['json', { outputFile: 'artifacts-local/ui-results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:1420',
    channel: process.env.CI ? undefined : 'msedge',
    viewport: { width: 1440, height: 1100 },
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'pnpm --filter @relay-link/desktop dev',
      url: 'http://127.0.0.1:1420',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'node tooling/serve-mobile.mjs',
      url: 'http://127.0.0.1:8082',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
