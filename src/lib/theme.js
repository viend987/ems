/**
 * Tema terang/gelap. Bawaannya **terang**, dan sengaja tidak mengikuti
 * `prefers-color-scheme`: yang diminta adalah terang sebagai bawaan, jadi
 * setelan sistem tidak boleh mengubahnya diam-diam. Pilihan pengguna diingat
 * di localStorage.
 *
 * Nilai temanya ditaruh sebagai `data-theme` di `<html>`, dan seluruh palet
 * gelap cuma mendefinisikan ulang token `--color-*` di `index.css`. Komponen
 * tidak pernah tahu tema apa yang aktif — itu yang membuat penambahan tema
 * tidak menyentuh satu komponen pun.
 */

export const THEMES = ['light', 'dark']
export const DEFAULT_THEME = 'light'

const STORE_KEY = 'lsfd:theme'

/** Warna bilah browser di ponsel, disamakan dengan `--color-ink` tiap tema. */
const BAR_COLOR = { light: '#FFFFFF', dark: '#0A0A0B' }

export const isTheme = (value) => THEMES.includes(value)

export const nextTheme = (theme) => (theme === 'dark' ? 'light' : 'dark')

export function readTheme() {
  try {
    const saved = localStorage.getItem(STORE_KEY)
    if (isTheme(saved)) return saved
  } catch {
    // penyimpanan tidak tersedia
  }
  return DEFAULT_THEME
}

export function writeTheme(theme) {
  try {
    localStorage.setItem(STORE_KEY, theme)
  } catch {
    // halaman tetap jalan tanpa mengingat pilihan
  }
}

/**
 * Menerapkan tema ke dokumen. Dipakai komponen maupun skrip kecil di
 * `index.html` yang jalan sebelum bundel, supaya tidak ada kedip putih.
 */
export function applyTheme(theme, doc = document) {
  const value = isTheme(theme) ? theme : DEFAULT_THEME
  doc.documentElement.dataset.theme = value
  doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOR[value])
  return value
}
