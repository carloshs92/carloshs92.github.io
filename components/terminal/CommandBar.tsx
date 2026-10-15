"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { pathLabel, useNavigate } from "@/components/providers/PageTransitions";
import { usePreferences } from "@/components/providers/Preferences";
import { triggerRain } from "@/components/effects/BinaryRain";
import { profile } from "@/data/profile";
import { primaryLink, projects } from "@/data/projects";
import { alternatePath, href, tr, type Locale, type RouteKey } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

export type CommandBarPost = { slug: string; title: string; date: string };

type Line = { text: string; tone?: "accent" | "muted" | "danger" };

/** Nombres de sección que entiende `cd`, en ambos idiomas; llevan a la ruta del idioma actual. */
const SECTIONS: Record<string, RouteKey> = {
  "~": "home",
  "/": "home",
  inicio: "home",
  home: "home",
  perfil: "profile",
  profile: "profile",
  cv: "profile",
  blog: "blog",
  proyectos: "projects",
  projects: "projects",
};

const COPY = {
  es: {
    help: [
      { text: "comandos disponibles:", tone: "accent" },
      { text: "  ls [blog|proyectos]    lista secciones, posts o proyectos" },
      { text: "  cd <seccion>           navega: perfil, blog, proyectos, ~, .." },
      { text: "  cd blog/<post>         abre un post" },
      { text: "  open <proyecto>        abre la demo o el repo" },
      { text: "  cat cv                 ver el perfil de ingeniero" },
      { text: "  theme [dark|light]     cambia el tema" },
      { text: "  sound [on|off]         teclado mecánico" },
      { text: "  lang [es|en]           cambia el idioma" },
      { text: "  rain                   lluvia binaria ahora mismo" },
      { text: "  human                  modo humano: vista limpia sin animaciones" },
      { text: "  whoami | date | github | linkedin | clear" },
      { text: "  tip: TAB autocompleta, ↑/↓ historial, ESC cierra", tone: "muted" },
    ] as Line[],
    sections: ["perfil", "blog", "proyectos"],
    ls: [
      { text: "drwxr-xr-x  perfil/      stats, habilidades y certificaciones" },
      { text: "drwxr-xr-x  blog/        posts en markdown" },
      { text: "drwxr-xr-x  proyectos/   demos y aprendizajes" },
    ] as Line[],
    notFound: (name: string, arg: string) => `bash: ${name}: ${arg}: No existe el archivo o el directorio`,
    noProject: (arg: string) => `open: ${arg}: proyecto no encontrado (prueba: ls proyectos)`,
    noLink: (slug: string) => `open: ${slug}: sin enlace público`,
    opening: (url: string) => `abriendo ${url} ...`,
    theme: "tema",
    sound: (off: boolean) => `sonido ${off ? "desactivado" : "activado"}`,
    since: "en frontend desde",
    sudo: "carlos no está en el archivo sudoers. Este incidente será reportado. 🚨",
    exit: "No hay salida. Solo más código. :)",
    lang: (l: string) => `idioma → ${l}`,
    unknown: (name: string) => `${name}: comando no encontrado. Escribe 'help'.`,
    placeholder: "escribe 'help' o presiona /",
    label: "Terminal de comandos",
  },
  en: {
    help: [
      { text: "available commands:", tone: "accent" },
      { text: "  ls [blog|projects]     list sections, posts or projects" },
      { text: "  cd <section>           go to: profile, blog, projects, ~, .." },
      { text: "  cd blog/<post>         open a post" },
      { text: "  open <project>         open the demo or repo" },
      { text: "  cat cv                 view the engineer profile" },
      { text: "  theme [dark|light]     switch theme" },
      { text: "  sound [on|off]         mechanical keyboard" },
      { text: "  lang [es|en]           switch language" },
      { text: "  rain                   binary rain right now" },
      { text: "  human                  human mode: clean view, no animations" },
      { text: "  whoami | date | github | linkedin | clear" },
      { text: "  tip: TAB completes, ↑/↓ history, ESC closes", tone: "muted" },
    ] as Line[],
    sections: ["profile", "blog", "projects"],
    ls: [
      { text: "drwxr-xr-x  profile/     stats, skills and certifications" },
      { text: "drwxr-xr-x  blog/        markdown posts (in Spanish)" },
      { text: "drwxr-xr-x  projects/    demos and learning" },
    ] as Line[],
    notFound: (name: string, arg: string) => `bash: ${name}: ${arg}: No such file or directory`,
    noProject: (arg: string) => `open: ${arg}: project not found (try: ls projects)`,
    noLink: (slug: string) => `open: ${slug}: no public link`,
    opening: (url: string) => `opening ${url} ...`,
    theme: "theme",
    sound: (off: boolean) => `sound ${off ? "off" : "on"}`,
    since: "in frontend since",
    sudo: "carlos is not in the sudoers file. This incident will be reported. 🚨",
    exit: "There is no exit. Only more code. :)",
    lang: (l: string) => `language → ${l}`,
    unknown: (name: string) => `${name}: command not found. Type 'help'.`,
    placeholder: "type 'help' or press /",
    label: "Command terminal",
  },
} satisfies Record<Locale, unknown>;

