# Production script: "How Uber Shows You Moving Cars Without Crashing"

Status: draft v1.1, written by Claude on 2026-09-27. Not approved yet. v1.1 moved the production bible into the [library](../../../library/README.md).

> **Parked on 2026-09-27.** This is the 2:20 version. The video became a LinkedIn cut under 60 seconds: see [the current brief](../brief.md). Kept for its research and shot designs, which later videos can reuse.

This is the shot-by-shot build sheet for the video. It covers every shot's picture, environment, characters, camera and sound. The voice lines are locked in [brief.md](brief-2m20.md); this file never changes their wording.

**How to read it:**
- **Timecodes are estimates**, at ~174 words per minute, which puts the whole video at about 2:25. A faster read (1.1–1.2×) comes to about 2:14.
  - Phase 2 replaces every time with real ones from `transcript.json`.
  - Shots are tied to words, not seconds, so everything re-times on its own.
- **A shot starts on its first word.** The picture changes 2 frames (0.067 s) before that word is spoken.
- **"On 'word'"** means the beat lands 2 frames before that word. Sound effects land on the frame of the thing they belong to.
- **Coordinates** are screen pixels on the 1080×1920 frame, measured from the top-left corner.
- **Levels** are peak dBFS, relative to a voice that peaks around −6 dBFS.

---

## Part A. Uses from the library

Everything that isn't specific to this video lives in [the library](../../../library/README.md). This part lists the modules the video uses and what it sets for each. It replaces the production bible that used to be here.

| Kind | Module | This video's settings |
|---|---|---|
| Theme | [paper-pencil](../../../library/design/themes/paper-pencil.md) | Light presets: `afternoon` for the street, `dusk` for 7a, `server-room` for the data center, `flat` for maps, diagrams and system land |
| Format | [format-9x16](../../../library/design/format-9x16.md) | — |
| Typography | [typography](../../../library/design/typography.md) | Subtitles appear only in the subtitled variant (Phase 4) |
| Camera and transitions | [camera](../../../library/design/camera.md), [transitions](../../../library/design/transitions.md) | Uses DIVE, PULL, WHIP, MORPH, INK WIPE and MATCH |
| Animation | [animation](../../../library/craft/animation.md), [emotions](../../../library/characters/emotions.md) | — |
| Characters | [sam](../../../library/characters/sam.md), [crowd](../../../library/characters/crowd.md), [tech-mascots](../../../library/characters/tech-mascots.md) | See the cast below |
| Sets | [city-street](../../../library/sets/city-street.md), [aerial-city](../../../library/sets/aerial-city.md), [phone-ui](../../../library/sets/phone-ui.md), [paper-maps](../../../library/sets/paper-maps.md), [data-center](../../../library/sets/data-center.md), [system-land](../../../library/sets/system-land.md) | See the sets below |
| Props | [data-graphics](../../../library/props/data-graphics.md), [labels-and-stamps](../../../library/props/labels-and-stamps.md), [objects](../../../library/props/objects.md) | Pings use Uber's documented 4 s cadence in real-time shots, and 0.8–1.2 s in sped-up ones. Year stamps: 2018 (16), 2020 and 2022 (21), 2021 (23b) |
| Sound | [voice](../../../library/sound/voice.md), [ambience](../../../library/sound/ambience.md), [sfx](../../../library/sound/sfx.md), [mix](../../../library/sound/mix.md) | No music. The voice is a friendly senior engineer; the ElevenLabs voice isn't chosen yet |

**Cast:**

| In this video | Library character | Notes |
|---|---|---|
| Sam | sam | The rider |
| Pedestrians | crowd | 7 on the street |
| Driver avatar | The person card in phone-ui | Shot 5 |
| Server tower | tech-mascots: server tower | Shot 2b |
| Geospatial workers | tech-mascots: worker box | The Ringpop ring |
| Cassandra robots | tech-mascots: warehouse robot | Three of them |
| Gateway attendant | tech-mascots: gatekeeper | Shots 19–20b |
| Fireball | tech-mascots: flame clerk | Its tag reads `Fireball` |
| Schemaless vault | tech-mascots: stone vault | Its sleepy face appears in shot 11 only |
| Spanner vault | tech-mascots: clock vault | Shot 23b |

**Sets:**

| # | This video's set | Library set | Only in this video |
|---|---|---|---|
| 1 | New York street, in afternoon and curb variants | city-street: default, rooftops, skyline, close, curb | Every car pings every 4 s |
| 2 | Phone UI | phone-ui | The ride app: "Brooklyn Bridge Park", Standard / Premium / Large, "Finding your driver…" |
| 3 | Aerial Manhattan, in afternoon and dusk | aerial-city | — |
| 4 | Paper world map | paper-maps: world map | A New York pin and a generic data-center pin |
| 5 | Data center with the worker ring | data-center: server room | The Ringpop hash ring |
| 6 | Memory-chip close-up | data-center: memory chip | The sticky-note quote |
| 7 | Data center exterior with the conveyor | data-center: exterior, on the system-land backdrop | — |
| 8 | Cassandra warehouse | system-land: warehouse | The writes/s counter |
| 9 | Globe, cube and S2 cell map | paper-maps: globe and top-down city map | The S2 cube and its cell tokens |
| 10 | H3 heatmap | paper-maps: top-down city map, with the heatmap from data-graphics | — |
| 11 | Grid-paper diagrams | system-land: diagram page | Hexagon and square distances |
| 12 | API gateway, tube and Fireball desk | system-land: toll gateway and pneumatic tube | — |
| 13 | The two vaults, the three shelves and the end card | system-land: vault room and shelf display | The end-card text |

**Beds by shot:**

| Bed | Shots |
|---|---|
| AMB-CITY | 1–3, 6a, 18, 22, 26 |
| AMB-HIGH | 2a–2b, 6a–7a |
| AMB-DUSK | 7a |
| AMB-PHONE | 4a–5 |
| AMB-DC | 8–11, 15b, 24 |
| AMB-WAREHOUSE | 12 |
| AMB-PAPER | 7b, 13–17b, 23a–23b, 25a–25c |
| AMB-GATE | 19–20a |

---

## Part B. Timeline

| Shot | Time | Length | Set | Voice (start of line) | Out |
|---|---|---|---|---|---|
| 1 | 0:00.00 | 5.7 s | Street | "Every few seconds…" | Camera rises |
| 2a | 0:05.71 | 1.3 s | Street, rooftops | "That's a firehose." | Continuous |
| 2b | 0:07.05 | 4.6 s | Skyline + server tower | "So how does the map…" | Vertical WHIP down |
| 3 | 0:11.69 | 1.6 s | Street, close on Sam | "Follow one ride." | DIVE into the phone |
| 4a | 0:13.32 | 1.5 s | Phone: home screen | "Sam opens the app," | UI change |
| 4b | 0:14.85 | 1.2 s | Phone: search | "picks a destination," | UI change |
| 4c | 0:16.04 | 1.6 s | Phone: ride options | "and taps Confirm." | UI change |
| 5 | 0:17.67 | 4.5 s | Phone: live map | "A driver accepts…" | PULL out of the phone |
| 6a | 0:22.21 | 1.3 s | Street to rooftops | "Now zoom out:" | Continuous rise |
| 6b | 0:23.50 | 4.0 s | Aerial Manhattan | "thousands of riders…" | Continuous |
| 7a | 0:27.50 | 3.1 s | Aerial at dusk | "Every one of those cars…" | Continuous |
| 7b | 0:30.56 | 2.6 s | Paper world map | "Where do the pings go?" | DIVE into the data-center pin |
| 8 | 0:33.14 | 3.6 s | Data center, worker ring | "Trick one…" | Continuous |
| 9 | 0:36.74 | 8.1 s | Worker ring | "Uber's geospatial service…" | Push into one chip |
| 10 | 0:44.89 | 5.6 s | Memory chip, close | "In Uber's words…" | WHIP right |
| 11 | 0:50.46 | 4.2 s | Data center outside + vault | "History still gets saved…" | MATCH along the conveyor |
| 12 | 0:54.66 | 7.9 s | Cassandra warehouse | "A separate Cassandra cluster…" | PULL up to the map |
| 13 | 1:02.56 | 4.1 s | Top-down New York map | "Trick two…" | MORPH to globe |
| 14 | 1:06.66 | 6.5 s | Globe, cube, S2 cells | "Uber's dispatch cut the earth…" | Continuous |
| 15a | 1:13.12 | 4.6 s | New York cell map | "To find cars near Sam…" | Split screen slides in |
| 15b | 1:17.76 | 4.0 s | Split: map + ring | "and asks only those shards…" | MORPH squares to hexagons |
| 16 | 1:21.76 | 6.7 s | H3 heatmap | "Later, Uber built its own grid…" | DIVE into one hexagon |
| 17a | 1:28.43 | 3.7 s | Grid-paper diagram | "Why hexagons?…" | Sideways slide |
| 17b | 1:32.13 | 3.5 s | Grid-paper diagram | "Squares have two distances…" | INK WIPE |
| 18 | 1:35.64 | 2.2 s | Street, Sam at the curb | "Trick three: stop polling." | Tilt up with the bubbles |
| 19 | 1:37.87 | 7.0 s | API gateway | "At one point, eighty percent…" | POOF |
| 20a | 1:44.83 | 2.6 s | Gateway + tube + phone | "So each app keeps one stream open," | Continuous |
| 20b | 1:47.39 | 4.7 s | Same + Fireball | "and a service called Fireball…" | Continuous |
| 21 | 1:52.13 | 6.0 s | The tube, close | "It started on Server-Sent Events…" | MATCH into the phone, PULL to street |
| 22 | 1:58.15 | 3.3 s | Curb, then top-down map | "Trick four…" | MATCH: route flies to the vault |
| 23a | 2:01.42 | 4.1 s | Schemaless vault | "Trips went into Schemaless…" | Pan right |
| 23b | 2:05.51 | 5.1 s | Spanner vault | "and live trip state later moved…" | PULL back to the ring |
| 24 | 2:10.59 | 3.3 s | Worker ring | "The pings in between…" | Continuous pull-back |
| 25a | 2:13.86 | 1.7 s | Three shelves | "Fleeting data in memory." | Light moves |
| 25b | 2:15.54 | 2.0 s | Three shelves | "History in a write-heavy store." | Light moves |
| 25c | 2:17.56 | 2.3 s | Three shelves | "Trips in a transactional database." | Continuous |
| 26 | 2:19.89 | 5.4 s | Shelves + arriving car | "Not every piece of data…" | End (1.2 s hold) |

