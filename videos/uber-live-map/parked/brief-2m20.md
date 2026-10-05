# Brief: Uber, "How Uber Shows You Moving Cars Without Crashing"

Status: draft v2 for engineers, written by Claude on 2026-09-27. Not approved yet.

> **Parked on 2026-09-27.** This is the 2:20 version. The video became a LinkedIn cut under 60 seconds: see [the current brief](../brief.md). Kept for its research and shot designs, which later videos can reuse.

## 0. Inputs

- **Source of truth:** Uber's own engineering posts and talks (see "What Uber actually runs" below). The post you pasted was the starting point, but where it disagrees with Uber's sources, Uber wins.
- **Kind of video:** explainer. No offer, no CTA.
- **Audience:** engineers. We name the real systems: S2, H3, Ringpop, Cassandra, Schemaless, Spanner, SSE, gRPC, QUIC.
- **Placement:** 9:16 at 1080×1920 (decided). The world map gets panned, not shown whole.
- **Voice:** English. Drafts use Kokoro via `npx hyperframes tts`. The final voice is ElevenLabs; the voice is still to be chosen.
- **Pronunciation:**

  | Written | Say |
  |---|---|
  | S2 | "ess-two" |
  | H3 | "aitch-three" |
  | gRPC | "gee-ar-pee-see" |
  | QUIC | "quick" |
  | MySQL | "my-ess-cue-ell" |
  | Schemaless | "schema-less" |

