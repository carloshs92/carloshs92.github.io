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
| Perfil: indicadores, habilidades, certificaciones, enlace a LinkedIn | `data/profile.ts` |
| Proyectos / aprendizajes (los 3 primeros son los destacados del inicio) | `data/projects.ts` |
| Posts del blog | `content/blog/*.md` |
| Trabajemos juntos: servicios, pasos y canales de contacto (correo, agenda) | `data/services.ts` |
| Colores (terminal y humano, dark/light) | `app/globals.css` |
| Componentes del design system | `components/ds/` (guía en `DESIGN_SYSTEM.md`, vista en `/design-system/`) |

## Idiomas

El sitio está en español (rutas de siempre) y en inglés bajo `/en/` (`/en/profile/`, `/en/projects/`, `/en/blog/`). El botón `EN`/`ES` del header y el comando `lang` del terminal llevan a la misma página en el otro idioma.

- Los textos de `data/` que cambian por idioma se escriben como `{ es: "…", en: "…" }`; un string simple vale para ambos (nombres propios, tecnologías).
- Los textos de cada componente están en un objeto `COPY` con `es` y `en` al inicio del archivo.
- Rutas, hreflang y helpers en `lib/i18n.ts`. Los posts del blog solo existen en español; `/en/blog/` los lista con ese aviso.

Post nuevo: crea `content/blog/mi-post.md` con frontmatter `title`, `date`, `description`, `tags` (y `draft: true` para ocultarlo).

## Modos de vista

El sitio tiene dos modos, que se eligen con el botón del header y se guardan en el navegador:

- **humano** (por defecto): vista limpia, sin animaciones ni jerga; en `/perfil` se muestra como dashboard para reclutadores.
- **terminal**: la experiencia para desarrolladores (transiciones, sonido, lluvia binaria, barra de comandos).

Quien entra por primera vez ve el modo humano; si alguien elige el terminal, se recuerda en su navegador. Para cambiar el modo por defecto edita `DEFAULT_MODE` en `lib/preferences.ts` (y `data-mode` en `app/layout.tsx`).

Enlaces directos para compartir: `https://carloshs92.github.io/?modo=terminal` o `?modo=humano`. Al imprimir o exportar a PDF siempre sale la vista humana.

### Cómo está organizado

```
lib/preferences.ts      tema + modo + sonido: claves, script de arranque, motionEnabled()
lib/profile.ts          datos derivados del CV (años, promedios, línea de tiempo)
components/
  providers/            Preferences (tema/modo/sonido) · PageTransitions (navegación animada)
  effects/              BinaryRain · KeySounds (se apagan solos en modo humano)
  ds/                   design system: buttonClass · Card · KpiTile · BarList · Tag
  ui/                   ModeView · ModeToggle · Say · FilterList · PrintButton
  terminal/             piezas de la estética terminal (CommandBar, Prompt, Scramble…)
  home/ profile/        una vista por modo: *Terminal.tsx y *Human.tsx / human/ProfileDashboard.tsx
```

- **Vista distinta por página:** envuelve la página en `<ModeView terminal={…} human={…} />`. Ambas vistas se generan en el HTML estático y el CSS muestra la correcta, así que no hay parpadeo.
- **Solo un texto distinto:** `<Say terminal="git clone ↗" human="Repositorio" />`.
- **Solo un estilo distinto:** variante de Tailwind `human:` (p. ej. `human:hidden`).
- **Animaciones nuevas:** revisa `motionEnabled()` antes de animar.

## Deploy

Cada push a `master` publica en GitHub Pages vía `.github/workflows/deploy.yml`.
Requisito (una sola vez): en **Settings → Pages → Build and deployment → Source** elige **GitHub Actions**.