---

## Part C. Shot by shot

### HOOK

### Shot 1: The street
`0:00.00–0:05.71 · 5.7 s · Bed: AMB-CITY`

**Voice:** "Every few seconds, every online Uber driver's phone sends a GPS ping." Stress *few seconds* and *GPS ping*.
**Subtitles:** `Every few seconds,` · `every online` · `Uber driver's phone` · `sends a GPS ping.`

**Frame:**
- Street level at eye height, with the horizon at y 760.
- Sam stands right of center on the near sidewalk (x 640, feet at y 1470, top of head at y 650), in 3/4 view facing left.
- The avenue runs diagonally from bottom-left to mid-right, with a crosswalk in the foreground (y 1500+).

**Environment:** [city-street](../../../library/sets/city-street.md) in its default layout, with `afternoon` light.

**Always moving:** the set's loops (cars, 7 pedestrians, clouds, tree, cart umbrella, steam, pigeon), plus:
- Each car's roof pings every 4 s, each on its own phase.
- Each car's dashboard phone glints once as it passes.
- The 3 pedestrians behind Sam walk left to right. The tote-bag pedestrian starts crossing at +3.0 s. The pigeon pecks twice.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | A full picture on frame 1. Camera at z 1.00, centred (540, 960). Sam idles relaxed, breathing | The AMB-CITY bed is already at full level (no fade-in). The voice starts at 0.20 s |
| +1.0 s | The near-lane sedan crosses center | SFX-CAR-PASS −30, panned left to right |
| on "few seconds" | Three cars ping in a visible cascade (0.2 s apart) | SFX-PING ×3, −28, seeded pitch |
| +1.2 s | Sam blinks | — |
| on "Uber driver's" | Sam glances left toward the passing cars (head turns 10°, eyes shift). The cab's dashboard phone glints | — |
| on "GPS ping" | The closest car pings, with a slightly bigger ring (120 px) | SFX-PING −24 |
| +3.0 s | The coffee pedestrian sips. The tote-bag pedestrian steps off the curb | — |
| +3.6 s | Sam's head returns to center | — |
| +3.9 s | Sam blinks | — |
| +4.0 s | The pigeon flutters off, up and to the left | SFX-WINGS −32 |
| +4.3 s | Sam shifts weight | — |
| +4.6 s | — | SFX-HORN-FAR −38, far left |
| +4.9 s | The camera starts rising (y −60 px) and pulling back (z 1.06 to 1.00). This carries into 2a | — |

**Camera:** over 4.9 s it drifts from z 1.00 at (540, 960) to z 1.06 at (560, 900) (easeInOutSine), then starts the rise.

**Out:** continuous camera rise into 2a, on the same set.

---

### Shot 2a: That's a firehose
`0:05.71–0:07.05 · 1.3 s · Bed: AMB-CITY → AMB-HIGH`

**Voice:** "That's a firehose." Stress *firehose*.
**Subtitles:** `That's a firehose.`

**Frame:** the camera has risen to brownstone-roof height. The water towers are mid-frame, the street sits in the bottom third, and there's more sky.

**Environment:** the same set seen from higher. The far skyline is now clearly visible behind the roofs.

**Always moving:** clouds and cars below as in shot 1, plus the rising torrent.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The camera keeps rising (y −180 px over the shot) and rolls +1° | Bed crossfades to AMB-HIGH over the shot |
| on "firehose" | Every car pings at once. The dots don't fade: about 400 of them lift off and braid into a thick torrent between the buildings, curling like water from a hose (sine wobble at 0.8 Hz) | SFX-PING-SWARM swells from −30 to −20, starting on "fire-" |
| +0.5 s | 3 pigeons scatter from a roof ledge as the torrent passes. Pedestrians below look up one after another, 3 frames apart. Sam looks up | SFX-WINGS −30 |

**Camera:** keeps rising and zooms out from z 1.00 to 0.94 so the torrent fits.

**Out:** continuous into 2b.

---

### Shot 2b: Without melting the backend
`0:07.05–0:11.69 · 4.6 s · Bed: AMB-HIGH`

**Voice:** "So how does the map stay live without melting the backend?" Stress *live* and *melting*.
**Subtitles:** `So how does` · `the map stay live` · `without melting` · `the backend?`

**Frame:**
- A wide skyline at rooftop height.
- On the right horizon stands the **server tower** (x 820, base y 1100, top y 520): a building-sized rack with vent grilles and LED eyes.
- The torrent arcs from the bottom left up to the tower's top.

**Environment:** the low sun sits at the left edge, with a warm glow. Clouds pass at mid-depth.

**Always moving:**
- Dots stream along the arc at 900 px/s.
- The tower's LED eyes flicker faster as dots hit it.
- Clouds drift.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "how" | The torrent bends into a long curve toward the tower. The tower's eyes open, calm | SFX-PING-SWARM −24, panned left to right along the arc |
| on "live" | The tower's eyes go wide | — |
| on "melting" | The tower's outline turns `--alert`. 3 wavy heat lines rise from its top. The roof edge sags (points drop 12–24 px). Sweat drops from its "forehead" (2 drops) | SFX-SIZZLE −22, 1.0 s, with a metal creak |
| +0.3 s after "melting" | 3 drips run down its side (0.4 s each, seeded). One falls and splashes on a roof | SFX-DRIP ×3, −28 |
| +4.1 s | The camera starts gliding down. The torrent thins back into normal, occasional pings | — |

**Camera:** pushes toward the tower, from z 0.94 at (540, 900) to z 1.10 at (700, 820), over "So how does the map stay live". It settles on "backend".

**Out:** a vertical WHIP down (0.6 s, with speed lines) that lands in a medium close-up of Sam. SFX-WHIP. The bed crossfades back to AMB-CITY during the whip.

---

### ONE RIDE

### Shot 3: Follow one ride
`0:11.69–0:13.32 · 1.6 s · Bed: AMB-CITY`

**Voice:** "Follow one ride." Said lightly, like an invitation.
**Subtitles:** `Follow one ride.`

**Frame:** a medium close-up of Sam: head at y 560–830, torso down to y 1400. Behind: the deli awning and the street, simplified and mixed 25% toward paper.

