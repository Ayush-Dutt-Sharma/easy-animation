# Camera

Status: draft · Sources: the Uber script's production bible, ClaudeAnimationBase's guide · Used in: uber-live-map · Updated: 2026-09-27

- **One 2D camera:** a centre (x, y) in scene pixels, a zoom z (1.0 shows the full 1080-wide scene), and at most 2° of roll. No 3D.
- **It never stops.** When nothing else is scripted it drifts: +0.6% zoom per second, plus 6 px/s of pan toward the action.
- **It leads the eye:** it starts moving toward the next read before the read happens.
- **Easing:**
  - Moves of 0.6 s or longer: easeInOutCubic.
  - Arrivals: easeOutQuart.
  - Departures into a dive: easeInQuart.
- **Parallax when panning:** far background 0.3, background 0.6, midground 1.0, foreground 1.25.
- **Shake:** only on impacts such as stamps and thuds. It lasts 3–4 frames, at 6 px, decaying.
- **Line widths stay constant on screen** while zooming (see the theme).

## Moves we use

| Move | What it does |
|---|---|
| Drift | The default, whenever nothing else is happening |
| Push | A slow zoom in toward what matters |
| Pull | A zoom out, often to reveal scale |
| Rise, tilt | Follow something up |
| Track | Follow something along a path |
| Orbit | Ease a ring's ellipse and rotate it a few degrees, so it feels like circling |
| Whip, dive, pull through an object | See [transitions.md](transitions.md) |
