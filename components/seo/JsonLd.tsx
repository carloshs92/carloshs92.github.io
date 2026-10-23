/** Imprime un bloque JSON-LD; `<` se escapa para que el contenido no pueda cerrar el <script>. */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
