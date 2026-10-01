import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { CATEGORIES, DEFAULT_CATEGORY } from './data/index.js'
import { writeClipboard } from './lib/copy.js'
import { applyLang, nextLang, readLang, writeLang } from './lib/lang.js'
import { applyTheme, nextTheme, readTheme, writeTheme } from './lib/theme.js'

const VALID = new Set(CATEGORIES.map((c) => c.id))
const STORE_KEY = 'lsfd:last-category'

function readStore() {
  try {
    const saved = localStorage.getItem(STORE_KEY)
    return VALID.has(saved) ? saved : null
  } catch {
    return null
  }
}

function writeStore(value) {
  try {
    localStorage.setItem(STORE_KEY, value)
  } catch {
    // penyimpanan tidak tersedia — halaman tetap jalan tanpa mengingat
  }
}

/** Membaca "#/deat" atau "#/breathing#breathing-nrb" jadi { category, section }. */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '')
  if (!raw) return { category: null, section: null }
  const [category, section] = raw.split('#')
  return { category: VALID.has(category) ? category : null, section: section || null }
}

/**
 * Kategori aktif disimpan di hash URL supaya tautan bisa dibagikan dan tombol
 * back peramban bekerja. Tanpa pustaka router — cukup hashchange.
 *
 * `nonce` naik satu di setiap perpindahan, dan itu bukan hiasan: melompat ke
 * sebuah bagian adalah *kejadian*, bukan keadaan. Delapan puluh percabangan di
 * situs ini menunjuk ke bagian di kategorinya sendiri, jadi tanpa penanda yang
 * selalu berubah, menekan tombol yang menuju bagian yang sedang aktif — atau
 * menekan tombol yang sama dua kali — tidak mengubah satu nilai pun, dan
 * halaman diam. Di produksi itu terbaca sebagai tombol yang tidak bisa diklik.
 */
export function useRoute() {
  const [route, setRoute] = useState(() => {
    const fromHash = parseHash()
    const base = fromHash.category ? fromHash : { category: readStore() ?? DEFAULT_CATEGORY, section: null }
    return { ...base, nonce: 0 }
  })

  // Hash yang kita tulis sendiri lewat `go`. Menulisnya memicu `hashchange`
  // juga, dan tanpa penjaga ini satu klik akan melompat dua kali: sekali dari
  // `go`, sekali dari gemanya. Yang disaring hanya gema itu — tombol back dan
  // forward peramban membawa hash lain, jadi tetap lolos.
  const own = useRef(null)

  useEffect(() => {
    const onChange = () => {
      if (own.current === location.hash) {
        own.current = null
        return
      }
      own.current = null
      const next = parseHash()
      if (next.category) setRoute((prev) => ({ ...next, nonce: prev.nonce + 1 }))
    }
    addEventListener('hashchange', onChange)
    return () => removeEventListener('hashchange', onChange)
  }, [])

  useEffect(() => {
    writeStore(route.category)
  }, [route.category])

  const go = useCallback((to) => {
    const [category, section] = String(to).split('#')
    if (!VALID.has(category)) return
    const hash = section ? `#/${category}#${section}` : `#/${category}`
    own.current = hash
    location.hash = hash
    setRoute((prev) => ({ category, section: section || null, nonce: prev.nonce + 1 }))
  }, [])

  return [route, go]
}

/**
 * Menyalin ke clipboard dan menahan penanda "tersalin" sebentar.
 * `status` berisi { key, ok } supaya baris yang diklik saja yang berubah.
 */
export function useCopy(holdMs = 1100) {
  const [status, setStatus] = useState(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (key, text) => {
      const ok = await writeClipboard(text)
      setStatus({ key, ok })
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus(null), holdMs)
      return ok
    },
    [holdMs],
  )

  return [status, copy]
}

/**
 * Tema terang/gelap. Nilainya dipasang sebagai `data-theme` di `<html>`, jadi
 * yang berubah cuma token warna di CSS — tidak ada komponen yang menerima prop
 * tema selain tombolnya sendiri.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    applyTheme(theme)
    writeTheme(theme)
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => nextTheme(t)), [])

  return [theme, toggle]
}

/**
 * Bahasa situs. Sama pola dengan `useTheme`: nilainya dipasang ke `<html lang>`
 * dan diingat di localStorage. Bawaannya Indonesia.
 */
export function useLang() {
  const [lang, setLang] = useState(readLang)

  useEffect(() => {
    applyLang(lang)
    writeLang(lang)
  }, [lang])

  const toggle = useCallback(() => setLang((l) => nextLang(l)), [])

  return [lang, toggle]
}
