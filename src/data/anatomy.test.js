import { describe, expect, it } from 'vitest'
import {
  ARTERY_POINTS,
  BODY_REGIONS,
  BONES_REFERENCE,
  buildDoctorReport,
  buildInspectDo,
  buildRadioReport,
  WOUND_TYPES,
} from './anatomy.js'

describe('Anatomy & Injury Data', () => {
  it('memiliki 4 kelompok regio tubuh utama', () => {
    expect(BODY_REGIONS).toHaveLength(4)
    const ids = BODY_REGIONS.map((r) => r.id)
    expect(ids).toContain('upper-extremity')
    expect(ids).toContain('lower-extremity')
    expect(ids).toContain('torso-trunk')
    expect(ids).toContain('cranial-cervical')
  })

  it('setiap subbagian tubuh memiliki penanganan dan status vital yang valid', () => {
    for (const region of BODY_REGIONS) {
      expect(region.subparts.length).toBeGreaterThan(0)
      for (const sub of region.subparts) {
        expect(sub.name).toBeTruthy()
        expect(sub.desc).toBeTruthy()
        expect(sub.treatment).toBeTruthy()
        expect(typeof sub.vital).toBe('boolean')
      }
    }
  })

  it('memiliki daftar jenis luka medis lengkap', () => {
    expect(WOUND_TYPES.length).toBeGreaterThanOrEqual(8)
    const gsw = WOUND_TYPES.find((w) => w.id === 'gsw')
    expect(gsw).toBeDefined()
    expect(gsw.fieldAction).toContain('DEAT')
  })

  it('memiliki titik arteri penanganan kritis', () => {
    const ids = ARTERY_POINTS.map((a) => a.id)
    expect(ids).toContain('radial')
    expect(ids).toContain('carotid')
    expect(ids).toContain('brachial')
    expect(ids).toContain('femoral')
  })

  it('memiliki rujukan tulang dan bidai fraktur', () => {
    expect(BONES_REFERENCE.length).toBeGreaterThan(5)
    const femur = BONES_REFERENCE.find((b) => b.bone === 'Femur')
    expect(femur.splint).toContain('Traction Splint')
  })

  describe('Report Builder Helpers', () => {
    it('menghasilkan Doctor Report yang valid', () => {
      const rep = buildDoctorReport({
        loc: 'U',
        woundType: 'GSW',
        bodyRegion: 'Thorax',
        abcStatus: 'Unstable',
      })
      expect(rep).toBe('LOC U, GSW on Thorax, ABC Unstable')
    })

    it('menghasilkan Radio Report Status-7e', () => {
      const radio = buildRadioReport({
        callsign: 'Engine-1',
        status: '7e',
        woundType: 'Open Fracture',
        bodyRegion: 'Femur',
        hospital: 'PBH',
        eta: '4 Minutes',
      })
      expect(radio).toContain('/r Engine-1 Status-7e')
      expect(radio).toContain('Open Fracture on Femur')
      expect(radio).toContain('10-20 PBH')
      expect(radio).toContain('ETA 4 Minutes')
    })

    it('menghasilkan /do Inspect', () => {
      const inspect = buildInspectDo({
        woundType: 'GSW',
        bodyRegion: 'Upper Extremity (Left Arm)',
        bleeding: true,
      })
      expect(inspect).toContain('/do Terlihat luka jenis GSW')
      expect(inspect).toContain('Upper Extremity (Left Arm)')
      expect(inspect).toContain('pendarahan aktif')
    })
  })
})
