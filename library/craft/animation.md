# Animation

Status: draft · Sources: the classic principles as ClaudeAnimationBase's guide applies them to code, and the Uber script's production bible · Updated: 2026-09-27

Motion written as code looks mechanical, because code moves every part at once, on the same curve, by the same amount. These principles fix that.

## Principles

- **Anticipation.** Make a small move the opposite way before a big one: a crouch before a jump, a thumb lifting before a tap, a squint before a take. It lasts 3–4 frames.
- **Squash and stretch.** Bodies squash on impact and stretch in fast moves, keeping their volume. Amounts:
  - buttons 12%;
  - bubbles 18%;
  - badges 10%;
  - characters 4% on landings.
- **Slow in, slow out.** Almost nothing moves at a constant speed. Every move goes through an easing ([camera.md](../design/camera.md) says which).
- **Weight.** Heavy things start and stop slowly and barely bounce. Light things snap into motion, bounce and flutter.
- **Arcs.** Living things move on arcs: hops, throws, arm swings, head turns.
- **Overlap and follow-through.** The eyes lead and the body follows. Hair, hems, tails and held props drag 2–3 frames behind, overshoot and settle.
- **No twinning.** Code copies values, so watch for mirrored arms, characters blinking together and crowds marching in step. Offset the timing, phase and seed.
- **Exaggeration.** Push poses and takes further than feels natural. In a short video, subtle reads as nothing.
- **Strong key poses.** Each storytelling pose reads as a still, with a clear silhouette, before any motion goes between the poses.
- **Show the thought.** A character notices, thinks, then acts, and the eyes move first.
- **Secondary action.** Small actions like a bobbing cap or a popping emote support the main action. They never compete with it.

## Our numbers

- **Frame rates:** characters animate on twos (a new drawing every 2 frames at 30 fps). The camera, particles and UI animate on ones.
- **Line boil:** outlines and hatching are redrawn 12 times a second (seed = element id + `floor(t × 12)`).
  - Big flat fills stay still.
  - Give each element its own seed. With one shared stream, a moving thing makes everything drawn after it jitter.
- **Ambient motion:** every scene runs at least two ambient loops, and each set lists its own.
- **Faces never snap.** Emotions change through the sequence in [emotions.md](../characters/emotions.md).
- **Characters are big.** In a medium shot the lead fills at least 40% of the frame height. Tiny characters are for establishing shots only.
- **One shape, one outline.** Build a character or prop from as few outlines as possible, so it doesn't look like stickers glued together.
- **Shared idle tempo** (untested): idle bobs, blinks and breathing can share one tempo, 90 BPM by default, so the frame breathes together.
  - Each element keeps its own phase.
  - Hits still land on words, not beats.
  - With music, set the tempo to the song's.
- **Determinism:** every motion is a pure function of `t`. See the render rules in [CLAUDE.md](../../CLAUDE.md).
