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

Ilova ichida ham oshkor qilinadi: Sozlamalar (ota-ona) → "Sunʼiy ovoz: N ta" va model muallifi.
Tafsilot va qoidalar: [docs/TTS.md](TTS.md).