- **Length:** about 2:15–2:25 depending on voice speed, set by the story. The script is about 335 words. The shot-by-shot build sheet is [script.md](script-2m20.md).
- **Music:** none. Light sound effects only: a pop for each ping, a whoosh for zooms, a tick for timers, a thud for stamps.
- **Look:** the [paper-pencil](../../../library/design/themes/paper-pencil.md) theme, copied from the reference ad: flat cartoon, wobbly outlines, pencil hatching, paper grain and the same palette. Sam is [the library's lead character](../../../library/characters/sam.md), modelled on the reference ad's man.
- **Library picks:** listed in Part A of [script.md](script-2m20.md). The recurring pictures below come from [metaphors.md](../../../library/craft/metaphors.md).
- **Brand:** Uber is named because it's the subject. We show no Uber logo and no copy of their app. The phone shows a generic ride app drawn in our style.

## What Uber actually runs

Researched 2026-09-27 from Uber Engineering posts and talks, 2015–2022. Every step has a source in section 3.

```
driver app ──GPS ping every ~4 s──▶ Geospatial service
                                    · positions held in memory, not a database
                                    · hundreds of workers, sharded with Ringpop (consistent hash ring + gossip)
                                    · shard key = Google S2 cell ID
                                    · nearby search (DISCO): cover a circle with cells, ask only those shards
driver + rider apps ──location every 30 s──▶ separate Cassandra cluster (history, >1M writes/s)
backend ──one open stream per app (RAMEN)──▶ rider app
          · Fireball decides when an update is worth pushing
          · SSE over HTTP/1.1 (2020), then gRPC bidirectional streams over QUIC/HTTP3 (2022)
trip ──▶ Schemaless (Uber's append-only datastore on MySQL; the core trip DB since 2014)
         live trip and driver state later moved from Cassandra + Redis + Ringpop to Google Cloud Spanner (2021)
H3 hexagon grid (2018) ──▶ "optimizing ride pricing and dispatch"
```

**Where the post was off:**

| The post says | What Uber documented |
|---|---|
| Most pings never touch the main database | True of the trip database. But location isn't thrown away: a separate Cassandra cluster stores the location each app sends every 30 s |
| H3 hexagons are how nearby cars are found | The only documented nearby-driver lookup (2015) used **S2** cells. H3 came in 2018 "for optimizing ride pricing and dispatch", but Uber hasn't published exactly how dispatch uses it. Posts describing "H3 k-ring lookups" are other people's reconstructions |
| One connection, and the server pushes | Right. It's RAMEN: Fireball picks what to push, over SSE and later gRPC over QUIC |
| The trip route decides your fare | Uber mostly prices upfront. What gets durable storage is the trip record itself |

**Caveat:** Uber hasn't published a current end-to-end picture. The newest source is from 2022, so the end card dates the design.

## 1. Script (locked once approved)

### Hook
1. Every few seconds, every online Uber driver's phone sends a GPS ping.
2. That's a firehose. So how does the map stay live without melting the backend?

### One ride
3. Follow one ride.
4. Sam opens the app, picks a destination, and taps Confirm.
5. A driver accepts, and a little car starts gliding toward Sam.
6. Now zoom out: thousands of riders, thousands of cars, all at once.
7. Every one of those cars is still pinging. Where do the pings go?

### Trick one: the live map lives in memory
8. Trick one: the live map lives in memory.
9. Uber's geospatial service holds every online driver's position in RAM, spread across hundreds of workers by Ringpop, a consistent hash ring.
10. In Uber's words, the data is so fleeting that database storage would be useless.
11. History still gets saved, just not in the trip database.
12. A separate Cassandra cluster stores the location each app sends every thirty seconds, at over a million writes a second.

### Trick two: index by cell, not by car
13. Trick two: index by map cell, not by car.
14. Uber's dispatch cut the earth into Google S2 cells and sharded drivers by cell ID.
15. To find cars near Sam, it covers a circle around Sam with cells and asks only those shards. Not the whole city.
16. Later, Uber built its own grid to optimize pricing and dispatch: H3, made of hexagons.
17. Why hexagons? Every neighbor sits the same distance away. Squares have two distances: side and corner.

### Trick three: stop polling
18. Trick three: stop polling.
19. At one point, eighty percent of requests to Uber's API gateway were apps polling for updates.
20. So each app keeps one stream open, and a service called Fireball decides when an update is worth pushing.
21. It started on Server-Sent Events and moved to gRPC streams over QUIC.

### Trick four: the trip gets real storage
22. Trick four: the trip gets real storage.
23. Trips went into Schemaless, Uber's append-only datastore on MySQL, and live trip state later moved to Google Cloud Spanner for real transactions.
24. The pings in between never needed that.

### Takeaway
25. Fleeting data in memory. History in a write-heavy store. Trips in a transactional database.
26. Not every piece of data deserves the same kind of storage.

**Shorter cut (~2:00–2:08):** drop lines 10, 21 and 25.

## 2. Storyboard

About 37 pictures in about 2:20, so roughly 4 s each. Long shots change picture on key words; see the build sheet. A letter after the number (4a, 4b…) means the line changes picture more than once.

**Pictures that come back** (keep them identical everywhere):

| Thing | How it's drawn |
|---|---|
| Ping | A small blue dot with a pulsing ring |
| Geospatial service | A ring of small worker boxes (the Ringpop hash ring). Each has a glowing memory chip holding car dots that fade after a few seconds |
| Cassandra | A warehouse fed by a conveyor belt, with a writes-per-second counter |
| Schemaless | A stone vault whose records are bricks, stacked on top and never replaced |
| Spanner | A second vault with a small atomic clock on top (a nod for engineers) |
| Push stream | One tube from the backend to the phone |
| Fireball | A small flame character with a clipboard, standing by the tube |
| Trick numbers | A 1, 2, 3 or 4 badge stamped in the corner |

| # | Voice line (exact) | Cut word | Set | Character and emotion | Action | Props | Transition to next shot |
|---|---|---|---|---|---|---|---|
| 1 | Every few seconds, every online Uber driver's phone sends a GPS ping. | Every | New York street, late afternoon: brownstones, fire escapes, water towers, skyscrapers behind | Sam on the sidewalk, relaxed; a crowd walking by | Cars roll through. Each car sends out a blue ping ring on a steady beat | Ride cars, a yellow cab, a hot-dog cart | Camera drifts up and back |
| 2a | That's a firehose. | firehose | Street, wider and higher | People glance up | The pings become a torrent rising over the rooftops, like water from a hose | — | Keep rising |
| 2b | So how does the map stay live without melting the backend? | how | Skyline with a server tower on the horizon | The server tower sweats | The torrent bends toward the tower, which glows red and starts to drip | Server tower | Glide back down to Sam |
| 3 | Follow one ride. | Follow | Street, close on Sam | Sam takes out a phone, curious | Camera pushes toward the phone | Phone | Dive into the screen |
| 4a | Sam opens the app, | opens | The phone screen fills the frame (generic ride app) | Sam's thumb | The thumb taps the app icon and a map loads | App icon | Change within the screen |
| 4b | picks a destination, | picks | App: "Where to?" | — | The destination types itself in | Search field | Change within the screen |
| 4c | and taps Confirm. | taps | App: ride options | — | The thumb presses Confirm, which squashes and bounces | Confirm button | Change within the screen |
| 5 | A driver accepts, and a little car starts gliding toward Sam. | accepts | App map | A smiling driver avatar on a card | A car icon glides along the streets to Sam's dot as the route line shrinks | Car icon, route line | Pull back out of the phone |
| 6a | Now zoom out: | zoom | Phone, then Sam, then the rooftops | Sam gets small | One long pull-back | — | Keep pulling up |
| 6b | thousands of riders, thousands of cars, all at once. | thousands | Aerial Manhattan (tilted map with buildings) | Tiny people | Phones light up across the blocks like fireflies, each with a car gliding toward it | Many cars and phones | Keep pulling up |
| 7a | Every one of those cars is still pinging. | pinging | Aerial city at dusk | — | Every car pulses; streams of dots rise | — | Streams rise |
| 7b | Where do the pings go? | Where | The city flattens into a paper world map | — | The streams arc from New York to a data-center pin | NYC pin, data-center pin | Dive into the data-center pin |
| 8 | Trick one: the live map lives in memory. | Trick | Inside the data center: the ring of workers | The workers blink awake | Badge 1 stamps in. Pings land on the workers, and their memory chips light up with car dots | Worker ring, memory chips | Circle around the ring |
| 9 | Uber's geospatial service holds every online driver's position in RAM, spread across hundreds of workers by Ringpop, a consistent hash ring. | geospatial | The ring, labeled "Geospatial service" and "Ringpop" | — | Each ping draws a thin line to its owning worker. The ring multiplies into hundreds of workers. Tiny gossip bubbles pass between neighbors | Labels | Zoom into one worker |
| 10 | In Uber's words, the data is so fleeting that database storage would be useless. | words | One memory chip, close up | — | A sticky note appears: "database storage would be useless" (Uber Engineering, 2016). Car dots fade after a few seconds as new ones land | Sticky note | Pull back to the data center's side wall |
| 11 | History still gets saved, just not in the trip database. | History | Data center exterior. The Schemaless vault sits locked and untouched | The vault dozes ("zzz") | A side conveyor starts moving out of the ring | Vault, conveyor | Follow the conveyor |
| 12 | A separate Cassandra cluster stores the location each app sends every thirty seconds, at over a million writes a second. | Cassandra | The Cassandra warehouse | Tiny robots stacking boxes at speed | On each 30 s tick a location box rides in. The counter spins past "1,000,000+ writes/s" | Boxes, counter | Pan back out to the map |
| 13 | Trick two: index by map cell, not by car. | cell | Top-down New York map | — | Badge 2 stamps in. A grid draws itself over the map | Grid | Zoom out to the globe |
| 14 | Uber's dispatch cut the earth into Google S2 cells and sharded drivers by cell ID. | S2 | Globe, then a cube, then cells | — | The globe inflates into a cube, and each face splits into smaller and smaller cells. Cells over New York get ID tags, each wired to a worker on the ring | Cell-ID tags | Zoom back to Sam's block |
| 15a | To find cars near Sam, it covers a circle around Sam with cells | circle | New York cell map with Sam's pin | — | A circle draws around Sam and the cells it touches light up | Compass circle | Hold |
| 15b | and asks only those shards. Not the whole city. | shards | Split: the map on top, the ring below | — | Only the workers that own those cells light up and send back car dots. The rest of the ring stays dark | Ring | Slide across |
| 16 | Later, Uber built its own grid to optimize pricing and dispatch: H3, made of hexagons. | H3 | The same map, re-tiled in hexagons | — | "H3" stamps in (2018). The hexagons fill with a price heatmap from sage to terracotta | Heatmap, stamp | Zoom into one hexagon |
| 17a | Why hexagons? Every neighbor sits the same distance away. | Why | Diagram on grid paper | — | A hexagon with its 6 neighbors, and 6 equal arrows with the same tick mark | Ruler | Slide sideways |
| 17b | Squares have two distances: side and corner. | Squares | Same diagram with a square grid (like S2's cells) | — | 4 short side arrows, 4 longer corner arrows, and a "≠" | Ruler | Wipe to the street |
| 18 | Trick three: stop polling. | polling | Street, Sam waiting at the curb | Sam, patient | Badge 3 stamps in. The phone keeps popping "anything new?" bubbles | Phone, bubbles | Follow the bubbles up to the gateway |
| 19 | At one point, eighty percent of requests to Uber's API gateway were apps polling for updates. | eighty | A toll-booth gate labeled "API gateway" | The attendant, overwhelmed | Bubbles from countless phones jam the gate while a pie chart fills to 80% | Gate, "80%" pie | The jam bursts into dust |
| 20a | So each app keeps one stream open, | stream | Backend and Sam's phone | The attendant relaxes | One tube connects the backend to Sam's phone | Tube | Hold |
| 20b | and a service called Fireball decides when an update is worth pushing. | Fireball | Same, with Fireball beside the tube | Fireball, thoughtful | Events queue at Fireball, which stamps "push" on some and drops the rest. Pushed dots travel down the tube and nudge the car on Sam's screen | Clipboard, stamp | Hold |
| 21 | It started on Server-Sent Events and moved to gRPC streams over QUIC. | Server-Sent | The same tube | — | The label first reads "SSE · HTTP/1.1" (2020), with a small counter "1.5M+ open connections" (that figure is from the 2020 post). Then it flips to "gRPC · QUIC" (2022), the tube widens and arrows start running both ways | Labels, counter | Follow a dot into Sam's phone as the car reaches the curb |
| 22 | Trick four: the trip gets real storage. | four | Street, then a top-down map | Sam gets in, happy | Badge 4 stamps in. The car drives across the map and leaves a drawn route line | Car, route line | The route line lifts off the map |
| 23a | Trips went into Schemaless, Uber's append-only datastore on MySQL, | Schemaless | The Schemaless vault | — | The trip turns into a brick and lands on top of the stack; nothing gets overwritten | Bricks | Slide to the second vault |
| 23b | and live trip state later moved to Google Cloud Spanner for real transactions. | Spanner | The Spanner vault | — | The trip record snaps in under a "COMMIT" stamp | Stamp, clock | Pan back to the ring |
| 24 | The pings in between never needed that. | pings | The ring of workers | — | Old car dots fade out of the memory chips like bubbles | — | Pull back until all three stores sit side by side |
| 25a | Fleeting data in memory. | Fleeting | Three shelves side by side: the ring, the warehouse and the vault | — | The ring lights up, labeled "memory" | — | Hold |
| 25b | History in a write-heavy store. | History | Same | — | The warehouse lights up, labeled "Cassandra" | — | Hold |
| 25c | Trips in a transactional database. | Trips | Same | — | The vault lights up, labeled "Spanner" | — | Hold |
| 26 | Not every piece of data deserves the same kind of storage. | Not | Sam steps out at the destination in front of the three shelves | Sam waves | Title card: "How Uber shows moving cars". Footnote: "From Uber Engineering posts and talks, 2015–2022" | — | End, hold 1 s |

**Sets to build:**
1. New York street
2. Phone app screens
3. Aerial Manhattan
4. World map
5. Data center with the worker ring
6. Memory-chip close-up
7. Cassandra warehouse
8. S2 globe, cube and cell map
9. H3 heatmap
10. Grid-paper diagram
11. API gateway with the push tube and Fireball
12. The two vaults
13. Three shelves and the end card

## 3. Claims

| # | Claim (script line) | Source | Date | OK |
|---|---|---|---|---|
| 1 | Drivers send a GPS ping every few seconds (1) | Matt Ranney (Uber) talk, via [High Scalability](https://highscalability.com/how-uber-scales-their-real-time-market-platform/): "drivers that send update every 4 seconds" | 2015 | ☐ |
| 2 | The geospatial service tracks every online driver, runs on hundreds of workers, and uses Ringpop, a consistent hash ring (9) | [Ringpop post](https://www.uber.com/ng/en/blog/ringpop-open-source-nodejs-library/): Geospatial "keeps track of the real-time location of every active online driver partner". High Scalability: "The new service runs on hundreds of processes"; Ringpop is "a consistent hash ring with a gossip protocol" | 2015–2016 | ☐ |
| 3 | Positions live in memory because a database would be useless (9–10) | Ringpop post: "database storage would be useless because of how fleeting the location data is. Instead, Geospatial workers … carry that ephemeral state" | 2016 | ☐ |
| 4 | A separate Cassandra cluster stores the location each app sends every 30 s, at over a million writes/s (11–12) | Abhishek Verma (Uber) talk, via [High Scalability](https://highscalability.com/how-uber-manages-a-million-writes-per-second-using-mesos-and/): one cluster stores "the location that is sent out every 30 seconds by both the driver and rider apps". The two largest clusters do "more than a million writes/sec" | 2016 | ☐ |
| 5 | Dispatch sharded drivers by Google S2 cell ID (14) | High Scalability, 2015: "Uber divides the earth into tiny cells using the Google S2 library"; "Using the cell ID as a shard key" | 2015 | ☐ |
| 6 | The nearby search covers a circle with cells and asks only those shards (15) | Same source: "a circle's worth of coverage is calculated … all the relevant shards are contacted" | 2015 | ☐ |
| 7 | H3 was built to optimize pricing and dispatch (16) | [H3 post](https://www.uber.com/us/en/blog/h3/): "our grid system for efficiently optimizing ride pricing and dispatch" | 2018 | ☐ |
| 8 | Hexagons have one neighbor distance; squares have two (17) | H3 post: "only one distance between a hexagon centerpoint and its neighbors', compared to two distances for squares" | 2018 | ☐ |
| 9 | 80% of API-gateway requests were polling (19) | [Push platform post](https://www.uber.com/en-IN/blog/real-time-push-platform/): "80% of requests made to the backend API gateway were polling calls" | 2020 | ☐ |
| 10 | Each app keeps one stream open, and Fireball decides when to push (20) | Push platform post: a persistent connection per app; "Fireball is a microservice responsible for solving the problem of 'when to push a message?'" | 2020 | ☐ |
| 11 | It started on SSE and moved to gRPC over QUIC (21) | Push platform post (SSE); [next-gen push post](https://www.uber.com/us/en/blog/ubers-next-gen-push-platform-on-grpc/): "gRPC-based bidirectional streaming (QUIC/HTTP3)" | 2020, 2022 | ☐ |
| 12 | On screen only: 1.5M+ open connections (picture 21) | Push platform post: "more than 1.5M concurrent connections and pushes over 250,000 messages per second" | 2020 | ☐ |
| 13 | Trips went into Schemaless, append-only on MySQL (23) | [Schemaless posts](https://www.uber.com/us/en/blog/schemaless-part-one-mysql-datastore/): Mezzanine moved "the core trip database" off a single Postgres, and Schemaless cells are immutable | 2016 | ☐ |
| 14 | Live trip state later moved to Google Cloud Spanner for transactions (23) | [Fulfillment re-architecture](https://www.uber.com/us/en/blog/fulfillment-platform-rearchitecture/) and [Spanner](https://www.uber.com/us/en/blog/building-ubers-fulfillment-platform/) posts: from Cassandra + Redis + Ringpop to Spanner, for transactional consistency | 2021 | ☐ |
| 15 | Thousands of riders at once (6) | Generic scale | — | ☐ |

**Claims left out on purpose:**
- "H3 k-ring lookup finds your driver": there's no Uber source for it.
- "Pings never touch a database": wrong, since history goes to Cassandra.
- "The route decides your fare": Uber mostly prices upfront.

## 4. Sign-off

- [ ] Script approved, text locked
- [ ] Every claim sourced
- [ ] Storyboard approved
