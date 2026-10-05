# Sam

Status: draft · Source: the reference ad's man, as specified in the Uber script · Used in: uber-live-map (the rider) · Updated: 2026-09-27

The everyperson lead, whoever the story follows: a rider, a customer, a user. Sam is in the same look family as the reference ad's character.

**To decide in Phase 1:** change one or two traits (the hair shape, glasses, a scarf) so Sam is our own character, not a copy of the reference ad's man.

## Build

About 5.5 heads tall.

| Shot | Size on 1080×1920 |
|---|---|
| Full body, street | About 820 px tall, with a 150 px head |
| Medium close-up | Head and torso fill y 560–1400; the head is about 270 px |
| Hands only | The thumb is drawn large and enters from the bottom right ([phone-ui.md](../sets/phone-ui.md)) |

## Look

- **Hair:** `--hair`, with a side swoop.
- **Skin:** `--skin`, with `--cheek` circles at 40%.
- **Eyes:** 14 px dots with a 4 px white catchlight. They grow to 18 px when surprised.
- **Brows:** 6 px strokes. **Mouth:** a single stroke.
- **Clothes:** a hatched `--terracotta` sweater, `--navy` trousers and brown shoes.
- **Phone:** a `--screen` case, with a screen that glows. When Sam looks down at it, the glow lights Sam's chin (`--ping-glow` at 20%).

## Views

Front, 3/4 (facing left and right), side (for getting into a car) and back 3/4. Turns go through these drawn views, never a projected rotation.

## Idle

- **Breathing:** chest scale-Y +1.2% on a 3.2 s cycle.
- **Blinks:** every 2.4–4.0 s (seeded), 3 frames long.
- **Weight shift:** every 3.5 s, the hips move 6 px.
- **Follow-through:** the hair and sweater hem trail 2–3 frames behind every move.

## Emotions

Sam uses relaxed, curious, focused, patient, happy and delighted, from [emotions.md](emotions.md).

## Gestures

| Gesture | Duration |
|---|---|
| Take out phone: shoulders dip, then pull it from a trouser pocket and raise it to chest height | 4-frame dip, then 10 frames |
| Look down (head tilts 8°) | 4 frames |
| Thumb tap | Press 3 frames, release 2 |
| Look up | 4 frames |
| Glance (head turns 10°, eyes shift) | As scripted |
| Wave | 3 swings in 0.9 s |
| Get into a car (door swing 0.3 s) | 1.2 s |
| Step out of a car | 0.9 s |
| Heel tap while waiting | 2 taps |

## Sounds

SFX-CLOTH when taking out the phone, SFX-STEP for footsteps ([sfx.md](../sound/sfx.md)).
