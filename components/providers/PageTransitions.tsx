"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motionEnabled } from "@/lib/preferences";
import { typingBurst } from "@/lib/sound";
import { GlyphOverlay, assemble, cancelPieces, deconstruct } from "@/lib/transition";

type Point = { x: number; y: number };
type Navigate = (href: string, origin?: Point) => void;

const Ctx = createContext<Navigate | null>(null);

/** Navegación con la transición de "desestructuración" (o normal en modo humano). */
export function useNavigate() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNavigate debe usarse dentro de <PageTransitions>");
  return ctx;
}

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function pathLabel(pathname: string) {
  const p = norm(pathname);
  return p === "/" ? "~" : `~${p}`;
}

export default function PageTransitions({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<GlyphOverlay | null>(null);
  const busy = useRef(false);
  const pending = useRef<{ path: string; resolve: () => void } | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    overlay.current = new GlyphOverlay(canvasRef.current!);
  }, []);

  const navigate = useCallback<Navigate>(
    async (href, origin) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;
      if (busy.current) return;
      const main = document.querySelector<HTMLElement>("main");
      if (!main || !overlay.current || !motionEnabled()) {
        router.push(target);
        return;
      }
      busy.current = true;
      const ov = overlay.current;
      ov.label = `cd ${pathLabel(url.pathname)}`;
      typingBurst(3, 90);
      await Promise.all([deconstruct(main), ov.cover(origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 })]);
      const arrived = new Promise<void>((resolve) => {
        pending.current = { path: norm(url.pathname), resolve };
        setTimeout(resolve, 4000);
      });
      router.push(target, { scroll: false });
      await arrived;
      pending.current = null;
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 32));
      assemble(main);
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
    } else if (!busy.current && motionEnabled()) {
      // back/forward del navegador: solo ensamblar
      cancelPieces();
      const main = document.querySelector<HTMLElement>("main");
      if (main) requestAnimationFrame(() => assemble(main));
    }
  }, [pathname]);

  // intercepta los links internos para animar la salida antes de navegar
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!motionEnabled()) return;
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
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  return (
    <Ctx.Provider value={navigate}>
      {children}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[70] h-full w-full print:hidden" />
    </Ctx.Provider>
  );
}
