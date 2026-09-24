/**
 * Menyusun teks yang masuk clipboard.
 *
 * Aturannya satu: yang tersalin hanyalah teks yang benar-benar diketik ke game.
 * Nomor shortcut, label, dan catatan tampilan tidak pernah ikut.
 */

/**
 * Awalan chat per jenis langkah. Kosong berarti teksnya sudah lengkap sendiri.
 *
 * Awalan tidak pernah disimpan di data — ia diturunkan dari `kind`, sehingga
 * satu tempat menentukan teks yang tersalin sekaligus warnanya di layar.
 */
const PREFIXES = {
  me: '/me', // aksi karakter
  do: '/do', // keadaan atau pertanyaan untuk lawan RP
  say: '', // bicara biasa, tanpa awalan
  shout: '/s', // berteriak
  radio: '/r', // radio internal LSFD
  ooc: '/ro', // OOC lewat radio LSFD
  deptradio: '/d', // radio antar departemen
  deptooc: '/od', // OOC antar departemen
  command: '', // command mekanik, teksnya sudah termasuk garis miring
  anim: '', // nama animasi
  note: '', // catatan pedoman, tidak bisa disalin
}

export const KINDS = Object.keys(PREFIXES)

/** Jenis yang tidak pernah punya tombol salin. */
export const isCopyable = (step) => step.kind !== 'note'

export function prefixOf(step) {
  if (step.prefix) return step.prefix
  return PREFIXES[step.kind] ?? ''
}

export function copyText(step) {
  if (!isCopyable(step)) return ''
  const prefix = prefixOf(step)
  return prefix ? `${prefix} ${step.text}` : step.text
}

export function copySection(section) {
  return section.steps.filter(isCopyable).map(copyText).join('\n')
}

/**
 * Menyalin ke clipboard. Mengembalikan true kalau berhasil.
 *
 * Memakai Clipboard API bila tersedia; kalau tidak (mis. halaman dibuka lewat
 * koneksi tidak aman), turun ke textarea sementara.
 */
export async function writeClipboard(text) {
  if (!text) return false

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // jatuh ke cara lama di bawah
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  } catch {
    return false
  }
}
