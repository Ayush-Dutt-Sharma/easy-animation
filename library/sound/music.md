# Music

Status: draft (no video uses music yet) · Sources: the Lucas Ecom IA thread, ClaudeAnimationBase's guide · Updated: 2026-09-27

The first videos have no music. When a video gets some:

- **Source:** generated (the thread used Suno) or a licensed track.
  - Check that the licence allows commercial use on the platform.
  - Write the source and licence in the video's brief.
- **Under the voice:** duck it with ffmpeg's `sidechaincompress`, keyed by the voice.
  - Starting values: threshold 0.05, ratio 8, attack 20 ms, release 300 ms.
  - Tune them by ear.
- **Loudness:** the master still ends at −14 LUFS and −1 dBTP ([mix.md](mix.md)).
- **Tempo:** set the idle tempo in [animation.md](../craft/animation.md) to the song's BPM, so everything breathes with it. Land big transitions on bar lines when that doesn't fight the voice.
- **It's a variant:** music is mixed in Phase 4, without re-rendering the picture.
