// Cube assemble: glowing cubelets fly together into a scrambled 3×3 cube that untwists face-on, then turns to a corner while the orb circles it.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 3; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const N = 3; // knob: cubelets along each edge (2, 3, 4…); TURNS below name layers, so check them too
const CENTRE = { x: 500, y: 490 }; // knob: where the cube sits
const WIDTH = 318; // knob: the cube's width in pixels, face-on
const CAMERA = 3; // knob: camera distance in cube widths; smaller means stronger perspective
const CUBELET = 0.97; // knob: cubelet size; the rest of each cell is the gap between them
const SPREAD = 0.6; // knob: how far apart the cubelets start (0.6 = 60% further out than home)
const TOSS = 180; // knob: degrees each cubelet spins on its way in
const ORBIT = 390; // knob: radius of the orb's lap round the cube
const ORB = [90, 46]; // knob: the orb's radius in the middle, then out on its orbit
const SWING = 220; // knob: degrees of the lap done in one fast swing; it drifts the rest
const TRAIL = 0.3; // knob: the orb's trail shows where it was this many seconds ago
const COLOR = '#fff'; // knob: the colour of the light
const FACE = ['#000', '#888']; // knob: a face's colour in its middle and at its edges
const LINE = 3; // knob: edge width
const GLOW = 7; // knob: how far the cube's glow spreads

// Every beat as [start, end] in seconds. To retime, change these (and DURATION, TURNS) together.
const BEATS: Record<string, [number, number]> = {
  grow: [0.57, 0.8], // cubelets grow from specks…
  lock: [0.65, 0.95], // …and close up into a cube
  rays: [0.6, 0.75], // beams of light fade in
  flash: [0.6, 0.9], // a flash as the cubelets slam together
  settle: [0.6, 1.75], // the cube tumbles round to face-on
  corner: [1.85, 2.6], // then turns a corner towards us…
  wobble: [1.9, 2.5], // …tipping over and back on the way
  lift: [0.6, 0.8], // the orb rises from the middle to its orbit
  drift: [1.4, 3.0], // the orb's slow lap…
  swing: [1.93, 2.53], // …and its fast swing round the bottom
};

type Vec = [number, number, number];
type Axis = 0 | 1 | 2; // x, y, z

/**
 * Layer turns, applied in order: turn slice `layer` (0 = bottom / left / back, N - 1 = top / right / front) about
 * `axis` from one angle to another. A quarter turn (90°) leaves the cube looking solved again, so turns chain cleanly.
 */
const TURNS: { axis: Axis; layer: number; from: number; to: number; at: [number, number] }[] = [
  { axis: 1, layer: N - 1, from: 50, to: 0, at: [1.0, 1.75] }, // scrambled as it flies in, untwisting as it lands
  { axis: 1, layer: 1, from: -25, to: 0, at: [1.0, 1.65] },
  { axis: 1, layer: 0, from: -45, to: 0, at: [1.0, 1.8] },
  { axis: 1, layer: N - 1, from: 0, to: 90, at: [1.85, 2.2] }, // then two clean quarter turns, one after the other
  { axis: 0, layer: N - 1, from: 0, to: -90, at: [2.2, 2.6] },
];
// knob: the whole cube's [yaw, pitch, roll] in degrees. It tumbles in from TUMBLE, settles face-on (all zero),
// then turns to CORNER, tipping over by WOBBLE and back on the way.
const TUMBLE: Vec = [-150, 70, 40];
const CORNER: Vec = [-40, 40, 0];
const WOBBLE: Vec = [0, 20, -30];
const RAYS = [[10, 2], [48, 1.5], [95, 3], [140, 1.5], [175, 2.5], [215, 2], [260, 3], [300, 1.5], [335, 2]]; // knob: [direction, width] in degrees
const RAY_SPIN = 25; // knob: degrees a second the beams turn

