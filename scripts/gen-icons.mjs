// public/icons/icon.svg dan PNG ikonalar yaratadi (Playwright Chromium orqali, qo'shimcha paketsiz).
import { chromium } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';

const svg = readFileSync('public/icons/icon.svg', 'utf8');
const local = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(local) ? { executablePath: local } : {});
const page = await browser.newPage();

const sizes = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
];
for (const [name, size] of sizes) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`,
  );
  await page.screenshot({ path: `public/icons/${name}`, omitBackground: false });
  console.log('✓', name);
}
await browser.close();
