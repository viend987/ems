/**
 * Katalog tombol toolbar BBCode Builder, sengaja berbentuk data dan bukan JSX:
 * menambah tag baru cukup satu objek di sini, komponennya tidak berubah.
 *
 * Bentuk spec-nya dibaca `applyTag()` di `bbcode-insert.js`:
 *
 * - `before` / `after` — tag pembuka dan penutup yang mengapit isi.
 * - `body`    — isi bawaan kalau tidak ada teks yang terpilih.
 * - `pick`    — potongan yang disorot setelah disisipkan; dipakai untuk nilai
 *               yang harus diisi lebih dulu (alamat, ukuran, warna).
 * - `block`   — tag berdiri di barisnya sendiri.
 * - `solo`    — tidak membungkus apa pun, cuma disisipkan.
 *
 * Tampilannya: `icon` menunjuk bentuk di `Icon.jsx`, `label` dipakai kalau tag
 * itu memang lebih jelas sebagai huruf (B, I, U). `name` adalah nama Inggris
 * yang muncul sebagai tooltip dan label pembaca layar — penamaannya Inggris
 * supaya sejalan dengan tag yang disisipkannya.
 *
 * Setiap tag di sini wajib ada di `KNOWN` pada `bbcode.js`, kalau tidak
 * pratinjaunya akan menampilkannya sebagai teks biasa. `bbcode-tags.test.js`
 * yang menjaga itu.
 */

/**
 * Ukuran huruf yang dipakai forum. Disajikan sebagai dropdown, bukan tombol,
 * karena lima pilihan berderet cuma memakan tempat.
 */
export const SIZES = [
  { label: 'Tiny', value: 50 },
  { label: 'Small', value: 85 },
  { label: 'Normal', value: 100 },
  { label: 'Large', value: 150 },
  { label: 'Huge', value: 200 },
]

export const sizeSpec = (value) => ({
  id: `size-${value}`,
  name: `Font size ${value}`,
  before: `[size=${value}]`,
  after: '[/size]',
})

