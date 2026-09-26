// Fechas del CV en formato "YYYY" o "YYYY-MM". Sin `to` = actualidad.

const MONTHS = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."];

type YearMonth = { year: number; month: number | null };

export function parseYearMonth(value: string): YearMonth {
  const [y, m] = value.split("-").map(Number);
  return { year: y, month: m ? m : null };
}

/** Meses desde el año 0, para calcular duraciones y posiciones en el tiempo. */
export function toMonthIndex(value?: string, now = new Date()) {
  if (!value) return now.getFullYear() * 12 + now.getMonth();
  const { year, month } = parseYearMonth(value);
  return year * 12 + (month ?? 1) - 1;
}

export function formatYearMonth(value?: string) {
  if (!value) return "actualidad";
  const { year, month } = parseYearMonth(value);
  return month ? `${MONTHS[month - 1]} ${year}` : String(year);
}

export function formatRange(from: string, to?: string) {
  return `${formatYearMonth(from)} – ${formatYearMonth(to)}`;
}

/** Duración inclusiva, como la muestra LinkedIn: "3 años 1 mes". */
export function durationMonths(from: string, to?: string) {
  return Math.max(1, toMonthIndex(to) - toMonthIndex(from) + 1);
}

export function formatDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} año${y === 1 ? "" : "s"}`);
  if (m) parts.push(`${m} mes${m === 1 ? "" : "es"}`);
  return parts.join(" ");
}
