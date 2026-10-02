// @vitest-environment jsdom
import { render } from 'preact'
import { afterEach, describe, expect, it } from 'vitest'
import BBCodePreview from './BBCodePreview.jsx'
import { buildPatrolLog } from '../lib/patrol.js'

function draw(code) {
  const root = document.createElement('div')
  document.body.append(root)
  render(<BBCodePreview code={code} />, root)
  return root
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('alamat di pratinjau', () => {
  it('menggambar tautan http(s) sebagai tautan', () => {
    const a = draw('[url=https://contoh.test/x]buka[/url]').querySelector('a')
    expect(a?.getAttribute('href')).toBe('https://contoh.test/x')
    expect(a?.textContent).toBe('buka')
  })

  for (const jahat of [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<b>x</b>',
    'vbscript:msgbox(1)',
  ]) {
    it(`menolak jadi tautan untuk skema "${jahat.split(':')[0]}"`, () => {
      const root = draw(`[url=${jahat}]klik[/url]`)
      expect(root.querySelector('a'), 'tidak boleh ada tautan yang bisa diklik').toBeNull()
      // Teksnya tetap tampil supaya tidak hilang diam-diam.
      expect(root.textContent).toContain('klik')
    })
  }

  it('menolak skema berbahaya yang ditulis sebagai isi [url]', () => {
    expect(draw('[url]javascript:alert(1)[/url]').querySelector('a')).toBeNull()
  })

  it('tidak memuat gambar dari skema selain http(s)', () => {
    expect(draw('[img]javascript:alert(1)[/img]').querySelector('img')).toBeNull()
    expect(draw('[img]https://contoh.test/a.png[/img]').querySelector('img')).not.toBeNull()
  })

  it('menahan tautan berbahaya yang diketik lewat kolom Activity', () => {
    // Activity dan Crew member masuk ke BBCode apa adanya — ini jalan masuknya.
    const code = buildPatrolLog({
      staff: { name: 'Fire Alrik', badge: '111', rank: 'Firefighter', district: 'Davis' },
      date: '2026-09-21',
      crew: 'N/A',
      start: '20:00',
      end: '21:30',
      startImage: 'https://i.imgur.com/aaaa.jpeg',
      endImage: 'https://i.imgur.com/bbbb.jpeg',
      activity: 'Patroli biasa. [url=javascript:alert(1)]klik ini[/url]',
    })
    const root = draw(code)
    expect([...root.querySelectorAll('a')].map((a) => a.getAttribute('href'))).not.toContain(
      'javascript:alert(1)',
    )
    expect(root.textContent).toContain('klik ini')
  })
})

describe('tampilan daftar dan blok', () => {
  it('menampilkan [list=1] sebagai daftar bernomor', () => {
    const root = draw('[list=1][*]Satu[*]Dua[/list]')
    expect(root.querySelector('ol')).not.toBeNull()
    expect(root.querySelectorAll('li').length).toBe(2)
  })

  it('menampilkan [list] sebagai daftar berpoin', () => {
    const root = draw('[list][*]A[*]B[/list]')
    const ul = root.querySelector('ul')
    expect(ul).not.toBeNull()
    expect(ul.className).toContain('list-disc')
  })

  it('menampilkan [code] sebagai teks mentah', () => {
    const root = draw('[code][b]raw[/b][/code]')
    const pre = root.querySelector('pre')
    expect(pre).not.toBeNull()
    expect(pre.textContent).toBe('[b]raw[/b]')
  })

  it('menampilkan [block] sebagai kotak berpinggiran', () => {
    const root = draw('[block=transparent,1,black]isi[/block]')
    expect(root.textContent).toContain('isi')
  })

  it('menampilkan [altspoiler] dengan judul kustom', () => {
    const root = draw('[altspoiler=ID Card]tersembunyi[/altspoiler]')
    const summary = root.querySelector('summary')
    expect(summary?.textContent).toBe('ID Card')
  })

  it('menampilkan [list=1] bernomor walau item pertama tanpa [*]', () => {
    const root = draw('[list=1][b]Pertama[/b] deskripsi[*][b]Kedua[/b][/list]')
    const ol = root.querySelector('ol')
    expect(ol).not.toBeNull()
    const items = ol?.querySelectorAll('li')
    expect(items?.length).toBe(2)
    expect(items?.[0].textContent).toContain('Pertama')
    expect(items?.[0].textContent).toContain('deskripsi')
    expect(items?.[1].textContent).toContain('Kedua')
  })

  it('menampilkan tombol Select all pada blok [code]', () => {
    const root = draw('[code]konten mentah[/code]')
    const btn = root.querySelector('button')
    expect(btn?.textContent).toBe('Select all')
  })

  it('menampilkan [aligntable=left] mengapung ke kiri', () => {
    const root = draw('[aligntable=left,0,12,28,0,0,transparent]logo[/aligntable]')
    const el = root.querySelector('div[style*="float"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('style')).toContain('float: left')
  })
})
