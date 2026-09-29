/**
 * "Shakllarni topish" predmetlari — o'zimiz chizgan SVG'lar (viewBox 0 0 120 120).
 * Qoida: har predmetning SILUETI o'z shaklini aniq bildiradi va boshqa shaklga o'xshamaydi.
 * Predmetlar tabiiy ranglarida — bola rangga emas, shaklga qarab tanlaydi.
 * O'yin chunk'ida turadi: bosh sahifa bundle'ini og'irlashtirmaydi.
 */
const NAVY = '#1E2A47';
const CORAL = '#FF6B6B';

const svg = (body: string) => `<svg viewBox="0 0 120 120">${body}</svg>`;
const shine = (cx: number, cy: number, rot: number, opacity = 0.4) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="7" ry="13" fill="#fff" opacity="${opacity}" transform="rotate(${rot} ${cx} ${cy})"/>`;
const eye = (x: number, y: number, r = 4.5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${NAVY}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff"/>`;

/** Yumaloq uchli yulduz yo'li (5 uchli). */
function starPath(cx: number, cy: number, outer: number, inner: number): string {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join('L')}Z`;
}

/** Yurak yo'li (120 masshtabda), `dy` — vertikal siljish. */
const HEART =
  'M60 104C28 84 10 64 10 42 10 25 23 14 38 14c9 0 17 5 22 13 5-8 13-13 22-13 15 0 28 11 28 28 0 22-18 42-50 62z';

/** Yarim doira (tekis tomoni pastda), markaz (cx, base), radius r. */
const halfDisc = (cx: number, base: number, r: number) =>
  `M${cx - r} ${base}A${r} ${r} 0 0 1 ${cx + r} ${base}Z`;
const arc = (cx: number, base: number, r: number) =>
  `M${cx - r} ${base}A${r} ${r} 0 0 1 ${cx + r} ${base}`;

export const SHAPE_ART = {
  // --- Doira ---
  gildirak: svg(
    `<circle cx="60" cy="60" r="50" fill="#37474F"/>
     <circle cx="60" cy="60" r="42" fill="none" stroke="#263238" stroke-width="4" stroke-dasharray="7 7"/>
     <circle cx="60" cy="60" r="31" fill="#CFD8DC"/>
     <path d="M60 32v56M32 60h56M40 40l40 40M80 40L40 80" stroke="#90A4AE" stroke-width="5" stroke-linecap="round"/>
     <circle cx="60" cy="60" r="10" fill="#546E7A"/><circle cx="60" cy="60" r="4" fill="#CFD8DC"/>`,
  ),
  soat: svg(
    `<circle cx="60" cy="60" r="50" fill="${CORAL}"/>
     <circle cx="60" cy="60" r="40" fill="#fff"/>
     <g fill="${NAVY}">${Array.from({ length: 12 }, (_, i) => {
       const a = (Math.PI / 6) * i;
       const big = i % 3 === 0;
       return `<circle cx="${(60 + 32 * Math.sin(a)).toFixed(1)}" cy="${(60 - 32 * Math.cos(a)).toFixed(1)}" r="${big ? 3.5 : 2}"/>`;
     }).join('')}</g>
     <path d="M60 60V34M60 60l16 9" stroke="${NAVY}" stroke-width="5" stroke-linecap="round"/>
     <circle cx="60" cy="60" r="5" fill="${CORAL}"/>`,
  ),

  // --- Kvadrat (eni = bo'yi) ---
  sovga: svg(
    `<rect x="16" y="20" width="88" height="88" rx="6" fill="#4FB0E8"/>
     <rect x="16" y="20" width="88" height="88" rx="6" fill="none" stroke="#2D8CC4" stroke-width="4"/>
     <rect x="54" y="20" width="12" height="88" fill="#FFD23F"/>
     <rect x="16" y="58" width="88" height="12" fill="#FFD23F"/>
     <path d="M60 20c-8-12-24-14-22-4 1 6 12 6 22 4zM60 20c8-12 24-14 22-4-1 6-12 6-22 4z" fill="#FFD23F" stroke="#E0AD00" stroke-width="2.5" stroke-linejoin="round"/>
     <circle cx="60" cy="20" r="4" fill="#E0AD00"/>`,
  ),
  deraza: svg(
    `<rect x="14" y="14" width="92" height="92" rx="6" fill="#8D6E63"/>
     <rect x="24" y="24" width="72" height="72" fill="#BBDEFB"/>
     <path d="M60 24v72M24 60h72" stroke="#8D6E63" stroke-width="8"/>
     <path d="M32 44l10-10M68 80l10-10" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>`,
  ),

  // --- Uchburchak ---
  tog: svg(
    `<path d="M60 10L114 108H6z" fill="#78909C" stroke="#78909C" stroke-width="4" stroke-linejoin="round"/>
     <path d="M60 10L114 108H84z" fill="#607D8B" stroke="#607D8B" stroke-width="4" stroke-linejoin="round"/>
     <path d="M60 10L79 44l-9-5-10 9-10-9-9 5z" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`,
  ),
  chodir: svg(
    `<path d="M60 12L112 106H8z" fill="#FF7043" stroke="#FF7043" stroke-width="4" stroke-linejoin="round"/>
     <path d="M60 12L112 106H86z" fill="#F4511E" stroke="#F4511E" stroke-width="4" stroke-linejoin="round"/>
     <path d="M60 52L80 106H40z" fill="#5D4037"/>
     <path d="M60 52v54" stroke="#FFAB91" stroke-width="3"/>
     <path d="M4 108h112" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>`,
  ),

  // --- Yulduz ---
  dengizYulduzi: svg(
    `<path d="${starPath(60, 64, 54, 23)}" fill="#FF8A65" stroke="#FF8A65" stroke-width="10" stroke-linejoin="round"/>
     <g fill="#FFCCBC">${[
       [60, 28],
       [92, 52],
       [80, 90],
       [40, 90],
       [28, 52],
     ]
       .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5"/>`)
       .join('')}</g>
     ${eye(52, 60)}${eye(68, 60)}
     <path d="M53 72q7 6 14 0" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ),
  pechenye: svg(
    `<path d="${starPath(60, 64, 54, 24)}" fill="#E0A96D" stroke="#C68642" stroke-width="6" stroke-linejoin="round"/>
     <path d="${starPath(60, 64, 40, 18)}" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" opacity=".8"/>
     <g>${[
       [60, 44, '#EC407A'],
       [76, 62, '#4FB0E8'],
       [68, 80, '#FFD23F'],
       [50, 80, '#6BCB77'],
       [44, 62, '#EC407A'],
     ]
       .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}"/>`)
       .join('')}</g>`,
  ),

  // --- Yurak ---
  yurakShar: svg(
    `<path d="M60 104c-5 5 5 9 0 14" stroke="#5A6583" stroke-width="3" fill="none" stroke-linecap="round"/>
     <g transform="translate(6 2) scale(0.9)"><path d="${HEART}" fill="#E53935"/></g>
     <path d="M54 96h12l-6 7z" fill="#C62828"/>
     ${shine(36, 36, -35)}`,
  ),
  yostiq: svg(
    `<path d="${HEART}" fill="#AB47BC"/>
     <g transform="translate(12 11) scale(0.8)"><path d="${HEART}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="6 6" opacity=".8"/></g>
     <circle cx="60" cy="56" r="6" fill="#8E24AA"/>`,
  ),

  // --- To'g'ri to'rtburchak (aniq cho'ziq: bo'yi/eni >= 1.7) ---
  eshik: svg(
    `<rect x="32" y="6" width="56" height="108" rx="4" fill="#8D6E63"/>
     <rect x="40" y="14" width="40" height="38" rx="3" fill="#A1887F"/>
     <rect x="40" y="60" width="40" height="46" rx="3" fill="#A1887F"/>
     <circle cx="78" cy="58" r="5" fill="#FFD23F"/>`,
  ),
  kitob: svg(
    `<rect x="8" y="30" width="104" height="60" rx="5" fill="#43A047"/>
     <rect x="8" y="30" width="14" height="60" rx="4" fill="#2E7D32"/>
     <rect x="38" y="44" width="58" height="16" rx="3" fill="#fff"/>
     <path d="M44 52h46" stroke="#2E7D32" stroke-width="3" stroke-linecap="round"/>
     <path d="M38 74h58" stroke="#A5D6A7" stroke-width="4" stroke-linecap="round"/>`,
  ),

  // --- Oval ---
  tuxum: svg(
    `<ellipse cx="60" cy="62" rx="36" ry="50" fill="#FFF3E0" stroke="${NAVY}" stroke-width="4"/>
     <path d="M78 34q12 20 8 42" stroke="#FFE0B2" stroke-width="7" fill="none" stroke-linecap="round"/>
     ${shine(46, 40, 20, 0.9)}`,
  ),
  qovun: svg(
    `<ellipse cx="60" cy="62" rx="54" ry="36" fill="#F9D65C"/>
     <g stroke="#C9A227" stroke-width="2.5" fill="none" opacity=".6">
       <path d="M24 38q36 28 72 0M16 56q44 24 88 0M16 72q44 22 88 0M26 90q34 16 68 0"/>
       <path d="M40 30q-10 32 0 64M60 26v72M80 30q10 32 0 64"/>
     </g>
     <path d="M112 58q8-4 6-12" stroke="#6D8B3A" stroke-width="5" fill="none" stroke-linecap="round"/>
     ${shine(34, 48, -60)}`,
  ),

  // --- Yarim doira (tekis tomoni pastda) ---
  kamalak: svg(
    `${[
      ['#E53935', 52],
      ['#FB8C00', 44],
      ['#FFD23F', 36],
      ['#43A047', 28],
      ['#1E88E5', 20],
    ]
      .map(
        ([c, r]) =>
          `<path d="${arc(60, 96, Number(r))}" stroke="${c}" stroke-width="8.5" fill="none"/>`,
      )
      .join('')}
     <path d="M4 96h112" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round"/>`,
  ),
  soyabon: svg(
    `<path d="M60 76v28c0 9-14 9-14 0" stroke="${NAVY}" stroke-width="5" fill="none" stroke-linecap="round"/>
     <path d="${halfDisc(60, 76, 52)}" fill="#EC407A"/>
     <path d="M60 24L34 76M60 24v52M60 24l26 52" stroke="#C2185B" stroke-width="3"/>
     <path d="M8 76h104" stroke="#C2185B" stroke-width="4" stroke-linecap="round"/>
     <path d="M60 24v-8" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>`,
  ),
  tarvuz: svg(
    `<path d="${halfDisc(60, 92, 54)}" fill="#43A047"/>
     <path d="${halfDisc(60, 92, 47)}" fill="#C5E1A5"/>
     <path d="${halfDisc(60, 92, 42)}" fill="#EF5350"/>
     <g fill="${NAVY}">${[
       [42, 70],
       [60, 60],
       [78, 70],
       [50, 82],
       [70, 82],
     ]
       .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.5" ry="4"/>`)
       .join('')}</g>`,
  ),
} as const;

export type ShapeArtId = keyof typeof SHAPE_ART;
