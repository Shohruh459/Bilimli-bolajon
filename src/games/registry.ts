import type { AgeId } from '../content/ages';
import type { GameMeta } from '../engine/game';

export const GAMES: readonly GameMeta[] = [
  {
    id: 'ranglar',
    age: '3-4',
    title: 'Ranglar',
    art: 'olma',
    load: () => import('./colors-find/index'),
  },
];

export function gamesFor(age: AgeId): GameMeta[] {
  return GAMES.filter((g) => g.age === age);
}

export function findGame(id: string): GameMeta | undefined {
  return GAMES.find((g) => g.id === id);
}
