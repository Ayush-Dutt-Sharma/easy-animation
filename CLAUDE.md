# Afterglow

Copy-paste code for glowing, minimal motion graphics. Each **recipe** is one small animation in one TypeScript file
with no dependencies. A **breakdown** takes a real short apart scene by scene and links each scene to its recipes.
The plan and open decisions are in `PLAN.md`.

## Commands (Node 22: `nvm use`)
```bash
npm run dev     # http://localhost:4321
npm run check   # astro check (types)
npm run build   # also validates the catalogue: see src/catalog.ts
scripts/breakdown.sh reference/<video>.mp4   # contact sheets, 2 frames a second, for labelling scenes
```

## How it fits together
```
src/recipes/<slug>.ts        the files people copy: export DURATION and mount(svg) → render(t)
src/catalog.ts               gallery order + tags, breakdown list; fails the build on any mismatch
src/breakdowns/<slug>.ts     scenes of one reference short: timestamps, our own words, recipe slugs
src/preview.ts               browser: mounts a recipe and loops / scrubs render(t)
src/pages/                   / (gallery), /recipes/<slug>/ (preview + code + copy), /breakdowns/<slug>/
reference/                   reference videos, git-ignored: we never publish their footage
```

## Rules for a recipe
1. **Stands alone.** No imports. It repeats the small helpers it uses (`add`, `set`, `glow`, `clamp`, easings) at the
   bottom of the file under `// ---- helpers`; copy them from a sibling recipe.
2. **Pure in time.** `mount(svg)` builds every shape once. `render(t)` only sets attributes from `t`: no state, timers,
   CSS transitions or real randomness (use the seeded `random(n)` from `shards-assemble.ts`).
3. **First line is `// Title: what happens.`** The site takes the title and summary from it.
4. **Knobs are constants at the top** with a `// knob:` comment. The stage is `SIZE × SIZE` (1000) on black.
5. **One idea, under ~120 lines.** Two ideas are two recipes; a breakdown shows how they combine.
6. **Unique ids** for filters and gradients (`Math.random()` in `mount`), since many recipes share a page.

## Add a recipe
1. Copy the closest file in `src/recipes/`, rename it, and change the first line, the knobs and `render`.
2. Add its slug and tags to `TAGS` in `src/catalog.ts` (gallery order).
3. Scrub it on `/recipes/<slug>/`, forwards and backwards.

## Add a breakdown
1. Put the video in `reference/` and run `scripts/breakdown.sh` on it. Read the contact sheets.
2. Write `src/breakdowns/<slug>.ts`: one scene per beat, described in our own words, with recipe slugs and a
   `missing` note for anything no recipe rebuilds yet. Credit the creator, link the original, never quote their script.
3. Add it to `breakdowns` in `src/catalog.ts`.
