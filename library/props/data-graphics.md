# Props: data graphics

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

## Ping

- A 14 px `--ping` dot, with a ring that grows from 14 to 90 px over 0.6 s while fading from 80% to 0% (easeOutQuad).
- For emphasis, use a 120 px ring.
- Each source pings on its own seeded phase.
  - Real-time shots use the real cadence (every 4 s for Uber).
  - Sped-up shots use 0.8–1.2 s.
- Sound: SFX-PING, at most 3 per 100 ms.

## Swarms

- **Torrent:** hundreds of dots lift off and braid into a thick stream that curls like water from a hose (sine wobble at 0.8 Hz). Along an arc they move at about 900 px/s. Sound: SFX-PING-SWARM.
- **Fireflies:** tiny lights switching on in a seeded ripple outward from one point, over about 1 s.
- **Rising threads:** thin lines of dots rising and converging, like fireflies drawn upward.

## Fleeting dots

- **Timer dot:**
  - a dot with a tiny timer ring that fills over about 2 s;
  - when the ring is full, the dot fades and pops, and a new dot appears a little ahead;
  - sound: SFX-FADE-POPS, at most 3 a second.
- **Bubble exit:** dots float out like soap bubbles and pop softly (seeded, over 1.5 s).

## Map cars and routes

- **Map car:**
  - a 36×20 px rounded rectangle in `--paper`, with an ink outline and a windshield stroke;
  - it pops in (0 → 110% → 100%);
  - it glides along streets, easing through the turns.
- **Route line:**
  - it draws in dashed, then turns solid, and erases behind a moving car;
  - a finished trip is a solid 6 px `--ink` line with start and end pins;
  - it can lift off the map, with a soft shadow 20 px below it.

## Grids and cells

- **Square grid:**
  - an ink pen draws it over a map line by line: horizontal lines first, then vertical, 4 frames a line, staggered;
  - items take their cell's tint (alternating `--sand` and `--bluegrey`).
- **Cell covering:** the cells touching a shape fill with `--ping-glow` in order of distance, 2 frames apart.
- **Hexagon tiling:**
  - square corners slide into hexagons (14 frames), rippling out from the centre;
  - outlines can pulse once (5 → 8 px, 6 frames).
- **Heatmap:**
  - cells fill `--sage` → `--sand` → `--terracotta`, rising like liquid (8 frames a cell, staggered by distance);
  - they breathe ±5% at 0.3 Hz;
  - sound: SFX-HEAT.

## Rings and wires

- **Hash ring:**
  - a dashed circle that lights up as a hash space, with tick marks and 4 small labels (`0x0`, `0x4`, `0x8`, `0xC`);
  - an item lands on the ring and slides clockwise to the next worker, with a soft click as it docks.
- **Gossip:** tiny "··" bubbles hop between neighbours. Sound: SFX-CHIRP.
- **Wires:**
  - thin lines from cells to workers; items slide down them, and answers slide back up;
  - question arrows have "?" tails;
  - sound: SFX-ZIP, with the pitch rising on the way up.

## Counters and charts

- **Counter:** a mechanical ticker whose digits roll vertically (6 frames per change, easeOutCubic), in JetBrains Mono Bold 72–110 px. Sound: SFX-COUNTER.
- **Pie sign:** fills clockwise to its value, with the slice in `--alert` and a short label. Sound: SFX-PIE.

## Cards and bubbles

- **State card:** three icons with arrows between them, and the current one lit. Icons, not words ([rule 7](../craft/rules.md)): for a trip, a raised hand, a car and a flag.
- **"?" bubbles** (polling):
  - a phone pops a small "?" bubble every 0.25 s, and each drifts up while the phone jolts slightly;
  - they jam against a barrier and squash 18%;
  - sound: SFX-BUBBLES, with the pitch creeping up.
