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
  /**
   * Faqat sun'iy ovoz (TTS) uchun: talaffuz boshqacha yozilishi kerak bo'lsa
   * (raqam → so'z, chet so'z → eshitilganicha). Ekranda baribir `text`.
   */
  readonly say?: string;
}

export const PHRASES = {
  // --- Umumiy ekranlar ---
  'start.salom': { text: 'Salom, bolajon! Kel, birga öynaymiz!', tone: 'quvnoq, iliq' },
  'home.tanla': { text: 'Yoşingni tanla!', tone: 'mayin' },
  'menu.tanla': { text: 'Qaysi öyinni öynaymiz?', tone: 'qiziqtiruvchi' },
  'soon.tez-orada': { text: 'Bu yerda tez orada yangi öyinlar böladi!', tone: 'sirli, quvnoq' },

  // --- Maqtov (toʻgʻri javob) ---
  'praise.barakalla': { text: 'Barakalla!', tone: 'xursand' },
  // TTS "ofarn" deb yutib yuborardi — choʻziq "i" bilan toʻgʻri chiqadi (egasi eshitib tanladi).
  'praise.ofarin': { text: 'Ofarin!', tone: 'xursand', say: 'Ofariin!' },
  'praise.zor': { text: 'Zör!', tone: 'hayajonli' },
  'praise.juda-yaxshi': { text: 'Juda yaxşi!', tone: 'iliq' },
  'praise.qoyil': { text: 'Qoyil!', tone: 'hayratli' },
  'praise.topding': { text: 'Töğri topding!', tone: 'xursand' },

  // --- Ragʻbat (xato javob — hech qachon urishmaydi) ---
  'encourage.yana': { text: 'Yana urinib kör!', tone: 'mayin, dalda' },
  'encourage.hechqisi': { text: 'Heçqisi yöq, yana bir bor!', tone: 'mayin' },
  'encourage.uddalaysan': { text: 'Sen albatta uddalaysan!', tone: 'ishonch bilan' },
  'encourage.diqqat': { text: 'Diqqat bilan qara!', tone: 'mayin, sekin' },

  // --- Darajalar (hamma darajali o'yinlar uchun umumiy) ---
  'daraja.tanla': { text: 'Qaysi darajani öynaymiz?', tone: 'qiziqtiruvchi' },
  'daraja.tayyorlanmoqda': {
    text: 'Bu daraja hali tayyorlanmoqda. Tez orada!',
    tone: 'mayin',
  },
  'daraja.yopiq': {
    text: 'Bu daraja hali yopiq. Yana yulduzça yiğ, keyin oçiladi!',
    tone: 'mayin, dalda',
  },

  // --- Yordam (2 marta xato boʻlsa) ---
  'hint.mana': { text: 'Qara, u mana şu yerda!', tone: 'mayin, sirli' },

  // --- Oʻyin yakuni ---
  'finish.hammasi': { text: 'Hammasini topding! Sen haqiqiy aqlli bolajonsan!', tone: 'bayramona' },
  'finish.yulduz': { text: 'Mana senga yulduzça!', tone: 'sovğa berayotgandek' },

  // --- Oʻyin: Ranglarni topish (3–4 yosh) ---
  'ranglar.intro': { text: 'Qani, ranglarni topamiz!', tone: 'quvnoq' },
  'ranglar.top.qizil': { text: 'Qizil rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.sariq': { text: 'Sariq rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.kok': { text: 'Kök rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.yashil': { text: 'Yaşil rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.toq-sariq': {
    text: 'Töq sariq rangni top!',
    tone: 'aniq, rang sözini urğu bilan',
  },
  'ranglar.top.binafsha': { text: 'Binafşa rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.pushti': { text: 'Puşti rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.jigarrang': {
    text: 'Jigarrang rangni top!',
    tone: 'aniq, rang sözini urğu bilan',
  },
  'ranglar.top.oq': { text: 'Oq rangni top!', tone: 'aniq, rang sözini urğu bilan' },
  'ranglar.top.qora': { text: 'Qora rangni top!', tone: 'aniq, rang sözini urğu bilan' },

  // --- Ranglar: darajalar ---
  'ranglar.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Yangi ranglar seni kutmoqda!',
    tone: 'bayramona',
  },

  // --- Oʻyin: Shakllarni topish (3–4 yosh) ---
  'shakllar.intro': { text: 'Qani, şakllarni topamiz!', tone: 'quvnoq' },
  'shakllar.top.doira': { text: 'Doirani top!', tone: 'aniq, şakl nomini urğu bilan' },
  'shakllar.top.kvadrat': { text: 'Kvadratni top!', tone: 'aniq, şakl nomini urğu bilan' },
  'shakllar.top.uchburchak': { text: 'Uçburçakni top!', tone: 'aniq, şakl nomini urğu bilan' },
  'shakllar.top.yulduz': { text: 'Yulduzni top!', tone: 'aniq, şakl nomini urğu bilan' },
  'shakllar.top.romb': { text: 'Rombni top!', tone: 'aniq, şakl nomini urğu bilan' },
  'shakllar.top.olti-burchak': {
    text: 'Olti burçakni top!',
    tone: 'aniq, şakl nomini urğu bilan',
  },
  'shakllar.top.togri-tortburchak': {
    text: 'Töğri törtburçakni top!',
    tone: 'aniq, sekinroq, şakl nomini urğu bilan',
  },
  'shakllar.top.oval': { text: 'Ovalni top!', tone: 'aniq, şakl nomini urğu bilan' },
  'shakllar.top.yarim-doira': {
    text: 'Yarim doirani top!',
    tone: 'aniq, şakl nomini urğu bilan',
  },
  'shakllar.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Yangi şakllar seni kutmoqda!',
    tone: 'bayramona',
  },

  // --- Oʻyin: Hayvonlar (3–4 yosh) ---
  'hayvonlar.intro': { text: 'Kel, hayvonlarni topamiz!', tone: 'quvnoq' },
  'hayvonlar.tanishuv': { text: 'Hayvonlar bilan tanişamiz! Birini bos.', tone: 'quvnoq' },
  'hayvonlar.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Yangi hayvonlar seni kutmoqda!',
    tone: 'bayramona',
  },
  'hayvon.mushuk.nom': { text: 'Bu — muşuk!', tone: 'quvnoq' },
  'hayvon.mushuk.top': { text: 'Muşukni top!', tone: 'qiziqtiruvchi' },
  'hayvon.mushuk.tafakkur': { text: 'Muşuk uyimizni siçqonlardan asraydi.', tone: 'iliq' },
  'hayvon.it.nom': { text: 'Bu — it!', tone: 'quvnoq' },
  'hayvon.it.top': { text: 'Itni top!', tone: 'qiziqtiruvchi' },
  'hayvon.it.tafakkur': { text: 'It uyimizni qöriqlaydi.', tone: 'iliq' },
  'hayvon.sigir.nom': { text: 'Bu — sigir!', tone: 'quvnoq' },
  'hayvon.sigir.top': { text: 'Sigirni top!', tone: 'qiziqtiruvchi' },
  'hayvon.sigir.tafakkur': { text: 'Sigir bizga sut beradi.', tone: 'iliq' },
  'hayvon.xoroz.nom': { text: 'Bu — xöroz!', tone: 'quvnoq' },
  'hayvon.xoroz.top': { text: 'Xörozni top!', tone: 'qiziqtiruvchi' },
  'hayvon.xoroz.tafakkur': { text: 'Xöroz ertalab hammani uyğotadi.', tone: 'iliq' },
  'hayvon.qoy.nom': { text: 'Bu — qöy!', tone: 'quvnoq' },
  'hayvon.qoy.top': { text: 'Qöyni top!', tone: 'qiziqtiruvchi' },
  'hayvon.qoy.tafakkur': { text: 'Qöy bizga jun beradi.', tone: 'iliq' },
  'hayvon.ot.nom': { text: 'Bu — ot!', tone: 'quvnoq' },
  'hayvon.ot.top': { text: 'Otni top!', tone: 'qiziqtiruvchi' },
  'hayvon.ot.tafakkur': { text: 'Ot tez yuguradi va odamlarga yordam beradi.', tone: 'iliq' },
  'hayvon.ordak.nom': { text: 'Bu — ördak!', tone: 'quvnoq' },
  'hayvon.ordak.top': { text: 'Ördakni top!', tone: 'qiziqtiruvchi' },
  'hayvon.ordak.tafakkur': { text: 'Ördak suvda çiroyli suzadi.', tone: 'iliq' },
  'hayvon.qurbaqa.nom': { text: 'Bu — qurbaqa!', tone: 'quvnoq' },
  'hayvon.qurbaqa.top': { text: 'Qurbaqani top!', tone: 'qiziqtiruvchi' },
  'hayvon.qurbaqa.tafakkur': { text: 'Qurbaqa paşşalarni tutadi.', tone: 'iliq' },
  'hayvon.echki.nom': { text: 'Bu — eçki!', tone: 'quvnoq' },
  'hayvon.echki.top': { text: 'Eçkini top!', tone: 'qiziqtiruvchi' },
  'hayvon.echki.tafakkur': { text: 'Eçki bizga sut beradi.', tone: 'iliq' },
  'hayvon.eshak.nom': { text: 'Bu — eşak!', tone: 'quvnoq' },
  'hayvon.eshak.top': { text: 'Eşakni top!', tone: 'qiziqtiruvchi' },
  'hayvon.eshak.tafakkur': { text: 'Eşak oğir yuk taşiydi.', tone: 'iliq' },
  'hayvon.tovuq.nom': { text: 'Bu — tovuq!', tone: 'quvnoq' },
  'hayvon.tovuq.top': { text: 'Tovuqni top!', tone: 'qiziqtiruvchi' },
  'hayvon.tovuq.tafakkur': { text: 'Tovuq bizga tuxum beradi.', tone: 'iliq' },
  'hayvon.asalari.nom': { text: 'Bu — asalari!', tone: 'quvnoq' },
  'hayvon.asalari.top': { text: 'Asalarini top!', tone: 'qiziqtiruvchi' },
  'hayvon.asalari.tafakkur': { text: 'Asalari bizga asal beradi.', tone: 'iliq' },

  // --- Oʻyin: Katta — kichik (3–4 yosh) ---
  'kattakichik.intro': { text: 'Kel, kattasini va kiçigini topamiz!', tone: 'quvnoq' },
  'kattakichik.top.katta': { text: 'Eng kattasini top!', tone: 'aniq, "katta" ni urğu bilan' },
  'kattakichik.top.kichik': {
    text: 'Eng kiçigini top!',
    tone: 'aniq, "kiçik" ni mayin, ingiçka ovozda',
  },
  'kattakichik.togri.katta': { text: 'Ha, bu eng kattasi!', tone: 'xursand' },
  'kattakichik.togri.kichik': { text: 'Ha, bu eng kiçigi!', tone: 'xursand, mayin' },
  'kattakichik.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Endi diqqat bilan qara.',
    tone: 'bayramona',
  },

  // --- Oʻyin: Sanash 1–5 (3–4 yosh) ---
  'sanash.intro': { text: 'Kel, birga sanaymiz!', tone: 'quvnoq' },
  'sanash.qayerda.bir': { text: 'Qayerda bitta?', tone: 'qiziqtiruvchi' },
  'sanash.qayerda.ikki': { text: 'Qayerda ikkita?', tone: 'qiziqtiruvchi' },
  'sanash.qayerda.uch': { text: 'Qayerda uçta?', tone: 'qiziqtiruvchi' },
  'sanash.qayerda.tort': { text: 'Qayerda törtta?', tone: 'qiziqtiruvchi' },
  'sanash.qayerda.besh': { text: 'Qayerda beşta?', tone: 'qiziqtiruvchi' },
  'sanash.son.bir': { text: 'Bir. Bitta!', tone: 'sekin, har sonni aniq' },
  'sanash.son.ikki': {
    text: 'Bir, ikki. Ikkita!',
    tone: 'sekin, har sonni aniq',
    // Sonlar orasida pauza — bola birga sanab ulgursin (TTS tez aytardi).
    say: 'Bir.\nIkki.\nIkkita!',
  },
  'sanash.son.uch': {
    text: 'Bir, ikki, uç. Uçta!',
    tone: 'sekin, har sonni aniq',
    // Sonlar orasida pauza — bola birga sanab ulgursin (TTS tez aytardi).
    say: 'Bir.\nIkki.\nUç.\nUçta!',
  },
  'sanash.son.tort': {
    text: 'Bir, ikki, uç, tört. Törtta!',
    tone: 'sekin, har sonni aniq',
    // Sonlar orasida pauza — bola birga sanab ulgursin (TTS tez aytardi).
    say: 'Bir.\nIkki.\nUç.\nTört.\nTörtta!',
  },
  'sanash.son.besh': {
    text: 'Bir, ikki, uç, tört, beş. Beşta!',
    tone: 'sekin, har sonni aniq',
    // Sonlar orasida pauza — bola birga sanab ulgursin (TTS tez aytardi).
    say: 'Bir.\nIkki.\nUç.\nTört.\nBeş.\nBeşta!',
  },
  'sanash.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Endi köproq sanaymiz!',
    tone: 'bayramona',
  },

  // --- Öyin: Harflar (5 yoş). Harf nomlari — maktabdagidek (egasi tasdiqlagan) ---
  'harflar.intro': { text: 'Kel, harflarni topamiz!', tone: 'quvnoq' },
  'harflar.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Yangi harflar seni kutmoqda!',
    tone: 'bayramona',
  },
  'harflar.top.a': { text: 'A harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.a': { text: 'A — anor!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.b': { text: 'Be harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.b': { text: 'Be — baliq!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.d': { text: 'De harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.d': { text: 'De — daraxt!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.e': { text: 'E harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.e': { text: 'E — eşik!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.f': { text: 'Fe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.f': { text: 'Fe — fil!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.g': { text: 'Ge harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.g': { text: 'Ge — gul!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.h': { text: 'He harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.h': { text: 'He — hovli!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.i': { text: 'I harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.i': { text: 'I — it!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.j': { text: 'Je harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.j': { text: 'Je — jöja!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.k': { text: 'Ke harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.k': { text: 'Ke — kitob!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.l': { text: 'Le harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.l': { text: 'Le — lola!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.m': { text: 'Me harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.m': { text: 'Me — muşuk!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.n': { text: 'Ne harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.n': { text: 'Ne — non!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.o': { text: 'O harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.o': { text: 'O — olma!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.p': { text: 'Pe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.p': { text: 'Pe — paxta!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.q': { text: 'Qe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.q': { text: 'Qe — quyoş!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.r': { text: 'Re harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.r': { text: 'Re — rasm!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.s': { text: 'Se harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.s': { text: 'Se — sigir!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.t': { text: 'Te harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.t': { text: 'Te — tovuq!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.u': { text: 'U harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.u': { text: 'U — uy!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.v': { text: 'Ve harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.v': { text: 'Ve — varrak!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.x': { text: 'Xe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.x': { text: 'Xe — xöroz!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.y': { text: 'Ye harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.y': { text: 'Ye — yulduz!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.z': { text: 'Ze harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.z': { text: 'Ze — zinapoya!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.oo': { text: 'Ö harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.oo': { text: 'Ö — ördak!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.gg': { text: 'Ğe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.gg': { text: 'Ğe — ğildirak!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.sh': { text: 'Şe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.sh': { text: 'Şe — şar!', tone: 'quvnoq, söz boşini çözib' },
  'harflar.top.ch': { text: 'Çe harfini top!', tone: 'aniq, harf nomini urğu bilan' },
  'harflar.soz.ch': { text: 'Çe — çumoli!', tone: 'quvnoq, söz boşini çözib' },

  // --- Öyin: Raqamlar 1–10 (5 yoş) ---
  'raqamlar.intro': { text: 'Kel, raqamlarni topamiz!', tone: 'quvnoq' },
  'raqamlar.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Endi kattaroq sonlar!',
    tone: 'bayramona',
  },
  'raqamlar.top.n1': { text: 'Bir raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n1': { text: 'Ha, bu — bir!', tone: 'xursand' },
  'raqamlar.top.n2': { text: 'Ikki raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n2': { text: 'Ha, bu — ikki!', tone: 'xursand' },
  'raqamlar.top.n3': { text: 'Uç raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n3': { text: 'Ha, bu — uç!', tone: 'xursand' },
  'raqamlar.top.n4': { text: 'Tört raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n4': { text: 'Ha, bu — tört!', tone: 'xursand' },
  'raqamlar.top.n5': { text: 'Beş raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n5': { text: 'Ha, bu — beş!', tone: 'xursand' },
  'raqamlar.top.n6': { text: 'Olti raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n6': { text: 'Ha, bu — olti!', tone: 'xursand' },
  'raqamlar.top.n7': { text: 'Yetti raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n7': { text: 'Ha, bu — yetti!', tone: 'xursand' },
  'raqamlar.top.n8': { text: 'Sakkiz raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n8': { text: 'Ha, bu — sakkiz!', tone: 'xursand' },
  'raqamlar.top.n9': { text: 'Toqqiz raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n9': { text: 'Ha, bu — toqqiz!', tone: 'xursand' },
  'raqamlar.top.n10': { text: 'Ön raqamini top!', tone: 'aniq' },
  'raqamlar.bu.n10': { text: 'Ha, bu — ön!', tone: 'xursand' },

  // --- Öyin: Juftini top (5 yoş) ---
  'juft.intro': { text: 'Bir xil ikkita rasmni top!', tone: 'qiziqtiruvçi' },
  'juft.topding': { text: 'Juftini topding!', tone: 'xursand' },
  'juft.daraja-ochildi': { text: 'Yangi daraja oçildi! Endi kartalar köproq!', tone: 'bayramona' },

  // --- Öyin: Ketma-ketlik (5 yoş) ---
  'qator.intro': { text: 'Qatorga qara! Keyingisi qaysi?', tone: 'qiziqtiruvçi' },
  'qator.keyingisi': { text: 'Keyingisi qaysi?', tone: 'qiziqtiruvçi' },
  'qator.togri': { text: 'Ha, qator davom etdi!', tone: 'xursand' },
  'qator.daraja-ochildi': {
    text: 'Yangi daraja oçildi! Endi qatorlar uzunroq!',
    tone: 'bayramona',
  },

  // --- Tafakkur (yumshoq kuzatuv iboralari) ---
  'tafakkur.olma': { text: 'Qara, olma qanday çiroyli qizil!', tone: 'hayratli' },
  'tafakkur.qulupnay': { text: 'Qulupnay qizil va şirin!', tone: 'iliq' },
  'tafakkur.quyosh': { text: 'Quyoş sariq, u bizni isitadi!', tone: 'iliq' },
  'tafakkur.banan': { text: 'Qara, banan qanday sariq!', tone: 'hayratli' },
  'tafakkur.baliq': { text: 'Kök baliqça suvda suzadi!', tone: 'mayin' },
  'tafakkur.shar': { text: 'Kök şar yengil va dumaloq!', tone: 'quvnoq' },
  'tafakkur.barg': { text: 'Yaşil barg — daraxtning kiyimi!', tone: 'mayin' },
  'tafakkur.qurbaqa': { text: 'Yaşil qurbaqa sakraydi: vaq-vaq!', tone: 'öyinqaroq' },
  'tafakkur.apelsin': { text: 'Apelsin töq sariq va şirali!', tone: 'iliq' },
  'tafakkur.sabzi': { text: 'Sabzi töq sariq, uni quyonça yaxşi köradi!', tone: 'quvnoq' },
  'tafakkur.uzum': { text: 'Qara, uzum qanday binafşa!', tone: 'hayratli' },
  'tafakkur.baqlajon': { text: 'Baqlajon binafşa rangda!', tone: 'iliq' },
  'tafakkur.gul': { text: 'Puşti gul qanday çiroyli!', tone: 'hayratli' },
  'tafakkur.muzqaymoq': { text: 'Puşti muzqaymoq — sovuq va mazali!', tone: 'quvnoq' },
  'tafakkur.ayiqcha': { text: 'Jigarrang ayiqça — yumşoq döstimiz!', tone: 'mayin' },
  'tafakkur.qoziqorin': { text: 'Qöziqorinning qalpoqçasi jigarrang!', tone: 'qiziqtiruvchi' },
  'tafakkur.qorodam': { text: 'Qor odam oppoq! Uni qişda yasaymiz.', tone: 'quvnoq' },
  'tafakkur.bulut': { text: 'Oppoq bulut osmonda suzadi!', tone: 'mayin' },
  'tafakkur.qarga': { text: 'Qarğa qop-qora: qag-qag!', tone: 'öyinqaroq' },
  'tafakkur.mushuk': { text: 'Qora muşukça: miyov!', tone: 'öyinqaroq' },
  // --- Tafakkur: shakllar ---
  'tafakkur.gildirak': {
    text: 'Ğildirak dumaloq — şuning uçun aylanadi!',
    tone: 'qiziqtiruvchi',
  },
  'tafakkur.soat': { text: 'Soat ham doira: millari aylanib yuradi!', tone: 'mayin' },
  'tafakkur.sovga': { text: 'Sovğa qutisi kvadrat — hamma tomoni teng!', tone: 'quvnoq' },
  'tafakkur.deraza': { text: 'Kvadrat derazadan quyoş nuri kiradi!', tone: 'iliq' },
  'tafakkur.tog': { text: 'Toğ uçburçak — tepasi ötkir!', tone: 'hayratli' },
  'tafakkur.chodir': { text: 'Çodir uçburçak — içida issiq va şinam!', tone: 'iliq' },
  'tafakkur.dengiz-yulduzi': { text: 'Dengiz yulduzining beşta uçi bor!', tone: 'qiziqtiruvchi' },
  'tafakkur.pechenye': { text: 'Yulduzça peçenye — mazali va çiroyli!', tone: 'quvnoq' },
  'tafakkur.varrak': { text: 'Varrak şamolda baland uçadi!', tone: 'quvnoq' },
  'tafakkur.pahlava': { text: 'Pahlava romb şaklida — şirin va mazali!', tone: 'iliq' },
  'tafakkur.asal-katagi': {
    text: 'Asalarilar asal katagini olti burçak qilib quradi!',
    tone: 'hayratli',
  },
  'tafakkur.qalam': { text: 'Qalamning orqasiga qara — olti burçak!', tone: 'qiziqtiruvchi' },
  'tafakkur.eshik': { text: 'Eşik töğri törtburçak — baland va uzun!', tone: 'qiziqtiruvchi' },
  'tafakkur.kitob': { text: 'Kitob içida qiziq hikoyalar bor!', tone: 'iliq' },
  'tafakkur.tuxum': { text: 'Tuxum oval — çözinçoq doiraga öxşaydi!', tone: 'qiziqtiruvchi' },
  'tafakkur.qovun': { text: 'Qovun oval va şirin!', tone: 'quvnoq' },
  'tafakkur.kamalak': { text: 'Kamalak yarim doira — rang-barang va çiroyli!', tone: 'hayratli' },
  'tafakkur.soyabon': { text: 'Soyabon yarim doira — bizni yomğirdan asraydi!', tone: 'mayin' },
  'tafakkur.tarvuz': { text: 'Tarvuz bölagi yarim doira — qizil va şirali!', tone: 'quvnoq' },
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
