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
| Colores (terminal y humano, dark/light) | `app/globals.css` |

Post nuevo: crea `content/blog/mi-post.md` con frontmatter `title`, `date`, `description`, `tags` (y `draft: true` para ocultarlo).

## Modos de vista

El sitio tiene dos modos, que se eligen con el botón del header y se guardan en el navegador:

- **terminal**: la experiencia completa (transiciones, sonido, lluvia binaria, barra de comandos).
- **humano**: vista limpia, sin animaciones ni jerga; en `/perfil` se muestra como dashboard para reclutadores.

Enlace directo para compartir: `https://carloshs92.github.io/perfil/?modo=humano`. Al imprimir o exportar a PDF siempre sale la vista humana.

### Cómo está organizado

```
lib/preferences.ts      tema + modo + sonido: claves, script de arranque, motionEnabled()
lib/profile.ts          datos derivados del CV (años, promedios, línea de tiempo)
lib/dates.ts            fechas "YYYY-MM", rangos y duraciones
components/
  providers/            Preferences (tema/modo/sonido) · PageTransitions (navegación animada)
  effects/              BinaryRain · KeySounds (se apagan solos en modo humano)
  ui/                   ModeView · ModeToggle · Say · FilterList · PrintButton
  terminal/             piezas de la estética terminal (CommandBar, Prompt, Scramble…)
  home/ profile/        una vista por modo: *Terminal.tsx y *Human.tsx / human/*
```

- **Vista distinta por página:** envuelve la página en `<ModeView terminal={…} human={…} />`. Ambas vistas se generan en el HTML estático y el CSS muestra la correcta, así que no hay parpadeo.
- **Solo un texto distinto:** `<Say terminal="git clone ↗" human="Repositorio" />`.
- **Solo un estilo distinto:** variante de Tailwind `human:` (p. ej. `human:hidden`).
- **Animaciones nuevas:** revisa `motionEnabled()` antes de animar.

## Deploy

Cada push a `master` publica en GitHub Pages vía `.github/workflows/deploy.yml`.
Requisito (una sola vez): en **Settings → Pages → Build and deployment → Source** elige **GitHub Actions**.
