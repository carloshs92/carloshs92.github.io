"use client";

import { useEffect } from "react";
import { keyClick } from "@/lib/sound";

/** Sonido de tecla mecánica en cada click y al escribir en inputs. */
export default function KeySounds() {
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
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
