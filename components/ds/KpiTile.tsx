type Props = {
  label: string;
  value: React.ReactNode;
  detail?: string;
  /** El número principal del dashboard (solo uno por vista). */
  hero?: boolean;
};

export default function KpiTile({ label, value, detail, hero = false }: Props) {
  return (
    <div className="break-inside-avoid rounded-xl border border-line bg-panel p-5 shadow-sm print:shadow-none">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={`mt-1 font-semibold text-fg ${hero ? "text-5xl tracking-tight" : "text-2xl"}`}>{value}</p>
      {detail && <p className="mt-1 text-xs text-muted">{detail}</p>}
    </div>
  );
}
