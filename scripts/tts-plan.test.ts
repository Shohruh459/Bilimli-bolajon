import { describe, expect, it } from 'vitest';
import { isForbidden, planPhrase, ttsProblems, ttsText, type TtsEntry } from './tts-plan';

const entry = (text: string, say = ttsText({ text })): TtsEntry => ({
  text,
  say,
  date: '2026-10-24',
});

describe('ttsText — ovoz uchun matn', () => {
  it('oʻ, gʻ va tutuq belgisi oddiy apostrofga', () => {
    expect(ttsText({ text: 'Toʻgʻri topding! Maʼlumot' })).toBe("To'g'ri topding! Ma'lumot");
  });
  it('tire — vergul (qisqa pauza)', () => {
    expect(ttsText({ text: 'Bu — sigir!' })).toBe('Bu, sigir!');
  });
  it('`say` qatorlari saqlanadi (har biri alohida, orasida pauza)', () => {
    expect(ttsText({ text: 'x', say: 'Bir.\n  Ikki.  \n\nIkkita!' })).toBe('Bir.\nIkki.\nIkkita!');
  });

  it('`say` boʻlsa — u ishlatiladi', () => {
    expect(ttsText({ text: '2 ta olma', say: 'ikki ta olma' })).toBe('ikki ta olma');
  });
});

describe('ttsProblems — matn qoidalari', () => {
  it('raqam, qisqartma, uzun gap', () => {
    expect(ttsProblems('Salom, bolajon!')).toEqual([]);
    expect(ttsProblems('2500 soʻm')[0]).toMatch(/raqam/);
    expect(ttsProblems('PWA ilova')[0]).toMatch(/qisqartma/);
    expect(ttsProblems(Array.from({ length: 21 }, () => 'soʻz').join(' '))[0]).toMatch(/uzun/);
  });
});

describe('isForbidden — diniy matn TTS bilan yaratilmaydi', () => {
  it('diniy.* kaliti va arabcha harf', () => {
    expect(isForbidden('diniy.fotiha', 'TASDIQLANMAGAN')).toBe(true);
    expect(isForbidden('tafakkur.olma', 'بسم')).toBe(true);
    expect(isForbidden('tafakkur.olma', 'Olma qizil!')).toBe(false);
  });
});

describe('planPhrase — qaysi fayl yaratiladi', () => {
  const base = { key: 'praise.zor', text: 'Zoʻr!', say: "Zo'r!" };

  it('fayl yoʻq → yangi', () => {
    expect(planPhrase({ ...base, fileExists: false, entry: undefined })).toEqual({
      action: 'generate',
      reason: 'yangi',
    });
  });

  it('qoʻlda yozilgan fayl (manifestda yoʻq) — HECH QACHON ustidan yozilmaydi, force bilan ham', () => {
    for (const force of [false, true]) {
      expect(planPhrase({ ...base, fileExists: true, entry: undefined, force })).toEqual({
        action: 'skip',
        reason: 'qoʻlda-yozilgan',
      });
    }
  });

  it('TTS fayli: matn oʻzgarmagan → tayyor; oʻzgargan → qayta; force → qayta', () => {
    expect(planPhrase({ ...base, fileExists: true, entry: entry('Zoʻr!') }).action).toBe('skip');
    expect(planPhrase({ ...base, fileExists: true, entry: entry('Eski matn') })).toEqual({
      action: 'generate',
      reason: 'matn-oʻzgargan',
    });
    expect(
      planPhrase({ ...base, fileExists: true, entry: entry('Zoʻr!', 'Zo-o-or!') }).reason,
    ).toBe('matn-oʻzgargan');
    expect(planPhrase({ ...base, fileExists: true, entry: entry('Zoʻr!'), force: true })).toEqual({
      action: 'generate',
      reason: 'majburiy',
    });
  });

  it('diniy — har doim oʻtkazib yuboriladi', () => {
    expect(
      planPhrase({ key: 'diniy.duo', text: 'x', say: 'x', fileExists: false, entry: undefined }),
    ).toEqual({ action: 'skip', reason: 'diniy' });
  });
});
