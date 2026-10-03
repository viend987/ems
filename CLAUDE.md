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
                 # vite.config.js excludes .kilo/** — a repo copy another tool leaves there
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
coaching, the recovery position, the shock position, and `circulation#meninggal` (declaring a death after
resuscitation fails) are all in that group. So are the parts of the three later guides that were only
named, never scripted: in `structure.js` forcible entry, ventilation, the in-building victim check,
and termination; in `hydrant.js` the three flow-check fault cases and the hose hookup the guide
skipped; in `blood.js` donor screening, the bedside label check, and transfusion-reaction handling. They are deliberate additions, not transcription errors
— do not delete them for failing to appear in the handbook.

`circulation#meninggal` is reached only from Epinephrine's failure branch, deliberately — declaring death
follows the same authority rule as RPLY: only an ILS-authorized responder gets there, so the
`tanpa-ils` chain still funnels toward transport instead. Its condolence lines are written plain on
purpose (no flowery religious language) after a request to tone that down; keep future additions to
the same register.

The site carries **only lines a player types into game chat**. `draft.md` also contains doctrine —
role descriptions, equipment lists, the fire-extinguisher class table, risk classifications, the
skunk-deodorizer recipe, bat-guano cleanup — and none of it belongs here. When new content arrives,
extract the chat lines and leave the prose in the source document.

The one group of exceptions is **Laporan forms**, which generate forum BBCode directly from interactive
inputs without a backend:
- **Patrol Log** (`#/patrol`, Field Unit): Weekly Patrol Log for LSFD (min. 3 reports, min. 60 mins each).
  Pinned byte-for-byte by `patrol.test.js`. Proof images accept any http(s) link with live preview. Includes
  direct link to the staff member's private forum patrol topic (`staff.patrolTopic`, e.g. topic #1652 for Tobrian Alrik).
- **Patient Care Report** (`#/pcr`, Field Unit): Detailed on-scene PCR with Personal Details (auto-filled
  from `staff.js`, default callsign RA-105 for Tobrian Alrik), Duty Info, LoC selector (Alert, Verbal,
  Pain Stimuli, Unresponsive), optional Triage selector, vitals, summary with color formatting support, screenshot
  evidence, and a new-tab link to the PCR forum (`https://fire.los-santos.net/viewforum.php?f=129`).
- **Vehicle Maintenance** (`#/maintenance`, Field Unit): Hospital Financial Statement for Davis Fire Station
  units. Includes an interactive cost table initialized with 22 default units (RA-111 through ETU) with clean `$0`
  placeholder input UX (no leading `0` concatenation bugs like `$050`, fixed visual `$` indicator, empty fields evaluate
  as `$0`), auto-calculated total salary proposed, dynamic unit row add/delete, reset
  button, photo evidence inside `secspoiler`, and direct link to the maintenance forum (`https://fire.los-santos.net/viewforum.php?f=270`).
- **Request Criminal Record** (`#/criminal-record`, LSPD): LSPD Criminal Record Information Request Form
  inside a transparent bordered block. Captures applicant demographics, ID card and driver's license attachments
  with live previews, and signature image/name. Includes a "Gunakan data Tobrian Alrik" quick-fill button, direct
  link to the LSPD records forum (`https://police.los-santos.net/viewforum.php?f=298`).
- **Plastic Surgery** (`#/plastic-surgery`, Hospital Unit): Pillbox Hill Medical Center plastic surgery
  application form with patient demographics, diagnosis, surgical procedure details, before/after photo evidence
  with live image previews, DoB format switcher (DD/MM/YYYY etc. via `src/lib/dates.js`), Tobrian Alrik autofill,
  and direct link to the plastic surgery forum (`https://fire.los-santos.net/viewforum.php?f=153`).

All report generators feature dual Pratinjau / BBCode tabs, copy button, "Laporan baru" reset, new-tab forum submission links,
and persist drafts in `localStorage`. All dead sample constants and "Muat contoh" buttons have been completely purged from the codebase.
Member details, forum patrol topics, and signatures come from `src/data/staff.js`. Staff entries may include
`dob`, `address`, `phone`, `bankAccount`, `birthPlace`, `gender`, and `race` for auto-fill across templates.
The flexible date formatting utility in `src/lib/dates.js` supports `DD/MM/YYYY`, `MM/DD/YYYY`, `DD MMM YYYY`,
`DD MMMM YYYY` in both Indonesian and English locales.

**Link Referensi** (`#/links`) groups use distinct accent bar colors for each category header:
General = `bg-slate-400` (grey), Davis Fire Station = `bg-alarm` (red), Pillbox Hospital = `bg-emerald-500`
(green), LSPD = `bg-blue-600` (blue). The color is stored in `group.color` in `src/data/links.js` and
rendered by the `<span>` accent bar in `LinkList.jsx`.

