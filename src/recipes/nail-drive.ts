// Hammer drives a nail: a glowing orb squashes into a nail's head, then an outlined hammer flickers on, taps the nail in blow by blow and knocks the head to the floor.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 8; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const BIG = 105.8; // knob: radius of the orb at the start, in the middle of the stage
const DOT = 18.7; // knob: half the width of the nail's head
const FLAT = 0.45; // knob: the head's height over its width
const NAIL = 137; // knob: length of the shaft below the head; each blow drives in an equal share
const SINK = [27.8, 27.3, 19, 18.5]; // knob: pixels each blow drives the head down; the blow after the last knocks it off
const SETTLE = 0.1; // knob: seconds the nail takes to sink after a blow
const FLOOR = 864.8; // knob: where the head lands
const DRIFT = -13; // knob: pixels it swerves sideways as it falls, and back
const HAND = { x: 382.6, y: 455.6 }; // knob: where the hammer is held, the point it turns about
const DROP = 27.8; // knob: pixels the hand moves down after each blow, to follow the nail
const UP = 104.1; // knob: degrees the hammer springs back to after a blow, a little past upright
// knob: the hammer's lift at each moment, as [seconds, degrees, ease into it]. 0° lies flat on the nail's head, more
// raises it. Each time it comes down to 0° is a blow.
const SWING: [number, number, (p: number) => number][] = [
  [0, 44, (p) => p], [0.2, 44, (p) => p], [0.767, 12.3, easeInCubic], [0.8, 0, (p) => p], // resting, then tipping onto the nail
  [0.827, 0, (p) => p], [1.633, UP, easeOutExp], [1.833, 0, (p) => p ** 1.2], // a beat on the nail, back up, down again
  [1.877, 0, (p) => p], [3.233, UP, easeOutExp], [3.467, 0, (p) => p ** 1.2],
  [3.507, 0, (p) => p], [4.7, UP, easeOutExp], [4.867, 0, (p) => p ** 1.2],
  [4.92, 0, (p) => p], [6.633, UP, easeOutExp], [6.8, 0, (p) => p ** 1.2],
];
const HITS = SWING.filter(([, lift], i) => lift === 0 && i > 0 && SWING[i - 1][1] > 0).map(([at]) => at);
const TOPS = SWING.filter(([, lift]) => lift === UP).map(([at]) => at); // the hand drops from each blow to the next top
const HAMMER_SHAPE = `<path d="${[ // shape: the hammer lying flat as it lands, in the box -41 -63 to 133 41: held at 0 0, head to the right, face down
  'M-32.6 -10.9Q-40.6 -10.9 -40.6 -2.9V3.4Q-40.6 10.4 -33.6 10.4L94 9L99 10.2', // the handle, rounded at the end
  'Q107.8 10.8 108 16.4L106.2 23.6L101 29.6Q100 31 100.2 33L100.5 38.6Q100.8 40.4 102.5 40.4H129.5', // down the neck to the face
  'Q131 40.4 131.2 38.6L132.2 30.6Q132 28.6 130.8 27.8L126.8 25Q123.5 22.4 124.3 19L125.3 16L130.5 10.7Q131.8 8.5 131.7 5',
  'L131.5 -12C131.5 -40 104.7 -51.8 96.7 -62.8Q108.5 -36 110.3 -20Q110.2 -16.2 107 -15.8L94.5 -14.4ZM94.5 -14.4V9.6', // the claw, the collar
].join('')}"/>`;
const HEAD_SHAPE = '<circle r="50"/>'; // shape: the orb that squashes into the nail's head, 100 across round 0 0
const LINE = 3; // knob: width of the lines
// Every beat as [start, end] in seconds.
const BEATS: Record<string, [number, number]> = {
  squash: [0.243, 0.702], // the orb squashes flat into the nail's head…
  grow: [0.233, 0.4], // …as the shaft slides out below it
  fall: [6.8, 7.85], // the last blow knocks the head down…
  swerve: [6.8, 7.1], // …swerving aside…
  back: [7.333, 7.967], // …and back…
  round: [6.833, 7.633], // …as it rounds into a ball
};
/** Brightness every 1/30 s as the hammer comes on: a faint pulse, a beat of dark, then full. It goes off the same way, backwards. */
const FLICKER = [0, 0.1, 0.37, 0.45, 0.32, 0.12, 0, 0.3, 0.85, 1];
const ON = 0.133; // knob: second the hammer starts to come on
const OFF = 6.9; // knob: second it's gone, and the nail's shaft with it
/** The orb's glow every 1/30 s from ON: it goes as the orb squashes, then flashes faintly once. */
const AFTERGLOW = [1, 1, 0.25, 0, 0.1, 0.3, 0.41, 0.3, 0.1, 0];
const GLOW = 12; // knob: how far the orb's glow spreads
const HALO = 0.9; // knob: how bright the glow is, 0 to 1
const BLUR = 10; // knob: copies of the hammer averaged across each frame, so a fast swing smears (1 = sharp)
const SHUTTER = 1 / 60; // knob: seconds of movement each frame's smear shows
const COLOR = '#fff'; // knob

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  // Underneath everything, the hammer BLUR times across the shutter. Each copy sits on black (the stage colour) and
  // covers the ones before at 1/k opacity, which leaves their average: a fast swing smears, a still hammer stays sharp.
  const hammer = add(svg, 'g', { fill: 'none', stroke: COLOR, 'stroke-width': LINE, 'stroke-linejoin': 'round' });
  const copies = Array.from({ length: BLUR }, (_, k) => {
    const layer = add(hammer, 'g', { opacity: 1 / (k + 1) });
    add(layer, 'rect', { width: SIZE, height: SIZE, fill: '#000', stroke: 'none' });
    return shape(layer, HAMMER_SHAPE, {}, [-41, -63, 174, 104]);
  });
  // The orb as it was, glowing, behind the one that squashes: its light goes, then flashes once.
  const afterglow = shape(add(svg, 'g', { fill: COLOR, color: COLOR, filter: glow(svg, GLOW, HALO) }), HEAD_SHAPE);
  set(afterglow, { transform: `translate(${SIZE / 2} ${SIZE / 2}) scale(${BIG / 50})` });
  const shaft = add(svg, 'path', { stroke: COLOR, 'stroke-width': LINE });
  const head = shape(svg, HEAD_SHAPE, { fill: COLOR, color: COLOR });

  return (t: number) => {
    set(afterglow, { opacity: read(AFTERGLOW, t - ON) });
    const blows = HITS.map((hit) => easeInOutSine(progress(t, [hit, hit + SETTLE]))); // 0 to 1 as each blow lands
    const sunk = SINK.reduce((sum, pixels, i) => sum + pixels * blows[i], 0);
    const y = SIZE / 2 + sunk + (FLOOR - SIZE / 2 - sunk) * easeOutExp(progress(t, BEATS.fall));
    const x = SIZE / 2 + DRIFT * (easeOutQuad(progress(t, BEATS.swerve)) - easeInOutSine(progress(t, BEATS.back)));
    const squash = easeOutExp(progress(t, BEATS.squash));
    const ry = BIG + (DOT * FLAT - BIG) * squash + DOT * (1 - FLAT) * progress(t, BEATS.round);
    set(head, { transform: `translate(${x} ${y}) scale(${(BIG + (DOT - BIG) * squash) / 50} ${ry / 50})` });
    // The shaft hangs from the middle of the head, hidden behind the orb until it slides out.
    const left = NAIL * (1 - blows.reduce((sum, blow) => sum + blow, 0) / HITS.length);
    const end = SIZE / 2 + BIG + (y + DOT * FLAT + left - SIZE / 2 - BIG) * easeOutQuad(progress(t, BEATS.grow));
    set(shaft, { d: `M${x} ${y}V${end}`, opacity: read(FLICKER, OFF - t) });

    set(hammer, { opacity: Math.min(read(FLICKER, t - ON), read(FLICKER, OFF - t)) });
    copies.forEach((copy, k) => {
      const at = t + SHUTTER * ((k + 0.5) / BLUR - 0.5); // this copy's moment in the shutter
      const drop = DROP * TOPS.reduce((sum, top, i) => sum + easeInOutSine(progress(at, [HITS[i], top])), 0);
      set(copy, { transform: `translate(${HAND.x} ${HAND.y + drop}) rotate(${-liftAt(at)})` });
    });
  };
}

