"""
Yangi o'zbek alifbosi (2026, O'RQ-1184): Ğ ğ Ş ş — Nunito "latin" to'plamida yo'q (Ö ö Ç ç bor).
Bu skript Nunito "latin-ext" to'plamidan faqat shu 4 harfni ajratib, kichik qo'shimcha shrift yasaydi.

Ishga tushirish:
  npm pack @fontsource-variable/nunito@5.3.0 && tar xzf fontsource-variable-nunito-5.3.0.tgz
  python3 scripts/build-yangi-harflar-font.py package/files/nunito-latin-ext-wght-normal.woff2
Manba: @fontsource-variable/nunito (SIL OFL 1.1, Reserved Font Name yo'q) — src/assets/fonts/Nunito-OFL.txt.
"""
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

SRC = sys.argv[1]
OUT = "src/assets/fonts/nunito-yangi-harflar-wght-normal.woff2"
LETTERS = [0x011E, 0x011F, 0x015E, 0x015F]  # Ğ ğ Ş ş

font = TTFont(SRC)
missing = [hex(u) for u in LETTERS if u not in font.getBestCmap()]
if missing:
    sys.exit(f"XATO: manba shriftda yo'q: {missing}")
opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["kern", "mark", "mkmk"]
opts.name_IDs = ["*"]
opts.notdef_outline = False
sub = subset.Subsetter(opts)
sub.populate(unicodes=LETTERS)
sub.subset(font)
font.flavor = "woff2"
font.save(OUT)
print("✓", OUT)
