type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

/** Contenedor base del dashboard. */
export default function Card({ title, subtitle, className = "", children }: Props) {
  return (
    <section className={`break-inside-avoid rounded-xl border border-line bg-panel p-5 shadow-sm print:shadow-none ${className}`}>
      {title && (
        <header className="mb-4">
          <h2 className="text-base font-semibold text-fg">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
