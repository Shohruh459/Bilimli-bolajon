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
    title: 'Şakllar',
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
    title: 'Katta — kiçik',
    art: 'kattaKichik',
    load: () => import('./size-find/index'),
  },
  {
    id: 'sanash',
    age: '3-4',
    title: 'Sanaş',
    art: 'sanash',
    load: () => import('./count-find/index'),
  },
  {
    id: 'harflar',
    age: '5',
    title: 'Harflar',
    art: 'harflar',
    load: () => import('./letters-find/index'),
  },
  {
    id: 'raqamlar',
    age: '5',
    title: 'Raqamlar',
    art: 'raqamlar',
    load: () => import('./numbers-find/index'),
  },
  {
    id: 'juftini-top',
    age: '5',
    title: 'Juftini top',
    art: 'juftiniTop',
    load: () => import('./memory/index'),
  },
  {
    id: 'ketma-ketlik',
    age: '5',
    title: 'Ketma-ketlik',
    art: 'ketmaKetlik',
    load: () => import('./sequence/index'),
  },
];

export function gamesFor(age: AgeId): GameMeta[] {
  return GAMES.filter((g) => g.age === age);
}

export function findGame(id: string): GameMeta | undefined {
  return GAMES.find((g) => g.id === id);
}
