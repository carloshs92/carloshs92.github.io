/**
 * Renderiza una vista distinta por modo. Ambas se generan en el HTML estático
 * y el CSS muestra la que corresponde según `data-mode` en <html>, así no hay
 * parpadeo al cargar. Al imprimir siempre sale la vista humana.
 *
 * Para darle vista humana a otra página basta con envolverla en <ModeView>.
 */
export default function ModeView({ terminal, human }: { terminal: React.ReactNode; human: React.ReactNode }) {
  return (
    <>
      <div className="human:hidden print:hidden">{terminal}</div>
      <div className="hidden human:block print:block">{human}</div>
    </>
  );
}
