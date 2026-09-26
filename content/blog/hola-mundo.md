---
title: "hola_mundo.md — cómo funciona este blog"
date: 2026-09-25
description: "Bienvenido a la terminal. Este blog se escribe en Markdown y se publica solo con un git push."
tags: [meta, nextjs, markdown]
---

Bienvenido. Si llegaste hasta aquí ya viste la lluvia de unos y ceros y escuchaste el teclado. 👾

Este blog vive en el mismo repositorio que el sitio. Cada post es un archivo `.md` dentro de `content/blog/`, y al hacer `git push` a `master` una GitHub Action genera el sitio estático y lo publica en GitHub Pages.

## Escribir un post nuevo

Crea un archivo como `content/blog/mi-post.md`:

```md
---
title: "Mi post"
date: 2026-10-01
description: "Una línea que aparece en el listado."
tags: [react, ia]
draft: false
---

Aquí va el contenido en **Markdown**.
```

El nombre del archivo es la URL: `mi-post.md` → `/blog/mi-post/`. Con `draft: true` el post no se publica.

## Lo que soporta

- Tablas, listas de tareas y ~~tachados~~ (GitHub Flavored Markdown)
- Resaltado de código con temas claro y oscuro
- Enlaces con ancla en cada título

| Comando        | Qué hace                         |
| -------------- | -------------------------------- |
| `npm run dev`  | Levanta el sitio en local        |
| `npm run build`| Genera el sitio estático en `out/` |

- [x] Blog en Markdown
- [x] Modo claro / oscuro
- [ ] Muchos posts más

```tsx
export function Saludo({ nombre }: { nombre: string }) {
  return <p className="text-accent">hola, {nombre}_</p>;
}
```

> Tip: escribe `help` en la barra de comandos de arriba (o presiona `/`).
