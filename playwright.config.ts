import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  reporter: [['list'], ['html']],
  use: {
    baseURL: 'https://www.saucedemo.com/v1/index.html',
    browserName: 'chromium',
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
    headless: false,
  },
});
