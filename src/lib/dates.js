/**
 * Utilitas fleksibel untuk pemformatan tanggal dan Date of Birth (DoB).
 * Mendukung konversi antarformat yang umum diminta di berbagai template forum:
 * - DD/MM/YYYY (19/09/1999)
 * - MM/DD/YYYY (09/19/1999)
 * - YYYY-MM-DD (1999-09-19)
 * - DD MMM YYYY (19 Sep 1999)
 * - DD MMMM YYYY (19 September 1999)
 * - MMMM DD, YYYY (September 19, 1999)
 */

export const MONTHS = {
  id: {
    long: [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ],
    short: [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ],
  },
  en: {
    long: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    short: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
  },
}

export const DOB_FORMATS = [
  { id: 'DD/MM/YYYY', label: 'DD/MM/YYYY (19/09/1999)' },
  { id: 'MM/DD/YYYY', label: 'MM/DD/YYYY (09/19/1999)' },
  { id: 'DD MMM YYYY', label: 'DD MMM YYYY (19 Sep 1999)' },
  { id: 'DD MMMM YYYY', label: 'DD MMMM YYYY (19 September 1999)' },
  { id: 'YYYY-MM-DD', label: 'YYYY-MM-DD (1999-09-19)' },
]

/**
 * Mengurai string tanggal jadi { year, month, day } (1-indexed).
 * Mengembalikan null jika format tidak dapat dikenali.
 */
export function parseDateParts(input) {
  if (!input) return null
  const str = String(input).trim()

  // 1. ISO YYYY-MM-DD
  const isoMatch = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(str)
  if (isoMatch) {
    return {
      year: parseInt(isoMatch[1], 10),
      month: parseInt(isoMatch[2], 10),
      day: parseInt(isoMatch[3], 10),
    }
  }

  // 2. DD/MM/YYYY atau MM/DD/YYYY
  const slashMatch = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(str)
  if (slashMatch) {
    const a = parseInt(slashMatch[1], 10)
    const b = parseInt(slashMatch[2], 10)
    const year = parseInt(slashMatch[3], 10)

    // Jika a > 12 maka a pasti hari (DD/MM/YYYY)
    if (a > 12) {
      return { year, month: b, day: a }
    }
    // Jika b > 12 maka b pasti hari (MM/DD/YYYY)
    if (b > 12) {
      return { year, month: a, day: b }
    }
    // Default asumsi format internasional LSFD: DD/MM/YYYY
    return { year, month: b, day: a }
  }

  // 3. Tanggal dengan nama bulan, misal "19 Sep 1999" atau "19 September 1999"
  const nameMatch = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(str)
  if (nameMatch) {
    const day = parseInt(nameMatch[1], 10)
    const monthName = nameMatch[2].toLowerCase()
    const year = parseInt(nameMatch[3], 10)

    for (const lang of ['id', 'en']) {
      const idxLong = MONTHS[lang].long.findIndex((m) => m.toLowerCase() === monthName)
      if (idxLong !== -1) return { year, month: idxLong + 1, day }
      const idxShort = MONTHS[lang].short.findIndex((m) => m.toLowerCase() === monthName)
      if (idxShort !== -1) return { year, month: idxShort + 1, day }
    }
  }

  return null
}

/**
 * Format tanggal ke pola tertentu.
 * Jika input tidak bisa diurai, nilai aslinya dikembalikan apa adanya.
 */
export function formatDatePattern(input, pattern = 'DD/MM/YYYY', lang = 'id') {
  if (!input) return ''
  const parts = parseDateParts(input)
  if (!parts) return String(input).trim()

  const { year, month, day } = parts
  const dd = String(day).padStart(2, '0')
  const mm = String(month).padStart(2, '0')
  const yyyy = String(year)

  const dict = MONTHS[lang === 'en' ? 'en' : 'id']
  const monthNameLong = dict.long[month - 1] ?? mm
  const monthNameShort = dict.short[month - 1] ?? mm

  switch (pattern) {
    case 'MM/DD/YYYY':
      return `${mm}/${dd}/${yyyy}`
    case 'YYYY-MM-DD':
      return `${yyyy}-${mm}-${dd}`
    case 'DD MMM YYYY':
      return `${day} ${monthNameShort} ${yyyy}`
    case 'DD MMMM YYYY':
      return `${day} ${monthNameLong} ${yyyy}`
    case 'MMMM DD, YYYY':
      return `${monthNameLong} ${day}, ${yyyy}`
    case 'DD/MM/YYYY':
    default:
      return `${dd}/${mm}/${yyyy}`
  }
}
