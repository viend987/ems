import { describe, expect, it } from 'vitest'
import { applyTag } from './bbcode-insert.js'
import { readFile } from 'node:fs/promises'
import { SHORTCUTS, SIZES, sizeSpec, TAG_GROUPS, TAGS } from './bbcode-tags.js'
import { parseBBCode, textOf } from './bbcode.js'
import { PATIENT_CARE_REPORT } from './bbcode-example.js'

const namaTag = (text) => [...text.matchAll(/\[\/?([a-z0-9*-]+)/gi)].map((m) => m[1].toLowerCase())

describe('katalog tombol', () => {
  it('tidak punya id ganda', () => {
    expect(new Set(TAGS.map((t) => t.id)).size).toBe(TAGS.length)
  })

  it('setiap tombol punya nama dan sesuatu untuk digambar', () => {
    for (const spec of TAGS) {
      // `name` jadi tooltip sekaligus label pembaca layar, jadi wajib ada.
      expect(spec.name, `${spec.id} tanpa name`).toBeTruthy()
      expect(spec.icon || spec.label, `${spec.id} tanpa ikon maupun label`).toBeTruthy()
    }
  })

  it('menamai tombol dalam bahasa Inggris, sejalan dengan tag yang disisipkan', () => {
    const indonesia = /(tengah|kiri|kanan|garis|gambar|tautan|ukuran|warna|huruf|kotak|daftar)/i
    for (const spec of TAGS) {
      expect(spec.name, `${spec.id}: "${spec.name}"`).not.toMatch(indonesia)
    }
  })

  it('memakai ikon yang benar-benar ada di Icon.jsx', async () => {
    const src = await readFile(new URL('../components/Icon.jsx', import.meta.url), 'utf8')
    for (const spec of TAGS) {
      if (!spec.icon) continue
      expect(src, `ikon "${spec.icon}" (${spec.id}) tidak ada`).toContain(`${spec.icon}:`)
    }
  })

  it('menyediakan lima ukuran huruf sesuai angka forum', () => {
    expect(SIZES.map((s) => s.value)).toEqual([50, 85, 100, 150, 200])
    expect(SIZES.map((s) => s.label)).toEqual(['Tiny', 'Small', 'Normal', 'Large', 'Huge'])
    expect(sizeSpec(150).before).toBe('[size=150]')
    expect(sizeSpec(150).after).toBe('[/size]')
  })

  it('hanya menyisipkan tag yang dikenali pratinjau', () => {
    // Tag di luar `KNOWN` akan tampil sebagai teks mentah, bukan hasil format.
    for (const spec of [...TAGS, ...SIZES.map((s) => sizeSpec(s.value))]) {
      const sisa = textOf(parseBBCode(applyTag('', 0, 0, spec).text))
      expect(sisa, `${spec.id} menyisakan tag mentah: ${sisa}`).not.toMatch(/\[\/?[a-z]/i)
    }
  })

  it('menutup setiap tag yang dibukanya', () => {
    for (const spec of TAGS) {
      const hitung = {}
      for (const nama of namaTag(spec.before + (spec.after ?? ''))) {
        if (nama === '*') continue // [*] memang tidak punya penutup
        hitung[nama] = (hitung[nama] ?? 0) + 1
      }
      for (const [tag, jumlah] of Object.entries(hitung)) {
        expect(jumlah % 2, `${spec.id}: [${tag}] tidak berpasangan`).toBe(0)
      }
    }
  })

  it('memetakan pintasan papan tuts ke tag format', () => {
    expect([...SHORTCUTS.keys()].sort()).toEqual(['b', 'i', 'u'])
  })

  it('mengelompokkan tombol sesuai yang tampil di toolbar', () => {
    expect(TAG_GROUPS.map((g) => g.id)).toEqual(['text', 'align', 'blocks', 'notices', 'media'])
  })
})

describe('contoh Patient Care Report', () => {
  const teks = textOf(parseBBCode(PATIENT_CARE_REPORT))

  it('terurai tanpa menyisakan tag mentah', () => {
    expect(teks).not.toMatch(/\[\/?(divbox|list|img-resize|quote|spoiler|size|color|center|right|b|hr)\b/i)
  })

  it('menangani [/LIST] berhuruf besar', () => {
    expect(teks).not.toContain('[/LIST]')
    expect(teks).toContain('Dispatch')
  })

  it('menutup [list] yang menggantung di [/divbox] penutup', () => {
    const root = parseBBCode(PATIENT_CARE_REPORT)
    expect(root.children.filter((c) => typeof c !== 'string').map((c) => c.tag)).toEqual(['divbox'])
    expect(teks).toContain('Regards,')
  })

  it('membawa judul tiap bagian', () => {
    for (const judul of ['PERSONAL DETAILS', 'DUTY INFORMATION', 'PATIENT INFORMATION']) {
      expect(teks).toContain(judul)
    }
  })
})
