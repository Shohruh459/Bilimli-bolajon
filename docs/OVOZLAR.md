# Ovoz yozuvlari ro'yxati

> Bu fayl avtomatik yaratiladi: `npm run ovozlar` (manba — `src/content/phrases.ts`).
> Qo'lda tahrirlamang — matnni phrases.ts da o'zgartiring.

**Holat:** 0 / 226 qoʻlda yozilgan, 149 ta vaqtinchalik sunʼiy ovoz (🤖 TTS).

🤖 — sunʼiy ovoz (`docs/TTS.md`). Qoʻlda yozilgan fayl qoʻyilsa, uni manifestdan
(`src/assets/audio/uz/tts.json`) olib tashlang — keyin TTS unga hech qachon tegmaydi.

## Talablar

- Format: **MP3**, mono, 44.1 kHz, 64–96 kbps.
- Boshida va oxirida 0.1 s dan ortiq jimlik bo'lmasin (javob tez eshitilsin).
- Ovoz balandligi bir xil bo'lsin (normalize, taxminan −16 LUFS).
- Shovqinsiz xona, telefon mikrofoni yetarli. Mayin, quvnoq, sekinroq gapiring — tinglovchi 3–7 yoshda.
- Fayl nomi aynan jadvaldagidek bo'lsin va `src/assets/audio/uz/` ga qo'yilsin.
- Fayl yo'q bo'lsa ilova jim qoladi (boshqa til ovozi ishlatilmaydi); dev rejimida matn ekranda ko'rinadi.

## Ro'yxat

