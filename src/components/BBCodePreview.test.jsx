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
