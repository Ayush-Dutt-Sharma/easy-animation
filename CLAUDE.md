# easy-animation

This project makes vertical videos, both ads and explainers, rendered from code. Claude writes HTML/JS that draws every frame, HyperFrames renders it to MP4, and the voice-over sets the timing.

**Status: Phase 1, style test.** Both looks are rendered and the user is picking one. Start the next phase only when the user says so. Read `PLAN.md` first for the status, the current phase and the open questions.

## Where things live

- `library/`: everything reusable (craft, design, characters, sets, props, sound, process). Start at [library/README.md](library/README.md).
- `videos/<name>/`: one folder per video, holding its brief (script, claims, storyboard) and its shot-by-shot script.
- `reference/`: the videos we learn from, and what we took from each.
- `engine/`: the shared drawing code ([kit.js](engine/kit.js), [themes.js](engine/themes.js)) and the determinism check. Renders go to `renders/`, which is gitignored.

## Working with the library

- Before storyboarding or building, read [library/craft/rules.md](library/craft/rules.md). Then load only the modules the current step or shot uses; [library/process/pipeline.md](library/process/pipeline.md) lists them.
- Shots refer to library names and IDs. Don't copy a module into a script; change the module instead.
- When you change a library file, update its status and date, and add a line to [library/CHANGELOG.md](library/CHANGELOG.md).
- New pieces start in the video's folder. The retro ([library/process/retro.md](library/process/retro.md)) decides what gets promoted.
- The review loop is in [library/process/review-loop.md](library/process/review-loop.md).

## Render rules (break these and the video flickers)

- Every frame is a pure function of time `t`. The same `t` gives the same pixels, whatever order frames render in.
- Motion comes only from GSAP timelines or `draw(t)`. Never use `requestAnimationFrame`, `setTimeout`, `Date.now()`, unseeded `Math.random()` or fetches during a render.
- Hand-drawn wobble uses a seeded RNG, reseeded 12 times a second (`seed = element id * 1000 + floor(t * 12)`). The lines "boil", but every render comes out identical.
- Output is 1080×1920 at 30 fps. Snap the seek time to that grid (`Math.round(t * 30) / 30`): a render worker's first seek can land a hair off it.
- Before a final render, run `sh engine/check-determinism.sh <composition> [theme]`. It renders every frame with 1 worker and with 5, and fails if any frame differs.

## HyperFrames

- Pin the version and set both env vars on every command: `DO_NOT_TRACK=1 HYPERFRAMES_SKIP_SKILLS=1 npx --yes hyperframes@0.8.80 …`.
- Render one file with `render -c <file> -o <out.mp4>`, and pick the look with `--variables '{"theme":"watercolor-ink"}'`. `--format png-sequence` writes every frame as a PNG.
- Asset paths are root-relative (`engine/kit.js`), never `../`: those fail lint and 404 in the preview.
- `lint` needs a folder with an `index.html`. To lint a single file, render it with `--strict --lint-verbose`.
- `snapshot` has no `-c`, so take stills and contact sheets from a render with ffmpeg. Never use `snapshot --describe`: it sends frames to Gemini.

## Script and claims

- Once approved, the script is locked. Don't reword it in code.
- Write numbers as words in the voice script. Subtitles can show digits.
- Every claim must match a source: product docs for ads, primary sources such as engineering blogs for explainers. Track them in the brief's claims table. Never invent stats, reviews or medical claims.
- Real brands can be named but not copied: no logos and no cloned app screens.

## Secrets

API keys (ElevenLabs and the like) live in `.env`, which is gitignored, and are read from environment variables. They never go in prompts, code or commits.

## Environment

- Node 22 through nvm. Shells don't load it, so start each command with `source ~/.nvm/nvm.sh && nvm use` (it reads `.nvmrc`).
- ffmpeg 7 with libass, at `~/.local/bin/ffmpeg`.
