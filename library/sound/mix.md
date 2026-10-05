# Mix

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

## Targets

- **Voice:** the track is normalised to −16 LUFS.
- **Master:** −14 LUFS integrated, with a −1 dBTP true-peak ceiling (ffmpeg `loudnorm`, two passes).
- **Levels in scripts** are peak dBFS, relative to a voice that peaks around −6 dBFS.

## Rules

- **The voice always wins.** Effects under words sit at least 10 dB below the voice's peaks.
- **Big accents go in the pauses** (stamps, doors, vaults) wherever possible.
- **No pile-ups:** at most 3 effects within any 150 ms.
- **Panning follows the picture,** from −30% at the left edge to +30% at the right. The voice stays centred.
- **Let it breathe:** between sections, the bed plays with no effects.
- **Sync:** an effect lands on the frame of the thing it belongs to, not on the word.

## Variants (no re-render)

- A loudness pass on the final mix.
- Subtitles: burn in the `.ass` file with ffmpeg's `subtitles` filter. On platforms that autoplay muted, this is the only version ([typography.md](../design/typography.md)).
- The music version: see [music.md](music.md).
