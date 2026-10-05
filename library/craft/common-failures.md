# Common failures

Status: draft · Sources: ClaudeAnimationBase's list, learned on the P(doom) video ("CAB guide" below); the Lucas Ecom IA thread; our planning · Updated: 2026-09-27

These make a video look generated, or wrong. Check the storyboard, the sheets and the mix against this list. **Add to it after every video** ([process/retro.md](../process/retro.md)), and note where each failure was seen.

## Planning

| Failure | Check | Seen in |
|---|---|---|
| Length and format planned before the platform was known | The platform is the brief's first input ([storytelling.md](storytelling.md)) | Uber planning (a 2:20 cut, then LinkedIn under 60 s) |

## Picture

| Failure | Check | Seen in |
|---|---|---|
| A sign or label that repeats the voice line | Is every word in the scene a name or number the voice is saying right then? | CAB guide |
| Words in the scene the voice never says: a question in a speech bubble, labels on a state card, a stamp's word | Swap them for icons or marks ("?", ✓, ✕) | Uber planning ("anything new?" bubbles, COMMIT) |
| A shot where nothing happens, such as a character standing and smiling | Does something change between the first and last frame? | CAB guide |
| Everything at one brisk speed, with events stacked and no holds | Reads come one after another, with a hold after each payoff | CAB guide |
| A moment that's over before the viewer understands it | Every read gets its minimum time | CAB guide |
| A tiny character in a big empty frame for a long stretch | The lead fills at least 40% of the frame height in medium shots | CAB guide |
| A face that snaps from one expression to another | Every emotion change goes through squint, take and settle | CAB guide |
| Mechanical motion: linear moves, all parts moving at once, mirrored arms, crowds in step | Easing, overlap, offset phases | CAB guide |
| Timid poses and takes | Push them, and pull back only if the sheet shows it's too much | CAB guide |
| Still things jittering every frame | Each element has its own boil seed | CAB guide |
| Hard cuts, a fade in from black, or a video that just stops | A transition at every seam, a full picture on frame 1, and an end hold that keeps moving | CAB guide, the thread |
| 3D rotation or boxes drawn in perspective | Flat 2D only (rule 8) | CAB guide |
| Digital gradients and glows mixed into the hand-drawn look | Only the glows the theme allows | CAB guide |
| A prop floating near a hand instead of touching it | Crop-check the contact points | CAB guide |
| Every shot a different world | Sets return, and props carry across cuts | CAB guide |

## Words and facts

| Failure | Check | Seen in |
|---|---|---|
| A number or claim on screen that isn't in the claims table, or next to the wrong year | Every tag, counter and stamp matches a row in the claims table | Uber planning (the 1.5M counter) |
| A system name split across two subtitle chunks | Names stay in one chunk | Uber planning |
| A real brand's logo or a cloned app screen | A generic app with generic names | Uber planning |
| Text inside the platform's UI zones | See [format-9x16.md](../design/format-9x16.md) | Uber planning |
| Estimated timings left in after the voice exists | Times come from `transcript.json` | The thread |

## Sound

| Failure | Check | Seen in |
|---|---|---|
| Effects on top of words | Effects under words sit at least 10 dB below the voice | Uber planning |
| A pile-up of effects | At most 3 in any 150 ms | Uber planning |
| Dead silence between sections | The ambience bed keeps playing | Uber planning |