**Always moving:**
- The awning flutters.
- A sedan passes behind Sam (left to right, +0.4 s).
- One pedestrian crosses far behind.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The whip lands at z 2.2 with a 3% overshoot | SFX-WHIP tail |
| on "Follow" | Anticipation: Sam's shoulders dip for 4 frames. Then Sam pulls the phone from a trouser pocket (10 frames) and raises it to chest height (x 600, y 1100). Expression turns curious (brows up, small "o" mouth) | SFX-CLOTH −30 |
| +0.4 s | The sedan passes behind | SFX-CAR-PASS −32 |
| +0.7 s | Sam's head tilts 8° down to the screen. Screen glow lights Sam's chin (`--ping-glow` at 20%) | — |
| +0.9 s | The camera starts the dive: z 2.2 to 3.0 toward the phone (easeInQuart) | SFX-WHOOSH-IN starts |

**Out:** a DIVE into the phone screen. The screen fills the frame over 0.5 s, and from 70% of the move the home screen appears inside the screen's shape. The bed crossfades to AMB-PHONE.

---

### Shot 4a: Sam opens the app
`0:13.32–0:14.85 · 1.5 s · Bed: AMB-PHONE (city ducked to −40)`

**Voice:** "Sam opens the app,"
**Subtitles:** `Sam opens the app,`

**Frame:**
- The screen fills the frame, with the phone's dark rounded bezel (40 px) visible at the edges.
- The screen shows a home screen:
  - `--sand` wallpaper and an ink status bar ("5:42", signal, battery).
  - A 4×5 grid of simple hand-drawn app icons (sun, camera, chat bubble, music note, map pin…).
  - The ride app's icon, bigger (180 px), at x 540, y 900: a black rounded square with a white car silhouette and a blue ping dot. It's generic, not Uber's logo.

**Always moving:** paper-grain specks drift slowly on the wallpaper (3 px/s), and the ride icon's ping dot pulses.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | Sam's thumb enters from the bottom right (x 900 to 560), drawn large with a nail and ink outline, 1.15× parallax | — |
| on "opens" | The thumb taps the icon: the icon squashes 12% and the thumb 4% (3 frames), then both release (2 frames). A ripple ring expands from the tap point | SFX-TAP −24 |
| +8 frames | The icon zooms to fill the screen (8 frames, easeOutCubic), revealing the app's map: `--beige` blocks, `--paper` streets, a `--sage` park, a `--bluegrey` river edge, Sam's pulsing location dot, and a "Where to?" bar at the top | SFX-UI-POP −28 |

**Camera:** drifts +1% zoom.

**Out:** a UI change into 4b, with no camera move.

---

### Shot 4b: Picks a destination
`0:14.85–0:16.04 · 1.2 s · Bed: AMB-PHONE`

**Voice:** "picks a destination,"
**Subtitles:** `picks a destination,`

**Frame:** the "Where to?" bar expands into a search sheet that slides up from the bottom (8 frames, easeOutCubic). It has a text field and a simple keyboard drawn as rows of rounded keys.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "picks" | "Brooklyn Bridge Park" types itself into the field, one character per frame (about 0.7 s). The thumb hovers with small tapping motions, and keys under it light up | SFX-TYPE, 20 soft ticks, −30, slightly irregular |
| +0.8 s | A suggestion row with a pin icon appears under the field | SFX-UI-POP −32 |
| +1.0 s | The thumb taps the suggestion | SFX-TAP −26 |

**Camera:** pushes gently toward the field (z 1.00 to 1.04).

**Out:** the sheet collapses and the ride options slide up (4c).

---

### Shot 4c: Taps Confirm
`0:16.04–0:17.67 · 1.6 s · Bed: AMB-PHONE`

**Voice:** "and taps Confirm." Stress *Confirm*.
**Subtitles:** `and taps Confirm.`

**Frame:**
- The map shows a route line from Sam's dot to the destination pin, drawing in as a dashed line that turns solid.
- The bottom sheet (y 1000–1500) holds three ride cards: "Standard · 4 min" (selected, `--ping` outline), "Premium · 6 min" and "Large · 7 min". These are generic names.
- A big Confirm button sits at y 1380: 820×140 px, `--ink` fill, white text.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The route line draws in | Soft SFX-PENCIL −34 |
| on "taps" | The thumb lifts 10 px (anticipation), then presses Confirm: the button squashes 12% and darkens, then bounces back (easeOutBack). Six little lines burst out. The camera recoils (2 frames, 3 px) | SFX-TAP −24, then SFX-CONFIRM −24 on release |
| +0.3 s | The button text becomes "Finding your driver…" with 3 animated dots. Radar rings pulse out from Sam's dot (2 rings) | SFX-LIGHT (low) −30 per ring |

**Camera:** pushes toward the button (z 1.00 to 1.05).

**Out:** a UI change into 5.

---

### Shot 5: A driver accepts
`0:17.67–0:22.21 · 4.5 s · Bed: AMB-PHONE`

**Voice:** "A driver accepts, and a little car starts gliding toward Sam." Stress *accepts* and *gliding*.
**Subtitles:** `A driver accepts,` · `and a little car` · `starts gliding` · `toward Sam.`

**Frame:** the map fills the top two-thirds. A driver card sits at the bottom (y 1080–1420): a round avatar on the left, "Your driver is on the way" and "Grey sedan · 3 min".

**Always moving:** Sam's dot pulses, and the route line glows faintly.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "accepts" | The "Finding…" panel flips (8 frames) into the driver card | SFX-FLIP −28 |
| +0.6 s | The avatar nods and smiles | — |
| on "car" | A top-down car icon pops onto the map at x 260, y 420 (scale 0 → 110% → 100%) | SFX-DING −30 |
| on "gliding" | The car glides along the route toward Sam's dot (x 640, y 820), taking two turns, eased. The route line erases behind it. Every 1 s a tiny blue ping flashes on the car, so the viewer sees the updates arriving | SFX-PING −30 on each flash |
| +1.5 s | The avatar blinks | — |
| +3.5 s | The ETA text rolls from "3 min" to "2 min" | SFX-COUNTER (tiny) −34 |
| +4.0 s | The pull-back starts | SFX-WHOOSH-OUT starts |

**Camera:** follows the car gently (60 px pan, z 1.00 to 1.06).

**Out:** a PULL out of the phone. The screen shrinks back into the phone in Sam's hand (0.5 s), and AMB-CITY comes back.

---

### Shot 6a: Now zoom out
`0:22.21–0:23.50 · 1.3 s · Bed: AMB-CITY → AMB-HIGH`

**Voice:** "Now zoom out:" Stress *out*.
**Subtitles:** `Now zoom out:`

**Frame:** one continuous pull-back: the phone, then Sam holding it (medium), then Sam full-body on the sidewalk, then the rooftops. The sun is a little lower than in shot 1, and warmer.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | Sam looks at the phone, happy | — |
| on "zoom" | The camera pulls from z 3.0 to 0.45 (relative to the street) over 1.3 s (easeInOutCubic), rising from Sam (640, 1000) to the sky (540, 600) | SFX-WHOOSH-OUT, long (1.2 s), rising air |
| last 8 frames | The street's rooftops shrink and merge into the aerial map's building blocks (a MATCH crossfade) | — |

**Out:** continuous into 6b.

---

### Shot 6b: Thousands of riders, thousands of cars
`0:23.50–0:27.50 · 4.0 s · Bed: AMB-HIGH`

**Voice:** "thousands of riders, thousands of cars, all at once." Stress both *thousands*, and *all at once*.
**Subtitles:** `thousands of riders,` · `thousands of cars,` · `all at once.`

**Frame:**
- A tilted aerial view of stylised Manhattan (about 35°): blocks drawn as simple extruded boxes with water towers on the roofs.
- A `--sage` Central Park rectangle at the top, and `--bluegrey` rivers on both sides.

**Always moving:**
- 2 wispy clouds cross below the camera (30 px/s, parallax 1.3).
- The rivers glint.
- At +2.5 s, a V of 5 birds crosses the frame.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on first "thousands" | About 300 tiny phone lights (a person dot with `--ping-glow`) switch on across the blocks like fireflies, rippling outward from Sam's position (seeded, over 1.0 s) | A granular sparkle cloud of SFX-LIGHT, −28 |
| on second "thousands" | About 150 small cars appear on the avenues. Each drifts toward a nearby phone light along the street grid, trailing a short route line | SFX-PING-SWARM swells softly, −28 |
| on "all at once" | Every car pings on the same frame: one synchronised ring burst across the city. Then they drift back to staggered pings | A 3-ping chord at −24, with its transient in the gap just before "all" |

