# Storytelling

Status: draft · Sources: the reference ad's structure, the Uber explainer, the P(doom) storyboard · Updated: 2026-09-27

## Structures

**Start from the platform.** It sets the length, the frame, whether the video plays muted (then subtitles are burned in), and where the sources and any call to action go. Pick it before writing a word ([format-9x16.md](../design/format-9x16.md)).

**Ad** (direct response; the reference ad runs 72 s):

| Section | Job | In the reference ad |
|---|---|---|
| Hook, 0–5 s | A surprising claim with a strong picture | "Most people don't know how fast mushroom coffee acts…", over an X-ray body |
| Mechanism | How it works, one benefit per sentence | 6 mushrooms, one callout each |
| Results over time | What changes, on a clock | 24 h, 72 h, day 7 |
| Proof | Why believe it | Ingredients, badges, a customer counter |
| Offer and urgency | What to do now | A gift, a countdown, a stock bar |
| Risk reversal and CTA | Why it's safe to try | "30 days satisfied or refunded" |

**Long explainer** (2–3 minutes; the parked 2:20 Uber cut):

| Section | Job | In the Uber explainer |
|---|---|---|
| Hook | A striking fact, then the question it raises | Every car pings every few seconds, so how does the map not melt the backend? |
| One example | Follow one case end to end, small and concrete | One rider books one ride |
| Zoom out | Show the scale the example lives in | Thousands of riders and cars |
| Numbered points | One section per idea, each with a badge | Tricks one to four |
| Takeaway | The rule behind the points, as three items | Memory, a write-heavy store, a transactional database |
| End card | The title and where the facts came from | "From Uber Engineering posts and talks, 2015–2022" |

**Short explainer** (under 60 s, about 130 words; the Uber LinkedIn cut):

| Section | Job | In the Uber short |
|---|---|---|
| Hook, about 15 s | One concrete moment, the striking fact, then the question | Sam's car glides in; every driver's phone pings; how does the map not melt the backend? |
| Numbered points, about 9 s each | One idea and one proof per point, each with a badge | Tricks one to four |
| Takeaway, about 9 s | The points as one rule | "Not all data deserves the same storage." |

There's no end card: the video ends on a moving hold, and the sources go in the post.

## Patterns that work

- **One, then many.** Follow one case, then pull back to the crowd. The viewer understands one unit before seeing the scale.
- **A question as a bridge.** End a section on the question the next one answers ("Where do the pings go?").
- **Numbered badges** on each point, so the viewer always knows where they are.
- **Places that return.** Sets come back instead of a new one every shot.
  - In the Uber video, the street comes back at the start, middle and end, and the worker ring in tricks one and two.
  - In P(doom), every chorus goes back to the same stage, bigger each time.
- **A motif that pays off.** One picture keeps coming back and its meaning grows. Ours is the ping. P(doom)'s is its meter, pumped higher every chorus.
- **A colour arc.** The light moves across the video: afternoon, dusk, server room, paper, then afternoon again.
- **Rhyme the ending.** Finish where you started, changed: Sam at the curb again, this time arriving.

## Writing the script

- One idea per sentence.
- Write numbers as words ("thirty seconds"). Subtitles can show digits.
- Mark stress words, and add every brand and acronym to the pronunciation list in [voice.md](../sound/voice.md).
- Give every claim a source in the brief's claims table. For an explainer, the company's own engineering posts beat anyone's summary of them.
- Where a popular source is wrong, say what's actually true rather than repeating the mistake.
- Plan at about 174 words a minute, including pauses. The platform sets the length and the story fills it: under 60 s is about 130 words.
- Mark which lines can be dropped for a shorter cut.

## Storyboard

Write this before any scene code:
- a one-sentence logline;
- the world: the sets and the colour arc;
- the motif;
- the lead's emotional arc;
- one row per picture: cut word, set, characters, action, props and the transition out.

Then check it against [rules.md](rules.md) and [common-failures.md](common-failures.md).
