import { describe, expect, it } from 'vitest'
import { parseBBCode, textOf } from './bbcode.js'
import { buildPatrolLog } from './patrol.js'

const tags = (node) => node.children.filter((c) => typeof c !== 'string').map((c) => c.tag)

describe('parseBBCode', () => {
  it('mengurai tag bersarang beserta nilainya', () => {
    const root = parseBBCode('[divbox=maroon][b]Halo[/b][/divbox]')
    const divbox = root.children[0]
    expect(divbox.tag).toBe('divbox')
    expect(divbox.value).toBe('maroon')
    expect(divbox.children[0].tag).toBe('b')
    expect(textOf(divbox)).toBe('Halo')
  })

  it('membiarkan tag di luar daftar tampil sebagai teks', () => {
    const root = parseBBCode('[marquee]jalan[/marquee]')
    expect(tags(root)).toEqual([])
    expect(textOf(root)).toBe('[marquee]jalan[/marquee]')
  })

  it('membiarkan penutup tanpa pembuka sebagai teks', () => {
    const root = parseBBCode('halo[/b] dunia')
    expect(textOf(root)).toBe('halo[/b] dunia')
  })

  it('menutup sendiri tag yang menggantung saat teks habis', () => {
    const root = parseBBCode('[list=0][*]satu\n[*]dua')
    const list = root.children[0]
    expect(list.tag).toBe('list')
    expect(tags(list)).toEqual(['*', '*'])
    expect(textOf(list.children[0])).toBe('satu')
    expect(textOf(list.children[1])).toBe('dua')
  })

  it('menutup tag menggantung saat induknya ditutup', () => {
    // Bentuk inilah yang dipakai template Patrol Log: [list=0] tidak pernah
    // ditutup, dan [/divbox] yang mengakhirinya.
    const root = parseBBCode('[divbox=white][list=0][*]isi[/divbox]sesudah')
    expect(tags(root)).toEqual(['divbox'])
    expect(textOf(root.children[0])).toBe('isi')
    expect(root.children[1]).toBe('sesudah')
  })

  it('membaca URL di dalam [img]', () => {
    const root = parseBBCode('[img]https://contoh.test/a.png[/img]')
    expect(textOf(root.children[0])).toBe('https://contoh.test/a.png')
  })

  it('merapikan spasi di ujung isi blok', () => {
    const root = parseBBCode('[quote]\n  isi  \n[/quote]')
    expect(textOf(root.children[0])).toBe('isi')
  })
})

describe('BBCode Patrol Log', () => {
  const form = {
    staff: { name: 'Fire Alrik', badge: '111', rank: 'Firefighter', district: 'Davis', signature: '' },
    date: '2026-09-21',
    crew: 'N/A',
    start: '20:00',
    end: '21:30',
    startImage: 'https://i.imgur.com/aaaa.jpeg',
    endImage: 'https://i.imgur.com/bbbb.jpeg',
    activity: 'Patroli keliling Davis.',
  }

  it('terurai tanpa menyisakan tag mentah di teksnya', () => {
    const text = textOf(parseBBCode(buildPatrolLog(form)))
    expect(text).not.toMatch(/\[\/?(divbox|list|img|quote|spoiler|size|color|center|right|justify|b)\b/)
  })

  it('membawa isi form ke dalam pohonnya', () => {
    const text = textOf(parseBBCode(buildPatrolLog(form)))
    expect(text).toContain('Fire Alrik')
    expect(text).toContain('21/09/2026')
    expect(text).toContain('Patroli keliling Davis.')
  })

  it('menemukan kedua gambar bukti', () => {
    const found = []
    const walk = (node) => {
      if (typeof node === 'string') return
      if (node.tag === 'img') found.push(textOf(node))
      node.children.forEach(walk)
    }
    walk(parseBBCode(buildPatrolLog(form)))
    expect(found).toContain('https://i.imgur.com/aaaa.jpeg')
    expect(found).toContain('https://i.imgur.com/bbbb.jpeg')
  })
})

describe('tag tanpa isi', () => {
  it('tidak menelan teks sesudah [hr] yang tanpa penutup', () => {
    const root = parseBBCode('atas[hr]bawah')
    expect(textOf(root)).toBe('atasbawah')
    expect(tags(root)).toEqual(['hr'])
    expect(root.children[2]).toBe('bawah')
  })

  it('menelan [/hr] tanpa menyisakannya sebagai teks', () => {
    expect(textOf(parseBBCode('[hr][/hr]sesudah'))).toBe('sesudah')
  })
})
