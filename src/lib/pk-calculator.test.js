import { describe, expect, it } from 'vitest'
import {
  evaluatePk,
  GSW_LOCATIONS,
  PK_STATUS,
  simulateChanceRoll,
  WOUND_TYPES,
} from './pk-calculator.js'

describe('pk-calculator', () => {
  it('punya daftar jenis luka dan lokasi GSW yang lengkap', () => {
    expect(WOUND_TYPES.length).toBeGreaterThanOrEqual(7)
    expect(GSW_LOCATIONS.length).toBe(3)
  })

  describe('vital wound logic', () => {
    it('1x GSW di kepala adalah luka vital', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'head', bullets: 1, survivalChance: 45 })
      expect(res.isVital).toBe(true)
      expect(res.status).toBe(PK_STATUS.AUTO_PK)
      expect(res.autoPk).toBe(true)
      expect(res.canChance).toBe(false)
      expect(res.chanceCommand).toBeNull()
    })

    it('vital wound dengan survival chance < 50% adalah AUTO PK', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'torso', bullets: 3, survivalChance: 40 })
      expect(res.isVital).toBe(true)
      expect(res.status).toBe(PK_STATUS.AUTO_PK)
      expect(res.autoPk).toBe(true)
    })

    it('vital wound dengan survival chance >= 50% wajib /chance 50', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'head', bullets: 1, survivalChance: 75 })
      expect(res.isVital).toBe(true)
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.canChance).toBe(true)
      expect(res.chanceCommand).toBe('/chance 50')
    })

    it('3x GSW di torso dengan survival chance 60% wajib /chance 50', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'torso', bullets: 3, survivalChance: 60 })
      expect(res.isVital).toBe(true)
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.chanceCommand).toBe('/chance 50')
    })
  })

  describe('flesh wound logic', () => {
    it('flesh wound (>50% survival) tidak dapat PK dan /chance dilarang', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'torso', bullets: 2, survivalChance: 65 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
      expect(res.chanceCommand).toBeNull()
    })

    it('flesh wound (<=50% survival) dapat PK menggunakan /chance sesuai survival chance', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'torso', bullets: 2, survivalChance: 45 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.canChance).toBe(true)
      expect(res.chanceCommand).toBe('/chance 45')
    })

    it('luka tembak di tangan/kaki (limbs) tidak dapat PK', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'limbs', bullets: 4, survivalChance: 30 })
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
    })
  })

  describe('non-gsw wound logic', () => {
    const nonGswList = ['graze', 'cut', 'fracture', 'dislocated', 'burns', 'bruise']
    for (const type of nonGswList) {
      it(`jenis luka ${type} dilarang /chance dan tidak dapat PK`, () => {
        const res = evaluatePk({ woundType: type, survivalChance: 25 })
        expect(res.status).toBe(PK_STATUS.NO_PK)
        expect(res.canChance).toBe(false)
        expect(res.chanceCommand).toBeNull()
      })
    }
  })

  describe('bleeding dan kondisi khusus', () => {
    it('bleeding >15 menit tanpa RP dan tanpa medic diizinkan /chance', () => {
      const res = evaluatePk({
        woundType: 'gsw',
        location: 'torso',
        bullets: 1,
        survivalChance: 70,
        bleedExpired: true,
        medicArrived: false,
      })
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.chanceCommand).toBe('/chance 70')
    })

    it('jika medic sudah tiba di TKP, timer bleeding 15 menit gugur', () => {
      const res = evaluatePk({
        woundType: 'gsw',
        location: 'torso',
        bullets: 1,
        survivalChance: 70,
        bleedExpired: true,
        medicArrived: true,
      })
      // Torso 1 peluru bukan luka vital (>50% survival) -> NO_PK
      expect(res.status).toBe(PK_STATUS.NO_PK)
    })
  })

  describe('simulateChanceRoll', () => {
    it('menghasilkan objek dengan roll, pass, dan verdict', () => {
      const sim = simulateChanceRoll(50)
      expect(typeof sim.roll).toBe('number')
      expect(sim.roll).toBeGreaterThanOrEqual(1)
      expect(sim.roll).toBeLessThanOrEqual(100)
      expect(typeof sim.pass).toBe('boolean')
      expect(['PASS', 'FAIL']).toContain(sim.verdict)
      expect(sim.textId).toBeTruthy()
      expect(sim.textEn).toBeTruthy()
    })
  })
})
