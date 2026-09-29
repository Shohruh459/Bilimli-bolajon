/** Interfeys ikonalari (48×48, yumaloq chiziqlar). */
const wrap = (body: string) =>
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const ICONS = {
  home: wrap('<path d="M8 22 24 8l16 14"/><path d="M13 19v19h22V19"/><path d="M21 38v-9h6v9"/>'),
  back: wrap('<path d="M28 10 14 24l14 14"/>'),
  speaker: wrap(
    '<path d="M8 19v10h8l10 8V11l-10 8z" fill="currentColor"/><path d="M33 17a10 10 0 0 1 0 14"/><path d="M38 12a17 17 0 0 1 0 24"/>',
  ),
  gear: wrap(
    '<circle cx="24" cy="24" r="6"/><path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.6 10.6l4.2 4.2M33.2 33.2l4.2 4.2M10.6 37.4l4.2-4.2M33.2 14.8l4.2-4.2"/>',
  ),
  play: '<svg viewBox="0 0 48 48"><path d="M16 9.5v29a2 2 0 0 0 3 1.7l23-14.5a2 2 0 0 0 0-3.4L19 7.8a2 2 0 0 0-3 1.7z" fill="currentColor"/></svg>',
  star: '<svg viewBox="0 0 48 48"><path d="M24 4.5l5.9 12 13.2 1.9-9.6 9.3 2.3 13.1L24 34.6l-11.8 6.2 2.3-13.1-9.6-9.3 13.2-1.9z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>',
  refresh: wrap('<path d="M38 24a14 14 0 1 1-4.1-9.9"/><path d="M36 6v9h-9"/>'),
  soundOn: wrap(
    '<path d="M8 19v10h8l10 8V11l-10 8z" fill="currentColor"/><path d="M33 17a10 10 0 0 1 0 14"/>',
  ),
  soundOff: wrap(
    '<path d="M8 19v10h8l10 8V11l-10 8z" fill="currentColor"/><path d="M33 19l10 10M43 19 33 29"/>',
  ),
} as const;

export type IconName = keyof typeof ICONS;
