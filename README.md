# easy-animation

Cartoon videos made from code. Claude Code writes the HTML and JavaScript that draws every frame, and [HyperFrames](https://github.com/heygen-com/hyperframes) renders it to MP4.

⭐ **If you like it, give it a star!**

🔗 **Project link:** https://github.com/Ayush-Dutt-Sharma/easy-animation

## Try it

Needs Node 22 and FFmpeg. This renders the 5-second style test:

```bash
DO_NOT_TRACK=1 HYPERFRAMES_SKIP_SKILLS=1 npx --yes hyperframes@0.8.80 render -c videos/uber-live-map/style-test.html -o renders/style-test.mp4 --variables '{"theme":"watercolor-ink"}'
```

Change the theme to `paper-pencil` to see the other look.

## What's inside

- `library/`: reusable pieces (characters, sets, sound, themes and craft rules)
- `engine/`: the shared drawing code and a determinism check
- `videos/`: one folder per video

---

<p align="center">Made with ❤️</p>
