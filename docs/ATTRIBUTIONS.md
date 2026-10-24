# Uchinchi tomon manbalari va litsenziyalar

## Vaqtinchalik sun'iy ovoz (TTS)

`src/assets/audio/uz/` dagi fayllardan **`src/assets/audio/uz/tts.json` manifestida
ro'yxatlanganlari sun'iy ovoz** (TTS) bilan yaratilgan. Qolgan fayllar — qo'lda yozilgan.

| Nima       | Qiymat                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Model      | **OmniVoice** — `k2-fsa/OmniVoice` (Hugging Face), muallif: k2-fsa                                        |
| Litsenziya | **CC BY-NC** (model og'irliklari) — faqat notijoriy; audio tokenizer: Boson Higgs Audio community license |
| Vosita     | VoiceStudio — `github.com/debpalash/voicestudio` (AGPL-3.0), faqat lokal ishlatiladi, ilovaga kirmaydi    |
| Ovoz       | `ASOSIY-ayol-past` — sun'iy yaratilgan namuna (`tools/tts/voice_ref/`), haqiqiy shaxs emas                |
| Sozlamalar | til `uz`, seed 42, speed 1.0 (`tools/tts/voice.json`)                                                     |
| Fayllar    | har biri manifestda: ekran matni, TTS matni, yaratilgan sana                                              |
| Holati     | **Vaqtinchalik** — diktor yozuvlari tayyor bo'lgach almashtiriladi                                        |

Model kartasi: https://huggingface.co/k2-fsa/OmniVoice (reviziya `c5fdb5c`): kod Apache-2.0,
og'irliklar CC-BY-NC (versiyasi ko'rsatilmagan). Mualliflar: Han Zhu va hammualliflar.
Audio tokenizer — alohida litsenziya (`audio_tokenizer/LICENSE`, Boson AI Higgs Audio 2 + Meta Llama 3);
uning 1.b.i bandi talab qilgan yozuv (o'zgartirilmagan holda):

> Built with Higgs Materials licensed from Boson AI USA, Inc., Copyright Boson AI USA, Inc., All Rights Reserved and Meta Llama 3 licensed under the Meta Llama 3 Community License, Copyright Meta Platforms, Inc., All Right Reserved

Notice (1.b.iii):

> Meta Llama 3 is licensed under the Meta Llama 3 Community License, Copyright © Meta Platforms, Inc. All Rights Reserved.
> Boson Higgs Audio 2 is licensed under the Boson Community License, Copyright © Boson AI USA, Inc. All Rights Reserved.

Model kartasi (2026-10-24 da o'qildi): _"Our code is released under the Apache 2.0 License. The
pre-trained model is licensed under the CC-BY-NC due to constraints from its training data
(e.g., Emilia)."_ Karta ruxsatsiz ovoz klonlash va boshqa shaxs ovozini taqlid qilishni taqiqlaydi —
bizning namuna ovoz sun'iy.

Shartlar: Boson AI Higgs Audio 2 litsenziyasi va Meta Llama 3 Community License
(https://www.llama.com/llama3/license/). Manba: VoiceStudio `docs/model-credits.md`.

Ilova ichida ham oshkor qilinadi: Sozlamalar (ota-ona) → "Sunʼiy ovoz: N ta", model mualliflari va yuqoridagi yozuv.
Tafsilot va qoidalar: [docs/TTS.md](TTS.md).
