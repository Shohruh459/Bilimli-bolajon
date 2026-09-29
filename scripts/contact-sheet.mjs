// screenshots/*.png → screenshots/_sheet-<qurilma>.png (dizaynni bir qarashda ko'rish uchun)
import { chromium } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const dir = 'screenshots';
const files = readdirSync(dir).filter((f) => f.endsWith('.png') && !f.startsWith('_'));
const devices = [...new Set(files.map((f) => f.replace(/-\d\d.*$/, '')))];
const local = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(local) ? { executablePath: local } : {});
const page = await browser.newPage({ viewport: { width: 1800, height: 900 } });

for (const d of devices) {
  const imgs = files
    .filter((f) => f.startsWith(`${d}-`))
    .sort()
    .map((f) => {
      const b64 = readFileSync(`${dir}/${f}`).toString('base64');
      return `<figure><img src="data:image/png;base64,${b64}"><figcaption>${f.replace(`${d}-`, '')}</figcaption></figure>`;
    })
    .join('');
  await page.setContent(
    `<style>body{margin:0;padding:16px;background:#ddd;font:14px sans-serif;display:flex;gap:12px;flex-wrap:wrap}
     figure{margin:0}img{height:640px;display:block;border:1px solid #999}figcaption{text-align:center}</style>${imgs}`,
  );
  await page.screenshot({ path: `${dir}/_sheet-${d}.png`, fullPage: true });
  console.log(`✓ ${dir}/_sheet-${d}.png`);
}
await browser.close();
