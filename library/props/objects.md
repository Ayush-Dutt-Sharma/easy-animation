# Props: objects

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

## Vehicles

- **Street cars:** three sedans (`--slate`, `--sage`, `--navy`) and a `--cab` yellow cab.
  - Optional: a small `--ping-glow` phone mount on the dashboard, which glints as the car passes.
- A car dips forward as it stops. Its doors open in 0.3 s.
- Sound: SFX-CAR-PASS, SFX-CAR-STOP / -GO, SFX-DOOR.

## Drawing tools

- **Compass:** its needle goes on a point, and it draws a circle in one sweep (0.6 s, easeInOutSine). Sound: SFX-PENCIL, one long scratch.
- **Ruler:** `--sand`, with tick marks. It slides in and measures. Sound: SFX-RULER.
- **Pen and pencil:** they draw lines, grids and doodles. The hand holding them is never shown.

## Conveyor and boxes

- **Conveyor belt:** the rollers spin and the boxes jiggle. It starts with a clunk. Sound: SFX-CONVEYOR, and SFX-RATTLE for boxes on the move.
- **Box:** a small cardboard box stamped with an icon, such as a pin for a location. Sound: SFX-BOX.

## Bricks

- Stone bricks, one per record, each with a tiny icon. They stack.
- A "ghost" brick hovering over an old one shows an overwrite, and gets a ✕.
- Sound: SFX-BRICK.

## Clocks

- **Wall clock:** it can fast-forward, sweeping 30 seconds in 0.8 s with rapid ticks. Sound: SFX-TICK.
- **Atomic clock:** a small clock on top of a vault, whose second hand ticks once a second.

## Database cylinder

The classic drawn database. Use it only for "not this": it appears, gets a ✕ and droops.
