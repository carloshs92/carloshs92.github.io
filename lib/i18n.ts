// Idiomas del sitio. El español vive en las rutas de siempre (/perfil/, /proyectos/…)
// y el inglés bajo /en/ con rutas propias (/en/profile/, /en/projects/…).
// Los posts del blog solo existen en español.

export type Locale = "es" | "en";
export const LOCALES: Locale[] = ["es", "en"];
export const SITE = "https://carloshuamani.com";

/** Texto traducible: un string sirve para ambos idiomas (nombres propios, tecnologías). */
export type Text = string | { es: string; en: string };

export const tr = (text: Text, locale: Locale) => (typeof text === "string" ? text : text[locale]);

export type RouteKey = "home" | "profile" | "blog" | "projects" | "work";

export const ROUTES: Record<RouteKey, Record<Locale, string>> = {
  home: { es: "/", en: "/en/" },
  profile: { es: "/perfil/", en: "/en/profile/" },
  blog: { es: "/blog/", en: "/en/blog/" },
  projects: { es: "/proyectos/", en: "/en/projects/" },
  work: { es: "/trabajemos-juntos/", en: "/en/work-with-me/" },
};

export const href = (key: RouteKey, locale: Locale) => ROUTES[key][locale];

const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export const localeFromPath = (pathname: string): Locale => (/^\/en(\/|$)/.test(pathname) ? "en" : "es");

/** La misma página en el otro idioma; si no tiene traducción (un post), su sección o el inicio. */
export function alternatePath(pathname: string, target: Locale): string {
  const p = norm(pathname);
  const from = localeFromPath(p);
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (ROUTES[key][from] === p) return ROUTES[key][target];
  }
  if (p.startsWith("/blog/") || p.startsWith("/en/blog/")) return ROUTES.blog[target];
  return ROUTES.home[target];
}

/** Metadatos de idioma de una página traducida: canonical + hreflang. */
export function languageAlternates(key: RouteKey, locale: Locale) {
  return {
    canonical: ROUTES[key][locale],
    languages: { es: ROUTES[key].es, en: ROUTES[key].en, "x-default": ROUTES[key].es },
  };
}

export const dateLocale: Record<Locale, string> = { es: "es-PE", en: "en-US" };
