/**
 * Mahalliy saqlash (faqat shu qurilmada, hech qayerga yuborilmaydi).
 * localStorage mavjud bo'lmasa (private mode) — xotirada ishlaydi.
 */
const PREFIX = 'ilmli:v1:';
const memory = new Map<string, string>();

function rawGet(key: string): string | null {
  try {
    return localStorage.getItem(PREFIX + key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function rawSet(key: string, value: string): void {
  try {
    localStorage.setItem(PREFIX + key, value);
  } catch {
    memory.set(key, value);
  }
}

function read<T>(key: string, fallback: T): T {
  const raw = rawGet(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  rawSet(key, JSON.stringify(value));
}

// --- Sozlamalar ---
export interface Settings {
  sound: boolean;
}

const DEFAULT_SETTINGS: Settings = { sound: true };
const listeners = new Set<(s: Settings) => void>();

export function getSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>('settings', {}) };
}

export function updateSettings(patch: Partial<Settings>): Settings {
  const next = { ...getSettings(), ...patch };
  write('settings', next);
  for (const fn of listeners) fn(next);
  return next;
}

export function onSettingsChange(fn: (s: Settings) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// --- Progress (yulduzchalar) ---
type Stars = Record<string, number>;

export function getStars(gameId: string): number {
  return read<Stars>('stars', {})[gameId] ?? 0;
}

/** O'yinning barcha yulduzlari: "ranglar" va "ranglar.1", "ranglar.2", ... kalitlari yig'indisi. */
export function getStarsTotal(gameId: string): number {
  const all = read<Stars>('stars', {});
  return Object.entries(all)
    .filter(([k]) => k === gameId || k.startsWith(`${gameId}.`))
    .reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
}

export function addStar(gameId: string): number {
  const all = read<Stars>('stars', {});
  all[gameId] = (all[gameId] ?? 0) + 1;
  write('stars', all);
  return all[gameId];
}

export function resetProgress(): void {
  write('stars', {});
}
