# Typography

Status: draft · Source: the Uber script's production bible · Used in: uber-live-map · Updated: 2026-09-27

All fonts are Google Fonts under the free OFL licence. Text is rare (rule 7 in [rules.md](../craft/rules.md)), and these are the only kinds.

| Role | Font | Style |
|---|---|---|
| Subtitles | Fredoka Bold 76 px | White, with a 10 px `--ink` stroke and a hard shadow (0/6 px, `--ink` at 35%) |
| Scene labels and captions | Kalam Bold 48 px | `--ink`, on paper tags |
| Tech tags (system names) | JetBrains Mono Bold 36 px | `--ink` on a `--paper` tag with a 3 px ink border |
| Numbers and counters | JetBrains Mono Bold 72–110 px | `--ink` |
| End-card title | Kalam Bold 64 px | On a paper card with an ink border |
| Source footnote | JetBrains Mono 26 px | Under the end-card title |

## Subtitles

- Show 1–4 words at a time. Never split a system name: "Google Cloud Spanner" stays in one chunk.
- A chunk appears 2 frames before its first word, scales from 92% to 100% over 4 frames (easeOutBack), and swaps instantly to the next chunk.
- The last chunk of a sentence stays up until the next sentence starts, for at most 0.6 s.
- Subtitles are burned in through an `.ass` file built from `transcript.json`. This section is the spec for that file.
- On platforms that autoplay muted, such as LinkedIn, the subtitled version is the only version. Make a clean version only when a platform needs one.

## Tech tags

- Tilted between −4° and +4° (seeded), and pinned with an `--alert` thumbtack.
- They enter with a stamp: 130% to 100% over 5 frames (easeOutBack), with SFX-STAMP-S.
- Each one is spelled exactly as in the brief's claims table.
