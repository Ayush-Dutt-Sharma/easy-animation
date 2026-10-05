# Ambience beds

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

With no music, the beds carry the continuity. Levels are peak dBFS, relative to a voice that peaks around −6 dBFS.

| ID | What it is | Fits | Level |
|---|---|---|---|
| AMB-CITY | Afternoon city: distant traffic, a far horn at most every 6 s, footsteps, pigeons | [city-street](../sets/city-street.md) | −32 dBFS |
| AMB-HIGH | Rooftop wind and far city hum | city-street rooftops and skyline, [aerial-city](../sets/aerial-city.md) | −34 |
| AMB-DUSK | Sparse evening city, soft wind | aerial-city at dusk | −34 |
| AMB-PHONE | Near silence with a faint UI hum | [phone-ui](../sets/phone-ui.md) | −44 |
| AMB-DC | Data center: fan wash, a low ~120 Hz hum, faint relay ticks | [data-center](../sets/data-center.md) | −34 |
| AMB-WAREHOUSE | Conveyor rumble, far clatter | [system-land](../sets/system-land.md) warehouse | −32 |
| AMB-PAPER | A quiet room with a faint paper rustle | [paper-maps](../sets/paper-maps.md), system-land | −42 |
| AMB-GATE | A murmur of many tiny, pitched-up voices | system-land gateway | −36 |

## Rules

- Frame 1 starts with its bed already at full level. No fade-in.
- Beds crossfade (equal power) over every transition.
- Beds duck 6 dB while the voice speaks.
- In the gaps between sections, let the bed breathe with no effects.
- **Sources:** CC0 recordings (Freesound with the CC0 filter, or Pixabay), or layered synth.
