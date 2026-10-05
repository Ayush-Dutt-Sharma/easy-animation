// Tower collapse: a stack of slabs comes apart from the bottom up, each one tumbling away, while the orb floats down.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2.6; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const SLABS = 12; // knob
const BOTTOM = 820; // front top edge of the lowest slab
const PITCH = 36; // vertical distance between slabs
const [W, D, T] = [190, 80, 22]; // slab width, depth and thickness (a flat box seen from above, at an angle)
const START = 0.4; // knob: seconds of standing still before it goes
const STAGGER = 0.08; // knob: seconds between one slab letting go and the next
const GRAVITY = 2600; // knob: pixels per second², how hard they fall
const BALL = 26;

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const shine = glow(svg, 3);
  const left = SIZE / 2 - (W + D) / 2;
  // Bottom slab first, so each slab's front face covers the top face of the one below it.
  // Only the front is solid; the top and side are outlines, so the stack reads as separate slabs.
  const outline = { fill: '#000', stroke: '#fff', 'stroke-width': 2, 'stroke-linejoin': 'round' };
  const slabs = Array.from({ length: SLABS }, () => {
    const slab = add(svg, 'g', { filter: shine });
    add(slab, 'path', { ...outline, d: `M0 0H${W}L${W + D} ${-D / 2}H${D}Z` }); // top
    add(slab, 'path', { ...outline, d: `M${W} 0L${W + D} ${-D / 2}V${-D / 2 + T}L${W} ${T}Z` }); // side
    add(slab, 'path', { d: `M0 0H${W}V${T}H0Z`, fill: '#fff' }); // front
    return slab;
  });
  const top = BOTTOM - (SLABS - 1) * PITCH - D / 2;
  const ball = add(svg, 'circle', { cx: SIZE / 2, r: BALL, fill: '#fff', filter: glow(svg) });

  return (t: number) => {
    slabs.forEach((slab, i) => {
      const falling = Math.max(0, t - START - i * STAGGER); // seconds since this slab let go
      const drop = 0.5 * GRAVITY * falling ** 2;
      const turn = (random(i) - 0.5) * 50 * clamp(falling / 0.6); // each tumbles its own way
      const drift = (random(i + 30) - 0.5) * 80 * falling;
      set(slab, {
        transform: `translate(${left + drift} ${BOTTOM - i * PITCH + drop}) rotate(${turn} ${(W + D) / 2} 0)`,
        opacity: 1 - clamp(drop / 500),
      });
    });
    set(ball, { cy: top - 90 + 220 * easeInOutCubic(clamp((t - START - 0.5) / 1.6)) });
  };
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
