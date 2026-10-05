# Set: city street (New York)

Status: draft, built once in the style test · Source: the Uber script (shots 1–3, 18, 22, 26) · Used in: uber-live-map · Updated: 2026-09-28

A New York avenue in the afternoon, seen at eye height. The lead stands on the near sidewalk.

## Default layout (street level)

- **Horizon** at y 760. The avenue runs diagonally from the bottom left to the middle right, with a crosswalk in the foreground (y 1500+).
- **Far background:** skyscraper silhouettes mixed toward paper, and one Art Deco spire at x 300, topping out at y 120.
- **Left side (x 0–420):** a brownstone row with stoops and black zig-zag fire escapes. Two cedar water towers (`--brown`, conical roofs) stand on the roofs.
- **Corner:**
  - a deli awning with `--sage` stripes and a hand-lettered "DELI" sign, the set's only word;
  - a hot-dog cart at x 220, y 1350, with an `--alert`-and-paper umbrella.
- **Right side:** a glass office lobby with a revolving door, and a street tree at x 900 with a hatched `--olive` canopy.
- **Street furniture:** a traffic-light pole at x 120 showing green, a WALK box, a street lamp, and a manhole at x 180, y 1560.
- **The road:** asphalt in `--dusk` mixed 40% with paper, with lane dashes.
- **Light:** the `afternoon` preset from [paper-pencil](../design/themes/paper-pencil.md), with long hatched shadows falling to the lower right.

## As built in the style test (2026-09-28)

[style-test.html](../../videos/uber-live-map/style-test.html) departs from the layout above. Fold these in once a look is picked:
- **Flat avenue:** the road runs straight across (y 1016–1336), with a cross street receding to x 560 on the horizon. The crosswalk is at x 20–176.
- **Moved:** the cart to x 420 on the far curb, the tree to x 950, the manhole to (850, 1290). The traffic light (x 120) and lamp (x 1030) stand at the near curb, behind the lead, so the lead doesn't dwarf them.
- **Scale:** near-lane cars 1.2, far-lane cars 0.8, far people about 0.15. The lead is 840 px tall, about 4× the cab, so frame tighter and crop.
- **People:** 4 on the far sidewalk (2 walkers, the coffee drinker at x 250, a tote walker), none behind the lead.
- **Cars:** no respawn, since the shot is only 5 s.
- **Road:** `--dusk` reads purple in watercolor-ink. Give the road its own token if that look wins.

## Always moving

- **Cars:** 3 sedans and a yellow cab ([objects.md](../props/objects.md)).
  - They cross at 140–220 px/s: the far lane goes left, the near lane goes right.
  - They respawn off-screen with seeded speeds.
- **People:** 7 from [crowd.md](../characters/crowd.md).
  - 3 walk behind the lead (feet at y 1440).
  - 2 walk on the far sidewalk, drawn smaller (feet at y 1180).
  - 1 waits at the corner with a coffee.
  - 1 with a tote bag crosses the street.
- **Sky:** 3 flat clouds drift right at 8 px/s.
- **Tree and cart:** the tree sways ±2° at 0.25 Hz, and the umbrella's tips flutter ±3 px at 1.2 Hz.
- **Steam:** puffs rise from the manhole every 1.6 s, rising and fading over 1.2 s.
- **Pigeon:** one pigeon on the curb (x 470) pecks, and can flutter off up and to the left.

## Variants

| Variant | What changes |
|---|---|
| `rooftops` | The camera is at brownstone-roof height: water towers mid-frame, the street in the bottom third, the skyline clearly behind |
| `skyline` | A wide view at rooftop height, with the low sun at the left edge and clouds at mid-depth. There's room on the right horizon for something big |
| `close` | A medium close-up on the lead. The awning and street behind are simplified and mixed 25% toward paper |
| `curb` | Late afternoon, with the lead at the curb by the deli and the street lamp. A car can pull up from the left |

## Sound

- **Beds:** AMB-CITY, or AMB-HIGH for the rooftops and skyline variants.
- **Effects:** SFX-CAR-PASS, SFX-HORN-FAR, SFX-CAR-STOP / -GO, SFX-DOOR and SFX-WINGS.

## Other cities

Swap the brownstones, water towers, cab and deli for local landmarks. Keep the layout and the loops.
