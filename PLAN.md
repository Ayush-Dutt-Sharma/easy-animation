# Code-rendered video ads: plan

**Status:** Phase 1, style test. The same 5 s shot ([style-test.html](videos/uber-live-map/style-test.html)) is rendered in both looks, in `renders/style-test-*.mp4`, and you're picking one. The first video is the Uber explainer, cut for LinkedIn at under 60 s. Its [brief](videos/uber-live-map/brief.md) holds the script, storyboard and sources, and is waiting for your approval; the shot-by-shot `script.md` gets written after you sign off. The earlier 2:20 version is parked in [videos/uber-live-map/parked/](videos/uber-live-map/parked/brief-2m20.md). **Last updated:** 2026-09-28.

## Goal

Make short vertical videos, both ads and explainers, the way the reference ad was made. Claude Code writes HTML/JS that draws every frame, HyperFrames renders it to MP4, and the voice-over sets the timing. There's no AI video model and no stock footage. Once one video works end to end, package the workflow as a Claude Code skill so the next video takes one prompt plus a brief approval.

**Every video should make the next one easier.** The idea changes each time, but the craft carries over and improves.

## How the files are organised

| Folder | What it holds |
|---|---|
| [library/](library/README.md) | Everything reusable: the rules and thinking (craft), looks (themes, format, camera, transitions), characters, sets, props, sound and process. A retro after each video updates it |
| `videos/<name>/` | One folder per video: its brief (script, claims, storyboard) and its shot-by-shot script. [videos/_template/](videos/_template/brief.md) is the starting point |
| [reference/](reference/README.md) | The videos we learn from (the Mushilo ad, the P(doom) video, ClaudeAnimationBase) and what we took from each |

Also at the top level:
- [CLAUDE.md](CLAUDE.md): working rules for every session;
- [COSTS.md](COSTS.md): the money estimate.

## References

- **The Mushilo ad** (`reference/mushilo-ad-fr.mp4`) sets the look we copy.
- **The P(doom) video and ClaudeAnimationBase** show how Claude did a similar video, and what went well and badly for it.

Details, and what we took from each, are in [reference/README.md](reference/README.md).

## Pipeline

Six steps: brief → voice and timing → visuals → edit and render → variants → retro. The tools, sign-offs and what to load at each step are in [library/process/pipeline.md](library/process/pipeline.md).

## Stack decision

| Option | For | Against | Verdict |
|---|---|---|---|
| **HyperFrames** (HeyGen) | Used for the reference ad. Draws with HTML, SVG, canvas and GSAP. Renders by seeking, so every frame is deterministic. Ships 21 Claude Code skills and built-in `tts`, `transcribe` and `snapshot --against ref.mp4`. Apache-2.0, with no commercial limits | Young project; needs Node 22 | **Use** |
| Remotion | The most proven option, built on React, with official skills | Companies of more than 3 people need a paid licence | Fallback |
| ClaudeAnimationBase (p5.js + p5.brush) | The engine behind the P(doom) look you pointed to, MIT-licensed. It already has pencil, hatching and watercolour brushes, a character rig with 31 emotions, a camera, transitions, and a renderer with contact sheets, strips and crops | Watercolour fills are slow (seconds per frame). It's built for 16:9 and music beats, and has its own renderer | Deferred: rough.js drew the style test. Its ideas are already in the library |

