# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A reference site for LSFD (Los Santos Fire Department) roleplay on JGVRP, a *typing* GTA V RP server.
Every step of a procedure is a line of text the player types into game chat, so the whole site exists
to get one of those lines into the clipboard fast. Built with Vite + React + Tailwind CSS v4,
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
npm run deploy   # build + wrangler deploy (manual; normally not needed)
```

Auto-deploy: the repo is connected to **Cloudflare Workers Builds**. Every push to `main` triggers a
remote build (`npm run build` + `wrangler deploy`) on Cloudflare — there is no GitHub Actions
workflow. Pushing to `main` is the deploy step.

## Content sources

`draft.md` is the **current authoritative** source for RP text and step order; it supersedes
`LSFD RP.md`, which is kept only as the previous revision. `LSFD Field Handbook.md` is secondary —
it supplies the meaning of codes (10-code, Status, CAT, Triage, LOC) and the theory behind each
stage.

The site carries **only lines a player types into game chat**. `draft.md` also contains doctrine —
role descriptions, equipment lists, the fire-extinguisher class table, risk classifications, the
skunk-deodorizer recipe, bat-guano cleanup — and none of it belongs here. When new content arrives,
extract the chat lines and leave the prose in the source document.

In `draft.md` the long-form guides write `/me` lines out as rendered text ("Tobrian Alrik mengambil
trap box…"). Those are `/me` steps; drop the character name. A question ending in `((Nama))` is a
`/do` step.

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
  (between departments, including ATC), `deptooc` → `/od`, and `command`/`anim` carry their own
  text. Getting this wrong puts the line on the wrong channel in game, so pick the kind by *who
  hears it*, not by how it looks.
- **`kind: 'note'`** is guidance, not typed text: no number, no copy button.
- **`branches`** are jump links to `'<categoryId>#<sectionId>'`.

`src/lib/procedures.test.js` fails on a dangling `ref`, a duplicate id, an unknown `kind`, an empty
copyable step, or a branch/flow target pointing at a section that does not exist. Adding content
with a typo will not reach production silently.

### Adding a category

Create `src/data/procedures/<name>.js`, import it in `src/data/index.js`, and add it to
`PROCEDURES`. Its `group` must be one of the ids in `GROUPS`. No component changes needed.

### Motion budget

**The flow bar is the only thing that moves, and only when its chain does not fit** (below 1280px).
This is a product decision, not an oversight: the site is used mid-scene while other players wait,
so nothing may need waiting on. Do not add scroll reveals, card hover transitions, or animated
expand/collapse. The one exception already present is the "tersalin" marker that answers a click.

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

Fonts are self-hosted through `@fontsource` imports so the page makes no third-party request. Only
the weights actually used are imported — adding a weight to the CSS without using it just grows the
bundle.

### Performance budget

From the spec: JS under 90 KB gzip, CSS under 15 KB gzip, and no network request when switching
categories (all content is in the bundle). Check `npm run build` output before adding a dependency.

**The JS budget is nearly spent** (89.8 KB at last count) and content keeps growing. The next time
it is exceeded, do not solve it by lazy-loading a category — that would put a network request
between a tap and the text, which is the one thing this site must never do. Split the data into its
own chunk that the page still preloads, so the shell renders sooner without delaying any category.

## Deployment specifics

`wrangler.jsonc` configures a Workers static-assets deployment (`assets.directory: ./dist`,
`not_found_handling: single-page-application`) with a `custom_domain` route for `ems.viend.my.id`.
There is no server or API — this is 100% static output from `vite build`.
