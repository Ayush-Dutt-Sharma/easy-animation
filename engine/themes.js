// Theme palettes and line settings. Scenes use token names only, so a theme swap needs no scene changes.
// Values come from library/design/themes/*.md; fix them there first, then here.
window.THEMES = (() => {
  const pencil = {
    '--ink': '#291f1b', '--paper': '#ecece3', '--beige': '#dcd2ba', '--sand': '#dac0a1',
    '--bluegrey': '#c6d8da', '--slate': '#abbab8', '--terracotta': '#bf6c5f', '--terracotta-light': '#ca8876',
    '--sage': '#a0a68b', '--olive': '#8e8f6a', '--brown': '#956c58', '--night': '#393342', '--dusk': '#584c4d',
    '--ping': '#4a7fc1', '--ping-glow': '#9cc3ea', '--alert': '#c9483b', '--go': '#6f9e57', '--gold': '#e0b44c',
    '--note': '#f3dc8a', '--skin': '#f0c9a8', '--cheek': '#e59a8a', '--hair': '#5b3b2b', '--navy': '#2f3552',
    '--cab': '#e8b93c', '--screen': '#1f2430', '--screen-ui': '#f6f4ee', '--white': '#ffffff', '--subtitle': '#ffffff',
  };
  // P(doom) colours mapped onto our tokens (watercolor-ink.md); unlisted tokens keep the pencil values.
  const watercolor = {
    ...pencil,
    '--paper': '#f3ebdc', '--ink': '#2b2233', '--terracotta': '#d97757', '--terracotta-light': '#f2a283',
    '--brown': '#a84d33', '--night': '#1f2550', '--navy': '#2f3c7a', '--cheek': '#e27a92', '--gold': '#e8aa38',
    '--go': '#6e9f58', '--sage': '#6e9f58', '--ping': '#3a9c98', '--dusk': '#7b5ca8', '--screen-ui': '#fff5e2',
    '--ping-glow': '#8ec3e6', '--bluegrey': '#8ec3e6', '--alert': '#d8394e', '--skin': '#f2c4a0', '--hair': '#3a2b38',
    '--white': '#fff5e2', '--subtitle': '#fff5e2',
  };
  return {
    // line: class -> [width on screen, roughness]
    'paper-pencil': {
      palette: pencil,
      line: { fg: [7, 1.1], fine: [4.5, 0.8], mid: [5, 0.9], bg: [3, 0.7], far: [2, 0.6] },
      bowing: 0.8, hatch: true, wash: false, letter: '700 %px Fredoka',
      grain: 0.06, tooth: 0, fibres: 40, vignette: 0.12, tint: ['#f3d9b1', 0.12], glow: 0.4,
    },
    'watercolor-ink': {
      palette: watercolor,
      line: { fg: [4, 0.5], fine: [3.2, 0.4], mid: [3, 0.45], bg: [2, 0.4], far: [0, 0] },
      bowing: 0.5, hatch: false, wash: true, letter: '400 %px "Permanent Marker"',
      grain: 0.1, tooth: 0.08, fibres: 0, vignette: 0.32, tint: null, glow: 0.5,
    },
  };
})();
