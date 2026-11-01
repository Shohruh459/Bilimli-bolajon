import { expect, test, type Page } from '@playwright/test';
import {
  expectBigButtons,
  expectNoOverflow,
  expectTopbarFits,
  seedStars,
  shot,
  start,
  trace,
} from './helpers';

/** Joriy harfning barcha chiziqlarini tartib bilan yozadi */
async function writeLetter(page: Page): Promise<void> {
  const svgEl = page.locator('.tp-svg');
  const strokes = await page.locator('.tp-dots').count();
  for (let k = 0; k < strokes; k++) {
    await expect(svgEl).toHaveAttribute('data-stroke', String(k));
    await trace(page);
  }
}

test.describe('6–7 yoş', () => {
  test('menyu: Husnixat', async ({ page }, info) => {
    await start(page);
    await page.getByTestId('age-6-7').click();
    await expect(page.getByTestId('game-husnixat')).toBeVisible();
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '60-age-6-7');
  });
});

test.describe('Husnixat', () => {
  test('1-daraja: o, n, a, i (tayoqça + nuqta), m — yoziladi; yulduz', async ({ page }, info) => {
    test.setTimeout(150_000);
    await start(page, '#/oyin/husnixat');
    await expect(page.getByTestId('hx-levels')).toBeVisible();
    await expect(page.locator('.lp-level')).toHaveCount(5);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '61-hx-levels');

    await page.getByTestId('level-1').click();
    const game = page.getByTestId('hx-game');
    for (const id of ['o', 'n', 'a', 'i', 'm']) {
      await expect(game).toHaveAttribute('data-letter', id, { timeout: 15_000 });
      if (id === 'a') {
        await expectNoOverflow(page);
        await expectTopbarFits(page);
        await shot(page, info, '62-hx-a');
      }
      if (id === 'i') {
        await trace(page);
        await expect(page.locator('.tp-svg')).toHaveAttribute('data-stroke', '1');
        await shot(page, info, '63-hx-i-dot');
        await trace(page);
        continue;
      }
      await writeLetter(page);
    }
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 15_000 });
  });

  test('5-daraja: ğ (qayrilma bilan), x (ikki chiziq), f', async ({ page }, info) => {
    test.setTimeout(150_000);
    await seedStars(page, {
      'husnixat.1': 3,
      'husnixat.2': 3,
      'husnixat.3': 3,
      'husnixat.4': 3,
    });
    await start(page, '#/oyin/husnixat');
    await page.getByTestId('level-5').click();
    const game = page.getByTestId('hx-game');
    for (const id of ['j', 'gg', 'z', 'v', 'x', 'f']) {
      await expect(game).toHaveAttribute('data-letter', id, { timeout: 15_000 });
      if (id === 'gg' || id === 'x' || id === 'f') await shot(page, info, `64-hx-${id}`);
      await writeLetter(page);
    }
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 15_000 });
  });
});
