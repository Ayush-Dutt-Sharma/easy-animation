# Visual metaphors for systems

Status: draft · Source: the Uber explainer · Updated: 2026-09-27

Engineers already know the terms. The picture's job is to make the important property obvious, so each entry names the property it shows.

## Finding a new one

1. **Name the property that matters,** not the thing: fleeting, append-only, one owner per key, one connection instead of many.
2. **Find an everyday object with that property:** bubbles pop, bricks stack, vaults lock, a toll booth jams.
3. **Make it act out the property on the cut word:** the dot fades, the brick lands on top, the door slams.
4. **Keep it identical** every time it comes back.
5. **Label it once** with the real name (a tech tag), at the moment the voice says it.

## Dictionary

| Concept | Picture | Property it shows | Pieces |
|---|---|---|---|
| Location update, heartbeat, event | A ping: a dot with an expanding ring | Small, frequent, coming from everywhere | [data-graphics](../props/data-graphics.md) |
| Very high write volume | Pings braiding into a torrent, like water from a hose | Volume | [data-graphics](../props/data-graphics.md) |
| Overloaded backend | A server tower that sweats, glows red and melts | Too much load in one place | [tech-mascots](../characters/tech-mascots.md) |
| In-memory state | A glowing memory chip holding moving dots | Fast and live, not on disk | [data-center](../sets/data-center.md) |
| Ephemeral data | Dots with timer rings that fade and pop | Useless after a few seconds | [data-graphics](../props/data-graphics.md) |
| Sharded service | A ring of worker boxes, each owning its share | Split across processes | [tech-mascots](../characters/tech-mascots.md), [data-center](../sets/data-center.md) |
| Scale-out | Pull back: the ring of 12 is part of a ring of 200 | Far more of them than you thought | [data-center](../sets/data-center.md) |
| Consistent hashing | A hash ring with ticks; an item slides clockwise to the next worker | Each key has one owner | [data-graphics](../props/data-graphics.md) |
| Gossip protocol | Tiny "··" bubbles hopping between neighbours | Nodes tell their neighbours | [data-graphics](../props/data-graphics.md) |
| Spatial index, geo-sharding | A grid drawn over a map, with cars tinted by cell | Look things up by place, not one by one | [paper-maps](../sets/paper-maps.md), [data-graphics](../props/data-graphics.md) |
| Nearby search | A compass circle; the cells it touches light up | Cover an area with cells | [paper-maps](../sets/paper-maps.md) |
| Scatter-gather | Arrows go down wires to only the owning workers while the rest sleep | Ask only the ones that matter | [data-center](../sets/data-center.md), [data-graphics](../props/data-graphics.md) |
| Hexagon grid | A hex tiling; 6 equal arrows beside a square's two lengths | One neighbour distance | [data-graphics](../props/data-graphics.md) |
| Pricing by area | Cells filling with a heatmap, like liquid | A value per cell | [data-graphics](../props/data-graphics.md) |
| A generic database | The classic cylinder | Use it for "not this one" | [objects](../props/objects.md) |
| Append-only store | A vault whose records are bricks: new ones on top, overwrites get a ✕ | Old records never change | [system-land](../sets/system-land.md) |
| Transactional database | A vault with a heavy door that seals with a ✓ (a COMMIT stamp if the voice says "commit") | All or nothing | [system-land](../sets/system-land.md) |
| Globally consistent database | The vault with an atomic clock on top | Synced time (a nod to Spanner's TrueTime) | [tech-mascots](../characters/tech-mascots.md) |
| Write-heavy history store | A warehouse fed by a conveyor, with robots and a writes/s counter | Lots of small writes, all kept | [system-land](../sets/system-land.md) |
| Periodic writes | A wall clock fast-forwarding; a box drops on each tick | Every N seconds | [objects](../props/objects.md) |
| Polling | A phone popping "?" bubbles that jam at a gate | Asking again and again | [data-graphics](../props/data-graphics.md) |
| API gateway | A toll booth with a barrier arm and an attendant | Everything passes through one gate | [system-land](../sets/system-land.md), [tech-mascots](../characters/tech-mascots.md) |
| Share of traffic | A pie-chart sign | A part of the whole | [data-graphics](../props/data-graphics.md) |
| Persistent connection | A glass pneumatic tube from the backend to the phone | One pipe, kept open | [system-land](../sets/system-land.md) |
| Push decision | A flame clerk stamping PUSH on some event cards and tossing the rest | Send only what matters | [tech-mascots](../characters/tech-mascots.md) |
| Protocol upgrade | The label plate flips, the tube widens, and arrows run both ways | Newer, and two-way | [system-land](../sets/system-land.md) |
| An event becomes a record | A route line lifts off the map and rolls into a brick | Now it's data | [data-graphics](../props/data-graphics.md), [objects](../props/objects.md) |
| State machine | Three icons with arrows on a card (for a trip: a raised hand, a car, a flag), the current one lit | The current state | [data-graphics](../props/data-graphics.md) |
| The right storage for each kind of data | Three shelves lit one at a time | Different data, different store | [system-land](../sets/system-land.md) |
| A quote from the source | A sticky note with the attribution | Their words, not ours | [labels-and-stamps](../props/labels-and-stamps.md) |
| When something happened | A year stamp | It dates the design | [labels-and-stamps](../props/labels-and-stamps.md) |
