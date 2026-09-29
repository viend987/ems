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
 * Setiap tag di sini wajib ada di `KNOWN` pada `bbcode.js`, kalau tidak
 * pratinjaunya akan menampilkannya sebagai teks biasa. `bbcode-tags.test.js`
 * yang menjaga itu.
 */

export const TAG_GROUPS = [
  {
    id: 'format',
    name: 'Format',
    tags: [
      { id: 'b', label: 'B', title: 'Tebal', before: '[b]', after: '[/b]', key: 'b' },
      { id: 'i', label: 'I', title: 'Miring', before: '[i]', after: '[/i]', key: 'i' },
      { id: 'u', label: 'U', title: 'Garis bawah', before: '[u]', after: '[/u]', key: 'u' },
      {
        id: 'size',
        label: 'Size',
        title: 'Ukuran huruf — angkanya langsung tersorot, tinggal ditimpa',
        before: '[size=150]',
        after: '[/size]',
        pick: '150',
      },
      {
        id: 'color',
        label: 'Color',
        title: 'Warna huruf — kode warnanya langsung tersorot',
        before: '[color=#FFFFFF]',
        after: '[/color]',
        pick: '#FFFFFF',
      },
    ],
  },
  {
    id: 'blok',
    name: 'Tata letak',
    tags: [
      {
        id: 'divbox',
        label: 'Divbox',
        title: 'Kotak putih — badan postingan',
        before: '[divbox=white]',
        after: '[/divbox]',
        block: true,
      },
      {
        id: 'divbox-maroon',
        label: 'Divbox maroon',
        title: 'Batang maroon — judul bagian',
        before: '[divbox=maroon]',
        after: '[/divbox]',
        block: true,
      },
      { id: 'center', label: 'Tengah', title: 'Rata tengah', before: '[center]', after: '[/center]', block: true },
      { id: 'right', label: 'Kanan', title: 'Rata kanan', before: '[right]', after: '[/right]', block: true },
      {
        id: 'justify',
        label: 'Justify',
        title: 'Rata kanan-kiri',
        before: '[justify]',
        after: '[/justify]',
        block: true,
      },
      {
        id: 'list',
        label: 'List',
        title: 'Daftar tanpa bullet, seperti template forum',
        before: '[list=0]\n[*]',
        after: '\n[/list]',
        block: true,
      },
      { id: 'item', label: '[*] Item', title: 'Item daftar baru', before: '[*]', solo: true, block: true },
      { id: 'quote', label: 'Quote', title: 'Kutipan', before: '[quote]', after: '[/quote]', block: true },
      { id: 'spoiler', label: 'Spoiler', title: 'Bagian yang disembunyikan', before: '[spoiler]', after: '[/spoiler]', block: true },
      { id: 'hr', label: 'Garis', title: 'Garis pemisah', before: '[hr][/hr]', solo: true, block: true },
    ],
  },
  {
    id: 'media',
    name: 'Media & tautan',
    tags: [
      {
        id: 'img',
        label: 'Img',
        title: 'Gambar — tempel alamatnya menimpa yang tersorot',
        before: '[img]',
        after: '[/img]',
        body: 'https://',
      },
      {
        id: 'img-resize',
        label: 'Img ukuran',
        title: 'Gambar dengan lebar tertentu — angkanya tersorot lebih dulu',
        before: '[img-resize=200]',
        after: '[/img-resize]',
        body: 'https://',
        pick: '200',
      },
      {
        id: 'url',
        label: 'Tautan',
        title: 'Tautan — alamatnya tersorot lebih dulu',
        before: '[url=https://]',
        after: '[/url]',
        body: 'teks tautan',
        pick: 'https://',
      },
      {
        id: 'table',
        label: 'Tabel',
        title: 'Kerangka tabel 2×2',
        before: '[table]\n[tr][th]',
        after: '[/th][th][/th][/tr]\n[tr][td][/td][td][/td][/tr]\n[/table]',
        body: 'Judul',
        block: true,
      },
    ],
  },
]

/** Semua spec dalam satu daftar rata — dipakai pintasan papan tuts dan tes. */
export const TAGS = TAG_GROUPS.flatMap((group) => group.tags)

/** Pintasan Ctrl+B / Ctrl+I / Ctrl+U. */
export const SHORTCUTS = new Map(TAGS.filter((t) => t.key).map((t) => [t.key, t]))
