#!/usr/bin/env bash
# Contact sheets of a reference video, two frames a second with timestamps, to label scenes by hand.
#   scripts/breakdown.sh reference/my-short.mp4      → reference/my-short-sheet1.png, -sheet2.png, …
# Reference videos stay in reference/ (git-ignored): we describe their scenes, we never publish their footage.
set -euo pipefail
video="$1"
out="${video%.*}-sheet%d.png"
ffmpeg -hide_banner -loglevel error -y -i "$video" \
  -vf "fps=2,scale=216:-2,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=18:fontcolor=yellow,tile=8x3" "$out"
echo "wrote ${out/\%d/N}"
