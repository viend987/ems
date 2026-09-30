import { describe, expect, it } from 'vitest'
import { searchAll } from './search.js'

describe('searchAll', () => {
  it('kosong kalau kata kunci kosong', () => {
    expect(searchAll('')).toEqual([])
    expect(searchAll('   ')).toEqual([])
  })

  it('menemukan langkah dari potongan teks, tanpa peduli huruf besar-kecil', () => {
    const hits = searchAll('TOURNIQUET')
    expect(hits.length).toBeGreaterThan(0)
    expect(hits.some((h) => h.text.toLowerCase().includes('tourniquet'))).toBe(true)
  })

  it('menemukan langkah dari nomor shortcut', () => {
    const hits = searchAll('73')
    expect(hits.some((h) => h.n === 73)).toBe(true)
  })

  it('menerima nomor yang ditulis dengan garis miring', () => {
    const hits = searchAll('/71')
    expect(hits.some((h) => h.n === 71)).toBe(true)
  })

  it('menemukan bagian dari namanya', () => {
    const hits = searchAll('direct pressure')
    expect(hits.some((h) => h.sectionName === 'Direct Pressure')).toBe(true)
  })

  it('menemukan baris referensi seperti kode dan anim', () => {
    expect(searchAll('10-20').some((h) => h.text.includes('Lokasi'))).toBe(true)
    expect(searchAll('.cpr').some((h) => h.text.includes('.cpr'))).toBe(true)
  })

  it('membawa alamat loncat pada setiap hasil', () => {
    for (const hit of searchAll('trauma')) {
      expect(hit.to).toMatch(/^[a-z-]+#[a-z0-9-]+$/)
    }
  })

  it('membatasi jumlah hasil', () => {
    expect(searchAll('a', 'id', 5).length).toBeLessThanOrEqual(5)
  })
})

describe('pencarian per bahasa', () => {
  it('mencari di teks Inggris saat bahasanya en', () => {
    // "checks" cuma ada di versi Inggris; kalau indeksnya tidak ikut bahasa,
    // hasilnya kosong.
    const hits = searchAll('pinches the victim', 'en')
    expect(hits.length).toBeGreaterThan(0)
    for (const hit of hits) expect(hit.text.toLowerCase()).toContain('pinches the victim')
  })

  it('indeks tiap bahasa berdiri sendiri', () => {
    // Batas hasil dinaikkan, kalau tidak dua-duanya kena plafon dan
    // perbandingannya jadi tidak berarti.
    const id = searchAll('mengambil', 'id', 500)
    const en = searchAll('mengambil', 'en', 500)
    expect(id.length).toBeGreaterThan(0)
    // Baris yang sudah diterjemahkan tidak lagi memuat kata Indonesianya.
    expect(en.length).toBeLessThan(id.length)
  })
})
