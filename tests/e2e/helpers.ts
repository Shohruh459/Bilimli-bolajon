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

/** Yulduzlarni oldindan yozib qo'yish (darajalarni ochish uchun). Har navigatsiyada qayta yoziladi. */
export async function seedStars(page: Page, stars: Record<string, number>): Promise<void> {
  await page.addInitScript((s) => {
    localStorage.setItem('ilmli:v1:stars', JSON.stringify(s));
  }, stars);
}

/** "Topish" o'yinida `rounds` ta raundni to'g'ri javob bilan o'tadi. */
export async function playFindRounds(
  page: Page,
  rounds: number,
  game = 'colors-game',
  attr = 'color',
): Promise<string[]> {
  const stage = page.getByTestId(game);
  const targets: string[] = [];
  for (let round = 0; round < rounds; round++) {
    await expect(stage).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
    const target = (await stage.getAttribute('data-target'))!;
    targets.push(target);
    await page.locator(`.find-option[data-${attr}="${target}"]`).click();
    await expect(page.locator('.find-option.is-correct')).toHaveCount(1);
    if (round < rounds - 1) {
      // Keyingi raund: maqsad ketma-ket takrorlanmaydi.
      // Sanashda to'g'ri javobdan keyin ovoz 6 s gacha sanaydi.
      await expect(stage).not.toHaveAttribute('data-target', target, { timeout: 15_000 });
    }
  }
  await expect(page.getByTestId('finish')).toBeVisible({ timeout: 10_000 });
  return targets;
}

/** Ranglar o'yinida `rounds` ta raundni to'g'ri javob bilan o'tadi. */
export async function playColorRounds(page: Page, rounds: number): Promise<void> {
  await playFindRounds(page, rounds);
}

/** Top bar markazidagi element (masalan, progress nuqtalari) tugmalar ustiga chiqmaydi. */
export async function expectTopbarFits(page: Page): Promise<void> {
  const r = await page
    .locator('.topbar')
    .first()
    .evaluate((bar) => {
      const [left, center, right] = [...bar.children].map((c) => c.getBoundingClientRect());
      const inner = bar.querySelector('.topbar__center > *')?.getBoundingClientRect();
      return {
        l: left!.right,
        r: right!.left,
        a: inner?.left ?? center!.left,
        b: inner?.right ?? center!.right,
      };
    });
  expect(r.a).toBeGreaterThanOrEqual(r.l);
  expect(r.b).toBeLessThanOrEqual(r.r);
}

/** Shakl yo'li bo'ylab "barmoq" yurgizadi (sichqoncha → pointer hodisalari). */
export async function trace(page: Page, opts: { to?: number; dy?: number } = {}): Promise<void> {
  const svgEl = page.locator('.tp-svg');
  // Paydo bo'lish animatsiyasi (scale) tugasin — aks holda o'lchamlar noto'g'ri
  await page
    .getByTestId('trace-pad')
    .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished.catch(() => null))));
  const box = (await svgEl.boundingBox())!;
  const pts = (await svgEl.getAttribute('data-path'))!
    .split(' ')
    .map((p) => p.split(',').map(Number) as [number, number]);
  const k = box.width / 300;
  const at = ([x, y]: [number, number]) =>
    [box.x + x * k, box.y + (y + (opts.dy ?? 0)) * k] as const;
  const from = Number((await svgEl.getAttribute('data-progress')) ?? 0);
  const to = opts.to ?? pts.length - 1;
  await page.mouse.move(...at(pts[from]!));
  await page.mouse.down();
  for (let i = from + 1; i <= to; i += 2) await page.mouse.move(...at(pts[i]!));
  await page.mouse.move(...at(pts[to]!));
  await page.mouse.up();
}
