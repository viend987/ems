# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A reference site for LSFD (Los Santos Fire Department) roleplay on JGVRP, a *typing* GTA V RP server.
Every step of a procedure is a line of text the player types into game chat, so the whole site exists
to get one of those lines into the clipboard fast. Built with Vite + **Preact** + Tailwind CSS v4,
deployed as a static site on Cloudflare Workers. Live at https://ems.viend.my.id.

The design brief and every decision behind it are in
`docs/superpowers/specs/2026-09-24-lsfd-rp-reference-design.md`. Read it before changing layout,
palette, or motion — several things that look arbitrary are deliberate.

## Commands

```bash
npm run dev      # dev server (Vite)
npm test         # vitest run — data integrity + copy + search
npx vitest run src/lib/copy.test.js   # single test file
npm run lint     # oxlint
npm run build    # production build to dist/
npm run logo     # regenerate src/assets/lsfd.webp + public/favicon.png from lsfd.png
npm run units    # convert images-incoming/*.{png,jpg} to AVIF+WebP (480/960w) in src/assets/units/
npm run units -- --rebuild   # re-encode everything in images-incoming/done/ (after changing settings)
npm run fonts    # re-subset the two self-hosted fonts into src/assets/fonts/
npm run deploy   # build + wrangler deploy (manual; normally not needed)
```

Auto-deploy: the repo is connected to **Cloudflare Workers Builds**. Every push to `main` triggers a
remote build (`npm run build` + `wrangler deploy`) on Cloudflare — there is no GitHub Actions
workflow. Pushing to `main` is the deploy step.

## Content sources

`draft.md` is an **inbox, not an archive**: the user pastes new material into it and overwrites it
each batch, so its current contents are only the latest drop (earlier drops live in git history).
Once content is in `src/data/`, the data files are the source of truth. `LSFD RP.md` is the original
revision, kept for reference. `LSFD Field Handbook.md` is secondary —
it supplies the meaning of codes (10-code, Status, CAT, Triage, LOC), the theory behind each stage,
and the Intermediate Life Support chapter that defines drug doses and routes.

