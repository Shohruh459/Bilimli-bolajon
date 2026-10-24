#!/usr/bin/env python3
"""phrases.ts iboralari uchun VAQTINCHALIK sun'iy ovoz (VoiceStudio/OmniVoice) MP3 lari.

Tartib (docs/TTS.md):
  1) bash scripts/start_voice.sh                # backend (port 3900)
  2) npm run tts:reja                            # .tts-work/reja.json (qaysi iboralar)
  3) python3 scripts/gen-tts.py [--limit N] [--out DIR]
  4) npm run ovozlar                             # docs/OVOZLAR.md holati

Qoidalar:
  - Qo'lda yozilgan fayllar (manifestda yo'q) reja bosqichida chiqarib tashlanadi — ustidan yozilmaydi.
    Bu skript ham yozishdan oldin yana tekshiradi.
  - Diniy matn yaratilmaydi (reja + shu yerda ikkinchi tekshiruv).
  - Seed tools/tts/voice.json dagi qiymat (42) — ovoz har safar bir xil chiqsin.
  - --out berilsa (namuna/sinov), fayllar o'sha papkaga yoziladi, manifest O'ZGARMAYDI.
Chiqish: src/assets/audio/uz/<kalit>.mp3 — mono 44.1 kHz 64 kbps, boshi/oxiridagi jimlik qirqilgan,
−16 LUFS. Manifest: src/assets/audio/uz/tts.json.
"""
import argparse, datetime, json, pathlib, re, subprocess, sys, tempfile

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import tts_vs  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = ROOT / "src/assets/audio/uz"
MANIFEST = AUDIO / "tts.json"
PLAN = ROOT / ".tts-work/reja.json"
ARABIC = re.compile(r"[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]")


def to_mp3(wav: pathlib.Path, out: pathlib.Path) -> None:
    flt = ",".join([
        # boshidagi va oxiridagi jimlik (javob tez eshitilsin), 50 ms zaxira
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05",
        "areverse",
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05",
        "areverse",
        "loudnorm=I=-16:TP=-1.5:LRA=11",
    ])
    subprocess.run([tts_vs.ffmpeg_exe(), "-v", "error", "-y", "-i", str(wav), "-af", flt,
                    "-ac", "1", "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "64k",
                    "-map_metadata", "-1", str(out)], check=True)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--limit", type=int, default=0, help="faqat birinchi N ta (sinov)")
    p.add_argument("--out", help="namuna papkasi: manifest o'zgarmaydi")
    a = p.parse_args()

    if not PLAN.exists():
        sys.exit("XATO: avval reja: npm run tts:reja")
    items = json.loads(PLAN.read_text(encoding="utf-8"))
    if a.limit:
        items = items[: a.limit]
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    seed, speed = tts_vs.CFG["seed"], tts_vs.CFG["speed"]
    if seed != manifest["seed"]:
        sys.exit(f"XATO: voice.json seed ({seed}) manifestdagidan ({manifest['seed']}) farq qiladi — seed o'zgartirilmaydi.")
    out_dir = pathlib.Path(a.out) if a.out else AUDIO
    out_dir.mkdir(parents=True, exist_ok=True)

    tts_vs.check_backend()
    pid = tts_vs.ensure_profile()
    tmp = pathlib.Path(tempfile.mkdtemp())
    for i, it in enumerate(items, 1):
        key, say = it["key"], it["say"]
        if key.startswith("diniy.") or ARABIC.search(say):
            print(f"[{i}/{len(items)}] ✋ diniy — o'tkazildi: {key}")
            continue
        target = out_dir / f"{key}.mp3"
        if not a.out and target.exists() and key not in manifest["files"]:
            print(f"[{i}/{len(items)}] ✋ qo'lda yozilgan — tegilmadi: {key}")
            continue
        wav = tmp / f"{key}.wav"
        wav.write_bytes(tts_vs.synth_line(pid, say, seed, speed))
        to_mp3(wav, target)
        print(f"[{i}/{len(items)}] OK {key}: {say}")
        if not a.out:
            manifest["files"][key] = {"text": it["text"], "say": say,
                                      "date": datetime.date.today().isoformat()}
            # Har fayldan keyin saqlaymiz — uzilsa, qayta ishga tushirish shu joydan davom etadi.
            manifest["files"] = dict(sorted(manifest["files"].items()))
            MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("TAYYOR:", out_dir)


if __name__ == "__main__":
    main()
