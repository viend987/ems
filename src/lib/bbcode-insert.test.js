import { describe, expect, it } from 'vitest'
import { applyTag } from './bbcode-insert.js'

const B = { before: '[b]', after: '[/b]' }
const URL = { before: '[url=https://]', after: '[/url]', body: 'teks', pick: 'https://' }
const IMG = { before: '[img]', after: '[/img]', body: 'https://' }
const LIST = { before: '[list=0]\n[*]', after: '\n[/list]', block: true }
const HR = { before: '[hr][/hr]', solo: true, block: true }

/** Tulis hasilnya dengan «» menandai apa yang tersorot, biar tesnya terbaca. */
function show(out) {
  return `${out.text.slice(0, out.start)}«${out.text.slice(out.start, out.end)}»${out.text.slice(out.end)}`
}

describe('applyTag', () => {
  it('membungkus teks terpilih dan tetap menyorotnya', () => {
    expect(show(applyTag('halo dunia', 5, 10, B))).toBe('halo [b]«dunia»[/b]')
  })

  it('menaruh kursor di antara tag saat tidak ada yang terpilih', () => {
    expect(show(applyTag('halo', 4, 4, B))).toBe('halo[b]«»[/b]')
  })

  it('menerima seleksi yang dibuat dari kanan ke kiri', () => {
    expect(show(applyTag('halo dunia', 10, 5, B))).toBe('halo [b]«dunia»[/b]')
  })

  it('mengisi badan bawaan dan menyorotnya saat kosong', () => {
    expect(show(applyTag('', 0, 0, IMG))).toBe('[img]«https://»[/img]')
  })

  it('membungkus seleksi sebagai isi [img], bukan menimpanya', () => {
    expect(show(applyTag('https://a.test/x.png', 0, 20, IMG))).toBe('[img]«https://a.test/x.png»[/img]')
  })

  it('menyorot nilai yang wajib diisi lebih dulu, bukan isinya', () => {
    expect(show(applyTag('', 0, 0, URL))).toBe('[url=«https://»]teks[/url]')
  })

  it('tetap menyorot alamat walau ada teks terpilih', () => {
    expect(show(applyTag('klik ini', 0, 8, URL))).toBe('[url=«https://»]klik ini[/url]')
  })

  it('menaruh blok di barisnya sendiri', () => {
    const out = applyTag('atas', 4, 4, LIST)
    expect(out.text).toBe('atas\n[list=0]\n[*]\n[/list]')
  })

  it('tidak menambah baris kosong kalau sudah di awal baris', () => {
    expect(applyTag('atas\n', 5, 5, LIST).text).toBe('atas\n[list=0]\n[*]\n[/list]')
  })

  it('memisahkan blok dari teks yang menyusul', () => {
    expect(applyTag('bawah', 0, 0, LIST).text).toBe('[list=0]\n[*]\n[/list]\nbawah')
  })

  it('menyisipkan tag mandiri tanpa menelan seleksi', () => {
    const out = applyTag('halo dunia', 0, 4, HR)
    expect(out.text).toBe('halo\n[hr][/hr]\n dunia')
    expect(out.start).toBe(out.end)
    expect(out.text.slice(out.start - 9, out.start)).toBe('[hr][/hr]')
  })
})