**Camera:** keeps pulling up (z 1.00 to 0.90) and rolls 2° counter-clockwise.

**Out:** continuous into 7a. The light starts shifting toward dusk.

---

### Shot 7a: Still pinging
`0:27.50–0:30.56 · 3.1 s · Bed: AMB-HIGH + AMB-DUSK`

**Voice:** "Every one of those cars is still pinging." Stress *still*.
**Subtitles:** `Every one` · `of those cars` · `is still pinging.`

**Frame:** the same aerial view in a time-lapse to dusk. The sky turns `--dusk`/`--night` with hatching. Building windows switch on as `--gold` squares, and streetlights make small glows.

**Always moving:**
- Windows switch on in a seeded order, 5% per frame, until about 60% are lit.
- Cars keep moving and pinging every 1–1.5 s (sped up).

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00–1.5 s | The light shifts from warm to dusk | AMB-DUSK layer fades in |
| throughout | Staggered pings | A sprinkle of SFX-PING, −30, 6–8 per second |
| on "pinging" | Thin threads of dots start rising from the streets, like fireflies drawn upward, converging toward the top of the frame | SFX-PING-SWARM (thin) −28, rising |

**Camera:** tilts up (y 700 to 500), z 0.90 to 0.85.

**Out:** continuous into 7b. The city flattens.

---

### Shot 7b: Where do the pings go?
`0:30.56–0:33.14 · 2.6 s · Bed: AMB-HIGH → AMB-PAPER`

**Voice:** "Where do the pings go?" A real question; let it lift at the end.
**Subtitles:** `Where do` · `the pings go?`

**Frame:**
- MORPH: over 12 frames the buildings sink into their footprints and the tilt goes to 0°, leaving a hand-drawn paper world map: `--sand` continents and a `--bluegrey` ocean with hatched waves.
- The 9:16 frame is panned so New York sits lower-left and a generic **data-center pin** sits upper-right, somewhere in the US interior. The pin is labeled only "data center", with no real site.

**Always moving:** the ocean hatching drifts slowly (5 px/s), and dots flow along the arcs.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The flattening | SFX-PAPER-FOLD −26 |
| on "Where" | The `--alert` New York pin bounces in. The rising streams become arcs (Bézier curves) running from New York to the data-center area | Thin SFX-PING-SWARM along the arcs |
| +1.0 s | The data-center pin pops in: a little building with a server icon | SFX-UI-POP −28 |
| +1.2 s | An invisible pencil doodles a "?" beside the arcs, which then fades | SFX-PENCIL −30 |
| +1.9 s | The camera starts the dive toward the data-center pin | SFX-WHOOSH-IN |

**Camera:** zooms out from the city framing (z 0.85) to the map framing (z 0.35), panning to fit the arcs, then dives.

**Out:** a DIVE into the data-center pin. The bed crossfades to AMB-DC.

---

### TRICK ONE: THE LIVE MAP LIVES IN MEMORY

### Shot 8: Trick one
`0:33.14–0:36.74 · 3.6 s · Bed: AMB-DC`

**Voice:** "Trick one: the live map lives in memory." Stress *memory*.
**Subtitles:** `Trick one:` · `the live map` · `lives in memory.`

**Frame:**
- A stylised data center: a dark room (`--night` mixed 60% with paper, hatched).
- Rows of racks in the far background, with LED dots.
- In the midground, a **ring of 12 worker boxes** on a circle (radius 330 px, center 540, 900), drawn as an ellipse at a 0.55 ratio. They stand on a round platform with a faint dashed circle joining them.

**Always moving:**
- The far racks' LEDs twinkle (seeded, every 1–3 s).
- 20 slow dust particles rise from the floor vents.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The dive lands with a 3% overshoot. The workers are dark. Pings rain down into the ring's centre from above, as if arriving from the pin | Soft SFX-PING rain −32 |
| on "Trick" | Badge 1 stamps in at the top left (x 170, y 330). Camera shake (3 frames, 6 px) and 4 ink spatter dots | SFX-STAMP-L −18 |
| on "live map" | The workers' LED eyes open one by one, clockwise, 2 frames apart | SFX-LIGHT ×12, a cascade from C to G, −30 |
| on "memory" | The memory chips light `--ping-glow` in the same order. Each shows 3–8 tiny moving car dots | Soft shimmer −32 |

**Camera:** eases the ring's ellipse from 0.55 to 0.60 and rotates it 12° clockwise (an orbit feel), z 1.00 to 1.08.

**Out:** continuous into 9. The camera keeps circling.

---

### Shot 9: Geospatial service, Ringpop, hash ring
`0:36.74–0:44.89 · 8.1 s · Bed: AMB-DC`

**Voice:** "Uber's geospatial service holds every online driver's position in RAM, spread across hundreds of workers by Ringpop, a consistent hash ring." Stress *RAM*, *hundreds* and *Ringpop*.
**Subtitles:** `Uber's geospatial service` · `holds every` · `online driver's position` · `in RAM,` · `spread across` · `hundreds of workers` · `by Ringpop,` · `a consistent hash ring.`

**Frame:** the worker ring, as shot 8 left it. This is a long line, so the picture changes on 6 key words.

**Always moving:**
- LED eyes blink (seeded).
- Car dots move inside the chips.
- Pings keep arriving from the top.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "geospatial" | Tech tag `Geospatial service` pins above the ring (x 540, y 420) | SFX-STAMP-S −24 |
| on "position" | The camera pushes toward the worker at 2 o'clock (z 1.08 to 1.35). Each arriving ping draws a thin line to exactly one owning worker. The highlighted worker catches pings with a 4% squash each | SFX-ZIP −30 ×6, only for the highlighted pings |
| on "RAM" | All chips pulse brighter, and a small `RAM` tag clips onto the highlighted chip | Soft SFX-LIGHT −30 |
| on "hundreds" | The camera pulls back hard (z 1.35 to 0.75 over 0.9 s). The 12-worker ring turns out to be part of a much bigger ring of about 200 tiny workers (radius 420 px), with the original 12 still highlighted | SFX-MULTIPLY −26, 0.8 s |
| on "Ringpop" | Tech tag `Ringpop` pins below the ring (x 540, y 1330). Tiny gossip bubbles ("··") hop between neighbouring workers around the ring | SFX-STAMP-S −24, SFX-CHIRP ×5 −32 |
| on "hash ring" | The dashed circle lights up as a hash space, with tick marks and 4 small labels at the cardinal points (`0x0`, `0x4`, `0x8`, `0xC`). One example ping lands on the ring and slides clockwise to the next worker: the consistent-hashing rule | A soft click −28 when it docks |

**Camera:** push on "position", big pull on "hundreds", slow 4° rotation on "Ringpop", slight push (z 0.75 to 0.82) on "hash ring".

**Out:** the camera pushes into the highlighted worker's memory chip. This is a DIVE, but a short one (0.4 s).

---

### Shot 10: "Database storage would be useless"
`0:44.89–0:50.46 · 5.6 s · Bed: AMB-DC (a little closer and warmer)`

**Voice:** "In Uber's words, the data is so fleeting that database storage would be useless." Stress *fleeting* and *useless*. There's a small smile in "In Uber's words".
**Subtitles:** `In Uber's words,` · `the data is` · `so fleeting` · `that database storage` · `would be useless.`

**Frame:** an extreme close-up of the memory chip, filling about 70% of the frame.
- The chip is a `--sage`/`--olive` circuit board with `--gold` contacts.
- A glowing window on it shows a mini map with 8 car dots.

**Always moving:** the car dots keep moving, and the board's tiny LEDs blink.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "words" | A `--note` yellow sticky note drops onto the chip's upper-right corner (tilted 6°, with a 2-frame squash). In Kalam handwriting: "database storage would be useless". Below, in small mono: "— Uber Engineering, 2016" | SFX-NOTE −24 |
| on "fleeting" | Each car dot shows a tiny timer ring that fills over about 2 s. When it's full, the dot fades and pops, and a new dot appears a little ahead (the car's new position). This keeps going for the rest of the shot | SFX-FADE-POPS −32 per pop, at most 3 per second |
| on "database storage" | A small classic database cylinder appears at the right (x 860, y 1150) | SFX-UI-POP −30 |
| on "useless" | A red ink ✕ is drawn over the cylinder (2 strokes, 6 frames), and the cylinder droops | SFX-PENCIL (two quick strokes) −28, then a soft SFX-BUZZ −32 |
| +4.9 s | The whip starts | — |