// A cubelet's 8 corners (bit 4 = x, 2 = y, 1 = z) and its 6 faces, each wound the same way round, seen from outside.
const CORNERS = Array.from({ length: 8 }, (_, i): Vec => [(i >> 2) & 1, (i >> 1) & 1, i & 1].map((b) => (b - 0.5) * CUBELET) as Vec);
const FACES = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
const MID = (N - 1) / 2; // cubelet centres run from -MID to MID, so the cube's middle is at 0
const HOMES = Array.from({ length: N ** 3 }, (_, i): Vec => [i % N, Math.floor(i / N) % N, Math.floor(i / N ** 2)].map((k) => k - MID) as Vec);

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  // Beams of light, brightest at the middle and fading out.
  const fade = radial(svg, { gradientUnits: 'userSpaceOnUse', cx: 0, cy: 0, r: 800 }, [[0, COLOR, 1], [1, COLOR, 0]]);
  const rays = add(svg, 'g', { fill: fade, filter: blur(svg, 6) });
  for (const [angle, width] of RAYS) {
    const tip = (a: number) => `${1400 * Math.cos((a * Math.PI) / 180)} ${1400 * Math.sin((a * Math.PI) / 180)}`;
    add(rays, 'path', { d: `M0 0L${tip(angle - width)}L${tip(angle + width)}Z` });
  }
  // Each face is dark in the middle and lighter towards its edges, as if the glowing edges light it.
  const sheen = radial(svg, { r: 0.7 }, [[0.3, FACE[0], 1], [1, FACE[1], 1]]);
  const cube = add(svg, 'g', { filter: glow(svg, GLOW), fill: sheen, stroke: COLOR, 'stroke-width': LINE, 'stroke-linejoin': 'round' });
  const cubelets = HOMES.map(() => {
    const group = add(cube, 'g');
    return { group, faces: FACES.map(() => add(group, 'path')) };
  });
  const flare = add(svg, 'g', { fill: COLOR, filter: blur(svg, 6) });
  add(flare, 'ellipse', { rx: 70, ry: 5, transform: 'rotate(70)' }); // a bright streak, as if light leaks out of the middle
  add(flare, 'circle', { r: 20 });
  const trail = add(svg, 'path', { fill: 'none', stroke: COLOR, 'stroke-width': 2 });
  const orb = add(svg, 'circle', { fill: COLOR, filter: glow(svg) });

  return (t: number) => {
    // The cubelets appear as specks spread round the orb, grow to full size and close up into a cube.
    // (Before they grow, cubelets have no size, so no faces are drawn.)
    const grow = progress(t, BEATS.grow);
    const loose = 1 - easeInOutCubic(progress(t, BEATS.lock)); // 1 while apart, 0 once locked together
    const spread = SPREAD * loose;
    const turned = plus(
      plus(scale(TUMBLE, 1 - easeInOutCubic(progress(t, BEATS.settle))), scale(CORNER, easeInOutCubic(progress(t, BEATS.corner)))),
      scale(WOBBLE, Math.sin(Math.PI * progress(t, BEATS.wobble))),
    );
    const angles = TURNS.map(({ from, to, at }) => from + (to - from) * easeInOutCubic(progress(t, at)));
    const view = (p: Vec) => rotate(rotate(rotate(p, 1, turned[0]), 0, turned[1]), 2, turned[2]);

    const drawn = cubelets.map(({ group, faces }, i) => {
      // Spin the cubelet on its own while it flies, place it, turn its layers, push it out, then turn the whole cube.
      const spin = (p: Vec) => rotate(rotate(p, 0, (random(i) - 0.5) * TOSS * loose), 1, (random(i + 40) - 0.5) * TOSS * loose);
      let centre = HOMES[i];
      let points = CORNERS.map((c) => plus(centre, spin(scale(c, grow))));
      TURNS.forEach(({ axis, layer }, n) => {
        if (angles[n] === 0 || Math.round(centre[axis] + MID) !== layer) return;
        centre = rotate(centre, axis, angles[n]);
        points = points.map((p) => rotate(p, axis, angles[n]));
      });
      const flat = points.map((p) => project(view(plus(p, scale(centre, spread)))));
      faces.forEach((face, f) => {
        const quad = FACES[f].map((c) => flat[c]);
        set(face, { d: area(quad) < 0 ? `M${quad.join('L')}Z` : '' }); // draw only the faces turned towards us
      });
      return { group, depth: view(scale(centre, 1 + spread))[2] };
    });
    // Painter's order: far cubelets first, so near ones cover them.
    for (const { group } of drawn.sort((a, b) => a.depth - b.depth)) cube.appendChild(group);

    set(rays, { opacity: 0.6 * progress(t, BEATS.rays), transform: `translate(${CENTRE.x} ${CENTRE.y}) rotate(${t * RAY_SPIN})` });
    const burst = Math.sin(Math.PI * progress(t, BEATS.flash));
    set(flare, {
      opacity: 0.8 * progress(t, BEATS.rays) * (0.75 + 0.25 * Math.sin(t * 9)),
      transform: `translate(${CENTRE.x} ${CENTRE.y}) scale(${1 + 2 * burst})`,
    });

    // The orb waits big in the middle, shoots up to the top of its orbit as the cube appears, then runs one lap
    // clockwise: drifting, then a fast swing round the bottom, with a thin trail behind it.
    const lift = easeInOutCubic(progress(t, BEATS.lift));
    const radius = ORBIT * lift;
    const angle = (s: number) =>
      -Math.PI / 2 + (Math.PI / 180) * ((360 - SWING) * progress(s, BEATS.drift) + SWING * easeInOutCubic(progress(s, BEATS.swing)));
    const [a, tail] = [angle(t), angle(t - TRAIL)];
    const at = (angle: number) => `${CENTRE.x + radius * Math.cos(angle)} ${CENTRE.y + radius * Math.sin(angle)}`;
    set(orb, { cx: CENTRE.x + radius * Math.cos(a), cy: CENTRE.y + radius * Math.sin(a), r: ORB[0] + (ORB[1] - ORB[0]) * lift });
    set(trail, { d: `M${at(tail)}A${radius} ${radius} 0 ${a - tail > Math.PI ? 1 : 0} 1 ${at(a)}`, opacity: 0.35 * clamp((a - tail) * 3) });
  };
}

