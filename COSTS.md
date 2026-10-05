# Cost estimate: first final video

This is for the Uber explainer for LinkedIn: under 60 s, 17 pictures, about 6 sets, with your own voice. Prices were checked on 2026-09-27. The Claude numbers are rough, so re-measure after Phase 1.

## Bottom line

| Route | Extra money | What it means |
|---|---|---|
| **A. Stay on Pro** (start here) | **$0** | You already pay $20/month, you record the voice, and every tool is free. The build uses about 2–3 full 5-hour windows, or 35–50% of a Pro week |
| B. Max 5x for the build month | About +$80 | $100 instead of $20. About 5× the room, so the build fits in a day or two |
| C. Pay per use (API key, or turning on extra usage) | About $40–100 | No waiting on limits. You pay per token |

Start on A. After Phase 1 we'll have real numbers, and only then decide whether B is worth it.

## 1. Claude Code (the only real cost)

**Measured on 2026-09-27** (Pro plan, extra usage off):
- **This planning session:** about 60 model calls covering research, watching the reference, two script drafts and these docs.
  - It used **22% of a 5-hour window** and **about 4% of the weekly limit**.
  - That's roughly $7 at API prices.
- **How the limits relate:** between two readings, the 5-hour window rose 11 points while the weekly limit rose 2.
  - So a Pro week holds **about 5–6 full 5-hour windows**.
  - One window is about $30 of work at API prices (rough).

**Estimate at Opus 5.5 API prices:** $4/M input, $20/M output, $0.20/M cache reads, $8/M cache writes with a 1-hour cache.

| Phase | Model calls | Avg context | Output tokens | ≈ Cost |
|---|---|---|---|---|
| 0. Setup | 30 | 60k | 15k | $1.50 |
| 1. Style test, both looks | 180 | 120k | 180k | $16.50 |
| 2. Your voice and timing | 25 | 80k | 15k | $1.50 |
| 3. Full video (17 pictures, about 6 sets) | 300 | 130k | 300k | $29 |
| 4. Subtitles, loudness and retro | 35 | 100k | 25k | $2.50 |
| **Subtotal** | ~570 | | ~535k | **~$51** |
| Rework buffer (+50%) | | | | ~$25 |
| **Total** | | | | **~$76** (range $40–100) |

How each row is worked out:
- Cache reads = calls × average context × $0.20/M.
- Cache writes are about 5% of reads, at $8/M.
- Output is priced at $20/M.

**What that means on Pro:** $51–76 of work is **about 2–3 full 5-hour windows**, or **35–50% of a Pro week**.

## 2. Voice: $0

You record it yourself ([how](library/sound/voice.md#recording-your-own-voice)) on your phone or a USB mic, and ffmpeg cleans it up. If you ever can't record, ElevenLabs Starter is $5 for a month with commercial rights; the free plan has none.

## 3. Everything else: $0

| Item | Cost |
|---|---|
| HyperFrames (Apache-2.0), ClaudeAnimationBase (MIT), ffmpeg, whisper.cpp, rough.js, Node | $0 |
| Fonts (Google Fonts, open licence) | $0 |
| Sound effects (free CC0 packs) | $0 |
| Music | None in v1 |
| Stock footage or AI video | None. Every frame is drawn in code |
| Rendering | Your M1 Max. Timed 2026-09-28: a 5 s shot (150 frames) renders in about 10 s with 5 workers, so a 60 s video (1,800 frames) takes about 2 min. A cold `npx` start adds about 40 s, and the determinism check takes about 2.5 min |

## 4. After the first video

The engine and the [library](library/README.md) (characters, sets, sound, rules) get reused, so later videos are mostly new scenes. A short like this one should then take about **$20–40 at API prices**, or about one Pro window.

## Ways to spend less

1. **Approve the brief before any code.** Rewriting scenes after they're built is the expensive part.
2. **Use a fresh Claude Code session for each 15 s block.** Shorter contexts cost less on every call.
3. **Use Sonnet 5 for mechanical steps** such as setup, re-renders and ffmpeg variants. It's half Opus 5.5's per-token price.
4. **Keep review images small.** Each image costs up to about 4,800 tokens.
5. **Measure Phase 1** (check usage before and after) and redo this estimate with real numbers.
6. **Load only the library modules a shot uses** ([pipeline.md](library/process/pipeline.md)). On the parked 2:20 script, shot 12 plus every module it needs is 27 KB, against 73 KB for the old single script file, so each call reads about a third as much.
7. **Compact long sessions.** Every call re-reads the whole conversation, so run `/compact` once it passes about 100k tokens.

## Sources

- [Claude plans](https://claude.com/pricing): Pro $20/month ($17 on annual billing), Max 5x from $100/month. Max 20x is $200/month according to [IntuitionLabs](https://intuitionlabs.ai/articles/claude-max-plan-pricing-usage-limits)
- Opus 5.5 API: $4 / $20 per million tokens, from the [pricing page](https://claude.com/pricing). Cache reads are $0.20 per million; cache writes are 1.25× the input price with a 5-minute cache and 2× with a 1-hour cache
- ElevenLabs plans: Free 10k credits (not commercial), Starter $5 for 30k (commercial), Creator $22 for 100k, from the [BIGVU 2026 pricing guide](https://bigvu.tv/blog/elevenlabs-pricing-2026-plans-credits-commercial-rights-api-costs/)
- Usage figures: the Claude app's usage card, read twice on 2026-09-27
