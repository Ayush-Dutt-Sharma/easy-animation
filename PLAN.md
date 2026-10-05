# easy-animation: plan

A site where anyone can copy the code for glowing, minimal motion graphics (the Dan Koe short style).
We take a reference video, break it into scenes, break each scene into small reusable animations ("recipes"),
and publish every recipe with a live preview and a **Copy** button.

Think "shadcn for motion graphics": you don't install a library, you copy one file you own.

## What a visitor gets

1. **Recipes:** one small animation each, such as *orb pops out of orb*, *ring spins and collapses*,
   *ball splits into three* or *red flood*. Each recipe page has:
   - a live, looping preview with a scrubber, a play/pause button and a speed control
   - a **Copy** button for one self-contained file with no dependencies
   - knobs to try (colour, count, duration), shown as the constants at the top of the file
   - an MP4 or GIF download of the preview
2. **Breakdowns:** one per reference video. It lists the scenes in order, each with a timestamp, what happens in our
   own words, and which recipes rebuild it. "Watch the original" links out; we never host or embed their footage.
3. **Browse:** a grid of recipes that loop on hover, with tags (entrance, exit, transition, emphasis, text, loop).

## The core idea (carried over from showTheCode)

**A frame is a pure function of time.** Every recipe exports `frame(t)`, which turns seconds into the state of the
shapes. Playing, scrubbing, looping, reduced motion and video export are all the same call. There are no CSS
transitions or timers, so what you copy behaves exactly like the preview.

## Recipe file format (the thing people copy)

One `.ts` file per recipe. Its only dependency is the browser's SVG. It is readable top to bottom:

```ts
// ring-spin-collapse.ts — copy this file. No dependencies.
// Three orbs orbit a centre ball, spin faster, then collapse into it, and it glows green.

export const DURATION = 4; // seconds
const RING = 120;          // knob: ring radius
const GLOW = '#3ee089';    // knob: final colour

export function mount(svg: SVGSVGElement) {
  // create the circles once …
  return (t: number) => {
    // … then only set attributes from t (pure: same t, same picture)
  };
}

// The easings it uses are inlined, so the file stands alone.
const easeOutBack = (t: number) => …;
```

- The site imports the same file twice: to run the preview, and as `?raw` to show and copy its source. So the
  code on screen can never drift from the code that runs.
- The glow is an SVG `filter` (stacked drop-shadows) inside the file, so a copied recipe looks right anywhere.
- Every recipe repeats its small helpers (easing, glow filter) in its own file. That duplication is the price of
  copy-paste, and it is fine.

**Decided: plain TS/SVG only for v1.** Later, when people ask, offer a Remotion version of each recipe (for people making videos in React) and a
"copy as AI prompt" button. Remotion's `useCurrentFrame()` is already a pure function of time, so a port is
mechanical.

## Stack

Use the same stack as showTheCode, so nothing new needs learning:

- **Astro**, static, deployed on Vercel. One page per recipe and per breakdown, generated from the folder tree.
- **Content as folders:** `src/recipes/<slug>/recipe.ts` (the copyable file) and `meta.ts` (title, tags, which
  breakdowns use it). `src/breakdowns/<slug>.ts` lists scenes, each with a timestamp and recipe slugs.
- **Player:** one small preview component that calls the recipe's `mount`, then drives `t` with
  `requestAnimationFrame` plus a scrubber.
- **Export:** copy `scripts/export.ts` from showTheCode (Playwright seeks `t`, ffmpeg encodes). It outputs MP4 and
  GIF, 9:16 or 1:1.
- **Breakdown helper:** `scripts/breakdown.sh` runs ffmpeg scene detection (`select='gt(scene,0.3)'`) on a local
  reference video. It writes a contact sheet and cut timestamps, which we then label by hand, with Claude helping.

## Phases

**Status (2026-10-03):** 0–3 started together from the first reference short: 15 recipes, gallery, recipe pages
(preview, scrubber, copy, download) and the *Why you're always bored* breakdown. Not yet: Vercel link, export downloads.

0. **Setup:** Astro project, theme (black stage, white glow, Poppins captions), Vercel link.
1. **First 6 recipes,** lifted from showTheCode's engine into standalone files:
   - glowing orb entrance
   - pop out of orb
   - split into three
   - ring spin and collapse
   - colour pulse verdict (white to green or red)
   - red flood
2. **Recipe page and gallery:** preview, scrubber, Copy, download, tags.
3. **First breakdown:** one Dan Koe short, cut into scenes, with each scene mapped to recipes. Write new recipes
   wherever a scene isn't covered yet. This is the test of the whole idea: can someone rebuild the short from the page?
4. **Export downloads:** MP4/GIF per recipe, made at build time or with a local script, then committed.
5. **Grow:** more breakdowns, search, and a "submit a recipe" guide (a PR template) once outsiders want to contribute.

## Rules worth deciding now

- **Copyright:** recreate the *style*, not the footage. Don't upload or embed their clips, frames or audio, and
  don't use "Dan Koe" in the site name or branding. Breakdowns describe scenes in our own words, link to the original
  and credit the creator.
- **License for recipes:** MIT, so people can use them in paid videos.
- **One idea per recipe,** under ~120 lines. If a recipe needs two ideas, it's two recipes plus a breakdown that
  combines them.
- **Sharing code with showTheCode:** don't do it yet. Copy what's needed. Pull out a shared package only once both
  projects keep changing the same code.

## Open questions

- Domain for easy-animation (not checked yet).
- Which Dan Koe short should be the first breakdown? (Send the video file, as with showTheCode.)
- Should recipes also come in light-on-white, or stay black-stage only?

## Similar sites (to stand apart from)

- Copy-paste UI animation libraries (Magic UI, Aceternity UI, Animata) are React components for websites. They are
  hover effects and backgrounds, not scrubbable, time-based scenes for video.
- LottieFiles hosts finished animations as JSON. You can't read or edit the code.
- Remotion templates are whole videos, not small parts.

**Our gap:** small, readable, scrubbable motion-graphics parts for short-form video, each linked to a breakdown of a
real video that shows how they combine.
