# Props: labels and stamps

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

Every word here must be one the voice is saying (rule 7 in [rules.md](../craft/rules.md)). Fonts are in [typography.md](../design/typography.md).

## Section badge

- A 150 px circle with an `--alert` ring and the number in JetBrains Mono Bold 90 px, at x 170, y 400, rotated −8°, inside the feed-safe area ([format-9x16.md](../design/format-9x16.md)).
- **Enters** with a stamp (140% → 100% over 5 frames), a camera shake and 4 ink spatter dots. Sound: SFX-STAMP-L.
- **Stays** until its section ends, then leaves with a 6-frame fade and a 20 px drop.

## Tech tag

A paper tag with a thumbtack that stamps in, with SFX-STAMP-S. The full spec is in [typography.md](../design/typography.md).

## Year stamp

A small `--ink` rectangle stamp with a year, which thuds in. Sound: SFX-STAMP-S.

## Rubber stamps

- **PUSH:** small, in `--go`, stamped onto a card. Sound: SFX-STAMP-S.
- **COMMIT:** big, in `--go`, thudding onto a door with a camera shake (4 frames). Sound: SFX-STAMP-L.
- **✓ seal:** the wordless COMMIT, for when the voice doesn't say "commit": a big `--go` wax seal with a ✓, thudding on the same way. Sound: SFX-STAMP-L.

## Sticky note

- `--note` yellow, tilted 6°, with a 2-frame squash as it lands.
- The quote is handwritten in Kalam, with the attribution below in small mono.
- Use it for direct quotes from a source only, and check the wording against the source.
- Sound: SFX-NOTE.

## Marks

- **✕:** `--alert`, 2 strokes over 6 frames. Whatever it crosses out droops. Sound: SFX-PENCIL, then SFX-BUZZ.
- **✓:** `--go`. Sound: SFX-DING.
- **≠:** `--alert`, popping in between two tags. Sound: SFX-BUZZ.
- **"?" doodle:** drawn by an invisible pencil, then fades.

## Cards

- **Event card:** a small paper card naming an event in 1–3 words. Stamped cards move on; skipped ones fall away (SFX-TOSS).
- **Index card list:** a long card listing items ("car 1, car 2…") that scrolls up fast and gets a ✕.
- **Caption card:** Kalam on a paper card, under an object.
- **End card:**
  - a paper card with an ink border, carrying the title in Kalam Bold 64 px and the source footnote in JetBrains Mono 26 px;
  - it slides up into the top area (y 300–520);
  - sound: SFX-BELL-SOFT.
