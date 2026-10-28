import type { ArtId } from '../ui/art';

export type AgeId = '3-4' | '5' | '6-7' | 'diniy';

export interface AgeGroup {
  readonly id: AgeId;
  readonly title: string;
  readonly subtitle: string;
  readonly art: ArtId;
}

export const AGES: readonly AgeGroup[] = [
  { id: '3-4', title: '3–4', subtitle: 'yoş', art: 'koptok' },
  { id: '5', title: '5', subtitle: 'yoş', art: 'yulduz' },
  { id: '6-7', title: '6–7', subtitle: 'yoş', art: 'kitob' },
  { id: 'diniy', title: 'Diniy', subtitle: 'ota-ona bilan', art: 'tun' },
];

export function isAgeId(v: string): v is AgeId {
  return AGES.some((a) => a.id === v);
}
