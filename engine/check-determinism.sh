#!/bin/sh
# Render-rule check: renders a composition twice as PNGs, with 1 worker and with 5, then compares pixel hashes.
# Any difference means some frame isn't a pure function of t. Run it from the project root after `nvm use`.
# Usage: sh engine/check-determinism.sh videos/uber-live-map/style-test.html [theme]
set -e
c=$1 out=renders/determinism
rm -rf "$out"
export DO_NOT_TRACK=1 HYPERFRAMES_SKIP_SKILLS=1
for w in 1 5; do
  npx --yes hyperframes@0.8.80 render -c "$c" -o "$out/w$w" --format png-sequence -w $w --variables "{\"theme\":\"${2:-paper-pencil}\"}"
  ffmpeg -v error -pattern_type glob -i "$out/w$w/*.png" -f framemd5 "$out/w$w.md5"
done
cmp -s "$out/w1.md5" "$out/w5.md5" || { echo "FAIL: these frames differ (PNGs kept in $out):"; diff "$out/w1.md5" "$out/w5.md5" | grep '^<' | cut -d, -f3; exit 1; }
rm -rf "$out/w1" "$out/w5" # ~650 MB of PNGs
echo "OK: every frame identical"
