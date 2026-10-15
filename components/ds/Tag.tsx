type Props = {
  children: React.ReactNode;
  /** stack: tecnología · pill: etiqueta suave (habilidades blandas, filtros) */
  variant?: "stack" | "pill";
};

const variants = {
  stack: "rounded bg-bg-soft px-2 py-0.5 text-[11px] text-accent human:rounded-md human:text-xs human:text-muted",
  pill: "rounded-full border border-line px-3 py-1 text-sm text-fg",
};

/** Etiqueta corta: tecnologías de un proyecto o una habilidad. */
export default function Tag({ children, variant = "stack" }: Props) {
  return <span className={variants[variant]}>{children}</span>;
}