/** The hammer's lift at time t, eased between the SWING keys. */
function liftAt(t: number) {
  const next = SWING.findIndex(([at]) => at > t);
  if (next === -1) return SWING[SWING.length - 1][1];
  if (next === 0) return SWING[0][1];
  const [[from, a], [to, b, ease]] = [SWING[next - 1], SWING[next]];
  return a + (b - a) * ease((t - from) / (to - from));
}

/** `values` read 30 times a second, `s` seconds in: the first before, the last after, a straight line between. */
function read(values: number[], s: number) {
  const at = clamp((s * 30) / (values.length - 1)) * (values.length - 1);
  const i = Math.min(Math.floor(at), values.length - 2);
  return values[i] + (values[i + 1] - values[i]) * (at - i);
}

/** Fast, then slowing down evenly: what's left to go shrinks by the same share every moment. */
function easeOutExp(p: number) {
  return (1 - Math.exp(-4.3 * p)) / (1 - Math.exp(-4.3));
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

function clamp(v: number) {
  return Math.min(1, Math.max(0, v));
}
/** How far t is through a beat: 0 before it starts, 1 after it ends. */
function progress(t: number, [start, end]: [number, number]) {
  return clamp((t - start) / (end - start));
}
function easeInCubic(p: number) {
  return p ** 3;
}
function easeOutQuad(p: number) {
  return 1 - (1 - p) ** 2;
}
function easeInOutSine(p: number) {
  return (1 - Math.cos(Math.PI * p)) / 2;
}
