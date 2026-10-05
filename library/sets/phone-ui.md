# Set: phone and app screens

Status: draft · Source: the Uber script (shots 3–5, 20a–21) · Used in: uber-live-map · Updated: 2026-09-27

A generic phone running a generic app, drawn in the video's theme. **Never show a real app's logo or a copy of its screens,** and give every option a generic name.

## The phone

- A `--screen` case. When the camera dives in, the dark rounded bezel (40 px) stays visible at the edges.
- It's held by the lead ([sam.md](../characters/sam.md)), and its glow lights the lead's chin.

## Screens

- **Status bar:** in ink, with the time ("5:42"), signal and battery.
- **Home screen:**
  - `--sand` wallpaper, with a 4×5 grid of simple hand-drawn app icons (sun, camera, chat bubble, music note, map pin…);
  - the featured app's icon is bigger (180 px): a black rounded square with a white glyph and an accent dot.
- **Map screen:** `--beige` blocks, `--paper` streets, a `--sage` park, a `--bluegrey` river edge, the user's pulsing location dot, and a search bar at the top.
- **Search sheet:**
  - slides up from the bottom (8 frames, easeOutCubic), with a text field and a keyboard drawn as rows of rounded keys;
  - text types in one character per frame, and the keys under the thumb light up;
  - a suggestion row with a pin icon appears below.
- **Option cards:** a bottom sheet (y 1000–1500) with three cards. The selected one has a `--ping` outline.
- **Primary button:** 820×140 px at y 1380, with an `--ink` fill and white text.
- **Waiting state:** the button text becomes a status line with 3 animated dots, and radar rings pulse from the user's dot.
- **Person card:**
  - a round avatar (smiling, short dark hair, a `--sage` jacket, a 4-frame blink) beside two lines of text;
  - it arrives with an 8-frame flip.
- **Map car and route:** see [data-graphics.md](../props/data-graphics.md).

## The thumb

- It enters from the bottom right, drawn large with a nail and an ink outline, at 1.15× parallax.
- **Tap:**
  - the target squashes 12% and the thumb 4% for 3 frames, then both release over 2 frames;
  - a ripple ring spreads from the tap point.
- **Big press:**
  - the thumb lifts 10 px first;
  - the button squashes 12%, darkens and bounces back (easeOutBack);
  - six little lines burst out, and the camera recoils 3 px for 2 frames.

## Always moving

- Grain specks drift on the wallpaper (3 px/s).
- The app icon's accent dot pulses.
- The location dot pulses.
- The route glows faintly.

## Transitions

- Screens change inside the phone (a slide, a flip, a zoom out of an icon), with no camera cut.
- Dive in from the lead's hand, and pull back out to it.

## Sound

- **Bed:** AMB-PHONE, with the outside ducked to −40.
- **Effects:** SFX-TAP, SFX-UI-POP, SFX-TYPE, SFX-CONFIRM, SFX-FLIP, SFX-DING, and SFX-COUNTER for small number changes.
