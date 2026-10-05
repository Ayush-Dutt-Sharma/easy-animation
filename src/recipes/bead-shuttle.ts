// Bead runs back and forth: the orb splits into two ends joined by a line, and a small bead runs back and forth between them.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 4; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CENTRE = SIZE / 2;
const SPAN = 300; // knob: centre to each end
const END = 44; // knob: end ball radius
const BEAD = 18; // knob: bead radius
const SPLIT = 0.8; // seconds the split takes; the bead starts running after it
const LAP = 3.2; // knob: seconds for the bead to go right, back, left and back
const END_SHAPE = '<circle r="50"/>'; // shape: each end, 100 across round 0 0
const BEAD_SHAPE = '<circle r="50"/>'; // shape: the bead, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const shine = glow(svg, 10);
  const line = add(svg, 'line', { y1: CENTRE, y2: CENTRE, stroke: '#fff', 'stroke-width': 4, filter: glow(svg, 4) });
  const lit = () => add(svg, 'g', { fill: '#fff', color: '#fff', filter: shine }); // the glow sits outside the shape's scale
  const ends = [-1, 1].map(() => shape(lit(), END_SHAPE));
  const bead = shape(lit(), BEAD_SHAPE);
  const reach = SPAN - END - BEAD; // the bead stops where it touches an end

  return (t: number) => {
    const split = easeOutBack(clamp(t / SPLIT));
    // A sine gives the shuttle for free: fast through the middle, slowing to a stop at each end.
    const x = reach * Math.sin((2 * Math.PI * Math.max(0, t - SPLIT)) / LAP);
    [-1, 1].forEach((side, i) => {
      const hit = clamp(((side * x) / reach - 0.85) / 0.15) ** 2; // the end the bead reaches gets nudged outward
      set(ends[i], { transform: `translate(${CENTRE + side * (SPAN * split + 14 * hit)} ${CENTRE}) scale(${END / 50})` });
    });
    set(line, { x1: CENTRE - SPAN * split, x2: CENTRE + SPAN * split });
    set(bead, { transform: `translate(${CENTRE + x} ${CENTRE}) scale(${(BEAD * clamp(split)) / 50})` });
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
