"use client";

import { useEffect, useState } from "react";
import { motionEnabled } from "@/lib/preferences";

/** Escribe `text` letra por letra, como si alguien lo tecleara. */
export default function Typewriter({ text, delay = 0, speed = 55, className = "" }: { text: string; delay?: number; speed?: number; className?: string }) {
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    if (!motionEnabled()) return;
    setCount(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i++;
      setCount(i);
      if (i < text.length) timer = setTimeout(step, speed + Math.random() * speed);
    };
    timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, count)}
      {count < text.length && <span className="cursor" />}
    </span>
  );
}
