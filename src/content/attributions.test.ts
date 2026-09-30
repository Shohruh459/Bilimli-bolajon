import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/** Faqat shu litsenziyalar (egasi talabi): CC0 yoki public domain. */
const ALLOWED = new Set(['CC0-1.0', 'Public domain']);
const SOUNDS = 'src/assets/sounds';

interface Row {
  file: string;
  source: string;
  author: string;
  license: string;
}

/** ATTRIBUTIONS.md jadvalidan qatorlar: | `fayl` | nima | manba | muallif | litsenziya | sana | o'zg. | */
export function parseAttributions(md: string): Row[] {
  const body = md.replace(/<!--[\s\S]*?-->/g, '');
  return body
    .split('\n')
    .filter((l) => /^\|\s*`[^`]+`\s*\|/.test(l))
    .map((l) => {
      const cells = l
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      return {
        file: (cells[0] ?? '').replace(/`/g, ''),
        source: cells[2] ?? '',
        author: cells[3] ?? '',
        license: cells[4] ?? '',
      };
    });
}

function listFiles(dir: string): string[] {
  let out: string[] = [];
  let names: string[];
  try {
    names = readdirSync(dir);
  } catch {
    return out;
  }
  for (const n of names) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out = out.concat(listFiles(p));
    else if (!n.endsWith('.md')) out.push(relative(SOUNDS, p).replace(/\\/g, '/'));
  }
  return out;
}

describe('ATTRIBUTIONS.md — uchinchi tomon ovozlari', () => {
  const rows = parseAttributions(readFileSync('docs/ATTRIBUTIONS.md', 'utf8'));
  const files = listFiles(SOUNDS);

  it('har bir ovoz fayli jadvalda, manba va muallif bilan', () => {
    for (const f of files) {
      const row = rows.find((r) => r.file === f);
      expect(row, `${f} ATTRIBUTIONS.md da yoʻq`).toBeTruthy();
      expect(row!.source, f).toMatch(/^https:\/\/(commons\.wikimedia\.org|freesound\.org)\//);
      expect(row!.author.length, f).toBeGreaterThan(0);
    }
  });

  it('litsenziya faqat CC0-1.0 yoki Public domain', () => {
    for (const r of rows) expect(ALLOWED.has(r.license), `${r.file}: ${r.license}`).toBe(true);
  });

  it('jadvalda eskirgan (fayli yoʻq) qator yoʻq', () => {
    for (const r of rows) expect(files, r.file).toContain(r.file);
  });

  it('parser: namuna izohni hisoblamaydi, CC BY qatorini aniqlaydi', () => {
    const md = [
      '| Fayl | Nima | Manba | Muallif | Litsenziya | Sana | O |',
      '| --- | --- | --- | --- | --- | --- | --- |',
      '| `animals/a.mp3` | A | https://commons.wikimedia.org/wiki/File:A.ogg | X | CC0-1.0 | 2026 | - |',
      '| `animals/b.mp3` | B | https://freesound.org/s/1/ | Y | CC-BY-4.0 | 2026 | - |',
      '<!-- | `animals/c.mp3` | C | x | Z | CC0-1.0 | 2026 | - | -->',
    ].join('\n');
    const parsed = parseAttributions(md);
    expect(parsed.map((r) => r.file)).toEqual(['animals/a.mp3', 'animals/b.mp3']);
    expect(parsed.filter((r) => !ALLOWED.has(r.license)).map((r) => r.file)).toEqual([
      'animals/b.mp3',
    ]);
  });
});
