import type { AgeId } from '../content/ages';
import type { PhraseKey } from '../content/phrases';
import type { ArtId } from '../ui/art';
import type { Scope } from './scope';

/** O'yin yakunidagi qo'shimcha ma'lumot. */
export interface FinishInfo {
  /** Yulduz qaysi kalitga yoziladi (masalan "ranglar.2"). Default — o'yin id'si. */
  readonly starKey?: string;
  /** Yakuniy ekranda ko'rsatiladigan va aytiladigan xabar (masalan, yangi daraja ochildi). */
  readonly note?: { readonly text: string; readonly phrase: PhraseKey };
}

/** O'yinga ilova beradigan imkoniyatlar. */
export interface GameApi {
  readonly root: HTMLElement;
  readonly scope: Scope;
  /** Route'dagi daraja (#/oyin/<id>/<daraja>); daraja tanlanmagan bo'lsa null. */
  readonly level: number | null;
  /** Route'dagi rejim (#/oyin/<id>/<rejim>, masalan "tanishuv"); bo'lmasa null. */
  readonly mode: string | null;
  /** Darajani boshlash (route o'zgaradi → "orqaga" daraja tanlashga qaytaradi). */
  play(level: number): void;
  /** Rejimni ochish (masalan Tanishuv) — "orqaga" daraja tanlashga qaytaradi. */
  open(mode: string): void;
  /** O'yin tugadi → yulduz beriladi va yakuniy ekran ko'rsatiladi. */
  finish(info?: FinishInfo): void;
  /** O'yindan chiqish: darajadan/rejimdan — daraja tanlashga, aks holda yosh menyusiga. */
  exit(): void;
}

export type GameFactory = (api: GameApi) => void | Promise<void>;

export interface GameMeta {
  readonly id: string;
  readonly age: AgeId;
  readonly title: string;
  readonly art: ArtId;
  /** Lazy chunk — bosh sahifa bundle'iga kirmaydi. */
  readonly load: () => Promise<{ default: GameFactory }>;
}
