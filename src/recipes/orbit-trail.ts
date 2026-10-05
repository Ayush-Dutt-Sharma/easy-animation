// Ball circles, leaving a trail: a small ball circles a centre once, leaving a fading arc of light behind it.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 3; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CENTRE = SIZE / 2;
const ORBIT = 260; // knob: orbit radius
const BALL = 26; // knob: ball radius
const TRAIL = 110; // knob: trail length in degrees
const PIECES = 16; // the trail is short arcs, each fainter than the one before
const BALL_SHAPE = '<circle r="50"/>'; // shape: the ball, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  add(svg, 'circle', { cx: CENTRE, cy: CENTRE, r: 8, fill: '#fff', opacity: 0.4 }); // what it orbits
  const trail = add(svg, 'g', { fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round' });
  const pieces = Array.from({ length: PIECES }, () => add(trail, 'path'));
  const lit = add(svg, 'g', { fill: '#fff', color: '#fff', filter: glow(svg) }); // the glow sits outside the shape's scale
  const ball = shape(lit, BALL_SHAPE);

  return (t: number) => {
    const angle = easeInOutCubic(clamp(t / DURATION)) * 360; // degrees, 0 = straight up, clockwise
    const length = Math.min(TRAIL, angle); // the trail grows out of the ball, never past where it started
    pieces.forEach((piece, k) => {
      const from = angle - (length * (k + 1)) / PIECES;
      const to = angle - (length * k) / PIECES;
      set(piece, { d: `M${at(from)}A${ORBIT} ${ORBIT} 0 0 1 ${at(to)}`, opacity: 0.7 * (1 - k / PIECES) });
    });
    set(ball, { transform: `translate(${at(angle)}) scale(${BALL / 50})` });
  };
}

/** The point on the orbit at `degrees`, as "x y". */
function at(degrees: number) {
  const a = (degrees * Math.PI) / 180;
  return `${CENTRE + ORBIT * Math.sin(a)} ${CENTRE - ORBIT * Math.cos(a)}`;
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
