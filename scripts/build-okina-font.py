"""
Nunito'da U+02BB (ʻ) glifi juda keng (advance 500) — "Ko ʻ k" bo'lib ko'rinadi.
Bu skript kichik qo'shimcha shrift yasaydi: U+02BB → quoteleft, U+02BC → quoteright glifi.
Matn o'zgarmaydi (hali ham U+02BB), faqat ko'rinish tabiiy bo'ladi.

Ishga tushirish:  pip install fonttools brotli && python3 scripts/build-okina-font.py
Manba: src/assets/fonts/nunito-latin-wght-normal.woff2 (OFL, Reserved Font Name yo'q).
"""
from fontTools import subset
from fontTools.ttLib import TTFont

SRC = "src/assets/fonts/nunito-latin-wght-normal.woff2"
OUT = "src/assets/fonts/nunito-okina-wght-normal.woff2"

font = TTFont(SRC)
opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = []
opts.name_IDs = ["*"]
opts.notdef_outline = False
sub = subset.Subsetter(opts)
sub.populate(unicodes=[0x2018, 0x2019])
sub.subset(font)

for table in font["cmap"].tables:
    if table.isUnicode():
        table.cmap[0x02BB] = "quoteleft"
        table.cmap[0x02BC] = "quoteright"

font.flavor = "woff2"
font.save(OUT)
print("✓", OUT)
