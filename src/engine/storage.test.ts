import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addStar,
  getSettings,
  getStars,
  onSettingsChange,
  resetProgress,
  updateSettings,
} from './storage';

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('sozlamalar default qiymat bilan', () => {
    expect(getSettings()).toEqual({ sound: true });
  });

  it('updateSettings saqlaydi va tinglovchilarni chaqiradi', () => {
    const fn = vi.fn();
    const off = onSettingsChange(fn);
    updateSettings({ sound: false });
    expect(getSettings().sound).toBe(false);
    expect(fn).toHaveBeenCalledWith({ sound: false });
    off();
  });

  it('buzilgan JSON da default qaytaradi', () => {
    localStorage.setItem('ilmli:v1:settings', '{buzuq');
    expect(getSettings().sound).toBe(true);
  });

  it('yulduzlar oʻyin boʻyicha hisoblanadi va tozalanadi', () => {
    expect(getStars('ranglar')).toBe(0);
    addStar('ranglar');
    expect(addStar('ranglar')).toBe(2);
    expect(getStars('boshqa')).toBe(0);
    resetProgress();
    expect(getStars('ranglar')).toBe(0);
  });
});
