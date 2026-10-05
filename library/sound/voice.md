# Voice

Status: draft · Sources: the Lucas Ecom IA thread, the Uber brief and script, the HyperFrames docs · Used in: uber-live-map · Updated: 2026-09-27

## Tools

- **Final:** your own recording, by default ([below](#recording-your-own-voice)).
- **Fallback:** ElevenLabs, for when you can't record.
  - Its `/with-timestamps` endpoint also returns character timings.
  - The API key lives in `.env`, never in files or prompts.
- **Drafts (optional):** Kokoro-82M via `npx hyperframes tts`. It runs locally, costs nothing, and can time a storyboard before the real take exists.
- **Word times:** `npx hyperframes transcribe` (whisper.cpp) writes `transcript.json`, which is the clock for the whole video. For languages other than English, add `--model large-v3 --language <code>`.

## Recording your own voice

Record once the script is approved and before any visuals, because the take sets every cut.

1. **Room:** small and soft, such as a closet full of clothes or a duvet behind you. Turn off fans and the AC.
2. **Mic:** a phone's voice-memo app is fine. Hold it 15–20 cm from your mouth and a little to the side, so your breath doesn't pop. A USB mic is better if you have one.
3. **Format:** WAV if the app allows it, at 48 kHz. Save takes as `videos/<name>/voice/take-1.wav`, `take-2.wav` and so on.
4. **Three full takes** at the pace the brief asks for (about 3 words a second for a short). Leave 2 s of silence at the start. If you trip, pause and start the sentence again; the pause is where the edit goes.
5. **Pick** the best take as a whole. Patch in a line from another take only if it matches in tone and distance.
6. **Clean up** with ffmpeg: a high-pass at 80 Hz, light noise reduction, then −16 LUFS:
   `ffmpeg -i take-2.wav -af "highpass=f=80,afftdn,loudnorm=I=-16:TP=-1.5" -ac 1 -ar 48000 voice.wav`
7. **Time it:** run `npx hyperframes transcribe` on `voice.wav`, then spot-check a few words against the waveform.

## Delivery

| Video type | Direction |
|---|---|
| Explainer for engineers | A friendly senior engineer explaining to peers. Clear and brisk, with a smile in the voice and no announcer energy |
| Ad | To define with the first ad |

Stress words and delivery notes for each line go in the video's script.

## Pace (for planning estimates)

- About 2.9 words a second (174 wpm) including pauses. A brisk read is about 3.2 words a second.
- **Pauses:** 0.20 s at the start, 0.30 s after a line, 0.55 s after a section, and a 0.8–1.2 s hold at the end.
- **Acronyms count as several words:** GPS 3, S2 2, H3 2, gRPC 4, QUIC 1, MySQL 3, API 3, ID 2.
- Replace every estimate with `transcript.json` as soon as a voice exists.

## Levels

The voice track is normalised to −16 LUFS. The master target is in [mix.md](mix.md).

## Pronunciation

Add every brand and acronym here the first time a script uses it.

| Written | Say |
|---|---|
| S2 | "ess-two" |
| H3 | "aitch-three" |
| gRPC | "gee-ar-pee-see" |
| QUIC | "quick" |
| MySQL | "my-ess-cue-ell" |
| Schemaless | "schema-less" |

## Chosen voices

Record each voice here: your own, or a service's voice name and ID. Never the API key.

| Use | Voice | Chosen on |
|---|---|---|
| Explainers (uber-live-map) | Your own recording | 2026-09-27 |