**Camera:** a slow push (z 2.8 to 3.0), then the whip.

**Out:** WHIP right (8 frames) to the data center's outside. SFX-WHIP.

---

### Shot 11: History still gets saved
`0:50.46–0:54.66 · 4.2 s · Bed: AMB-DC fading to −40, with the conveyor coming in`

**Voice:** "History still gets saved, just not in the trip database." Stress *History* and *not*.
**Subtitles:** `History still` · `gets saved,` · `just not in` · `the trip database.`

**Frame:**
- A cutaway of the data center building on the left, with the worker ring visible through a big round window (x 300, y 800).
- The Schemaless vault on the right (x 820, y 900), asleep.
- A conveyor belt runs along the bottom from the data center's side wall, curving around the vault and off-frame to the bottom right.
- The backdrop is a light `--bluegrey` with faint grid-paper lines: from here on we're in "system land".

**Always moving:**
- The ring glows and slowly turns in the window.
- Vent steam rises from the data center roof.
- The vault's snore bubble grows and shrinks (1.5 s cycle).

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "History" | A hatch in the data center's side wall opens and the conveyor starts: rollers spin and small cardboard boxes stamped with a pin icon (location boxes) ride out | SFX-CONVEYOR start clunk −26, then the belt loop −32 |
| on "just not" | The camera favours the vault: it's dozing, a "zzz" drifts up, and the belt clearly bends around it | SFX-SNORE −32 |
| on "trip database" | Tech tag `Schemaless · trip DB` pins onto the vault. Its eyelid twitches, but it stays asleep | SFX-STAMP-S −26 |
| +3.6 s | The camera starts following the belt down and to the right | SFX-RATTLE −34 |

**Camera:** the whip settles at z 1.0, then pans right 120 px following the boxes.

**Out:** a MATCH along the conveyor (0.5 s pan down-right) into the warehouse.

---

### Shot 12: Cassandra
`0:54.66–1:02.56 · 7.9 s · Bed: AMB-WAREHOUSE`

**Voice:** "A separate Cassandra cluster stores the location each app sends every thirty seconds, at over a million writes a second." Stress *Cassandra*, *thirty seconds* and *million*.
**Subtitles:** `A separate` · `Cassandra cluster` · `stores the location` · `each app sends` · `every thirty seconds,` · `at over a million` · `writes a second.`

**Frame:**
- A cutaway of a warehouse made of **6 connected bays** (the cluster), with tall shelves full of small hatched boxes.
- 3 tiny robots in the front bay.
- The conveyor enters from the top left.
- A big wall clock at the upper right (x 820, y 420).
- A counter sign at the top center (x 540, y 300).

**Always moving:**
- 2 light shafts from skylights, with dust drifting in them.
- The conveyor rollers spin, and boxes jiggle on the belt.
- The robots pass boxes hand to hand.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Cassandra" | Tech tag `Cassandra` pins on the sign. The camera eases back to show all 6 bays; boxes are handed round the bays in turn | SFX-STAMP-S −24 |
| on "each app" | Two small phone icons appear at the start of the conveyor, one tagged `driver app` (car icon) and one `rider app` (person icon). Both drop boxes onto the belt | SFX-BOX −30 ×2 |
| on "thirty seconds" | The clock's second hand sweeps 30 seconds in 0.8 s (a fast-forward), and on the 30 s mark both phones drop a box together | SFX-TICK ×30 in 0.8 s, −30, then SFX-BOX −28 |
| on "million" | The counter spins from 0 to "1,000,000+ writes/s" (digits rolling). The robots speed up into a blur of smear frames, and boxes pour in | SFX-COUNTER −24. Box landings blend into a clatter bed −30 |
| end of line | One robot wipes its forehead: busy, but fine | SFX-BEEP −34 |

**Camera:** pushes toward the counter on "million" (z 1.0 to 1.15), then pulls back and up.

**Out:** a PULL up and out. The warehouse shrinks into a tiny icon on a top-down map. SFX-WHOOSH-OUT. The bed crossfades to AMB-PAPER.

---

### TRICK TWO: INDEX BY CELL, NOT BY CAR

### Shot 13: Trick two
`1:02.56–1:06.66 · 4.1 s · Bed: AMB-PAPER with faint city at −44`

**Voice:** "Trick two: index by map cell, not by car." Stress *cell* and *car*.
**Subtitles:** `Trick two:` · `index by map cell,` · `not by car.`

**Frame:** a top-down paper map of lower Manhattan and Midtown, stylised.
- The street grid is inked, with `--beige` blocks, `--sage` Central Park at the top and `--bluegrey` rivers.
- About 60 car icons sit on the streets, and Sam's `--alert` pin is near the centre.

**Always moving:** the cars roll along the streets at 20 px/s, pinging small.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Trick" | Badge 2 stamps in, with a camera shake | SFX-STAMP-L −18 |
| on "index by map cell" | An ink pen draws a square grid over the map (120 px cells): horizontal lines first, then vertical, each line taking 4 frames, staggered | SFX-PENCIL, rhythmic, −28 |
| on "not by car" | A long index card listing "car 1, car 2, car 3…" scrolls up fast at the left and gets an `--alert` ✕. Then every car takes on its cell's tint (alternating `--sand` and `--bluegrey`), bucketed by cell | SFX-BUZZ −30 on the ✕, soft SFX-LIGHT −34 for the tinting |

**Camera:** arrives at z 1.0, then pushes slowly (z 1.0 to 1.06) with a −1° roll.

**Out:** zoom out, and the map wraps into a globe (MORPH).

---

### Shot 14: Google S2 cells
`1:06.66–1:13.12 · 6.5 s · Bed: AMB-PAPER`

**Voice:** "Uber's dispatch cut the earth into Google S2 cells and sharded drivers by cell ID." Stress *S2*, *sharded* and *cell ID*.
**Subtitles:** `Uber's dispatch` · `cut the earth` · `into Google S2 cells` · `and sharded drivers` · `by cell ID.`

**Frame:** a paper globe with hatched shading (radius 360 px, center 540, 820).

**Always moving:**
- The globe spins at 10°/s until it becomes a cube.
- The paper grid behind drifts faintly.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The map finishes wrapping into the globe | SFX-PAPER-FOLD −26 |
| on "dispatch" | Tech tag `Dispatch (DISCO)` pins at the top (x 540, y 330) | SFX-STAMP-S −24 |
| on "earth" | The globe spins | Soft paper rustle −36 |
| on "S2 cells" | MORPH (12 frames): the globe squares off into a cube, and the continents stretch onto its 3 visible faces. That's how S2 projects the sphere. Each face then splits 2×2, then 4×4, then 8×8 (6 frames per level), inked. Tech tag `Google S2` pins beside it | SFX-PAPER-FOLD −26, then 3 short SFX-PENCIL bursts −30, then SFX-STAMP-S −24 |
| on "sharded drivers" | The camera pushes into the face with New York (z 1.0 to 2.2). The cells over New York highlight, and thin wires run from each cell down to the worker ring, which shows small at the bottom (y 1400). Each cell's cars slide down its wire | SFX-ZIP −30 ×4 |
| on "cell ID" | 4 cells get small ID tags showing S2 cell tokens (for example `89c25…`). Check the real Manhattan tokens with the S2 library before building | SFX-UI-POP −30 ×4, 3 frames apart |

**Camera:** spins with the globe, pushes into New York on "sharded", then settles.

**Out:** continuous. The camera settles on the New York cell map with Sam's pin (15a).

---

### Shot 15a: A circle of cells
`1:13.12–1:17.76 · 4.6 s · Bed: AMB-PAPER`

**Voice:** "To find cars near Sam, it covers a circle around Sam with cells" Stress *circle*.
**Subtitles:** `To find cars` · `near Sam,` · `it covers a circle` · `around Sam` · `with cells`