/** A 3D point to stage coordinates, with perspective (y points up in 3D, down on screen). */
function project([x, y, z]: Vec) {
  const s = ((WIDTH / N) * CAMERA * N) / (CAMERA * N - z); // in cubelets; nearer points (bigger z) spread out more
  return [CENTRE.x + x * s, CENTRE.y - y * s];
}

/** Twice the signed area of a flat polygon: negative when its corners run clockwise in 3D, i.e. it faces the camera. */
function area(points: number[][]) {
  return points.reduce((sum, [x1, y1], i) => {
    const [x2, y2] = points[(i + 1) % points.length];
    return sum + x1 * y2 - x2 * y1;
  }, 0);
}

function rotate([x, y, z]: Vec, axis: Axis, degrees: number): Vec {
  const [c, s] = [Math.cos((degrees * Math.PI) / 180), Math.sin((degrees * Math.PI) / 180)];
  if (axis === 0) return [x, y * c - z * s, y * s + z * c];
  if (axis === 1) return [x * c + z * s, y, -x * s + z * c];
  return [x * c - y * s, x * s + y * c, z];
}

const plus = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: Vec, k: number): Vec => [a[0] * k, a[1] * k, a[2] * k];

/** Repeatable "random" in [0, 1): the same n always gives the same number, so every play looks the same. */
function random(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** A radial gradient through `stops` ([offset, colour, opacity]). Returns the value for a `fill` attribute. */
function radial(svg: SVGSVGElement, attrs: Attrs, stops: [number, string, number][]) {
  const id = `radial-${Math.random().toString(36).slice(2)}`;
  const gradient = add(svg, 'radialGradient', { id, ...attrs });
  for (const [offset, colour, opacity] of stops) add(gradient, 'stop', { offset, 'stop-color': colour, 'stop-opacity': opacity });
  return `url(#${id})`;
}

/** A plain soft blur, for light that has no hard edge. */
function blur(svg: SVGSVGElement, amount: number) {
  const id = `blur-${Math.random().toString(36).slice(2)}`;
  const filter = add(svg, 'filter', { id, filterUnits: 'userSpaceOnUse', x: -SIZE, y: -SIZE, width: 3 * SIZE, height: 3 * SIZE });
  add(filter, 'feGaussianBlur', { stdDeviation: amount });
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
/** How far t is through a beat: 0 before it starts, 1 after it ends. */
const progress = (t: number, [start, end]: [number, number]) => clamp((t - start) / (end - start));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
