// Card cascade: the orb drops, then tilted cards with a little figure swing down into a row above it and fade one by one.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).

export const DURATION = 3.4; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const CARDS = 5; // knob
const GAP = 185; // knob: distance between card centres
const ROW = 430; // knob: height of the row
const [W, H] = [150, 215]; // card size
const STAGGER = 0.22; // knob: seconds between one card and the next
const SWING = 0.6; // seconds a card takes to swing into place
const ORB = { x: 500, y: 760, r: 32 };

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  const shine = glow(svg, 5);
  const cards = Array.from({ length: CARDS }, () => {
    const card = add(svg, 'g', { filter: shine });
    add(card, 'rect', { x: -W / 2, y: -H / 2, width: W, height: H, rx: 8, fill: '#555', stroke: '#fff', 'stroke-opacity': 0.4 });
    for (let d = 0; d < 18; d++) {
      const a = (d / 18) * 2 * Math.PI;
      add(card, 'circle', { cx: 52 * Math.cos(a), cy: 52 * Math.sin(a), r: 2.5, fill: '#fff' }); // a ring of dots
    }
    add(card, 'circle', { cy: -30, r: 11, fill: '#fff' }); // a little walking figure
    add(card, 'path', {
      d: 'M0 -14L-4 12L-14 38M-4 12L10 38M-1 -8L14 6',
      stroke: '#fff', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none',
    });
    return card;
  });
  const orb = add(svg, 'circle', { cx: ORB.x, r: ORB.r, fill: '#fff', filter: glow(svg) });

  return (t: number) => {
    set(orb, { cy: 200 + (ORB.y - 200) * easeInOutCubic(clamp(t / 0.6)) });
    cards.forEach((card, i) => {
      const start = 0.5 + i * STAGGER;
      const fall = easeOutBack(clamp((t - start) / SWING)); // from above the frame, overshooting a little
      const lean = i % 2 ? 1 : -1; // neighbours lean opposite ways, like cards seen at an angle
      const x = ORB.x + (i - (CARDS - 1) / 2) * GAP;
      const y = ROW + (i % 2 ? -25 : 25) - 700 * (1 - fall);
      const fade = clamp((t - (DURATION - 1.2) - i * 0.15) / 0.3); // first in, first out
      set(card, {
        transform: `translate(${x} ${y}) rotate(${lean * 30 * (1 - fall)}) skewY(${lean * 6})`,
        opacity: clamp((t - start) * 5) * (1 - fade),
      });
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
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
/** 0 → 1 with a small overshoot past 1, then settle. */
const easeOutBack = (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2;
