// Shards assemble: nine wire squares fly in from scattered, tilted spots, lock into a grid, and light flares out.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2.8; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CENTRE = SIZE / 2;
const GRID = 3; // knob: squares per side
const CELL = 110; // knob: square size
const GAP = 12;
const SCATTER = 420; // knob: how far apart the shards start
const RAYS = 8;

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const rays = add(svg, 'g', { fill: '#fff', filter: glow(svg, 10) });
  for (let i = 0; i < RAYS; i++) {
    const a = (i / RAYS) * 2 * Math.PI;
    const tip = (turn: number) => `${CENTRE + 700 * Math.cos(a + turn)} ${CENTRE + 700 * Math.sin(a + turn)}`;
    add(rays, 'path', { d: `M${CENTRE} ${CENTRE}L${tip(-0.015)}L${tip(0.015)}Z` });
  }

  const grid = add(svg, 'g', { fill: 'none', stroke: '#fff', 'stroke-width': 3, filter: glow(svg, 6) });
  const pitch = CELL + GAP;
  const shards = Array.from({ length: GRID * GRID }, (_, i) => ({
    rect: add(grid, 'rect', { x: -CELL / 2, y: -CELL / 2, width: CELL, height: CELL, rx: 6 }),
    home: {
      x: CENTRE + ((i % GRID) - (GRID - 1) / 2) * pitch,
      y: CENTRE + (Math.floor(i / GRID) - (GRID - 1) / 2) * pitch,
    },
    from: { x: (random(i) - 0.5) * 2 * SCATTER, y: (random(i + 50) - 0.5) * 2 * SCATTER, turn: (random(i + 99) - 0.5) * 180 },
    delay: random(i + 7) * 0.5,
  }));

  return (t: number) => {
    for (const { rect, home, from, delay } of shards) {
      const away = 1 - easeOutBack(clamp((t - delay) / 1.1)); // 1 = scattered, 0 = home
      set(rect, {
        transform: `translate(${home.x + from.x * away} ${home.y + from.y * away}) rotate(${from.turn * away})`,
        opacity: clamp((t - delay) * 4),
      });
    }
    const flare = Math.sin(Math.PI * clamp((t - 1.5) / 1.2)); // the grid is whole: light bursts out, then settles
    set(rays, { opacity: 0.7 * flare, transform: `rotate(${t * 12} ${CENTRE} ${CENTRE})` });
  };
}

/** Repeatable "random" in [0, 1): the same n always gives the same number, so every play looks the same. */
function random(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// ---- helpers: repeated in every recipe, so each file stands alone ----

type Attrs = Record<string, string | number>;

function add<K extends keyof SVGElementTagNameMap>(parent: Element, tag: K, attrs: Attrs = {}) {
  return set(parent.appendChild(document.createElementNS('http://www.w3.org/2000/svg', tag)), attrs);
}

function set<T extends Element>(node: T, attrs: Attrs) {
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, String(value));
  return node;
}

/** The glow: a wide blur, a tight blur and the shape itself, stacked. Returns the value for a `filter` attribute. */
function glow(svg: SVGSVGElement, spread = 12) {
  const id = `glow-${Math.random().toString(36).slice(2)}`;
  const box = { x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE }; // big enough that the glow is never cut off
  const filter = add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', ...box });
  add(filter, 'feGaussianBlur', { in: 'SourceGraphic', stdDeviation: spread * 3, result: 'wide' });
  add(filter, 'feGaussianBlur', { in: 'SourceGraphic', stdDeviation: spread, result: 'near' });
  const merge = add(filter, 'feMerge');
  for (const layer of ['wide', 'near', 'SourceGraphic']) add(merge, 'feMergeNode', { in: layer });
  return `url(#${id})`;
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** 0 → 1 with a small overshoot past 1, then settle. */
const easeOutBack = (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2;
