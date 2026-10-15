// Preferencias del visitante: única fuente de verdad para claves, valores
// por defecto y cómo se reflejan en <html> (data-theme, data-mode).

export type Theme = "dark" | "light";
/** terminal = experiencia completa · human = vista limpia sin animaciones */
export type ViewMode = "terminal" | "human";

export type Preferences = {
  theme: Theme;
  mode: ViewMode;
  muted: boolean;
};

export const STORAGE_KEYS = {
  theme: "theme",
  mode: "view-mode",
  muted: "muted",
} as const;

/** Quien llega por primera vez ve el modo humano; el terminal se elige con el botón. */
export const DEFAULT_MODE: ViewMode = "human";

export function readPreferences(): Preferences {
  const root = document.documentElement;
  let muted = false;
  try {
    muted = localStorage.getItem(STORAGE_KEYS.muted) === "1";
  } catch {}
  return {
    theme: (root.dataset.theme as Theme) ?? "dark",
    mode: (root.dataset.mode as ViewMode) ?? DEFAULT_MODE,
    muted,
  };
}

export function persist(key: keyof typeof STORAGE_KEYS, value: string) {
  try {
    localStorage.setItem(STORAGE_KEYS[key], value);
  } catch {}
}

/** ¿Se permiten animaciones? No en modo humano ni con "reducir movimiento". */
export function motionEnabled() {
  if (typeof window === "undefined") return false;
  if (document.documentElement.dataset.mode === "human") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Script inline que corre antes de pintar: aplica tema y modo guardados
 * para que no haya parpadeo. Sin preferencia guardada se usa DEFAULT_MODE.
 * `?modo=terminal` o `?modo=humano` en la URL fuerzan un modo (útil para compartir).
 * También fija <html lang="en"> en las páginas bajo /en/ (el layout raíz sale con "es").
 */
export const bootScript = `(function(){var d=document.documentElement;if(/^\\/en(\\/|$)/.test(location.pathname))d.lang='en';try{var t=localStorage.getItem('${STORAGE_KEYS.theme}');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t;var m=localStorage.getItem('${STORAGE_KEYS.mode}');var q=new URLSearchParams(location.search).get('modo');if(q==='humano'||q==='human'){m='human'}else if(q==='terminal'){m='terminal'}d.dataset.mode=m==='terminal'||m==='human'?m:'${DEFAULT_MODE}'}catch(e){d.dataset.theme='dark';d.dataset.mode='${DEFAULT_MODE}'}})()`;
