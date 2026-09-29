import type { AgeId } from '../content/ages';
import type { ArtId } from '../ui/art';
import type { Scope } from './scope';

/** O'yinga ilova beradigan imkoniyatlar. */
export interface GameApi {
  readonly root: HTMLElement;
  readonly scope: Scope;
  /** O'yin tugadi → yulduz beriladi va yakuniy ekran ko'rsatiladi. */
  finish(): void;
  /** O'yindan chiqish (yosh menyusiga). */
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
