import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ENCOURAGE, PHRASES, PRAISE, type PhraseKey } from './phrases';

const entries = Object.entries(PHRASES) as [PhraseKey, { text: string }][];

describe('phrases', () => {
  it('orfografiya: oddiy apostrof emas, U+02BB / U+02BC', () => {
    for (const [key, { text }] of entries) {
      expect(text, key).not.toMatch(/['`‘’]/);
    }
  });

  it('kalitlar fayl nomi sifatida xavfsiz', () => {
    for (const [key] of entries) expect(key).toMatch(/^[a-z0-9]+(\.[a-z0-9-]+)+$/);
  });

  it('maqtov va ragʻbat guruhlari boʻsh emas va takrorsiz', () => {
    for (const list of [PRAISE, ENCOURAGE]) {
      expect(list.length).toBeGreaterThanOrEqual(3);
      expect(new Set(list).size).toBe(list.length);
    }
  });

  it('diniy atamalar umumiy iboralarda yoʻq', () => {
    const banned = /(alloh|olloh|bismilloh|duo|sura|oyat|hadis|payg|namoz)/i;
    for (const [key, { text }] of entries) expect(text, key).not.toMatch(banned);
  });

  it('docs/OVOZLAR.md barcha kalitlarni oʻz ichiga oladi (npm run ovozlar)', () => {
    const doc = readFileSync('docs/OVOZLAR.md', 'utf8');
    for (const [key] of entries) expect(doc, key).toContain(`\`${key}.mp3\``);
  });
});
