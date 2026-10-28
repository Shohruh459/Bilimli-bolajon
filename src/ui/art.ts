/**
 * O'zimiz chizgan umumiy rasmlar (maskot, kartalar). viewBox 0 0 120 120.
 * O'yinga xos rasmlar o'yin papkasida (masalan games/colors-find/art.ts) — lazy chunk bilan keladi.
 */
const RED = '#E53935';
const YELLOW = '#FFD23F';
const GREEN = '#43A047';
const GREEN_DEEP = '#2E7D32';
const NAVY = '#1E2A47';
const CORAL = '#FF6B6B';

const svg = (body: string) => `<svg viewBox="0 0 120 120">${body}</svg>`;
const shine = (cx: number, cy: number, rot: number) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="7" ry="13" fill="#fff" opacity=".4" transform="rotate(${rot} ${cx} ${cy})"/>`;

const sunBody = (face: boolean) => {
  const rays = Array.from(
    { length: 8 },
    (_, i) => `<rect x="-6" y="-54" width="12" height="20" rx="6" transform="rotate(${i * 45})"/>`,
  ).join('');
  const f = face
    ? `<circle cx="-11" cy="-5" r="4.5" fill="${NAVY}"/><circle cx="11" cy="-5" r="4.5" fill="${NAVY}"/>
       <circle cx="-9.5" cy="-6.5" r="1.5" fill="#fff"/><circle cx="12.5" cy="-6.5" r="1.5" fill="#fff"/>
       <circle cx="-20" cy="7" r="5" fill="${CORAL}" opacity=".55"/><circle cx="20" cy="7" r="5" fill="${CORAL}" opacity=".55"/>
       <path d="M-12 7q12 12 24 0" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>`
    : '';
  return `<g transform="translate(60 60)"><g fill="${YELLOW}">${rays}<circle r="32"/></g>${f}</g>`;
};

export const ART = {
  olma: svg(
    `<path d="M60 36c-8-6-30-10-40 8-10 18-2 46 14 58 8 6 16 6 26 2 10 4 18 4 26-2 16-12 24-40 14-58-10-18-32-14-40-8z" fill="${RED}"/>
     <path d="M60 38c0-10 3-18 9-24" stroke="#6D4C41" stroke-width="6" stroke-linecap="round" fill="none"/>
     <path d="M67 24c8-10 22-11 29-6-4 10-19 14-29 6z" fill="${GREEN}"/>${shine(38, 60, 20)}`,
  ),

  /** Maskot — tabassumli quyosh */
  maskot: svg(sunBody(true)),

  /** O'yin kartasi: Shakllar */
  shakllar: svg(
    `<circle cx="38" cy="40" r="26" fill="${CORAL}"/>
     <path d="M86 12l28 48H58z" fill="#4FB0E8" stroke="#4FB0E8" stroke-width="4" stroke-linejoin="round"/>
     <rect x="42" y="62" width="48" height="48" rx="4" fill="#6BCB77"/>`,
  ),

  /** O'yin kartasi: Hayvonlar (sigir boshi) */
  hayvonlar: svg(
    `<path d="M26 34q-10-14-4-24M94 34q10-14 4-24" stroke="#D7CCC8" stroke-width="7" fill="none" stroke-linecap="round"/>
     <ellipse cx="22" cy="46" rx="14" ry="8" fill="#fff" stroke="${NAVY}" stroke-width="4" transform="rotate(-20 22 46)"/>
     <ellipse cx="98" cy="46" rx="14" ry="8" fill="#fff" stroke="${NAVY}" stroke-width="4" transform="rotate(20 98 46)"/>
     <rect x="28" y="24" width="64" height="74" rx="30" fill="#fff" stroke="${NAVY}" stroke-width="4"/>
     <path d="M40 30c10 0 14 12 6 18s-16-2-14-10c1-4 4-8 8-8z" fill="${NAVY}"/>
     <ellipse cx="60" cy="82" rx="28" ry="18" fill="#F8A5B5" stroke="${NAVY}" stroke-width="4"/>
     <circle cx="50" cy="82" r="4" fill="${NAVY}"/><circle cx="70" cy="82" r="4" fill="${NAVY}"/>
     <circle cx="46" cy="54" r="5" fill="${NAVY}"/><circle cx="74" cy="54" r="5" fill="${NAVY}"/>`,
  ),

  /** Yosh kartalari uchun */
  koptok: svg(
    `<circle cx="60" cy="60" r="42" fill="#fff"/>
     <path d="M60 18a42 42 0 0 1 0 84" fill="${YELLOW}"/>
     <path d="M18 60h84" stroke="${CORAL}" stroke-width="10"/>
     <circle cx="60" cy="60" r="42" fill="none" stroke="${NAVY}" stroke-width="5"/>`,
  ),
  yulduz: svg(
    `<path d="M60 12l14 29 32 5-23 22 5 32-28-15-28 15 5-32-23-22 32-5z" fill="${YELLOW}" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
     <circle cx="51" cy="60" r="4" fill="${NAVY}"/><circle cx="69" cy="60" r="4" fill="${NAVY}"/>
     <path d="M52 72q8 7 16 0" stroke="${NAVY}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  ),
  kitob: svg(
    `<path d="M60 34C46 24 28 22 12 26v66c16-4 34-2 48 8 14-10 32-12 48-8V26c-16-4-34-2-48 8z" fill="#fff"/>
     <path d="M60 34v66" stroke="${GREEN_DEEP}" stroke-width="5"/>
     <path d="M24 44c10-2 20 0 28 4M24 58c10-2 20 0 28 4M68 48c8-4 18-6 28-4M68 62c8-4 18-6 28-4" stroke="${GREEN}" stroke-width="4" stroke-linecap="round"/>`,
  ),
  /** "Katta — kichik" o'yini kartasi: katta va kichik koptok */
  kattaKichik: svg(
    `<circle cx="44" cy="70" r="34" fill="#4FB0E8"/><path d="M10 70h68" stroke="#fff" stroke-width="7"/>
     <circle cx="44" cy="70" r="34" fill="none" stroke="${NAVY}" stroke-width="5"/>
     <circle cx="96" cy="88" r="16" fill="#FF6B6B"/><path d="M80 88h32" stroke="#fff" stroke-width="4"/>
     <circle cx="96" cy="88" r="16" fill="none" stroke="${NAVY}" stroke-width="4"/>`,
  ),
  /** "Sanash" o'yini kartasi: 1 2 3 va nuqtalar */
  sanash: svg(
    `<text x="60" y="64" text-anchor="middle" font-size="46" font-weight="1000" fill="${NAVY}" font-family="Nunito, sans-serif">123</text>
     <g fill="#FF6B6B"><circle cx="30" cy="88" r="7"/></g>
     <g fill="#FFD23F"><circle cx="52" cy="84" r="7"/><circle cx="52" cy="100" r="7"/></g>
     <g fill="#6BCB77"><circle cx="78" cy="80" r="7"/><circle cx="78" cy="94" r="7"/><circle cx="92" cy="94" r="7"/></g>`,
  ),
  /** "Harflar" o'yini kartasi */
  harflar: svg(
    `<text x="60" y="82" text-anchor="middle" font-size="62" font-weight="1000" fill="${NAVY}" font-family="Nunito, sans-serif"><tspan fill="#E53935">A</tspan><tspan fill="#1E88E5">b</tspan><tspan fill="#2E7D32">Ş</tspan></text>`,
  ),
  /** "Raqamlar" o'yini kartasi */
  raqamlar: svg(
    `<text x="60" y="84" text-anchor="middle" font-size="64" font-weight="1000" fill="#FB8C00" stroke="${NAVY}" stroke-width="2" paint-order="stroke" font-family="Nunito, sans-serif">10</text>`,
  ),
  /** "Juftini top" kartasi: ikkita bir xil karta */
  juftiniTop: svg(
    `<rect x="10" y="26" width="46" height="62" rx="9" fill="#FFD23F" stroke="${NAVY}" stroke-width="4"/>
     <rect x="64" y="32" width="46" height="62" rx="9" fill="#FFD23F" stroke="${NAVY}" stroke-width="4"/>
     <circle cx="33" cy="57" r="11" fill="#FF6B6B"/><circle cx="87" cy="63" r="11" fill="#FF6B6B"/>`,
  ),
  /** "Ketma-ketlik" kartasi: doira, kvadrat, doira, ? */
  ketmaKetlik: svg(
    `<circle cx="22" cy="60" r="13" fill="#E53935" stroke="${NAVY}" stroke-width="3"/>
     <rect x="42" y="47" width="26" height="26" rx="4" fill="#1E88E5" stroke="${NAVY}" stroke-width="3"/>
     <circle cx="88" cy="60" r="13" fill="#E53935" stroke="${NAVY}" stroke-width="3"/>
     <text x="112" y="70" text-anchor="middle" font-size="30" font-weight="1000" fill="#FF6B6B" font-family="Nunito, sans-serif">?</text>`,
  ),
  /** Diniy bo'lim — oltin yarim oy va yulduzlar (tungi osmon, tafakkur) */
  tun: svg(
    `<path d="M74 16a46 46 0 1 0 30 70A38 38 0 1 1 74 16z" fill="#C9A227" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
     <path d="M90 30l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="#C9A227" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
     <circle cx="100" cy="62" r="4" fill="#fff"/><circle cx="78" cy="50" r="3" fill="#fff"/>`,
  ),
  /** Tez orada — uxlayotgan quyosh */
  uxlash: svg(
    `${sunBody(false)}
     <path d="M47 58q4 4 8 0M65 58q4 4 8 0" stroke="${NAVY}" stroke-width="4" fill="none" stroke-linecap="round"/>
     <path d="M54 70q6 4 12 0" stroke="${NAVY}" stroke-width="4" fill="none" stroke-linecap="round"/>
     <text x="86" y="28" font-size="18" font-weight="900" fill="${NAVY}" font-family="Nunito, sans-serif">z</text>
     <text x="98" y="16" font-size="13" font-weight="900" fill="${NAVY}" font-family="Nunito, sans-serif">z</text>`,
  ),
} as const;

export type ArtId = keyof typeof ART;
