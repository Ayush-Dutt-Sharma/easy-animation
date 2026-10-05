// Hammer slams an anvil: a glowing anvil and hammer flicker into view, the hammer winds up and slams down in a burst of light and dust, then both crumble away.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 1.1; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background

const ANVIL = { x: 458, y: 417 }; // knob: middle of the anvil's top face
const DRAWING = 0.93; // knob: size of both drawings (1 = as drawn below)
const HIT = 84; // knob: where the hammer lands on the anvil's flat top, from its middle (-50 to 210, as drawn)
const FLIP = false; // knob: true puts the horn on the right and the hammer on the left

const COLOR = '#fff'; // knob: the colour of the light
const LINE = 4.5; // knob: line width
const FILL = 0.12; // knob: how much light fills the drawings (0 = outlines only)
const GLOW = [18, 5]; // knob: how far the glow spreads, wide and near

const TEAR = 40; // knob: how far the stripes shift sideways as the drawings flicker in
const GRAIN = 220; // knob: how far the grain scatters as they crumble away
const DRIFT = 120; // knob: how far they drift apart as they go

const FLASH = 70; // knob: length of the star's rays at a hit
const PUFF = [25, 75]; // knob: radius of the ball of glow when it appears and when it's gone
const DUST = 80; // knob: specks of dust thrown up at each hit
const DUST_SPEED = [80, 360]; // knob: slowest and fastest speck, pixels a second
const GRAVITY = 1400; // knob: pixels a second², how fast the dust falls back

// Every beat as [start, end] in seconds. To retime, change these, SWING and DURATION together.
const BEATS: Record<string, [number, number]> = {
  glitch: [0, 0.22], // the drawings flicker in: torn, then sharp…
  gone: [0.05, 0.15], // …with a moment in the middle where they vanish
  crumble: [0.94, 1.08], // both break up into grain at once, then drift apart as they fade
};
// knob: what happens at each hit, as [start, end] in seconds after the hammer lands.
const STRIKE: Record<string, [number, number]> = {
  flash: [0, 0.15], // a star of light that grows, then goes…
  puff: [0.03, 0.26], // …into a soft ball of glow…
  dust: [0, 0.41], // …and dust that bursts out and falls
};
// knob: the hammer's angle at each moment, as [seconds, degrees, ease into it]. 0° lies flat on the anvil,
// 90° stands upright, more tips the head back over the handle. Each time it comes down to 0° is a hit,
// so another dip to 0° is another strike, with its own flash and dust.
const SWING: [number, number, (p: number) => number][] = [
  [0, 50, easeInOutCubic], // resting
  [0.3, 55, easeInOutCubic],
  [0.45, 112, easeInOutCubic], // wound up
  [0.5, 104, easeInOutCubic],
  [0.567, 22, (p) => p], // falling at full speed…
  [0.59, 0, (p) => p], // …into the hit
  [0.67, 0, (p) => p], // it stays down a moment
  [0.9, 60, easeOutQuad], // bouncing back…
  [0.95, 85, easeInOutCubic], // …to upright
];
const HITS = SWING.filter(([, angle], i) => angle === 0 && i > 0 && SWING[i - 1][1] > 0).map(([at]) => at);

