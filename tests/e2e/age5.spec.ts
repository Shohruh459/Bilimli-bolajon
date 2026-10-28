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

test.describe('5 yosh menyusi', () => {
  test('4 ta oʻyin, ekranga sigʻadi; yangi alifbo harflari shriftda bor', async ({
    page,
  }, info) => {
    await start(page);
    await page.getByTestId('age-5').click();
    for (const id of ['harflar', 'raqamlar', 'juftini-top', 'ketma-ketlik']) {
      await expect(page.getByTestId(`game-${id}`)).toBeVisible();
    }
    await expectBigButtons(page);
    await expectNoOverflow(page);
    // Ğ ğ Ş ş — alohida kichik shrift; Ö Ç — asosiy lotin shriftida
    const faces = await page.evaluate(async () => {
      const a = await document.fonts.load('900 20px Nunito', 'ĞğŞş');
      const b = await document.fonts.load('900 20px Nunito', 'ÖöÇç');
      return [a.length, b.length];
    });
    expect(faces[0], 'Ğ Ş shrifti').toBeGreaterThan(0);
    expect(faces[1], 'Ö Ç shrifti').toBeGreaterThan(0);
    await shot(page, info, '40-age-5');
  });
});

test.describe('Harflar', () => {
  test('daraja ekrani: 4 daraja + Alifbo; Alifbo: 7 harf, sahifa tugmalari', async ({
    page,
  }, info) => {
    await start(page, '#/oyin/harflar');
    await expect(page.getByTestId('letters-levels')).toBeVisible();
    await expect(page.locator('.lp-level')).toHaveCount(4);
    await expect(page.getByTestId('extra-alifbo')).toHaveAttribute('data-highlight', 'true');
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '41-letters-levels');

    await page.getByTestId('extra-alifbo').click();
    await expect(page.getByTestId('alifbo')).toBeVisible();
    await expect(page.locator('.ab-card')).toHaveCount(7);
    await expect(page.getByTestId('alifbo-a')).toBeVisible();
    await expect(page.getByTestId('alifbo--1')).toBeDisabled();
    await expect(page.getByTestId('alifbo-1')).toBeDisabled();
    await page.getByTestId('alifbo-b').click();
    await expect(page.getByTestId('alifbo-b')).toHaveClass(/is-playing/);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '42-alifbo');
  });

  test('Alifbo: 4 daraja ochiq — sahifalar orasida yurish, Ö Ğ Ş Ç', async ({ page }, info) => {
    await seedStars(page, { 'harflar.1': 3, 'harflar.2': 3, 'harflar.3': 3 });
    await start(page, '#/oyin/harflar/alifbo');
    await expect(page.getByTestId('alifbo')).toHaveAttribute('data-page', '4');
    for (const id of ['oo', 'gg', 'sh', 'ch'])
      await expect(page.getByTestId(`alifbo-${id}`)).toBeVisible();
    await shot(page, info, '43-alifbo-yangi-harflar');
    await page.getByTestId('alifbo--1').click();
    await expect(page.getByTestId('alifbo')).toHaveAttribute('data-page', '3');
    await expect(page.getByTestId('alifbo-p')).toBeVisible();
  });

  test('1-daraja: topshiriq eshitiladi ("?"), kartada Bb; 7 raund; yulduz', async ({
    page,
  }, info) => {
    test.setTimeout(120_000);
    await start(page, '#/oyin/harflar');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId('letters-game');
    await expect(game).toHaveAttribute('data-target', /.+/, { timeout: 10_000 });
    await expect(page.locator('.find-word')).toHaveText('?');
    await expect(page.locator('.find-option')).toHaveCount(3);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '44-letters-game');
    const target = (await game.getAttribute('data-target'))!;
    await page.locator(`.find-option:not([data-letter="${target}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(game).toHaveAttribute('data-target', target);
    const targets = await playFindRounds(page, 7, 'letters-game', 'letter');
    expect(new Set(targets)).toEqual(new Set(['a', 'b', 'd', 'e', 'f', 'g', 'h']));
    await expect(page.getByTestId('finish')).toContainText('× 1');
  });
});

test.describe('Raqamlar 1–10', () => {
  test('1-daraja: topshiriqda nom va n ta nuqta, kartada raqam; yulduz', async ({ page }, info) => {
    test.setTimeout(120_000);
    await start(page, '#/oyin/raqamlar');
    await expect(page.getByTestId('numbers-levels')).toBeVisible();
    await shot(page, info, '45-numbers-levels');
    await page.getByTestId('level-1').click();
    const game = page.getByTestId('numbers-game');
    await expect(game).toHaveAttribute('data-target', /^n[1-5]$/, { timeout: 10_000 });
    const n = Number((await game.getAttribute('data-target'))!.slice(1));
    await expect(page.locator('.find-swatch circle[fill="#FF6B6B"]')).toHaveCount(n);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '46-numbers-game');
    await playFindRounds(page, 6, 'numbers-game', 'number');
    await expect(page.getByTestId('finish')).toContainText('× 1');
  });

  test('3-daraja: 9 va 10 albatta chiqadi', async ({ page }) => {
    test.setTimeout(120_000);
    await seedStars(page, { 'raqamlar.1': 3, 'raqamlar.2': 3 });
    await start(page, '#/oyin/raqamlar');
    await page.getByTestId('level-3').click();
    const targets = await playFindRounds(page, 6, 'numbers-game', 'number');
    expect(targets).toContain('n9');
    expect(targets).toContain('n10');
  });
});

/** Juftini top: bir xil rasmli ikki kartani bosadi. */
async function openPair(page: Page, pic: string): Promise<void> {
  const cards = page.locator(`.mem-card[data-pic="${pic}"]`);
  await cards.nth(0).click();
  await cards.nth(1).click();
  // Ikkalasi bir vaqtda "matched" bo'ladi; oxirgi juftdan keyin o'yin yakun ekraniga o'tadi.
  await expect
    .poll(
      async () =>
        (await page.getByTestId('finish').count()) > 0 ||
        (await cards.evaluateAll((els) => els.every((e) => e.dataset.state === 'matched'))),
      { timeout: 10_000 },
    )
    .toBe(true);
}

test.describe('Juftini top', () => {
  test('1-daraja: 6 karta; mos kelmasa yopiladi (urishmaydi); hammasi topilsa yulduz', async ({
    page,
  }, info) => {
    test.setTimeout(120_000);
    await start(page, '#/oyin/juftini-top');
    await expect(page.getByTestId('memory-levels')).toBeVisible();
    await page.getByTestId('level-1').click();
    const cards = page.locator('.mem-card');
    await expect(cards).toHaveCount(6);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    const pics = await cards.evaluateAll((els) => els.map((e) => e.getAttribute('data-pic')!));
    const uniq = [...new Set(pics)];
    expect(uniq).toHaveLength(3);

    // Mos kelmaydigan ikkita karta — ochiladi, keyin yana yopiladi.
    const a = page.locator(`.mem-card[data-pic="${uniq[0]}"]`).first();
    const b = page.locator(`.mem-card[data-pic="${uniq[1]}"]`).first();
    await a.click();
    await b.click();
    await expect(b).toHaveAttribute('data-state', 'open');
    await shot(page, info, '47-memory-open');
    await expect(a).toHaveAttribute('data-state', 'closed', { timeout: 5_000 });
    await expect(b).toHaveAttribute('data-state', 'closed');

    for (const pic of uniq) await openPair(page, pic);
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 15_000 });
  });

  test('3-daraja: 12 karta ekranga sigʻadi', async ({ page }, info) => {
    await seedStars(page, { 'juftini-top.1': 3, 'juftini-top.2': 3 });
    await start(page, '#/oyin/juftini-top');
    await page.getByTestId('level-3').click();
    await expect(page.locator('.mem-card')).toHaveCount(12);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await shot(page, info, '48-memory-level3');
  });
});

test.describe('Ketma-ketlik', () => {
  test('1-daraja: qator + "?"; xato urishmaydi; 5 raund; yulduz', async ({ page }, info) => {
    test.setTimeout(120_000);
    await start(page, '#/oyin/ketma-ketlik');
    await expect(page.getByTestId('sequence-levels')).toBeVisible();
    await page.getByTestId('level-1').click();
    const game = page.getByTestId('sequence-game');
    await expect(page.getByTestId('sequence-q')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('.sq-option')).toHaveCount(3);
    await expectBigButtons(page);
    await expectNoOverflow(page);
    await expectTopbarFits(page);
    await shot(page, info, '49-sequence-game');

    const first = (await game.getAttribute('data-target'))!;
    await page.locator(`.sq-option:not([data-elem="${first}"])`).first().click();
    await page.waitForTimeout(300);
    await expect(page.getByTestId('sequence-q')).toBeVisible();

    for (let round = 0; round < 5; round++) {
      await expect(page.getByTestId('sequence-q')).toBeVisible({ timeout: 15_000 });
      const target = (await game.getAttribute('data-target'))!;
      await page.locator(`.sq-option[data-elem="${target}"]`).click();
      await expect(page.getByTestId('sequence-q')).toHaveCount(0);
    }
    await expect(page.getByTestId('finish')).toBeVisible({ timeout: 15_000 });
  });

  test('3-daraja: ABC naqsh, 4 variant', async ({ page }, info) => {
    await seedStars(page, { 'ketma-ketlik.1': 3, 'ketma-ketlik.2': 3 });
    await start(page, '#/oyin/ketma-ketlik');
    await page.getByTestId('level-3').click();
    await expect(page.getByTestId('sequence-game')).toHaveAttribute('data-kind', 'ABC', {
      timeout: 10_000,
    });
    await expect(page.locator('.sq-option')).toHaveCount(4);
    await expectNoOverflow(page);
    await shot(page, info, '50-sequence-level3');
  });
});
