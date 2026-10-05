# Theme: watercolor-ink

Status: draft, used in the style test · Source: the P(doom) music video and ClaudeAnimationBase (see [reference/README.md](../../../reference/README.md)) · Updated: 2026-09-28

A hand-painted picture book:
- soft watercolour fields with bleeding edges for backgrounds;
- flat colour washes with thin ink outlines for characters;
- warm paper under everything, with grain and a dark vignette on top.

It still reads at thumbnail size, because the shapes are big and simple.

## What the P(doom) video does

From 45 frames sampled across the 2:36 video:
- **Backgrounds are big, soft colour fields** with little detail: a lilac hallway, a teal data-center aisle, an indigo lab. The detail goes on the one or two props that matter.
- **Characters are simple shapes.** Clawd is a terracotta block with slit eyes. The human is small, with round glasses, a lab coat and scribbly hair. Faces carry the acting: star eyes, swirl eyes, sweat drops, hearts.
- **Each chapter has its own palette:**
  - warm cream and lamplight;
  - sky blue;
  - space violet and gold;
  - teal;
  - alarm red;
  - theatre crimson and gold at the end.
- **Text is rare:**
  - a painted title;
  - a few comic sound words in marker lettering (FOOM, SKRRT!, HONK!);
  - a karaoke bar at the bottom.
- **Transitions are motivated:** brush-stroke wipes between chapters, a mouth-shaped iris, a chomp to black, falls, a zoom through an eye.
- **A recurring set escalates:** the theatre stage comes back for every chorus, bigger each time.

## Palette

This is P(doom)'s palette, with a first mapping onto our tokens so sets and characters work unchanged. Tokens not listed keep their [paper-pencil](paper-pencil.md) values until Phase 1.

| P(doom) name | Hex | Our token |
|---|---|---|
| paper | `#F3EBDC` | `--paper` |
| ink | `#2B2233` | `--ink` |
| clay | `#D97757` | `--terracotta` |
| clay light | `#F2A283` | `--terracotta-light` |
| clay dark | `#A84D33` | `--brown` |
| night | `#1F2550` | `--night` |
| indigo | `#2F3C7A` | `--navy` |
| rose | `#E27A92` | `--cheek` |
| ochre | `#E8AA38` | `--gold` |
| sap | `#6E9F58` | `--go`, `--sage` |
| teal | `#3A9C98` | `--ping` |
| violet | `#7B5CA8` | `--dusk` |
| cream | `#FFF5E2` | `--screen-ui`, `--white`, `--subtitle` |
| sky | `#8EC3E6` | `--ping-glow`, `--bluegrey` |
| alarm red | `#D8394E` | `--alert` |
| skin | `#F2C4A0` | `--skin` |
| hair | `#3A2B38` | `--hair` |

There's no pure black or white: `--ink` and cream stand in for them.

## Lines and fills

- **Characters and props:** a flat wash at full opacity plus an ink outline, 0.8–1.6 wide depending on size.
- **Backgrounds:** watercolour fills with bleed 0.05–0.3 and texture 0.3–0.9, usually with no outline or a thin one.
- **Hatching** (charcoal or HB brush) only for dry texture, and sparingly.
- **Boil:** as in [animation.md](../../craft/animation.md).
- **As built (style test):** outlines 4 px foreground, 3.2 px fine, 3 px midground, 2 px background, none far; roughness 0.4–0.5, bowing 0.5. Background washes are a deformed base polygon at 55% plus 18 more deformed layers at 5% each, built once per shape. Characters stay flat. The road uses `--dusk`, so it reads purple here.

## Light

Glows are additive light, drawn under the paper grain. Never paint light as a wash: paint mixes like pigment, so yellow over blue turns green.

## Fonts

- **Lettering and sound words:** Permanent Marker, with an ink drop shadow.
- **Karaoke:** Shantell Sans ExtraBold on a dark painted pill; each word turns ochre as it's sung. For subtitles, keep the spec in [typography.md](../typography.md) unless this theme wins in Phase 1.

## Transitions

This theme's wipe is the BRUSH WIPE ([transitions.md](../transitions.md)): 5 fat paint strokes cover the frame, the scene swaps under full cover, then the strokes drag off.

## Engine

- P(doom) is painted with p5.js and p5.brush in headless Chrome.
- ClaudeAnimationBase (MIT) packages that engine:
  - painting, ink lines and glow;
  - a camera, the brush wipe and the iris;
  - a character rig with 31 emotions;
  - a renderer that makes contact sheets, strips and crops.
- p5.brush also has coloured-pencil and hatching brushes, so one engine might draw both themes. Phase 1 drew both with rough.js instead ([engine/kit.js](../../../engine/kit.js)), at about 10 s per 5 s shot, so p5.brush is deferred.
- **Speed:** watercolour fills take seconds per frame. Budget 1.5 s a frame at most. A 2:25 video at 30 fps is about 4,350 frames, so a full render is about 1.8 hours on one worker at that budget, less in parallel.
- Its canvas is 1920×1080 and its timing follows a music beat. We'd switch it to 1080×1920 and time it to the voice.
