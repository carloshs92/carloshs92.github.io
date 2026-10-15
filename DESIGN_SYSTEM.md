# Design system

Un solo sistema para las dos voces del sitio: **humano** (por defecto, limpio, para reclutadores) y **terminal** (para desarrolladores). Los mismos tokens y componentes sirven a ambos; cambian los valores de los tokens y algunos detalles de forma.

Documentación viva: [`/design-system/`](https://carloshs92.github.io/design-system/). Todo lo que se ve ahí sale de los archivos de abajo.

## Principios

1. **Claridad primero.** El modo humano es la entrada: sin animaciones ni jerga, con lo importante arriba. El terminal es un extra.
2. **Solo tokens.** Ningún color va escrito a mano en un componente. Se usan las clases de Tailwind que apuntan a los tokens (`bg-panel`, `text-muted`, `border-line`…), así claro/oscuro y humano/terminal funcionan sin código extra.
3. **Una acción principal por bloque.** Como máximo un botón `primary`; lo demás es `secondary` o un enlace.
4. **Movimiento opcional.** Solo en modo terminal y respetando "reducir movimiento" (`motionEnabled()`).
5. **Imprimible.** Las tarjetas evitan cortarse (`break-inside-avoid`) y las sombras se quitan al imprimir.

## Tokens (`app/globals.css`)

Cuatro paletas: terminal claro (`:root`), terminal oscuro (`[data-theme="dark"]`), humano claro (`[data-mode="human"]`) y humano oscuro (`[data-mode="human"][data-theme="dark"]`).

| Token | Clase | Uso |
| --- | --- | --- |
| `--bg` | `bg-bg` | Fondo de la página |
| `--bg-soft` | `bg-bg-soft` | Tags, código, pistas de gráficos |
| `--panel` | `bg-panel` | Superficie de tarjetas |
| `--line` | `border-line` | Bordes y divisores |
| `--fg` | `text-fg` | Texto principal |
| `--muted` | `text-muted` | Texto secundario |
| `--dim` | `text-dim` | Texto terciario, solo decorativo (no para información) |
| `--accent` | `*-accent` | Acción principal y énfasis |
| `--accent-2` | `*-accent-2` | Avisos y resaltados |
| `--accent-3` | `*-accent-3` | Enlaces y datos secundarios |
| `--danger` | `*-danger` | Errores |
| `--chart-1` / `--chart-2` / `--chart-track` | `bg-chart-*` | Series de gráficos (validadas para contraste y daltonismo en modo humano) |

Para un color nuevo: agrégalo en las cuatro paletas y en el bloque `@theme inline`.

## Tipografía

- **Inter** (`font-sans`) en modo humano; **JetBrains Mono** (`font-mono`) en modo terminal y siempre para código.
- Escala de Tailwind: display `text-4xl/5xl font-semibold tracking-tight`, título `text-2xl`, sección `text-base font-semibold`, cuerpo `text-sm leading-relaxed`, detalle `text-xs text-muted`.

## Componentes (`components/ds`)

Se importan desde `@/components/ds`.

| Componente | Para qué |
| --- | --- |
| `buttonClass({ variant, size })` | Clases de botón para `Link`, `a`, `button` o `PrintButton`. `variant`: `primary` · `secondary`; `size`: `sm` · `md`. |
| `Card` | Contenedor base con `title` y `subtitle` opcionales. |
| `KpiTile` | Indicador numérico; `hero` para el número principal (uno por vista). |
| `BarList` | Barras horizontales 0–100 con tooltip y `levelLabel()`. |
| `Tag` | `stack` para tecnologías, `pill` para habilidades o etiquetas suaves. |

## Patrones por modo

- **Vista distinta por página:** `<ModeView terminal={…} human={…} />`.
- **Solo un texto distinto:** `<Say terminal="git clone ↗" human="Repositorio ↗" />`.
- **Solo un estilo distinto:** variante `human:` de Tailwind (`rounded human:rounded-lg`).
