// Drawing kit for canvas scenes: wobbly seeded outlines (rough.js), theme fills (pencil hatch or watercolour wash),
// additive glows, the paper finish and subtitles. Every frame is a pure function of t: seeds come from ids and t.
// Needs rough.js (global `rough`) and window.THEMES. Specs: library/design/themes/*.md.
window.K = (() => {
  let ctx, rc, T, t = 0, id = 0;
  const washes = new Map(), papers = new Map();

  const rng = s => () => { s = s + 0x6D2B79F5 | 0; let x = Math.imul(s ^ s >>> 15, 1 | s); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };
  const col = c => c.startsWith('--') ? T.palette[c] : c; // token or hex
  const rgb = c => [1, 3, 5].map(i => parseInt(col(c).slice(i, i + 2), 16));
  const rgba = (c, a) => `rgba(${rgb(c)},${a})`;
  const mix = (a, b, k) => '#' + rgb(a).map((v, i) => Math.round(v + (rgb(b)[i] - v) * k).toString(16).padStart(2, '0')).join('');
  const zoom = () => { const m = ctx.getTransform(); return Math.hypot(m.a, m.b); }; // local px -> screen px
  const ellPts = ([x, y, w, h]) => Array.from({ length: 24 }, (_, i) => [x + Math.cos(i * Math.PI / 12) * w / 2, y + Math.sin(i * Math.PI / 12) * h / 2]);
  const p2d = g => {
    if (g.d) return new Path2D(g.d);
    const p = new Path2D();
    if (g.e) p.ellipse(g.e[0], g.e[1], g.e[2] / 2, g.e[3] / 2, 0, 0, 2 * Math.PI);
    else g.pts.forEach(([x, y], i) => i ? p.lineTo(x, y) : p.moveTo(x, y));
    p.closePath();
    return p;
  };
  const hatch = (fill, angle, n, k) => ({ seed: n * 1000 + 999, stroke: 'none', fill, fillStyle: 'hachure', hachureAngle: angle, hachureGap: 7 / k, fillWeight: 1.5 / k, roughness: 1, disableMultiStrokeFill: true });

  // Tyler Hobbs-style watercolour: a deformed base plus 18 more deformed layers at low alpha, built once per id.
  // So bg/far shapes must be static in local coords (move them with ctx transforms, not new points).
  function wash(n, pts, c, bleed) {
    let L = washes.get(n);
    if (!L) {
      const R = rng(n * 7919), g = () => (R() + R() + R() + R() - 2) * 1.73;
      const deform = (p, k) => { while (k--) p = p.flatMap((a, i) => { const b = p[(i + 1) % p.length], s = bleed * Math.min(80, Math.hypot(b[0] - a[0], b[1] - a[1])); return [a, [(a[0] + b[0]) / 2 + g() * s, (a[1] + b[1]) / 2 + g() * s]]; }); return p; };
      const base = deform(pts, 2);
      L = [base, ...Array.from({ length: 18 }, () => deform(base, 3))].map(pts => p2d({ pts }));
      washes.set(n, L);
    }
    const a = ctx.globalAlpha;
    ctx.fillStyle = c;
    L.forEach((p, i) => { ctx.globalAlpha = a * (i ? .05 : .55); ctx.fill(p); });
    ctx.globalAlpha = a;
  }

  // fill: token/hex or null. cls: line class (fg, fine, mid, bg, far) or null for no outline.
  // o: flat (no hatch), shade (cross-hatch), wash (watercolour even without a bg class), bleed, stroke, w.
  function shape(geo, fill, cls, o) {
    const n = ++id, a = ctx.globalAlpha, k = zoom();
    const draw = opts => geo.pts ? rc.polygon(geo.pts, opts) : geo.e ? rc.ellipse(...geo.e, opts) : rc.path(geo.d, opts);
    if (fill) {
      let c = col(fill);
      if (cls === 'far') c = mix(c, '--paper', .25);
      if (T.wash && !geo.d && (o.wash || cls === 'bg' || cls === 'far')) wash(n, geo.pts || ellPts(geo.e), c, o.bleed ?? .15);
      else { ctx.fillStyle = c; ctx.fill(p2d(geo)); }
      if (T.hatch && !o.flat) {
        ctx.globalAlpha = a * .35;
        const h = hatch(mix(c, '#000000', .2), 45, n, k);
        draw(h);
        if (o.shade) draw({ ...h, hachureAngle: -45 });
        ctx.globalAlpha = a;
      }
    }
    const w = cls && (o.w || T.line[cls][0]);
    if (w) draw({ seed: n * 1000 + Math.floor(t * 12), stroke: col(o.stroke || '--ink'), strokeWidth: w / k, roughness: T.line[cls][1], bowing: T.bowing, disableMultiStroke: true });
  }

  function paper() { // grain, tooth, fibres, tint and vignette, built once per theme and multiplied over each frame
    if (papers.has(T)) return papers.get(T);
    const c = document.createElement('canvas'), x = c.getContext('2d'), R = rng(7);
    c.width = 1080; c.height = 1920;
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920);
    if (T.tint) { x.fillStyle = rgba(T.tint[0], T.tint[1]); x.fillRect(0, 0, 1080, 1920); }
    const noise = (w, h, a) => {
      const n = document.createElement('canvas'), nx = n.getContext('2d');
      n.width = w; n.height = h;
      const d = nx.createImageData(w, h);
      for (let i = 0; i < d.data.length; i += 4) { d.data.fill(255 * (1 - a * R()), i, i + 3); d.data[i + 3] = 255; }
      nx.putImageData(d, 0, 0);
      return n;
    };
    x.globalCompositeOperation = 'multiply';
    x.drawImage(noise(540, 960, T.grain), 0, 0, 1080, 1920);
    if (T.tooth) x.drawImage(noise(135, 240, T.tooth), 0, 0, 1080, 1920);
    x.globalCompositeOperation = 'source-over';
    x.strokeStyle = rgba('--ink', .03);
    for (let i = 0; i < T.fibres; i++) {
      const [px, py, an, l] = [R() * 1080, R() * 1920, R() * 6.3, 30 + R() * 90];
      x.lineWidth = 1 + R();
      x.beginPath(); x.moveTo(px, py);
      x.quadraticCurveTo(px + Math.cos(an) * l / 2 + (R() - .5) * 20, py + Math.sin(an) * l / 2 + (R() - .5) * 20, px + Math.cos(an) * l, py + Math.sin(an) * l);
      x.stroke();
    }
    const v = x.createRadialGradient(540, 960, 771, 540, 960, 1101); // 70% of the half-diagonal to the corners
    v.addColorStop(0, rgba('--ink', 0)); v.addColorStop(1, rgba('--ink', T.vignette));
    x.fillStyle = v; x.fillRect(0, 0, 1080, 1920);
    papers.set(T, c);
    return c;
  }

  return {
    rng, mix, col,
    at: n => { id = n; }, // start an id block so boil seeds stay stable when shape counts change elsewhere
    begin(canvas, theme, time, [z, cx, cy]) { // camera: zoom and the world point at screen centre
      ctx = canvas.getContext('2d'); rc = rough.canvas(canvas); T = theme; t = time; id = 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.shadowColor = 'transparent';
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.fillStyle = col('--paper'); ctx.fillRect(0, 0, 1080, 1920);
      ctx.setTransform(z, 0, 0, z, 540 - cx * z, 960 - cy * z);
    },
    poly: (pts, fill, cls, o = {}) => shape({ pts }, fill, cls, o),
    ell: (x, y, w, h, fill, cls, o = {}) => shape({ e: [x, y, w, h] }, fill, cls, o),
    path: (d, fill, cls, o = {}) => shape({ d }, fill, cls, o),
    line(pts, cls, o = {}) {
      const n = ++id, w = o.w || T.line[cls][0];
      if (!w) return;
      const opts = { seed: n * 1000 + Math.floor(t * 12), stroke: col(o.c || '--ink'), strokeWidth: w / zoom(), roughness: T.line[cls][1], bowing: T.bowing, disableMultiStroke: true };
      o.smooth ? rc.curve(pts, opts) : rc.linearPath(pts, opts);
    },
    shadow(pts) { // cast shadow: ink wash, plus a -45° hatch in pencil
      const n = ++id, a = ctx.globalAlpha;
      ctx.globalAlpha = a * .13; ctx.fillStyle = col('--ink'); ctx.fill(p2d({ pts }));
      if (T.hatch) { ctx.globalAlpha = a * .3; rc.polygon(pts, hatch(col('--ink'), -45, n, zoom())); }
      ctx.globalAlpha = a;
    },
    glow(x, y, r, c, k = 1) { // additive light: pings, chips, windows and screens only
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(c, T.glow * k)); g.addColorStop(1, rgba(c, 0));
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      ctx.globalCompositeOperation = 'source-over';
    },
    text(s, x, y, size, c) { ctx.font = T.letter.replace('%', size); ctx.textAlign = 'center'; ctx.fillStyle = col(c); ctx.fillText(s, x, y); },
    finish() { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(paper(), 0, 0); ctx.globalCompositeOperation = 'source-over'; },
    sub(s, k = 1) { // subtitle in screen space, after finish() so it stays crisp; k scales about the baseline centre
      ctx.setTransform(k, 0, 0, k, 540 * (1 - k), 1430 * (1 - k));
      ctx.font = '700 76px Fredoka'; ctx.textAlign = 'center'; ctx.lineWidth = 20; ctx.strokeStyle = col('--ink');
      ctx.shadowColor = rgba('--ink', .35); ctx.shadowOffsetY = 6;
      ctx.strokeText(s, 540, 1430);
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = col('--subtitle'); ctx.fillText(s, 540, 1430);
    },
  };
})();
