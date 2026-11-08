# GameWave import

Import the root-index ZIP. `index.html` is directly at the ZIP root. `standalone.html` is byte-identical. Startup and ordinary play must work without any host injection; no external runtime requests are required.

Official SDK reference checked November 8, 2026 (document still displayed October 30):
https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh

## Actual wiring

- The first accepted rotation or actual Undo starts a host visit. Explicitly resuming an already committed saved clasp-opening motion also starts the continued visit before it can finish. Selecting, reading a Guide, viewing the collection and pause alone do not start it.
- The final actual clasp opening ends the visit once. Restarting/changing an active tray or leaving an active page ends the abandoned visit once. Reload waits without a fabricated start; the next accepted committed turn starts the resumed visit once, including partially completed multi-clasp trays.
- Each capability is checked independently. Startup probes are bounded; real input, focus and resize can connect later or complete methods on the same partially injected object. Rejections, synchronous exceptions, unsuccessful registration results and timeouts do not block play.
- `onLike` and `onComment` independently await registration `code === 0`. Actual returned unsubscribe functions run during cleanup, including a registration that finishes after the scene exits. Unsupported listener prompts remain hidden.
- Read direct callback fields. Positive `status === true` and a nonempty **string** `project_id` can award Rose. A direct new comment with string `content`, including `''`, can award Moonstone. An unlike, numeric project ID or malformed event never awards. `count` is a snapshot and is never used as identity or an increment.
- Explicit durable `rewards.like` and `rewards.comment` flags deduplicate callbacks. Local-only scope is this device/browser; this is not a server-verified cross-account entitlement system.
- Cloud payload is only `{game:'lacuna',v:1,profile:<this game's profile>}`. Load returns the stored object directly. Only a known empty object or this recognized envelope enables writes. Unknown/foreign/wrapped/error/timeout loads suppress writes. Never enumerate shared-origin localStorage.
- Profile merging uses per-tray maxima for best stars/scores and union of earned reward flags. Local active tray, settings and selected finish remain owned locally. Inflight saves flush the newest pending snapshot after success; failures remain dirty for a future real connection/save attempt, not an unbounded retry loop.
- Finite positive `getGameViewport()` width/height are logical CSS bounds; clamp to the available browser area. Density is separate metadata and is not multiplied into CSS dimensions or used as an extra pixel-ratio multiplier.

## Evidence scope

Controller/adapter tests include no SDK, partial/late injection, async failures, cleanup, direct-event semantics, duplicate guards, foreign cloud suppression, inflight updates and resumed next-action lifecycle. A separately labelled local simulator exercised the actual browser UI with late injection, optional cosmetic unlocks, duplicate events, own saved profile, reload and an actual first-tray completion. The simulator is excluded from the ZIP.

This is **not** evidence of an actual GameWave App import, supported App version, real account/cloud/social operation, physical handset certification, platform acceptance grade or completion of all historical games' SDK migrations. Perform those platform-side checks in a supported host before claiming them.
