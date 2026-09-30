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

  // --- Darajalar (hamma darajali o'yinlar uchun umumiy) ---
  'daraja.tanla': { text: 'Qaysi darajani oʻynaymiz?', tone: 'qiziqtiruvchi' },
  'daraja.tayyorlanmoqda': {
    text: 'Bu daraja hali tayyorlanmoqda. Tez orada!',
    tone: 'mayin',
  },
  'daraja.yopiq': {
    text: 'Bu daraja hali yopiq. Yana yulduzcha yigʻ, keyin ochiladi!',
    tone: 'mayin, dalda',
  },

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
  'ranglar.top.toq-sariq': {
    text: 'Toʻq sariq rangni top!',
    tone: 'aniq, rang soʻzini urgʻu bilan',
  },
  'ranglar.top.binafsha': { text: 'Binafsha rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },
  'ranglar.top.pushti': { text: 'Pushti rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },
  'ranglar.top.jigarrang': {
    text: 'Jigarrang rangni top!',
    tone: 'aniq, rang soʻzini urgʻu bilan',
  },
  'ranglar.top.oq': { text: 'Oq rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },
  'ranglar.top.qora': { text: 'Qora rangni top!', tone: 'aniq, rang soʻzini urgʻu bilan' },

  // --- Ranglar: darajalar ---
  'ranglar.daraja-ochildi': {
    text: 'Yangi daraja ochildi! Yangi ranglar seni kutmoqda!',
    tone: 'bayramona',
  },

  // --- Oʻyin: Shakllarni topish (3–4 yosh) ---
  'shakllar.intro': { text: 'Qani, shakllarni topamiz!', tone: 'quvnoq' },
  'shakllar.top.doira': { text: 'Doirani top!', tone: 'aniq, shakl nomini urgʻu bilan' },
  'shakllar.top.kvadrat': { text: 'Kvadratni top!', tone: 'aniq, shakl nomini urgʻu bilan' },
  'shakllar.top.uchburchak': { text: 'Uchburchakni top!', tone: 'aniq, shakl nomini urgʻu bilan' },
  'shakllar.top.yulduz': { text: 'Yulduzni top!', tone: 'aniq, shakl nomini urgʻu bilan' },
  'shakllar.top.yurak': { text: 'Yurakni top!', tone: 'aniq, shakl nomini urgʻu bilan' },
  'shakllar.top.togri-tortburchak': {
    text: 'Toʻgʻri toʻrtburchakni top!',
    tone: 'aniq, sekinroq, shakl nomini urgʻu bilan',
  },
  'shakllar.top.oval': { text: 'Ovalni top!', tone: 'aniq, shakl nomini urgʻu bilan' },
  'shakllar.top.yarim-doira': {
    text: 'Yarim doirani top!',
    tone: 'aniq, shakl nomini urgʻu bilan',
  },
  'shakllar.daraja-ochildi': {
    text: 'Yangi daraja ochildi! Yangi shakllar seni kutmoqda!',
    tone: 'bayramona',
  },

  // --- Oʻyin: Hayvon ovozlari (3–4 yosh) ---
  'hayvonlar.intro': { text: 'Kim bunday ovoz chiqaradi?', tone: 'qiziqtiruvchi, sirli' },
  'hayvonlar.tanishuv': { text: 'Hayvonlar bilan tanishamiz! Birini bos.', tone: 'quvnoq' },
  'hayvonlar.daraja-ochildi': {
    text: 'Yangi daraja ochildi! Yangi hayvonlar seni kutmoqda!',
    tone: 'bayramona',
  },
  'hayvon.mushuk.nom': { text: 'Bu — mushuk!', tone: 'quvnoq' },
  'hayvon.mushuk.ovoz': { text: 'Mushuk: miyov-miyov!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.mushuk.tafakkur': { text: 'Mushuk uyimizni sichqonlardan asraydi.', tone: 'iliq' },
  'hayvon.it.nom': { text: 'Bu — it!', tone: 'quvnoq' },
  'hayvon.it.ovoz': { text: 'It: vov-vov!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.it.tafakkur': { text: 'It uyimizni qoʻriqlaydi.', tone: 'iliq' },
  'hayvon.sigir.nom': { text: 'Bu — sigir!', tone: 'quvnoq' },
  'hayvon.sigir.ovoz': { text: 'Sigir: moʻ-oʻ!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.sigir.tafakkur': { text: 'Sigir bizga sut beradi.', tone: 'iliq' },
  'hayvon.xoroz.nom': { text: 'Bu — xoʻroz!', tone: 'quvnoq' },
  'hayvon.xoroz.ovoz': { text: 'Xoʻroz: qu-qu-qu-qu!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.xoroz.tafakkur': { text: 'Xoʻroz ertalab hammani uygʻotadi.', tone: 'iliq' },
  'hayvon.qoy.nom': { text: 'Bu — qoʻy!', tone: 'quvnoq' },
  'hayvon.qoy.ovoz': { text: 'Qoʻy: ma-a-a!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.qoy.tafakkur': { text: 'Qoʻy bizga jun beradi.', tone: 'iliq' },
  'hayvon.ot.nom': { text: 'Bu — ot!', tone: 'quvnoq' },
  'hayvon.ot.ovoz': { text: 'Ot: i-go-go!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.ot.tafakkur': { text: 'Ot tez yuguradi va odamlarga yordam beradi.', tone: 'iliq' },
  'hayvon.ordak.nom': { text: 'Bu — oʻrdak!', tone: 'quvnoq' },
  'hayvon.ordak.ovoz': { text: 'Oʻrdak: gʻa-gʻa!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.ordak.tafakkur': { text: 'Oʻrdak suvda chiroyli suzadi.', tone: 'iliq' },
  'hayvon.qurbaqa.nom': { text: 'Bu — qurbaqa!', tone: 'quvnoq' },
  'hayvon.qurbaqa.ovoz': { text: 'Qurbaqa: vaq-vaq!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.qurbaqa.tafakkur': { text: 'Qurbaqa pashshalarni tutadi.', tone: 'iliq' },
  'hayvon.echki.nom': { text: 'Bu — echki!', tone: 'quvnoq' },
  'hayvon.echki.ovoz': { text: 'Echki: me-e-e!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.echki.tafakkur': { text: 'Echki bizga sut beradi.', tone: 'iliq' },
  'hayvon.eshak.nom': { text: 'Bu — eshak!', tone: 'quvnoq' },
  'hayvon.eshak.ovoz': { text: 'Eshak: i-a, i-a!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.eshak.tafakkur': { text: 'Eshak ogʻir yuk tashiydi.', tone: 'iliq' },
  'hayvon.tovuq.nom': { text: 'Bu — tovuq!', tone: 'quvnoq' },
  'hayvon.tovuq.ovoz': { text: 'Tovuq: qa-qa-qa!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.tovuq.tafakkur': { text: 'Tovuq bizga tuxum beradi.', tone: 'iliq' },
  'hayvon.asalari.nom': { text: 'Bu — asalari!', tone: 'quvnoq' },
  'hayvon.asalari.ovoz': { text: 'Asalari: viz-viz!', tone: 'hayvonga taqlid qilib, oʻyinqaroq' },
  'hayvon.asalari.tafakkur': { text: 'Asalari bizga asal beradi.', tone: 'iliq' },

  // --- Tafakkur (yumshoq kuzatuv iboralari) ---
  'tafakkur.olma': { text: 'Qara, olma qanday chiroyli qizil!', tone: 'hayratli' },
  'tafakkur.qulupnay': { text: 'Qulupnay qizil va shirin!', tone: 'iliq' },
  'tafakkur.quyosh': { text: 'Quyosh sariq, u bizni isitadi!', tone: 'iliq' },
  'tafakkur.banan': { text: 'Qara, banan qanday sariq!', tone: 'hayratli' },
  'tafakkur.baliq': { text: 'Koʻk baliqcha suvda suzadi!', tone: 'mayin' },
  'tafakkur.shar': { text: 'Koʻk shar osmonga uchadi!', tone: 'quvnoq' },
  'tafakkur.barg': { text: 'Yashil barg — daraxtning kiyimi!', tone: 'mayin' },
  'tafakkur.qurbaqa': { text: 'Yashil qurbaqa sakraydi: vaq-vaq!', tone: 'oʻyinqaroq' },
  'tafakkur.apelsin': { text: 'Apelsin toʻq sariq va shirali!', tone: 'iliq' },
  'tafakkur.sabzi': { text: 'Sabzi toʻq sariq, uni quyoncha yaxshi koʻradi!', tone: 'quvnoq' },
  'tafakkur.uzum': { text: 'Qara, uzum qanday binafsha!', tone: 'hayratli' },
  'tafakkur.baqlajon': { text: 'Baqlajon binafsha rangda!', tone: 'iliq' },
  'tafakkur.gul': { text: 'Pushti gul qanday chiroyli!', tone: 'hayratli' },
  'tafakkur.muzqaymoq': { text: 'Pushti muzqaymoq — sovuq va mazali!', tone: 'quvnoq' },
  'tafakkur.ayiqcha': { text: 'Jigarrang ayiqcha — yumshoq doʻstimiz!', tone: 'mayin' },
  'tafakkur.qoziqorin': { text: 'Qoʻziqorinning qalpoqchasi jigarrang!', tone: 'qiziqtiruvchi' },
  'tafakkur.qorodam': { text: 'Qor odam oppoq! Uni qishda yasaymiz.', tone: 'quvnoq' },
  'tafakkur.bulut': { text: 'Oppoq bulut osmonda suzadi!', tone: 'mayin' },
  'tafakkur.qarga': { text: 'Qargʻa qop-qora: qag-qag!', tone: 'oʻyinqaroq' },
  'tafakkur.mushuk': { text: 'Qora mushukcha: miyov!', tone: 'oʻyinqaroq' },
  // --- Tafakkur: shakllar ---
  'tafakkur.gildirak': {
    text: 'Gʻildirak dumaloq — shuning uchun aylanadi!',
    tone: 'qiziqtiruvchi',
  },
  'tafakkur.soat': { text: 'Soat ham doira: millari aylanib yuradi!', tone: 'mayin' },
  'tafakkur.sovga': { text: 'Sovgʻa qutisi kvadrat — hamma tomoni teng!', tone: 'quvnoq' },
  'tafakkur.deraza': { text: 'Kvadrat derazadan quyosh nuri kiradi!', tone: 'iliq' },
  'tafakkur.tog': { text: 'Togʻ uchburchak — tepasi oʻtkir!', tone: 'hayratli' },
  'tafakkur.chodir': { text: 'Chodir uchburchak — ichida issiq va shinam!', tone: 'iliq' },
  'tafakkur.dengiz-yulduzi': { text: 'Dengiz yulduzining beshta uchi bor!', tone: 'qiziqtiruvchi' },
  'tafakkur.pechenye': { text: 'Yulduzcha pechenye — mazali va chiroyli!', tone: 'quvnoq' },
  'tafakkur.yurak-shar': { text: 'Yurakcha — muhabbat belgisi!', tone: 'iliq, mehrli' },
  'tafakkur.yostiq': { text: 'Yurakcha yostiq — yumshoq va mayin!', tone: 'mayin' },
  'tafakkur.eshik': { text: 'Eshik toʻgʻri toʻrtburchak — baland va uzun!', tone: 'qiziqtiruvchi' },
  'tafakkur.kitob': { text: 'Kitob ichida qiziq hikoyalar bor!', tone: 'iliq' },
  'tafakkur.tuxum': { text: 'Tuxum oval — choʻzinchoq doiraga oʻxshaydi!', tone: 'qiziqtiruvchi' },
  'tafakkur.qovun': { text: 'Qovun oval va shirin!', tone: 'quvnoq' },
  'tafakkur.kamalak': { text: 'Kamalak yarim doira — rang-barang va chiroyli!', tone: 'hayratli' },
  'tafakkur.soyabon': { text: 'Soyabon yarim doira — bizni yomgʻirdan asraydi!', tone: 'mayin' },
  'tafakkur.tarvuz': { text: 'Tarvuz boʻlagi yarim doira — qizil va shirali!', tone: 'quvnoq' },
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
