/**
 * Rag'batlantirish — "ovoz + rasm + harakat" uchligi bir joyda.
 * Hamma o'yinlar shuni ishlatadi, shunda tajriba bir xil bo'ladi.
 */
import { ENCOURAGE, PRAISE, type PhraseKey } from '../content/phrases';
import { anim, finished } from './animate';
import { confetti } from './confetti';
import { createPicker } from './random';
import { sfx } from './sfx';
import { sayAll } from './voice';

const praise = createPicker(PRAISE);
const encourageP = createPicker(ENCOURAGE);

function centerOf(el: Element): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/** To'g'ri javob: tovush + sakrash + konfetti + maqtov (+ tafakkur iborasi). */
export async function celebrate(art: Element, extra: readonly PhraseKey[] = []): Promise<void> {
  sfx.correct();
  const a = anim.celebrate(art);
  const { x, y } = centerOf(art);
  confetti().burst(x, y);
  await Promise.all([finished(a), sayAll([praise.next(), ...extra])]);
}

/** Xato javob: yumshoq tovush + silkinish + dalda. Hech qachon urishmaydi. */
export async function encourage(art: Element): Promise<void> {
  sfx.wrong();
  const a = anim.shake(art);
  await Promise.all([finished(a), sayAll([encourageP.next()])]);
}

/** O'yin yakuni: fanfara + katta konfetti. */
export function finale(): void {
  sfx.win();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const c = confetti();
  c.burst(w * 0.2, h * 0.7, 40);
  c.burst(w * 0.5, h * 0.6, 50);
  c.burst(w * 0.8, h * 0.7, 40);
}