**Drawing layer: rough.js on one canvas, in HyperFrames.** [engine/kit.js](engine/kit.js) draws seeded wobbly outlines, pencil hatching, and watercolour as stacks of deformed, see-through polygons (Tyler Hobbs' method). [engine/themes.js](engine/themes.js) holds the two looks. A 5 s shot renders in about 10 s. p5.brush was the first plan; it's deferred, since rough.js got both looks rendering at this speed. Bring it back only if the look you pick needs brush texture rough.js can't fake.

The themes in `library/design/themes/` don't depend on the engine, so either route draws either look.

## This Mac (checked 2026-09-27)

| Need | Status |
|---|---|
| Node 22+ | ✅ 22.23.3 through nvm, pinned in `.nvmrc` |
| ffmpeg | ✅ 7.0, with libx264, libass (subtitles), loudnorm and sidechaincompress |
| Chrome | ✅ Installed |
| whisper.cpp (for `transcribe`) | ❌ Deferred to Phase 2. Run `brew install whisper-cpp` then |
| Voice | ✅ You record it on your phone or a USB mic, so ElevenLabs isn't needed |
| Hardware | ✅ M1 Max, 64 GB. Each render worker uses about 256 MB |

## Phases

Each phase ends with something you look at and approve.

**Phase 0: Setup.** No creative work in this phase. ✅ Done 2026-09-27, except the deferred steps.
1. ✅ `nvm install 22`, then add `.nvmrc`
2. ✅ `git init`, pushed to [GitHub](https://github.com/Ayush-Dutt-Sharma/easy-animation) on 2026-10-05
3. ✅ HyperFrames 0.8.80, pinned in the `package.json` scripts, with `hyperframes.json` and `meta.json`
4. Deferred: `npx skills add heygen-com/hyperframes` installs skills globally, so it waits for your yes
5. Skipped: `npx hyperframes doctor`, since renders already work
6. Deferred to Phase 2: `brew install whisper-cpp`
7. ✅ `.gitignore`. `.env` waits until a key is needed

Layout: shared drawing code in `engine/`, each video's compositions in its `videos/` folder, renders in `renders/` (gitignored).
*Done when:* a blank 1080×1920 composition shows in the preview and renders to MP4.

**Phase 1: Style test (go/no-go).** Build one 5 s scene from the first video: Sam on the city street tapping Confirm, while the cars around send out pings.
1. Draw it in the [paper-pencil](library/design/themes/paper-pencil.md) theme, with boiling outlines, hatch fills, paper grain and one subtitle. Compare it with the reference using `npx hyperframes snapshot --at … --against reference/mushilo-ad-fr.mp4`.
2. Swap in the [watercolor-ink](library/design/themes/watercolor-ink.md) theme and render it again. This proves a theme swap needs no scene changes, and lets you pick a look by eye.
3. Render Sam's model sheet (views and emotions) into `library/sheets/`, and settle what makes Sam distinct.

*Done when:* you've picked a look, and the still and the clip are close enough to it.

*Style test, 2026-09-28:* steps 1 and 2 are rendered; step 3 (Sam's model sheet) waits for your pick.
- `snapshot` has no `-c` flag, so the reference comparison uses ffmpeg crops of the render instead.
- [engine/check-determinism.sh](engine/check-determinism.sh) renders every frame with 1 worker and with 5 and compares them. It caught worker seeks landing a hair off the frame grid; snapping `t` to 1/30 s fixed it. Both looks now pass: all 150 frames identical.
- For the storyboard: Sam is about 4× the cab's height, so frame tighter and crop.
- Watercolor-ink: the road reads purple (`--dusk` is violet there), and the far skyline nearly vanishes.
- Paper-pencil: the hatching is sparser than the reference's, and our 7 px foreground line is heavier than its 4–5 px.

**Phase 2: Voice and timing.**
1. You approve the brief: script, claims and storyboard. The script is then locked.
2. You record it ([how](library/sound/voice.md#recording-your-own-voice)): three takes, pick the best, and clean it up with ffmpeg.
3. `transcribe` turns it into `transcript.json`, and we mark the cut words, where the picture changes.

*Done when:* spot checks show the word times lining up with the audio.

**Phase 3: First full video (the Uber explainer: under 60 s, 17 pictures).**
1. Write `videos/uber-live-map/script.md`, the shot-by-shot sheet, from the brief and the real word times. Shot designs can come from the [parked 2:20 sheet](videos/uber-live-map/parked/script-2m20.md).
2. Build the hook first.
3. Build 15 s blocks, each with a contact sheet (one frame every 2.5 s) that Claude checks and fixes. Each shot loads only the library modules it uses.
4. Render the whole video.

The engine gains only what these scenes need.
*Done when:* you would actually post it.

**Phase 4: Finish.**
1. Burn in the subtitles and bring loudness to −14 LUFS. There's no music and no clean version, because LinkedIn autoplays muted.
2. Run the [retro](library/process/retro.md) and update the library.

The post text and the first comment with the sources are in the brief.
*Done when:* the subtitled MP4 exists and the retro is written.

**Phase 5: Package as a skill.** Turn the library and the engine into a skill in `.claude/skills/<name>/`, so that "Make me a cartoon ad for [brand]. Script: …" runs the whole chain.
*Done when:* a second ad comes out of one prompt and a brief approval.

## Costs

See [COSTS.md](COSTS.md). In short, on your current Pro plan the first video costs **$0 extra**: you record the voice, and every tool is free. The real cost is Pro usage: about 2–3 full 5-hour windows, or 35–50% of a Pro week. At API prices the build would be about $40–100.

## Risks

- **The look is the hard part.** HyperFrames' own docs say text prompts reach about 75–90% of a reference, and texture and line feel take several rounds. That's why Phase 1 comes before anything else.
- **Flicker** comes from anything not driven by `t`. See the render rules in CLAUDE.md.
- **Ad policy:** the reference makes health claims about the gut and cortisol. Meta can reject ads like that, and some of those claims are regulated. Every claim goes through the claims table.
- **Trademarks:** a real company can be the subject, but not the look. The Uber explainer names Uber but shows no logo and no copied app screens.
- **Other people's code:** ClaudeAnimationBase is MIT, so we can reuse it with credit. PDoomVideo has no licence file, so we only learn from it.
- **The library can drift** from what's actually built. Every module has a status (draft, built, proven), and the retro keeps them honest.
- **Your pace sets the length.** At 2.9 words a second the script runs 59.6 s, right at the limit. A brisk read (about 3.1 words a second) brings it to about 57 s.
- **Node 22** stays inside this folder via `.nvmrc`, so other projects keep using Node 20.
- **Voices and transcription outside English** are weaker. Kokoro has few French and Hindi voices, and `transcribe` needs `--model large-v3 --language <code>` for other languages.

## Decisions (2026-09-27)

- **First video:** the Uber explainer ([brief](videos/uber-live-map/brief.md)). Sam booking a ride is the hook, then come four tricks and a takeaway. The 2:20 version with the world map is parked
- **Platform:** LinkedIn only
- **Length:** fast, under 60 s: 130 words, about 57–60 s depending on your pace
- **Format:** 9:16 at 1080×1920, with everything that matters in the middle 4:5, which is what LinkedIn's main feed shows on mobile
- **Subtitles:** burned in. It's the only version, because LinkedIn autoplays muted
- **Ending:** no CTA and no end card; the video just ends. The sources go in the first comment
- **Voice:** you record it yourself
- **Language:** English
- **Audience:** engineers. The script names the real systems, taken from Uber's own posts
- **Look:** Phase 1 renders both themes (paper-pencil and watercolor-ink), and you pick by eye
- **Music in v1:** none
- **Deadline:** none set, so no rush, staying on Pro
- **Docs:** split into a reusable library and per-video folders, which each video's retro improves

## Open questions

Defaults are in brackets.

1. Do you approve the script and storyboard in the [brief](videos/uber-live-map/brief.md)? [Needed before you record]
2. Is there a deadline? [No rush; stay on Pro]
3. What makes Sam distinct: hair, clothes, one prop? [Decide from the model sheet in Phase 1]

## Sources

- Thread: Lucas Ecom IA, "Tutoriel pour créer des ads quasi-GRATUITEMENT avec un Opus 5.5" (pasted in chat)
- [HyperFrames](https://github.com/heygen-com/hyperframes). Docs read: determinism, frame adapters, CLI (`render`, `snapshot`, `tts`, `transcribe`), voice and audio, recreating references
- [Remotion agent skills](https://www.remotion.dev/docs/ai/skills)
- [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) and [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo), with the [P(doom) video post on X](https://x.com/other__reality/status/2102514581684052169). Notes are in [reference/README.md](reference/README.md)
- [ElevenLabs speech with timestamps](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps)
