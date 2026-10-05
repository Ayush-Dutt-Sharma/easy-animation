# Emotions

Status: draft · Sources: ClaudeAnimationBase's emotion system, the Uber script · Updated: 2026-09-27

Every character draws from one shared list, so acting looks the same across videos.

## How a face changes

Never swap faces between two frames. Every change goes through four steps:
1. **Anticipation:** a squint and a small squash, 2–3 frames before the change.
2. **Swap:** the new face goes in under the squint.
3. **Take:** a squash and stretch sized to the new emotion. It's small for relaxed to happy, and big for calm to overwhelmed.
4. **Settle:** the character settles into the new idle with an overshoot, and the emote pops in.

## The list

| Emotion | Eyes | Brows | Mouth | Body | Emote |
|---|---|---|---|---|---|
| relaxed | Normal dots | Level | Soft smile | Slow breathing | — |
| curious | Bigger dots | Up | Small "o" | Leans in | — |
| focused | Normal, on the thing | Slightly down | Flat | Still, head tilted | — |
| patient | Half closed | Level | Closed-mouth smile | Heel taps | — |
| happy | Curved | Up | Smile | Small bounce | — |
| delighted | Curved, cheeks up | Up | Open smile | Bigger bounce | Sparkle |
| surprised | 18 px dots | High | "O" | A quick stretch | ! |
| overwhelmed | Wide | Worried | Wobbly | Hands up | Sweat |
| relieved | Closed | Relaxed | Exhale | Shoulders drop | — |
| sleepy | Half closed, drooping | Low | Small "o" | Slow sway | zzz |
| thinking | Looking up | One raised | Flat | Hand to chin | Dots |

Add rows as videos need them. ClaudeAnimationBase defines 31 emotions, which makes it a good source.

## Emotes

Emotes are painted marks that pop in by the head (easeOutBack, about 0.25 s):
- ! and ?
- sweat drops
- a sparkle and a heart
- zzz and thinking dots
- anger marks, steam and a swirl
- a light bulb

They are drawn marks, never typed text.

## Machines

Machines act with light instead of faces:
- LED eyes open, blink faster or go wide;
- the outline turns `--alert` under stress;
- a glow settles when they're calm.
