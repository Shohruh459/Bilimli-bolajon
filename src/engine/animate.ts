/**
 * Animatsiyalar — faqat Web Animations API (CSS class almashtirish emas).
 * - Har chaqiruvda elementning oldingi animatsiyalari cancel() qilinadi → qayta ishga tushirish ishonchli.
 * - fill: 'forwards' — oxirgi holat saqlanadi.
 * - Faqat transform/opacity (GPU, arzon telefonda ham 60fps).
 * - Muhim: tugmaning o'zini emas, ichidagi `.art` ni animatsiya qiling — aks holda fill
 *   tugmaning :active bosilish effektini bosib qoladi.
 */
const BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function run(
  el: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation | null {
  if (typeof el.animate !== 'function') return null;
  for (const a of el.getAnimations()) a.cancel();
  return el.animate(keyframes, { fill: 'forwards', easing: 'ease-out', ...options });
}

export function finished(a: Animation | null): Promise<void> {
  return a
    ? a.finished.then(
        () => undefined,
        () => undefined,
      )
    : Promise.resolve();
}

const t = (v: string): Keyframe => ({ transform: v });

export const anim = {
  /** Paydo bo'lish (delay bilan ketma-ket chiqarish uchun fill: both) */
  appear(el: Element, delay = 0): Animation | null {
    if (prefersReducedMotion()) {
      return run(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, delay, fill: 'both' });
    }
    return run(
      el,
      [
        { transform: 'scale(0.4)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      { duration: 420, delay, easing: BOUNCE, fill: 'both' },
    );
  },

  /** Bosilganda kichik "pop" */
  pop(el: Element): Animation | null {
    return run(el, [t('scale(1)'), t('scale(1.15)'), t('scale(1)')], { duration: 260 });
  },

  /** To'g'ri javob — sakrash va quvonch */
  celebrate(el: Element): Animation | null {
    if (prefersReducedMotion())
      return run(el, [t('scale(1)'), t('scale(1.08)')], { duration: 200 });
    return run(
      el,
      [
        t('translateY(0) scale(1) rotate(0)'),
        t('translateY(-28px) scale(1.18) rotate(-6deg)'),
        t('translateY(0) scale(1.1) rotate(4deg)'),
        t('translateY(-10px) scale(1.12) rotate(0)'),
        t('translateY(0) scale(1.08) rotate(0)'),
      ],
      { duration: 700, easing: 'ease-in-out' },
    );
  },

  /** Xato — yumshoq silkinish (urishmaydi) */
  shake(el: Element): Animation | null {
    if (prefersReducedMotion()) {
      return run(el, [{ opacity: 1 }, { opacity: 0.55 }, { opacity: 1 }], { duration: 300 });
    }
    return run(
      el,
      ['0', '-14px', '12px', '-9px', '6px', '-3px', '0'].map((x) => t(`translateX(${x})`)),
      { duration: 480, easing: 'ease-in-out' },
    );
  },

  /** Yordam — "men shu yerdaman" pulsatsiyasi */
  hint(el: Element): Animation | null {
    return run(el, [t('scale(1)'), t('scale(1.14)'), t('scale(1)')], {
      duration: 700,
      iterations: prefersReducedMotion() ? 1 : 3,
      easing: 'ease-in-out',
    });
  },

  /** Doimiy yengil "suzish" (maskot, CTA). fill kerak emas. */
  float(el: Element, amplitude = 8, duration = 2400): Animation | null {
    if (prefersReducedMotion()) return null;
    return run(el, [t('translateY(0)'), t(`translateY(-${amplitude}px)`), t('translateY(0)')], {
      duration,
      iterations: Infinity,
      easing: 'ease-in-out',
      fill: 'none',
    });
  },

  /** Yo'qolish */
  vanish(el: Element): Animation | null {
    return run(
      el,
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.6)', opacity: 0 },
      ],
      { duration: 220, easing: 'ease-in' },
    );
  },
};
