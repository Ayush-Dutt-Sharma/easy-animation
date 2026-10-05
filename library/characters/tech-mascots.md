# Tech mascots

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

Systems drawn as characters. Machines get LED dot eyes. A face appears only when the thing has to act. What each one stands for is in [metaphors.md](../craft/metaphors.md).

## Server tower: an overloaded backend

- A building-sized server rack with vent grilles. Its face is two LED eyes and a vent mouth.
- Its LED eyes flicker faster as load hits it.
- **Under stress:**
  - its eyes go wide and its outline turns `--alert`;
  - 3 wavy heat lines rise from its top;
  - the roof edge sags 12–24 px;
  - sweat drops fall from its "forehead", and drips run down its side (0.4 s each, seeded).
- Sound: SFX-SIZZLE with a metal creak, and SFX-DRIP.

## Worker box: one service instance or shard

- A small server box, 90×110 px at ring scale, with two LED eyes that blink every 1.5–3 s (seeded).
- A memory chip on its front glows `--ping-glow` and shows 3–8 moving dots.
- **States:** dark, eyes opening, lit, catching (a 4% squash for each item it catches), and asleep ("zzz").
- It usually stands in a ring ([data-center.md](../sets/data-center.md)).

## Warehouse robot: a storage writer

- A tiny box robot on two wheels, with line arms. It bounces 4 px per step and beeps with its eyes (SFX-BEEP).
- It passes boxes hand to hand. When busy it blurs into smear frames; when it's done it wipes its forehead.

## Gatekeeper: an API gateway

- A small figure in a toll-booth window, with a cap, bushy brows and a tea cup.
- **States:**
  - calm: the tea steams;
  - overwhelmed: hands up, sweat drops, the cap flies off;
  - relieved: sips the tea.

## Flame clerk: a decision service ("Fireball" in uber-live-map)

- A small flame with a `--terracotta` core and `--gold` edges, hatched. Big round eyes, a tiny clipboard and a rubber stamp.
- The flame tips sway at 3 Hz on top of the line boil, and it blinks every 3 s.
- It reads cards (its eyes scan), stamps some and tosses the rest.
- Sound: an SFX-FLAME loop.

## Vault: a durable database

- **Stone vault:**
  - grey stone blocks (`--slate`, `--bluegrey`), with a round door and a wheel handle, standing on foundation stones;
  - the records inside are bricks;
  - it can have a sleepy face, but use that once at most.
- **Clock vault:**
  - smoother `--sage` stone, with a small atomic clock on top whose second hand ticks once a second (a nod to Spanner's TrueTime);
  - its door swings shut heavily.
- Sound: SFX-VAULT, SFX-BRICK, SFX-TICK and SFX-SNORE.
