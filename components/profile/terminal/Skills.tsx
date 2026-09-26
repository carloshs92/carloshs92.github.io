"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill, SkillGroup } from "@/data/profile";

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function useCount(target: number, run: boolean, duration = 1100) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return n;
}

const tier = (level: number) => (level >= 90 ? "bg-accent" : level >= 75 ? "bg-accent-3" : level >= 60 ? "bg-accent-2" : "bg-muted");

/** Gauge grande estilo htop para las habilidades principales. */
export function FeaturedSkill({ skill, index }: { skill: Skill; index: number }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = useCount(skill.level, seen);
  const blocks = 24;
  const filled = Math.round((n / 100) * blocks);
  return (
    <div ref={ref} className="term-window p-4" data-piece>
      <div className="flex items-baseline justify-between">
        <span className="font-bold text-fg">
          <span className="text-dim">{String(index + 1).padStart(2, "0")} </span>
          {skill.name}
        </span>
        <span className="glow text-2xl font-extrabold tabular-nums text-accent">{n}%</span>
      </div>
      <div className="mt-3 flex gap-[3px]" aria-hidden>
        {Array.from({ length: blocks }, (_, i) => (
          <i
            key={i}
            className={`h-5 flex-1 rounded-[2px] transition-colors duration-150 ${i < filled ? "bg-accent" : "bg-line"}`}
            style={{ opacity: i < filled ? 0.55 + (i / blocks) * 0.45 : 1 }}
          />
        ))}
      </div>
      <div className="mt-2 text-xs text-muted" role="meter" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
        [{"|".repeat(Math.round(filled * 1.2)).padEnd(29, " ")}] nivel {skill.level >= 90 ? "experto" : "avanzado"}
      </div>
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  const [ref, seen] = useInView<HTMLLIElement>();
  const n = useCount(skill.level, seen, 900);
  return (
    <li ref={ref} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[16rem_minmax(0,1fr)_3rem]">
      <span className="truncate text-sm text-fg">{skill.name}</span>
      <span className="text-right text-sm tabular-nums text-muted sm:order-last">{n}%</span>
      <span className="col-span-2 h-2 overflow-hidden rounded-full bg-line sm:col-span-1">
        {seen && <span className={`meter-fill block h-full rounded-full ${tier(skill.level)}`} style={{ width: `${skill.level}%` }} />}
      </span>
    </li>
  );
}

export function SkillTabs({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active)!;
  const avg = Math.round(group.skills.reduce((s, k) => s + k.level, 0) / group.skills.length);

  return (
    <div className="term-window" data-piece>
      <div className="term-bar flex-wrap">
        <span className="mr-2">htop --skills</span>
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g.id)}
            className={`rounded px-2 py-0.5 ${g.id === active ? "bg-accent text-bg" : "hover:text-accent"}`}
          >
            [{g.label}]
          </button>
        ))}
        <span className="ml-auto hidden sm:inline">
          avg <span className="text-accent">{avg}%</span> · {group.skills.length} procesos
        </span>
      </div>
      <ul key={active} className="space-y-3 p-5">
        {group.skills.map((s) => (
          <SkillRow key={s.name} skill={s} />
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 border-t border-line px-5 py-2 text-xs text-muted">
        <span><i className="mr-1 inline-block size-2 rounded-full bg-accent" />experto 90+</span>
        <span><i className="mr-1 inline-block size-2 rounded-full bg-accent-3" />avanzado 75+</span>
        <span><i className="mr-1 inline-block size-2 rounded-full bg-accent-2" />intermedio 60+</span>
        <span><i className="mr-1 inline-block size-2 rounded-full bg-muted" />en aprendizaje</span>
      </div>
    </div>
  );
}

export function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = useCount(value, seen);
  return (
    <div ref={ref} className="rounded border border-line p-4" data-piece>
      <div className="glow text-3xl font-extrabold tabular-nums text-accent">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}
