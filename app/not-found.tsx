import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6 py-10">
      <pre className="glow text-5xl font-extrabold text-danger sm:text-7xl">404</pre>
      <p className="text-sm">
        <span className="text-danger">bash: cd:</span> esa ruta no existe: No such file or directory
      </p>
      <p className="text-muted">Quizás el directorio fue movido, o nunca existió. Prueba con `ls` en la barra de comandos.</p>
      <Link href="/" className="inline-block rounded border border-accent px-4 py-2 text-accent hover:bg-accent hover:text-bg">
        $ cd ~
      </Link>
    </div>
  );
}
