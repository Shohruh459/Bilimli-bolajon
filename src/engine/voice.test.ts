import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  hasRecording,
  pickSource,
  say,
  sayAll,
  silentDuration,
  stopVoice,
  voiceSourceFor,
} from './voice';

function mockVoices(langs: string[] | null) {
  if (langs === null) {
    Reflect.deleteProperty(window, 'speechSynthesis');
    return;
  }
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    value: { getVoices: () => langs.map((lang) => ({ lang })), cancel() {}, speak() {} },
  });
}

describe('voice', () => {
  afterEach(() => {
    mockVoices(null);
    vi.useRealTimers();
  });

  it('zanjir: fayl → uz ovozi → jim', () => {
    expect(pickSource(true, true)).toBe('file');
    expect(pickSource(true, false)).toBe('file');
    expect(pickSource(false, true)).toBe('tts');
    expect(pickSource(false, false)).toBe('silent');
  });

  it('fayl boʻlsa — fayl; yoʻq boʻlsa faqat uz ovozi ishlatiladi (rus/turk emas)', () => {
    const key = 'praise.barakalla';
    const file = hasRecording(key);
    mockVoices(null);
    expect(voiceSourceFor(key)).toBe(file ? 'file' : 'silent');
    mockVoices(['ru-RU', 'tr-TR', 'en-US']);
    expect(voiceSourceFor(key)).toBe(file ? 'file' : 'silent');
    mockVoices(['en-US', 'uz_UZ']);
    expect(voiceSourceFor(key)).toBe(file ? 'file' : 'tts');
  });

  it('jim pauza chegaralangan', () => {
    expect(silentDuration('Ha')).toBe(500);
    expect(silentDuration('x'.repeat(500))).toBe(1500);
  });

  it('jim rejimda say pauzadan keyin tugaydi', async () => {
    vi.useFakeTimers();
    let done = false;
    void say('praise.ofarin').then(() => (done = true));
    await vi.advanceTimersByTimeAsync(400);
    expect(done).toBe(false);
    await vi.advanceTimersByTimeAsync(1200);
    expect(done).toBe(true);
  });

  it('stopVoice kutilayotgan iborani va zanjirni toʻxtatadi', async () => {
    vi.useFakeTimers();
    const spoken: string[] = [];
    const chain = sayAll(['praise.ofarin', 'praise.zor']).then(() => spoken.push('end'));
    await vi.advanceTimersByTimeAsync(100);
    stopVoice();
    await chain;
    expect(spoken).toEqual(['end']);
    // Ikkinchi ibora boshlanmagan: taymerlar navbati boʻsh
    expect(vi.getTimerCount()).toBe(0);
  });
});
