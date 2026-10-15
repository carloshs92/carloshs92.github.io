export type BarItem = { name: string; level: number };

export function levelLabel(level: number) {
  if (level >= 90) return "Experto";
  if (level >= 75) return "Avanzado";
  if (level >= 60) return "Intermedio";
  return "En aprendizaje";
}

/**
 * Barras horizontales de una sola serie (0–100): etiqueta a la izquierda,
 * valor al final de la barra y tooltip al pasar el mouse.
 */
export default function BarList({ items, max = 100 }: { items: BarItem[]; max?: number }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const pct = Math.min(100, (item.level / max) * 100);
        return (
          <li key={item.name} className="group relative grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_2rem] sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_2.5rem] items-center gap-3 text-sm">
            <span className="truncate text-fg" title={item.name}>
              {item.name}
            </span>
            <span className="relative h-2.5 rounded-r-[4px] bg-chart-track" aria-hidden>
              <span className="absolute inset-y-0 left-0 rounded-r-[4px] bg-chart-1" style={{ width: `${pct}%` }} />
            </span>
            <span className="text-right tabular-nums text-muted">{item.level}</span>
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-9 left-1/3 sm:left-52 z-10 hidden whitespace-nowrap rounded-md border border-line bg-panel px-2.5 py-1 text-xs text-fg shadow-md group-hover:block print:hidden"
            >
              {item.name}: <b>{item.level}</b>/100 · {levelLabel(item.level)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
