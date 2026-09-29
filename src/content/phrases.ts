/**
 * ILOVADA AYTILADIGAN BARCHA IBORALAR — bitta ro'yxat.
 *
 * - Kalit = ovoz fayli nomi: src/assets/audio/uz/<kalit>.mp3
 * - Diniy matn bu yerda BO'LMAYDI (u content/diniy.ts da, tasdiqlash bilan).
 * - Orfografiya: oʻ gʻ → U+02BB (ʻ), tutuq belgisi → U+02BC (ʼ). Oddiy ' ishlatilmaydi.
 * - O'zgartirgandan keyin: `npm run ovozlar` (docs/OVOZLAR.md yangilanadi).
 */
export interface Phrase {
  readonly text: string;
  /** Yozib olayotganda ohang bo'yicha maslahat */
  readonly tone?: string;
}

export const PHRASES = {
  // --- Umumiy ekranlar ---
  'start.salom': { text: 'Salom, bolajon! Kel, birga oʻynaymiz!', tone: 'quvnoq, iliq' },
  'home.tanla': { text: 'Yoshingni tanla!', tone: 'mayin' },
  'menu.tanla': { text: 'Qaysi oʻyinni oʻynaymiz?', tone: 'qiziqtiruvchi' },
  'soon.tez-orada': { text: 'Bu yerda tez orada yangi oʻyinlar boʻladi!', tone: 'sirli, quvnoq' },

  // --- Maqtov (toʻgʻri javob) ---
  'praise.barakalla': { text: 'Barakalla!', tone: 'xursand' },
  'praise.ofarin': { text: 'Ofarin!', tone: 'xursand' },
  'praise.zor': { text: 'Zoʻr!', tone: 'hayajonli' },
  'praise.juda-yaxshi': { text: 'Juda yaxshi!', tone: 'iliq' },
  'praise.qoyil': { text: 'Qoyil!', tone: 'hayratli' },
  'praise.topding': { text: 'Toʻgʻri topding!', tone: 'xursand' },

  // --- Ragʻbat (xato javob — hech qachon urishmaydi) ---
  'encourage.yana': { text: 'Yana urinib koʻr!', tone: 'mayin, dalda' },
  'encourage.hechqisi': { text: 'Hechqisi yoʻq, yana bir bor!', tone: 'mayin' },
  'encourage.uddalaysan': { text: 'Sen albatta uddalaysan!', tone: 'ishonch bilan' },
  'encourage.diqqat': { text: 'Diqqat bilan qara!', tone: 'mayin, sekin' },

  // --- Yordam (2 marta xato boʻlsa) ---
  'hint.mana': { text: 'Qara, u mana shu yerda!', tone: 'mayin, sirli' },

  // --- Oʻyin yakuni ---
  'finish.hammasi': { text: 'Hammasini topding! Sen haqiqiy aqlli bolajonsan!', tone: 'bayramona' },
  'finish.yulduz': { text: 'Mana senga yulduzcha!', tone: 'sovgʻa berayotgandek' },

  // --- Oʻyin: Ranglarni topish (3–4 yosh) ---
  'ranglar.intro': { text: 'Qani, ranglarni topamiz!', tone: 'quvnoq' },
  'ranglar.top.qizil': { text: 'Qizil rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },
  'ranglar.top.sariq': { text: 'Sariq rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },
  'ranglar.top.kok': { text: 'Koʻk rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },
  'ranglar.top.yashil': { text: 'Yashil rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },

  // --- Tafakkur (yumshoq kuzatuv iboralari) ---
  'tafakkur.olma': { text: 'Qara, olma qanday chiroyli qizil!', tone: 'hayratli' },
  'tafakkur.qulupnay': { text: 'Qulupnay qizil va shirin!', tone: 'iliq' },
  'tafakkur.quyosh': { text: 'Quyosh sariq, u bizni isitadi!', tone: 'iliq' },
  'tafakkur.banan': { text: 'Qara, banan qanday sariq!', tone: 'hayratli' },
  'tafakkur.baliq': { text: 'Koʻk baliqcha suvda suzadi!', tone: 'mayin' },
  'tafakkur.shar': { text: 'Koʻk shar osmonga uchadi!', tone: 'quvnoq' },
  'tafakkur.barg': { text: 'Yashil barg — daraxtning kiyimi!', tone: 'mayin' },
  'tafakkur.qurbaqa': { text: 'Yashil qurbaqa sakraydi: vaq-vaq!', tone: 'oʻyinqaroq' },
} as const satisfies Record<string, Phrase>;

export type PhraseKey = keyof typeof PHRASES;

/** Guruhlar — feedback.ts shu ro'yxatlardan tanlaydi */
export const PRAISE: readonly PhraseKey[] = [
  'praise.barakalla',
  'praise.ofarin',
  'praise.zor',
  'praise.juda-yaxshi',
  'praise.qoyil',
  'praise.topding',
];

export const ENCOURAGE: readonly PhraseKey[] = [
  'encourage.yana',
  'encourage.hechqisi',
  'encourage.uddalaysan',
  'encourage.diqqat',
];

export function phraseText(key: PhraseKey): string {
  return PHRASES[key].text;
}
