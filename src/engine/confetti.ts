/**
 * Konfetti — bitta <canvas id="fx">, zarrachalar pool'i (GC bosimi yo'q).
 * - clear(): har raunddan oldin chaqiriladi — eski zarrachalar va RAF to'xtaydi.
 * - Zarracha qolmasa RAF o'zi to'xtaydi (batareya).
 * - Blur/shadow yo'q, DPR ≤ 2.
 */
import { prefersReducedMotion } from './animate';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  round: boolean;
  life: number; // soniya qoldi
}

const COLORS = ['#4FB0E8', '#FFD23F', '#6BCB77', '#FF6B6B', '#FFFFFF'];
const GRAVITY = 900; // px/s²
const MAX = 160;

export class Confetti {
  readonly active: Particle[] = [];
  private readonly pool: Particle[] = [];
  private raf = 0;
  private last = 0;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private w = 0;
  private h = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement | null,
    private readonly rng: () => number = Math.random,
  ) {}

  burst(x: number, y: number, count = 36): void {
    const n = prefersReducedMotion() ? Math.ceil(count / 3) : count;
    for (let i = 0; i < n && this.active.length < MAX; i++) {
      const p = this.pool.pop() ?? ({} as Particle);
      const angle = -Math.PI / 2 + (this.rng() - 0.5) * Math.PI * 0.9;
      const speed = 380 + this.rng() * 420;
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.rot = this.rng() * Math.PI;
      p.vr = (this.rng() - 0.5) * 14;
      p.size = 8 + this.rng() * 8;
      p.color = COLORS[Math.floor(this.rng() * COLORS.length)] ?? '#FFD23F';
      p.round = this.rng() < 0.35;
      p.life = 1.4 + this.rng() * 0.6;
      this.active.push(p);
    }
    this.start();
  }

  /** Hamma zarrachalarni o'chiradi va chizishni to'xtatadi. */
  clear(): void {
    this.pool.push(...this.active.splice(0));
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.ctx2d?.clearRect(0, 0, this.w, this.h);
  }

  /** Fizika qadami (test qilinadi). dt — soniya. */
  step(dt: number, height = this.h || Infinity): void {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i] as Particle;
      p.vy += GRAVITY * dt;
      p.vx *= 0.99;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.life -= dt;
      if (p.life <= 0 || p.y > height + 40) {
        this.active.splice(i, 1);
        this.pool.push(p);
      }
    }
  }

  private start(): void {
    if (this.raf || !this.canvas) return;
    this.ctx2d ??= this.canvas.getContext('2d');
    if (!this.ctx2d) return;
    this.resize();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private resize(): void {
    if (!this.canvas || !this.ctx2d) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w !== this.w || h !== this.h) {
      this.w = w;
      this.h = h;
      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private readonly frame = (now: number): void => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.step(dt);
    this.draw();
    this.raf = this.active.length ? requestAnimationFrame(this.frame) : 0;
  };

  private draw(): void {
    const c = this.ctx2d;
    if (!c) return;
    c.clearRect(0, 0, this.w, this.h);
    for (const p of this.active) {
      c.globalAlpha = Math.min(1, p.life * 2);
      c.fillStyle = p.color;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      if (p.round) {
        c.beginPath();
        c.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        c.fill();
      } else {
        c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      c.restore();
    }
    c.globalAlpha = 1;
  }
}

let shared: Confetti | null = null;

/** Ilova bo'ylab yagona konfetti (#fx canvas). */
export function confetti(): Confetti {
  shared ??= new Confetti(document.getElementById('fx') as HTMLCanvasElement | null);
  return shared;
}
