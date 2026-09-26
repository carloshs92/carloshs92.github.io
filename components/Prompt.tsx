/** Línea de comando decorativa: `carlos@huamani:~$ comando` */
export default function Prompt({ cmd, path = "~", className = "" }: { cmd: string; path?: string; className?: string }) {
  return (
    <p className={`text-sm ${className}`} data-piece>
      <span className="text-accent">carlos@huamani</span>
      <span className="text-muted">:</span>
      <span className="text-accent-3">{path}</span>
      <span className="text-muted">$ </span>
      <span className="text-fg">{cmd}</span>
    </p>
  );
}
