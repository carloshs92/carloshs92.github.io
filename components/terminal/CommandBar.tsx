"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { pathLabel, useNavigate } from "@/components/providers/PageTransitions";
import { usePreferences } from "@/components/providers/Preferences";
import { triggerRain } from "@/components/effects/BinaryRain";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export type CommandBarPost = { slug: string; title: string; date: string };

type Line = { text: string; tone?: "accent" | "muted" | "danger" };

const SECTIONS: Record<string, string> = {
  "~": "/",
  "/": "/",
  inicio: "/",
  home: "/",
  perfil: "/perfil/",
  cv: "/perfil/",
  blog: "/blog/",
  proyectos: "/proyectos/",
  projects: "/proyectos/",
};

const HELP: Line[] = [
  { text: "comandos disponibles:", tone: "accent" },
  { text: "  ls [blog|proyectos]    lista secciones, posts o proyectos" },
  { text: "  cd <seccion>           navega: perfil, blog, proyectos, ~, .." },
  { text: "  cd blog/<post>         abre un post" },
  { text: "  open <proyecto>        abre la demo o el repo" },
  { text: "  cat cv                 ver el perfil de ingeniero" },
  { text: "  theme [dark|light]     cambia el tema" },
  { text: "  sound [on|off]         teclado mecánico" },
  { text: "  rain                   lluvia binaria ahora mismo" },
  { text: "  human                  modo humano: vista limpia sin animaciones" },
  { text: "  whoami | date | github | linkedin | clear" },
  { text: "  tip: TAB autocompleta, ↑/↓ historial, ESC cierra", tone: "muted" },
];

export default function CommandBar({ posts }: { posts: CommandBarPost[] }) {
  const pathname = usePathname();
  const navigate = useNavigate();
  const { setTheme, theme, setMuted, setMode } = usePreferences();
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
      return parts.length ? `/${parts.join("/")}/` : "/";
    }
    if (SECTIONS[a]) return SECTIONS[a];
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
        return print(HELP);
      case "clear":
        return print([]);
      case "ls": {
        if (arg.startsWith("blog"))
          return print(posts.map((p) => ({ text: `${p.date}  ${p.slug}.md` })));
        if (arg.startsWith("proyectos"))
          return print(projects.map((p) => ({ text: `${p.year}  ${p.slug}/` })));
        return print([
          { text: "drwxr-xr-x  perfil/      cv, habilidades y experiencia" },
          { text: "drwxr-xr-x  blog/        posts en markdown" },
          { text: "drwxr-xr-x  proyectos/   demos y aprendizajes" },
        ]);
      }
      case "cd":
      case "cat": {
        const target = resolvePath(arg || "~");
        if (!target) return print([{ text: `bash: ${name}: ${arg}: No existe el archivo o el directorio`, tone: "danger" }]);
        print([]);
        return navigate(target);
      }
      case "open": {
        const p = projects.find((x) => x.slug === arg || x.name.toLowerCase() === arg.toLowerCase());
        if (!p) return print([{ text: `open: ${arg || "?"}: proyecto no encontrado (prueba: ls proyectos)`, tone: "danger" }]);
        window.open(p.demo ?? p.repo, "_blank", "noopener");
        return print([{ text: `abriendo ${p.demo ?? p.repo} ...`, tone: "accent" }]);
      }
      case "theme": {
        const next = arg === "light" || arg === "dark" ? arg : theme === "dark" ? "light" : "dark";
        setTheme(next);
        return print([{ text: `tema → ${next}`, tone: "accent" }]);
      }
      case "sound":
      case "mute": {
        const off = name === "mute" || arg === "off";
        setMuted(off);
        return print([{ text: `sonido ${off ? "desactivado" : "activado"}`, tone: "accent" }]);
      }
      case "rain":
      case "matrix":
        triggerRain();
        return print([{ text: "01001100 01101100 01110101 01110110 01101001 01100001", tone: "accent" }]);
      case "whoami":
        return print([
          { text: profile.name, tone: "accent" },
          { text: profile.role },
          { text: `${profile.location} · en frontend desde ${profile.startYear}`, tone: "muted" },
        ]);
      case "date":
        return print([{ text: new Date().toString() }]);
      case "github":
      case "linkedin": {
        const href = profile.links[name as "github" | "linkedin"];
        window.open(href, "_blank", "noopener");
        return print([{ text: `abriendo ${href} ...`, tone: "accent" }]);
      }
      case "sudo":
        return print([{ text: "carlos no está en el archivo sudoers. Este incidente será reportado. 🚨", tone: "danger" }]);
      case "exit":
        return print([{ text: "No hay salida. Solo más código. :)", tone: "muted" }]);
      case "human":
      case "humano":
        setMode("human");
        return print([]);
      case "pwd":
        return print([{ text: `/home/carlos${pathname.replace(/\/+$/, "")}` }]);
      default:
        return print([{ text: `${name}: comando no encontrado. Escribe 'help'.`, tone: "danger" }]);
    }
  };

  const complete = () => {
    const [name, ...rest] = value.split(" ");
    const partial = rest.join(" ");
    let options: string[] = [];
    if (rest.length === 0) {
      options = ["help", "ls", "cd", "open", "cat", "theme", "sound", "rain", "human", "whoami", "clear", "github", "linkedin"];
      const hits = options.filter((o) => o.startsWith(name));
      if (hits.length === 1) setValue(`${hits[0]} `);
      else if (hits.length) print([{ text: hits.join("  "), tone: "muted" }]);
      return;
    }
    if (name === "cd" || name === "cat") options = ["perfil", "blog", "proyectos", "~", "..", ...posts.map((p) => `blog/${p.slug}`)];
    if (name === "open") options = projects.map((p) => p.slug);
    if (name === "ls") options = ["blog", "proyectos"];
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
          placeholder="escribe 'help' o presiona /"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal de comandos"
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
