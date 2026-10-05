// The catalogue: which recipes exist, in gallery order, and the breakdowns that use them.
// A recipe's title and summary come from the first line of its file (`// Title: summary.`), so they never drift.
// Mistakes fail the build: a file missing from the list, a recipe that imports something, an unknown slug.

import { breakdown as whyBored } from './breakdowns/why-youre-always-bored.ts';

export type Tag = 'entrance' | 'exit' | 'transition' | 'emphasis' | 'loop' | 'text';

export interface Recipe {
  slug: string;
  title: string;
  summary: string;
  tags: Tag[];
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

const TAGS: Record<string, Tag[]> = {
  'orb-grow': ['entrance'],
  'light-portal': ['entrance'],
  'hammer-strike': ['emphasis'],
  'shards-assemble': ['entrance', 'emphasis'],
  'cube-assemble': ['entrance', 'emphasis'],
  'orbit-trail': ['emphasis', 'loop'],
  'card-cascade': ['entrance', 'exit'],
  eclipse: ['transition'],
  'walls-squeeze': ['emphasis'],
  'bead-shuttle': ['loop'],
  starburst: ['transition', 'emphasis'],
  'stair-climb': ['emphasis'],
  'tower-collapse': ['exit', 'transition'],
  'bloom-out': ['exit'],
  'caption-wipe': ['text'],
};

const sources = import.meta.glob<string>('./recipes/*.ts', { query: '?raw', import: 'default', eager: true });

const fail = (message: string): never => {
  throw new Error(`catalog: ${message}`);
};

export const recipes: Recipe[] = Object.entries(TAGS).map(([slug, tags]) => {
  const source = sources[`./recipes/${slug}.ts`] ?? fail(`no src/recipes/${slug}.ts`);
  const [, title, summary] = /^\/\/ (.+?): (.+)$/m.exec(source) ?? fail(`${slug}.ts must start with "// Title: summary."`);
  if (/^import\s/m.test(source)) fail(`${slug}.ts imports something; a recipe must stand alone`);
  return { slug, title, summary: summary[0].toUpperCase() + summary.slice(1), tags, source };
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
