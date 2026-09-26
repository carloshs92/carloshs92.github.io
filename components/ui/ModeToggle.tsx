"use client";

import { usePreferences } from "@/components/providers/Preferences";

type Props = { variant?: "compact" | "banner" };

/** Alterna entre modo terminal y modo humano. */
export default function ModeToggle({ variant = "compact" }: Props) {
  const { mode, setMode } = usePreferences();
  const toHuman = mode === "terminal";

  if (variant === "banner") {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded border border-accent-2/50 bg-bg-soft px-4 py-3 text-sm print:hidden" data-piece>
        <span className="text-accent-2">¿Eres reclutador?</span>
        <span className="text-muted">Mira este perfil como dashboard, sin animaciones.</span>
        <button
          type="button"
          onClick={() => setMode("human")}
          className="ml-auto rounded border border-accent-2 px-3 py-1 font-bold text-accent-2 hover:bg-accent-2 hover:text-bg"
        >
          modo humano →
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setMode(toHuman ? "human" : "terminal")}
      aria-pressed={!toHuman}
      className="rounded border border-line px-2 py-1 text-muted hover:border-accent hover:text-accent"
      title={toHuman ? "Vista limpia, sin animaciones" : "Volver a la experiencia terminal"}
    >
      {toHuman ? "◉ modo humano" : "›_ modo terminal"}
    </button>
  );
}
