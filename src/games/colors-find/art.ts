/**
 * "Ranglarni topish" predmetlari — o'zimiz chizgan SVG'lar (viewBox 0 0 120 120).
 * O'yin chunk'ida turadi: bosh sahifa bundle'ini og'irlashtirmaydi.
 * Oq predmetlar to'q konturli, qora predmetlar yorug' detallar bilan — oq kartada ham,
 * krem fonda ham aniq ko'rinadi. Ranglar content/colors.ts dagi hex bilan bir xil.
 */
import { ART } from '../../ui/art';

const RED = '#E53935';
const YELLOW = '#FFD23F';
const YELLOW_DEEP = '#E0AD00';
const BLUE = '#1E88E5';
const BLUE_DEEP = '#1565C0';
const GREEN = '#43A047';
const GREEN_DEEP = '#2E7D32';
const ORANGE = '#FB8C00';
const ORANGE_DEEP = '#E65100';
const PURPLE = '#8E24AA';
const PURPLE_DEEP = '#6A1B9A';
const PINK = '#EC407A';
const PINK_DEEP = '#C2185B';
const BROWN = '#795548';
const BROWN_DEEP = '#4E342E';
const BROWN_LIGHT = '#A1887F';
const WHITE = '#FFFFFF';
const WHITE_SHADE = '#DCE6F2';
const BLACK = '#212121';
const BLACK_HI = '#484848';
const NAVY = '#1E2A47';
const CORAL = '#FF6B6B';
const STEM = '#6D4C41';

const svg = (body: string) => `<svg viewBox="0 0 120 120">${body}</svg>`;
const shine = (cx: number, cy: number, rot: number, color = '#fff', opacity = 0.4) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="7" ry="13" fill="${color}" opacity="${opacity}" transform="rotate(${rot} ${cx} ${cy})"/>`;
const eye = (x: number, y: number, r = 5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${NAVY}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff"/>`;

