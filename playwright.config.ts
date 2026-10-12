import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  reporter: [['list'], ['json', { outputFile: 'evidence/playwright-results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4173', channel: 'msedge', headless: true },
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
});
