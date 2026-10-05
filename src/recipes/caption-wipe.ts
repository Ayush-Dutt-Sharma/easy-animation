// Caption wipe: one short line of text wipes on from left to right with a soft edge, holds, then fades.
// Copy this file, it has no dependencies: `const render = mount(svg)`, then `render(seconds)` every frame.
// render only sets attributes from t, so the same t always draws the same picture (scrub, loop, export).
// Load the font yourself (Poppins here); the wipe needs no measuring, so it works with any font.

export const DURATION = 2.4; // seconds
const SIZE = 1000; // the stage is SIZE × SIZE on a black background
const TEXT = 'only the key words'; // knob: keep it to a few words on one line
const FONT = '400 52px Poppins, system-ui, sans-serif'; // knob
const WIPE = 0.8; // knob: seconds to write the line on
const SOFT = 0.12; // how wide the soft edge of the wipe is, as a share of the line

export function mount(svg: SVGSVGElement) {
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  // The text is filled with a gradient that runs across its own width (the default for SVG gradients), so moving
  // two stops from left to right reveals it, however long the line is.
  const id = `wipe-${Math.random().toString(36).slice(2)}`;
  const gradient = add(svg, 'linearGradient', { id });
  const edge = [
    add(gradient, 'stop', { 'stop-color': '#fff' }),
    add(gradient, 'stop', { 'stop-color': '#fff', 'stop-opacity': 0 }),
  ];
  const text = add(svg, 'text', { x: SIZE / 2, y: SIZE / 2, fill: `url(#${id})`, 'text-anchor': 'middle' });
  text.style.font = FONT;
  text.textContent = TEXT;

  return (t: number) => {
    const wiped = (1 + SOFT) * easeOutCubic(clamp(t / WIPE));
    set(edge[0], { offset: Math.max(0, wiped - SOFT) });
    set(edge[1], { offset: wiped });
    set(text, { opacity: 1 - clamp((t - (DURATION - 0.4)) / 0.4) });
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

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
