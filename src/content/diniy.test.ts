import { describe, expect, it } from 'vitest';
import { approvedOnly, DINIY_MATNLAR, type DiniyMatn } from './diniy';

describe('diniy matnlar', () => {
  it('hozircha hech qanday matn koʻrsatilmaydi', () => {
    expect(approvedOnly()).toEqual([]);
  });

  it('tasdiqlanmagan yozuvlarda matn yoʻq (placeholder)', () => {
    for (const m of DINIY_MATNLAR) {
      if (m.status !== 'TASDIQLANGAN') expect(m.arabcha).toBeNull();
    }
  });

  it('faqat TASDIQLANGAN va toʻliq yozuv oʻtadi', () => {
    const base: DiniyMatn = {
      id: 't',
      mavzu: 'x',
      arabcha: 'x',
      manosi: 'x',
      manba: 'x',
      tekshirdi: 'x',
      sana: '2026-01-01',
      status: 'TASDIQLANGAN',
    };
    expect(approvedOnly([base])).toHaveLength(1);
    expect(approvedOnly([{ ...base, status: 'TEKSHIRUVDA' }])).toHaveLength(0);
    expect(approvedOnly([{ ...base, manba: null }])).toHaveLength(0);
  });
});
