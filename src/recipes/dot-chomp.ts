// Chomper eats a row of dots: a row of dots flickers on, a Pac-Man-style mouth chomps in from the left, then all but the middle dot flicker off.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const ROW = 500; // knob: height of the row
const DOTS = 9; // knob
const GAP = 110; // knob: distance between dots
const DOT = 18.7; // knob: dot radius
const HERO = 4; // knob: the dot that stays when the rest go off, counting from 0 on the left
const PAC = 52; // knob: radius of the chomper
const SPEED = 420; // knob: pixels per second
const ENTER = 0.735; // knob: second its centre crosses the left edge, mouth shut
const CHOMPS = 3; // knob: bites per second
const MOUTH = 33; // knob: degrees the open mouth reaches above and below its middle
const SHUT = 0.3; // knob: how long the mouth stays shut on each bite, 0 to 1
const OFF = 1.3; // knob: second everything but the hero starts flickering off
/** Brightness every 1/30 s as the lights come on: a faint pulse, a beat of dark, then full. Going off plays it backwards. */
const FLICKER = [0, 0.11, 0.35, 0.46, 0.35, 0.11, 0, 0.27, 0.86, 1];
const LIT = (FLICKER.length - 1) / 30; // seconds from dark to fully on
const GLOW = 12; // knob: how far the glow spreads
const HALO = 0.9; // knob: how bright the glow is, 0 to 1
const COLOR = '#fff'; // knob
const DOT_SHAPE = '<circle r="50"/>'; // shape: each dot, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const shine = glow(svg, GLOW, HALO);
  const left = SIZE / 2 - ((DOTS - 1) / 2) * GAP; // the first dot, so the row is centred
  const xs = Array.from({ length: DOTS }, (_, i) => left + i * GAP);
  const dot = (parent: Element, cx: number) => shape(parent, DOT_SHAPE, { transform: `translate(${cx} ${ROW}) scale(${DOT / 50})` });
  // The row and the chomper flicker off together; the hero is drawn on its own so it can stay lit.
  const row = add(svg, 'g', { fill: COLOR, color: COLOR, filter: shine });
  const dots = xs.filter((_, i) => i !== HERO).map((cx) => ({ cx, node: dot(row, cx) }));
  const chomper = add(row, 'path', {});
  const hero = add(svg, 'g', { fill: COLOR, color: COLOR, filter: shine });
  dot(hero, xs[HERO]);

  return (t: number) => {
    const on = flicker(t);
    const x = SPEED * (t - ENTER); // the chomper's centre
    const chomp = Math.abs(Math.sin(Math.PI * CHOMPS * (t - ENTER))); // 0 shut, 1 open: shut as it enters
    const bite = MOUTH * clamp((chomp - SHUT) / (1 - SHUT));
    set(hero, { opacity: on });
    set(row, { opacity: Math.min(on, flicker(OFF + LIT - t)) });
    // A dot is eaten once the chomper's centre is half its radius away; by then the closed mouth covers it.
    for (const { cx, node } of dots) set(node, { visibility: x > cx - PAC / 2 ? 'hidden' : 'visible' });
    set(chomper, { d: chomperPath(bite), transform: `translate(${x} ${ROW})` });
  };
}

/** Brightness `s` seconds after the lights start coming on: FLICKER read 30 times a second, 0 before and 1 after. */
function flicker(s: number) {
  const at = clamp(s / LIT) * (FLICKER.length - 1);
  const i = Math.min(Math.floor(at), FLICKER.length - 2);
  return FLICKER[i] + (FLICKER[i + 1] - FLICKER[i]) * (at - i);
}

/** The chomper facing right with its centre on 0 0, the mouth open `bite` degrees above and below the middle. */
function chomperPath(bite: number) {
  const a = (bite * Math.PI) / 180;
  const [x, y] = [PAC * Math.cos(a), PAC * Math.sin(a)];
  // Round the back in two half-turns, so the shape still draws when the mouth is shut and both ends meet.
  return `M0 0L${x} ${-y}A${PAC} ${PAC} 0 0 0 ${-PAC} 0A${PAC} ${PAC} 0 0 0 ${x} ${y}Z`;
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

/** A soft glow: the shape blurred and dimmed to `strength`, under the shape itself. Returns the value for a `filter` attribute. */
function glow(svg: SVGSVGElement, spread: number, strength: number) {
  const id = `glow-${Math.random().toString(36).slice(2)}`;
  const box = { x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE }; // big enough that the glow is never cut off
  const filter = add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', ...box });
  add(filter, 'feGaussianBlur', { in: 'SourceGraphic', stdDeviation: spread });
  const dim = add(filter, 'feComponentTransfer', { result: 'halo' });
  add(dim, 'feFuncA', { type: 'linear', slope: strength });
  const merge = add(filter, 'feMerge');
  for (const layer of ['halo', 'SourceGraphic']) add(merge, 'feMergeNode', { in: layer });
  return `url(#${id})`;
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
