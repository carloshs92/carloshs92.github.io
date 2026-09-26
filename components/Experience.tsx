"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { keyClick, setMuted as setSoundMuted, typingBurst } from "@/lib/sound";
import { GlyphOverlay, assemble, cancelPieces, deconstruct } from "@/lib/transition";
import { RAIN_EVENT } from "./BinaryRain";

type Theme = "dark" | "light";
type Point = { x: number; y: number };

type ExperienceCtx = {
  theme: Theme;
  setTheme: (t: Theme, origin?: Point) => void;
  muted: boolean;
  setMuted: (m: boolean) => void;
  navigate: (href: string, origin?: Point) => void;
  rain: () => void;
};

const Ctx = createContext<ExperienceCtx | null>(null);

export const useExperience = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExperience fuera de <Experience>");
  return ctx;
};

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function pathLabel(pathname: string) {
  const p = norm(pathname);
  return p === "/" ? "~" : `~${p}`;
}

export default function Experience({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setThemeState] = useState<Theme>("dark");
  const [muted, setMutedState] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<GlyphOverlay | null>(null);
  const busy = useRef(false);
  const pending = useRef<{ path: string; resolve: () => void } | null>(null);
  const firstRender = useRef(true);

  // estado inicial (lo fija el script inline del <head>)
  useEffect(() => {
    setThemeState((document.documentElement.dataset.theme as Theme) ?? "dark");
    let m = false;
    try {
      m = localStorage.getItem("muted") === "1";
    } catch {}
    setMutedState(m);
    setSoundMuted(m);
    overlay.current = new GlyphOverlay(canvasRef.current!);
  }, []);

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m);
    setSoundMuted(m);
    try {
      localStorage.setItem("muted", m ? "1" : "0");
    } catch {}
  }, []);

  const setTheme = useCallback((t: Theme, origin?: Point) => {
    const apply = () => {
      document.documentElement.dataset.theme = t;
      setThemeState(t);
      try {
        localStorage.setItem("theme", t);
      } catch {}
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) return apply();
    const { x, y } = origin ?? { x: window.innerWidth - 40, y: 30 };
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, []);

  const rain = useCallback(() => window.dispatchEvent(new Event(RAIN_EVENT)), []);

  const navigate = useCallback(
    async (href: string, origin?: Point) => {
      const url = new URL(href, window.location.href);
      if (busy.current) return;
      const main = document.querySelector<HTMLElement>("main");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!main || !overlay.current || reduce) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      busy.current = true;
      const ov = overlay.current;
      ov.label = `cd ${pathLabel(url.pathname)}`;
      typingBurst(7, 48);
      await Promise.all([
        deconstruct(main),
        ov.cover(origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 }),
      ]);
      const arrived = new Promise<void>((resolve) => {
        pending.current = { path: norm(url.pathname), resolve };
        setTimeout(resolve, 4000);
      });
      router.push(url.pathname + url.search + url.hash, { scroll: false });
      await arrived;
      pending.current = null;
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 32));
      assemble(main);
      keyClick(true);
      await ov.reveal();
      busy.current = false;
    },
    [router]
  );

  // la nueva ruta ya está en pantalla
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (pending.current && pending.current.path === norm(pathname)) {
      pending.current.resolve();
    } else if (!busy.current) {
      // back/forward del navegador: solo ensamblar
      cancelPieces();
      const main = document.querySelector<HTMLElement>("main");
      if (main) requestAnimationFrame(() => assemble(main));
    }
  }, [pathname]);

  // sonidos de teclado + intercepción de links internos
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const interactive = (e.target as Element).closest?.("a,button,[role=button],input,label,summary");
      keyClick(Boolean(interactive));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey) return;
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") keyClick(e.key === "Enter" || e.key === " ");
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || !a.href || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (norm(url.pathname) === norm(window.location.pathname)) return;
      e.preventDefault();
      navigate(url.href, { x: e.clientX, y: e.clientY });
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick, true);
    };
  }, [navigate]);

  return (
    <Ctx.Provider value={{ theme, setTheme, muted, setMuted, navigate, rain }}>
      {children}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[70] h-full w-full print:hidden" />
    </Ctx.Provider>
  );
}
