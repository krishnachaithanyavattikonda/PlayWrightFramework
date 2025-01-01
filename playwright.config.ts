import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  reporter: [['list'], ['html']],
  use: {
    baseURL: 'https://www.saucedemo.com/v1/index.html', // Global base URL for UI tests
    browserName: 'chromium',
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
    headless: false,
  },
  workers: 4,
  projects: [
    {
      name: 'UI Tests',
      testDir: './tests/ui', 
      use: {
        viewport: { width: 1280, height: 720 }, 
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/api', 
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com', 
      },
    },
  ],
  fullyParallel: true
});
