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
  {
    id: 'shakllar',
    age: '3-4',
    title: 'Shakllar',
    art: 'shakllar',
    load: () => import('./shapes-find/index'),
  },
  {
    id: 'hayvonlar',
    age: '3-4',
    title: 'Hayvonlar',
    art: 'hayvonlar',
    load: () => import('./animals/index'),
  },
  {
    id: 'katta-kichik',
    age: '3-4',
    title: 'Katta — kichik',
    art: 'kattaKichik',
    load: () => import('./size-find/index'),
  },
  {
    id: 'sanash',
    age: '3-4',
    title: 'Sanash',
    art: 'sanash',
    load: () => import('./count-find/index'),
  },
];

export function gamesFor(age: AgeId): GameMeta[] {
  return GAMES.filter((g) => g.age === age);
}

export function findGame(id: string): GameMeta | undefined {
  return GAMES.find((g) => g.id === id);
}
