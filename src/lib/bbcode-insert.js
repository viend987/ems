/**
 * Menyisipkan tag BBCode ke dalam teks yang sedang diedit.
 *
 * Fungsinya murni — tidak menyentuh DOM — supaya logika seleksi, bagian yang
 * paling rawan salah, bisa diuji tanpa browser. Komponen cuma menyuplai isi
 * textarea beserta rentang seleksinya, lalu memakai rentang yang dikembalikan
 * untuk menyorot ulang.
 *
 * Bentuk spec-nya ada di `bbcode-tags.js`.
 */

export function applyTag(text, selStart, selEnd, spec) {
  const from = Math.min(selStart, selEnd)
  const to = Math.max(selStart, selEnd)

  const pad = (at) => (at > 0 && text[at - 1] !== '\n' ? '\n' : '')
  const padAfter = (at) => (at < text.length && text[at] !== '\n' ? '\n' : '')

  // Tag mandiri ([hr], [*]) tidak membungkus apa pun: ia disisipkan sesudah
  // seleksi, dan teks yang terpilih dibiarkan utuh.
  if (spec.solo) {
    const lead = spec.block ? pad(to) : ''
    const trail = spec.block ? padAfter(to) : ''
    const caret = to + lead.length + spec.before.length
    return {
      text: text.slice(0, to) + lead + spec.before + trail + text.slice(to),
      start: caret,
      end: caret,
    }
  }

  const body = text.slice(from, to) || spec.body || ''
  const wrapped = spec.before + body + (spec.after ?? '')
  const lead = spec.block ? pad(from) : ''
  const trail = spec.block ? padAfter(to) : ''
  const next = text.slice(0, from) + lead + wrapped + trail + text.slice(to)
  const base = from + lead.length

  // Nilai yang harus diisi lebih dulu — alamat, ukuran, warna — yang disorot,
  // bukan isinya, supaya tinggal ditimpa ketikan.
  if (spec.pick) {
    const at = wrapped.indexOf(spec.pick)
    if (at >= 0) return { text: next, start: base + at, end: base + at + spec.pick.length }
  }

  const at = base + spec.before.length
  return { text: next, start: at, end: at + body.length }
}