export default function CommandBar({ posts }: { posts: CommandBarPost[] }) {
  const pathname = usePathname();
  const navigate = useNavigate();
  const { setTheme, theme, setMuted, setMode } = usePreferences();
  const locale = useLocale();
  const t = COPY[locale];
  const [value, setValue] = useState("");
  const [output, setOutput] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const history = useRef<string[]>([]);
  const hIndex = useRef(-1);
  const input = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  // "/" enfoca la terminal desde cualquier parte
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && t.tagName !== "INPUT" && t.tagName !== "TEXTAREA") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const print = (lines: Line[]) => {
    setOutput(lines);
    setOpen(lines.length > 0);
  };

  const resolvePath = (arg: string): string | null => {
    const a = arg.replace(/^~\//, "").replace(/\/+$/, "");
    if (a === "..") {
      const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
      parts.pop();
      return parts.length ? `/${parts.join("/")}/` : href("home", locale);
    }
    if (SECTIONS[a]) return href(SECTIONS[a], locale);
    const m = a.match(/^blog\/(.+)$/);
    if (m && posts.some((p) => p.slug === m[1])) return `/blog/${m[1]}/`;
    return null;
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    history.current.unshift(cmd);
    hIndex.current = -1;
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");

    switch (name.toLowerCase()) {
      case "help":
      case "?":
        return print(t.help);
      case "clear":
        return print([]);
      case "ls": {
        if (arg.startsWith("blog"))
          return print(posts.map((p) => ({ text: `${p.date}  ${p.slug}.md` })));
        if (arg.startsWith("proyectos") || arg.startsWith("projects"))
          return print(projects.map((p) => ({ text: `${p.year}  ${p.slug}/` })));
        return print(t.ls);
      }
      case "cd":
      case "cat": {
        const target = resolvePath(arg || "~");
        if (!target) return print([{ text: t.notFound(name, arg), tone: "danger" }]);
        print([]);
        return navigate(target);
      }
      case "open": {
        const p = projects.find((x) => x.slug === arg || tr(x.name, locale).toLowerCase() === arg.toLowerCase());
        if (!p) return print([{ text: t.noProject(arg || "?"), tone: "danger" }]);
        const url = primaryLink(p);
        if (!url) return print([{ text: t.noLink(p.slug), tone: "danger" }]);
        window.open(url, "_blank", "noopener");
        return print([{ text: t.opening(url), tone: "accent" }]);
      }
      case "theme": {
        const next = arg === "light" || arg === "dark" ? arg : theme === "dark" ? "light" : "dark";
        setTheme(next);
        return print([{ text: `${t.theme} → ${next}`, tone: "accent" }]);
      }
      case "sound":
      case "mute": {
        const off = name === "mute" || arg === "off";
        setMuted(off);
        return print([{ text: t.sound(off), tone: "accent" }]);
      }
      case "rain":
      case "matrix":
        triggerRain();
        return print([{ text: "01001100 01101100 01110101 01110110 01101001 01100001", tone: "accent" }]);
      case "whoami":
        return print([
          { text: profile.name, tone: "accent" },
          { text: tr(profile.role, locale) },
          { text: `${tr(profile.location, locale)} · ${t.since} ${profile.startYear}`, tone: "muted" },
        ]);
      case "date":
        return print([{ text: new Date().toString() }]);
      case "github":
      case "linkedin": {
        const link = profile.links[name as "github" | "linkedin"];
        window.open(link, "_blank", "noopener");
        return print([{ text: t.opening(link), tone: "accent" }]);
      }
      case "sudo":
        return print([{ text: t.sudo, tone: "danger" }]);
      case "exit":
        return print([{ text: t.exit, tone: "muted" }]);
      case "human":
      case "humano":
        setMode("human");
        return print([]);
      case "lang":
      case "idioma": {
        const next: Locale = arg === "es" || arg === "en" ? arg : locale === "es" ? "en" : "es";
        if (next === locale) return print([{ text: t.lang(next), tone: "muted" }]);
        print([]);
        return navigate(alternatePath(pathname, next));
      }
      case "pwd":
        return print([{ text: `/home/carlos${pathname.replace(/\/+$/, "")}` }]);
      default:
        return print([{ text: t.unknown(name), tone: "danger" }]);
    }
  };

  const complete = () => {
    const [name, ...rest] = value.split(" ");
    const partial = rest.join(" ");
    let options: string[] = [];
    if (rest.length === 0) {
      options = ["help", "ls", "cd", "open", "cat", "theme", "sound", "lang", "rain", "human", "whoami", "clear", "github", "linkedin"];
      const hits = options.filter((o) => o.startsWith(name));
      if (hits.length === 1) setValue(`${hits[0]} `);
      else if (hits.length) print([{ text: hits.join("  "), tone: "muted" }]);
      return;
    }
    if (name === "cd" || name === "cat") options = [...t.sections, "~", "..", ...posts.map((p) => `blog/${p.slug}`)];
    if (name === "open") options = projects.map((p) => p.slug);
    if (name === "ls") options = t.sections.slice(1);
    if (name === "lang") options = ["es", "en"];
    if (name === "theme") options = ["dark", "light"];
    if (name === "sound") options = ["on", "off"];
    const hits = options.filter((o) => o.startsWith(partial));
    if (hits.length === 1) setValue(`${name} ${hits[0]}`);
    else if (hits.length) print([{ text: hits.join("  "), tone: "muted" }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      hIndex.current = Math.min(hIndex.current + 1, history.current.length - 1);
      setValue(history.current[hIndex.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIndex.current = Math.max(hIndex.current - 1, -1);
      setValue(hIndex.current < 0 ? "" : history.current[hIndex.current]);
    } else if (e.key === "Escape") {
      setOpen(false);
      input.current?.blur();
    }
  };

  const tone = { accent: "text-accent", muted: "text-muted", danger: "text-danger" } as const;

  return (
    <div ref={wrap} className="relative border-t border-line">
      <label className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2 text-sm">
        <span className="shrink-0 text-accent">
          <span className="hidden sm:inline">carlos@huamani:</span>
          <span className="text-accent-3">{pathLabel(pathname)}</span>$
        </span>
        <input
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => output.length && setOpen(true)}
          placeholder={t.placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label={t.label}
          className="w-full bg-transparent text-fg caret-accent outline-none placeholder:text-dim"
        />
      </label>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-line bg-panel shadow-2xl shadow-black/40">
          <pre className="mx-auto max-h-[50vh] max-w-5xl overflow-auto whitespace-pre-wrap px-4 py-3 text-xs leading-relaxed sm:text-sm">
            {output.map((l, i) => (
              <div key={i} className={l.tone ? tone[l.tone] : "text-fg"}>
                {l.text}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
