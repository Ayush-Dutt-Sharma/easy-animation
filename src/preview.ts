// Runs a recipe in the browser: mount it on the preview's <svg>, then loop render(t).
// Every frame is the recipe's own render(t), so scrubbing and looping need nothing from the recipe but that.

interface RecipeModule {
  DURATION: number;
  mount(svg: SVGSVGElement): (t: number) => void;
}

const recipes = import.meta.glob<RecipeModule>('./recipes/*.ts');
const HOLD = 0.8; // seconds the last frame stays on screen before the loop starts again

export async function preview(root: HTMLElement) {
  const load = recipes[`./recipes/${root.dataset.slug}.ts`];
  if (!load) throw new Error(`preview: no recipe "${root.dataset.slug}"`);
  const { DURATION, mount } = await load();
  const render = mount(root.querySelector('svg') as SVGSVGElement); // Preview.astro always renders one
  const button = root.querySelector<HTMLButtonElement>('.play');
  const seek = root.querySelector<HTMLInputElement>('.seek');
  const time = root.querySelector<HTMLElement>('.time');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let t = still ? DURATION : 0;
  let playing = !still;
  let visible = false;
  let frame = 0;
  let last = 0;

  const show = () => {
    render(Math.min(t, DURATION));
    if (seek) seek.value = String(Math.min(t, DURATION));
    if (time) time.textContent = `${Math.min(t, DURATION).toFixed(2)}s / ${DURATION.toFixed(1)}s`;
    if (button) button.textContent = playing ? '❚❚' : '▶';
  };
  const tick = (now: number) => {
    if (!(playing && visible)) {
      frame = 0;
      return;
    }
    t = (t + (now - last) / 1000) % (DURATION + HOLD);
    last = now;
    show();
    frame = requestAnimationFrame(tick);
  };
  const run = () => {
    if (frame || !(playing && visible)) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  if (seek) {
    seek.max = String(DURATION);
    seek.addEventListener('input', () => {
      playing = false;
      t = Number(seek.value);
      show();
    });
  }
  button?.addEventListener('click', () => {
    playing = !playing;
    if (playing && t >= DURATION) t = 0;
    show();
    run();
  });
  // Only previews on screen animate, so a gallery of glowing filters stays smooth.
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    run();
  }).observe(root);
  show();
}
