import Link from "next/link";

// Una sola página 404 para todo el sitio (GitHub Pages sirve 404.html), por eso va en ambos idiomas.
// Antes, carloshuamani.com servía la publicación de Medium, con URLs como /titulo-del-post-1a2b3c4d5e6f.
// Si alguien llega con un enlace viejo, lo mandamos al mismo artículo en Medium.
const mediumRedirect = `if(/^\\/[^/]+-[0-9a-f]{8,12}\\/?$/.test(location.pathname))location.replace("https://carlos-huamani.medium.com"+location.pathname.replace(/\\/$/,"")+location.search)`;

export default function NotFound() {
  return (
    <div className="space-y-6 py-10">
      <script dangerouslySetInnerHTML={{ __html: mediumRedirect }} />
      <pre className="glow text-5xl font-extrabold text-danger sm:text-7xl">404</pre>
      <p className="text-sm">
        <span className="text-danger">bash: cd:</span> esa ruta no existe: No such file or directory
      </p>
      <p className="text-muted">Quizás el directorio fue movido, o nunca existió. Prueba con `ls` en la barra de comandos.</p>
      <p className="text-muted" lang="en">
        This page doesn&apos;t exist. It may have moved, or it never did.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="inline-block rounded border border-accent px-4 py-2 text-accent hover:bg-accent hover:text-bg">
          $ cd ~
        </Link>
        <Link href="/en/" hrefLang="en" className="inline-block rounded border border-line px-4 py-2 text-muted hover:border-accent hover:text-accent">
          English home
        </Link>
      </div>
    </div>
  );
}
