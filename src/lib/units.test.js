import { describe, expect, it } from 'vitest'
import UNITS from '../data/units.js'

// Sama seperti UnitGallery: daftar file yang benar-benar ada di assets.
const FILES = new Set(
  Object.keys(import.meta.glob('../assets/units/*.{avif,webp}')).map((p) => p.split('/').pop()),
)
const WIDTHS = [480, 960]

describe('foto unit', () => {
  it('setiap id di `images` punya AVIF dan WebP di kedua lebar', () => {
    for (const group of UNITS.fleet) {
      for (const unit of group.units) {
        for (const name of unit.images ?? []) {
          for (const width of WIDTHS) {
            for (const ext of ['avif', 'webp']) {
              const file = `${name}-${width}.${ext}`
              expect(FILES.has(file), `${unit.callsign}: ${file} tidak ada — sudah npm run units?`).toBe(true)
            }
          }
        }
      }
    }
  })

  it('tidak ada callsign ganda', () => {
    const callsigns = UNITS.fleet.flatMap((g) => g.units.map((u) => u.callsign))
    expect(new Set(callsigns).size).toBe(callsigns.length)
  })
})
