import type { Scope } from '../engine/scope';
import type { Route } from './router';

export interface AppApi {
  go(route: Route): void;
  /** Joriy route'ni qaytadan chizish (masalan, "yana o'ynash"). */
  rerender(): void;
}

export interface ScreenCtx {
  readonly root: HTMLElement;
  readonly scope: Scope;
  readonly app: AppApi;
}

/** Ekran — oddiy funksiya. Tozalash: scope.dispose() (app.ts buni o'zi qiladi). */
export type Screen = (ctx: ScreenCtx) => void | Promise<void>;
