"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_MODE, persist, readPreferences, type Theme, type ViewMode } from "@/lib/preferences";
import { setMuted as setSoundMuted } from "@/lib/sound";

type Point = { x: number; y: number };

type PreferencesCtx = {
  theme: Theme;
  mode: ViewMode;
  muted: boolean;
  setTheme: (theme: Theme, origin?: Point) => void;
  setMode: (mode: ViewMode) => void;
  setMuted: (muted: boolean) => void;
};

const Ctx = createContext<PreferencesCtx | null>(null);

export function usePreferences() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePreferences debe usarse dentro de <PreferencesProvider>");
  return ctx;
}

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

/** Cambia el DOM dentro de una View Transition si el navegador la soporta. */
function withViewTransition(apply: () => void, animate?: () => void) {
  const doc = document as ViewTransitionDoc;
  if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
  const vt = doc.startViewTransition(apply);
  if (animate) vt.ready.then(animate);
}

/**
 * Cambio de modo sin golpe: la vista anterior se desvanece con un leve desenfoque
 * y la nueva entra suave. Hacia el terminal la nueva vista "se enciende" de arriba
 * hacia abajo como una pantalla; hacia el modo humano es un fundido limpio.
 */
function animateModeChange(next: ViewMode) {
  const root = document.documentElement;
  const easing = "cubic-bezier(.4,0,.2,1)";
  root.animate(
    { opacity: [1, 0], filter: ["blur(0px)", "blur(6px)"], transform: ["scale(1)", "scale(.985)"] },
    { duration: 380, easing, fill: "both", pseudoElement: "::view-transition-old(root)" }
  );
  const enter =
    next === "terminal"
      ? { opacity: [0, 1], clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"], filter: ["brightness(1.6)", "brightness(1)"] }
      : { opacity: [0, 1], filter: ["blur(6px)", "blur(0px)"], transform: ["translateY(8px)", "translateY(0)"] };
  root.animate(enter, { duration: next === "terminal" ? 560 : 460, delay: 80, easing, fill: "both", pseudoElement: "::view-transition-new(root)" });
}

export default function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mode, setModeState] = useState<ViewMode>(DEFAULT_MODE);
  const [muted, setMutedState] = useState(false);

  // el script inline del <head> ya aplicó tema y modo; aquí solo se sincroniza
  useEffect(() => {
    const prefs = readPreferences();
    setThemeState(prefs.theme);
    setModeState(prefs.mode);
    setMutedState(prefs.muted);
  }, []);

  // el teclado solo suena en modo terminal y sin silenciar
  useEffect(() => setSoundMuted(muted || mode === "human"), [muted, mode]);

  const setTheme = useCallback((next: Theme, origin?: Point) => {
    const { x, y } = origin ?? { x: window.innerWidth - 40, y: 30 };
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    withViewTransition(
      () => {
        document.documentElement.dataset.theme = next;
        setThemeState(next);
        persist("theme", next);
      },
      () =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
        )
    );
  }, []);

  const setMode = useCallback((next: ViewMode) => {
    const root = document.documentElement;
    if (root.dataset.mode === next) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!(document as ViewTransitionDoc).startViewTransition && !reduced) {
      // sin View Transitions: al menos un fundido del contenido
      root.dataset.mode = next;
      setModeState(next);
      persist("mode", next);
      document.querySelector("main")?.animate({ opacity: [0, 1] }, { duration: 320, easing: "ease-out" });
      return;
    }
    withViewTransition(
      () => {
        root.dataset.mode = next;
        setModeState(next);
        persist("mode", next);
      },
      () => animateModeChange(next)
    );
  }, []);

  const setMuted = useCallback((next: boolean) => {
    setMutedState(next);
    persist("muted", next ? "1" : "0");
  }, []);

  return <Ctx.Provider value={{ theme, mode, muted, setTheme, setMode, setMuted }}>{children}</Ctx.Provider>;
}
