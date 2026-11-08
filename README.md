# LACUNA — A little space.

An original, quiet 3D jewelry puzzle. Rotate both bracelet openings toward their shared golden clasp. Hear the click, watch the clasp separate, and release the little knot.

## Play

Open `index.html` or `standalone.html` in a current WebGL browser. Both are identical self-contained builds. No CDN, account, download, engine installation or SDK is required to play. The full readable source and locally bundled Three.js r147 are included.

- Drag along a bracelet to turn it. A tap selects without spending a turn.
- Alternatively select a numbered bracelet, then tap or hold either large turn button.
- Keyboard: 1–7 select, Left/Right turn, H shows a guide, Z undoes, Escape pauses.
- Align **both** gaps with one clasp. A single aligned opening lights the clasp; it does not open it.
- A bracelet with multiple clasps stays until its last clasp opens.
- Undo restores the actual last position, opened clasps and points; turn/Guide records remain.
- Guide highlights the two actual openings needed for the next clasp. It does not turn them for you.
- No countdown, lives, purchases or loss. Retry and Guide are free.

Eight finite authored layouts span the Botanical, Velvet and Midnight collections: pair, chain, triangle, diagonal chain, fork, ladder and two extended knot layouts. There are 35 clasps in total. These are curated arrangements, not an infinite level generator or general rigid-body ring simulation.

Each tray awards up to three best-only stars: clear all clasps, use no Guide, and finish within the displayed turn budget. Replaying only improves the best record. Consecutive openings within six active simulation seconds receive a small point-chain bonus; this never blocks progression. Rose unlocks at 8 stars and Moonstone at 16. Original jade marbling, metallic clasps/end caps, beaded variants, a jeweler's loupe, ring box, velvet table, impact click and layered chime sounds share one visual direction. The included cover is an actual game render, not generated artwork.

## Mobile and storage

Responsive portrait and landscape layouts, large touch controls, automatic pause on backgrounding, a Light rendering option, Steady effects and optional Soft snap. No motion permission is needed. Standard rendering caps device pixel ratio at 1.5; Light uses 1 and 30 paint frames per second. Fixed 60 Hz gameplay is independent of paint frequency. A configured CSS viewport is never multiplied by host density. Desktop browser emulation does not certify physical handset performance or audio.

The only gameplay localStorage key is `lacuna-v1`. Local progress and the active tray are saved at committed turns, opened clasps, settings changes, pause and exit. Settings and earned finishes are retained. Opening-phase progress also survives reload. Browser back/forward cache restoration reloads the independently bootable entry once to recreate a disposed renderer and SDK listener set. No other games' state is read, collected or cleared.

## GameWave

See `GAMEWAVE-IMPORT.md`. The optional `window.neonlib` bridge handles missing, partial, late and failing SDK methods. Registration never blocks the game. Confirmed positive likes can also unlock Rose; confirmed direct comments, including image-only comments with empty text, can also unlock Moonstone. These cosmetics remain earnable through ordinary play. The collection only shows supported host reward prompts. No API to open host social UI is assumed.

## Build and checks

```
node build.cjs
node tests.mjs
node model-tests.mjs
```

`index-source.html` loads the readable modules; `build.cjs` scopes each module and inlines it, Three.js and CSS into both offline entries. `tests.mjs` checks full controller campaigns, alignment, Undo, phase restoration, best rewards, profile merges and guarded SDK mocks. `model-tests.mjs` traverses actual generated geometry with a stub renderer; its many vertex assertions are not distinct levels, GPU tests or a handset benchmark.

## Reference and authorship

Interaction reference: [Rotate Rings by mo..om on Combos](https://combos.game/zh-CN/play/67490942bfcd79125a4adfb56f18e4dc). The first pair was actually rotated and cleared for three stars in the reference. Only that observed interaction is claimed. LACUNA's code, 3D geometry, materials, interface, arrangements and audio are independently authored. No reference images, code, music, characters or complete campaign were copied. No image generation was used. This differs from the prior water-ring pump toy and planar string-crossing puzzle.

Original source is MIT licensed. Three.js retains its own MIT notice in `vendor/THREE-LICENSE.txt`.