export const TAG_GROUPS = [
  {
    id: 'text',
    name: 'Text',
    tags: [
      { id: 'b', label: 'B', name: 'Bold', before: '[b]', after: '[/b]', key: 'b' },
      { id: 'i', label: 'I', name: 'Italic', before: '[i]', after: '[/i]', key: 'i' },
      { id: 'u', label: 'U', name: 'Underline', before: '[u]', after: '[/u]', key: 'u' },
      {
        id: 'color',
        icon: 'color',
        name: 'Text colour — the colour code is selected first',
        before: '[color=#FFFFFF]',
        after: '[/color]',
        pick: '#FFFFFF',
      },
      {
        id: 'font',
        icon: 'font',
        name: 'Font family — the font name is selected first',
        before: '[font=Arial]',
        after: '[/font]',
        pick: 'Arial',
      },
    ],
  },
  {
    id: 'align',
    name: 'Alignment',
    tags: [
      { id: 'left', icon: 'left', name: 'Align left', before: '[left]', after: '[/left]', block: true },
      { id: 'center', icon: 'center', name: 'Align centre', before: '[center]', after: '[/center]', block: true },
      { id: 'right', icon: 'right', name: 'Align right', before: '[right]', after: '[/right]', block: true },
      {
        id: 'justify',
        icon: 'justify',
        name: 'Justify',
        before: '[justify]',
        after: '[/justify]',
        block: true,
      },
    ],
  },
  {
    id: 'blocks',
    name: 'Blocks',
    tags: [
      {
        id: 'divbox',
        icon: 'box',
        name: 'Divbox (white) — the body of a post',
        before: '[divbox=white]',
        after: '[/divbox]',
        block: true,
      },
      {
        id: 'divbox-maroon',
        icon: 'boxFilled',
        name: 'Divbox (maroon) — a section heading bar',
        before: '[divbox=maroon]',
        after: '[/divbox]',
        block: true,
      },
      {
        id: 'list',
        icon: 'list',
        name: 'Bulleted list',
        before: '[list]\n[*]',
        after: '\n[/list]',
        block: true,
      },
      {
        id: 'list-numbered',
        icon: 'listNumbered',
        name: 'Numbered list',
        before: '[list=1]\n[*]',
        after: '\n[/list]',
        block: true,
      },
      {
        id: 'list-plain',
        icon: 'listPlain',
        name: 'Plain list, no bullets — what the forum templates use',
        before: '[list=0]\n[*]',
        after: '\n[/list]',
        block: true,
      },
      { id: 'item', icon: 'item', name: 'List item', before: '[*]', solo: true, block: true },
      { id: 'quote', icon: 'quote', name: 'Quote', before: '[quote]', after: '[/quote]', block: true },
      { id: 'code', icon: 'code', name: 'Code block', before: '[code]', after: '[/code]', block: true },
      {
        id: 'spoiler',
        icon: 'spoiler',
        name: 'Spoiler',
        before: '[spoiler]',
        after: '[/spoiler]',
        block: true,
      },
      {
        id: 'altspoiler',
        icon: 'altspoiler',
        name: 'Titled spoiler — the title is selected first',
        before: '[altspoiler=Title]',
        after: '[/altspoiler]',
        pick: 'Title',
        block: true,
      },
      {
        id: 'secspoiler',
        icon: 'lock',
        name: 'Secure spoiler — hidden until the reader replies',
        before: '[secspoiler]',
        after: '[/secspoiler]',
        block: true,
      },
      {
        id: 'block',
        icon: 'block',
        name: 'Bordered block container — parameters are selected first',
        before: '[block=transparent,1,black,10,10,10]',
        after: '[/block]',
        pick: 'transparent,1,black,10,10,10',
        block: true,
      },
      { id: 'hr', icon: 'hr', name: 'Horizontal rule', before: '[hr][/hr]', solo: true, block: true },
      { id: 'space', icon: 'space', name: 'Vertical space', before: '[space][/space]', solo: true, block: true },
    ],
  },
  {
    id: 'notices',
    name: 'Notices',
    tags: [
      { id: 'info', icon: 'info', name: 'Info box', before: '[info]', after: '[/info]', block: true },
      { id: 'success', icon: 'success', name: 'Success box', before: '[success]', after: '[/success]', block: true },
      { id: 'warn', icon: 'warn', name: 'Warning box', before: '[warn]', after: '[/warn]', block: true },
      { id: 'error', icon: 'error', name: 'Error box', before: '[error]', after: '[/error]', block: true },
      {
        id: 'progress',
        icon: 'progress',
        name: 'Progress bar — the percentage is selected first',
        before: '[progress=50]',
        after: '[/progress]',
        pick: '50',
        block: true,
      },
    ],
  },
  {
    id: 'media',
    name: 'Media & links',
    tags: [
      {
        id: 'img',
        icon: 'image',
        name: 'Image — paste the address over the selected text',
        before: '[img]',
        after: '[/img]',
        body: 'https://',
      },
      {
        id: 'img-resize',
        icon: 'imgResize',
        name: 'Image at a set width — the width is selected first',
        before: '[img-resize=200]',
        after: '[/img-resize]',
        body: 'https://',
        pick: '200',
      },
      {
        id: 'imageleft',
        icon: 'imageLeft',
        name: 'Image floated left, text wrapping beside it',
        before: '[imageleft]',
        after: '[/imageleft]',
        body: 'https://',
      },
      {
        id: 'url',
        icon: 'link',
        name: 'Link — the address is selected first',
        before: '[url=https://]',
        after: '[/url]',
        body: 'link text',
        pick: 'https://',
      },
      {
        id: 'table',
        icon: 'table',
        name: 'Table, 2×2 skeleton',
        before: '[table]\n[tr][th]',
        after: '[/th][th][/th][/tr]\n[tr][td][/td][td][/td][/tr]\n[/table]',
        body: 'Heading',
        block: true,
      },
      {
        id: 'td1',
        icon: 'td1',
        name: 'Colored table cell — color is selected first',
        before: '[td1=red]',
        after: '[/td1]',
        body: 'Cell',
        pick: 'red',
        block: true,
      },
      {
        id: 'aligntable',
        icon: 'tableCentered',
        name: 'Centre a table on the page',
        before: '[aligntable]',
        after: '[/aligntable]',
        block: true,
      },
    ],
  },
]

/** Semua spec dalam satu daftar rata — dipakai pintasan papan tuts dan tes. */
export const TAGS = TAG_GROUPS.flatMap((group) => group.tags)

/** Pintasan Ctrl+B / Ctrl+I / Ctrl+U. */
export const SHORTCUTS = new Map(TAGS.filter((t) => t.key).map((t) => [t.key, t]))
