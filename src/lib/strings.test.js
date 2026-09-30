import { describe, expect, it } from 'vitest'
import { DICT, KEYS, strings } from './strings.js'
import { DEFAULT_LANG, isLang, LANGS, nextLang, pick, stepText } from './lang.js'

describe('kamus antarmuka', () => {
  it('punya kunci yang sama di setiap bahasa', () => {
    for (const lang of LANGS) {
      expect(Object.keys(DICT[lang]).sort(), `bahasa ${lang}`).toEqual([...KEYS].sort())
    }
  })

  it('bentuk tiap kunci sama di semua bahasa', () => {
    // Kalau satu sisi teks dan sisi lain fungsi, pemanggilnya akan pecah hanya
    // setelah bahasa diganti — jadi dijaga di sini.
    for (const key of KEYS) {
      const bentuk = LANGS.map((lang) => typeof DICT[lang][key])
      expect(new Set(bentuk).size, `kunci ${key}: ${bentuk.join(' vs ')}`).toBe(1)
    }
  })

  it('tidak meninggalkan teks kosong', () => {
    for (const lang of LANGS) {
      for (const key of KEYS) {
        const v = DICT[lang][key]
        if (typeof v === 'string') expect(v.trim(), `${lang}.${key}`).not.toBe('')
      }
    }
  })

  it('teks Inggris benar-benar berbeda dari Indonesia', () => {
    // Beberapa kunci memang sama di dua bahasa (footer, nama tombol bahasa),
    // tapi mayoritas harus berbeda — kalau tidak, ada yang lupa diterjemahkan.
    const sama = KEYS.filter(
      (k) => typeof DICT.id[k] === 'string' && DICT.id[k] === DICT.en[k],
    )
    expect(sama.length, `kunci yang belum diterjemahkan: ${sama.join(', ')}`).toBeLessThan(4)
  })

  it('jatuh ke Indonesia untuk bahasa yang tidak dikenal', () => {
    expect(strings('klingon')).toBe(DICT.id)
    expect(strings(undefined)).toBe(DICT.id)
  })
})

describe('pemilih bahasa', () => {
  it('bawaannya Indonesia dan cuma dua pilihan', () => {
    expect(DEFAULT_LANG).toBe('id')
    expect(LANGS).toEqual(['id', 'en'])
    expect(isLang('jp')).toBe(false)
  })

  it('berganti bolak-balik', () => {
    expect(nextLang('id')).toBe('en')
    expect(nextLang('en')).toBe('id')
  })

  it('pick membaca field bahasa lalu jatuh ke Indonesia', () => {
    const obj = { name: 'Nama', nameEn: 'Name', blurb: 'Isi' }
    expect(pick(obj, 'name', 'en')).toBe('Name')
    expect(pick(obj, 'name', 'id')).toBe('Nama')
    // Belum diterjemahkan: yang keluar versi Indonesia, bukan undefined.
    expect(pick(obj, 'blurb', 'en')).toBe('Isi')
    expect(pick(obj, 'blurb', 'id')).toBe('Isi')
  })

  it('pick mengabaikan terjemahan kosong', () => {
    expect(pick({ name: 'Nama', nameEn: '' }, 'name', 'en')).toBe('Nama')
  })

  it('stepText memakai field `en`, bukan `textEn`', () => {
    expect(stepText({ text: 'ambil tas', en: 'takes the bag' }, 'en')).toBe('takes the bag')
    expect(stepText({ text: 'ambil tas', en: 'takes the bag' }, 'id')).toBe('ambil tas')
    expect(stepText({ text: 'ambil tas' }, 'en')).toBe('ambil tas')
  })
})
