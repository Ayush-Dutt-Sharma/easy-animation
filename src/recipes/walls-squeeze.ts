// Walls squash the orb: two soft walls of light close in from the sides and squash the orb between them.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2.2; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CENTRE = SIZE / 2;
const RADIUS = 80; // knob: orb size
const WALL = 300; // knob: wall thickness
const SQUASH = 0.3; // knob: how much the orb is pressed thin (0 = not at all)
const ORB_SHAPE = '<circle r="50"/>'; // shape: what gets squashed, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const soft = blur(svg, 45);
  const walls = [-1, 1].map(() => add(svg, 'rect', { y: -100, width: WALL, height: SIZE + 200, fill: '#fff', filter: soft }));
  const lit = add(svg, 'g', { fill: '#fff', color: '#fff', filter: glow(svg) }); // the glow sits outside the shape's scale
  const orb = shape(lit, ORB_SHAPE);

  return (t: number) => {
    const close = easeInOutCubic(clamp((t - 0.2) / 1.3)); // 0 = walls off stage, 1 = pressing on the orb
    const gap = SIZE / 2 + WALL - close * (SIZE / 2 + WALL - RADIUS * (1 - SQUASH) - 50); // centre to inner edge
    set(walls[0], { x: CENTRE - gap - WALL, opacity: 0.85 * close });
    set(walls[1], { x: CENTRE + gap, opacity: 0.85 * close });
    const [wide, tall] = [RADIUS * (1 - SQUASH * close), RADIUS * (1 + SQUASH * 0.8 * close)];
    set(orb, { transform: `translate(${CENTRE} ${CENTRE}) scale(${wide / 50} ${tall / 50})` });
  };
}

/** A plain blur, for light that has no hard edge. Returns the value for a `filter` attribute. */
function blur(svg: SVGSVGElement, amount: number) {
  const id = `blur-${Math.random().toString(36).slice(2)}`;
  const box = { x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE };
  add(add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', ...box }), 'feGaussianBlur', { stdDeviation: amount });
  return `url(#${id})`;
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
