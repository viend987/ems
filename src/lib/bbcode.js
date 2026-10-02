/**
 * Pengurai BBCode secukupnya untuk menampilkan pratinjau laporan forum.
 *
 * Bukan pengurai BBCode umum — cakupannya cuma tag yang benar-benar dipakai
 * template forum LSFD. Tag di luar daftar `KNOWN` sengaja dibiarkan tampil apa
 * adanya sebagai teks, supaya template yang belum didukung terlihat jelas
 * alih-alih hilang diam-diam.
 *
 * Satu hal yang wajib ditangani: template Patrol Log membuka `[list=0]` di
 * bagian Duty Information dan **tidak pernah menutupnya** — itu memang bentuk
 * template di forumnya, dan `patrol.test.js` mengunci BBCode-nya huruf demi
 * huruf. Jadi tag yang menggantung ditutup otomatis saat induknya ditutup atau
 * saat teks habis.
 */

const KNOWN = new Set([
  'divbox',
  'center',
  'right',
  'justify',
  'b',
  'i',
  'u',
  'size',
  'color',
  'list',
  '*',
  'quote',
  'spoiler',
  'img',
  'img-resize',
  'hr',
  'url',
  'table',
  'tr',
  'th',
  'td',
  'code',
  'left',
  'font',
  'info',
  'success',
  'warn',
  'error',
  'progress',
  'imageleft',
  'aligntable',
  'secspoiler',
  'space',
  'block',
  'altspoiler',
])

/** Tag yang berperilaku seperti blok: ujung spasinya dirapikan saat mengurai. */
const BLOCK = new Set([
  'root',
  'divbox',
  'center',
  'right',
  'justify',
  'list',
  '*',
  'quote',
  'spoiler',
  'secspoiler',
  'table',
  'tr',
  'th',
  'td',
  'code',
  'left',
  'info',
  'success',
  'warn',
  'error',
  'aligntable',
  'block',
  'altspoiler',
])

const TAG = /\[(\/?)([a-z0-9*-]+)(?:=([^\]\n]*))?\]/gi

/**
 * Tag tanpa isi. Forum menulisnya berpasangan (`[hr][/hr]`), tapi `[hr]` sendiri
 * juga sah — kalau ia ikut ditumpuk, semua teks sesudahnya jadi isinya dan
 * hilang saat digambar, karena pratinjau membuang isi `hr`.
 */
const VOID = new Set(['hr', 'space'])

function openTagIndex(stack, name) {
  for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === name) return i
  return -1
}

/** Rapikan spasi di ujung isi blok, supaya pratinjau tidak penuh baris kosong. */
function trimEdges(node) {
  if (typeof node === 'string') return node

  const kids = node.children.map(trimEdges)
  if (BLOCK.has(node.tag)) {
    if (typeof kids[0] === 'string') kids[0] = kids[0].trimStart()
    const last = kids.length - 1
    if (last >= 0 && typeof kids[last] === 'string') kids[last] = kids[last].trimEnd()
  }
  node.children = kids.filter((k) => k !== '')
  return node
}

/**
 * Mengurai BBCode jadi pohon `{ tag, value, children }`; teks biasa jadi string.
 * Simpul akar bertag `root`.
 */
export function parseBBCode(input) {
  const root = { tag: 'root', value: '', children: [] }
  const stack = [root]
  const top = () => stack[stack.length - 1]
  const ensureListItem = () => {
    if (top().tag === 'list') {
      const item = { tag: '*', value: '', children: [] }
      top().children.push(item)
      stack.push(item)
    }
  }
  const pushText = (text) => {
    if (!text) return
    if (top().tag === 'list') {
      if (text.trim() === '') return
      ensureListItem()
    }
    top().children.push(text)
  }

  let last = 0
  TAG.lastIndex = 0
  for (let match; (match = TAG.exec(input)); ) {
    const name = match[2].toLowerCase()
    if (!KNOWN.has(name)) continue

    if (match[1] === '/') {
      // Penutup tag tanpa isi cukup ditelan; pembukanya sudah lengkap.
      if (VOID.has(name)) {
        pushText(input.slice(last, match.index))
        last = TAG.lastIndex
        continue
      }
      const at = openTagIndex(stack, name)
      if (at < 1) continue // penutup tanpa pembuka — biarkan jadi teks
      pushText(input.slice(last, match.index))
      last = TAG.lastIndex
      stack.length = at // tag yang belum ditutup ikut tertutup di sini
      continue
    }

    pushText(input.slice(last, match.index))
    last = TAG.lastIndex

    // [*] tidak punya penutup: item berikutnya yang menutup item sebelumnya.
    if (name === '*' && top().tag === '*') stack.pop()

    // Kalau tag selain [*] dibuka langsung di dalam [list], bungkus otomatis ke item [*].
    if (top().tag === 'list' && name !== '*') ensureListItem()

    const node = { tag: name, value: match[3] ?? '', children: [] }
    top().children.push(node)
    if (!VOID.has(name)) stack.push(node)

    // [code] menampilkan isi mentah: tag di dalamnya tidak diurai.
    if (name === 'code') {
      const closePattern = /\[\/code\]/gi
      closePattern.lastIndex = TAG.lastIndex
      const closeMatch = closePattern.exec(input)
      if (closeMatch) {
        const raw = input.slice(TAG.lastIndex, closeMatch.index)
        if (raw) node.children.push(raw)
        stack.pop() // close [code]
        last = closeMatch.index + closeMatch[0].length
        TAG.lastIndex = last
      } else {
        const raw = input.slice(TAG.lastIndex)
        if (raw) node.children.push(raw)
        stack.pop()
        last = input.length
        TAG.lastIndex = last
      }
    }
  }

  pushText(input.slice(last))
  return trimEdges(root)
}

/** Seluruh teks di dalam sebuah simpul — dipakai membaca URL di dalam [img]. */
export function textOf(node) {
  if (typeof node === 'string') return node
  return node.children.map(textOf).join('')
}
