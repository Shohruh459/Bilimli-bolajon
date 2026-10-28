/**
 * "Ketma-ketlik" — sof mantiq. Qator naqsh bo'yicha takrorlanadi (AB, AAB, ABB, ABC);
 * bola keyingi elementni topadi. Element = shakl + rang.
 */
import { shuffle, type Rng } from '../../engine/random';

export const GAME_ID = 'ketma-ketlik';

export const SHAPES = ['doira', 'kvadrat', 'uchburchak', 'yulduz'] as const;
export const COLORS = ['#E53935', '#1E88E5', '#F9A825', '#43A047'] as const;
export type Shape = (typeof SHAPES)[number];

export interface Elem {
  readonly id: string;
  readonly shape: Shape;
  readonly color: string;
}

export const ELEMS: readonly Elem[] = SHAPES.flatMap((shape, s) =>
  COLORS.map((color, c) => ({ id: `${shape}-${c}`, shape, color, s, c })).filter(
    // 16 ta kombinatsiyadan 8 tasi ("shaxmat" tartibi): har shakl 2 rangda, har rang 2 shaklda.
    (x) => (x.s + x.c) % 2 === 0,
  ),
).map(({ id, shape, color }) => ({ id, shape, color }));

export type PatternKind = 'AB' | 'AAB' | 'ABB' | 'ABC';

export interface SeqLevel {
  readonly level: 1 | 2 | 3;
  readonly kinds: readonly PatternKind[];
  readonly options: 3 | 4;
  readonly rounds: number;
}

/** 1) AB  2) AAB / ABB  3) ABC (4 variant) */
export const SEQ_LEVELS: readonly SeqLevel[] = [
  { level: 1, kinds: ['AB'], options: 3, rounds: 5 },
  { level: 2, kinds: ['AAB', 'ABB'], options: 3, rounds: 5 },
  { level: 3, kinds: ['ABC'], options: 4, rounds: 6 },
];

/** Ekranda ko'rinadigan elementlar soni (oxirida "?") */
export const VISIBLE = 5;

export interface SeqRound {
  readonly kind: PatternKind;
  readonly shown: readonly Elem[];
  readonly answer: Elem;
  readonly options: readonly Elem[];
}

const unitOf = (kind: PatternKind, [a, b, c]: readonly Elem[]): Elem[] =>
  kind === 'AB'
    ? [a!, b!]
    : kind === 'AAB'
      ? [a!, a!, b!]
      : kind === 'ABB'
        ? [a!, b!, b!]
        : [a!, b!, c!];

export function makeRound(kind: PatternKind, options: number, rng: Rng): SeqRound {
  const picked = shuffle(ELEMS, rng);
  const used = new Set(kind.split(''));
  const parts = picked.slice(0, used.size);
  const unit = unitOf(kind, parts);
  const seq = Array.from({ length: VISIBLE + 1 }, (_, i) => unit[i % unit.length]!);
  const answer = seq[VISIBLE]!;
  // Variantlar: javob + naqshdagi boshqa element(lar) + naqshda yo'q element(lar)
  const inPattern = parts.filter((p) => p.id !== answer.id);
  const outside = picked.slice(used.size);
  const distractors = [...inPattern, ...outside].slice(0, options - 1);
  return {
    kind,
    shown: seq.slice(0, VISIBLE),
    answer,
    options: shuffle([answer, ...distractors], rng),
  };
}

export function makeRounds(level: SeqLevel, rng: Rng): SeqRound[] {
  return Array.from({ length: level.rounds }, (_, i) =>
    makeRound(level.kinds[i % level.kinds.length]!, level.options, rng),
  );
}

export function elemSvg(e: Elem, size = 120): string {
  const k = size / 120;
  const p = (n: number) => (n * k).toFixed(1);
  const body =
    e.shape === 'doira'
      ? `<circle cx="${p(60)}" cy="${p(60)}" r="${p(44)}"/>`
      : e.shape === 'kvadrat'
        ? `<rect x="${p(18)}" y="${p(18)}" width="${p(84)}" height="${p(84)}" rx="${p(8)}"/>`
        : e.shape === 'uchburchak'
          ? `<path d="M${p(60)} ${p(12)}L${p(108)} ${p(102)}H${p(12)}z"/>`
          : `<path d="M${p(60)} ${p(8)}l${p(15)} ${p(31)} ${p(34)} ${p(5)}-${p(25)} ${p(24)} ${p(6)} ${p(34)}-${p(30)}-${p(16)}-${p(30)} ${p(16)} ${p(6)}-${p(34)}-${p(25)}-${p(24)} ${p(34)}-${p(5)}z"/>`;
  return `<svg viewBox="0 0 ${size} ${size}"><g fill="${e.color}" stroke="#1E2A47" stroke-width="${p(5)}" stroke-linejoin="round">${body}</g></svg>`;
}
