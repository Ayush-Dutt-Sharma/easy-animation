// The catalogue: which recipes exist, oldest first (the gallery opens newest first), and the breakdowns that use them.
// A recipe's title and summary come from the first line of its file (`// Title: summary.`), and its swappable shapes
// from `const NAME = … // shape: what it is`, so they never drift.
// Mistakes fail the build: a file missing from the list, a recipe that imports something, an unknown slug.

import { breakdown as whyBored } from './breakdowns/why-youre-always-bored.ts';

export type Tag = 'entrance' | 'exit' | 'transition' | 'emphasis' | 'loop' | 'text';

export interface Recipe {
  slug: string;
  title: string;
  summary: string;
  tags: Tag[];
  /** Constants a visitor can set to their own SVG, and what each one draws. */
  shapes: { name: string; what: string }[];
  /** The file exactly as a visitor copies it. */
  source: string;
}

export interface Breakdown {
  slug: string;
  title: string;
  creator: string;
  /** Link to the original. We link out and never host or embed their footage. */
  url?: string;
  /** Format and look, in a sentence. */
  style: string;
  scenes: {
    /** Seconds into the original: [from, to]. */
    at: [number, number];
    /** What happens, in our own words. */
    what: string;
    recipes: string[];
    /** What on screen no recipe rebuilds yet. */
    missing?: string;
  }[];
}

/** Every recipe in the order it was made: add a new one at the end. */
const TAGS: Record<string, Tag[]> = {
  'orb-grow': ['entrance'],
  'light-portal': ['entrance'],
  'shards-assemble': ['entrance', 'emphasis'],
  'orbit-trail': ['emphasis', 'loop'],
  eclipse: ['transition'],
  'walls-squeeze': ['emphasis'],
  'bead-shuttle': ['loop'],
  starburst: ['transition', 'emphasis'],
  'stair-climb': ['emphasis'],
  'bloom-out': ['exit'],
  'caption-wipe': ['text'],
  'card-cascade': ['entrance', 'exit'],
  'tower-collapse': ['exit', 'transition'],
  'cube-assemble': ['entrance', 'emphasis'],
  'hammer-strike': ['emphasis'],
  'dot-chomp': ['entrance', 'transition'],
  'speaker-waves': ['entrance', 'emphasis'],
  'nail-drive': ['emphasis', 'transition'],
  'phone-notifications': ['entrance', 'exit'],
};

const sources = import.meta.glob<string>('./recipes/*.ts', { query: '?raw', import: 'default', eager: true });

const fail = (message: string): never => {
  throw new Error(`catalog: ${message}`);
};

export const recipes: Recipe[] = Object.entries(TAGS).map(([slug, tags]) => {
  const source = sources[`./recipes/${slug}.ts`] ?? fail(`no src/recipes/${slug}.ts`);
  const [, title, summary] = /^\/\/ (.+?): (.+)$/m.exec(source) ?? fail(`${slug}.ts must start with "// Title: summary."`);
  if (/^import\s/m.test(source)) fail(`${slug}.ts imports something; a recipe must stand alone`);
  const shapes = [...source.matchAll(/^const (\w+) = .*\/\/ shape: (.+)$/gm)].map(([, name, what]) => ({ name, what }));
  return { slug, title, summary: summary[0].toUpperCase() + summary.slice(1), tags, shapes, source };
});

for (const path of Object.keys(sources)) {
  if (!(path.slice('./recipes/'.length, -'.ts'.length) in TAGS)) fail(`${path} is not listed in TAGS`);
}

export const breakdowns: Breakdown[] = [whyBored];

for (const { slug, scenes } of breakdowns) {
  for (const used of scenes.flatMap((scene) => scene.recipes)) {
    if (!(used in TAGS)) fail(`breakdown ${slug} uses unknown recipe "${used}"`);
  }
}

export const recipe = (slug: string) => recipes.find((r) => r.slug === slug) ?? fail(`unknown recipe "${slug}"`);
