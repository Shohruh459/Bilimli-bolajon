/**
 * Yagona AudioContext. Mobil brauzerlar (iOS/Android) ovozni faqat foydalanuvchi bosishidan
 * keyin ruxsat beradi — shuning uchun `unlockAudio()` "Boshlash ▶" tugmasi bosilganda,
 * sinxron ravishda (await'dan oldin) chaqiriladi.
 *
 * Holat <html data-audio="..."> da ko'rinadi: locked | running | suspended | unsupported.
 */
import { getSettings, onSettingsChange } from './storage';

export type AudioState = 'locked' | 'running' | 'suspended' | 'unsupported';
export type Channel = 'voice' | 'sfx';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const channels = new Map<Channel, GainNode>();
const CHANNEL_GAIN: Record<Channel, number> = { voice: 1, sfx: 0.5 };

function setState(state: AudioState): void {
  document.documentElement.dataset.audio = state;
}

export function getAudioState(): AudioState {
  return (document.documentElement.dataset.audio as AudioState | undefined) ?? 'locked';
}

type AudioContextCtor = typeof AudioContext;

function contextCtor(): AudioContextCtor | undefined {
  const w = window as unknown as {
    AudioContext?: AudioContextCtor;
    webkitAudioContext?: AudioContextCtor;
  };
  return w.AudioContext ?? w.webkitAudioContext;
}

/** Foydalanuvchi bosishi ichida chaqiring. Qaytaradi: ovoz ishlayaptimi. */
export function unlockAudio(): Promise<boolean> {
  const Ctor = contextCtor();
  if (!Ctor) {
    setState('unsupported');
    return Promise.resolve(false);
  }
  if (!ctx) {
    ctx = new Ctor({ latencyHint: 'interactive' });
    master = ctx.createGain();
    master.gain.value = getSettings().sound ? 1 : 0;
    master.connect(ctx.destination);
    for (const [name, value] of Object.entries(CHANNEL_GAIN) as [Channel, number][]) {
      const g = ctx.createGain();
      g.gain.value = value;
      g.connect(master);
      channels.set(name, g);
    }
    ctx.addEventListener('statechange', syncState);
    onSettingsChange((s) => setMuted(!s.sound));
    document.addEventListener('visibilitychange', onVisibility);
  }
  // iOS: gesture ichida sukut buferini chalish "ochadi".
  const silent = ctx.createBufferSource();
  silent.buffer = ctx.createBuffer(1, 1, 22050);
  silent.connect(ctx.destination);
  silent.start(0);

  const c = ctx;
  return c
    .resume()
    .catch(() => undefined)
    .then(() => {
      syncState();
      return c.state === 'running';
    });
}

function syncState(): void {
  if (!ctx) return;
  setState(ctx.state === 'running' ? 'running' : 'suspended');
}

function onVisibility(): void {
  if (!ctx) return;
  // Fonda batareyani tejaymiz; qaytganda davom etamiz.
  if (document.hidden) void ctx.suspend().catch(() => undefined);
  else void ctx.resume().catch(() => undefined);
}

function setMuted(muted: boolean): void {
  if (!ctx || !master) return;
  master.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.02);
}

/** Ovoz ishlayotgan bo'lsa context, aks holda null (chaqiruvchi jim qoladi). */
export function getAudioContext(): AudioContext | null {
  return ctx && ctx.state === 'running' ? ctx : null;
}

export function getChannel(name: Channel): AudioNode | null {
  return channels.get(name) ?? null;
}
