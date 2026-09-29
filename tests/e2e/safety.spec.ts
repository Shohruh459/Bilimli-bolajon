import { expect, test } from '@playwright/test';
import { start } from './helpers';

test('tashqi soʻrov va CSP buzilishi yoʻq', async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const external: string[] = [];
  const errors: string[] = [];
  page.on('request', (r) => {
    const url = r.url();
    if (!url.startsWith(origin) && !url.startsWith('data:') && !url.startsWith('blob:'))
      external.push(url);
  });
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) =>
      console.error(`CSP: ${e.violatedDirective} ${e.blockedURI}`),
    );
  });

  await start(page);
  await page.getByTestId('age-3-4').click();
  await page.getByTestId('game-ranglar').click();
  await expect(page.getByTestId('colors-game')).toHaveAttribute('data-target', /.+/);

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
  const csp = await page
    .locator('meta[http-equiv="Content-Security-Policy"]')
    .getAttribute('content');
  expect(csp).toContain("connect-src 'self'");
  expect(csp).toContain("script-src 'self'");
});

test('bola himoyasi: zoom, long-press, belgilash', async ({ page }) => {
  await page.goto('');
  const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(viewport).toContain('user-scalable=no');

  const css = await page.evaluate(() => {
    const s = getComputedStyle(document.body);
    const hs = getComputedStyle(document.documentElement);
    return { select: s.userSelect, overscroll: hs.overscrollBehaviorY, touch: s.touchAction };
  });
  expect(css.select).toBe('none');
  expect(css.overscroll).toBe('none');
  expect(css.touch).toBe('manipulation');

  const prevented = await page.evaluate(() => {
    const e = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(e);
    return e.defaultPrevented;
  });
  expect(prevented).toBe(true);
});

test('manifest: portrait, standalone, oʻzbekcha', async ({ page, request }) => {
  await page.goto('');
  const href = await page.locator('link[rel="manifest"]').getAttribute('href');
  const res = await request.get(new URL(href!, page.url()).toString());
  const m = await res.json();
  expect(m.name).toBe('Ilmli Bolajon');
  expect(m.orientation).toBe('portrait');
  expect(m.display).toBe('standalone');
  expect(m.lang).toBe('uz');
});

test('offline: SW oʻrnatilgach internet yoʻq holda ishlaydi', async ({ page, context }) => {
  await page.goto('');
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return reg.active?.state;
  });
  // SW nazoratni olishi uchun bir marta qayta yuklaymiz.
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

  await context.setOffline(true);
  await page.reload();
  await page.getByTestId('start').click();
  await page.getByTestId('age-3-4').click();
  await page.getByTestId('game-ranglar').click(); // lazy chunk ham keshdan
  await expect(page.getByTestId('colors-game')).toHaveAttribute('data-target', /.+/);
  await context.setOffline(false);
});
