# Brief: Uber, "How Uber Shows You Moving Cars Without Crashing"

Status: draft v3 (LinkedIn, under 60 s), written by Claude on 2026-09-27. Not approved yet. The 2:20 version is parked in [parked/brief-2m20.md](parked/brief-2m20.md).

## 0. Inputs

- **Platform:** LinkedIn only.
  - LinkedIn autoplays muted, so the subtitles are burned in, and this is the only version.
  - LinkedIn's main feed crops tall video to 4:5 (mobile) or letterboxes it (desktop), so everything important stays in the middle 4:5 area ([format-9x16.md](../../library/design/format-9x16.md)).
- **Length:** under 60 s, fast. 130 words: about 60 s at a normal pace, 55–57 s read briskly.
- **Kind:** explainer, for engineers.
  - No call to action and no end card: the video ends on the takeaway.
  - The named systems are S2, Cassandra and Spanner.
- **Source of truth:** Uber's own engineering posts and talks. The research is in [the parked brief](parked/brief-2m20.md#what-uber-actually-runs), and the claims this cut makes are in section 3.
- **Voice:** you record it yourself, right after this brief is approved (Phase 2). How to record: [voice.md](../../library/sound/voice.md#recording-your-own-voice).
  - A Kokoro draft stands in until then.
  - Read it briskly, as if explaining to a teammate: about 3 words a second.
- **Pronunciation:** S2 is "ess-two".
- **Music:** none.
- **Look:** Phase 1 renders both [paper-pencil](../../library/design/themes/paper-pencil.md) and [watercolor-ink](../../library/design/themes/watercolor-ink.md), and you pick one.
- **Brand:** Uber is named because it's the subject. We show no Uber logo and no copy of its app.

**Library picks:**

| Kind | Pick |
|---|---|
| Characters | [sam](../../library/characters/sam.md), [crowd](../../library/characters/crowd.md), [tech-mascots](../../library/characters/tech-mascots.md): server tower, worker boxes, warehouse robots, gatekeeper, clock vault |
| Sets | [city-street](../../library/sets/city-street.md), [phone-ui](../../library/sets/phone-ui.md), [aerial-city](../../library/sets/aerial-city.md), [data-center](../../library/sets/data-center.md), [paper-maps](../../library/sets/paper-maps.md), [system-land](../../library/sets/system-land.md) |
| Metaphors | From [metaphors.md](../../library/craft/metaphors.md): ping, torrent, melting tower, worker ring, map grid, compass search, polling bubbles, toll gateway, tube, vault, shelves |

## 1. Script (locked once approved)

### Hook
1. Sam taps Confirm, and a little car glides their way.
2. Every few seconds, every online Uber driver's phone sends a GPS ping.
3. So how does the map stay live without melting the backend?

### Trick one: memory
4. Trick one: the live map lives in memory.
5. Positions sit in RAM across hundreds of workers. Location history goes to Cassandra.

### Trick two: map cells
6. Trick two: index by map cell.
7. Drivers are sharded by S2 cell, so nearby searches hit only a few shards.

### Trick three: push
8. Trick three: stop polling.
9. Eighty percent of gateway requests were polling. Now one stream stays open, and the server pushes only what matters.

### Trick four: storage
10. Trick four: the trip gets real storage.
11. Live trip state moved to Spanner for real transactions.

### Takeaway
12. Pings in memory. History in Cassandra. Live trips in Spanner.
13. Not all data deserves the same storage.

**Stress:** *few seconds*, *melting*, *memory*, *hundreds*, *Cassandra*, *map cell*, *a few shards*, *stop polling*, *eighty percent*, *one stream*, *only what matters*, *real storage*, *transactions*, *not all*.

**Cut from the 2:20 version,** and still available in the parked brief:
- the booking steps and the world map;
- Ringpop and the hash ring, and the "database storage would be useless" quote;
- the 30 s cadence and the million writes a second;
- H3 and the hexagons;
- Fireball and SSE → gRPC over QUIC;
- Schemaless.

## 2. Storyboard

17 pictures in about 60 s, so about 3.5 s each. Times are estimates at a normal pace; your recording sets the real ones. The **cut word** is where the picture changes. Pictures 12a–12c are one picture whose light moves.

| # | Time (est.) | Voice line (exact) | Cut word | Set | Character and emotion | Action | Props | Transition to next |
|---|---|---|---|---|---|---|---|---|
| 1a | 0:00.0–0:01.3 | Sam taps Confirm, | Sam | city-street `close`: Sam on the sidewalk, phone in hand | Sam, focused | Frame 1 is already moving. Sam's thumb presses Confirm | Phone | DIVE into the screen |
| 1b | 0:01.3–0:04.3 | and a little car glides their way. | little | phone-ui map screen | — | A car icon glides along the route toward Sam's dot | Map car, route line | PULL out of the phone, and keep rising |
| 2 | 0:04.3–0:09.9 | Every few seconds, every online Uber driver's phone sends a GPS ping. | Every | city-street rooftops, then aerial-city, in one pull-back | The crowd, getting tiny | Sam's car pings. As the city opens up, every car pings, in a ripple | Pings | CARRY: the pings rise |
| 3 | 0:09.9–0:14.6 | So how does the map stay live without melting the backend? | how | city-street `skyline`, with the server tower | Server tower: calm, then overwhelmed on "melting" | The pings braid into a torrent that pours into the tower. On "melting" it sweats and sags | Torrent | DIVE into the tower's window |
| 4 | 0:14.6–0:18.2 | Trick one: the live map lives in memory. | Trick | data-center server room: the ring of 12 worker boxes | Workers waking up | Badge 1 stamps in. The workers' eyes open, and on "memory" their chips light up with moving car dots | Badge, memory chips | CARRY |
| 5a | 0:18.2–0:21.5 | Positions sit in RAM across hundreds of workers. | hundreds | data-center | — | Pings land in the chips. On "hundreds" the camera pulls back: the 12 are part of a ring of about 200 | — | Pan to the side wall |
| 5b | 0:21.5–0:24.1 | Location history goes to Cassandra. | history | data-center exterior, with a small warehouse from system-land | Tiny warehouse robots | A hatch opens, and a conveyor carries location boxes out to the warehouse. Tag: "Cassandra" | Conveyor, boxes | PULL up to the map |
| 6 | 0:24.1–0:27.0 | Trick two: index by map cell. | Trick | paper-maps: top-down New York map | — | Badge 2. An ink pen draws a grid over the map, and the cars take their cell's tint | Badge, grid | CARRY |
| 7a | 0:27.0–0:29.6 | Drivers are sharded by S2 cell, | S2 | Split: the map on top, the worker ring below | — | Each cell wires down to one worker. Tag: "Google S2" | Wires | CARRY |
| 7b | 0:29.6–0:33.2 | so nearby searches hit only a few shards. | nearby | The same split | Most workers asleep ("zzz") | A compass draws a circle around Sam's pin. The cells it covers light up, and only their few workers wake and answer | Compass | The theme's wipe, to the street |
| 8 | 0:33.2–0:35.4 | Trick three: stop polling. | Trick | city-street `curb` | Sam, patient | Badge 3. Sam's phone keeps popping "?" bubbles | Phone, "?" bubbles | Tilt up with the bubbles |
| 9a | 0:35.4–0:38.4 | Eighty percent of gateway requests were polling. | Eighty | system-land: toll gateway | Gatekeeper, overwhelmed | "?" bubbles from countless phones jam the booth, and the pie sign fills to 80% | Pie sign | POOF (a MORPH into dust) |
| 9b | 0:38.4–0:43.6 | Now one stream stays open, and the server pushes only what matters. | Now | The gateway, with a glass tube to Sam's phone | Gatekeeper, relieved | One tube draws itself to the phone. On "pushes", a dot shoots down it and the car on the phone jumps ahead | Tube, dots | MATCH: the car on the phone becomes the real car pulling up |
| 10 | 0:43.6–0:46.8 | Trick four: the trip gets real storage. | Trick | city-street `curb` | Sam, happy | The car pulls up and Sam gets in. Badge 4 | Car, badge | MATCH: the trip becomes a card |
| 11 | 0:46.8–0:50.8 | Live trip state moved to Spanner for real transactions. | Live | system-land vault room: the clock vault | — | A trip card with three state icons (raised hand, car, flag) slides into the vault. Tag: "Google Cloud Spanner". On "transactions" the door slams and a `--go` ✓ seal stamps on | Trip card, ✓ seal | PULL back |
| 12a–c | 0:50.8–0:56.0 | Pings in memory. History in Cassandra. Live trips in Spanner. | Pings, History, Live | system-land shelf display: a mini ring, a mini warehouse, a mini vault | — | Each shelf lights up on its word, under its tag: "memory", "Cassandra", "Spanner" | Shelves | CARRY: pull back to the street |
| 13 | 0:56.0–0:59.6 | Not all data deserves the same storage. | Not | city-street: the three shelves become shop windows | Sam, delighted | The car stops, and Sam steps out and waves. The video ends on a short hold that keeps moving | — | End (0.8 s hold) |

**Rhyme:** it opens with Sam tapping Confirm on the street, and ends with Sam stepping out on the same street.

**To build:**
- **Sets:** the 6 library sets above, plus a small warehouse building.
- **Characters:** Sam, the crowd, the server tower, the worker boxes, the gatekeeper and the clock vault (no face).
- **Props:** pings and the torrent, badges 1–4, tags, the grid, the compass, "?" bubbles, the pie sign, the tube, the trip card, the ✓ seal, the shelves.

The shot-by-shot build sheet (`script.md`) gets written after sign-off. Most of these shots are already designed in detail in [the parked build sheet](parked/script-2m20.md).

## 3. Claims

| # | Claim (script line) | Source | Date | OK |
|---|---|---|---|---|
| 1 | Every online driver's phone sends a GPS ping every few seconds (2) | Matt Ranney (Uber) talk, via [High Scalability](https://highscalability.com/how-uber-scales-their-real-time-market-platform/): "drivers that send update every 4 seconds" | 2015 | ☐ |
| 2 | Positions live in memory, across hundreds of workers (4, 5) | [Ringpop post](https://www.uber.com/ng/en/blog/ringpop-open-source-nodejs-library/): "database storage would be useless because of how fleeting the location data is… Geospatial workers … carry that ephemeral state". High Scalability: "The new service runs on hundreds of processes" | 2015–2016 | ☐ |
| 3 | Location history goes to a separate Cassandra cluster (5, 12) | Abhishek Verma (Uber) talk, via [High Scalability](https://highscalability.com/how-uber-manages-a-million-writes-per-second-using-mesos-and/): one cluster stores "the location that is sent out every 30 seconds by both the driver and rider apps" | 2016 | ☐ |
| 4 | Drivers are sharded by S2 cell (7) | High Scalability, 2015: "Uber divides the earth into tiny cells using the Google S2 library"; "Using the cell ID as a shard key" | 2015 | ☐ |
| 5 | A nearby search contacts only the relevant shards (7) | Same source: "a circle's worth of coverage is calculated … all the relevant shards are contacted" | 2015 | ☐ |
| 6 | 80% of gateway requests were polling (9) | [Push platform post](https://www.uber.com/en-IN/blog/real-time-push-platform/): "80% of requests made to the backend API gateway were polling calls" | 2020 | ☐ |
| 7 | Each app keeps one open stream, and the server decides what to push (9) | Push platform post: a persistent connection per app; "Fireball is a microservice responsible for solving the problem of 'when to push a message?'" | 2020 | ☐ |
| 8 | Live trip state moved to Spanner for transactions (11, 12) | [Fulfillment re-architecture](https://www.uber.com/us/en/blog/fulfillment-platform-rearchitecture/) and [Spanner](https://www.uber.com/us/en/blog/building-ubers-fulfillment-platform/) posts: from Cassandra + Redis + Ringpop to Spanner, for transactional consistency | 2021 | ☐ |

**Left out on purpose:**
- "H3 k-ring lookup finds your driver": there's no Uber source for it.
- "Pings never touch a database": wrong, since location history goes to Cassandra.
- "The route decides your fare": Uber mostly prices upfront.

## 4. Post text (draft)

LinkedIn post, with no call to action:

> How does Uber show every moving car on a live map without melting its backend? Four tricks, in under a minute.

First comment: "Sources, Uber Engineering posts and talks, 2015–2021", followed by the five links in section 3. Posts with outside links are widely reported to reach fewer people, so the links go in the comment rather than the post.

## 5. Sign-off

- [ ] Script approved, text locked
- [ ] Every claim sourced
- [ ] Storyboard approved
- [ ] Voice recorded (Phase 2)