**Frame:** a top-down New York cell map at a middle S2 level.
- The cells are 100–140 px, drawn as slightly skewed quads (S2 cells aren't perfect squares on a map).
- Sam's pin is at (540, 900), with about 40 cars scattered around.

**Always moving:** the cars drift and ping at low volume.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "near Sam" | Sam's pin pulses (3 rings) | Soft SFX-PING −30 |
| on "circle" | An inked drafting compass appears with its needle on Sam's pin and draws a 260 px circle in one sweep (0.6 s, easeInOutSine) | SFX-PENCIL, one long scratch, −26 |
| on "cells" | The cells the circle touches fill with `--ping-glow`, ordered by distance, 2 frames apart. That's about 12 cells: S2's "covering" of the circle | SFX-LIGHT ×12 rising, −32 |

**Camera:** a slight push (z 1.00 to 1.10) centred on Sam.

**Out:** continuous. A split screen slides up from the bottom (15b).

---

### Shot 15b: Only those shards
`1:17.76–1:21.76 · 4.0 s · Bed: AMB-PAPER + AMB-DC at −42`

**Voice:** "and asks only those shards. Not the whole city." Stress *only those shards*.
**Subtitles:** `and asks` · `only those shards.` · `Not the whole city.`

**Frame:** a vertical split.
- **Top half (y 200–1000):** the cell map with the lit circle.
- **Bottom half (y 1000–1500):** the worker ring as a wide ellipse. Thin wires run from each lit cell down to its owning worker; only 5 workers are involved.

**Always moving:** the dark workers breathe (a slow LED glow), and the cars on the map drift.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "asks" | 5 small ink arrows with "?" tails travel from Sam's pin down the wires to the owning workers, all at once | SFX-ZIP ×5 downward, −30 |
| on "only those shards" | Those 5 workers light up (eyes open, chips glow) and send car dots back up the wires. The dots land inside the circle, and those candidate cars get `--go` outlines | SFX-ZIP ×5 upward (pitch rising) −30, then SFX-DING −28 |
| on "Not the whole city" | The rest of the ring stays dark, with little "zzz"s on two sleeping workers. The map outside the circle drops to 40% saturation | SFX-SNORE −38 |

**Camera:** gentle drift. At the end it zooms into the map half (z 1.0 to 1.2) as the split closes.

**Out:** MORPH. The square cells melt into hexagons (16).

---

### Shot 16: H3 hexagons
`1:21.76–1:28.43 · 6.7 s · Bed: AMB-PAPER`

**Voice:** "Later, Uber built its own grid to optimize pricing and dispatch: H3, made of hexagons." Stress *pricing*, *dispatch* and *H3*.
**Subtitles:** `Later, Uber built` · `its own grid` · `to optimize pricing` · `and dispatch:` · `H3,` · `made of hexagons.`

**Frame:** the New York map, full screen again as the split closes.

**Always moving:**
- The heatmap breathes (±5% intensity, 0.3 Hz).
- The cars keep moving.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Later" | A "2018" year stamp thuds in at x 760, y 330 | SFX-STAMP-S −26 |
| on "its own grid" | The square cells' corners slide into a hexagon tiling (14 frames), rippling out from the centre | Soft SFX-PAPER-FOLD −30, plus a crystalline "tink" cascade −32 |
| on "pricing" | The hexagons fill with a heatmap (sage → sand → terracotta) that rises like liquid in each cell (8 frames each, staggered by distance). It's hottest around a couple of seeded spots | SFX-HEAT −28 |
| on "dispatch" | A few cars glide across hexagon borders toward riders, and each hexagon they enter outlines briefly in `--ping` | Soft SFX-LIGHT −32 ×3 |
| on "H3" | Tech tag `H3` stamps at the top (x 540, y 330), with a small sub-tag "Uber, 2018" | SFX-STAMP-S −24 |
| on "hexagons" | Every hexagon outline pulses once (5 px to 8 px and back, 6 frames) | — |

**Camera:** a slow zoom toward one hexagon near Sam (z 1.0 to 1.6, easeInOutCubic) across the whole shot.

**Out:** a DIVE into that hexagon, landing on the grid-paper diagram.

---

### Shot 17a: Why hexagons
`1:28.43–1:32.13 · 3.7 s · Bed: AMB-PAPER`

**Voice:** "Why hexagons? Every neighbor sits the same distance away." Stress *same distance*.
**Subtitles:** `Why hexagons?` · `Every neighbor` · `sits the same` · `distance away.`

**Frame:** clean grid paper (a faint `--bluegrey` 40 px grid). A central `--sand` hexagon (radius 120 px) sits at (540, 860).

**Always moving:** line boil only. The page is calm on purpose.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Why hexagons" | The 6 `--beige` neighbours pop in clockwise, 2 frames apart. A small "?" doodle appears | SFX-UI-POP ×6 −30 |
| on "Every neighbor" | 6 arrows draw from the centre to each neighbour's centre, all at once (6 frames) | SFX-PENCIL −30 |
| on "same distance" | A wooden ruler (`--sand` with tick marks) slides in and measures one arrow. Every arrow gets the same "d" tag | SFX-RULER −28 |
| after "away" | A `--go` ✓ appears | SFX-DING −26, in the pause |

**Camera:** drifts from z 1.00 to 1.04.

**Out:** a sideways slide. The camera pans right 1080 px (10 frames, easeInOutCubic), with SFX-WHIP (soft).

---

### Shot 17b: Squares have two distances
`1:32.13–1:35.64 · 3.5 s · Bed: AMB-PAPER`

**Voice:** "Squares have two distances: side and corner." Stress *two*.
**Subtitles:** `Squares have` · `two distances:` · `side and corner.`

**Frame:** the same grid paper, with a central `--sand` square (200 px) and its 8 `--beige` neighbours. A small Kalam label at the bottom (y 1300) reads "like S2's cells".

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Squares" | The 3×3 block draws in | SFX-PENCIL −30 |
| on "side" | 4 short arrows point to the side neighbours, tagged "d" | SFX-PENCIL −32 |
| on "corner" | 4 longer diagonal arrows point to the corner neighbours, tagged "1.41 d". The ruler measures one | SFX-RULER −28 |
| after "corner" | A `--alert` "≠" pops between the "d" and "1.41 d" tags | SFX-BUZZ −28, in the pause |

**Camera:** drift.

**Out:** INK WIPE. A thick ink stroke sweeps left to right (10 frames) and reveals the street. SFX-PENCIL (big stroke). The bed crossfades to AMB-CITY.

---

### TRICK THREE: STOP POLLING

### Shot 18: Trick three
`1:35.64–1:37.87 · 2.2 s · Bed: AMB-CITY`

**Voice:** "Trick three: stop polling." Stress *stop polling*.
**Subtitles:** `Trick three:` · `stop polling.`

**Frame:** a medium shot of Sam waiting at the curb (x 560), phone in hand, looking at it. Behind: the deli and a street lamp, late afternoon.

**Always moving:**
- The awning flutters.
- A car passes far behind.
- Steam puffs from the manhole.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Trick" | Badge 3 stamps in, with a camera shake | SFX-STAMP-L −18 |
| on "polling" | The phone starts popping "anything new?" speech bubbles, one every 0.25 s. Each one pops up and drifts toward the top of the frame, and the phone jolts slightly each time. Sam stays patient (closed-mouth smile, eyes half closed) and taps a heel twice: the joke is that the phone is the impatient one | SFX-BUBBLES, one pop per bubble, −30, pitch creeping up |

**Camera:** a slight push (z 1.20 to 1.26), then tilts up following the bubbles.

**Out:** a continuous tilt up (0.5 s) following the bubbles to the gateway.

---

### Shot 19: 80% polling
`1:37.87–1:44.83 · 7.0 s · Bed: AMB-GATE (from −36, rising)`

**Voice:** "At one point, eighty percent of requests to Uber's API gateway were apps polling for updates." Stress *eighty percent* and *polling*.
**Subtitles:** `At one point,` · `eighty percent` · `of requests` · `to Uber's API gateway` · `were apps polling` · `for updates.`

**Frame:**
- A toll-booth **API gateway** in the centre (x 540, y 900), with a striped barrier arm.
- Lanes of incoming requests below (y 1100–1450).
- A pie-chart sign on a pole at the upper left (x 250, y 450).
- A row of tiny phone icons along the bottom edge (y 1480).

**Always moving:**
- The lane stripes scroll toward the gate.
- The attendant's tea steams while there's calm.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "At one point" | Sam's bubbles arrive and join thousands more from the row of phones. The lanes fill | SFX-BUBBLES, dense, −32 |
| on "eighty percent" | The pie fills clockwise to 80% (an `--alert` slice), and its label reads "80% polling" | SFX-PIE −28 |
| on "API gateway" | Tech tag `API gateway` pins on the booth | SFX-STAMP-S −26 |
| on "polling" | The bubbles jam against the barrier, squashing (18%). The attendant goes from calm to overwhelmed: hands up, sweat drops, cap flying off. The barrier arm jitters, and the camera shakes (4 frames) | The AMB-GATE bed rises to −30 |
| after "updates" | The jam crunches, then bursts into dust (POOF) and clears the frame | SFX-CRUNCH −24, then SFX-POOF −24, both in the pause |

**Camera:** starts wide at z 1.0 and pushes toward the booth (to z 1.12).

**Out:** POOF. The dust clears onto the same booth, now calm (20a).

---

### Shot 20a: One stream open
`1:44.83–1:47.39 · 2.6 s · Bed: AMB-GATE fading to −40`

**Voice:** "So each app keeps one stream open," Stress *one stream*.
**Subtitles:** `So each app` · `keeps one stream open,`

**Frame:**
- The calm gateway.
- Sam's hand holds the phone large at the bottom right (x 760, y 1300), entering from the bottom.
- A single glass tube, like a pneumatic post tube, curves from the back of the booth to the phone.
- 6 faint tubes run from phones in the far background ("each app").

**Always moving:** the attendant sips tea, relieved.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "one stream" | The tube draws itself from the booth to the phone (10 frames). Then a soft glow runs along it once in each direction: the handshake | SFX-TUBE −26, then a soft "blip-blip" −30 |

**Camera:** pans slightly toward the phone (x +40), z 1.12 to 1.08.

**Out:** continuous.

---

### Shot 20b: Fireball decides
`1:47.39–1:52.13 · 4.7 s · Bed: calm gate + SFX-FLAME loop`

**Voice:** "and a service called Fireball decides when an update is worth pushing." Stress *Fireball* and *worth pushing*.
**Subtitles:** `and a service` · `called Fireball` · `decides when` · `an update` · `is worth pushing.`

**Frame:** the same, plus **Fireball** at a tiny desk by the tube's mouth (x 420, y 1050). A small conveyor feeds event cards into its desk.

**Always moving:**
- Fireball's flame flickers (3 Hz) and it blinks.
- Event cards trickle in on the little conveyor.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Fireball" | Fireball pops up from behind the desk (anticipation squash, flame flare), and a `Fireball` tech tag pins beside it | SFX-STAMP-S −26. The SFX-FLAME loop starts at −34 |
| on "decides" | Fireball reads each card (eyes scan). Cards include "car moved", "ETA changed", "driver arrived", plus noise like "same position". It stamps `--go` "PUSH" on some and tosses the rest, which fall away. That's 4 cards in 2 s | SFX-STAMP-S −28 per PUSH, SFX-TOSS −34 per skip |
| on "worth pushing" | A PUSH card turns into a dot and shoots down the tube into Sam's phone, and the car icon on the phone's map nudges forward. Two more pushes follow | SFX-TUBE −28 per push |

**Camera:** pushes toward Fireball (z 1.08 to 1.18), then follows a pushed dot to the phone (pan +80 px, 0.5 s).

**Out:** continuous. The camera moves along the tube (21).

---

### Shot 21: SSE, then gRPC over QUIC
`1:52.13–1:58.15 · 6.0 s · Bed: calm, SFX-FLAME fades`

**Voice:** "It started on Server-Sent Events and moved to gRPC streams over QUIC." Stress *Server-Sent Events*, *gRPC* and *QUIC*. Say "gee-ar-pee-see" and "quick".
**Subtitles:** `It started on` · `Server-Sent Events` · `and moved to` · `gRPC streams` · `over QUIC.`

**Frame:** a close-up that tracks along the tube (z 1.4) as it runs diagonally across the frame. A label plate hangs on the tube.

**Always moving:** arrows flow inside the tube, and the camera tracks at 60 px/s.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Server-Sent Events" | The plate reads `SSE · HTTP/1.1`, with a "2020" year stamp. Arrows flow one way only, server to phone. A small counter on the plate reads "1.5M+ open connections"; that figure is from the 2020 post, so it only appears with the SSE label | SFX-STAMP-S −28, then soft SFX-TUBE flow −32 |
| on "moved" | The plate flips over | SFX-FLIP −26 |
| on "gRPC streams" | The plate now reads `gRPC · QUIC/HTTP3`, with a "2022" year stamp. The tube bulges wider (1.3×), and arrows now run both ways | Two-tone "whoosh-whoosh" −30 |
| on "over QUIC" | The flow smooths out and the arrows speed up | — |
| +5.2 s | The camera follows one dot out of the tube into Sam's phone, where the app car reaches Sam's dot | SFX-WHOOSH-IN (short) |

**Camera:** tracking, then the follow into the phone.

**Out:** MATCH. The app car reaching Sam's dot becomes a PULL out of the phone to the street, where the real car pulls up (22).

---

### TRICK FOUR: THE TRIP GETS REAL STORAGE

### Shot 22: Trick four
`1:58.15–2:01.42 · 3.3 s · Bed: AMB-CITY → AMB-PAPER`

**Voice:** "Trick four: the trip gets real storage." Stress *real storage*.
**Subtitles:** `Trick four:` · `the trip gets` · `real storage.`

**Frame:** the curb. A `--sage` sedan pulls up from the left and dips forward as it stops. Sam stands at the curb.

**Always moving:** the city as in shot 1, but calmer.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The car stops, with a dip | SFX-CAR-STOP −28 |
| on "Trick" | Badge 4 stamps in, with a camera shake | SFX-STAMP-L −18 |
| on "the trip" | Sam, happy, opens the back door (0.3 s swing), gets in (0.6 s), and the door closes. The car pulls away to the right | SFX-DOOR open −28 and close −24, then SFX-CAR-GO −30 |
| on "real storage" | A MATCH dissolve (8 frames) to a top-down map, at the car's position. The car drives across the map leaving a solid 6 px `--ink` route line, with start and end pins | SFX-PENCIL −28, drawing the line |
| end | The route line lifts off the map, and a soft shadow appears 20 px under it | SFX-WHOOSH-OUT (soft) −30 |

**Camera:** drifts on the street shot, then pans with the car on the map.

**Out:** MATCH. The lifted route line flies to the vault (23a).

---

### Shot 23a: Schemaless
`2:01.42–2:05.51 · 4.1 s · Bed: AMB-PAPER with a stone-room reverb`

**Voice:** "Trips went into Schemaless, Uber's append-only datastore on MySQL," Stress *Schemaless* and *append-only*. Say "schema-less" and "my-ess-cue-ell".
**Subtitles:** `Trips went into` · `Schemaless,` · `Uber's append-only` · `datastore on MySQL,`

**Frame:** the Schemaless vault, awake now (no face), in a cutaway front view. Inside is a stack of stone bricks, one brick per record, with new bricks on top. The vault stands on foundation stones.

**Always moving:** dust motes drift through a light shaft into the vault.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Trips went into" | The route line rolls up into a brick (MORPH, 10 frames) with a tiny trip icon on it, and flies into the vault's slot | SFX-WHOOSH-IN (short) −30 |
| on "Schemaless" | Tech tag `Schemaless` pins on the vault | SFX-STAMP-S −24 |
| on "append-only" | A ghost brick hovers over an old brick as if to overwrite it and gets an `--alert` ✕. The new brick settles on top of the stack instead, and a small tag reads "append-only" | SFX-BUZZ (tiny) −32, then SFX-BRICK −24 |
| on "MySQL" | Tech tag `MySQL` pins on the foundation stones: Schemaless is built on MySQL | SFX-STAMP-S −26 |

**Camera:** a slow push toward the stack (z 1.0 to 1.12).

**Out:** pan right (0.4 s) to the second vault.

---

### Shot 23b: Spanner
`2:05.51–2:10.59 · 5.1 s · Bed: AMB-PAPER + SFX-TICK steady`

**Voice:** "and live trip state later moved to Google Cloud Spanner for real transactions." Stress *Spanner* and *transactions*.
**Subtitles:** `and live trip state` · `later moved to` · `Google Cloud Spanner` · `for real transactions.`

**Frame:** the Spanner vault: smooth `--sage` stone, door open, with the atomic clock on top.

**Always moving:** the clock's second hand ticks every second, and a faint glow comes from inside the vault.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| 0.00 | The clock ticks | SFX-TICK −34, once per second |
| on "live trip state" | A glowing card slides in from the left. On it is a tiny state machine: three dots labeled "requested → on trip → completed", with the active dot lit | Soft SFX-LIGHT −32 |
| on "later" | A "2021" year stamp thuds in | SFX-STAMP-S −26 |
| on "Google Cloud Spanner" | Tech tag `Google Cloud Spanner` pins on the vault | SFX-STAMP-S −24 |
| on "transactions" | The card snaps inside, the heavy door swings shut, and a big `--go` "COMMIT" stamp thuds onto the door. Camera shake (4 frames) | SFX-VAULT −22, with SFX-STAMP-L −20 landing on the lock, in the pause right after the word |

**Camera:** pushes toward the stamp (z 1.0 to 1.15).

**Out:** PULL back, and pan left to the worker ring (24).

---

### Shot 24: The pings in between
`2:10.59–2:13.86 · 3.3 s · Bed: AMB-DC (soft, −38)`

**Voice:** "The pings in between never needed that." Relaxed, a shrug in the voice.
**Subtitles:** `The pings in between` · `never needed that.`

**Frame:** back at the worker ring from trick one, lit more calmly now. The chips hold car dots.

**Always moving:** the LEDs blink, and the chips glow gently.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "pings in between" | The camera looks over the chips and their dots | — |
| on "never needed that" | The dots float out of the chips like soap bubbles and pop softly (seeded, over 1.5 s). The chips settle into a quiet idle glow: the fleeting data is gone and nothing was lost | SFX-FADE-POPS ×10 −32 |
| +2.4 s | The camera starts pulling back | — |

**Camera:** pulls back slowly (z 1.1 to 0.9) until the ring, the warehouse and the vault all stand side by side as three shelves.

**Out:** a continuous pull-back into 25a.

---

### TAKEAWAY

### Shots 25a–25c: Three shelves
`2:13.86–2:19.89 · 6.0 s (25a 1.7 s · 25b 2.0 s · 25c 2.3 s) · Bed: AMB-PAPER`

**Voice:**
- 25a: "Fleeting data in memory."
- 25b: "History in a write-heavy store."
- 25c: "Trips in a transactional database."

Stress *memory*, *write-heavy* and *transactional*. Give it the rhythm of a list.
**Subtitles:** `Fleeting data` · `in memory.` · `History in` · `a write-heavy store.` · `Trips in a` · `transactional database.`

**Frame:**
- Three objects on wooden `--brown` shelves, side by side (each 300×360 px, at y 650–1150):
  - left: the mini worker ring;
  - centre: the mini Cassandra warehouse;
  - right: the mini Spanner vault.
- Each has a tech tag above it (`memory`, `Cassandra`, `Spanner`) and a Kalam caption card below (y 1220): "fleeting", "history", "trips".

**Always moving:** each object's own small loop continues: the ring's LEDs, the warehouse's belt and the vault's clock.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Fleeting" (25a) | A warm spotlight cone from above lights the left shelf, and its label pops. The ring's chips shimmer, and the other two shelves dim to 30% | SFX-LIGHT (low pitch) −26 |
| on "History" (25b) | The centre shelf lights up, and the left one settles at 70% | SFX-LIGHT (mid pitch) −26 |
| on "Trips" (25c) | The right shelf lights up. Now all three are lit | SFX-LIGHT (high pitch) −26 |

**Camera:** a slow drift right following the light (x 380 to 700 over 6 s), at z 1.0.

**Out:** continuous. A car rolls in (26).

---

### Shot 26: Not every piece of data
`2:19.89–2:25.24 · 5.4 s (includes a 1.2 s hold) · Bed: AMB-CITY returns softly (−36) under AMB-PAPER`

**Voice:** "Not every piece of data deserves the same kind of storage." Land it warmly; *storage* resolves.
**Subtitles:** `Not every piece` · `of data deserves` · `the same kind` · `of storage.`

**Frame:** the three shelves stay in the background as the car rolls into the foreground (x 540, y 1350), so the shelves read like shop windows along a street.

**Always moving:**
- The shelves' glows breathe.
- Pedestrian silhouettes pass behind the shelves.
- Sam blinks.

**Beats:**

| When | Picture | Sound |
|---|---|---|
| on "Not every" | The car rolls in and stops with a dip, and the door opens | SFX-CAR-STOP −30, SFX-DOOR (open) −28 |
| on "piece of data" | Sam steps out (0.9 s), stands, and looks delighted | SFX-STEP −34 |
| on "deserves" | Sam waves at the camera (3 swings) | — |
| on "storage" | A title card slides up into the top area (y 300–520): a paper card with an ink border reading "How Uber shows moving cars" in Kalam Bold 64 px. Below it, in JetBrains Mono 26 px: "From Uber Engineering posts and talks, 2015–2022" | SFX-BELL-SOFT −24, landing as the card settles |
| +0.3 s after "storage" | The last subtitle clears so it doesn't compete with the title | — |
| final 1.2 s | A living hold: glows breathe and Sam blinks once. No fade to black. The ambience eases down to −50 over the last 0.5 s | Ambience tail |

**Camera:** a slight push (z 1.00 to 1.04).

**End:** 2:25.24 at the estimated pace.

---

## Part D. Build checklist

**Sets (13):**
1. New York street, in afternoon and curb variants
2. Phone UI: home screen, search, ride options, live map with driver card
3. Aerial Manhattan, in afternoon and dusk
4. Paper world map
5. Data center with the worker ring
6. Memory-chip close-up
7. Data center exterior with the conveyor
8. Cassandra warehouse
9. Globe, cube and S2 cell map
10. H3 heatmap
11. Grid-paper diagrams
12. API gateway, tube and Fireball desk
13. The two vaults, the three shelves and the end card

**Characters (9):** Sam, pedestrians (6 variants), the driver avatar, the server tower, the geospatial workers, the Cassandra robots, the gateway attendant, Fireball, and the vaults (only Schemaless has a face, in shot 11).

**Props and graphics:**

| Group | Items |
|---|---|
| Vehicles | Street cars (4), map car icons |
| Pings | Ping dots and rings, the ping torrent |
| Labels | Trick badges (4), tech tags (13), year stamps (4) |
| Counters and charts | Counters (writes/s, ETA, connections), the 80% pie |
| Paper and drawing tools | Sticky note, compass, ruler, index card |
| Stamps and cards | PUSH and COMMIT stamps, event cards, speech bubbles |
| Warehouse and tube | Bricks, boxes, conveyor, pneumatic tube, clock |
| Marks | ✕, ✓ and ≠ |

**Audio:**
- The voice track.
- 8 ambience beds.
- About 45 sound effects from [sfx.md](../../../library/sound/sfx.md); 9 of them are synthesised.

**Fonts:** Fredoka, Kalam and JetBrains Mono.

**Check before building:**
1. The real S2 cell tokens for Manhattan (shot 14).
2. The exact wording of the sticky-note quote (shot 10), against the Ringpop post.
3. That the "1.5M+" counter appears only next to the 2020 SSE label (shot 21).
4. That the generic app shows no Uber logo, and ride names aren't Uber's.
5. Every tech tag spelled exactly as in the claims table.
6. **Reads.** Under the new [timing-reads](../../../library/craft/timing-reads.md) rule, these shots stack several new ideas at once. Write out their reads once Phase 2 gives real timings, and fix them before building:
   - 7b: the flat map, the arcs, the data-center pin and a "?" doodle all land in 2.6 s. The doodle can go.
   - 9 and 16: six new ideas each, in 7–8 s. The "Ringpop" and "hash ring" beats in 9, and the "H3" tag with its sub-tag in 16, are the tightest.
   - 14: the "S2 cells" beat stacks the cube morph, three levels of splitting and a tech tag. Spread it over "S2" and "cells", or drop a split level.
   - 17b: three text tags ("d", "1.41 d", "like S2's cells") plus the ruler and a ≠, in 3.5 s.
   - 21: the first beat shows the SSE plate, the 2020 stamp and the 1.5M counter at the same time.
   - 22: the car stopping, badge 4, Sam getting in, the match to the map and the route line, all in 3.3 s.
   - 23b: the state card is text-heavy ("requested → on trip → completed").
   - 26: the end card's title and footnote need about 2.5 s to read, but the hold is 1.2 s.
