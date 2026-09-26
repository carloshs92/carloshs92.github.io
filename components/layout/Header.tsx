"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePreferences } from "@/components/providers/Preferences";
import { pathLabel } from "@/components/providers/PageTransitions";
import CommandBar, { type CommandBarPost } from "@/components/terminal/CommandBar";
import ModeToggle from "@/components/ui/ModeToggle";
import { profile } from "@/data/profile";

const NAV = [
  { href: "/", label: "inicio", human: "Inicio" },
  { href: "/perfil/", label: "perfil", human: "Perfil" },
  { href: "/blog/", label: "blog", human: "Blog" },
  { href: "/proyectos/", label: "proyectos", human: "Proyectos" },
];

const chip = "rounded border border-line px-2 py-1 text-muted hover:border-accent hover:text-accent";

export default function Header({ posts }: { posts: CommandBarPost[] }) {
  const pathname = usePathname();
  const { theme, setTheme, muted, setMuted } = usePreferences();
  const current = pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 text-xs">
        {/* terminal: barra de ventana · humano: nombre */}
        <span className="flex gap-1.5 human:hidden" aria-hidden>
          <i className="size-2.5 rounded-full bg-danger" />
          <i className="size-2.5 rounded-full bg-accent-2" />
          <i className="size-2.5 rounded-full bg-accent" />
        </span>
        <span className="hidden truncate text-muted sm:inline human:hidden">
          carlos@huamani: <span className="text-accent">{pathLabel(pathname)}</span>
        </span>
        <Link href="/" className="hidden text-sm font-semibold text-fg human:inline">
          {profile.name}
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <ModeToggle />
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className={`${chip} human:hidden`}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
          >
            {muted ? "♪ off" : "♪ on"}
          </button>
          <button
            type="button"
            onClick={(e) => setTheme(theme === "dark" ? "light" : "dark", { x: e.clientX, y: e.clientY })}
            className={chip}
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
              aria-current={active ? "page" : undefined}
              className={`glitch-hover -mb-px whitespace-nowrap border-b-2 px-3 py-2 ${
                active ? "border-accent text-accent glow" : "border-transparent text-muted hover:text-fg"
              }`}
            >
              <span className="human:hidden">
                {active ? "▸ " : "  "}
                {item.label}
              </span>
              <span className="hidden human:inline">{item.human}</span>
            </Link>
          );
        })}
      </nav>

      <div className="human:hidden">
        <CommandBar posts={posts} />
      </div>
    </header>
  );
}
