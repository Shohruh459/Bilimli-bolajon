import { expect, test } from '@playwright/test';
import {
  expectBigButtons,
  expectNoOverflow,
  expectTopbarFits,
  playColorRounds,
  seedStars,
  shot,
  start,
} from './helpers';

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
  test('daraja tanlash: faqat 1-daraja ochiq, yopiq daraja urishmaydi', async ({ page }, info) => {
    await start(page, '#/oyin/ranglar');
    await expect(page.getByTestId('colors-levels')).toBeVisible();
    await expect(page.getByTestId('level-1')).toHaveAttribute('data-open', 'true');
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'false');
    await expect(page.getByTestId('level-3')).toHaveAttribute('data-open', 'false');
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '08-levels-new');

    // Yopiq darajani bosish — o'yin boshlanmaydi, shu ekranda qolamiz.
    await page.getByTestId('level-2').click();
    await page.waitForTimeout(400);
    await expect(page.getByTestId('colors-levels')).toBeVisible();
    await expect(page.getByTestId('colors-game')).toHaveCount(0);
  });

  test('1-daraja: xato javob urishmaydi, 5 raund → yulduz → yana oʻynash', async ({
    page,
  }, info) => {
    await start(page, '#/oyin/ranglar');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId('colors-game');
    await expect(game).toHaveAttribute('data-level', '1');
    await expect(game).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '04-game');

    // Xato: shu raundda qolamiz, variantlar yo'qolmaydi.
    const target = (await game.getAttribute('data-target'))!;
    await page.locator(`.cf-option:not([data-color="${target}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(game).toHaveAttribute('data-target', target);
    await expect(page.locator('.cf-option')).toHaveCount(3);
    for (const color of await page
      .locator('.cf-option')
      .evaluateAll((els) => els.map((e) => e.getAttribute('data-color')))) {
      expect(['qizil', 'sariq', 'kok', 'yashil']).toContain(color);
    }

    await playColorRounds(page, 5);
    await expect(page.getByTestId('finish')).toContainText('× 1');
    await expect(page.getByTestId('finish-note')).toHaveCount(0);
    await expectBigButtons(page);
    await shot(page, info, '06-finish');

    // "Yana" — o'sha daraja qaytadan.
    await page.getByTestId('replay').click();
    await expect(page.getByTestId('colors-game')).toHaveAttribute('data-level', '1');
    // "Orqaga" — daraja tanlashga, u yerdan — yosh menyusiga.
    await page.getByRole('button', { name: 'Orqaga' }).click();
    await expect(page.getByTestId('colors-levels')).toBeVisible();
    await expect(page.getByTestId('level-1')).toContainText('1');
    await page.getByRole('button', { name: 'Orqaga' }).click();
    await expect(page.getByTestId('game-ranglar')).toContainText('1');
  });

  test('3-yulduz 2-darajani ochadi va bu yakunda aytiladi (progress saqlanadi)', async ({
    page,
  }, info) => {
    await seedStars(page, { 'ranglar.1': 2 });
    await start(page, '#/oyin/ranglar');
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'false');
    await page.getByTestId('level-1').click();
    await playColorRounds(page, 5);
    await expect(page.getByTestId('finish-note')).toHaveText('2-daraja ochildi!');
    await shot(page, info, '09-finish-unlock');

    // Progress localStorage'da: menyuga qaytganda 2-daraja ochiq.
    const saved = await page.evaluate(() => localStorage.getItem('ilmli:v1:stars'));
    expect(JSON.parse(saved!)).toMatchObject({ 'ranglar.1': 3 });
    await page.getByTestId('to-menu').click();
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'true');
  });

  test('2-daraja: toʻq sariq va binafsha qoʻshiladi', async ({ page }, info) => {
    await seedStars(page, { 'ranglar.1': 3 });
    await start(page, '#/oyin/ranglar/2');
    const game = page.getByTestId('colors-game');
    await expect(game).toHaveAttribute('data-level', '2');
    await expect(page.locator('.cf-option')).toHaveCount(3);
    await shot(page, info, '10-level-2');
    await playColorRounds(page, 5);
  });

  test('3-daraja: 4 ta predmet, 10 rang, 6 raund', async ({ page }, info) => {
    await seedStars(page, { 'ranglar.1': 3, 'ranglar.2': 3 });
    await start(page, '#/oyin/ranglar');
    await expect(page.getByTestId('level-3')).toHaveAttribute('data-open', 'true');
    await shot(page, info, '11-levels-all-open');
    await page.getByTestId('level-3').click();
    const game = page.getByTestId('colors-game');
    await expect(game).toHaveAttribute('data-level', '3');
    await expect(page.locator('.cf-option')).toHaveCount(4);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page); // 6 ta progress nuqtasi
    await shot(page, info, '12-level-3');

    // Barcha raundlarda yangi ranglar (pushti, jigarrang, oq, qora) albatta chiqadi.
    const targets: string[] = [];
    for (let round = 0; round < 6; round++) {
      await expect(game).toHaveAttribute('data-target', /.+/);
      const t = (await game.getAttribute('data-target'))!;
      targets.push(t);
      await page.locator(`.cf-option[data-color="${t}"]`).click();
      if (round < 5) await expect(game).not.toHaveAttribute('data-target', t, { timeout: 10_000 });
    }
    for (const c of ['pushti', 'jigarrang', 'oq', 'qora']) expect(targets).toContain(c);
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 10_000 });
  });

  test('yopiq darajaga toʻgʻridan-toʻgʻri havola daraja tanlashga qaytaradi', async ({ page }) => {
    await start(page, '#/oyin/ranglar/3');
    await expect(page.getByTestId('colors-levels')).toBeVisible();
    await expect(page.getByTestId('colors-game')).toHaveCount(0);
  });

  test('0-bosqichdagi eski yulduzlar 1-darajaga hisoblanadi', async ({ page }) => {
    await seedStars(page, { ranglar: 3 });
    await start(page, '#/oyin/ranglar');
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'true');
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
