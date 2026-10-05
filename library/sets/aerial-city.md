# Set: aerial city

Status: draft · Source: the Uber script (shots 6a–7b) · Used in: uber-live-map · Updated: 2026-09-27

A stylised Manhattan seen from above, tilted about 35°:
- blocks drawn as simple extruded boxes, with water towers on the roofs;
- a `--sage` Central Park rectangle at the top;
- `--bluegrey` rivers on both sides.

It's drawn once, flat, and moved by the 2D camera (rule 8).

## Always moving

- 2 wispy clouds cross below the camera at 30 px/s (parallax 1.3).
- The rivers glint.
- Now and then, a V of 5 birds crosses the frame.

## Swarms it can hold

- **Phone lights:** about 300 tiny person dots with `--ping-glow`, switching on like fireflies in a seeded ripple.
- **Cars:** about 150 small cars drifting along the street grid, trailing short route lines.

## Variants

| Variant | What changes |
|---|---|
| `afternoon` | The default |
| `dusk` | A time-lapse. The sky turns `--dusk`/`--night` with hatching, windows switch on in `--gold` in a seeded order (5% per frame, up to about 60%), and streetlights glow |

## Ways in and out

- **In:** from the street's rooftops, which shrink and merge into the aerial blocks (MATCH).
- **Out:** the buildings sink into their footprints and the tilt goes to 0°, leaving a paper map (a MORPH into [paper-maps.md](paper-maps.md)).

## Sound

AMB-HIGH, plus AMB-DUSK for the dusk variant.