| Fayl                                 | Matn                                                    | Ohang                                  | Holat |
| ------------------------------------ | ------------------------------------------------------- | -------------------------------------- | ----- |
| **start**                            |                                                         |                                        |       |
| `start.salom.mp3`                    | Salom, bolajon! Kel, birga öynaymiz!                    | quvnoq, iliq                           | 🤖    |
| **home**                             |                                                         |                                        |       |
| `home.tanla.mp3`                     | Yoşingni tanla!                                         | mayin                                  | 🤖    |
| **menu**                             |                                                         |                                        |       |
| `menu.tanla.mp3`                     | Qaysi öyinni öynaymiz?                                  | qiziqtiruvchi                          | 🤖    |
| **soon**                             |                                                         |                                        |       |
| `soon.tez-orada.mp3`                 | Bu yerda tez orada yangi öyinlar böladi!                | sirli, quvnoq                          | 🤖    |
| **praise**                           |                                                         |                                        |       |
| `praise.barakalla.mp3`               | Barakalla!                                              | xursand                                | 🤖    |
| `praise.ofarin.mp3`                  | Ofarin!                                                 | xursand                                | 🤖    |
| `praise.zor.mp3`                     | Zör!                                                    | hayajonli                              | 🤖    |
| `praise.juda-yaxshi.mp3`             | Juda yaxşi!                                             | iliq                                   | 🤖    |
| `praise.qoyil.mp3`                   | Qoyil!                                                  | hayratli                               | 🤖    |
| `praise.topding.mp3`                 | Töğri topding!                                          | xursand                                | 🤖    |
| **encourage**                        |                                                         |                                        |       |
| `encourage.yana.mp3`                 | Yana urinib kör!                                        | mayin, dalda                           | 🤖    |
| `encourage.hechqisi.mp3`             | Heçqisi yöq, yana bir bor!                              | mayin                                  | 🤖    |
| `encourage.uddalaysan.mp3`           | Sen albatta uddalaysan!                                 | ishonch bilan                          | 🤖    |
| `encourage.diqqat.mp3`               | Diqqat bilan qara!                                      | mayin, sekin                           | 🤖    |
| **daraja**                           |                                                         |                                        |       |
| `daraja.tanla.mp3`                   | Qaysi darajani öynaymiz?                                | qiziqtiruvchi                          | 🤖    |
| `daraja.tayyorlanmoqda.mp3`          | Bu daraja hali tayyorlanmoqda. Tez orada!               | mayin                                  | 🤖    |
| `daraja.yopiq.mp3`                   | Bu daraja hali yopiq. Yana yulduzça yiğ, keyin oçiladi! | mayin, dalda                           | 🤖    |
| **hint**                             |                                                         |                                        |       |
| `hint.mana.mp3`                      | Qara, u mana şu yerda!                                  | mayin, sirli                           | 🤖    |
| **finish**                           |                                                         |                                        |       |
| `finish.hammasi.mp3`                 | Hammasini topding! Sen haqiqiy aqlli bolajonsan!        | bayramona                              | 🤖    |
| `finish.yulduz.mp3`                  | Mana senga yulduzça!                                    | sovğa berayotgandek                    | 🤖    |
| **ranglar**                          |                                                         |                                        |       |
| `ranglar.intro.mp3`                  | Qani, ranglarni topamiz!                                | quvnoq                                 | 🤖    |
| `ranglar.top.qizil.mp3`              | Qizil rangni top!                                       | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.sariq.mp3`              | Sariq rangni top!                                       | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.kok.mp3`                | Kök rangni top!                                         | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.yashil.mp3`             | Yaşil rangni top!                                       | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.toq-sariq.mp3`          | Töq sariq rangni top!                                   | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.binafsha.mp3`           | Binafşa rangni top!                                     | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.pushti.mp3`             | Puşti rangni top!                                       | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.jigarrang.mp3`          | Jigarrang rangni top!                                   | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.oq.mp3`                 | Oq rangni top!                                          | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.top.qora.mp3`               | Qora rangni top!                                        | aniq, rang sözini urğu bilan           | 🤖    |
| `ranglar.daraja-ochildi.mp3`         | Yangi daraja oçildi! Yangi ranglar seni kutmoqda!       | bayramona                              | 🤖    |
| **shakllar**                         |                                                         |                                        |       |
| `shakllar.intro.mp3`                 | Qani, şakllarni topamiz!                                | quvnoq                                 | 🤖    |
| `shakllar.top.doira.mp3`             | Doirani top!                                            | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.kvadrat.mp3`           | Kvadratni top!                                          | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.uchburchak.mp3`        | Uçburçakni top!                                         | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.yulduz.mp3`            | Yulduzni top!                                           | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.romb.mp3`              | Rombni top!                                             | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.olti-burchak.mp3`      | Olti burçakni top!                                      | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.togri-tortburchak.mp3` | Töğri törtburçakni top!                                 | aniq, sekinroq, şakl nomini urğu bilan | 🤖    |
| `shakllar.top.oval.mp3`              | Ovalni top!                                             | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.top.yarim-doira.mp3`       | Yarim doirani top!                                      | aniq, şakl nomini urğu bilan           | 🤖    |
| `shakllar.daraja-ochildi.mp3`        | Yangi daraja oçildi! Yangi şakllar seni kutmoqda!       | bayramona                              | 🤖    |
| **hayvonlar**                        |                                                         |                                        |       |
| `hayvonlar.intro.mp3`                | Kel, hayvonlarni topamiz!                               | quvnoq                                 | 🤖    |
| `hayvonlar.tanishuv.mp3`             | Hayvonlar bilan tanişamiz! Birini bos.                  | quvnoq                                 | 🤖    |
| `hayvonlar.daraja-ochildi.mp3`       | Yangi daraja oçildi! Yangi hayvonlar seni kutmoqda!     | bayramona                              | 🤖    |
| **hayvon**                           |                                                         |                                        |       |
| `hayvon.mushuk.nom.mp3`              | Bu — muşuk!                                             | quvnoq                                 | 🤖    |
| `hayvon.mushuk.top.mp3`              | Muşukni top!                                            | qiziqtiruvchi                          | 🤖    |
| `hayvon.mushuk.tafakkur.mp3`         | Muşuk uyimizni siçqonlardan asraydi.                    | iliq                                   | 🤖    |
| `hayvon.it.nom.mp3`                  | Bu — it!                                                | quvnoq                                 | 🤖    |
| `hayvon.it.top.mp3`                  | Itni top!                                               | qiziqtiruvchi                          | 🤖    |
| `hayvon.it.tafakkur.mp3`             | It uyimizni qöriqlaydi.                                 | iliq                                   | 🤖    |
| `hayvon.sigir.nom.mp3`               | Bu — sigir!                                             | quvnoq                                 | 🤖    |
| `hayvon.sigir.top.mp3`               | Sigirni top!                                            | qiziqtiruvchi                          | 🤖    |
| `hayvon.sigir.tafakkur.mp3`          | Sigir bizga sut beradi.                                 | iliq                                   | 🤖    |
| `hayvon.xoroz.nom.mp3`               | Bu — xöroz!                                             | quvnoq                                 | 🤖    |
| `hayvon.xoroz.top.mp3`               | Xörozni top!                                            | qiziqtiruvchi                          | 🤖    |
| `hayvon.xoroz.tafakkur.mp3`          | Xöroz ertalab hammani uyğotadi.                         | iliq                                   | 🤖    |
| `hayvon.qoy.nom.mp3`                 | Bu — qöy!                                               | quvnoq                                 | 🤖    |
| `hayvon.qoy.top.mp3`                 | Qöyni top!                                              | qiziqtiruvchi                          | 🤖    |
| `hayvon.qoy.tafakkur.mp3`            | Qöy bizga jun beradi.                                   | iliq                                   | 🤖    |
| `hayvon.ot.nom.mp3`                  | Bu — ot!                                                | quvnoq                                 | 🤖    |
| `hayvon.ot.top.mp3`                  | Otni top!                                               | qiziqtiruvchi                          | 🤖    |
| `hayvon.ot.tafakkur.mp3`             | Ot tez yuguradi va odamlarga yordam beradi.             | iliq                                   | 🤖    |
| `hayvon.ordak.nom.mp3`               | Bu — ördak!                                             | quvnoq                                 | 🤖    |
| `hayvon.ordak.top.mp3`               | Ördakni top!                                            | qiziqtiruvchi                          | 🤖    |
| `hayvon.ordak.tafakkur.mp3`          | Ördak suvda çiroyli suzadi.                             | iliq                                   | 🤖    |
| `hayvon.qurbaqa.nom.mp3`             | Bu — qurbaqa!                                           | quvnoq                                 | 🤖    |
| `hayvon.qurbaqa.top.mp3`             | Qurbaqani top!                                          | qiziqtiruvchi                          | 🤖    |
| `hayvon.qurbaqa.tafakkur.mp3`        | Qurbaqa paşşalarni tutadi.                              | iliq                                   | 🤖    |
| `hayvon.echki.nom.mp3`               | Bu — eçki!                                              | quvnoq                                 | 🤖    |
| `hayvon.echki.top.mp3`               | Eçkini top!                                             | qiziqtiruvchi                          | 🤖    |
| `hayvon.echki.tafakkur.mp3`          | Eçki bizga sut beradi.                                  | iliq                                   | 🤖    |
| `hayvon.eshak.nom.mp3`               | Bu — eşak!                                              | quvnoq                                 | 🤖    |
| `hayvon.eshak.top.mp3`               | Eşakni top!                                             | qiziqtiruvchi                          | 🤖    |
| `hayvon.eshak.tafakkur.mp3`          | Eşak oğir yuk taşiydi.                                  | iliq                                   | 🤖    |
| `hayvon.tovuq.nom.mp3`               | Bu — tovuq!                                             | quvnoq                                 | 🤖    |
| `hayvon.tovuq.top.mp3`               | Tovuqni top!                                            | qiziqtiruvchi                          | 🤖    |
| `hayvon.tovuq.tafakkur.mp3`          | Tovuq bizga tuxum beradi.                               | iliq                                   | 🤖    |
| `hayvon.asalari.nom.mp3`             | Bu — asalari!                                           | quvnoq                                 | 🤖    |
| `hayvon.asalari.top.mp3`             | Asalarini top!                                          | qiziqtiruvchi                          | 🤖    |
| `hayvon.asalari.tafakkur.mp3`        | Asalari bizga asal beradi.                              | iliq                                   | 🤖    |
| **kattakichik**                      |                                                         |                                        |       |
| `kattakichik.intro.mp3`              | Kel, kattasini va kiçigini topamiz!                     | quvnoq                                 | 🤖    |
| `kattakichik.top.katta.mp3`          | Eng kattasini top!                                      | aniq, "katta" ni urğu bilan            | 🤖    |
| `kattakichik.top.kichik.mp3`         | Eng kiçigini top!                                       | aniq, "kiçik" ni mayin, ingiçka ovozda | 🤖    |
| `kattakichik.togri.katta.mp3`        | Ha, bu eng kattasi!                                     | xursand                                | 🤖    |
| `kattakichik.togri.kichik.mp3`       | Ha, bu eng kiçigi!                                      | xursand, mayin                         | 🤖    |
| `kattakichik.daraja-ochildi.mp3`     | Yangi daraja oçildi! Endi diqqat bilan qara.            | bayramona                              | 🤖    |
| **sanash**                           |                                                         |                                        |       |
| `sanash.intro.mp3`                   | Kel, birga sanaymiz!                                    | quvnoq                                 | 🤖    |
| `sanash.qayerda.bir.mp3`             | Qayerda bitta?                                          | qiziqtiruvchi                          | 🤖    |
| `sanash.qayerda.ikki.mp3`            | Qayerda ikkita?                                         | qiziqtiruvchi                          | 🤖    |
| `sanash.qayerda.uch.mp3`             | Qayerda uçta?                                           | qiziqtiruvchi                          | 🤖    |
| `sanash.qayerda.tort.mp3`            | Qayerda törtta?                                         | qiziqtiruvchi                          | 🤖    |
| `sanash.qayerda.besh.mp3`            | Qayerda beşta?                                          | qiziqtiruvchi                          | 🤖    |
| `sanash.son.bir.mp3`                 | Bir. Bitta!                                             | sekin, har sonni aniq                  | 🤖    |
| `sanash.son.ikki.mp3`                | Bir, ikki. Ikkita!                                      | sekin, har sonni aniq                  | 🤖    |
| `sanash.son.uch.mp3`                 | Bir, ikki, uç. Uçta!                                    | sekin, har sonni aniq                  | 🤖    |
| `sanash.son.tort.mp3`                | Bir, ikki, uç, tört. Törtta!                            | sekin, har sonni aniq                  | 🤖    |
| `sanash.son.besh.mp3`                | Bir, ikki, uç, tört, beş. Beşta!                        | sekin, har sonni aniq                  | 🤖    |
| `sanash.daraja-ochildi.mp3`          | Yangi daraja oçildi! Endi köproq sanaymiz!              | bayramona                              | 🤖    |
| **harflar**                          |                                                         |                                        |       |
| `harflar.intro.mp3`                  | Kel, harflarni topamiz!                                 | quvnoq                                 | 🤖    |
| `harflar.daraja-ochildi.mp3`         | Yangi daraja oçildi! Yangi harflar seni kutmoqda!       | bayramona                              | 🤖    |
| `harflar.top.a.mp3`                  | A harfini top!                                          | aniq, harf nomini urğu bilan           | 🤖    |
| `harflar.soz.a.mp3`                  | A — anor!                                               | quvnoq, söz boşini çözib               | 🤖    |
| `harflar.top.b.mp3`                  | Be harfini top!                                         | aniq, harf nomini urğu bilan           | 🤖    |
| `harflar.soz.b.mp3`                  | Be — baliq!                                             | quvnoq, söz boşini çözib               | 🤖    |
| `harflar.top.d.mp3`                  | De harfini top!                                         | aniq, harf nomini urğu bilan           | 🤖    |
| `harflar.soz.d.mp3`                  | De — daraxt!                                            | quvnoq, söz boşini çözib               | 🤖    |
| `harflar.top.e.mp3`                  | E harfini top!                                          | aniq, harf nomini urğu bilan           | 🤖    |
| `harflar.soz.e.mp3`                  | E — eşik!                                               | quvnoq, söz boşini çözib               | 🤖    |
| `harflar.top.f.mp3`                  | Fe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.f.mp3`                  | Fe — fil!                                               | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.g.mp3`                  | Ge harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.g.mp3`                  | Ge — gul!                                               | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.h.mp3`                  | He harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.h.mp3`                  | He — hovli!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.i.mp3`                  | I harfini top!                                          | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.i.mp3`                  | I — it!                                                 | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.j.mp3`                  | Je harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.j.mp3`                  | Je — jöja!                                              | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.k.mp3`                  | Ke harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.k.mp3`                  | Ke — kitob!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.l.mp3`                  | Le harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.l.mp3`                  | Le — lola!                                              | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.m.mp3`                  | Me harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.m.mp3`                  | Me — muşuk!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.n.mp3`                  | Ne harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.n.mp3`                  | Ne — non!                                               | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.o.mp3`                  | O harfini top!                                          | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.o.mp3`                  | O — olma!                                               | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.p.mp3`                  | Pe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.p.mp3`                  | Pe — paxta!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.q.mp3`                  | Qe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.q.mp3`                  | Qe — quyoş!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.r.mp3`                  | Re harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.r.mp3`                  | Re — rasm!                                              | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.s.mp3`                  | Se harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.s.mp3`                  | Se — sigir!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.t.mp3`                  | Te harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.t.mp3`                  | Te — tovuq!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.u.mp3`                  | U harfini top!                                          | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.u.mp3`                  | U — uy!                                                 | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.v.mp3`                  | Ve harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.v.mp3`                  | Ve — varrak!                                            | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.x.mp3`                  | Xe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.x.mp3`                  | Xe — xöroz!                                             | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.y.mp3`                  | Ye harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.y.mp3`                  | Ye — yulduz!                                            | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.z.mp3`                  | Ze harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.z.mp3`                  | Ze — zinapoya!                                          | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.oo.mp3`                 | Ö harfini top!                                          | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.oo.mp3`                 | Ö — ördak!                                              | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.gg.mp3`                 | Ğe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.gg.mp3`                 | Ğe — ğildirak!                                          | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.sh.mp3`                 | Şe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.sh.mp3`                 | Şe — şar!                                               | quvnoq, söz boşini çözib               | ⬜    |
| `harflar.top.ch.mp3`                 | Çe harfini top!                                         | aniq, harf nomini urğu bilan           | ⬜    |
| `harflar.soz.ch.mp3`                 | Çe — çumoli!                                            | quvnoq, söz boşini çözib               | ⬜    |
| **raqamlar**                         |                                                         |                                        |       |
| `raqamlar.intro.mp3`                 | Kel, raqamlarni topamiz!                                | quvnoq                                 | ⬜    |
| `raqamlar.daraja-ochildi.mp3`        | Yangi daraja oçildi! Endi kattaroq sonlar!              | bayramona                              | ⬜    |
| `raqamlar.top.n1.mp3`                | Bir raqamini top!                                       | aniq                                   | ⬜    |
| `raqamlar.bu.n1.mp3`                 | Ha, bu — bir!                                           | xursand                                | ⬜    |
| `raqamlar.top.n2.mp3`                | Ikki raqamini top!                                      | aniq                                   | ⬜    |
| `raqamlar.bu.n2.mp3`                 | Ha, bu — ikki!                                          | xursand                                | ⬜    |
| `raqamlar.top.n3.mp3`                | Uç raqamini top!                                        | aniq                                   | ⬜    |
| `raqamlar.bu.n3.mp3`                 | Ha, bu — uç!                                            | xursand                                | ⬜    |
| `raqamlar.top.n4.mp3`                | Tört raqamini top!                                      | aniq                                   | ⬜    |
| `raqamlar.bu.n4.mp3`                 | Ha, bu — tört!                                          | xursand                                | ⬜    |
| `raqamlar.top.n5.mp3`                | Beş raqamini top!                                       | aniq                                   | ⬜    |
| `raqamlar.bu.n5.mp3`                 | Ha, bu — beş!                                           | xursand                                | ⬜    |
| `raqamlar.top.n6.mp3`                | Olti raqamini top!                                      | aniq                                   | ⬜    |
| `raqamlar.bu.n6.mp3`                 | Ha, bu — olti!                                          | xursand                                | ⬜    |
| `raqamlar.top.n7.mp3`                | Yetti raqamini top!                                     | aniq                                   | ⬜    |
| `raqamlar.bu.n7.mp3`                 | Ha, bu — yetti!                                         | xursand                                | ⬜    |
| `raqamlar.top.n8.mp3`                | Sakkiz raqamini top!                                    | aniq                                   | ⬜    |
| `raqamlar.bu.n8.mp3`                 | Ha, bu — sakkiz!                                        | xursand                                | ⬜    |
| `raqamlar.top.n9.mp3`                | Toqqiz raqamini top!                                    | aniq                                   | ⬜    |
| `raqamlar.bu.n9.mp3`                 | Ha, bu — toqqiz!                                        | xursand                                | ⬜    |
| `raqamlar.top.n10.mp3`               | Ön raqamini top!                                        | aniq                                   | ⬜    |
| `raqamlar.bu.n10.mp3`                | Ha, bu — ön!                                            | xursand                                | ⬜    |
| **juft**                             |                                                         |                                        |       |
| `juft.intro.mp3`                     | Bir xil ikkita rasmni top!                              | qiziqtiruvçi                           | ⬜    |
| `juft.topding.mp3`                   | Juftini topding!                                        | xursand                                | ⬜    |
| `juft.daraja-ochildi.mp3`            | Yangi daraja oçildi! Endi kartalar köproq!              | bayramona                              | ⬜    |
| **qator**                            |                                                         |                                        |       |
| `qator.intro.mp3`                    | Qatorga qara! Keyingisi qaysi?                          | qiziqtiruvçi                           | ⬜    |
| `qator.keyingisi.mp3`                | Keyingisi qaysi?                                        | qiziqtiruvçi                           | ⬜    |
| `qator.togri.mp3`                    | Ha, qator davom etdi!                                   | xursand                                | ⬜    |
| `qator.daraja-ochildi.mp3`           | Yangi daraja oçildi! Endi qatorlar uzunroq!             | bayramona                              | ⬜    |
| **tafakkur**                         |                                                         |                                        |       |
| `tafakkur.olma.mp3`                  | Qara, olma qanday çiroyli qizil!                        | hayratli                               | 🤖    |
| `tafakkur.qulupnay.mp3`              | Qulupnay qizil va şirin!                                | iliq                                   | 🤖    |
| `tafakkur.quyosh.mp3`                | Quyoş sariq, u bizni isitadi!                           | iliq                                   | 🤖    |
| `tafakkur.banan.mp3`                 | Qara, banan qanday sariq!                               | hayratli                               | 🤖    |
| `tafakkur.baliq.mp3`                 | Kök baliqça suvda suzadi!                               | mayin                                  | 🤖    |
| `tafakkur.shar.mp3`                  | Kök şar yengil va dumaloq!                              | quvnoq                                 | 🤖    |
| `tafakkur.barg.mp3`                  | Yaşil barg — daraxtning kiyimi!                         | mayin                                  | 🤖    |
| `tafakkur.qurbaqa.mp3`               | Yaşil qurbaqa sakraydi: vaq-vaq!                        | öyinqaroq                              | 🤖    |
| `tafakkur.apelsin.mp3`               | Apelsin töq sariq va şirali!                            | iliq                                   | 🤖    |
| `tafakkur.sabzi.mp3`                 | Sabzi töq sariq, uni quyonça yaxşi köradi!              | quvnoq                                 | 🤖    |
| `tafakkur.uzum.mp3`                  | Qara, uzum qanday binafşa!                              | hayratli                               | 🤖    |
| `tafakkur.baqlajon.mp3`              | Baqlajon binafşa rangda!                                | iliq                                   | 🤖    |
| `tafakkur.gul.mp3`                   | Puşti gul qanday çiroyli!                               | hayratli                               | 🤖    |
| `tafakkur.muzqaymoq.mp3`             | Puşti muzqaymoq — sovuq va mazali!                      | quvnoq                                 | 🤖    |
| `tafakkur.ayiqcha.mp3`               | Jigarrang ayiqça — yumşoq döstimiz!                     | mayin                                  | 🤖    |
| `tafakkur.qoziqorin.mp3`             | Qöziqorinning qalpoqçasi jigarrang!                     | qiziqtiruvchi                          | 🤖    |
| `tafakkur.qorodam.mp3`               | Qor odam oppoq! Uni qişda yasaymiz.                     | quvnoq                                 | 🤖    |
| `tafakkur.bulut.mp3`                 | Oppoq bulut osmonda suzadi!                             | mayin                                  | 🤖    |
| `tafakkur.qarga.mp3`                 | Qarğa qop-qora: qag-qag!                                | öyinqaroq                              | 🤖    |
| `tafakkur.mushuk.mp3`                | Qora muşukça: miyov!                                    | öyinqaroq                              | 🤖    |
| `tafakkur.gildirak.mp3`              | Ğildirak dumaloq — şuning uçun aylanadi!                | qiziqtiruvchi                          | 🤖    |
| `tafakkur.soat.mp3`                  | Soat ham doira: millari aylanib yuradi!                 | mayin                                  | 🤖    |
| `tafakkur.sovga.mp3`                 | Sovğa qutisi kvadrat — hamma tomoni teng!               | quvnoq                                 | 🤖    |
| `tafakkur.deraza.mp3`                | Kvadrat derazadan quyoş nuri kiradi!                    | iliq                                   | 🤖    |
| `tafakkur.tog.mp3`                   | Toğ uçburçak — tepasi ötkir!                            | hayratli                               | 🤖    |
| `tafakkur.chodir.mp3`                | Çodir uçburçak — içida issiq va şinam!                  | iliq                                   | 🤖    |
| `tafakkur.dengiz-yulduzi.mp3`        | Dengiz yulduzining beşta uçi bor!                       | qiziqtiruvchi                          | 🤖    |
| `tafakkur.pechenye.mp3`              | Yulduzça peçenye — mazali va çiroyli!                   | quvnoq                                 | 🤖    |
| `tafakkur.varrak.mp3`                | Varrak şamolda baland uçadi!                            | quvnoq                                 | 🤖    |
| `tafakkur.pahlava.mp3`               | Pahlava romb şaklida — şirin va mazali!                 | iliq                                   | 🤖    |
| `tafakkur.asal-katagi.mp3`           | Asalarilar asal katagini olti burçak qilib quradi!      | hayratli                               | 🤖    |
| `tafakkur.qalam.mp3`                 | Qalamning orqasiga qara — olti burçak!                  | qiziqtiruvchi                          | 🤖    |
| `tafakkur.eshik.mp3`                 | Eşik töğri törtburçak — baland va uzun!                 | qiziqtiruvchi                          | 🤖    |
| `tafakkur.kitob.mp3`                 | Kitob içida qiziq hikoyalar bor!                        | iliq                                   | 🤖    |
| `tafakkur.tuxum.mp3`                 | Tuxum oval — çözinçoq doiraga öxşaydi!                  | qiziqtiruvchi                          | 🤖    |
| `tafakkur.qovun.mp3`                 | Qovun oval va şirin!                                    | quvnoq                                 | 🤖    |
| `tafakkur.kamalak.mp3`               | Kamalak yarim doira — rang-barang va çiroyli!           | hayratli                               | 🤖    |
| `tafakkur.soyabon.mp3`               | Soyabon yarim doira — bizni yomğirdan asraydi!          | mayin                                  | 🤖    |
| `tafakkur.tarvuz.mp3`                | Tarvuz bölagi yarim doira — qizil va şirali!            | quvnoq                                 | 🤖    |
