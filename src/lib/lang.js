/**
 * Bahasa situs. Bawaannya Indonesia; `en` dipakai kalau yang diajak RP memakai
 * bahasa Inggris, supaya balasan yang disalin tidak beda bahasa dengan lawannya.
 *
 * Teks Inggris **ditulis tangan**, tidak diterjemahkan mesin. Baris RP di sini
 * penuh istilah server — RA Unit, Engine, RPLY, Code 3, 10-code, dan `/me` yang
 * harus naratif orang ketiga — dan mesin justru salah tepat di bagian itu. Jadi
 * setiap baris RP baru wajib ditulis dua kali: `text` dan `en`.
 *
 * Kelompok Laporan sengaja tidak terpengaruh isinya: BBCode yang dihasilkan,
 * termasuk template Patrol Log dan nama tag, tidak pernah diterjemahkan. Yang
 * ikut bahasa cuma label antarmukanya.
 */

export const LANGS = ['id', 'en']
export const DEFAULT_LANG = 'id'

const STORE_KEY = 'lsfd:lang'

export const isLang = (value) => LANGS.includes(value)

export const nextLang = (lang) => (lang === 'en' ? 'id' : 'en')

export function readLang() {
  try {
    const saved = localStorage.getItem(STORE_KEY)
    if (isLang(saved)) return saved
  } catch {
    // penyimpanan tidak tersedia
  }
  return DEFAULT_LANG
}

export function writeLang(lang) {
  try {
    localStorage.setItem(STORE_KEY, lang)
  } catch {
    // halaman tetap jalan tanpa mengingat pilihan
  }
}

/** Menandai bahasa dokumen, supaya pembaca layar memakai pelafalan yang benar. */
export function applyLang(lang, doc = document) {
  const value = isLang(lang) ? lang : DEFAULT_LANG
  doc.documentElement.lang = value
  return value
}

/**
 * Teks sebuah langkah. Ini perkecualian dari pola `<field>En`: field-nya `en`,
 * bukan `textEn`. Inilah field yang paling banyak ditulis — 500-an baris — jadi
 * nama pendek terbayar, sementara field lain tetap memakai pola panjangnya.
 */
export function stepText(step, lang) {
  if (lang === 'en' && typeof step.en === 'string' && step.en !== '') return step.en
  return step.text
}

/**
 * Mengambil satu field dari objek data sesuai bahasa: `pick(step, 'text', 'en')`
 * membaca `step.textEn`.
 *
 * Kalau terjemahannya belum ada, yang dikembalikan versi Indonesia — halaman
 * tetap utuh selama penerjemahan dikerjakan bertahap, tidak ada teks yang
 * hilang atau muncul sebagai `undefined`. `procedures.test.js` yang melaporkan
 * seberapa jauh tiap kategori sudah diterjemahkan.
 */
export function pick(obj, field, lang) {
  if (!obj) return undefined
  if (lang === 'en') {
    const en = obj[`${field}En`]
    if (typeof en === 'string' && en !== '') return en
  }
  return obj[field]
}
