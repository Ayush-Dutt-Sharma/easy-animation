// Dot swells into an orb: a dim dot brightens and swells into a glowing orb, with a little overshoot.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 1.6; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const RADIUS = 80; // knob: final size of the orb
const COLOR = '#fff'; // knob
const ORB_SHAPE = '<circle r="50"/>'; // shape: the orb, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  // The glow sits outside the shape's scale, so it spreads the same however big the orb is.
  const lit = add(svg, 'g', { fill: COLOR, color: COLOR, filter: glow(svg) });
  const orb = shape(lit, ORB_SHAPE);

  return (t: number) => {
    const grow = easeOutBack(clamp(t / DURATION));
    const r = 10 + (RADIUS - 10) * grow;
    set(orb, { transform: `translate(${SIZE / 2} ${SIZE / 2 + 60 * (1 - grow)}) scale(${r / 50})` });
    set(lit, { opacity: 0.35 + 0.65 * clamp(grow) });
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

/**
 * `markup` in a new group, to move with `transform`: SVG drawn in `box` ([x, y, width, height]), or an <svg> file or
 * <image href="…"> on its own, which is fitted into `box`. Shapes take the group's fill and stroke; `currentColor` its `color`.
 */
function shape(parent: Element, markup: string, attrs: Attrs = {}, box = [-50, -50, 100, 100]) {
  const group = add(parent, 'g', attrs);
  group.innerHTML = markup;
  const file = group.firstElementChild;
  if (file && ['svg', 'image'].includes(file.tagName)) set(file, { x: box[0], y: box[1], width: box[2], height: box[3] });
  return group;
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
