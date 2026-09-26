"use client";

import { createElement, useEffect, useRef } from "react";
import { motionEnabled } from "@/lib/preferences";

const CHARS = "01<>/{}[]#$%&*+=_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  delay?: number;
  duration?: number;
};

/** Texto que se "decodifica" desde glifos aleatorios al montarse. */
export default function Scramble({ text, as = "span", className, delay = 120, duration = 750 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionEnabled()) return;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now + delay;
      const p = Math.max(0, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < revealed || ch === " " ? ch : CHARS[(Math.random() * CHARS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, delay, duration]);

  return createElement(as, { ref, className, "aria-label": text }, text);
}
