// Notifications flood a phone: a phone flickers on at 12:31, notifications slide up and scroll past as the orb bounces between them, it taps one open to read WAKE UP, then the phone goes dark.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).
// The clock and the words use the system font (SF Pro on a Mac); any heavy sans works.

export const DURATION = 9.2; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const PHONE_SHAPE = `<path d="${[ // shape: the phone where it stands, 294 126 to 707 904: outline, screen round the notch, speaker, camera
  'M319.1 125.5H680.9A25.6 25.6 0 0 1 706.5 151.1V878.1A25.6 25.6 0 0 1 680.9 903.7H319.1A25.6 25.6 0 0 1 293.5 878.1V151.1A25.6 25.6 0 0 1 319.1 125.5Z',
  'M339.1 148.1H409.6A4 4 0 0 1 413.6 152.1V153.3A33.3 33.3 0 0 0 446.9 186.6H553.1A33.3 33.3 0 0 0 586.4 153.3V152.1A4 4 0 0 1 590.4 148.1',
  'H660.9A23.4 23.4 0 0 1 684.3 171.5V858.1A23.4 23.4 0 0 1 660.9 881.5H339.1A23.4 23.4 0 0 1 315.7 858.1V171.5A23.4 23.4 0 0 1 339.1 148.1Z',
].join('')}"/><rect x="442.2" y="149.1" width="75.9" height="17.6" rx="8.8"/><circle cx="547.6" cy="158.3" r="8.4"/>`;
const ORB_SHAPE = '<circle r="50"/>'; // shape: the orb, 100 across round 0 0
const SCREEN = [315.7, 148.1, 368.6, 733.4, 23.4]; // knob: the screen in PHONE_SHAPE as x, y, width, height, corner radius
const BEZEL = '#242424'; // knob: between the outline and the screen (PHONE_SHAPE filled even-odd)
const LINE = 4; // knob: width of the phone's lines
const HUM = 0.44; // knob: how far the outline can dim for a frame, like a neon tube; it mostly dims a little
const CLOCK = '12:31'; // knob
const CLOCK_FONT = { 'font-family': 'system-ui, sans-serif', 'font-weight': 800, 'font-size': 95, 'letter-spacing': -7.1, fill: '#898989' }; // knob
const CLOCK_AT = { x: 491.7, y: -54.4 }; // knob: the clock's baseline, from the first notification's top
const CARD = { x: 335, width: 330, height: 86.8, radius: 17.5, gap: 13.2 }; // knob: a notification, and the space under it
const FACE = [116, 104]; // knob: grey (0 to 255) of a notification at its top, and from 70% of the way down
const COUNT = 13; // knob: notifications in the list
const STACKED = [2, 1, 0, 2, 0, 2]; // knob: notifications stacked behind each one, repeating down the list
const PEEK = 5; // knob: how far each stacked one shows below the one in front
const INSET = 8.3; // knob: how much narrower each stacked one is, on each side
const SHADE = [0.69, 0.47]; // knob: brightness of the stacked ones, nearest first
const TAPPED = 3; // knob: the notification (from 0) whose stack opens; it needs some stacked behind it
const WORDS = 'WAKE UP'; // knob: what the first one stacked behind it says
const WORDS_FONT = { 'font-family': 'system-ui, sans-serif', 'font-weight': 800, 'font-size': 39.5, 'letter-spacing': -5.5, 'word-spacing': 27.7 }; // knob
const WORDS_AT = { x: 489.7, y: 62.6 }; // knob: the words' baseline, from the top of their notification
const DOT = 18.7; // knob: radius of the orb
const COLOR = '#fff'; // knob

