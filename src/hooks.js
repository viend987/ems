import { useCallback, useEffect, useRef, useState } from 'react'
import { CATEGORIES, DEFAULT_CATEGORY } from './data/index.js'
import { writeClipboard } from './lib/copy.js'

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

/** Membaca "#/deat" atau "#/abc#breathing-nrb" jadi { category, section }. */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '')
  if (!raw) return { category: null, section: null }
  const [category, section] = raw.split('#')
  return { category: VALID.has(category) ? category : null, section: section || null }
}

/**
 * Kategori aktif disimpan di hash URL supaya tautan bisa dibagikan dan tombol
 * back peramban bekerja. Tanpa pustaka router — cukup hashchange.
 */
export function useRoute() {
  const [route, setRoute] = useState(() => {
    const fromHash = parseHash()
    if (fromHash.category) return fromHash
    return { category: readStore() ?? DEFAULT_CATEGORY, section: null }
  })

  useEffect(() => {
    const onChange = () => {
      const next = parseHash()
      if (next.category) setRoute(next)
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
    location.hash = section ? `#/${category}#${section}` : `#/${category}`
    setRoute({ category, section: section || null })
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
