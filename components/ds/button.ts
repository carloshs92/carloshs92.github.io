// Clases de botón del design system. Es una función (no un componente) para
// poder aplicarla igual a <Link>, <a>, <button> o <PrintButton>.
// Se adapta sola al modo: esquinas rectas y texto en negrita en terminal,
// redondeado y peso medio en humano.

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded border font-bold transition-colors human:rounded-lg human:font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  /** Una sola acción principal por bloque. */
  primary: "border-accent bg-accent text-bg hover:opacity-90",
  secondary: "border-line bg-panel text-fg hover:border-accent hover:text-accent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
};

export function buttonClass({ variant = "secondary", size = "sm" }: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
