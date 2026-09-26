"use client";

/** Abre el diálogo de impresión; el CSS de impresión deja un CV limpio listo para PDF. */
export default function PrintButton({ className = "", children = "./exportar-cv.pdf" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className || "rounded border border-accent px-3 py-1.5 text-accent hover:bg-accent hover:text-bg print:hidden"}
    >
      {children}
    </button>
  );
}