export const ITEM_ART = {
  // --- 1-daraja ---
  olma: ART.olma,
  qulupnay: svg(
    `<path d="M60 110C36 94 16 72 18 50c1-14 13-21 26-19 7 1 11 4 16 4s9-3 16-4c13-2 25 5 26 19 2 22-18 44-42 60z" fill="${RED}"/>
     <g fill="${YELLOW}">${[
       [40, 52],
       [60, 50],
       [80, 52],
       [48, 70],
       [72, 70],
       [60, 86],
       [36, 68],
       [84, 68],
     ]
       .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4"/>`)
       .join('')}</g>
     <path d="M36 34l12 4 12-14 12 14 12-4-8 12H44z" fill="${GREEN}"/>
     <path d="M60 24v-10" stroke="${GREEN_DEEP}" stroke-width="5" stroke-linecap="round"/>`,
  ),
  quyosh: ART.maskot,
  banan: svg(
    `<path d="M20 36c4 44 40 68 82 54 5-2 4-8-1-8-32 4-58-14-66-48-1-6-16-5-15 2z" fill="${YELLOW}" stroke="${YELLOW_DEEP}" stroke-width="4" stroke-linejoin="round"/>
     <path d="M34 42c6 22 24 36 50 40" stroke="${YELLOW_DEEP}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
     <path d="M20 36l-4-10 10-2 4 8z" fill="${STEM}"/><circle cx="101" cy="86" r="4" fill="${STEM}"/>`,
  ),
  baliq: svg(
    `<path d="M84 60l26-20v40z" fill="${BLUE_DEEP}"/>
     <ellipse cx="54" cy="60" rx="40" ry="28" fill="${BLUE}"/>
     <path d="M50 34q12-14 24 0z" fill="${BLUE_DEEP}"/>
     <circle cx="32" cy="54" r="8" fill="#fff"/><circle cx="31" cy="54" r="4" fill="${NAVY}"/>
     <path d="M48 48q10 12 0 24" stroke="#fff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>
     <path d="M20 68q6 4 12 0" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ),
  shar: svg(
    `<path d="M60 92c-6 8 6 14 0 24" stroke="#5A6583" stroke-width="3" fill="none" stroke-linecap="round"/>
     <ellipse cx="60" cy="48" rx="34" ry="40" fill="${BLUE}"/>
     <path d="M53 86h14l-7 8z" fill="${BLUE_DEEP}"/>${shine(45, 32, 25)}`,
  ),
  barg: svg(
    `<path d="M18 102C18 50 50 16 106 14c0 58-32 90-88 88z" fill="${GREEN}"/>
     <path d="M20 100C46 76 68 52 94 28" stroke="${GREEN_DEEP}" stroke-width="5" fill="none" stroke-linecap="round"/>
     <path d="M44 76l-4-20M58 62l-2-22M72 48v-16M52 70l20 2M66 56l20 2" stroke="${GREEN_DEEP}" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>`,
  ),
  qurbaqa: svg(
    `<ellipse cx="60" cy="100" rx="36" ry="7" fill="${GREEN_DEEP}" opacity=".3"/>
     <ellipse cx="60" cy="72" rx="44" ry="32" fill="${GREEN}"/>
     <circle cx="37" cy="42" r="17" fill="${GREEN}"/><circle cx="83" cy="42" r="17" fill="${GREEN}"/>
     <circle cx="37" cy="42" r="10" fill="#fff"/><circle cx="83" cy="42" r="10" fill="#fff"/>
     <circle cx="38" cy="43" r="5.5" fill="${NAVY}"/><circle cx="84" cy="43" r="5.5" fill="${NAVY}"/>
     <circle cx="30" cy="74" r="6" fill="${CORAL}" opacity=".5"/><circle cx="90" cy="74" r="6" fill="${CORAL}" opacity=".5"/>
     <path d="M40 74q20 18 40 0" stroke="${NAVY}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  ),

  // --- 2-daraja: to'q sariq, binafsha ---
  apelsin: svg(
    `<circle cx="60" cy="66" r="42" fill="${ORANGE}"/>
     <g fill="${ORANGE_DEEP}" opacity=".35">${[
       [44, 80],
       [58, 92],
       [76, 84],
       [84, 64],
       [70, 70],
       [50, 64],
       [40, 96],
       [88, 94],
     ]
       .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`)
       .join('')}</g>
     <path d="M60 28c1-8 6-13 12-15" stroke="${STEM}" stroke-width="5" stroke-linecap="round" fill="none"/>
     <path d="M63 27c10-12 26-13 33-7-6 11-22 15-33 7z" fill="${GREEN}"/>${shine(40, 52, 25)}`,
  ),
  sabzi: svg(
    `<g transform="translate(62 62) rotate(-35)">
       <path d="M-20-28q20-12 40 0L4 50q-4 7-8 0z" fill="${ORANGE}"/>
       <path d="M-12-6h10M4 10h9M-8 24h8M2 36h6" stroke="${ORANGE_DEEP}" stroke-width="4" stroke-linecap="round"/>
       <path d="M-2-32c-6-14-4-24 2-30 4 10 4 20 2 30zM2-32c6-12 16-18 24-16-4 10-14 16-22 18zM-4-32c-10-6-16-16-14-24 8 2 14 12 16 22z" fill="${GREEN}"/>
     </g>`,
  ),
  uzum: svg(
    `<path d="M60 26c0-8 4-14 10-18" stroke="${STEM}" stroke-width="5" stroke-linecap="round" fill="none"/>
     <path d="M62 24c8-10 24-12 32-4-8 10-22 12-32 4z" fill="${GREEN}"/>
     <g fill="${PURPLE}">${[
       [36, 42],
       [60, 38],
       [84, 42],
       [48, 62],
       [72, 62],
       [36, 82],
       [60, 82],
       [84, 82],
       [48, 100],
       [72, 100],
     ]
       .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13"/>`)
       .join('')}</g>
     <g fill="#fff" opacity=".45">${[
       [32, 37],
       [56, 33],
       [80, 37],
       [44, 57],
       [68, 57],
       [32, 77],
       [56, 77],
       [80, 77],
       [44, 95],
       [68, 95],
     ]
       .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5"/>`)
       .join('')}</g>`,
  ),
  baqlajon: svg(
    `<path d="M72 30c18 6 26 24 20 44-6 24-26 40-48 38-16-2-24-16-18-30 6-14 22-20 28-32 5-10 6-24 18-20z" fill="${PURPLE}"/>
     <path d="M58 36c6-10 18-14 28-8 6 4 8 10 6 16-6-4-12-4-18 0-4-6-10-8-16-8z" fill="${GREEN}"/>
     <path d="M78 28c2-8 6-14 12-17" stroke="${GREEN_DEEP}" stroke-width="6" stroke-linecap="round" fill="none"/>
     <path d="M40 92c-6-4-8-12-4-18" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".4"/>
     <path d="M62 50c10 2 18 10 20 20" stroke="${PURPLE_DEEP}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".5"/>`,
  ),

  // --- 3-daraja: pushti, jigarrang, oq, qora ---
  gul: svg(
    `<path d="M60 64v48" stroke="${GREEN}" stroke-width="7" stroke-linecap="round"/>
     <path d="M60 96c-10-12-26-12-34-6 8 10 24 12 34 6zM60 86c10-12 26-12 34-6-8 10-24 12-34 6z" fill="${GREEN}"/>
     <g transform="translate(60 44)" fill="${PINK}">${[0, 72, 144, 216, 288]
       .map((a) => `<ellipse cx="0" cy="-19" rx="14" ry="20" transform="rotate(${a})"/>`)
       .join('')}</g>
     <circle cx="60" cy="44" r="12" fill="${YELLOW}"/>
     <circle cx="56" cy="40" r="3" fill="#fff" opacity=".6"/>`,
  ),
  muzqaymoq: svg(
    `<path d="M36 60h48L62 114q-2 4-4 0z" fill="#F5C77E"/>
     <path d="M44 66l24 26M60 64l14 16M40 72l10 10M76 66L52 94M62 64L46 80M82 70l-12 14" stroke="#D39A4A" stroke-width="3" stroke-linecap="round"/>
     <circle cx="60" cy="44" r="30" fill="${PINK}"/>
     <g fill="${PINK}"><circle cx="38" cy="62" r="7"/><circle cx="52" cy="66" r="7"/><circle cx="67" cy="66" r="7"/><circle cx="81" cy="62" r="7"/></g>
     <circle cx="60" cy="14" r="7" fill="${RED}"/>
     <path d="M60 8c2-6 6-8 10-8" stroke="${STEM}" stroke-width="3" fill="none" stroke-linecap="round"/>
     ${shine(46, 32, 30)}
     <path d="M48 52q4 4 8 0" stroke="${PINK_DEEP}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>`,
  ),
  ayiqcha: svg(
    `<circle cx="30" cy="34" r="17" fill="${BROWN}"/><circle cx="90" cy="34" r="17" fill="${BROWN}"/>
     <circle cx="30" cy="34" r="8" fill="${BROWN_LIGHT}"/><circle cx="90" cy="34" r="8" fill="${BROWN_LIGHT}"/>
     <circle cx="60" cy="66" r="42" fill="${BROWN}"/>
     <ellipse cx="60" cy="82" rx="21" ry="16" fill="#D7B899"/>
     <ellipse cx="60" cy="75" rx="8" ry="5.5" fill="${NAVY}"/>
     <path d="M60 80v6M52 88q8 6 16 0" stroke="${NAVY}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
     ${eye(44, 58)}${eye(76, 58)}
     <circle cx="32" cy="76" r="6" fill="${CORAL}" opacity=".45"/><circle cx="88" cy="76" r="6" fill="${CORAL}" opacity=".45"/>`,
  ),
  qoziqorin: svg(
    `<path d="M44 66h32l4 34c0 7-9 12-20 12s-20-5-20-12z" fill="#F3E5D0" stroke="#C9B08F" stroke-width="3"/>
     <path d="M12 68C12 38 34 16 60 16s48 22 48 52c0 5-4 7-8 7H20c-4 0-8-2-8-7z" fill="${BROWN}"/>
     <g fill="${BROWN_LIGHT}"><ellipse cx="40" cy="44" rx="8" ry="6"/><ellipse cx="74" cy="34" rx="7" ry="5"/><ellipse cx="86" cy="58" rx="6" ry="5"/><ellipse cx="56" cy="60" rx="5" ry="4"/></g>
     <path d="M26 52q10-26 34-30" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".3"/>
     <path d="M20 75h80" stroke="${BROWN_DEEP}" stroke-width="3" stroke-linecap="round" opacity=".5"/>`,
  ),
  qorodam: svg(
    `<ellipse cx="60" cy="112" rx="34" ry="5" fill="${WHITE_SHADE}"/>
     <circle cx="60" cy="82" r="29" fill="${WHITE}" stroke="${NAVY}" stroke-width="4"/>
     <path d="M76 62a26 26 0 0 1-2 42" stroke="${WHITE_SHADE}" stroke-width="7" fill="none" stroke-linecap="round"/>
     <circle cx="60" cy="38" r="21" fill="${WHITE}" stroke="${NAVY}" stroke-width="4"/>
     <path d="M71 25a17 17 0 0 1 0 24" stroke="${WHITE_SHADE}" stroke-width="5" fill="none" stroke-linecap="round"/>
     <circle cx="52" cy="34" r="3.5" fill="${NAVY}"/><circle cx="68" cy="34" r="3.5" fill="${NAVY}"/>
     <path d="M60 40l14 4-14 4z" fill="${ORANGE}"/>
     <path d="M52 50q8 5 16 0" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>
     <circle cx="60" cy="72" r="3.5" fill="${NAVY}"/><circle cx="60" cy="86" r="3.5" fill="${NAVY}"/>`,
  ),
  bulut: svg(
    `<path d="M32 92c-13 0-22-9-22-20s9-19 21-19c2-16 15-27 31-27 13 0 24 7 28 18 1 0 3-1 5-1 13 0 23 10 23 24s-10 25-23 25z" fill="${WHITE}" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/>
     <path d="M26 82q16 6 34 4" stroke="${WHITE_SHADE}" stroke-width="6" fill="none" stroke-linecap="round"/>
     ${eye(48, 64, 4.5)}${eye(76, 64, 4.5)}
     <circle cx="38" cy="74" r="6" fill="${CORAL}" opacity=".45"/><circle cx="86" cy="74" r="6" fill="${CORAL}" opacity=".45"/>
     <path d="M54 74q8 7 16 0" stroke="${NAVY}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  ),
  qarga: svg(
    `<path d="M50 92l-3 18M66 92l3 18" stroke="#757575" stroke-width="4" stroke-linecap="round"/>
     <path d="M30 64L6 52l6 26z" fill="${BLACK}"/>
     <ellipse cx="56" cy="70" rx="34" ry="25" fill="${BLACK}"/>
     <circle cx="86" cy="46" r="19" fill="${BLACK}"/>
     <path d="M102 40l17 7-17 7z" fill="#616161"/>
     <path d="M38 64c10-6 26-6 36 4-10 10-28 10-36-4z" fill="${BLACK_HI}"/>
     <circle cx="90" cy="42" r="6" fill="#fff"/><circle cx="91" cy="42" r="3" fill="${BLACK}"/>
     <path d="M74 34q8-6 16-2" stroke="${BLACK_HI}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ),
  mushuk: svg(
    `<path d="M24 50L28 10l30 24zM96 50L92 10 62 34z" fill="${BLACK}"/>
     <path d="M32 38l2-18 14 11zM88 38l-2-18-14 11z" fill="${BLACK_HI}"/>
     <ellipse cx="60" cy="66" rx="42" ry="38" fill="${BLACK}"/>
     <ellipse cx="43" cy="60" rx="9" ry="11" fill="#C5E1A5"/><ellipse cx="77" cy="60" rx="9" ry="11" fill="#C5E1A5"/>
     <ellipse cx="43" cy="61" rx="3" ry="8" fill="${BLACK}"/><ellipse cx="77" cy="61" rx="3" ry="8" fill="${BLACK}"/>
     <circle cx="46" cy="56" r="2.5" fill="#fff"/><circle cx="80" cy="56" r="2.5" fill="#fff"/>
     <path d="M55 76h10l-5 6z" fill="#F48FB1"/>
     <path d="M60 82q-5 6-10 2M60 82q5 6 10 2" stroke="#9E9E9E" stroke-width="3" fill="none" stroke-linecap="round"/>
     <path d="M36 78l-24-4M36 84l-24 4M84 78l24-4M84 84l24 4" stroke="#BDBDBD" stroke-width="2.5" stroke-linecap="round"/>
     <path d="M36 44q10-12 24-12" stroke="${BLACK_HI}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  ),
} as const;

export type ItemArtId = keyof typeof ITEM_ART;
