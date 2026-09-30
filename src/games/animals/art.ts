/**
 * "Hayvon ovozlari" — o'zimiz chizgan hayvonlar (viewBox 0 0 120 120).
 * Qoida: siluet hayvonni aniq bildiradi; o'xshash juftlar (xo'roz/tovuq, qo'y/echki, ot/eshak)
 * ko'rinishdan ham farq qiladi. Oq hayvonlar to'q konturli — oq kartada ko'rinadi.
 * O'yin chunk'ida turadi: bosh sahifa bundle'ini og'irlashtirmaydi.
 */
const NAVY = '#1E2A47';
const CORAL = '#FF6B6B';
const PINK = '#F8A5B5';

const svg = (body: string) => `<svg viewBox="0 0 120 120">${body}</svg>`;
const eye = (x: number, y: number, r = 3.6) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${NAVY}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff"/>`;
const leg = (x: number, y: number, h: number, fill: string, hoof = '#4E342E', w = 9) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}"/><rect x="${x}" y="${y + h - 6}" width="${w}" height="6" rx="2" fill="${hoof}"/>`;
const outline = `stroke="${NAVY}" stroke-width="3" stroke-linejoin="round"`;

export const ANIMAL_ART = {
  // --- 1-daraja ---
  mushuk: svg(
    `<path d="M86 96c18 0 24-16 16-26" stroke="#E08A2E" stroke-width="9" fill="none" stroke-linecap="round"/>
     <path d="M36 112c-6-22 2-50 24-50s30 28 24 50z" fill="#F4A340"/>
     <path d="M48 112c-2-14 4-28 12-28s14 14 12 28z" fill="#FFE0B2"/>
     <path d="M30 40L32 12l20 16zM90 40L88 12 68 28z" fill="#F4A340"/>
     <path d="M34 34l2-14 10 8zM86 34l-2-14-10 8z" fill="${PINK}"/>
     <ellipse cx="60" cy="44" rx="32" ry="27" fill="#F4A340"/>
     <path d="M52 20l3 10M60 18v11M68 20l-3 10" stroke="#E08A2E" stroke-width="4" stroke-linecap="round"/>
     ${eye(48, 42, 4.5)}${eye(72, 42, 4.5)}
     <path d="M56 52h8l-4 5z" fill="${CORAL}"/>
     <path d="M60 57q-4 5-9 2M60 57q4 5 9 2" stroke="${NAVY}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
     <path d="M40 54l-18-3M40 59l-18 3M80 54l18-3M80 59l18 3" stroke="#8D6E63" stroke-width="2" stroke-linecap="round"/>`,
  ),
  it: svg(
    `<path d="M92 88c14-4 18-18 14-26" stroke="#A86B32" stroke-width="8" fill="none" stroke-linecap="round"/>
     <path d="M34 112c-4-26 6-48 28-48s30 24 26 48z" fill="#C68642"/>
     <path d="M50 112c-2-12 4-24 12-24s12 12 10 24z" fill="#F3D9B5"/>
     <rect x="42" y="64" width="40" height="7" rx="3.5" fill="${CORAL}"/><circle cx="62" cy="74" r="4" fill="#FFD23F"/>
     <ellipse cx="62" cy="40" rx="28" ry="25" fill="#C68642"/>
     <path d="M36 26c-12 4-14 26-6 34 6-6 8-20 6-34zM88 26c12 4 14 26 6 34-6-6-8-20-6-34z" fill="#7B4A21"/>
     <ellipse cx="62" cy="52" rx="15" ry="11" fill="#F3D9B5"/>
     <ellipse cx="62" cy="46" rx="6" ry="4.5" fill="${NAVY}"/>
     ${eye(51, 34, 4)}${eye(73, 34, 4)}
     <path d="M62 50v5M55 57q7 5 14 0" stroke="${NAVY}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
     <path d="M62 58q0 9 5 9t5-9z" fill="${CORAL}"/>`,
  ),
  sigir: svg(
    `<path d="M20 52c-10 6-12 20-10 30" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>
     <path d="M7 80l6 8 4-9z" fill="${NAVY}"/>
     ${leg(24, 78, 30, '#fff', NAVY)}${leg(38, 78, 30, '#fff', NAVY)}${leg(66, 78, 30, '#fff', NAVY)}${leg(80, 78, 30, '#fff', NAVY)}
     <g ${outline}><path d="M24 78h9v30h-9zM38 78h9v30h-9zM66 78h9v30h-9zM80 78h9v30h-9z" fill="none"/></g>
     <rect x="16" y="44" width="80" height="42" rx="18" fill="#fff" ${outline}/>
     <path d="M30 46c8 2 12 10 6 16s-16 2-16-6c0-4 4-10 10-10zM62 60c10-2 16 6 12 14s-14 6-16 0 0-12 4-14zM78 46c4 4 10 4 12 0" fill="${NAVY}"/>
     <ellipse cx="58" cy="88" rx="9" ry="5" fill="${PINK}" stroke="${NAVY}" stroke-width="2"/>
     <path d="M88 28q-8-8-6-16M108 28q8-8 6-16" stroke="#D7CCC8" stroke-width="5" fill="none" stroke-linecap="round"/>
     <ellipse cx="80" cy="36" rx="8" ry="5" fill="#fff" ${outline} transform="rotate(-25 80 36)"/>
     <rect x="84" y="24" width="30" height="36" rx="13" fill="#fff" ${outline}/>
     <ellipse cx="99" cy="56" rx="15" ry="10" fill="${PINK}" stroke="${NAVY}" stroke-width="3"/>
     <circle cx="94" cy="56" r="2.2" fill="${NAVY}"/><circle cx="104" cy="56" r="2.2" fill="${NAVY}"/>
     ${eye(92, 38)}${eye(106, 38)}`,
  ),
  xoroz: svg(
    `<path d="M40 60C18 58 8 34 16 18c10 8 14 22 16 30C30 30 34 16 44 12c2 14 0 30-2 40" fill="#2E7D32"/>
     <path d="M34 64C14 66 6 48 10 34c10 8 18 18 22 26" fill="#1E88E5"/>
     <path d="M38 62C24 72 14 66 12 58c10 0 18 0 24-2" fill="#FB8C00"/>
     <path d="M50 96v16M66 96v16M44 112h12M60 112h12" stroke="#F9A825" stroke-width="4" stroke-linecap="round"/>
     <ellipse cx="58" cy="72" rx="28" ry="26" fill="#C62828"/>
     <path d="M44 70q14 20 32 4" stroke="#8E1B1B" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>
     <path d="M72 58q6-26 16-30 10 4 10 18-4 16-18 16z" fill="#D84315"/>
     <path d="M76 26q2-12 8-8 2-8 8-4 4-6 8 0 4 4-2 12z" fill="#E53935"/>
     <path d="M96 38l12 4-12 5z" fill="#FFB300"/>
     <path d="M92 48q4 10-2 14-4-6 2-14z" fill="#E53935"/>
     ${eye(90, 36)}`,
  ),

  // --- 2-daraja ---
  qoy: svg(
    `${leg(34, 84, 24, '#37474F', '#212121')}${leg(48, 84, 24, '#37474F', '#212121')}${leg(66, 84, 24, '#37474F', '#212121')}${leg(78, 84, 24, '#37474F', '#212121')}
     <g fill="#fff" ${outline}>${[
       [34, 62],
       [48, 52],
       [64, 52],
       [78, 60],
       [80, 76],
       [64, 84],
       [46, 84],
       [30, 76],
     ]
       .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14"/>`)
       .join('')}</g>
     <ellipse cx="56" cy="68" rx="30" ry="20" fill="#fff"/>
     <ellipse cx="96" cy="58" rx="7" ry="4.5" fill="#37474F" transform="rotate(20 96 58)"/>
     <ellipse cx="100" cy="66" rx="13" ry="16" fill="#37474F"/>
     <circle cx="98" cy="50" r="9" fill="#fff" ${outline}/>
     ${eye(96, 64)}${eye(106, 64)}
     <path d="M100 76q3 3 6 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  ),
  ot: svg(
    `<path d="M20 50c-12 8-14 30-8 44" stroke="#4E342E" stroke-width="9" fill="none" stroke-linecap="round"/>
     ${leg(24, 70, 40, '#A1673F')}${leg(36, 70, 40, '#A1673F')}${leg(70, 70, 40, '#A1673F')}${leg(82, 70, 40, '#A1673F')}
     <rect x="18" y="42" width="76" height="36" rx="18" fill="#A1673F"/>
     <path d="M76 52L86 20l16 4-8 34z" fill="#A1673F"/>
     <path d="M84 24L76 52l-6-4 8-28z" fill="#4E342E"/>
     <path d="M88 16l2-12 8 10z" fill="#A1673F"/>
     <path d="M86 20q16-6 26 10 4 8-4 12-10 2-18-6z" fill="#A1673F"/>
     <ellipse cx="108" cy="36" rx="6" ry="5" fill="#8D5431"/>
     <circle cx="110" cy="35" r="1.6" fill="${NAVY}"/>
     ${eye(96, 24, 3.2)}`,
  ),
  ordak: svg(
    `<path d="M4 108q14-8 28 0t28 0 28 0 28 0" stroke="#4FB0E8" stroke-width="5" fill="none" stroke-linecap="round"/>
     <path d="M18 70c0-18 18-26 40-22 10-24 44-24 44 0 0 10-8 16-14 20 8 12 4 34-26 36-28 2-44-14-44-34z" fill="#fff" ${outline}/>
     <path d="M26 64l-10-8 4 14z" fill="#fff" ${outline}/>
     <path d="M40 72q14 14 32 2" stroke="#CFD8DC" stroke-width="5" fill="none" stroke-linecap="round"/>
     <path d="M98 40q16 0 18 6-4 6-18 4z" fill="#FB8C00" stroke="#E65100" stroke-width="2" stroke-linejoin="round"/>
     ${eye(88, 34)}`,
  ),
  qurbaqa: svg(
    `<ellipse cx="60" cy="106" rx="42" ry="6" fill="#2E7D32" opacity=".3"/>
     <path d="M14 104q4-18 22-16M106 104q-4-18-22-16" stroke="#43A047" stroke-width="12" fill="none" stroke-linecap="round"/>
     <ellipse cx="60" cy="76" rx="40" ry="28" fill="#43A047"/>
     <ellipse cx="60" cy="86" rx="24" ry="14" fill="#C5E1A5"/>
     <circle cx="38" cy="48" r="15" fill="#43A047"/><circle cx="82" cy="48" r="15" fill="#43A047"/>
     <circle cx="38" cy="48" r="9" fill="#fff"/><circle cx="82" cy="48" r="9" fill="#fff"/>
     <circle cx="39" cy="49" r="5" fill="${NAVY}"/><circle cx="83" cy="49" r="5" fill="${NAVY}"/>
     <path d="M42 70q18 12 36 0" stroke="${NAVY}" stroke-width="4" fill="none" stroke-linecap="round"/>
     <circle cx="30" cy="70" r="5" fill="${CORAL}" opacity=".45"/><circle cx="90" cy="70" r="5" fill="${CORAL}" opacity=".45"/>`,
  ),

  // --- 3-daraja ---
  echki: svg(
    `<path d="M20 50l-8-8" stroke="#BCAAA4" stroke-width="6" stroke-linecap="round"/>
     ${leg(26, 72, 36, '#EFE6D8', '#5D4037', 8)}${leg(38, 72, 36, '#EFE6D8', '#5D4037', 8)}${leg(68, 72, 36, '#EFE6D8', '#5D4037', 8)}${leg(80, 72, 36, '#EFE6D8', '#5D4037', 8)}
     <g ${outline} fill="none"><path d="M26 72h8v36h-8zM38 72h8v36h-8zM68 72h8v36h-8zM80 72h8v36h-8z"/></g>
     <rect x="18" y="44" width="74" height="34" rx="16" fill="#EFE6D8" ${outline}/>
     <path d="M80 50l6-20 14 0 2 24z" fill="#EFE6D8"/>
     <path d="M88 18q-10-10-2-16M96 18q2-14 12-12" stroke="#8D6E63" stroke-width="5" fill="none" stroke-linecap="round"/>
     <ellipse cx="82" cy="28" rx="9" ry="4" fill="#EFE6D8" ${outline} transform="rotate(20 82 28)"/>
     <path d="M86 20q16-2 22 16 2 10-8 12-12 0-16-10z" fill="#EFE6D8" ${outline}/>
     <path d="M100 48q2 14-4 18-4-10 0-18z" fill="#BCAAA4" stroke="${NAVY}" stroke-width="2"/>
     <circle cx="106" cy="40" r="1.8" fill="${NAVY}"/>
     ${eye(96, 30, 3.2)}`,
  ),
  eshak: svg(
    `<path d="M20 52c-8 6-10 22-8 36" stroke="#78909C" stroke-width="4" fill="none" stroke-linecap="round"/>
     <path d="M9 86l4 10 5-9z" fill="#37474F"/>
     ${leg(26, 72, 34, '#90A4AE', '#37474F')}${leg(38, 72, 34, '#90A4AE', '#37474F')}${leg(68, 72, 34, '#90A4AE', '#37474F')}${leg(80, 72, 34, '#90A4AE', '#37474F')}
     <rect x="18" y="46" width="76" height="34" rx="17" fill="#90A4AE"/>
     <ellipse cx="56" cy="74" rx="26" ry="8" fill="#CFD8DC"/>
     <path d="M78 54l8-26 14 2-4 30z" fill="#90A4AE"/>
     <path d="M84 30l-4-26 9 4 3 22zM94 30l2-26 8 6-4 22z" fill="#90A4AE"/>
     <path d="M85 26l-3-18 5 3 2 15zM95 26l2-17 4 4-3 13z" fill="#CFD8DC"/>
     <path d="M86 28L78 54" stroke="#37474F" stroke-width="5" stroke-linecap="round"/>
     <path d="M90 28q16-4 22 12 2 10-8 12-12 0-16-10z" fill="#90A4AE"/>
     <ellipse cx="106" cy="44" rx="8" ry="6" fill="#CFD8DC"/>
     <circle cx="108" cy="43" r="1.6" fill="${NAVY}"/>
     ${eye(97, 34, 3.2)}`,
  ),
  tovuq: svg(
    `<ellipse cx="102" cy="104" rx="10" ry="12" fill="#FFF3E0" stroke="${NAVY}" stroke-width="3"/>
     <path d="M44 94v14M58 94v14M38 108h12M52 108h12" stroke="#F9A825" stroke-width="4" stroke-linecap="round"/>
     <path d="M26 66q-10-14 0-24 6 10 10 16" fill="#A1673F"/>
     <ellipse cx="52" cy="72" rx="28" ry="24" fill="#D7A86E"/>
     <path d="M36 72q14 16 30 2" stroke="#A1673F" stroke-width="4" fill="none" stroke-linecap="round"/>
     <circle cx="74" cy="48" r="15" fill="#D7A86E"/>
     <path d="M70 34q2-6 6-4 4-4 6 2z" fill="#E53935"/>
     <path d="M88 46l10 4-10 4z" fill="#FFB300"/>
     <path d="M84 56q3 6-1 8-3-4 1-8z" fill="#E53935"/>
     ${eye(78, 45)}`,
  ),
  asalari: svg(
    `<ellipse cx="46" cy="36" rx="18" ry="26" fill="#E3F2FD" stroke="#90CAF9" stroke-width="3" transform="rotate(-25 46 36)"/>
     <ellipse cx="72" cy="34" rx="16" ry="24" fill="#E3F2FD" stroke="#90CAF9" stroke-width="3" transform="rotate(20 72 34)"/>
     <path d="M16 76l-10 4 10 4z" fill="${NAVY}"/>
     <ellipse cx="54" cy="76" rx="40" ry="28" fill="#FFD23F"/>
     <path d="M40 50q-8 26 0 52M58 48q-8 28 0 56M76 52q-6 24 0 48" stroke="${NAVY}" stroke-width="9" fill="none"/>
     <circle cx="94" cy="70" r="18" fill="#FFD23F"/>
     <path d="M96 54q2-14 12-16M104 58q8-10 16-8" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>
     ${eye(92, 68, 3.8)}${eye(104, 68, 3.8)}
     <path d="M92 78q6 5 12 0" stroke="${NAVY}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
     <circle cx="88" cy="76" r="3.5" fill="${CORAL}" opacity=".5"/>`,
  ),
} as const;

export type AnimalArtId = keyof typeof ANIMAL_ART;
