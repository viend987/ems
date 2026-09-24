// @vitest-environment jsdom
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import { CATEGORIES } from './data/index.js'

describe('render halaman', () => {
  it('merender tanpa error dan memuat isi kategori awal', () => {
    const html = renderToString(<App />)
    expect(html).toContain('Los Santos')
    expect(html).toContain('Prosedur Awal')
    expect(html).toContain('mengambil ILS Bag')
  })

  it('menampilkan semua kategori di papan', () => {
    const html = renderToString(<App />)
    for (const cat of CATEGORIES) {
      const escaped = cat.name.replaceAll('&', '&amp;')
      expect(html, `kategori hilang: ${cat.name}`).toContain(escaped)
    }
  })

  it('tidak pernah menaruh nomor shortcut di dalam teks yang tersalin', () => {
    const html = renderToString(<App />)
    expect(html).not.toContain('(/54)')
  })
})