Server vocabulary worth knowing before editing content: **RPLY means "Roleplay Lie"** — a scene
narrated entirely through `/do` with nothing actually happening on screen, used when the mechanics
or the rank do not allow the real thing (a firefighter narrating surgery when no doctor is on duty).
It is not "reply". **`~` in a radio line is the unit name**, filled in automatically once
`/createunit` (or `/joinunit` for a colleague's unit) has run; without it the radio broadcasts a
literal `~`. **`/bls` extends the victim's injured timer** and should go in early — letting a victim
slip into critical gets the responder blamed in character. **There is no separate "Truck" apparatus**
— the field unit is called Engine, and every MVA compartment (extrication tools, stabilization rods,
included) is "Compartement Engine". **The ambulance unit is called RA Unit**, not "ambulance" or
"ambulans" — those words only survive in generic Indonesian prose like "unit kendaraan".

Some procedures here are **not** in any source document: they were written from real prehospital
practice because the official material stops at the drug and leaves unlicensed members with nowhere
to go. Chest seal, abdominal evisceration, flail chest, BVM-assisted ventilation, hyperventilation
coaching, the recovery position, the shock position, and `abc#meninggal` (declaring a death after
resuscitation fails) are all in that group. So are the parts of the three later guides that were only
named, never scripted: in `structure.js` forcible entry, ventilation, the in-building victim check,
and termination; in `hydrant.js` the three flow-check fault cases and the hose hookup the guide
skipped; in `blood.js` donor screening, the bedside label check, and transfusion-reaction handling. They are deliberate additions, not transcription errors
— do not delete them for failing to appear in the handbook.

`abc#meninggal` is reached only from Epinephrine's failure branch, deliberately — declaring death
follows the same authority rule as RPLY: only an ILS-authorized responder gets there, so the
`tanpa-ils` chain still funnels toward transport instead. Its condolence lines are written plain on
purpose (no flowery religious language) after a request to tone that down; keep future additions to
the same register.

The site carries **only lines a player types into game chat**. `draft.md` also contains doctrine —
role descriptions, equipment lists, the fire-extinguisher class table, risk classifications, the
skunk-deodorizer recipe, bat-guano cleanup — and none of it belongs here. When new content arrives,
extract the chat lines and leave the prose in the source document.

In `draft.md` the long-form guides write `/me` lines out as rendered text ("Tobrian Alrik mengambil
trap box…"). Those are `/me` steps; drop the character name. A question ending in `((Nama))` is a
`/do` step.

`blood.js` is used during LSFD **blood-donation events**. Its "Transfusi saat operasi" section stays
inside `blood.js` as written in the guide — do not move it into another category, and do not add a
jump to it from the RPLY operation flow in `hospital.js` (the user rejected that link). It also corrects two errors in its source guide: needle size is
"16 Gauge" (the guide wrote "Gauss", a unit of magnetism), and donors are asked whether they have
eaten, because the guide's "fast for 6 hours" is backwards — an empty stomach is what makes donors
faint.

Two things in the source were deliberately corrected rather than transcribed, and should not be
"fixed" back: the AED block was headed *BVM* though BVM belongs to CPR, and the Vertical Rescue
radio cited ASGH/CGH/FS helipads, IFR, and `squawk 2222`. LSFD flies from DFS and PBH, always VFR,
and squawks 1200 unless ATC assigns a code. See the header comment in `procedures/vertical.js`.

## Architecture

### Data is the product

`src/data/procedures/*.js` — one file per category, each exporting `{ id, group, name, blurb,
sections[] }` where a section is `{ id, name, steps[] }`. `src/data/reference.js` holds the three
lookup-table categories (anims, commands, codes) whose shape is `{ tables: [{ id, name, rows }] }`
instead of `sections`. `src/data/index.js` composes the board order, the groups, and the flow chain.

A step is `{ n?, id?, kind, text, label?, prefix?, note?, branches? }`:

- **`text` holds the sentence only.** The chat prefix (`/me`, `/do`, `/r`) is derived from `kind` in
  `src/lib/copy.js`, never stored. This is what keeps prefixes from drifting and lets one place
  decide both the copied string and the on-screen color.
- **`n` is the in-game shortcut number and is purely a display marker.** It must never end up in the
  clipboard. `copyText()` is the only function that builds copied strings; go through it.
- **`id` marks a step that other steps reuse.** A repeated step is written once with an `id` and
  referenced elsewhere as `{ ref: 'that-id' }` — `/73`, the oxygen-outlet trio, and the
  patient-loaded radio lines each appear in several branches this way. `resolveCategory()` in
  `src/lib/procedures.js` expands refs and tags the result `reused: true`. Refs resolve across
  category files, so definition order does not matter.
- **`kind` picks the chat channel**, and the prefix follows from it: `me` → `/me`, `do` → `/do`,
  `say` → no prefix, `shout` → `/s`, `radio` → `/r` (LSFD), `ooc` → `/ro`, `deptradio` → `/d`
  (between departments, including ATC), `deptooc` → `/od`, `wt` → `/wt` (walkie-talkie, e.g.
  Fireground Frequency 917 at a fire), and `command`/`anim` carry their own text. `/wt` lines are
  written as casual chat between crew on scene, not formal radio phrasing — the user asked for that
  register specifically. Getting this wrong puts the line on the wrong channel in game, so pick the kind by *who
  hears it*, not by how it looks. Each channel also owns a color (`--color-chat-*` in
  `index.css`): `/me` pink, `/do` purple, `/r` blue, `/d` orange, `/s` yellow, `/wt` olive green,
  commands green, anims teal. Those pairings come from the user and are not ours to re-theme.
- **`kind: 'note'`** is guidance, not typed text: no number, no copy button.
- **`branches`** are jump links to `'<categoryId>#<sectionId>'`.

`src/lib/procedures.test.js` fails on a dangling `ref`, a duplicate id, an unknown `kind`, an empty
copyable step, or a branch/flow target pointing at a section that does not exist. Adding content
with a typo will not reach production silently.

### Unit photos

`npm run units` (`scripts/units.mjs`) turns each file in `images-incoming/` into four files in
`src/assets/units/` — `<id>-480.{avif,webp}` and `<id>-960.{avif,webp}` — and moves the original into
`images-incoming/done/`. `UnitGallery.jsx` serves them through `<picture>` with `srcset`/`sizes`, so a
1x desktop fetches the 480 AVIF (~7 KB) and only retina screens and phones fetch the 960. The widths
are duplicated as `WIDTHS` in both the script and the component and must stay in sync;
`src/lib/units.test.js` fails if any id in `images` is missing one of its four files. **The filename becomes the
id** — name incoming files after the callsign (`engine.jpeg`, `lifeflight.png`) and reference that
id in `images` in `src/data/units.js`. Unlike arms-calc's coordinate gallery there is no crop and no
full-size lightbox: unit photos are landscape 16:9 and the whole vehicle is the point, so the
aspect ratio is kept and the card shows the image as-is.

`images-incoming/` is gitignored — the raw 1920x1080 sources are several MB and only the converted
WebP belongs in the repo. A unit with no `images` still renders its callsign and description, which
is how the fleet list stays complete while photos arrive in batches.

### Adding a category

Create `src/data/procedures/<name>.js`, import it in `src/data/index.js`, and add it to
`PROCEDURES`. Its `group` must be one of the ids in `GROUPS`. No component changes needed.

### Motion budget

**The flow bar is the only thing that moves, and only when its chain does not fit** (below 1280px).
This is a product decision, not an oversight: the site is used mid-scene while other players wait,
so nothing may need waiting on. Do not add scroll reveals, card hover transitions, or animated
expand/collapse. The one exception already present is the "tersalin" marker that answers a click.

**No `scroll-behavior: smooth`, deliberately.** Jumping to AED in ABC animated for 1.5 s, and it
also broke `.lazy-section` (below): sections painted mid-animation changed the page height after the
scroll target had been computed, so far jumps landed up to ~160 px short. Instant jumps were verified
in a real browser to land exactly on every section, including cross-category flow-bar jumps.

### Routing and state

`useRoute()` in `src/hooks.js` reads `location.hash` (`#/deat`, or `#/abc#breathing-nrb` to target a
section) — no router library. The last category is mirrored to `localStorage` as the landing target;
every storage access is wrapped in `try/catch` and the page renders correctly without it.

### Styling

Tailwind v4 via `@tailwindcss/vite`, no `tailwind.config.js` — tokens live in `@theme` in
`src/index.css`. Colors carry meaning rather than decoration: `alarm` red marks what is active and
what is broadcast, `signal` yellow marks what the character does, and `calm`/`mech`/`anim` separate
`/do` questions, server commands, and animation names. `.slab` is the Saira Condensed heading
treatment; reuse it instead of restyling headings inline.

The theme is light. Token *names* are surface-neutral (`ink` is the page, `panel` is a card) so a
theme change stays in `@theme` — components never name a literal color. The accent values are the
darkened variants: the bright yellow/green/purple that read well on black fail contrast on white, so
if you reintroduce a dark surface anywhere, those accents need their own values rather than reuse.
`highlight` is the one bright yellow, and it is fill-only — never use it as text color.

Fonts are self-hosted and **subset to the glyphs actually used** by `npm run fonts`
(`scripts/fonts.mjs`, via `subset-font`), committed to `src/assets/fonts/` as woff2 only, and declared
by hand with `@font-face` in `index.css`. Two files, 17 KB total. `@fontsource/*` stays as a
devDependency purely as the subsetter's input — nothing from it ships.
- **Saira Condensed 800** keeps no lowercase letters. It is used only by `.slab`, which is always
  `text-transform: uppercase`, and browsers match glyphs after the transform. If you ever use the
  display font without `.slab`, re-add a–z in `scripts/fonts.mjs` first.
- **IBM Plex Mono 400** keeps printable ASCII plus the typographic marks used in content
  (`— – · “ ” ‘ ’ › … → ≥`). New content using other non-ASCII characters (an accented letter, a new
  symbol) falls back to the system monospace for that glyph — add it to `TYPO` and rerun.
- There is **no weight 500**; `font-medium` would render as synthetic bold. Use color or size for
  emphasis instead of adding a weight.
- `index.html` preloads both fonts. The page is JS-rendered, so without preload the fonts are only
  requested after the bundle runs; with it they start at ~60 ms alongside the CSS. The LCP element is
  the Saira `<h1>`. Chrome logs a "preloaded but not used" warning for them — a false positive: each
  font is fetched exactly once.

### Preact, not React

The app uses Preact directly (`@preact/preset-vite` with `reactAliasesEnabled: false`) — no
`preact/compat`, no `react` package. That is what takes the runtime from ~68 KB to ~4 KB gzip.
- Import hooks from `preact/hooks` and `render`/`Component` from `preact`; never from `'react'`.
- Text inputs must use **`onInput`**, not `onChange` — Preact's `onChange` is the native DOM event and
  fires only on blur, so the search field would stop filtering as you type.
- There is no `memo()` without compat. `StepRow` is a class with `shouldComponentUpdate` instead —
  see below.
- `.oxlintrc.json` turns off `react/immutability`: it recognizes `useRef` from `'react'` as mutable
  but not the one from `preact/hooks`, and flags `timer.current = …` as an error.

### Performance

The user wants the site as light as possible. Measured on the production build in a real browser:
first visit transfers ~74 KB (JS 44, fonts 17, CSS 5, logo 6, favicon 3), FCP/LCP ~200 ms. Most of
the JS is RP text — each large guide adds a few KB gzip. Weigh
every new dependency, font weight, or asset against that, and check `npm run build` output before
adding a dependency.

- **`StepRow` skips re-render unless its own copy status changed.** Every copy click changes `status`
  in `App`; without this, all 167 rows of ABC re-render per click. With it, 1–2 do (measured by
  counting renders). It only works if `onCopy` and `onGo` are referentially stable — both are
  `useCallback`, and **a new inline callback passed to `StepRow` silently turns the optimization
  off**. `smoke.test.jsx` checks the marker moves between rows and does not stick, and was verified to
  fail against a broken comparison.
- **`.lazy-section`** (`content-visibility: auto`) on every section skips layout and paint for the
  ones off screen. Switching to ABC measured 77 → 36 ms. It depends on instant scrolling; see Motion
  budget.
- **The search index is built on the first query**, not at page load, with each entry's searchable
  text lowercased once rather than on every keystroke.
- **`public/_headers`** marks `/assets/*` (hash-named by Vite) `immutable` for a year, so a return
  visit fetches nothing but `index.html`.
- `build.modulePreload.polyfill` is off — every target browser supports modulepreload natively.

**Do not solve future growth by lazy-loading a category.** That would put a network request between
a tap and the text, which is the one thing this site must never do. All content ships in the one app
chunk so switching category costs no request.

## Deployment specifics

`wrangler.jsonc` configures a Workers static-assets deployment (`assets.directory: ./dist`,
`not_found_handling: single-page-application`) with a `custom_domain` route for `ems.viend.my.id`.
There is no server or API — this is 100% static output from `vite build`.