In `draft.md` the long-form guides write `/me` lines out as rendered text ("Tobrian Alrik mengambil
trap box…"). Those are `/me` steps; drop the character name. A question ending in `((Nama))` is a
`/do` step.

### Two languages

The site is bilingual, ID/EN, default Indonesian. The point is not localisation for
its own sake: RP partners on JGVRP sometimes speak English, and answering an English
scene with Indonesian lines reads wrong. `src/lib/lang.js` owns the state, the button
sits beside the theme button in the header, and the value goes on `<html lang>`.

**Every English line is written by hand. Do not reach for a translation package.**
API-backed ones need a server this site does not have; dictionary ones outweigh the
whole bundle. More to the point, machine output is wrong exactly where it matters —
RA Unit, Engine, RPLY, Code 3, the 10-codes, and `/me` lines that must read as
third-person narration. **So a new RP line is not finished until its English twin is
written.**

Style rules for the English:
- `/me` is **third person singular, no subject**: in game it lands behind the
  character name, so "reaches for the ILS Bag", never "I reach for the ILS Bag".
- `/do` stays a question, and the parenthetical hints keep their shape:
  `(12 - 20 is normal)`.
- Server nouns are never translated: RA Unit, Engine, ILS Bag, PBH, DFS, OCD, N-Gloves,
  CRoC, NRB. "korban" becomes "the victim"; "unit kendaraan" becomes "the unit".
- British spelling, to match the forum's register: centre, colour, stabilise, authorisation.

Where the English lives:
- **Step text uses `en`** — that one field is written 500-odd times, so it stays short,
  and `stepText()` reads it.
- Everything else follows `<field>En` through `pick()`: `nameEn`, `blurbEn`, `noteEn`,
  `labelEn`, `descEn`.
- A missing translation falls back to Indonesian, so the page stays whole while the
  work proceeds in batches. Nothing renders as `undefined`.
- **Radio channels are out of the coverage denominator.** On this server `/r`, `/d`,
  `/wt`, `/ro` and `/od` traffic is already written in English, so there is normally
  nothing to translate. The exceptions were handled two different ways: the Vertical
  Rescue exchange and one `/ro` in `radio.js` were written half in Indonesian, so they
  *did* get an `en`; the six `/wt` lines in `structure.js` stay Indonesian, because
  that casual on-scene chatter is the register the user asked for. A test counts the
  Indonesian radio lines left without an `en` and fails above six, so a new one cannot
  slip in.
- **UI strings are in `src/lib/strings.js`**, two flat objects with identical keys.
  `strings.test.js` fails on a key missing from one language, on a key whose shape
  differs (string on one side, function on the other), and if too many keys are
  identical in both.

`copyText()` is the only place that decides which language is copied, so the screen and
the clipboard cannot disagree. The search index is built per language, and only for the
language actually used. **`StepRow` compares `lang` in `shouldComponentUpdate`** — leave
it out and the board keeps the old language after the button is pressed.

**Translation is complete: 509/509 lines, every category in `LENGKAP`.**
`procedures.test.js` prints a coverage report per category and fails if a category listed
in `LENGKAP` loses a line, so the work cannot regress. A new category still has to add
its id to `LENGKAP` once its lines are written. A step whose Indonesian text is already
English — the `/s` "Fire Department! If anyone is inside…" in `structure.js` — is marked
`alreadyEn: true` rather than given a twin `en`, because a test rejects an `en` identical
to its `text`.

A step reached by `ref` is translated **at its definition site**, so a category can show
less than 100% until the file that defines its shared steps is translated too — that is
why `load` sat at 2/6 before `radio.js`.

**The Laporan group is excluded from all of this.** Its labels follow the language, but
the BBCode it produces — the Patrol Log template and every tag name — is never
translated.

### BBCode Builder

`#/builder` (subgroup `general` in Laporan) is a free-form BBCode editor: a toolbar that inserts
tags, a textarea, and the same `BBCodePreview` beside it. No dependency — every BBCode editor on npm
is either a React component (which would need `preact/compat`, the ~6 KB the Preact setup exists to
avoid) or a parser with no UI, and a second parser could disagree with this one. The whole thing is
+1.65 KB gzip.

- `src/lib/bbcode-tags.js` is the button catalogue **as data**: `{ before, after, body?, pick?,
  block?, solo? }` plus `{ icon?, label?, name }` for how it looks. Adding a tag is one object; no
  component change. Every tag here must also be in `KNOWN` in `bbcode.js` — `bbcode-tags.test.js`
  fails otherwise, because an unknown tag would render as literal text.
- **Button names are English**, and a test enforces it. The label has to match the tag it types:
  "Align centre" next to `[center]`, not "Tengah". This is the one place in the UI that stays English
  regardless of the language toggle, because the names are really the tags' names.
- Icons are inline SVG in `src/components/Icon.jsx`, one 16×16 `currentColor` path each — no icon
  package, since any of them outweighs the two dozen shapes actually used. `bbcode-tags.test.js`
  fails on a tag pointing at an icon that does not exist. B/I/U stay letters, by convention. All icon buttons
  are strictly `size-8` (32×32px) without awkward hybrid text badges, using dedicated icons (`imgResize`,
  `altspoiler`, `block`, `listPlain`, `td1`).
- The five font sizes are a **dropdown**, not five buttons: Tiny 50, Small 85, Normal 100, Large 150,
  Huge 200. `sizeSpec(value)` builds the spec, so the dropdown goes through the same `applyTag` path.
- `insert()` reads the **live textarea value**, not the `code` from render. With the render value, two
  changes in one tick (typing then immediately clicking a button) let the stale text overwrite the
  newer one.
- `src/data/bbcodes.js` (`#/bbcodes`) is the tag reference, written in the `tables` shape from
  `reference.js` so `CodeTable` renders it and every row copies its tag. **`[blink]` is deliberately
  absent** — the user asked for it to be left out.
- `src/lib/bbcode-insert.js` holds `applyTag(text, start, end, spec)`, deliberately **pure and
  DOM-free** so the selection logic can be tested without a browser. `bbcode-insert.test.js` writes
  expected results with `«»` marking the selection.
- **No `prompt()`** for tags needing a value. `pick` names a substring of the inserted skeleton to
  select instead, so `[url=https://]` lands with `https://` highlighted and the user types over it.
  A modal dialog blocks the page and breaks the typing flow.
- `[hr]` is in `VOID` in the parser: it is not pushed on the stack, and a stray `[/hr]` is swallowed.
  Without that, a lone `[hr]` became a parent and every later line ended up as its children — which
  the preview drops, since it renders `hr` childless. The forum writes `[hr][/hr]`, so both spellings
  have to work.
- Supported tags beyond the Patrol Log set: `table`/`tr`/`th`/`td`/`td1`, `code`, `left`, `font`, `info`,
  `success`, `warn`, `error`, `progress`, `imageleft`, `aligntable`, `secspoiler`, `space`, `block`, `altspoiler`.
  The notice boxes carry **fixed forum colours**, not site theme tokens: what they imitate is the forum, not this
  page. `td1` supports custom cell background colors (e.g. `[td1=Red]` or `[td1=white]`). `divbox` supports
  color values including `maroon`, `beige`, and `black`. `secspoiler` supports an optional title parameter.
  `space` joins `hr` in `VOID`. `font` values are filtered by `SAFE_FONT` the way colours are by
  `SAFE_COLOR`. `src/lib/bbcode-example.js` holds the
  forum's real Patient Care Report, used both by the editor's "Muat contoh" button and as a parser
  fixture — it covers uppercase `[/LIST]`, paired `[hr][/hr]`, and a `[list]` left open until the
  closing `[/divbox]`.

### BBCode preview

`src/lib/bbcode.js` parses BBCode into a tree and `BBCodePreview.jsx` draws it as the forum would.
It reads **the generated BBCode**, not the form state, so the preview cannot drift from what the
copy button puts on the clipboard.

- It is not a general BBCode parser — only the tags the forum template uses are in `KNOWN`, and
  anything else is deliberately left visible as literal text rather than silently dropped.
- It must tolerate **unclosed tags**: the Patrol Log template opens `[list=0]` in Duty Information
  and never closes it (that is the forum's own template, and `patrol.test.js` pins it), so a
  dangling tag is closed when its parent closes or at end of input. `bbcode.test.js` covers that
  shape directly.
- The preview renders in the **system sans-serif**, not the site's IBM Plex Mono. That is both more
  faithful to the forum and the only way to get real bold: the subsetted site font ships weight 400
  only, so `<strong>` in Plex Mono would be synthetic bold. Its styles live in `.bbcode` in
  `index.css`, which also keeps `white-space: pre-wrap` — on the forum every newline is a line break.
- It is shared by Patrol Log and BBCode Builder, so a change here shows up in both.
- Colors from `[color=…]` are matched against `SAFE_COLOR` before reaching a style attribute, and
  both `[img]` and `[url]` only accept an `http(s)` address (`SAFE_URL`). That guard matters because
  Activity and Crew member are interpolated into the BBCode raw, so `[url=javascript:…]` can be typed
  into the form; a blocked address still shows its text, just not as a link.
  `BBCodePreview.test.jsx` covers each rejected scheme.

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

A group may declare `subgroups: [{ id, name }]`, and a category picks one with `subgroup: '<id>'`.
`Board.jsx` renders those one level in, under a smaller label with a left rule, in both the desktop
rail and the mobile grid. Two rules keep it from becoming a maintenance trap: a category **without**
`subgroup` still sits directly under its group heading, so existing groups needed no change, and an
**empty subgroup is not drawn at all** — it appears by itself once something lands in it. `Laporan`
declares `general` (BBCode Builder), `field` (Field Unit: Patrol Log, PCR, Vehicle Maintenance), `hospital`
(Hospital Unit), and `lspd` (LSPD: Request Criminal Record); Hospital Unit does not render today, because no
report has landed in it yet. `procedures.test.js` fails on a `subgroup` that its group does not declare,
and on duplicate subgroup ids.

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

`useRoute()` in `src/hooks.js` reads `location.hash` (`#/deat`, or `#/breathing#breathing-nrb` to target a
section) — no router library. The last category is mirrored to `localStorage` as the landing target;
every storage access is wrapped in `try/catch` and the page renders correctly without it.

**`route` carries a `nonce` that rises on every navigation, and the jump effect in `App.jsx` depends
on it.** Jumping to a section is an *event*, not a state: 80 of the 149 branches point at a section
inside their own category, so without a value that always changes, pressing a branch that targets the
section already in `route` — or pressing the same branch twice — changes nothing and the page sits
still. That was a production bug; `route.test.jsx` pins it. For the same reason `go()` records the
hash it wrote and the `hashchange` listener skips its own echo, otherwise one click jumps twice.
A navigation with **no** section jumps to the top of `main` (`id="isi"`), not the top of the document:
below `lg` the category board is a full-height grid above the content, so landing at document top
lands on the menu that was just tapped. `main`'s `lg:scroll-mt-96` is larger than its offset (150px),
which clamps the desktop jump to zero and keeps the header and flow bar in view.

### Layout

The page shell is `max-w-[100rem]` (1600px), widened from 1280px because the gutters ate too much
of a wide monitor. 1600 is a deliberate ceiling, not the largest that fits: the main column then runs
about 1280px, which is already around 150 monospace characters per line for a step row. Going wider
makes RP lines long enough to lose your place in. The shell border switches on at `min-[1616px]`
(1600 + the 16px gutter), and `Header.jsx` and `FlowBar.jsx` carry the same max width.

On desktop (`lg`+) the category board (`Board variant="rail"`) is its own column starting at the
very top of the page, `sticky top-0 h-dvh`, with the flow bar and header in the right-hand column.
That keeps the board ending exactly at the bottom of the screen; the search stays pinned and only
the category list scrolls, inside the board. Below `lg` the same component renders as the grid
menu (`variant="grid"`). Scrollbars are themed once in `index.css` (`scrollbar-color` on `html` is
inherited; `.scroll-thin` narrows a container's bar).

### Styling

Tailwind v4 via `@tailwindcss/vite`, no `tailwind.config.js` — tokens live in `@theme` in
`src/index.css`. Colors carry meaning rather than decoration: `alarm` red marks what is active and
what is broadcast, `signal` yellow marks what the character does, and `calm`/`mech`/`anim` separate
`/do` questions, server commands, and animation names. `.slab` is the Saira Condensed heading
treatment; reuse it instead of restyling headings inline.

There are **two themes, and light is the default** — deliberately not following
`prefers-color-scheme`, because the ask was for light by default, so an OS setting must not change it
quietly. `src/lib/theme.js` owns the logic (`readTheme`, `applyTheme`, `nextTheme`), `useTheme()` in
`hooks.js` wires it, and the button lives in `Header.jsx` at the top right. The theme is a
`data-theme` attribute on `<html>`; the dark palette **only redefines `--color-*` tokens** in
`index.css`, so no component knows which theme is on and adding a theme touches no component.

Token *names* are surface-neutral (`ink` is the page, `panel` is a card) so a theme change stays in
CSS — components never name a literal color. **The dark accents are their own values, not the light
ones reused**: the pink/purple/blue/orange that pass contrast on white go muddy on black. Every
channel colour and `muted` was measured against `--color-panel` in a real browser; all land between
5.25 and 12.98, above AA. `muted` needed lightening to `#87878f` to clear 4.5. `highlight` is the one
bright yellow, and it is fill-only — never use it as text color.

Two details that are easy to undo by accident:
- **`.bbcode` sets an explicit white background.** Its text is fixed at `#111` because it imitates a
  forum page, so on the dark theme it would otherwise be dark-on-dark. The preview stays a white
  sheet in both themes on purpose — that is what the forum looks like.
- **`index.html` carries a tiny inline script** that sets `data-theme` before the bundle runs, so a
  dark-theme user gets no white flash. It also updates `<meta name="theme-color">`, which is why
  `applyTheme()` does the same thing.

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
There is no server or API — this is 100% static output from `vite build`. The empty `previews`
block is required: Workers Builds runs `wrangler preview` for non-`main` branches, which refuses to
run without it.
