// Speakers send waves at a growing dot: three speakers flicker on around a dot, circle it and send sound waves at it; the dot swells into an orb, then the speakers fade away.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 7.1; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const DOT = 18.7; // knob: radius of the dot in the middle
const GROW = [4.53, 6.91]; // knob: seconds the dot starts and stops growing, at a steady speed
const BIG = 105.8; // knob: radius it grows to
const CLEAR = 1.185; // knob: no wave gets nearer the dot than this many of its radii, leaving a dark ring round it
const SPEAKERS = [[206, 297], [329, 318], [84, 318]]; // knob: [start, distance] for each: degrees clockwise from the right of the dot, then pixels from the dot to its mouth
const TURN = 16.3; // knob: degrees a second the speakers circle the dot, clockwise
const SPEAKER_SHAPE = '<path d="M0 -50H7.5L38.3 -19.3H60V19.3H38.3L7.5 50H0Z"/>'; // shape: each speaker, facing left at the dot, in the box 0 -50 to 100 50 (its waves start from 0 0)
const LINE = 3; // knob: width of the speakers' lines
const FIRST = 1.55; // knob: second the first sound wave leaves the speakers
const EVERY = 1 / 3; // knob: seconds between waves
const SPEED = 55.7; // knob: pixels a second the waves travel
const SPREAD = 46; // knob: degrees each wave reaches either side of the middle
const TRIM = 5.4; // pixels cut off each end of a wave, so a new wave starts as a short dash and lengthens
const WAVE_LINE = 5; // knob: width of a wave
const WAVE_LIGHT = 0.375; // knob: how bright the waves are, 0 to 1 (they don't glow)
/** Brightness every 1/30 s as the speakers come on: a faint pulse, a beat of dark, then full. */
const FLICKER = [0, 0.39, 0.53, 0.4, 0.14, 0, 0.37, 1];
const LIT = (FLICKER.length - 1) / 30; // seconds from dark to fully on
const FADE = [6.99, 7.06]; // knob: seconds the speakers and their waves start and finish fading out
const GLOW = 12; // knob: how far the glow spreads
const HALO = 0.9; // knob: how bright the glow is, 0 to 1
const COLOR = '#fff'; // knob
const DOT_SHAPE = '<circle r="50"/>'; // shape: the dot that grows, 100 across round 0 0

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const shine = glow(svg, GLOW, HALO);
  // Every wave goes on one dimmed layer, so where two cross they don't add up to a brighter spot.
  const sound = add(svg, 'g', { fill: 'none', stroke: COLOR, 'stroke-width': WAVE_LINE });
  const count = Math.ceil((DURATION - FIRST) / EVERY); // waves each speaker sends
  const speakers = SPEAKERS.map(([angle, distance]) => {
    const look = { fill: 'none', stroke: COLOR, color: COLOR, 'stroke-width': LINE, 'stroke-linejoin': 'round', filter: shine };
    const body = shape(svg, SPEAKER_SHAPE, look, [0, -50, 100, 100]);
    const spread = add(sound, 'g');
    const waves = Array.from({ length: count }, () => add(spread, 'path'));
    return { angle, distance, body, spread, waves };
  });
  // Drawn over the waves: a black disc (the stage colour) keeps them off the dot, then the dot glows on top.
  const ring = add(svg, 'circle', { cx: SIZE / 2, cy: SIZE / 2, fill: '#000' });
  // The glow sits outside the dot's scale, so it spreads the same however big the dot gets.
  const dot = shape(add(svg, 'g', { fill: COLOR, color: COLOR, filter: shine }), DOT_SHAPE);

  return (t: number) => {
    const size = DOT + (BIG - DOT) * clamp((t - GROW[0]) / (GROW[1] - GROW[0]));
    set(dot, { transform: `translate(${SIZE / 2} ${SIZE / 2}) scale(${size / 50})` });
    set(ring, { r: CLEAR * size });
    const left = clamp((FADE[1] - t) / (FADE[1] - FADE[0])); // 1 until the fade starts, 0 once it ends
    set(sound, { opacity: WAVE_LIGHT * left });
    for (const { angle, distance, body, spread, waves } of speakers) {
      // From the dot, turn to the speaker and step out to it, so its mouth faces back at the dot.
      const place = `translate(${SIZE / 2} ${SIZE / 2}) rotate(${angle + TURN * t}) translate(${distance} 0)`;
      set(body, { transform: place, opacity: flicker(t) * left });
      set(spread, { transform: place });
      waves.forEach((wave, i) => {
        const r = SPEED * (t - FIRST - i * EVERY); // how far this wave has travelled
        const half = (SPREAD * Math.PI) / 180 - TRIM / r;
        set(wave, { d: r > 0 && half > 0 ? arc(r, half) : '' }); // an empty path draws nothing
      });
    }
  };
}

/** Brightness `s` seconds after the speakers start coming on: FLICKER read 30 times a second, 0 before and 1 after. */
function flicker(s: number) {
  const at = clamp(s / LIT) * (FLICKER.length - 1);
  const i = Math.min(Math.floor(at), FLICKER.length - 2);
  return FLICKER[i] + (FLICKER[i + 1] - FLICKER[i]) * (at - i);
}

/** A wave: part of a circle of radius `r` round the mouth, reaching `half` radians above and below its middle. */
function arc(r: number, half: number) {
  const [x, y] = [-r * Math.cos(half), r * Math.sin(half)];
  return `M${x} ${-y}A${r} ${r} 0 0 0 ${x} ${y}`;
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
