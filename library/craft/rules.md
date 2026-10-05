# Rules

Status: draft · Sources: the Lucas Ecom IA thread (rules 1–4), John Heibel's ClaudeAnimationBase guide (the goals and rules 5–9), our planning · Updated: 2026-09-27

The person asking decides **what** a video says. These rules decide **how** it's made. If they ask for something a rule forbids, do what they ask and note it in the retro.

## Goals

Every rule serves one of these.

- **Handmade.** It looks drawn by hand, frame by frame: boiling outlines, flat 2D, paper texture.
- **Alive.** Something is always moving, and something is always happening.
- **Clear.** Someone who sees it once, at full speed, can follow it. Generated video fails here most often: see [timing-reads.md](timing-reads.md).
- **One piece.** It's one film, not a pile of clips.

## Rules

1. **Voice first.**
   - The voice is the clock. The picture changes when the voice changes subject, 2 frames before the cut word.
   - Times come from `transcript.json`, never from estimates.
2. **One sentence, one picture.**
   - Each picture makes sense with the sound off.
   - A long sentence gets a new picture on each key word.
3. **A real hook.** Frame 1 is a finished picture that's already moving. Never fade in from black.
4. **No hard cuts.** Every seam gets a transition from [transitions.md](../design/transitions.md), and the camera never stops ([camera.md](../design/camera.md)).
5. **Something happens in every shot.**
   - Something changes between the first frame and the last.
   - The cause comes first, then the reaction.
   - Whatever a shot sets up gets paid off, in that shot or a later one.
6. **One focal action at a time,** with a clear silhouette and nothing competing with it.
7. **Text-light.**
   - Subtitles carry the words.
   - In the scene, only write a name or number the voice is saying at that moment, such as a tech tag or a counter. Use 3 words at most, stamped once.
   - Never add a sign that repeats the voice line.
   - ClaudeAnimationBase allows no text at all. Explainers for engineers need the system names, so we allow this much.
8. **Flat 2D.**
   - Nothing rotates in perspective.
   - A tilted city or a cube is drawn once, flat, and moved by the 2D camera. A globe turns by sliding its map inside the circle.
   - Characters turn through drawn views (front, 3/4, side, back).
9. **One world.**
   - Each video has one theme and a planned colour arc.
   - Characters and props carry across cuts, and screen direction stays consistent.
   - The ending rhymes with the opening: the same place, pose or motif, changed.
