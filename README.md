# carloshs92.github.io

Web personal de Carlos Huamani: perfil de ingeniero, blog en Markdown y proyectos, con estética de terminal.

## Correr en local

```bash
nvm use        # Node 22
npm install
npm run dev    # http://localhost:3000
npm run build  # sitio estático en out/
```

## Dónde editar

| Qué | Archivo |
| --- | --- |
| CV, habilidades, experiencia, educación | `data/profile.ts` |
| Proyectos / aprendizajes | `data/projects.ts` |
| Posts del blog | `content/blog/*.md` |
| Colores del tema (dark/light) | `app/globals.css` (`:root` y `[data-theme="dark"]`) |

Post nuevo: crea `content/blog/mi-post.md` con frontmatter `title`, `date`, `description`, `tags` (y `draft: true` para ocultarlo).

## Deploy

Cada push a `master` publica en GitHub Pages vía `.github/workflows/deploy.yml`.
Requisito (una sola vez): en **Settings → Pages → Build and deployment → Source** elige **GitHub Actions**.
