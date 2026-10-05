# easy-animation

Copy-paste code for glowing, minimal motion graphics. Each **recipe** is one small animation in one TypeScript file
with no dependencies. A **breakdown** takes a real short apart scene by scene and links each scene to its recipes.
The plan and open decisions are in `PLAN.md`.

## Commands (Node 22: `nvm use`)
```bash
npm run dev     # http://localhost:4400, reloads the page on every save: no build needed
npm run check   # astro check (types)
npm run build   # for deploys; also validates the catalogue: see src/catalog.ts
yt-dlp -o reference/<slug>.mp4 <url>        # download a reference short once; reuse the local copy after that
scripts/breakdown.sh reference/<video>.mp4   # contact sheets, 2 frames a second, for labelling scenes
```

## How it fits together
```
src/recipes/<slug>.ts        the files people copy: export DURATION and mount(svg) → render(t)
src/catalog.ts               every recipe oldest first + tags, breakdown list; fails the build on any mismatch
src/breakdowns/<slug>.ts     scenes of one reference short: timestamps, our own words, recipe slugs
src/preview.ts               browser: mounts a recipe and loops / scrubs render(t)
src/pages/                   / (gallery: newest first, search, tag, sort), /recipes/<slug>/ (preview + code + copy), /breakdowns/<slug>/
reference/                   reference videos, git-ignored: we never publish their footage
```

## Rules for a recipe
1. **Stands alone.** No imports. It repeats the small helpers it uses (`add`, `set`, `glow`, `clamp`, easings) at the
   bottom of the file under `// ---- helpers`; copy them from a sibling recipe.
2. **Pure in time.** `mount(svg)` builds every shape once. `render(t)` only sets attributes from `t`: no state, timers,
   CSS transitions or real randomness (use the seeded `random(n)` from `shards-assemble.ts`).
3. **First line is `// Title: what happens.`** The site takes the title and summary from it. The title says what
   you see happen, in plain words (`Hammer slams an anvil`), not a code name.
4. **Knobs are constants at the top** with a `// knob:` comment. The stage is `SIZE × SIZE` (1000) on black.
   **Swappable shapes:** draw the main things (an orb, a speaker, a hammer) from SVG markup in a `NAME_SHAPE` constant
   with `// shape: what it is, and where it's drawn` on the same line (default: 100 across round 0 0). Draw it with
   `shape(parent, NAME_SHAPE)`, move and size it with `transform`, and put any glow on a parent group so it doesn't
   scale with it (see `orb-grow.ts`). The recipe page lists every `// shape:` line.
5. **One idea, under ~120 lines.** Two ideas are two recipes; a breakdown shows how they combine.
6. **Unique ids** for filters and gradients (`Math.random()` in `mount`), since many recipes share a page.

## Add a recipe
1. Copy the closest file in `src/recipes/`, rename it, and change the first line, the knobs and `render`.
2. Add its slug and tags at the end of `TAGS` in `src/catalog.ts`. The list is oldest first, so the gallery shows it first.
3. Scrub it on `/recipes/<slug>/`, forwards and backwards.

## Add a breakdown
1. Download the video into `reference/` (see Commands) and run `scripts/breakdown.sh` on it. Read the contact sheets.
2. Write `src/breakdowns/<slug>.ts`: one scene per beat, described in our own words, with recipe slugs and a
   `missing` note for anything no recipe rebuilds yet. Credit the creator, link the original, never quote their script.
3. Add it to `breakdowns` in `src/catalog.ts`.
