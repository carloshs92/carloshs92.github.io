// Efecto de transición: la página actual se "desestructura" en fragmentos,
// un barrido circular con glifos en el borde cubre la pantalla desde el
// punto del click y luego se abre mientras la nueva página se ensambla.

const GLYPHS = "01010101<>/{}[]#$%&*+=;:_|";
const CELL = 22;
const EDGE = 0.09; // ancho de la franja de glifos en el borde del barrido

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
  private origin: Point = { x: 0, y: 0 };
  private maxD = 1;
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
    this.origin = origin;
    this.maxD = Math.hypot(Math.max(origin.x, this.w - origin.x), Math.max(origin.y, this.h - origin.y));
    const cols = Math.ceil(this.w / CELL);
    const rows = Math.ceil(this.h / CELL);
    this.cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL + CELL / 2;
        const y = r * CELL + CELL / 2;
        const d = Math.hypot(x - origin.x, y - origin.y) / this.maxD;
        this.cells.push({ x, y, t: d + rand(-0.04, 0.04), glyph: pick(), showGlyph: Math.random() < 0.18 });
      }
    }
  }

  private draw(p: number, mode: "cover" | "reveal") {
    const { ctx, origin } = this;
    const bg = cssVar("--bg") || "#000";
    const accent = cssVar("--accent") || "#39ff88";
    const fg = cssVar("--fg") || "#fff";
    const radius = Math.max(0, p) * this.maxD;
    ctx.clearRect(0, 0, this.w, this.h);

    // superficie lisa: un círculo que crece (cover) o un hueco que se abre (reveal)
    ctx.fillStyle = bg;
    ctx.beginPath();
    if (mode === "cover") {
      ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
    } else {
      ctx.rect(0, 0, this.w, this.h);
      ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2, true);
    }
    ctx.fill("evenodd");

    ctx.font = `500 ${CELL - 9}px ${getComputedStyle(document.body).fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = accent;

    for (const cell of this.cells) {
      // distancia al frente del barrido (0 = justo en el borde)
      const gap = mode === "cover" ? p - cell.t : cell.t - p;
      if (gap < -EDGE * 0.5) continue;
      if (Math.random() < 0.06) cell.glyph = pick();
      if (gap < EDGE) {
        // franja del borde: glifos más brillantes que se apagan hacia adentro
        ctx.globalAlpha = 0.85 * (1 - Math.abs(gap) / EDGE);
      } else if (cell.showGlyph) {
        ctx.globalAlpha = 0.08 + Math.random() * 0.08;
      } else continue;
      ctx.fillText(cell.glyph, cell.x, cell.y + 1);
    }
    ctx.globalAlpha = 1;

    // comando en el centro mientras la pantalla está cubierta
    const labelAlpha = mode === "cover" ? Math.max(0, (p - 0.55) / 0.45) : Math.max(0, 1 - p / 0.35);
    if (this.label && labelAlpha > 0) {
      ctx.globalAlpha = labelAlpha;
      ctx.font = `700 ${this.w < 640 ? 16 : 22}px ${getComputedStyle(document.body).fontFamily}`;
      const text = `$ ${this.label}`;
      const tw = ctx.measureText(text).width + 36;
      ctx.fillStyle = bg;
      ctx.fillRect(this.w / 2 - tw / 2, this.h / 2 - 24, tw, 48);
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
        this.draw(easeInOut(p) * (1 + EDGE * 1.5), mode);
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
