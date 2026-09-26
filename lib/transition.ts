// Efecto de transición: la página actual se "desestructura" en fragmentos,
// una malla de glifos cubre la pantalla desde el punto del click y luego
// se disuelve mientras la nueva página se ensambla pieza por pieza.

const GLYPHS = "01010101<>/{}[]#$%&*+=;:_|";
const CELL = 22;

type Cell = { x: number; y: number; t: number; glyph: string; showGlyph: boolean };
type Point = { x: number; y: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export class GlyphOverlay {
  private cells: Cell[] = [];
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  label = "";

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  private setup(origin: Point) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cols = Math.ceil(this.w / CELL);
    const rows = Math.ceil(this.h / CELL);
    const maxD = Math.hypot(Math.max(origin.x, this.w - origin.x), Math.max(origin.y, this.h - origin.y));
    this.cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL;
        const y = r * CELL;
        const d = Math.hypot(x + CELL / 2 - origin.x, y + CELL / 2 - origin.y) / maxD;
        this.cells.push({ x, y, t: d * 0.82 + Math.random() * 0.18, glyph: pick(), showGlyph: Math.random() < 0.4 });
      }
    }
  }

  private draw(p: number, mode: "cover" | "reveal") {
    const { ctx } = this;
    const bg = cssVar("--bg") || "#000";
    const accent = cssVar("--accent") || "#39ff88";
    const fg = cssVar("--fg") || "#fff";
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.font = `600 ${CELL - 8}px ${getComputedStyle(document.body).fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const cell of this.cells) {
      const visible = mode === "cover" ? cell.t <= p : cell.t > p;
      if (!visible) continue;
      const edge = Math.abs(p - cell.t) < 0.07;
      if (Math.random() < 0.08) cell.glyph = pick();
      if (edge) {
        ctx.fillStyle = accent;
        ctx.fillRect(cell.x, cell.y, CELL, CELL);
        ctx.fillStyle = bg;
        ctx.fillText(cell.glyph, cell.x + CELL / 2, cell.y + CELL / 2 + 1);
      } else {
        ctx.fillStyle = bg;
        ctx.fillRect(cell.x, cell.y, CELL, CELL);
        if (cell.showGlyph) {
          ctx.globalAlpha = 0.18 + Math.random() * 0.25;
          ctx.fillStyle = accent;
          ctx.fillText(cell.glyph, cell.x + CELL / 2, cell.y + CELL / 2 + 1);
          ctx.globalAlpha = 1;
        }
      }
    }

    // comando en el centro mientras la pantalla está cubierta
    const labelAlpha = mode === "cover" ? Math.max(0, (p - 0.55) / 0.45) : Math.max(0, 1 - p / 0.35);
    if (this.label && labelAlpha > 0) {
      ctx.globalAlpha = labelAlpha;
      ctx.font = `700 ${this.w < 640 ? 16 : 22}px ${getComputedStyle(document.body).fontFamily}`;
      const text = `$ ${this.label}`;
      const tw = ctx.measureText(text).width + 36;
      ctx.fillStyle = bg;
      ctx.fillRect(this.w / 2 - tw / 2, this.h / 2 - 24, tw, 48);
      ctx.strokeStyle = accent;
      ctx.strokeRect(this.w / 2 - tw / 2 + 0.5, this.h / 2 - 23.5, tw - 1, 47);
      ctx.fillStyle = fg;
      ctx.fillText(text + (Math.floor(performance.now() / 300) % 2 ? "▋" : " "), this.w / 2, this.h / 2 + 1);
      ctx.globalAlpha = 1;
    }
  }

  private run(mode: "cover" | "reveal", duration: number) {
    return new Promise<void>((resolve) => {
      // si la pestaña está oculta, rAF se pausa: no bloquear la navegación
      if (document.hidden) return resolve();
      const start = performance.now();
      const guard = setTimeout(resolve, duration + 600);
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        this.draw(easeInOut(p) * 1.08, mode);
        if (p < 1) requestAnimationFrame(tick);
        else {
          clearTimeout(guard);
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });
  }

  async cover(origin: Point, duration = 620) {
    this.setup(origin);
    this.canvas.style.pointerEvents = "auto";
    await this.run("cover", duration);
  }

  async reveal(duration = 700) {
    // se disuelve desde el centro hacia afuera
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.setup(center);
    await this.run("reveal", duration);
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.canvas.style.pointerEvents = "none";
  }
}

/** Bloques visibles de la página que se animan como fragmentos independientes. */
function collectPieces(root: HTMLElement) {
  const nodes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-piece], h1, h2, h3, h4, p, li, pre, table, blockquote, img, hr")
  );
  const set = new Set<HTMLElement>();
  const vh = window.innerHeight;
  for (const el of nodes) {
    // si un ancestro ya es pieza, este va dentro de ella
    let parent = el.parentElement;
    let nested = false;
    while (parent && parent !== root) {
      if (set.has(parent)) {
        nested = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (nested) continue;
    const r = el.getBoundingClientRect();
    if (r.bottom < -40 || r.top > vh + 40 || r.height === 0) continue;
    set.add(el);
    if (set.size > 70) break;
  }
  return Array.from(set);
}

function scatter() {
  return `translate(${rand(-160, 160)}px, ${rand(-90, 90)}px) rotate(${rand(-14, 14)}deg) skewX(${rand(-25, 25)}deg) scale(${rand(0.6, 1.2)})`;
}

let active: Animation[] = [];

export function cancelPieces() {
  active.forEach((a) => a.cancel());
  active = [];
}

export function deconstruct(root: HTMLElement) {
  cancelPieces();
  const pieces = collectPieces(root);
  const anims = pieces.map((el) =>
    el.animate(
      [
        { transform: "none", opacity: 1, filter: "none" },
        { opacity: 1, filter: "blur(0px) drop-shadow(3px 0 0 var(--danger)) drop-shadow(-3px 0 0 var(--accent-3))", offset: 0.25 },
        { transform: scatter(), opacity: 0, filter: "blur(6px)" },
      ],
      { duration: rand(380, 560), delay: rand(0, 160), easing: "cubic-bezier(.6,0,.9,.35)", fill: "forwards" }
    )
  );
  active = anims;
  return Promise.race([
    Promise.all(anims.map((a) => a.finished.catch(() => undefined))),
    new Promise((r) => setTimeout(r, 900)),
  ]);
}

export function assemble(root: HTMLElement) {
  cancelPieces();
  const pieces = collectPieces(root);
  pieces.forEach((el, i) =>
    el.animate(
      [
        { transform: scatter(), opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px) drop-shadow(-3px 0 0 var(--danger)) drop-shadow(3px 0 0 var(--accent-3))", offset: 0.7 },
        { transform: "none", opacity: 1, filter: "none" },
      ],
      { duration: rand(520, 760), delay: 80 + i * 18 + rand(0, 120), easing: "cubic-bezier(.15,.85,.25,1)", fill: "backwards" }
    )
  );
}
