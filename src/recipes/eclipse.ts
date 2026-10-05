// Eclipse: a black disc slides across the glowing orb, covers it until only a ring of light is left, then slides off.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2.6; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE
const CENTRE = SIZE / 2;
const RADIUS = 110; // knob: orb size
const BACKGROUND = '#000'; // the disc is the background colour, so it reads as a hole, not a shape

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  add(svg, 'circle', { cx: CENTRE, cy: CENTRE, r: RADIUS, fill: '#fff', filter: glow(svg) });
  const shadow = add(svg, 'circle', { r: RADIUS, fill: BACKGROUND });
  const enter = { x: 2.4 * RADIUS, y: -1.6 * RADIUS }; // comes in from the top right…
  const leave = { x: -2.4 * RADIUS, y: 1.6 * RADIUS }; // …and leaves to the bottom left

  return (t: number) => {
    const arrive = easeOutCubic(clamp((t - 0.2) / 0.9)); // glides in and stops dead centre
    const depart = easeInCubic(clamp((t - 1.6) / 0.9)); // holds, then speeds away
    set(shadow, {
      cx: CENTRE + enter.x * (1 - arrive) + leave.x * depart,
      cy: CENTRE + enter.y * (1 - arrive) + leave.y * depart,
    });
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
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInCubic = (t: number) => t ** 3;
