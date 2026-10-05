// Orb climbs a staircase: slabs drop in one by one as a staircase, and the orb hops up onto each new step.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

const STEPS = 6; // knob
const BEAT = 0.45; // knob: seconds between steps
export const DURATION = STEPS * BEAT + 0.8; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const FIRST = { x: 150, y: 860 }; // front-left top corner of the lowest slab
const RISE = { x: 80, y: -105 }; // each step sits this far up and right of the last
const [W, D, T] = [260, 110, 34]; // slab width, depth and thickness (a flat box seen from above, at an angle)
const BALL = 28;
const DROP = 0.35; // seconds a slab takes to drop into place
const HOP = 0.3; // seconds the orb takes to hop up a step
const BALL_SHAPE = '<circle r="50"/>'; // shape: what climbs, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const shine = glow(svg, 6);
  const slabs = Array.from({ length: STEPS }, () => {
    const slab = add(svg, 'g', { filter: shine });
    add(slab, 'path', { d: `M0 0H${W}L${W + D} ${-D / 2}H${D}Z`, fill: '#000', stroke: '#fff', 'stroke-width': 2 }); // top
    add(slab, 'path', { d: `M0 0H${W}V${T}H0Z`, fill: '#fff' }); // front
    add(slab, 'path', { d: `M${W} 0L${W + D} ${-D / 2}V${-D / 2 + T}L${W} ${T}Z`, fill: '#fff', opacity: 0.6 }); // side
    return slab;
  });
  // Added last, so it is in front. The glow sits outside the shape's scale.
  const lit = add(svg, 'g', { fill: '#fff', color: '#fff', filter: glow(svg) });
  const ball = shape(lit, BALL_SHAPE);

  /** Where slab i sits at time t: it falls from above with a little bounce. */
  const slabAt = (i: number, t: number) => {
    const land = easeOutBack(clamp((t - i * BEAT) / DROP));
    return { x: FIRST.x + i * RISE.x, y: FIRST.y + i * RISE.y - 160 * (1 - land), shown: clamp((t - i * BEAT) * 6) };
  };
  /** The middle of slab i's top face, where the orb stands. */
  const standOn = (i: number, t: number) => {
    const { x, y } = slabAt(i, t);
    return { x: x + W / 2 + D / 2, y: y - D / 4 - BALL };
  };

  return (t: number) => {
    slabs.forEach((slab, i) => {
      const { x, y, shown } = slabAt(i, t);
      set(slab, { transform: `translate(${x} ${y})`, opacity: shown });
    });
    // Step n has landed; the orb hops from step n - 1 onto it.
    const n = Math.min(STEPS - 1, Math.max(0, Math.floor((t - DROP) / BEAT)));
    const hop = n === 0 ? 1 : easeInOutCubic(clamp((t - DROP - n * BEAT) / HOP));
    const from = standOn(Math.max(0, n - 1), t);
    const to = standOn(n, t);
    const x = from.x + (to.x - from.x) * hop;
    const y = from.y + (to.y - from.y) * hop - 70 * Math.sin(Math.PI * hop);
    set(ball, { transform: `translate(${x} ${y}) scale(${BALL / 50})` });
    set(lit, { opacity: clamp(t / DROP) });
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
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
/** 0 → 1 with a small overshoot past 1, then settle. */
const easeOutBack = (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2;
