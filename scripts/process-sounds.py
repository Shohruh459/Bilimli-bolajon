"""
Hayvon ovozlarini qayta ishlaydi: qirqish (1–3 s), jimlikni olib tashlash, ovoz balandligini
tenglashtirish (EBU R128, −16 LUFS, cho'qqi −1.5 dB), qisqa fade, MP3 mono 64 kbps 44.1 kHz.

Kirish:  sounds/animals.json  →  items: [{ id, raw, start, duration, source, author, license }]
         xom fayllar: sounds/raw/<raw>  (repoga kirmaydi — .gitignore)
Chiqish: src/assets/sounds/animals/<id>.mp3

Ishga tushirish:
  pip install imageio-ffmpeg
  python3 scripts/process-sounds.py            # hammasi
  python3 scripts/process-sounds.py sigir it   # tanlanganlari

Faqat CC0-1.0 yoki Public domain — boshqa litsenziya bo'lsa skript to'xtaydi.
ATTRIBUTIONS.md ga qator qo'shishni unutmang (unit test tekshiradi).
"""
import json
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "sounds" / "animals.json"
RAW = ROOT / "sounds" / "raw"
OUT = ROOT / "src" / "assets" / "sounds" / "animals"
ALLOWED = {"CC0-1.0", "Public domain"}
MIN_S, MAX_S = 1.0, 3.0


def process(item: dict) -> Path:
    lic = item.get("license")
    if lic not in ALLOWED:
        sys.exit(f"✗ {item['id']}: litsenziya '{lic}' ruxsat etilmagan (faqat {sorted(ALLOWED)})")
    dur = float(item["duration"])
    if not MIN_S <= dur <= MAX_S:
        sys.exit(f"✗ {item['id']}: davomiylik {dur}s — 1–3 s bo'lishi kerak")
    src = RAW / item["raw"]
    if not src.exists():
        sys.exit(f"✗ {item['id']}: xom fayl yo'q: {src}")
    out = OUT / f"{item['id']}.mp3"
    fade_out = min(0.15, dur / 4)
    filters = ",".join(
        [
            f"atrim=start={float(item.get('start', 0))}:duration={dur}",
            "asetpts=PTS-STARTPTS",
            "silenceremove=start_periods=1:start_threshold=-45dB",
            "loudnorm=I=-16:TP=-1.5:LRA=11",
            "afade=t=in:d=0.01",
            f"areverse,afade=t=in:d={fade_out},areverse",
        ]
    )
    cmd = [
        imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(src), "-af", filters,
        "-ac", "1", "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "64k",
        "-map_metadata", "-1", str(out),
    ]
    subprocess.run(cmd, check=True)
    return out


def main() -> None:
    items = json.loads(MANIFEST.read_text())["items"]
    only = set(sys.argv[1:])
    OUT.mkdir(parents=True, exist_ok=True)
    for item in items:
        if only and item["id"] not in only:
            continue
        out = process(item)
        print(f"✓ {out.relative_to(ROOT)}  {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
