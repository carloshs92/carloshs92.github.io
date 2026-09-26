"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathLabel, useExperience } from "./Experience";
import CommandBar, { type CommandBarPost } from "./CommandBar";

const NAV = [
  { href: "/", label: "inicio" },
  { href: "/perfil/", label: "perfil" },
  { href: "/blog/", label: "blog" },
  { href: "/proyectos/", label: "proyectos" },
];

export default function Header({ posts }: { posts: CommandBarPost[] }) {
  const pathname = usePathname();
  const { theme, setTheme, muted, setMuted } = useExperience();
  const current = pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 text-xs">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-danger" />
          <i className="size-2.5 rounded-full bg-accent-2" />
          <i className="size-2.5 rounded-full bg-accent" />
        </span>
        <span className="hidden truncate text-muted sm:inline">
          carlos@huamani: <span className="text-accent">{pathLabel(pathname)}</span>
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className="rounded border border-line px-2 py-1 text-muted hover:border-accent hover:text-accent"
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            title={muted ? "sound on" : "sound off"}
          >
            {muted ? "♪ off" : "♪ on"}
          </button>
          <button
            type="button"
            onClick={(e) => setTheme(theme === "dark" ? "light" : "dark", { x: e.clientX, y: e.clientY })}
            className="rounded border border-line px-2 py-1 text-muted hover:border-accent hover:text-accent"
            aria-label="Cambiar tema"
          >
            <span className="dark:hidden">☾ dark</span>
            <span className="hidden dark:inline">☀ light</span>
          </button>
        </div>
      </div>
      <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 text-sm" aria-label="Principal">
        {NAV.map((item) => {
          const active = item.href === "/" ? current === "/" : current.startsWith(item.href.replace(/\/$/, ""));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`glitch-hover -mb-px whitespace-nowrap border-b-2 px-3 py-2 ${
                active ? "border-accent text-accent glow" : "border-transparent text-muted hover:text-fg"
              }`}
            >
              {active ? "▸ " : "  "}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <CommandBar posts={posts} />
    </header>
  );
}
