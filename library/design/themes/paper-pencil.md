# Theme: paper-pencil

Status: draft · Source: the reference ad (`reference/mushilo-ad-fr.mp4`), first written up in the Uber script's production bible · Used in: uber-live-map (style test) · Updated: 2026-09-28

A flat cartoon on paper: thick, wobbly dark-brown outlines, coloured-pencil hatching on the fills, paper grain, and a warm, desaturated palette.

## Palette

Code always uses the token names, never the hex values. Another theme maps the same names to its own colours, so sets and characters don't change when the theme does.

**From the reference ad.** These were extracted from the whole ad, so pin exact values in Phase 1.

| Token | Hex | Token | Hex |
|---|---|---|---|
| `--ink` | `#291f1b` | `--paper` | `#ecece3` |
| `--beige` | `#dcd2ba` | `--sand` | `#dac0a1` |
| `--bluegrey` | `#c6d8da` | `--slate` | `#abbab8` |
| `--terracotta` | `#bf6c5f` | `--terracotta-light` | `#ca8876` |
| `--sage` | `#a0a68b` | `--olive` | `#8e8f6a` |
| `--brown` | `#956c58` | `--night` | `#393342` |
| `--dusk` | `#584c4d` | | |
| `--white` | `#ffffff` | | |
| `--subtitle` | `#ffffff` | | |

**Added for the Uber video.** These are first guesses, to fix in Phase 1.

| Token | Hex | Role |
|---|---|---|
| `--ping` | `#4a7fc1` | Live data, pings |
| `--ping-glow` | `#9cc3ea` | Glows, lit cells, memory chips |
| `--alert` | `#c9483b` | Badges, ✕ marks, overload, pins |
| `--go` | `#6f9e57` | ✓ marks, COMMIT, PUSH |
| `--gold` | `#e0b44c` | Lit windows, flame edges |
| `--note` | `#f3dc8a` | Sticky notes |
| `--skin` | `#f0c9a8` | Skin |
| `--cheek` | `#e59a8a` | Cheeks |
| `--hair` | `#5b3b2b` | Hair |
| `--navy` | `#2f3552` | Trousers, one sedan |
| `--cab` | `#e8b93c` | Yellow cab |
| `--screen` | `#1f2430` | Phone case and screen frame |
| `--screen-ui` | `#f6f4ee` | Phone UI background |

## Paper

- Every scene sits on `--paper`, or on the scene's own base colour.
- **Grain:** seeded noise at 6% multiply. The grain is fixed for each shot, so it doesn't shimmer. There are also 40 faint fibres at 3% opacity.
- **Vignette:** `--ink` at 12% in the corners (70% radius).

## Lines

- **Outlines:** `--ink`, hand-drawn in the rough.js style.
- **Widths:** 7 px foreground, 5 px midground, 3 px background, 2 px far background, and 4.5 px `fine` for small details such as faces, rings and the pigeon.
  - These are widths on screen. Divide them by the camera zoom, so a push-in doesn't fatten the lines. For SVG, `vector-effect: non-scaling-stroke` does this.
- **Roughness:** 1.1 in the foreground and 0.7 in the background; bowing 0.8.
- **Style test note:** the reference's outlines are about 4–5 px, so 7 px reads heavy, and its hatching is denser than ours. Tune both if this look wins.
- **Boil:** see [animation.md](../../craft/animation.md).

## Fills

- A flat base colour, then hatching at 45°: 7 px gap, 1.5 px strokes, 20% darker than the fill, 35% opacity.
- Shadows are hatching only. Deep shadows get a second, cross-hatch pass at −45°.
- No gradients, except glows.

## Light and depth

- **Key light** from the upper left, so shadows fall to the lower right.
- **Glows:** a radial alpha glow at 40%, additive. Only pings, memory chips, lit windows and screens glow.
- **Haze:** far-background layers are mixed 25% toward `--paper`.
- **Light presets:** a set names one, and the theme says what it means.

| Preset | Treatment |
|---|---|
| `afternoon` | Screen tint `#f3d9b1` at 12%, with long hatched shadows |
| `dusk` | Multiply `--dusk` at 18%, with lit windows in `--gold` |
| `server-room` | A cool `--bluegrey` tint at 10%, with LED glows |
| `flat` | None (diagrams and maps) |

## Fonts and transitions

- Fonts: Fredoka, Kalam and JetBrains Mono, as set out in [typography.md](../typography.md).
- This theme's wipe is the INK WIPE ([transitions.md](../transitions.md)).
