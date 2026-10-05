# Transitions

Status: draft · Sources: the Uber script's production bible, ClaudeAnimationBase's guide · Updated: 2026-09-27

Every seam gets a transition (rule 4). Pick one that belongs to the story, and don't use the same one twice in a row.

| Name | How it works | Sound |
|---|---|---|
| DIVE | Zoom into an object until its face fills the frame (z ×6–12 over 0.5–0.7 s, easeInQuart). From 70% of the move, the next scene fades in inside the object's shape (6 frames). Lands with a 3% overshoot (easeOutBack) | SFX-WHOOSH-IN |
| PULL | A dive in reverse: the current scene shrinks into an object in the new scene | SFX-WHOOSH-OUT |
| WHIP | An 8-frame pan (easeInOutSine) with 3 ink speed lines and a 2-frame smear | SFX-WHIP |
| MORPH | One shape becomes the next, over 10–14 frames (a globe into a cube, a jam into dust) | Per shot |
| INK WIPE | A thick hand-drawn ink stroke sweeps across and reveals the next scene behind it (10 frames). The paper-pencil theme's wipe | SFX-PENCIL |
| BRUSH WIPE | 5 fat paint strokes cover the frame, the scene swaps under full cover, then they drag off (about 0.6 s). The watercolor-ink theme's wipe | A wet brush sweep (add an ID to [sfx.md](../sound/sfx.md) on first use) |
| MATCH | An object keeps its place on screen while the scene around it changes | Per shot |
| IRIS | A circle, or any shape (a mouth, a keyhole), closes on a point and opens on the next scene | SFX-WHOOSH-IN, short |
| CUT ON ACTION | Cut in the middle of a move and finish the move in the next shot. The only hard cut allowed | The move's own sound |
| CARRY | The camera keeps moving through the seam into the next set (a rise, a pull-back) | The beds crossfade |

**Changes inside a shot are transitions too:**
- UI screens slide or flip;
- faces change through the emotion sequence in [emotions.md](../characters/emotions.md);
- props arrive and leave on arcs, never popping in.
