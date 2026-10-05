# Review loop

Status: draft · Sources: the review rules formerly in CLAUDE.md, ClaudeAnimationBase's guide · Updated: 2026-09-27

You can't see motion by reading code. Render it, look at it, fix it, and look again.

## Order

- Build the hook first, then 15 s blocks.
- Within a shot, block the key poses and check them as stills first. Add the motion between them once the poses read.

## What to render

| Check | What it shows | How |
|---|---|---|
| **Sheet** | The shape of a whole block: every shot's first, middle and last frames, or one frame every 2.5 s | `npx hyperframes snapshot --at …` |
| **Strip** | Every frame of one moment: a take, a tap, a transition | Consecutive snapshots. Write a small helper in Phase 1 if HyperFrames has none |
| **Crop** | Full-resolution detail: faces, hands on props, contact points, glows | A snapshot, then a crop |
| **Style** | Our frame next to the reference | `npx hyperframes snapshot --at … --against reference/mushilo-ad-fr.mp4` |

**Budget:**
- At least one sheet per shot.
- A strip for every key motion and transition.
- A crop for every face that carries the story.
- Keep the images small: each one costs up to about 4,800 tokens.

## What to check

- **Read:** is each shot's event clear from its sheet alone? Is the lead big enough, and does it stand out from the background?
- **Thumbnail test:** look at the sheet at a quarter of its size. If a read disappears, the shapes are too small or too low in contrast. The P(doom) video still reads at 480×270.
- **Timing:** step through at 0.1–0.15 s. At each frame, ask where the viewer is looking and whether they've understood yet ([timing-reads.md](../craft/timing-reads.md)).
- **Motion:**
  - Does every move have anticipation and follow-through?
  - Are there any pops or snaps between frames?
  - Do the parts move at different times?
  - Is anything moving at a constant speed, or mirrored left and right?
- **Boil:** frames that share a boil drawing should match, except where something moves.
- **Contacts:** feet touch the ground, and held things touch the hand.
- **Transitions:** check the first and last 0.5 s of every shot, and every seam.
- **Rules and failures:** go through [rules.md](../craft/rules.md) and [common-failures.md](../craft/common-failures.md).
- **Zones:** nothing important sits in the platform UI zones ([format-9x16.md](../design/format-9x16.md)).
- **Speed:** milliseconds per frame, against the theme's budget.

## Fixing

- State fixes as absolute values ("outline 6 px"), not relative ones ("thicker").
- Fix, then look again.
- Note anything that surprised you in the video's retro as you go.
