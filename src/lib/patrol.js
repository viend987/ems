/**
 * Generator BBCode Weekly Patrol Log.
 *
 * Template-nya ditulis sekali di sini, persis seperti template forum LSFD,
 * supaya pemain tidak perlu mencari bagian mana dari BBCode yang harus diubah.
 */

/** Durasi duty minimal per laporan, dalam menit. */
export const MIN_DUTY_MINUTES = 60

const HEADER_IMAGE = 'https://i.postimg.cc/YSmH9hxj/image.png'

function toMinutes(time) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time ?? '')
  if (!match) return null
  const [h, m] = [Number(match[1]), Number(match[2])]
  if (h > 23 || m > 59) return null
  return h * 60 + m
}

/**
 * Lama duty dari jam mulai ke jam selesai. Jam selesai yang lebih kecil dari
 * jam mulai dianggap melewati tengah malam (23:30 → 00:45 = 75 menit).
 * Mengembalikan null kalau salah satu jam belum diisi.
 */
export function durationMinutes(start, end) {
  const a = toMinutes(start)
  const b = toMinutes(end)
  if (a === null || b === null) return null
  return (b - a + 1440) % 1440
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (!h) return `${m} menit`
  return m ? `${h} jam ${m} menit` : `${h} jam`
}

/** "2026-09-21" (nilai <input type="date">) → "21/09/2026", format di forum. */
export function formatDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '')
  return match ? `${match[3]}/${match[2]}/${match[1]}` : ''
}

/** Tanggal hari ini dalam format <input type="date">, menurut jam lokal. */
export function todayIso(now = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/**
 * Link halaman imgur (imgur.com/ZKAMl8M) tidak tampil di dalam [img] — yang
 * dibutuhkan link gambar langsung (i.imgur.com/ZKAMl8M.jpeg). Link halaman
 * satu gambar diubah otomatis; link album (/a/...) tidak bisa, jadi dibiarkan
 * dan ditandai oleh isImageUrl().
 */
export function normalizeImageUrl(raw) {
  const url = (raw ?? '').trim()
  const page = /^https?:\/\/(?:www\.|m\.)?imgur\.com\/([A-Za-z0-9]{5,10})$/.exec(url)
  return page ? `https://i.imgur.com/${page[1]}.jpeg` : url
}

/** Link yang layak masuk [img]: http(s) dan bukan halaman/album imgur. */
export function isImageUrl(url) {
  if (!/^https?:\/\/\S+$/.test(url)) return false
  return !/^https?:\/\/(?:www\.|m\.)?imgur\.com\//.test(url)
}

/**
 * Daftar hal yang membuat laporan belum layak dikirim. Kosong berarti siap.
 * Durasi di bawah satu jam sengaja dijadikan penghalang, bukan sekadar
 * peringatan — laporan seperti itu tidak memenuhi syarat duty mingguan.
 */
export function problems(form) {
  const list = []
  if (!form.staff) list.push('Pilih nama anggota.')
  if (!formatDate(form.date)) list.push('Tanggal duty belum diisi.')
  if (!form.start) list.push('Start Time belum diisi.')
  if (!form.end) list.push('End Time belum diisi.')

  const minutes = durationMinutes(form.start, form.end)
  if (minutes !== null && minutes < MIN_DUTY_MINUTES) {
    list.push(
      `Durasi duty baru ${formatDuration(minutes)}. Minimal ${MIN_DUTY_MINUTES} menit dari Start Time ke End Time.`,
    )
  }

  for (const [key, label] of [
    ['startImage', 'Start Time'],
    ['endImage', 'End Time'],
  ]) {
    const url = normalizeImageUrl(form[key])
    if (!url) list.push(`Gambar bukti ${label} belum diisi.`)
    else if (!isImageUrl(url)) {
      list.push(`Link gambar ${label} bukan link gambar langsung (contoh: https://i.imgur.com/xxxx.jpeg).`)
    }
  }

  if (!form.activity?.trim()) list.push('Activity belum diisi.')
  return list
}

const spoiler = (url) => (url ? `[spoiler][img]${url}[/img][/spoiler]` : '[spoiler][/spoiler]')

export function buildPatrolLog(form) {
  const staff = form.staff ?? {}
  const crew = form.crew?.trim() || 'N/A'
  const activity = (form.activity ?? '').trim()

  return `[divbox=white][center][img-resize=200]${HEADER_IMAGE}[/img-resize]
[hr][/hr]
[size=150][b]Patrol Note[/b][/size]
[hr][/hr]
[/center]

[divbox=maroon][b][color=#FFFFFF][center][size=150]PERSONAL DETAILS[/size][/center][/color][/b][/divbox]
[list=0][*][b]Name[/b] : ${staff.name ?? ''}
[*][b]Badge Number[/b] : ${staff.badge ?? ''}
[*][b]Rank[/b] : ${staff.rank ?? ''}
[*][b]District[/b] : ${staff.district ?? ''}
[/list]

[divbox=maroon][b][color=#FFFFFF][center][size=150]DUTY INFORMATION[/size][/center][/color][/b][/divbox]
[list=0][*][b]Date[/b] : ${formatDate(form.date)}
[*][b]Crew member[/b] : ${crew}
[*][b]Start Time[/b] : ${form.start ?? ''}
${spoiler(normalizeImageUrl(form.startImage))}
[*][b]End Time[/b] : ${form.end ?? ''}
${spoiler(normalizeImageUrl(form.endImage))}
[*][b]Activity[/b] :
[quote][justify]${activity}[/justify][/quote]


[right][b]Regards,[/b]
${staff.signature ? `[img]${staff.signature}[/img]` : '[i]Signature[/i]'}
${staff.name ?? 'Name'}[/right][/divbox]`
}
