type Child = Node | string | null | undefined | false;
type Attrs = Record<string, string | number | boolean | null | undefined>;

/** Kichik DOM yordamchisi. Hodisalar h() da emas — Scope.on() orqali (tozalash avtomatik). */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      el.setAttribute(k, v === true ? '' : String(v));
    }
  }
  for (const c of children) if (c) el.append(c);
  return el;
}

/** Ishonchli (o'zimiz yozgan) SVG satridan element. Foydalanuvchi matni hech qachon bu yerga tushmaydi. */
export function svg(markup: string, className?: string): SVGSVGElement {
  const tpl = document.createElement('template');
  tpl.innerHTML = markup.trim();
  const el = tpl.content.firstElementChild as SVGSVGElement;
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  if (className) el.classList.add(className);
  return el;
}
