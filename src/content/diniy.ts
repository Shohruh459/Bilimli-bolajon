/**
 * DINIY MATNLAR — faqat loyiha egasi tekshirib to'ldiradi (docs/DINIY-MATNLAR.md).
 * Dasturchi/AI bu yerga matn YOZMAYDI. Ilova faqat status === 'TASDIQLANGAN' yozuvlarni ko'rsatadi.
 */
export type DiniyStatus = 'TASDIQLANMAGAN' | 'TEKSHIRUVDA' | 'TASDIQLANGAN';

export interface DiniyMatn {
  readonly id: string;
  /** Mavzu nomi (ota-ona belgilaydi) */
  readonly mavzu: string | null;
  /** Arabcha matn — faqat manbadan aynan ko'chirilgan */
  readonly arabcha: string | null;
  /** O'zbekcha ma'no/tarjima */
  readonly manosi: string | null;
  /** Manba (kitob, sahifa, raqam) */
  readonly manba: string | null;
  readonly tekshirdi: string | null;
  readonly sana: string | null;
  readonly status: DiniyStatus;
}

const PLACEHOLDER = (id: string): DiniyMatn => ({
  id,
  mavzu: null,
  arabcha: null,
  manosi: null,
  manba: null,
  tekshirdi: null,
  sana: null,
  status: 'TASDIQLANMAGAN',
});

export const DINIY_MATNLAR: readonly DiniyMatn[] = [
  PLACEHOLDER('slot-01'),
  PLACEHOLDER('slot-02'),
  PLACEHOLDER('slot-03'),
];

/** Ilovada ko'rsatishga ruxsat etilganlar: tasdiqlangan VA to'liq to'ldirilgan. */
export function approvedOnly(list: readonly DiniyMatn[] = DINIY_MATNLAR): DiniyMatn[] {
  return list.filter(
    (m) => m.status === 'TASDIQLANGAN' && !!m.arabcha && !!m.manba && !!m.tekshirdi && !!m.sana,
  );
}
