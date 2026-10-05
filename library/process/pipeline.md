# Pipeline

Status: draft · Sources: the Lucas Ecom IA thread's 5 steps, plus a retro step of our own · Updated: 2026-09-27

## Steps

| Step | What happens | Tools | Sign-off |
|---|---|---|---|
| 1. Brief | The platform first (it sets the length, the frame and whether it plays muted), then a locked script in sections, one picture per sentence, a claims table, and the library picks (theme, format, characters, sets) | [The brief template](../../videos/_template/brief.md) | You |
| 2. Voice and timing | You record the voice; each word's time goes into `transcript.json`, and we mark the cut words | [Your own recording](../sound/voice.md#recording-your-own-voice), cleaned with ffmpeg, then `npx hyperframes transcribe` | You listen |
| 3. Visuals | Build the hook first, then 15 s blocks, each checked with the review loop | Claude Code, the HyperFrames skills, this library | Claude checks, then you |
| 4. Edit and render | Scenes placed on the word-timed timeline, with the voice, effects and transitions | `npx hyperframes render` at 1080×1920, 30 fps | You |
| 5. Variants | Loudness, subtitles and music, without re-rendering | ffmpeg `loudnorm`, `subtitles`, `sidechaincompress` ([mix.md](../sound/mix.md)) | You |
| 6. Retro | Turn what happened into library edits | [retro.md](retro.md) | You skim it |

How this differs from the thread:
- `hyperframes transcribe` runs whisper.cpp in one command. The thread ran Whisper as a separate step.
- You record the voice right after the script is locked and before any visuals, so the real take sets every cut. ElevenLabs is the fallback ([voice.md](../sound/voice.md)).
- Step 6 is ours. It's how the library improves.

## Files per video

```
videos/<name>/
  brief.md          script, claims, storyboard, library picks
  script.md         shot-by-shot build sheet
  voice/            your takes and the cleaned voice.wav, from step 2
  transcript.json   word times, from step 2
  retro.md          written after step 5
```

## What to load at each step

Load only what the step needs. A smaller context is cheaper and keeps Claude focused.

| Step | Load |
|---|---|
| Brief | [rules](../craft/rules.md), [storytelling](../craft/storytelling.md), [metaphors](../craft/metaphors.md) |
| Storyboard and script | The brief, [timing-reads](../craft/timing-reads.md), [transitions](../design/transitions.md), [camera](../design/camera.md), and the chosen characters and sets |
| Building a shot | CLAUDE.md, that shot's section of script.md, the modules its row names in the script's "Uses" table, and [animation](../craft/animation.md) |
| Review | [review-loop](review-loop.md), [common-failures](../craft/common-failures.md) |
| Sound | The files in [sound/](../sound/) |