type Key = [number, number, ((p: number) => number)?]; // [second, value, ease into it (default: in-out)]
const RISE = bezier(0.08, 0.28, 0.13, 1); // knob: a slide that starts quick and settles slowly
const FLICK = bezier(0.16, 0.03, 0, 1); // knob: a flick that glides to a stop
const HOP = bezier(0.17, 0, 0.67, 1); // knob: the orb's bounce from one notification to the next
const RISEN = 354.6; // knob: the first notification's top once it has slid up, under the clock
// knob: the first notification's top at each moment: it slides up from below the screen, then the list is flicked up,
// further up, and back down.
const LIST: Key[] = [
  [0.3, 942.8], [0.418, 881.5, (p) => p ** 2], [2.194, RISEN, RISE], [2.94, RISEN],
  [3.835, 47.2, FLICK], [4.542, -395.1, FLICK], [6.062, 128.7, FLICK],
];
// knob: the orb's height at each moment. It shoots up past the phone and hangs there, bounces from notification to
// notification, taps one open, drifts while the words show, and taps it shut.
const ORB_Y: Key[] = [
  [0.4, 864.7], [2.467, 55.4, bezier(0.05, 0, 0, 1)], [2.6, 55.4],
  [2.933, 631.3, HOP], [3.553, 309.1, HOP], [3.837, 722, HOP], [4.537, 377.6, HOP], [5.573, 688.7, HOP], [6.03, 473.9, HOP],
  [6.1, 477.6], [6.167, 473.9], [6.767, 459], [7.8, 473.9], [7.9, 476.8], [8, 473.9],
];
// knob: the orb's sideways position at each moment: it sways as it flies, each stretch on its own curve.
const ORB_X: Key[] = [
  [0.4, 499.8], [2.6, 586.8, bezier(0.05, 0.21, 0, 0.73)], [2.933, 536.9, bezier(0.14, -0.49, 0.67, 1.01)],
  [3.6, 480, bezier(0.17, 0.02, 0.58, 0.61)], [3.833, 540.6, bezier(0.25, 0.07, 0.76, 0.88)],
  [4.4, 575.3, bezier(0.32, 0.73, 0.74, 1.02)], [5.6, 464.6, bezier(0.2, -0.06, 0.49, 0.68)],
  [6.033, 512.8, bezier(0.25, -0.13, 0.89, 1.05)], [6.167, 512.8], [6.767, 540.6], [7.8, 512.8],
];
// knob: every beat of the tapped stack as [start, end] in seconds.
const BEATS: Record<string, [number, number]> = {
  open: [6.042, 6.702], // it slides open…
  light: [6.133, 6.667], // …and the cards that were behind light up
  close: [7.8, 8.473], // it slides shut…
  dim: [7.933, 8.4], // …and they dim again
};
/** Brightness every 1/30 s as the phone comes on: a faint pulse, a beat of dark, then full. It goes off the same way, backwards. */
const FLICKER = [0, 0.09, 0.27, 0.38, 0.27, 0.09, 0, 0.26, 0.75, 1];
const ON = 0.3; // knob: second the phone starts to come on
const OFF = 9.1; // knob: second it's gone, and the orb with it
const READ = [6.6, 7.8]; // knob: seconds the words start to come on, and are gone
const SHUTTER = 1 / 40; // knob: seconds of movement each frame's smear shows

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const uid = Math.random().toString(36).slice(2);
  const all = add(svg, 'g'); // it all flickers off at the end
  const [x, y, width, height, rx] = SCREEN;
  add(add(svg, 'clipPath', { id: `screen-${uid}` }), 'rect', { x, y, width, height, rx });
  const screen = add(all, 'g', { 'clip-path': `url(#screen-${uid})`, filter: glow(svg, 37, 0.7) });
  const phone = add(all, 'g'); // the outline and the clock flicker on, but the notifications slide in at full brightness
  const face = add(svg, 'linearGradient', { id: `face-${uid}`, x2: 0, y2: 1 });
  add(face, 'stop', { 'stop-color': grey(FACE[0]) });
  add(face, 'stop', { offset: 0.7, 'stop-color': grey(FACE[1]) });

  // The list moves in layers, each smeared by its own speed. The tapped stack opens by sliding its j-th card j places
  // down, so layer j holds that card, and the last one also takes the rest of the list along. Layer 0 is on top.
  const behind = (i: number) => STACKED[i % STACKED.length];
  const layers = Array.from({ length: behind(TAPPED) + 1 }, () => add(screen, 'g')).reverse();
  const tops = [0]; // each notification's top, from the first one's
  for (let i = 1; i < COUNT; i++) tops.push(tops[i - 1] + CARD.height + CARD.gap + PEEK * behind(i - 1));
  tops.forEach((top, i) => {
    const layer = layers[i <= TAPPED ? 0 : layers.length - 1];
    if (i !== TAPPED) for (let j = behind(i); j > 0; j--) card(layer, top, j, grey(FACE[1] * SHADE[j - 1]));
    card(layer, top, 0, `url(#face-${uid})`);
  });
  const opening = layers.slice(1).map((layer, j) => card(layer, tops[TAPPED], j + 1, BEZEL)); // filled in render
  const words = add(layers[1], 'text', { ...WORDS_FONT, x: WORDS_AT.x, y: tops[TAPPED] + PEEK + WORDS_AT.y, fill: COLOR });
  set(words, { 'text-anchor': 'middle', filter: glow(svg, 11, 0.8) }).textContent = WORDS;
  // The clock doesn't glow. It rides on the list once it has risen, so the list pushes it off the top.
  const clock = add(add(phone, 'g', { 'clip-path': `url(#screen-${uid})` }), 'g');
  add(clock, 'text', { ...CLOCK_FONT, ...CLOCK_AT, 'text-anchor': 'middle' }).textContent = CLOCK;
  const smears = [clock, ...layers].map((layer) => smear(svg, layer));

  // The lines glow out of the phone and into the screen, but its body covers their glow and draws them again, sharp.
  const outline = add(phone, 'g');
  const lines = { fill: 'none', stroke: COLOR, 'stroke-width': LINE };
  shape(add(outline, 'g', { filter: glow(svg, 12, 0.9) }), PHONE_SHAPE, lines);
  shape(outline, PHONE_SHAPE, { ...lines, fill: BEZEL, 'fill-rule': 'evenodd' });
  const orb = shape(all, ORB_SHAPE, { fill: COLOR });

  /** How far down the clock and each layer are at second s, and how open the tapped stack is. */
  const place = (s: number) => {
    const list = follow(LIST, s);
    const open = FLICK(progress(s, BEATS.open)) - RISE(progress(s, BEATS.close));
    return { open, at: [Math.min(list, RISEN), ...layers.map((_, j) => list + j * (CARD.height + CARD.gap - PEEK) * open)] };
  };

  return (t: number) => {
    set(all, { opacity: read(FLICKER, OFF - t) });
    set(phone, { opacity: read(FLICKER, t - ON) });
    set(outline, { opacity: 1 - HUM * random(Math.floor(t * 30)) ** 6 });
    const [now, before, after] = [t, t - SHUTTER / 2, t + SHUTTER / 2].map(place);
    smears.forEach((move, i) => move(now.at[i], after.at[i] - before.at[i]));
    // The opening cards widen as soon as they slide out, but light up more slowly.
    const lit = easeInOutSine(progress(t, BEATS.light)) - easeInOutSine(progress(t, BEATS.dim));
    opening.forEach((rect, j) => {
      const inset = INSET * (j + 1) * (1 - clamp(5 * now.open));
      set(rect, { x: CARD.x + inset, width: CARD.width - 2 * inset, fill: grey(FACE[1] * (SHADE[j] + (1 - SHADE[j]) * lit)) });
    });
    set(words, { opacity: Math.min(read(FLICKER, t - READ[0]), read(FLICKER, READ[1] - t)) });
    set(orb, { transform: `translate(${follow(ORB_X, t)} ${follow(ORB_Y, t)}) scale(${DOT / 50})` });
  };
}

