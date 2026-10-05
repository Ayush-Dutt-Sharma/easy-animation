import type { Breakdown } from '../catalog.ts';

// Watched frame by frame (scripts/breakdown.sh). The descriptions are ours; the footage stays with its creator.
export const breakdown: Breakdown = {
  slug: 'why-youre-always-bored',
  title: 'Why you’re always bored',
  creator: 'Dan Koe',
  url: 'https://www.youtube.com/shorts/xybpfL1GnEQ',
  style:
    'A 21-second 9:16 short. One white orb is the main character on a black stage, everything glows, and one small line of captions sits low in the frame, wiping on as each phrase is spoken (caption wipe).',
  scenes: [
    {
      at: [0, 1.5],
      what: 'A faint grey dot in the dark brightens and swells into a white orb. The main character has arrived.',
      recipes: ['orb-grow', 'caption-wipe'],
    },
    {
      at: [1.5, 2.85],
      what: 'A ring of light dots draws itself round the floor and a beam rises out of it. A glowing anvil and hammer flicker into view; the hammer winds up and slams down in a burst of light and dust, then both crumble away.',
      recipes: ['light-portal', 'hammer-strike'],
    },
    {
      at: [2.85, 5.5],
      what: 'Glowing cubelets fly in round the orb and lock into a scrambled cube under sweeping beams of light. It untwists face-on, then turns to show a corner while the orb circles it.',
      recipes: ['cube-assemble'],
    },
    {
      at: [5.5, 8.5],
      what: 'The orb drops. Tilted cards, each showing a small figure, swing in around it, then fade one by one.',
      recipes: ['card-cascade'],
    },
    {
      at: [8.5, 9.8],
      what: 'A black disc slides over the orb until only a ring of light is left, then slides away.',
      recipes: ['eclipse'],
    },
    {
      at: [9.8, 11],
      what: 'Two soft walls of light close in from the sides and squash the orb between them.',
      recipes: ['walls-squeeze'],
    },
    {
      at: [11, 14.3],
      what: 'The orb becomes two ends on a line, and a bead runs back and forth between them: the same task, over and over.',
      recipes: ['bead-shuttle'],
    },
    {
      at: [14.3, 15.8],
      what: 'The line shakes loose and bursts into a ring of orbs on spokes.',
      recipes: ['starburst'],
    },
    {
      at: [15.8, 19],
      what: 'Slabs drop in as a staircase and the orb climbs it, step by step, up a growing tower.',
      recipes: ['stair-climb'],
    },
    {
      at: [19, 20],
      what: 'The tower comes apart slab by slab while the orb waits above it.',
      recipes: ['tower-collapse'],
    },
    {
      at: [20, 21.4],
      what: 'The orb blooms into soft light that fills the frame, then fades to black.',
      recipes: ['bloom-out'],
    },
  ],
};
