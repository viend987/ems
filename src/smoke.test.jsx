// @vitest-environment jsdom
import { render } from 'preact'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.jsx'
import { CATEGORIES } from './data/index.js'

// Render sungguhan ke DOM jsdom, bukan ke string — sekaligus memastikan efek
// (hashchange, keydown) terpasang tanpa error.
function mount() {
  const root = document.createElement('div')
  document.body.append(root)
  render(<App />, root)
  return root
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('render halaman', () => {
  it('merender tanpa error dan memuat isi kategori awal', () => {
    const text = mount().textContent
    expect(text).toContain('Los Santos')
    expect(text).toContain('Danger (kondisional)')
    expect(text).toContain('mengambil ILS Bag')
  })

  it('menampilkan semua kategori di papan', () => {
    const text = mount().textContent
    for (const cat of CATEGORIES) expect(text, `kategori hilang: ${cat.name}`).toContain(cat.name)
  })

  it('tidak pernah menaruh nomor shortcut di dalam teks yang tersalin', () => {
    expect(mount().textContent).not.toContain('(/54)')
  })

  it('penanda salin pindah ke baris yang diklik dan tidak nyangkut di baris lama', async () => {
    const root = mount()
    const tick = () => new Promise((r) => setTimeout(r, 0))
    const marker = (btn) => btn.querySelector('span').textContent

    // Baris langkah bernomor di kategori awal, mis. /51 dan /52.
    const rows = [...root.querySelectorAll('button[title="Klik untuk menyalin"]')].filter((b) =>
      marker(b).startsWith('/'),
    )
    const [a, b] = rows
    const numA = marker(a)
    const numB = marker(b)

    a.click()
    await tick()
    await tick()
    expect(marker(a)).not.toBe(numA)
    expect(marker(b)).toBe(numB)

    b.click()
    await tick()
    await tick()
    expect(marker(b)).not.toBe(numB)
    expect(marker(a), 'penanda lama harus kembali jadi nomor').toBe(numA)
  })
})
