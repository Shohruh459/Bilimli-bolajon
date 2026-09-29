import { afterEach, describe, expect, it, vi } from 'vitest';
import { say, sayAll, silentDuration, stopVoice, voiceSourceFor } from './voice';

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

  it('fayl ham, TTS ham yoʻq boʻlsa — jim', () => {
    mockVoices(null);
    expect(voiceSourceFor('praise.barakalla')).toBe('silent');
  });

  it('faqat boshqa til ovozi boʻlsa ham — jim (rus/turk ishlatilmaydi)', () => {
    mockVoices(['ru-RU', 'tr-TR', 'en-US']);
    expect(voiceSourceFor('praise.barakalla')).toBe('silent');
  });

  it('uz ovozi boʻlsa — TTS', () => {
    mockVoices(['en-US', 'uz_UZ']);
    expect(voiceSourceFor('praise.barakalla')).toBe('tts');
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
