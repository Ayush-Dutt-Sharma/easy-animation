# Library

Everything reusable lives here. A video takes what it needs from this folder and keeps only its own story in `videos/<name>/`. The idea changes with every video; the library is the part that keeps getting better.

## Catalogue

| Folder | File | What it holds | Status |
|---|---|---|---|
| craft | [rules.md](craft/rules.md) | The goals and the rules every video follows | draft |
| | [timing-reads.md](craft/timing-reads.md) | Timing a shot by what the viewer has to understand | draft |
| | [animation.md](craft/animation.md) | Animation principles, with our numbers | draft |
| | [storytelling.md](craft/storytelling.md) | Structures for ads and explainers, patterns, script writing | draft |
| | [metaphors.md](craft/metaphors.md) | Pictures for system concepts (a database as a vault, polling as bubbles…) and how to find new ones | draft |
| | [common-failures.md](craft/common-failures.md) | What makes a video look generated or wrong. Grows with every video | draft |
| design | [themes/paper-pencil.md](design/themes/paper-pencil.md) | The reference ad's look: palette, lines, hatching, grain, light | draft |
| | [themes/watercolor-ink.md](design/themes/watercolor-ink.md) | The P(doom) video's look | draft |
| | [format-9x16.md](design/format-9x16.md) | Vertical output, safe zones, platform UI zones | draft |
| | [typography.md](design/typography.md) | Subtitles, labels, tech tags, numbers | draft |
| | [camera.md](design/camera.md) | How the camera moves | draft |
| | [transitions.md](design/transitions.md) | DIVE, PULL, WHIP, MORPH, the wipes, MATCH, IRIS and more | draft |
| characters | [sam.md](characters/sam.md) | The everyperson lead | draft |
| | [crowd.md](characters/crowd.md) | Pedestrians and background people | draft |
| | [tech-mascots.md](characters/tech-mascots.md) | Systems as characters: server tower, workers, robots, gatekeeper, flame clerk, vaults | draft |
| | [emotions.md](characters/emotions.md) | The shared emotions, emotes, and how a face changes | draft |
| sets | [city-street.md](sets/city-street.md) | A New York street, rooftops and skyline | draft |
| | [aerial-city.md](sets/aerial-city.md) | A tilted aerial city, afternoon and dusk | draft |
| | [phone-ui.md](sets/phone-ui.md) | A generic phone and app screens | draft |
| | [paper-maps.md](sets/paper-maps.md) | World map, top-down city map, globe | draft |
| | [data-center.md](sets/data-center.md) | Server room, worker ring, memory chip, exterior | draft |
| | [system-land.md](sets/system-land.md) | The grid-paper world: warehouse, gateway, tube, vaults, shelves | draft |
| props | [data-graphics.md](props/data-graphics.md) | Pings, dot swarms, routes, grids, heatmaps, counters, charts | draft |
| | [labels-and-stamps.md](props/labels-and-stamps.md) | Badges, tech tags, stamps, sticky notes, marks, cards | draft |
| | [objects.md](props/objects.md) | Vehicles, drawing tools, conveyor, boxes, bricks, clocks | draft |
| sound | [voice.md](sound/voice.md) | Voice tools, delivery, pace, pronunciation | draft |
| | [ambience.md](sound/ambience.md) | Background beds | draft |
| | [sfx.md](sound/sfx.md) | The sound-effect library, with IDs | draft |
| | [mix.md](sound/mix.md) | Levels, loudness and mix rules | draft |
| | [music.md](sound/music.md) | Sourcing and ducking music, for when a video has it | draft |
| process | [pipeline.md](process/pipeline.md) | The steps from brief to finished MP4, and what to load at each | draft |
| | [review-loop.md](process/review-loop.md) | How Claude checks its own frames | draft |
| | [retro.md](process/retro.md) | The after-video review that updates this library | draft |

**Status** is at the top of every file:
- `draft`: planned, not built yet.
- `built`: exists in code.
- `proven`: used in a finished video. Only `proven` modules can be trusted without a check.

## How a video uses it

1. The brief picks a theme, a format, characters and sets. The video's script lists them in a "Uses" table at the top.
2. Shots point to library names and IDs (`sam`, `city-street`, `DIVE`, `SFX-PING`) instead of copying them. Fix a module once and every video that uses it gets the fix.
3. Anything the library lacks is written in the video's own folder first.
4. A build session loads only the modules its shot uses. Less context means cheaper, sharper Claude calls.

## How it gets better

- **A retro after every video** ([process/retro.md](process/retro.md)) turns what happened into edits here:
  - new failures go into common-failures.md;
  - measured numbers replace guesses;
  - reusable pieces get promoted.
- **Promote on second use.** A piece moves from a video folder into the library when a second video needs it, or right away if it's plainly generic (a street, a phone).
  - It gets a generic name when it moves: Uber's "Fireball" is the library's "flame clerk".
- **Evidence changes rules.** Change a rule only when a finished video shows it's wrong, and say why in the changelog.
- **Log every change** in [CHANGELOG.md](CHANGELOG.md): the date, what changed, and which video or source taught it.
- **Model sheets.** Once a character or set is built, render a sheet of it (views, emotions, variants) into `library/sheets/` and link it from its file. Claude checks new work against the sheet.

## Adding a piece

Copy the fields for its kind, and skip the ones that don't apply.

- **Character:**
  - role, build and proportions, and sizes by shot (px on 1080×1920);
  - palette tokens, face, clothes or parts;
  - the views it needs, its idle loop, the emotions it uses, and gestures with durations;
  - what it can hold, and its sounds;
  - status and where it's used.
- **Set:**
  - what it stands for;
  - its layout by depth (far, back, middle, front), with positions;
  - palette tokens and light presets;
  - always-moving loops (at least two, with numbers);
  - framings and variants, and its ambience bed;
  - status and where it's used.
- **Prop:**
  - what it stands for, its size and its look;
  - how it enters, idles and leaves;
  - its sound;
  - status and where it's used.
