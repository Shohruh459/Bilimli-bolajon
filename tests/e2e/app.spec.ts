import { expect, test } from '@playwright/test';
import { expectBigButtons, expectNoOverflow, shot, start } from './helpers';

test.describe('Start va audio unlock', () => {
  test('"Boshlash" bosilganda AudioContext ochiladi va bosh menyu chiqadi', async ({
    page,
  }, info) => {
    await page.goto('');
    await expect(page.getByTestId('start')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-audio', 'locked');
    await expectBigButtons(page);
    await shot(page, info, '01-start');

    await page.getByTestId('start').click();
    await expect(page.locator('html')).toHaveAttribute('data-audio', 'running');
    await expect(page.locator('.age-card')).toHaveCount(4);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '02-home');
  });

  test('chuqur havola avval start ekraniga, keyin soʻralgan joyga olib boradi', async ({
    page,
  }) => {
    await start(page, '#/yosh/3-4');
    await expect(page.getByTestId('game-ranglar')).toBeVisible();
  });

  test('ilova nomi va til', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle('Ilmli Bolajon');
    await expect(page.locator('html')).toHaveAttribute('lang', 'uz');
  });
});

test.describe('Yosh guruhlari', () => {
  test('5 yosh va diniy — "Tez orada"', async ({ page }, info) => {
    await start(page);
    await page.getByTestId('age-5').click();
    await expect(page.getByTestId('soon')).toBeVisible();
    await page.getByRole('button', { name: 'Bosh sahifa' }).click();
    await page.getByTestId('age-diniy').click();
    await expect(page.getByTestId('soon')).toContainText('ota-ona');
    await shot(page, info, '05-diniy-soon');
  });

  test('3–4 yosh menyusi', async ({ page }, info) => {
    await start(page);
    await page.getByTestId('age-3-4').click();
    await expect(page.getByTestId('game-ranglar')).toBeVisible();
    await expectBigButtons(page);
    await shot(page, info, '03-age-3-4');
  });
});

test.describe('Ranglarni topish', () => {
  test('xato javob urishmaydi, 5 raund → yulduz → yana oʻynash', async ({ page }, info) => {
    await start(page, '#/oyin/ranglar');
    const game = page.getByTestId('colors-game');
    await expect(game).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '04-game');

    for (let round = 0; round < 5; round++) {
      const target = (await game.getAttribute('data-target'))!;
      if (round === 0) {
        // Xato: shu raundda qolamiz, variantlar yo'qolmaydi.
        await page.locator(`.cf-option:not([data-color="${target}"])`).first().click();
        await page.waitForTimeout(300);
        await expect(game).toHaveAttribute('data-target', target);
        await expect(page.locator('.cf-option')).toHaveCount(3);
      }
      await page.locator(`.cf-option[data-color="${target}"]`).click();
      await expect(page.locator('.cf-option.is-correct')).toHaveCount(1);
      if (round === 2) await shot(page, info, '04b-game-correct');
      if (round < 4) {
        // Keyingi raund: maqsad rang ketma-ket takrorlanmaydi.
        await expect(game).not.toHaveAttribute('data-target', target, { timeout: 10_000 });
      }
    }

    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('finish')).toContainText('× 1');
    await expectBigButtons(page);
    await shot(page, info, '06-finish');

    await page.getByTestId('replay').click();
    await expect(page.getByTestId('colors-game')).toBeVisible();
    await page.getByRole('button', { name: 'Orqaga' }).click();
    await expect(page.getByTestId('game-ranglar')).toContainText('1');
  });
});

test.describe('Ota-ona darvozasi', () => {
  test('qisqa bosish ochmaydi, 3 soniya bosib turish ochadi', async ({ page }, info) => {
    await start(page);
    const gateBtn = page.getByTestId('parent-gate');
    await gateBtn.dispatchEvent('pointerdown');
    await page.waitForTimeout(500);
    await gateBtn.dispatchEvent('pointerup');
    await expect(page.locator('.gate__tip')).toBeVisible();
    await page.waitForTimeout(3000);
    await expect(page.getByTestId('settings')).toHaveCount(0);

    await gateBtn.dispatchEvent('pointerdown');
    await expect(page.getByTestId('settings')).toBeVisible({ timeout: 5000 });
    await expectBigButtons(page);
    await shot(page, info, '07-settings');

    const toggle = page.getByTestId('sound-toggle');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  test('sozlamalarga toʻgʻridan-toʻgʻri havola ishlamaydi', async ({ page }) => {
    await start(page, '#/sozlamalar');
    await expect(page.locator('.age-card')).toHaveCount(4);
    await expect(page.getByTestId('settings')).toHaveCount(0);
  });
});
