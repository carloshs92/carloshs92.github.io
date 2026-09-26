import { formatDuration, formatRange } from "@/lib/dates";
import { timeline } from "@/lib/profile";

/** Diagrama de Gantt de la trayectoria: una fila por puesto sobre un eje de años. */
export default function ExperienceTimeline() {
  const rows = timeline();
  const firstYear = Math.min(...rows.map((r) => Math.floor(r.start / 12)));
  const lastYear = Math.max(...rows.map((r) => Math.ceil(r.end / 12)));
  const min = firstYear * 12;
  const span = lastYear * 12 - min;
  const pos = (month: number) => ((month - min) / span) * 100;
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);

  return (
    <div>
      <div className="mb-3 flex gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-4 rounded-[3px] bg-chart-1" /> Puesto actual
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-4 rounded-[3px] bg-chart-2" /> Puestos anteriores
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[14rem_minmax(0,1fr)]">
        {/* eje de años */}
        <div className="hidden sm:block" />
        <div className="relative h-6 text-[11px] text-muted" aria-hidden>
          {years.map((y) => (
            <span key={y} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${pos(y * 12)}%` }}>
              {y % 2 === 0 || y === firstYear ? `'${String(y).slice(2)}` : ""}
            </span>
          ))}
        </div>

        {rows.map(({ job, start, end, months }) => {
          const current = !job.to;
          const tip = `${job.role} · ${job.company} — ${formatRange(job.from, job.to)} (${formatDuration(months)})`;
          return (
            <div key={`${job.company}-${job.from}`} className="contents">
              <div className="pt-3 text-sm sm:py-2">
                <p className="truncate font-medium text-fg" title={job.company}>
                  {job.company}
                </p>
                <p className="truncate text-xs text-muted">{formatDuration(months)}</p>
              </div>
              <div className="group relative h-10 sm:h-auto">
                {/* líneas de año, recesivas */}
                {years.map((y) => (
                  <span key={y} className="absolute inset-y-0 w-px bg-line" style={{ left: `${pos(y * 12)}%` }} aria-hidden />
                ))}
                <span
                  className={`absolute top-1/2 h-5 -translate-y-1/2 rounded-[4px] ${current ? "bg-chart-1" : "bg-chart-2"}`}
                  style={{ left: `${pos(start)}%`, width: `${Math.max(pos(end) - pos(start), 1)}%` }}
                  role="img"
                  aria-label={tip}
                />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full z-10 mb-1 hidden max-w-xs rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs text-fg shadow-md group-hover:block print:hidden"
                  style={{ left: `${Math.min(pos(start), 60)}%` }}
                >
                  <b>{job.role}</b>
                  <br />
                  {job.company} · {formatRange(job.from, job.to)} ({formatDuration(months)})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
