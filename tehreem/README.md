# A Little World: for Tehreem

A birthday experience in seven chapters:

1. **The Surprise**: an arch of rotating photos, the birthday greeting, and a "send a hug" button
2. **A Little Note**: a sealed envelope; tap the wax seal to open it
3. **Confessions**: a swipeable deck of seven confession cards
4. **Duas**: a night sky with six lanterns to light, then Surah Al-Furqan 25:74 and an *Ameen* button
5. **Memories**: a cinematic hero, a swipeable filmstrip, a full-bleed spotlight, a scrapbook wall, and a fullscreen viewer with swipe and slideshow
6. **From My Heart**: the letter, with a wax seal and a hand-drawn signature
7. **The Finale**: blow out the candles for confetti and floating photos

## Run it

It is plain HTML/CSS/JS, so it needs no build step. Serve the folder:

```bash
cd tehreem && python3 -m http.server 8000   # then open http://localhost:8000
```

You can also host the `tehreem/` folder on GitHub Pages, Netlify or Vercel and send her the link.
Each chapter has its own URL (`#memories`, `#finale`, …).

## Personalise

All the text lives in `app.js` → `CONFIG`, `MEMORIES`, `CONFESSIONS` and `DUAS`. The letters are in `index.html`.

- **Signature**: set `CONFIG.signature` (it currently says "Your husband").
- **Music**: put a song named `music.mp3` next to `index.html`. A ▶ button then appears in the header, and the music starts when she taps "Open your surprise".
- **More photos**: add `photos/pNN.jpg` (about 1800px) and `photos/pNN-sm.jpg` (about 720px), then add `{ src:'pNN', cap:'…' }` to `MEMORIES`.
- **Videos**: add `{ src:'pNN', video:'videos/clip.mp4', cap:'…' }`. The wall shows a play badge and the viewer plays it.

All photos were converted from the originals (HEIC/JPG) and their EXIF/location data was removed.
