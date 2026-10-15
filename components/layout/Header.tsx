"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePreferences } from "@/components/providers/Preferences";
import { pathLabel } from "@/components/providers/PageTransitions";
import CommandBar, { type CommandBarPost } from "@/components/terminal/CommandBar";
import ModeToggle from "@/components/ui/ModeToggle";
import { profile } from "@/data/profile";
import { alternatePath, href, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

const NAV: Record<Locale, { href: string; label: string; human: string }[]> = {
  es: [
    { href: href("home", "es"), label: "inicio", human: "Inicio" },
    { href: href("profile", "es"), label: "perfil", human: "Perfil" },
    { href: href("blog", "es"), label: "blog", human: "Blog" },
    { href: href("projects", "es"), label: "proyectos", human: "Proyectos" },
  ],
  en: [
    { href: href("home", "en"), label: "home", human: "Home" },
    { href: href("profile", "en"), label: "profile", human: "Profile" },
    { href: href("blog", "en"), label: "blog", human: "Blog" },
    { href: href("projects", "en"), label: "projects", human: "Projects" },
  ],
};

const COPY = {
  es: { unmute: "Activar sonido", mute: "Silenciar", theme: "Cambiar tema", nav: "Principal", other: "en" as Locale, switchLabel: "Read in English" },
  en: { unmute: "Turn sound on", mute: "Mute", theme: "Toggle theme", nav: "Main", other: "es" as Locale, switchLabel: "Leer en español" },
};

const chip = "rounded border border-line px-2 py-1 text-muted hover:border-accent hover:text-accent";

export default function Header({ posts }: { posts: CommandBarPost[] }) {
  const pathname = usePathname();
  const { theme, setTheme, muted, setMuted } = usePreferences();
  const current = pathname.replace(/\/+$/, "") || "/";
  const locale = useLocale();
  const t = COPY[locale];
  const home = href("home", locale);

  // al navegar entre idiomas sin recargar, mantiene <html lang> al día
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
        <Link href={home} className="hidden text-sm font-semibold text-fg human:inline">
          {profile.name}
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <Link href={alternatePath(pathname, t.other)} hrefLang={t.other} lang={t.other} className={chip} aria-label={t.switchLabel} title={t.switchLabel}>
            {t.other.toUpperCase()}
          </Link>
          <ModeToggle />
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className={`${chip} human:hidden`}
            aria-label={muted ? t.unmute : t.mute}
          >
            {muted ? "♪ off" : "♪ on"}
          </button>
          <button
            type="button"
            onClick={(e) => setTheme(theme === "dark" ? "light" : "dark", { x: e.clientX, y: e.clientY })}
            className={chip}
            aria-label={t.theme}
          >
            <span className="dark:hidden">☾ dark</span>
            <span className="hidden dark:inline">☀ light</span>
          </button>
        </div>
      </div>

      <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 text-sm" aria-label={t.nav}>
        {NAV[locale].map((item) => {
          const target = item.href.replace(/\/+$/, "") || "/";
          const active = item.href === home ? current === target : current.startsWith(target);
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
