import { expect, test, type Page } from '@playwright/test';
import {
  expectBigButtons,
  expectNoOverflow,
  expectTopbarFits,
  playFindRounds,
  seedStars,
  shot,
  start,
} from './helpers';

const GAME = 'animals-game';
const ATTR = 'animal';

/** Haqiqiy ovoz fayllari hali yo'q — e2e build'ida soxta klip (qisqa signal) yoqiladi. */
async function fakeClips(page: Page): Promise<void> {
  await page.addInitScript(() => localStorage.setItem('ilmli:e2e-fake-clips', '1'));
}

test.describe('Hayvon ovozlari — ovoz fayllarisiz', () => {
  test('menyuda karta; Tanishuv ajralib turadi, ochilgach toʻxtaydi', async ({ page }, info) => {
    await start(page);
    await page.getByTestId('age-3-4').click();
    await expect(page.getByTestId('game-hayvonlar')).toBeVisible();
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '20-age-3-4-three-games');

    await page.getByTestId('game-hayvonlar').click();
    await expect(page.getByTestId('animals-levels')).toBeVisible();
    const extra = page.getByTestId('extra-tanishuv');
    await expect(extra).toHaveAttribute('data-highlight', 'true');
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '21-animals-levels-first');

    await extra.click();
    await expect(page.getByTestId('tanishuv')).toBeVisible();
    await page.getByRole('button', { name: 'Orqaga' }).click();
    await expect(page.getByTestId('animals-levels')).toBeVisible();
    await expect(page.getByTestId('extra-tanishuv')).toHaveAttribute('data-highlight', 'false');
  });

  test('Tanishuv: 1-daraja hayvonlari, bosilsa ishlaydi (ovozsiz ham)', async ({ page }, info) => {
    await start(page, '#/oyin/hayvonlar/tanishuv');
    await expect(page.getByTestId('tanishuv')).toBeVisible();
    const cards = page.locator('.tn-card');
    await expect(cards).toHaveCount(4);
    for (const id of ['mushuk', 'it', 'sigir', 'xoroz']) {
      await expect(page.getByTestId(`tanishuv-${id}`)).toBeVisible();
    }
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '22-tanishuv');

    await page.getByTestId('tanishuv-sigir').click();
    await expect(page.getByTestId('tanishuv-sigir')).toHaveClass(/is-playing/);
    // Boshqasini bossa — oldingisi to'xtaydi.
    await page.getByTestId('tanishuv-it').click();
    await expect(page.getByTestId('tanishuv-sigir')).not.toHaveClass(/is-playing/);
    await expect(page.getByTestId('tanishuv-it')).toHaveClass(/is-playing/);
  });

  test('Tanishuv: hamma daraja ochiq boʻlsa — 12 hayvon, ekranga sigʻadi', async ({
    page,
  }, info) => {
    await seedStars(page, { 'hayvonlar.1': 3, 'hayvonlar.2': 3 });
    await start(page, '#/oyin/hayvonlar/tanishuv');
    await expect(page.locator('.tn-card')).toHaveCount(12);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '23-tanishuv-12');
  });

  test('darajalar "tayyorlanmoqda": oʻyin boshlanmaydi, toʻgʻridan-toʻgʻri havola ham', async ({
    page,
  }, info) => {
    await start(page, '#/oyin/hayvonlar');
    const l1 = page.getByTestId('level-1');
    await expect(l1).toHaveAttribute('data-open', 'true');
    await expect(l1).toHaveAttribute('data-soon', 'true');
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-soon', 'false');
    await shot(page, info, '24-animals-levels-soon');
    await l1.click();
    await page.waitForTimeout(400);
    await expect(page.getByTestId(GAME)).toHaveCount(0);

    await page.goto('#/oyin/hayvonlar/1');
    await expect(page.getByTestId('animals-levels')).toBeVisible();
    await expect(page.getByTestId(GAME)).toHaveCount(0);
  });
});

test.describe('Hayvon ovozlari — soxta kliplar bilan', () => {
  test('1-daraja: topshiriq eshitiladi, "?" koʻrinadi; xato urishmaydi; yulduz', async ({
    page,
  }, info) => {
    await fakeClips(page);
    await start(page, '#/oyin/hayvonlar');
    await expect(page.getByTestId('level-1')).toHaveAttribute('data-soon', 'false');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId(GAME);
    await expect(game).toHaveAttribute('data-level', '1');
    await expect(game).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
    await expect(page.locator('.find-option')).toHaveCount(3);
    // Javob ekranda yozilmaydi — faqat eshitiladi.
    await expect(page.locator('.find-word')).toHaveText('?');
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '25-animals-game');

    // Topshiriq qutisi bosilsa — qayta eshittiradi (o'yin buzilmaydi).
    await page.getByTestId('ask').click();
    const target = (await game.getAttribute('data-target'))!;
    await page.locator(`.find-option:not([data-animal="${target}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(game).toHaveAttribute('data-target', target);

    await playFindRounds(page, 5, GAME, ATTR);
    await expect(page.getByTestId('finish')).toContainText('× 1');
  });

  test('3-daraja: 4 variant, qoʻy↔echki va xoʻroz↔tovuq hech qachon birga emas', async ({
    page,
  }) => {
    await fakeClips(page);
    await seedStars(page, { 'hayvonlar.1': 3, 'hayvonlar.2': 3 });
    await start(page, '#/oyin/hayvonlar');
    await expect(page.getByTestId('level-3')).toHaveAttribute('data-open', 'true');
    await page.getByTestId('level-3').click();
    const game = page.getByTestId(GAME);
    const seen = new Set<string>();
    for (let round = 0; round < 6; round++) {
      await expect(game).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
      await expect(page.locator('.find-option')).toHaveCount(4);
      const opts = await page
        .locator('.find-option')
        .evaluateAll((els) => els.map((e) => e.getAttribute('data-animal')!));
      expect(opts.includes('qoy') && opts.includes('echki'), opts.join()).toBe(false);
      expect(opts.includes('xoroz') && opts.includes('tovuq'), opts.join()).toBe(false);
      const target = (await game.getAttribute('data-target'))!;
      seen.add(target);
      await page.locator(`.find-option[data-animal="${target}"]`).click();
      await expect(page.locator('.find-option.is-correct')).toHaveCount(1);
      if (round < 5) {
        await expect(game).not.toHaveAttribute('data-target', target, { timeout: 10_000 });
      }
    }
    // Har darajaning yangi hayvonlari albatta chiqadi.
    for (const id of ['echki', 'eshak', 'tovuq', 'asalari']) expect(seen).toContain(id);
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 10_000 });
  });

  test('3 yulduz 2-darajani ochadi', async ({ page }) => {
    await fakeClips(page);
    await seedStars(page, { 'hayvonlar.1': 2 });
    await start(page, '#/oyin/hayvonlar');
    await page.getByTestId('level-1').click();
    await playFindRounds(page, 5, GAME, ATTR);
    await expect(page.getByTestId('finish-note')).toHaveText('2-daraja ochildi!');
    await page.getByTestId('to-menu').click();
    await expect(page.getByTestId('level-2')).toHaveAttribute('data-open', 'true');
  });
});
