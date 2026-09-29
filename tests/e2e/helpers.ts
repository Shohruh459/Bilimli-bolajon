import { expect, type Page, type TestInfo } from '@playwright/test';

/** Start ekrani → "Boshlash" → ovoz ochilgan bo'lishi shart. */
export async function start(page: Page, hash = ''): Promise<void> {
  await page.goto(hash);
  await expect(page.locator('html')).toHaveAttribute('data-audio', 'locked');
  await page.getByTestId('start').click();
  await expect(page.locator('html')).toHaveAttribute('data-audio', 'running');
}

/** Dizaynni ko'rib chiqish uchun skrinshot: screenshots/<qurilma>-<nom>.png */
export async function shot(page: Page, info: TestInfo, name: string): Promise<void> {
  await page.waitForTimeout(700); // appear animatsiyalari tugasin
  await page.screenshot({ path: `screenshots/${info.project.name}-${name}.png` });
}

/** Ekrandagi barcha ko'rinadigan tugmalar ≥ 90×90 px. */
export async function expectBigButtons(page: Page): Promise<void> {
  const boxes = await page.locator('button:visible').evaluateAll((els) =>
    // offsetWidth — layout o'lchami (appear animatsiyasining scale'i ta'sir qilmaydi).
    els.map((el) => ({
      label: el.getAttribute('aria-label') ?? el.textContent?.trim(),
      w: (el as HTMLElement).offsetWidth,
      h: (el as HTMLElement).offsetHeight,
    })),
  );
  expect(boxes.length).toBeGreaterThan(0);
  for (const b of boxes) {
    expect(b.w, `${b.label} kengligi`).toBeGreaterThanOrEqual(90);
    expect(b.h, `${b.label} balandligi`).toBeGreaterThanOrEqual(90);
  }
}

/** Sahifa gorizontal/vertikal scroll qilmaydi (hamma narsa ekranga sig'adi). */
export async function expectNoOverflow(page: Page): Promise<void> {
  const o = await page.evaluate(() => {
    const app = document.getElementById('app')!;
    return {
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      appBottom: Math.max(
        ...[...app.querySelectorAll('*')].map((e) => e.getBoundingClientRect().bottom),
      ),
      vh: window.innerHeight,
    };
  });
  expect(o.sw).toBeLessThanOrEqual(o.cw);
  expect(o.appBottom).toBeLessThanOrEqual(o.vh + 1);
}
