"use client";

import { useEffect, useRef } from "react";
import { motionEnabled } from "@/lib/preferences";

const RAIN_EVENT = "binary-rain";

/** Dispara la lluvia a demanda (p. ej. el comando `rain`). */
export const triggerRain = () => window.dispatchEvent(new Event(RAIN_EVENT));

/** Lluvia de 0 y 1 que aparece esporádicamente detrás del contenido. */
export default function BinaryRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const c = canvas.getContext("2d")!;
    const size = 16;
    let w = 0;
    let h = 0;
    let drops: { y: number; speed: number; active: boolean }[] = [];
    let raf = 0;
    let running = false;
    let stopAt = 0;
    let timer: ReturnType<typeof setTimeout>;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.ceil(w / size) }, () => ({ y: 0, speed: 0, active: false }));
    };

    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--rain").trim() || "57,255,136";

    const frame = (now: number) => {
      const rgb = color();
      // desvanece lo dibujado sin pintar fondo (canvas transparente)
      c.globalCompositeOperation = "destination-out";
      c.fillStyle = "rgba(0,0,0,0.08)";
      c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = "source-over";
      c.font = `${size - 2}px ${getComputedStyle(document.body).fontFamily}`;

      const spawning = now < stopAt;
      let alive = 0;
      drops.forEach((d, i) => {
        if (!d.active) {
          if (spawning && Math.random() < 0.012) {
            d.active = true;
            d.y = -Math.random() * 20;
            d.speed = 0.18 + Math.random() * 0.32;
          } else return;
        }
        alive++;
        const x = i * size;
        const y = Math.floor(d.y) * size;
        const ch = Math.random() > 0.5 ? "1" : "0";
        c.fillStyle = `rgba(${rgb},0.95)`;
        c.fillText(ch, x, y);
        c.fillStyle = `rgba(${rgb},0.35)`;
        c.fillText(Math.random() > 0.5 ? "1" : "0", x, y - size);
        d.y += d.speed;
        if (y > h + size * 2) d.active = false;
      });

      if (alive === 0 && !spawning) {
        running = false;
        c.clearRect(0, 0, w, h);
        schedule();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = (duration = 6000 + Math.random() * 4000) => {
      if (!motionEnabled()) return schedule();
      stopAt = performance.now() + duration;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.visibilityState === "visible") start();
        else schedule();
      }, 14000 + Math.random() * 22000);
    };

    const onManual = () => start(9000);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener(RAIN_EVENT, onManual);
    timer = setTimeout(() => start(), 3500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
      window.removeEventListener(RAIN_EVENT, onManual);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-30 human:hidden dark:opacity-40" />;
}
