import { describe, expect, it } from 'vitest'
import { copySection, copyText, prefixOf } from './copy.js'

describe('prefixOf', () => {
  it('memberi awalan sesuai jenis langkah', () => {
    expect(prefixOf({ kind: 'me' })).toBe('/me')
    expect(prefixOf({ kind: 'do' })).toBe('/do')
    expect(prefixOf({ kind: 'radio' })).toBe('/r')
  })

  it('membedakan kanal radio dan OOC', () => {
    expect(prefixOf({ kind: 'ooc' })).toBe('/ro')
    expect(prefixOf({ kind: 'deptradio' })).toBe('/d')
    expect(prefixOf({ kind: 'deptooc' })).toBe('/od')
    expect(prefixOf({ kind: 'wt' })).toBe('/wt')
  })

  it('memberi awalan teriak', () => {
    expect(prefixOf({ kind: 'shout' })).toBe('/s')
  })

  it('tidak memberi awalan untuk bicara biasa, command, dan anim', () => {
    expect(prefixOf({ kind: 'say' })).toBe('')
    expect(prefixOf({ kind: 'command' })).toBe('')
    expect(prefixOf({ kind: 'anim' })).toBe('')
  })

  it('menghormati awalan yang ditulis eksplisit', () => {
    expect(prefixOf({ kind: 'radio', prefix: '/ro' })).toBe('/ro')
  })
})

describe('copyText', () => {
  it('menyusun awalan dan teks', () => {
    expect(copyText({ kind: 'me', text: 'mengambil ILS Bag.' })).toBe('/me mengambil ILS Bag.')
    expect(copyText({ kind: 'do', text: 'Apakah pendarahan berhenti?' })).toBe(
      '/do Apakah pendarahan berhenti?',
    )
  })

  it('tidak pernah menyertakan nomor shortcut', () => {
    const out = copyText({ n: 71, kind: 'me', text: 'mengambil Trauma Scissor.' })
    expect(out).toBe('/me mengambil Trauma Scissor.')
    expect(out).not.toContain('71')
  })

  it('tidak menyertakan label maupun catatan tampilan', () => {
    const out = copyText({ n: 21, kind: 'radio', label: 'On Duty', note: 'pilih Lifepack', text: 'Status-2.' })
    expect(out).toBe('/r Status-2.')
  })

  it('mengembalikan teks apa adanya untuk command dan anim', () => {
    expect(copyText({ kind: 'command', text: '/gurney get 2' })).toBe('/gurney get 2')
    expect(copyText({ kind: 'anim', text: '.medic2' })).toBe('.medic2')
  })

  it('mengembalikan string kosong untuk catatan', () => {
    expect(copyText({ kind: 'note', text: 'Kondisional.' })).toBe('')
  })
})

describe('copySection', () => {
  const section = {
    steps: [
      { n: 71, kind: 'me', text: 'satu.' },
      { kind: 'note', text: 'Kalau belum berhenti:' },
      { n: 72, kind: 'me', text: 'dua.' },
      { n: 73, kind: 'do', text: 'tiga?' },
    ],
  }

  it('menggabungkan langkah yang bisa disalin, satu per baris', () => {
    expect(copySection(section)).toBe('/me satu.\n/me dua.\n/do tiga?')
  })

  it('melewati baris catatan', () => {
    expect(copySection(section)).not.toContain('Kalau belum berhenti')
  })

  it('mengembalikan string kosong kalau tidak ada yang bisa disalin', () => {
    expect(copySection({ steps: [{ kind: 'note', text: 'Cuma catatan.' }] })).toBe('')
  })
})

describe('teks salin per bahasa', () => {
  const step = { n: 51, kind: 'me', text: 'mengamankan area', en: 'secures the area' }

  it('menyalin versi Inggris saat bahasanya en', () => {
    expect(copyText(step, 'en')).toBe('/me secures the area')
  })

  it('menyalin versi Indonesia saat bahasanya id', () => {
    expect(copyText(step, 'id')).toBe('/me mengamankan area')
  })

  it('jatuh ke Indonesia kalau terjemahannya belum ada', () => {
    expect(copyText({ kind: 'do', text: 'Apakah sadar?' }, 'en')).toBe('/do Apakah sadar?')
  })

  it('nomor shortcut tetap tidak pernah ikut tersalin, di bahasa mana pun', () => {
    for (const lang of ['id', 'en']) expect(copyText(step, lang)).not.toContain('51')
  })

  it('copySection menyusun seluruh bagian dalam satu bahasa', () => {
    const section = {
      steps: [step, { kind: 'note', text: 'catatan', en: 'a note' }, { kind: 'command', text: '/bls' }],
    }
    // Catatan tidak bisa disalin, jadi tidak ikut.
    expect(copySection(section, 'en')).toBe('/me secures the area\n/bls')
  })
})
