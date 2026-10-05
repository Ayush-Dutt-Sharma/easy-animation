// Beam rises from a ring of dots: a ring of light dots draws itself round a floor, and a soft beam of light rises out of it.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 2.4; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const FLOOR = { x: 500, y: 760 }; // centre of the ring
const RX = 320; // knob: ring width
const RY = 70; // knob: ring depth; the smaller RY / RX, the flatter the floor looks
const DOTS = 72; // knob
const BEAM = 560; // knob: how high the beam rises

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const beam = add(svg, 'path', { fill: `url(#${fadeUp(svg)})`, filter: glow(svg, 20) });
  const shine = glow(svg, 5);
  const rim = add(svg, 'ellipse', {
    ...{ cx: FLOOR.x, cy: FLOOR.y, rx: RX * 0.82, ry: RY * 0.82 },
    ...{ fill: 'none', stroke: '#fff', 'stroke-width': 3, pathLength: 1, 'stroke-dasharray': '1 1', filter: shine },
  });
  const ring = add(svg, 'g', { fill: '#fff', filter: shine });
  const dots = Array.from({ length: DOTS }, () => add(ring, 'circle'));

  return (t: number) => {
    const drawn = easeOutCubic(clamp(t / 1.2)); // the dots light up in order round the ring
    const spin = t * 0.25; // while the ring slowly turns
    dots.forEach((dot, i) => {
      const angle = (i / DOTS) * 2 * Math.PI + spin;
      const front = (Math.sin(angle) + 1) / 2; // 1 = nearest the viewer: bigger and brighter, which sells the depth
      const on = i / DOTS < drawn ? 1 : 0;
      set(dot, {
        cx: FLOOR.x + RX * Math.cos(angle),
        cy: FLOOR.y + RY * Math.sin(angle),
        r: 3 + 3 * front,
        opacity: on * (0.35 + 0.65 * front),
      });
    });
    set(rim, { 'stroke-dashoffset': 1 - drawn });

    const rise = easeInOutCubic(clamp((t - 0.6) / 1.4));
    const top = FLOOR.y - rise * BEAM;
    const [bottomHalf, topHalf] = [RX * 0.8, RX * 0.55];
    set(beam, {
      d: `M${FLOOR.x - bottomHalf} ${FLOOR.y}L${FLOOR.x - topHalf} ${top}H${FLOOR.x + topHalf}L${FLOOR.x + bottomHalf} ${FLOOR.y}Z`,
      opacity: rise,
    });
  };
}

/** A vertical gradient, white at the bottom fading to nothing at the top. Returns its id. */
function fadeUp(svg: SVGSVGElement) {
  const id = `fade-${Math.random().toString(36).slice(2)}`;
  const gradient = add(svg, 'linearGradient', { id, x1: 0, y1: 1, x2: 0, y2: 0 });
  add(gradient, 'stop', { offset: 0, 'stop-color': '#fff', 'stop-opacity': 0.45 });
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
