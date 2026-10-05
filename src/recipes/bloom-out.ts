// Bloom out: the orb flares into a huge soft burst of light with slow rays, then fades to black. A closing shot.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2.4; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CENTRE = SIZE / 2;
const ORB = 36; // knob: starting orb radius
const BLOOM = 480; // knob: how far the light spreads
const RAYS = 18;

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const bloom = add(svg, 'circle', { cx: CENTRE, cy: CENTRE, fill: `url(#${fadeOut(svg)})` });
  const rays = add(svg, 'g', { fill: '#fff', filter: glow(svg, 14) });
  for (let i = 0; i < RAYS; i++) {
    const a = (i / RAYS) * 2 * Math.PI;
    const tip = (turn: number) => `${CENTRE + BLOOM * Math.cos(a + turn)} ${CENTRE + BLOOM * Math.sin(a + turn)}`;
    add(rays, 'path', { d: `M${CENTRE} ${CENTRE}L${tip(-0.03)}L${tip(0.03)}Z` });
  }
  const orb = add(svg, 'circle', { cx: CENTRE, cy: CENTRE, fill: '#fff', filter: glow(svg) });

  return (t: number) => {
    const spread = easeOutCubic(clamp((t - 0.3) / 1.4));
    const fade = 1 - easeInOutCubic(clamp((t - 1) / 1.3)); // everything dims to black at the end
    set(bloom, { r: ORB + (BLOOM - ORB) * spread, opacity: fade });
    set(rays, {
      opacity: 0.22 * Math.sin(Math.PI * clamp((t - 0.3) / 1.8)),
      transform: `rotate(${t * 15} ${CENTRE} ${CENTRE}) translate(${CENTRE} ${CENTRE}) scale(${0.2 + 0.8 * spread}) translate(${-CENTRE} ${-CENTRE})`,
    });
    set(orb, { r: ORB * (1 + 0.3 * Math.sin(Math.PI * clamp(t / 0.6))), opacity: fade });
  };
}

/** A radial gradient, bright in the middle and gone at the edge. Returns its id. */
function fadeOut(svg: SVGSVGElement) {
  const id = `bloom-${Math.random().toString(36).slice(2)}`;
  const gradient = add(svg, 'radialGradient', { id });
  add(gradient, 'stop', { offset: 0, 'stop-color': '#fff', 'stop-opacity': 0.95 });
  add(gradient, 'stop', { offset: 0.35, 'stop-color': '#fff', 'stop-opacity': 0.35 });
  add(gradient, 'stop', { offset: 1, 'stop-color': '#fff', 'stop-opacity': 0 });
  return id;
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
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
