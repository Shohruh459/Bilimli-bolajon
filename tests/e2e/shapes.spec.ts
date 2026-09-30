import { expect, test } from '@playwright/test';
import {
  expectBigButtons,
  expectNoOverflow,
  expectTopbarFits,
  playFindRounds,
  seedStars,
  shot,
  start,
} from './helpers';

const GAME = 'shapes-game';
const ATTR = 'shape';

test.describe('Shakllarni topish', () => {
  test('3–4 yosh menyusida karta, daraja tanlash: faqat 1-daraja ochiq', async ({ page }, info) => {
    await start(page);
    await page.getByTestId('age-3-4').click();
    await expect(page.getByTestId('game-shakllar')).toBeVisible();
    await expect(page.getByTestId('game-ranglar')).toBeVisible();
    await expectBigButtons(page);
    await shot(page, info, '13-age-3-4-two-games');

    await page.getByTestId('game-shakllar').click();
    await expect(page.getByTestId('shapes-levels')).toBeVisible();
    await expect(page.getByTestId('level-1')).toHaveAttribute('data-open', 'true');
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'false');
    await expect(page.getByTestId('level-3')).toHaveAttribute('data-open', 'false');
    await expectNoOverflow(page);
    await shot(page, info, '14-shapes-levels');

    // Yopiq daraja urishmaydi — o'yin boshlanmaydi.
    await page.getByTestId('level-3').click();
    await page.waitForTimeout(400);
    await expect(page.getByTestId(GAME)).toHaveCount(0);
  });

  test('1-daraja: doira, kvadrat, uchburchak; xato javob urishmaydi; yulduz', async ({
    page,
  }, info) => {
    await start(page, '#/oyin/shakllar');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId(GAME);
    await expect(game).toHaveAttribute('data-level', '1');
    await expect(game).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
    await expect(page.locator('.find-option')).toHaveCount(3);
    const shapes = await page
      .locator('.find-option')
      .evaluateAll((els) => els.map((e) => e.getAttribute('data-shape')));
    expect([...shapes].sort()).toEqual(['doira', 'kvadrat', 'uchburchak']);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '15-shapes-game');

    const target = (await game.getAttribute('data-target'))!;
    await page.locator(`.find-option:not([data-shape="${target}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(game).toHaveAttribute('data-target', target);
    await expect(page.locator('.find-option')).toHaveCount(3);

    await playFindRounds(page, 5, GAME, ATTR);
    await expect(page.getByTestId('finish')).toContainText('× 1');
    await page.getByTestId('to-menu').click();
    await page.getByRole('button', { name: 'Orqaga' }).click();
    await expect(page.getByTestId('game-shakllar')).toContainText('1');
  });

  test('3 yulduz 2-darajani ochadi (yulduz, yurak qoʻshiladi)', async ({ page }, info) => {
    await seedStars(page, { 'shakllar.1': 2 });
    await start(page, '#/oyin/shakllar');
    await page.getByTestId('level-1').click();
    await playFindRounds(page, 5, GAME, ATTR);
    await expect(page.getByTestId('finish-note')).toHaveText('2-daraja ochildi!');
    await page.getByTestId('to-menu').click();
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'true');

    await page.getByTestId('level-2').click();
    const targets = await playFindRounds(page, 5, GAME, ATTR);
    expect(targets).toContain('yulduz');
    expect(targets).toContain('yurak');
    await shot(page, info, '16-shapes-level2-finish');
  });

  test('3-daraja: 4 predmet, kvadrat va toʻgʻri toʻrtburchak bir raundda emas', async ({
    page,
  }, info) => {
    await seedStars(page, { 'shakllar.1': 3, 'shakllar.2': 3 });
    await start(page, '#/oyin/shakllar/3');
    const game = page.getByTestId(GAME);
    await expect(game).toHaveAttribute('data-level', '3');
    await expect(page.locator('.find-option')).toHaveCount(4);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '17-shapes-level3');

    const targets: string[] = [];
    for (let round = 0; round < 6; round++) {
      await expect(game).toHaveAttribute('data-target', /.+/);
      const t = (await game.getAttribute('data-target'))!;
      targets.push(t);
      const shapes = await page
        .locator('.find-option')
        .evaluateAll((els) => els.map((e) => e.getAttribute('data-shape')));
      expect(shapes.includes('kvadrat') && shapes.includes('togri-tortburchak')).toBe(false);
      if (t === 'togri-tortburchak') {
        // Eng uzun nom: topshiriq qutisi va 4 ta predmet 360px ekranga sig'adi.
        await expectNoOverflow(page);
        await expectTopbarFits(page);
        await shot(page, info, '18-shapes-longest-name');
      }
      await page.locator(`.find-option[data-shape="${t}"]`).click();
      if (round < 5) await expect(game).not.toHaveAttribute('data-target', t, { timeout: 10_000 });
    }
    for (const s of ['togri-tortburchak', 'oval', 'yarim-doira']) expect(targets).toContain(s);
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 10_000 });
  });

  test('ranglar yulduzlari shakllar darajalarini ochmaydi (progress alohida)', async ({ page }) => {
    await seedStars(page, { 'ranglar.1': 3, 'ranglar.2': 3 });
    await start(page, '#/oyin/shakllar');
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'false');
    // Ilova allaqachon ochiq — faqat hash o'zgaradi (yopiq daraja → daraja tanlashga qaytadi).
    await page.goto('#/oyin/shakllar/2');
    await expect(page.getByTestId('shapes-levels')).toBeVisible();
    await expect(page.getByTestId(GAME)).toHaveCount(0);
  });
});
