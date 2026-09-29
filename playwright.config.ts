import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
import { BASE_PATH } from './site.config.ts';

// Lokal sandbox'da oldindan o'rnatilgan Chromium; CI'da `playwright install` qiladi.
const local = '/opt/pw-browsers/chromium';
const executablePath = !process.env.CI && existsSync(local) ? local : undefined;
const PORT = 4173;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 60_000,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH}`,
    trace: 'retain-on-failure',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: 'pixel5', use: { ...devices['Pixel 5'] } },
    // Arzon Android ekrani: 360×640
    { name: 'small-android', use: { ...devices['Galaxy S5'] } },
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}${BASE_PATH}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
