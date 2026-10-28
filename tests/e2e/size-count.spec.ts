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

test.describe('3–4 yoş menyusi — 5 ta öyin', () => {
  test('hamma kartalar körinadi va ekranga siğadi', async ({ page }, info) => {
    await start(page);
    await page.getByTestId('age-3-4').click();
    for (const id of ['ranglar', 'shakllar', 'hayvonlar', 'katta-kichik', 'sanash']) {
      await expect(page.getByTestId(`game-${id}`)).toBeVisible();
    }
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '30-age-3-4-five-games');
  });
});

test.describe('Katta — kiçik', () => {
  test('1-daraja: ikkita bir xil predmet, ölçami farqli; xato urişmaydi; yulduz', async ({
    page,
  }, info) => {
    await start(page, '#/oyin/katta-kichik');
    await expect(page.getByTestId('sizes-levels')).toBeVisible();
    await expectTopbarFits(page);
    await shot(page, info, '31-sizes-levels');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId('sizes-game');
    await expect(game).toHaveAttribute('data-target', /^(katta|kichik)$/, { timeout: 10_000 });
    await expect(page.locator('.find-option')).toHaveCount(2);
    const labels = await page
      .locator('.find-option')
      .evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')!.split(' ').pop()));
    expect(new Set(labels).size, 'bitta predmet').toBe(1);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '32-sizes-game');

    const target = (await game.getAttribute('data-target'))!;
    await page.locator(`.find-option:not([data-size="${target}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(game).toHaveAttribute('data-target', target);

    await playFindRounds(page, 5, 'sizes-game', 'size');
    await expect(page.getByTestId('finish')).toContainText('× 1');
  });

  test('3-daraja: törtta ölçam, faqat eng katta yoki eng kiçik söraladi', async ({
    page,
  }, info) => {
    await seedStars(page, { 'katta-kichik.1': 3, 'katta-kichik.2': 3 });
    await start(page, '#/oyin/katta-kichik');
    await page.getByTestId('level-3').click();
    const game = page.getByTestId('sizes-game');
    for (let round = 0; round < 6; round++) {
      await expect(game).toHaveAttribute('data-target', /^(katta|kichik)$/, { timeout: 10_000 });
      await expect(page.locator('.find-option')).toHaveCount(4);
      if (round === 0) {
        await expectNoOverflow(page);
        await shot(page, info, '33-sizes-level3');
      }
      const target = (await game.getAttribute('data-target'))!;
      await page.locator(`.find-option[data-size="${target}"]`).click();
      await expect(page.locator('.find-option.is-correct')).toHaveCount(1);
      if (round < 5) {
        await expect(page.locator('.find-option.is-correct')).toHaveCount(0, { timeout: 15_000 });
      }
    }
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 15_000 });
  });
});

test.describe('Sanaş 1–5', () => {
  test('1-daraja: "Qayerda ikkita?" — raqam körinadi; xato urişmaydi; yulduz', async ({
    page,
  }, info) => {
    await start(page, '#/oyin/sanash');
    await expect(page.getByTestId('count-levels')).toBeVisible();
    await shot(page, info, '34-count-levels');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId('count-game');
    await expect(game).toHaveAttribute('data-target', /^(bir|ikki|uch)$/, { timeout: 10_000 });
    await expect(page.locator('.find-option')).toHaveCount(3);
    const n = { bir: '1', ikki: '2', uch: '3' }[(await game.getAttribute('data-target'))!]!;
    await expect(page.locator('.find-swatch text')).toHaveText(n);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '35-count-game');

    const target = (await game.getAttribute('data-target'))!;
    await page.locator(`.find-option:not([data-count="${target}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(game).toHaveAttribute('data-target', target);

    await playFindRounds(page, 5, 'count-game', 'count');
    await expect(page.getByTestId('finish')).toContainText('× 1');
  });

  test('3 yulduz 2-darajani ochadi', async ({ page }) => {
    await seedStars(page, { 'sanash.1': 2 });
    await start(page, '#/oyin/sanash');
    await page.getByTestId('level-1').click();
    await playFindRounds(page, 5, 'count-game', 'count');
    await expect(page.getByTestId('finish-note')).toHaveText('2-daraja oçildi!');
    await page.getByTestId('to-menu').click();
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'true');
  });

  // Sanash iboralari uzun (har son ~1 s) — daraja o'yini uzoqroq davom etadi.
  test('2-daraja: törtta albatta çiqadi', async ({ page }) => {
    test.setTimeout(120_000);
    await seedStars(page, { 'sanash.1': 3 });
    await start(page, '#/oyin/sanash');
    expect(await playLevel(page, 2, 5)).toContain('tort');
  });

  test('3-daraja: törtta karta, beşta albatta çiqadi', async ({ page }, info) => {
    test.setTimeout(120_000);
    await seedStars(page, { 'sanash.1': 3, 'sanash.2': 3 });
    await start(page, '#/oyin/sanash');
    await page.getByTestId('level-3').click();
    await expect(page.locator('.find-option')).toHaveCount(4, { timeout: 10_000 });
    await expectNoOverflow(page);
    await shot(page, info, '36-count-level3');
    expect(await playFindRounds(page, 6, 'count-game', 'count')).toContain('besh');
  });
});

async function playLevel(page: import('@playwright/test').Page, level: number, rounds: number) {
  await page.getByTestId(`level-${level}`).click();
  return playFindRounds(page, rounds, 'count-game', 'count');
}