/** A notification `level` places back in the stack whose front one's top is at `top`: lower and narrower. */
function card(parent: Element, top: number, level: number, fill: string) {
  const inset = INSET * level;
  return add(parent, 'rect', { x: CARD.x + inset, y: top + PEEK * level, width: CARD.width - 2 * inset, height: CARD.height, rx: CARD.radius, fill });
}

/** Moves `layer` down to y and smears it along the distance it covers while the shutter is open, as a vertical blur. */
function smear(svg: SVGSVGElement, layer: SVGGElement) {
  const id = `smear-${Math.random().toString(36).slice(2)}`;
  const filter = add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE });
  const blur = add(filter, 'feGaussianBlur', { in: 'SourceGraphic' });
  return (y: number, covered: number) => {
    const spread = Math.abs(covered) / Math.sqrt(12); // a blur as wide as an even smear that long
    set(layer, { transform: `translate(0 ${y})`, filter: spread > 0.1 ? `url(#${id})` : 'none' });
    set(blur, { stdDeviation: `0 ${spread}` });
  };
}

/** The value of `keys` at second t, eased between them. */
function follow(keys: Key[], t: number) {
  const next = keys.findIndex(([at]) => at > t);
  if (next <= 0) return keys[next === 0 ? 0 : keys.length - 1][1];
  const [[from, a], [to, b, ease = easeInOutSine]] = [keys[next - 1], keys[next]];
  return a + (b - a) * ease((t - from) / (to - from));
}

/** `values` read 30 times a second, `s` seconds in: the first before, the last after, a straight line between. */
function read(values: number[], s: number) {
  const at = clamp((s * 30) / (values.length - 1)) * (values.length - 1);
  const i = Math.min(Math.floor(at), values.length - 2);
  return values[i] + (values[i + 1] - values[i]) * (at - i);
}

/** Repeatable "random" in [0, 1): the same n always gives the same number, so every play looks the same. */
function random(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function grey(level: number) {
  const v = Math.round(level);
  return `rgb(${v},${v},${v})`;
}

/** The ease CSS calls cubic-bezier(x1, y1, x2, y2). */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const curve = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  return (p: number) => {
    let [lo, hi] = [0, 1]; // find where along the curve x reaches p, then read y there
    for (let i = 0; i < 30; i++) [lo, hi] = curve(x1, x2, (lo + hi) / 2) < p ? [(lo + hi) / 2, hi] : [lo, (lo + hi) / 2];
    return curve(y1, y2, (lo + hi) / 2);
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
function easeInOutSine(p: number) {
  return (1 - Math.cos(Math.PI * p)) / 2;
}
