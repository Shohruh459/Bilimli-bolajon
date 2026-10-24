#!/usr/bin/env bash
# VoiceStudio backendini ishga tushiradi (har sessiyada to'xtaydi). Ishlatish: bash scripts/start_voice.sh
# Birinchi marta o'rnatish (klon + torch + model): docs/TTS.md. Kerakli domenlar: *.hf.co, download-r2.pytorch.org
# Manba: shohruh459/Video_montaj (scripts/start_voice.sh).
set -euo pipefail
VS="${VOICESTUDIO_DIR:-/home/user/debpalash/voicestudio}"
if curl -s -m 3 http://localhost:3900/health | grep -q '"ok"'; then echo "Backend ishlayapti."; exit 0; fi
if [ ! -d "$VS" ]; then
  echo "VoiceStudio klon yo'q: $VS"; echo "Qadamlar: docs/TTS.md (GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/debpalash/voicestudio $VS && cd $VS && node scripts/setup-api.mjs)"; exit 1
fi
cd "$VS"
OMNIVOICE_ANALYTICS_DISABLED=1 setsid nohup bun scripts/dev-backend.mjs > /tmp/voicestudio_api.log 2>&1 < /dev/null & disown
for i in $(seq 1 60); do sleep 4; curl -s -m 3 http://localhost:3900/health | grep -q '"ok"' && { echo "Backend tayyor."; exit 0; }; done
echo "XATO: backend 4 daqiqada ishga tushmadi. Log: /tmp/voicestudio_api.log"; exit 1
