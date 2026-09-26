"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded border border-accent px-3 py-1.5 text-accent hover:bg-accent hover:text-bg print:hidden"
    >
      ./exportar-cv.pdf
    </button>
  );
}
