# Format: vertical 9:16

Status: draft · Sources: the Uber script's production bible; LinkedIn's feed behaviour, checked 2026-09-27 · Used in: uber-live-map · Updated: 2026-09-27

- **Output:** 1080×1920, 30 fps, sRGB. Video is H.264 High with yuv420p; audio is AAC 48 kHz stereo.
- **Feed-safe area:** x 90–990, y 320–1540. Faces, labels, counters, badges and subtitles always stay inside it.
  - Feeds crop tall video. LinkedIn's main feed shows 9:16 as 4:5 on mobile (the middle 1080×1350, y 285–1635) and letterboxes it on desktop. Keeping to the middle means one file works in every feed.
  - The bands above and below are for atmosphere only: sky, street, floor.
- **Platform UI zones:** never put text here. In full-screen vertical players these are covered by:
  - the right strip (x > 930, y 900–1700), where the like and comment buttons sit;
  - the bottom band (y > 1560), where the caption and name sit.
- **Subtitles:** centred at x 540, baseline y 1430, at most 880 px wide ([typography.md](typography.md)).
- **Badges and tags:** section badges sit at the top left of the safe area (x 170, y 400). Tech tags usually go at y 400–460, above the action.
- **First frame:** a finished picture that's already moving.
- **Last frame:** holds for 0.8–1.2 s, still moving.
- **Coordinates** in scripts are screen pixels, measured from the top-left corner.

## Platforms

| Platform | Notes |
|---|---|
| LinkedIn | 9:16 plays full-screen in the vertical video feed. The main feed crops it to 4:5 on mobile and letterboxes it on desktop. It autoplays muted, so burn in the subtitles. Organic posts can run up to 10 minutes. Sources: [PostEverywhere](https://posteverywhere.ai/blog/linkedin-aspect-ratios), [ContentIn](https://contentin.io/blog/linkedin-post-specs/) |

Other formats (1:1, 16:9) get their own file when a video needs one.
