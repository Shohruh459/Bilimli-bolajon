#!/usr/bin/env python3
"""Vaqtinchalik sun'iy ovoz (VoiceStudio/OmniVoice, tools/tts/voice.json) bilan o'zbekcha TTS mijozi.
Manba: shohruh459/Video_montaj (scripts/tts_vs.py) — yo'llar shu repoga moslangan.

CLI:  python3 scripts/tts_vs.py matn.txt out.wav [--seed N] [--speed 0.9] [--pause 0.5]
      Matn faylidagi har QATOR alohida generatsiya qilinadi, qatorlar orasiga --pause soniya jim.
Modul: scripts/gen-tts.py dan import qilinadi (check_backend, ensure_profile, synth_line).
Backend ishlamasa: bash scripts/start_voice.sh
LITSENZIYA: OmniVoice CC-BY-NC — faqat notijoriy. Diniy matn bu skript bilan YARATILMAYDI."""
import argparse, json, pathlib, subprocess, sys, tempfile, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
TTS_DIR = ROOT / "tools/tts"
CFG = json.loads((TTS_DIR / "voice.json").read_text(encoding="utf-8"))
BASE = CFG["api"].rsplit("/v1", 1)[0]


def ffmpeg_exe():
    """Tizimdagi ffmpeg, bo'lmasa imageio-ffmpeg (pip install imageio-ffmpeg)."""
    import shutil
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("XATO: ffmpeg topilmadi. O'rnating: pip install imageio-ffmpeg")


def check_backend():
    try:
        urllib.request.urlopen(BASE + "/health", timeout=5)
    except Exception:
        sys.exit("XATO: VoiceStudio backend ishlamayapti (http://localhost:3900). Ishga tushiring: bash scripts/start_voice.sh")


def ensure_profile():
    """Backendda asosiy ovoz profili bo'lmasa, namunadan yaratadi; profil ID sini qaytaradi."""
    for pr in json.loads(urllib.request.urlopen(BASE + "/profiles", timeout=30).read()):
        if pr["name"] == CFG["profile_name"]:
            return pr["id"]
    ref = TTS_DIR / CFG["ref_audio"]
    text = (TTS_DIR / CFG["ref_text_file"]).read_text(encoding="utf-8").strip()
    out = subprocess.run(["curl", "-sS", "--fail-with-body", "-X", "POST", BASE + "/profiles",
                          "-F", f"name={CFG['profile_name']}", "-F", f"ref_audio=@{ref}",
                          "-F", f"ref_text={text}", "-F", "language=Uzbek", "-F", "kind=clone"],
                         capture_output=True, text=True, check=True).stdout
    return json.loads(out)["id"]


def synth_line(profile_id, line, seed, speed):
    body = {k: CFG[k] for k in ("model", "language", "response_format")}
    body.update(voice=profile_id, input=line, seed=seed, speed=speed)
    req = urllib.request.Request(CFG["api"], json.dumps(body).encode(), {"Content-Type": "application/json"})
    return urllib.request.urlopen(req, timeout=900).read()


def concat_with_pauses(parts, pause, out):
    ff = ffmpeg_exe()
    tmp = pathlib.Path(tempfile.mkdtemp())
    sil = tmp / "sil.wav"
    subprocess.run([ff, "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", f"{pause:.3f}", str(sil)], check=True)
    entries = []
    for i, p in enumerate(parts):
        entries.append(pathlib.Path(p))
        if i < len(parts) - 1:
            entries.append(sil)
    lst = tmp / "list.txt"
    lst.write_text("".join(f"file '{e}'\n" for e in entries))
    subprocess.run([ff, "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c:a", "pcm_s16le", "-ar", "24000", "-ac", "1", str(out)], check=True)


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("text_file"); p.add_argument("out")
    p.add_argument("--seed", type=int, default=CFG["seed"])
    p.add_argument("--speed", type=float, default=CFG["speed"])
    p.add_argument("--pause", type=float, default=0.4)
    a = p.parse_args()
    lines = [l.strip() for l in pathlib.Path(a.text_file).read_text(encoding="utf-8").splitlines() if l.strip()]
    check_backend()
    pid = ensure_profile()
    tmp = pathlib.Path(tempfile.mkdtemp()); parts = []
    for i, line in enumerate(lines):
        f = tmp / f"p{i:02d}.wav"; f.write_bytes(synth_line(pid, line, a.seed, a.speed)); parts.append(f)
        print(f"[{i+1}/{len(lines)}] OK: {line[:50]}")
    concat_with_pauses(parts, a.pause, a.out)
    print("TAYYOR:", a.out)
