# References

The videos we learn from, what each one taught us, and where that lesson now lives in the library.

## The reference ad: `mushilo-ad-fr.mp4`

This is the ad from the Lucas Ecom IA thread (in French, for the mushroom-coffee brand "Mushilo"). The `sheet-*.png` files show one frame per second, and each file name gives its time range.

| Spec | Value |
|---|---|
| Length | 71.6 s |
| Format | 9:16 vertical, 30 fps. This copy is 480×848; the master was probably 1080×1920 |
| Pacing | About 24 visual beats, with a new picture every 1–3 s. Scene detection finds no hard cuts |
| Audio | Voice and light sound effects, no music in this version. Pauses of 0.3–0.6 s between sentences |
| Subtitles | Burned in, 1–4 words at a time, bold rounded white text with a dark outline, at about 80% of the frame height |

**Structure** (classic direct response):

| Time | Section | On screen |
|---|---|---|
| 0–5 s | Hook: most people don't know how fast mushroom coffee acts in the first 7 days | An X-ray mannequin on the toilet with a gas-filled belly, a zoom into its head, the character in the kitchen with a mug, then a week-1 calendar |
| 6–20 s | Mechanism: 6 mushrooms, one benefit each | Powder going into the mug, particles absorbed by the X-ray body, mushroom icons orbiting it. Turkey tail leads to a gut callout, reishi to a stress scribble, lion's mane to a light bulb. A cortisol gauge, then brain fog clearing |
| 21–50 s | Results over time: 24 h, 72 h, day 7 | Clock badges, the mirror with the belly shrinking, a dive into layers of gut tissue, the gauge settling, a calendar flip with confetti, sleep with the clock going from 01:41 to 07:00, a less puffy face |
| 50–58 s | Proof | The X-ray body drinks the coffee and its gut turns green. 6 mushrooms on a board, the pack with BIO and 0% sugar badges, a crowd with a counter rising to 10,000+ |
| 59–67 s | Offer and urgency | A stopwatch and a running character, a free frother in a gift box, a countdown timer, a stock bar, a phone product page with a COMMANDER button and an arrow |
| 68–72 s | Risk reversal | The character with the pack and a mug, under a "30 days satisfied or refunded" shield |

**Look:** a flat cartoon on paper, with thick, wobbly dark-brown outlines, coloured-pencil hatching on the fills, paper grain, and a warm, desaturated palette.
- **Character:** one recurring man with brown hair, a terracotta sweater, navy trousers and rosy cheeks, whose emotions are easy to read.
- **X-ray body:** a translucent mannequin whose organ colours show its state: a pink gut is irritated and a green gut is calm.
- **Backgrounds by topic:** grid paper for inside the body, beige for home, navy for jumps in time, peach for the product.
- **Motion:** it never stops. The camera zooms into objects and dives through layers, and the scenes use circle callouts, count-ups and gauges.

**Where it went:**
- the look: [paper-pencil](../library/design/themes/paper-pencil.md);
- the structure: [storytelling](../library/craft/storytelling.md);
- the subtitles: [typography](../library/design/typography.md);
- the man: [Sam](../library/characters/sam.md).

## The P(doom) music video

- **Video:** "I'm Upping My P(doom)", 2:36, 16:9.
  - Posted on X by @other__reality ([post](https://x.com/other__reality/status/2102514581684052169)): "Claude Opus 5.5 has the best visual design of any model I have tested so far".
  - The source code is linked in [a reply](https://x.com/other__reality/status/2102542305433711037).
  - It was inspired by @slimer48484's "Claude-Pop" video of the same song.
- **Code:** [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo). Claude Opus 5.5 wrote everything in the repo, in Claude Code, over two generations. The repo has no licence file, so we read it for ideas and don't copy its code.
- **How it's built:**
  - p5.js and p5.brush, painted frame by frame in headless Chrome;
  - shared files: the engine, the main character, a second character, props, the timeline and the lyrics;
  - then one file per chapter. Each chapter edits only its own file, and exports any guest character a later chapter reuses.
- **How Claude worked:** before painting, it wrote a storyboard (time, lyric, shot, transition out) and a style-and-code guide. The guide briefed parallel subagents, one per chapter.
- **What we saw** in 45 frames sampled across the video: see [watercolor-ink](../library/design/themes/watercolor-ink.md).

**What we took:**

| Lesson | Where it lives now |
|---|---|
| Shared engine files vs. per-chapter files, which became our library vs. video folders | [library/README.md](../library/README.md) |
| A guide that briefs every session or subagent | The library itself; [pipeline.md](../library/process/pipeline.md) says what to load when |
| Sets, not cards; a set that returns and escalates; a motif that pays off; a colour arc | [storytelling.md](../library/craft/storytelling.md) |
| Motivated transitions: the brush wipe, shaped irises | [transitions.md](../library/design/transitions.md) |
| Faces change through a squint and a take, never a snap | [emotions.md](../library/characters/emotions.md) |
| Text-light: a title and a few comic sound words | [rules.md](../library/craft/rules.md), rule 7 |
| Big, simple shapes that read at thumbnail size | [review-loop.md](../library/process/review-loop.md) |
| The whole look | [watercolor-ink.md](../library/design/themes/watercolor-ink.md) |

## ClaudeAnimationBase

- **Repo:** [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase), MIT licence.
- **What it is:** the author's general kit, pulled out of the P(doom) code together with an analysis of what the model did well and badly. It's the same move this library makes.
- **Engine:**
  - p5.brush painting, a camera, glow, the brush wipe and irises;
  - Clawd, with 5 drawn views, 31 emotions, hats, emotes and dances;
  - model sheets rendered as images;
  - a renderer that makes contact sheets, frame strips and crops.

**What we took:**

| Lesson | Where it lives now |
|---|---|
| Three goals: handmade, alive, one piece | [rules.md](../library/craft/rules.md) |
| Timing by reads | [timing-reads.md](../library/craft/timing-reads.md) |
| Animation principles applied to code, and a boil seed per element | [animation.md](../library/craft/animation.md) |
| The common-failures list | [common-failures.md](../library/craft/common-failures.md) |
| Sheets, strips and crops | [review-loop.md](../library/process/review-loop.md) |
| Model sheets for characters | [library/README.md](../library/README.md) |
| Its engine, as a Phase 1 candidate | [PLAN.md](../PLAN.md) |
