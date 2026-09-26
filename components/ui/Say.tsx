/**
 * Texto con dos voces: jerga de terminal o lenguaje llano en modo humano.
 * Ej.: <Say terminal="git clone ↗" human="Repositorio" />
 */
export default function Say({ terminal, human }: { terminal: React.ReactNode; human: React.ReactNode }) {
  return (
    <>
      <span className="human:hidden">{terminal}</span>
      <span className="hidden human:inline">{human}</span>
    </>
  );
}
