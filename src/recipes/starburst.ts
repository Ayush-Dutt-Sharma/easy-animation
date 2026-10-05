// Balls burst into a ring: balls shoot out of the centre on spokes, swirl, and settle into a ring, stretching while they fly.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CENTRE = SIZE / 2;
const COUNT = 12; // knob: balls in the ring
const RING = 300; // knob: ring radius
const BALL = 34; // knob: ball radius
const SWIRL = 70; // knob: degrees the ring turns as it opens

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const spokes = add(svg, 'g', { stroke: '#fff', 'stroke-width': 2.5, opacity: 0.7, filter: glow(svg, 4) });
  const balls = add(svg, 'g', { fill: '#fff', filter: glow(svg, 10) });
  const rays = Array.from({ length: COUNT }, (_, i) => ({
    spoke: add(spokes, 'line', { x1: CENTRE, y1: CENTRE }),
    ball: add(balls, 'ellipse', { ry: BALL }),
    start: 0.15 + i * 0.03, // a ripple round the ring, not all at once
  }));
  add(balls, 'circle', { cx: CENTRE, cy: CENTRE, r: BALL * 0.8 }); // the hub they burst from

  return (t: number) => {
    const turn = SWIRL * (1 - easeOutCubic(clamp(t / 1.4)));
    rays.forEach(({ spoke, ball, start }, i) => {
      const flight = clamp((t - start) / 0.8);
      const out = easeOutBack(flight);
      const angle = (i / COUNT) * 360 - turn; // degrees, 0 = straight up
      const a = (angle * Math.PI) / 180;
      const [x, y] = [CENTRE + RING * out * Math.sin(a), CENTRE - RING * out * Math.cos(a)];
      const stretch = 1 + 1.4 * Math.sin(Math.PI * flight); // long while flying, round once it lands
      set(spoke, { x2: x, y2: y });
      set(ball, { rx: BALL * stretch, transform: `translate(${x} ${y}) rotate(${angle + 90})` });
    });
  };
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
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
/** 0 → 1 with a small overshoot past 1, then settle. */
const easeOutBack = (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2;
