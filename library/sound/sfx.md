# Sound effects

Status: draft · Source: the Uber script · Used in: uber-live-map · Updated: 2026-09-27

- **Sources:** each effect is either a free CC0 download (Freesound with the CC0 filter, or Pixabay) or synthesised. The ones marked "synth" can be generated with ffmpeg, so there's nothing to download.
- **Naming:** `SFX-<THING>` or `SFX-<THING>-<VARIANT>`. Add an ID here before a script uses it.
- **Levels:** are set per shot in the script. The rules are in [mix.md](mix.md).

| ID | Sound | Notes |
|---|---|---|
| SFX-PING | Soft blip: a sine plus a short bell partial, 120 ms | synth. −26 dBFS; seeded ±2 semitones and ±3 dB; at most 3 per 100 ms |
| SFX-PING-SWARM | A granular cloud of blips | synth. Streams and torrents |
| SFX-WHOOSH-IN / -OUT | An airy whoosh, 0.5 s (in rises, out falls) | Dives and pulls |
| SFX-WHIP | A fast whoosh, 0.25 s | Whip pans |
| SFX-TAP | A glass tap | UI taps |
| SFX-UI-POP | A soft bubble pop | UI cards, pins |
| SFX-TYPE | Soft phone-keyboard ticks | Typing |
| SFX-CONFIRM | A two-note UI chime, rising | synth. Confirm buttons |
| SFX-CAR-PASS | A car passing, left to right | Streets |
| SFX-HORN-FAR | A distant horn | Street accent |
| SFX-CAR-STOP / -GO | Deceleration and stop / pull-away | Cars at the curb |
| SFX-DOOR | A car door opening, and closing | Getting in and out |
| SFX-STAMP-S / -L | A rubber stamp, small / a heavy thud | Tags and year stamps / badges and COMMIT |
| SFX-NOTE | A sticky-note slap and paper crinkle | Sticky notes |
| SFX-FADE-POPS | Tiny soft pops | Dots fading |
| SFX-SIZZLE | An electric sizzle and metal creak | Overloaded machines |
| SFX-DRIP | A drip | Melting |
| SFX-ZIP | A quick line zip | Lines and wires |
| SFX-CHIRP | Tiny chirps | Gossip between workers |
| SFX-MULTIPLY | Fast ascending ticks, 0.8 s | synth. Things multiplying |
| SFX-CONVEYOR | A start clunk, then a belt loop | Conveyors |
| SFX-BOX | A cardboard box landing | Boxes |
| SFX-RATTLE | Boxes rattling on a belt | Conveyors |
| SFX-COUNTER | A mechanical counter roll | Counters |
| SFX-TICK | A clock tick | Clocks |
| SFX-PENCIL | A pencil scratch or long line | Drawing, wipes, compass |
| SFX-PAPER-FOLD | A paper fold or crease | Morphs, flattening |
| SFX-LIGHT | A soft "bloop" light-up, pitched | synth. Things lighting up |
| SFX-HEAT | A warm rising whoosh | Heatmaps |
| SFX-RULER | A ruler slide | Measuring |
| SFX-DING / SFX-BUZZ | A small positive ding / a soft negative buzz | synth. ✓ / ✕ and ≠ |
| SFX-BUBBLES | Soft pops, stacking | Polling bubbles |
| SFX-PIE | A rising tick fill | synth. Pie charts |
| SFX-CRUNCH | A squishy crunch | Jams |
| SFX-POOF | A dust burst | A jam clearing |
| SFX-TUBE | A pneumatic "shoop" and thunk | The push tube |
| SFX-FLAME | A small flame flutter, looped | The flame clerk |
| SFX-FLIP | A card flip | Label and card flips |
| SFX-TOSS | Paper tossed aside | Skipped cards |
| SFX-BRICK | A stone clack | Bricks |
| SFX-VAULT | A heavy door swing and lock | Vaults |
| SFX-SNORE | A tiny cartoon snore | Sleeping things |
| SFX-BEEP | A small robot beep | Robots |
| SFX-WINGS | A pigeon's wing flutter | Birds taking off |
| SFX-CLOTH | A cloth rustle and phone slide | Taking out a phone |
| SFX-STEP | A footstep | Characters walking |
| SFX-BELL-SOFT | One soft bell | End card |
