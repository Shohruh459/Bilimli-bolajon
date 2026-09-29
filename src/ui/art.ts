/**
 * O'zimiz chizgan rasmlar (litsenziya muammosi yo'q). viewBox 0 0 120 120.
 * Ranglar o'rgatiladigan ranglar bilan bir xil (tokens.css --learn-*).
 */
const RED = '#E53935';
const YELLOW = '#FFD23F';
const YELLOW_DEEP = '#E0AD00';
const BLUE = '#1E88E5';
const BLUE_DEEP = '#1565C0';
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
  quyosh: svg(sunBody(true)),
  banan: svg(
    `<path d="M20 36c4 44 40 68 82 54 5-2 4-8-1-8-32 4-58-14-66-48-1-6-16-5-15 2z" fill="${YELLOW}" stroke="${YELLOW_DEEP}" stroke-width="4" stroke-linejoin="round"/>
     <path d="M34 42c6 22 24 36 50 40" stroke="${YELLOW_DEEP}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
     <path d="M20 36l-4-10 10-2 4 8z" fill="#6D4C41"/><circle cx="101" cy="86" r="4" fill="#6D4C41"/>`,
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

  /** Maskot — tabassumli quyosh */
  maskot: svg(sunBody(true)),

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
  yurak: svg(
    `<path d="M60 102C30 82 12 64 12 42c0-14 11-24 24-24 10 0 18 6 24 14 6-8 14-14 24-14 13 0 24 10 24 24 0 22-18 40-48 60z" fill="#C9A227" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
     ${shine(34, 40, -30)}`,
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