const ANVIL_SHAPE = `<path d="${[ // shape: the anvil, horn to the left, in the box -215 0 to 217 190, with the middle of its top face on 0 0
  'M-215 22L-210 18L-55 16L-50 2L213 0L217 35Q150 40 105 70Q90 85 90 110Q95 140 135 160L143 190H95',
  'C85 125 -5 125 -15 190H-65V165Q-30 150 -20 98C-40 75 -120 65 -215 22Z',
  'M-48 12H210M-62 162H138', // the face's edge and the ledge above the feet
  ...Array.from({ length: 9 }, (_, i) => `M${-190 + i * 15} 19v9`), // tick marks along the horn
].join('')}"/>`;
const HANDLE = 255; // from the end of the handle to the middle of the head
const FACE = 50; // how far the striking face sits below the handle's line
const H = -HANDLE;
const HAMMER_SHAPE = `<path d="${[ // shape: the hammer, lying flat with its head to the left, in the box -280 -45 to 2 50: it turns about 0 0, the end of its handle, and strikes with the bottom of its head
  `M${H + 22} -8L-12 -6Q2 -6 2 0Q2 6 -12 6L${H + 22} 8`, // the handle, rounded at the end
  `M${H - 22} -8H${H + 22}V8H${H - 22}Z`, // the collar the handle goes through
  `M${H - 22} 8L${H - 25} ${FACE}H${H + 25}L${H + 22} 8`, // the striking block, flaring out
  `M${H - 20} -8L${H - 8} -45H${H + 8}L${H + 20} -8`, // the tapered back of the head
].join('')}"/>`;
// The hammer turns about the end of its handle, placed so that at 0° its face lands flat on HIT.
const LANDING = { x: ANVIL.x + HIT * DRAWING, y: ANVIL.y };
const PIVOT = { x: LANDING.x + HANDLE * DRAWING, y: ANVIL.y - FACE * DRAWING };

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const stage = add(svg, 'g', FLIP ? { transform: `translate(${2 * ANVIL.x} 0) scale(-1 1)` } : {}); // mirrored about the anvil
  const look = drawingFilter(svg);
  const drawings = add(stage, 'g', { filter: look.url, fill: COLOR, 'fill-opacity': FILL, stroke: COLOR, 'stroke-width': LINE });
  set(drawings, { color: COLOR, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  const anvil = shape(drawings, ANVIL_SHAPE, {}, [-215, 0, 432, 190]);
  const hammer = shape(drawings, HAMMER_SHAPE, {}, [-280, -45, 282, 95]);

  const puff = add(stage, 'circle', { cx: LANDING.x, cy: LANDING.y, fill: COLOR, filter: blur(svg, 12) });
  const dust = add(stage, 'g', { fill: COLOR, filter: blur(svg, 1) });
  const specks = Array.from({ length: DUST }, () => add(dust, 'circle'));
  const flash = add(stage, 'g', { fill: COLOR, filter: blur(svg, 3) });
  for (const angle of [0, 60, 120]) add(flash, 'ellipse', { rx: FLASH, ry: 2.5, transform: `rotate(${angle})` }); // a six-point star
  add(flash, 'circle', { r: FLASH / 4 });

  return (t: number) => {
    // Flickering in: torn into sideways-shifted stripes, with a moment where they vanish, then sharp.
    // Crumbling out: the same noise, fine-grained, scatters the lines into grain.
    const glitching = t < BEATS.glitch[1];
    const gone = t >= BEATS.gone[0] && t < BEATS.gone[1];
    const crumble = progress(t, BEATS.crumble);
    const broken = Math.sqrt(crumble); // the grain comes all at once; the fade and drift take their time
    set(look.smear, { stdDeviation: glitching ? `${TEAR / 7} 0` : (GRAIN / 16) * broken });
    set(look.noise, { baseFrequency: glitching ? '0.001 0.06' : 0.9, seed: Math.floor(t * 30) });
    set(look.grain, { scale: glitching ? TEAR : GRAIN * broken });
    set(drawings, { opacity: (gone ? 0.1 : 1) * (1 - crumble) });
    const drift = DRIFT * easeOutQuad(crumble); // the anvil drifts up and away from the hammer, the hammer up and out
    set(anvil, { transform: `translate(${ANVIL.x - drift} ${ANVIL.y - drift}) scale(${DRAWING})` });
    set(hammer, { transform: `translate(${PIVOT.x + drift} ${PIVOT.y - drift}) rotate(${angleAt(t)}) scale(${DRAWING})` });

    // The flash, glow and dust follow the latest hit; before the first one, `since` is negative and they hide.
    const strike = HITS.findLastIndex((at) => at <= t);
    const since = strike === -1 ? -1 : t - HITS[strike];
    const after = (beat: [number, number]) => (since < 0 ? 0 : progress(since, beat));
    const burst = after(STRIKE.flash);
    set(flash, { opacity: Math.sin(Math.PI * burst), transform: `translate(${LANDING.x} ${LANDING.y}) scale(${0.6 + 1.4 * burst})` });
    const swell = after(STRIKE.puff);
    set(puff, { r: PUFF[0] + (PUFF[1] - PUFF[0]) * Math.sqrt(swell), opacity: (1 - swell) * clamp(swell * 4) });

    // Dust flies out from the hit, mostly up and sideways, then gravity pulls it down in front of the anvil.
    const flying = Math.max(0, since - STRIKE.dust[0]);
    const fade = after(STRIKE.dust);
    specks.forEach((speck, i) => {
      const n = i + 1000 * strike; // each hit throws its own dust
      const a = Math.PI * (1.1 + 0.8 * random(n)); // upwards, in a wide fan
      const speed = DUST_SPEED[0] + (DUST_SPEED[1] - DUST_SPEED[0]) * random(n + 100);
      set(speck, {
        cx: LANDING.x + Math.cos(a) * speed * flying,
        cy: LANDING.y + Math.sin(a) * speed * flying + GRAVITY * flying ** 2,
        r: 1 + 1.5 * random(n + 200),
        opacity: flying > 0 ? (1 - fade) * (0.4 + 0.6 * random(n + 300)) : 0,
      });
    });
  };
}

/** The hammer's angle at time t, eased between the SWING keys. */
function angleAt(t: number) {
  const next = SWING.findIndex(([at]) => at > t);
  if (next === -1) return SWING[SWING.length - 1][1];
  if (next === 0) return SWING[0][1];
  const [[from, a], [to, b, ease]] = [SWING[next - 1], SWING[next]];
  return a + (b - a) * ease((t - from) / (to - from));
}

/**
 * The drawings' look in one filter: a sideways smear (for the glitch), grain that breaks the lines apart (for the
 * crumble), then the glow. Returns the filter and the parts render changes each frame.
 */
function drawingFilter(svg: SVGSVGElement) {
  const id = `drawing-${Math.random().toString(36).slice(2)}`;
  const filter = add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE });
  const smear = add(filter, 'feGaussianBlur', { in: 'SourceGraphic', stdDeviation: 0, result: 'smear' });
  const noise = add(filter, 'feTurbulence', { type: 'fractalNoise', baseFrequency: 0.9, result: 'noise' });
  const grain = add(filter, 'feDisplacementMap', { in: 'smear', in2: 'noise', scale: 0, xChannelSelector: 'R', yChannelSelector: 'G', result: 'shape' });
  add(filter, 'feGaussianBlur', { in: 'shape', stdDeviation: GLOW[0], result: 'wide' });
  add(filter, 'feGaussianBlur', { in: 'shape', stdDeviation: GLOW[1], result: 'near' });
  const merge = add(filter, 'feMerge');
  for (const layer of ['wide', 'near', 'shape']) add(merge, 'feMergeNode', { in: layer });
  return { url: `url(#${id})`, smear, noise, grain };
}

/** A plain soft blur, for light that has no hard edge. */
function blur(svg: SVGSVGElement, amount: number) {
  const id = `blur-${Math.random().toString(36).slice(2)}`;
  const filter = add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE });
  add(filter, 'feGaussianBlur', { stdDeviation: amount });
  return `url(#${id})`;
}

/** Repeatable "random" in [0, 1): the same n always gives the same number, so every play looks the same. */
function random(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
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

function clamp(v: number) {
  return Math.min(1, Math.max(0, v));
}
/** How far t is through a beat: 0 before it starts, 1 after it ends. */
function progress(t: number, [start, end]: [number, number]) {
  return clamp((t - start) / (end - start));
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}
function easeOutQuad(t: number) {
  return 1 - (1 - t) ** 2;
}
