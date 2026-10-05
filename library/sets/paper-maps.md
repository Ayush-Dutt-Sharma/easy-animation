# Set: paper maps

Status: draft · Source: the Uber script (shots 7b, 13–16, 22) · Used in: uber-live-map · Updated: 2026-09-27

Hand-drawn maps on paper. Light: `flat`. Bed: AMB-PAPER.

## World map

- `--sand` continents and a `--bluegrey` ocean, with hatched waves drifting slowly (5 px/s).
- In 9:16 it's panned, never shown whole: frame the two places the story connects.
- **Pins:**
  - an `--alert` city pin that bounces in;
  - a facility pin: a little building with an icon, such as a server.
  - Use generic labels ("data center"), not real sites, unless a source names them.
- **Arcs:** Bézier curves between pins, with dots flowing along them.
- An invisible pencil can doodle a "?" beside the arcs.

## Top-down city map

- An inked street grid, with `--beige` blocks, a `--sage` park and `--bluegrey` rivers.
- Car icons roll along the streets at 20 px/s. The lead's `--alert` pin sits near the centre.
- Overlays come from [data-graphics.md](../props/data-graphics.md): square grids, cell tints, hexagon tiling, heatmaps and route lines. The compass that draws circles is in [objects.md](../props/objects.md).

## Globe

- A paper globe with hatched shading (radius 360 px).
- It turns by sliding its map inside the circle (10°/s), never by a 3D projection.
- It can square off into a cube (a 12-frame MORPH), with the continents stretched over 3 faces, then split each face into smaller and smaller cells. The Uber video uses this to show Google's S2 cells.
