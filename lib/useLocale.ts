"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "@/lib/i18n";

/** Idioma de la página actual, para componentes de cliente. */
export function useLocale(): Locale {
  return localeFromPath(usePathname() ?? "/");
}
