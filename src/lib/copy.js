/**
 * Menyusun teks yang masuk clipboard.
 *
 * Aturannya satu: yang tersalin hanyalah teks yang benar-benar diketik ke game.
 * Nomor shortcut, label, dan catatan tampilan tidak pernah ikut.
 */

/** Awalan chat per jenis langkah. Kosong berarti teksnya sudah lengkap sendiri. */
const PREFIXES = {
  me: '/me',
  do: '/do',
  radio: '/r',
  say: '',
  command: '',
  anim: '',
  note: '',
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
