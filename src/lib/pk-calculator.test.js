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

    it('pilihan eksplisit woundType flesh pada torso (<=50%) dapat /chance sesuai survival chance', () => {
      const res = evaluatePk({ woundType: 'flesh', location: 'torso', bullets: 1, survivalChance: 40 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.canChance).toBe(true)
      expect(res.chanceCommand).toBe('/chance 40')
    })

    it('pilihan eksplisit woundType flesh pada torso (>50%) tidak dapat PK', () => {
      const res = evaluatePk({ woundType: 'flesh', location: 'torso', bullets: 2, survivalChance: 70 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
      expect(res.chanceCommand).toBeNull()
    })

    it('luka tembak di tangan/kaki (limbs) tidak dapat PK', () => {
      const res = evaluatePk({ woundType: 'gsw', location: 'limbs', bullets: 4, survivalChance: 30 })
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
    })

    it('flesh wound di ekstremitas (limbs) tidak dapat PK walau survival chance rendah', () => {
      const res = evaluatePk({ woundType: 'flesh', location: 'limbs', bullets: 3, survivalChance: 20 })
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
    })
  })

  describe('combined multiple wounds logic', () => {
    it('gabungan luka dengan vital wound (3x GSW Torso + 1x Flesh + 2x Graze) dan <50% chance -> AUTO PK', () => {
      const wounds = [
        { type: 'gsw', location: 'torso', count: 3 },
        { type: 'flesh', location: 'torso', count: 1 },
        { type: 'graze', location: 'limbs', count: 2 },
      ]
      const res = evaluatePk({ wounds, survivalChance: 35 })
      expect(res.isVital).toBe(true)
      expect(res.status).toBe(PK_STATUS.AUTO_PK)
      expect(res.autoPk).toBe(true)
      expect(res.canChance).toBe(false)
      expect(res.summaryId).toContain('3x Gunshot Wound (GSW / Luka Tembak)')
    })

    it('gabungan luka dengan vital wound (1x GSW Head + 1x Cut) dan >=50% chance -> /chance 50', () => {
      const wounds = [
        { type: 'gsw', location: 'head', count: 1 },
        { type: 'cut', location: 'torso', count: 1 },
      ]
      const res = evaluatePk({ wounds, survivalChance: 65 })
      expect(res.isVital).toBe(true)
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.canChance).toBe(true)
      expect(res.chanceCommand).toBe('/chance 50')
    })

    it('gabungan luka non-vital (1x GSW Torso + 2x Flesh Torso + 3x Graze) dengan chance 42% -> /chance 42', () => {
      const wounds = [
        { type: 'gsw', location: 'torso', count: 1 },
        { type: 'flesh', location: 'torso', count: 2 },
        { type: 'graze', location: 'limbs', count: 3 },
      ]
      const res = evaluatePk({ wounds, survivalChance: 42 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.CHANCE_PK)
      expect(res.canChance).toBe(true)
      expect(res.chanceCommand).toBe('/chance 42')
    })

    it('gabungan luka non-vital dengan chance 75% -> NO PK (/chance dilarang)', () => {
      const wounds = [
        { type: 'gsw', location: 'torso', count: 1 },
        { type: 'flesh', location: 'torso', count: 1 },
        { type: 'graze', location: 'limbs', count: 3 },
      ]
      const res = evaluatePk({ wounds, survivalChance: 75 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
      expect(res.chanceCommand).toBeNull()
    })

    it('gabungan luka hanya pada ekstremitas (tangan/kaki) -> NO PK', () => {
      const wounds = [
        { type: 'gsw', location: 'limbs', count: 2 },
        { type: 'flesh', location: 'limbs', count: 2 },
        { type: 'fracture', location: 'limbs', count: 1 },
      ]
      const res = evaluatePk({ wounds, survivalChance: 25 })
      expect(res.isVital).toBe(false)
      expect(res.status).toBe(PK_STATUS.NO_PK)
      expect(res.canChance).toBe(false)
    })

    it('gabungan luka non-peluru (Cut + Fracture + Bruise) -> NO PK', () => {
      const wounds = [
        { type: 'cut', location: 'torso', count: 2 },
        { type: 'fracture', location: 'limbs', count: 1 },
        { type: 'bruise', location: 'head', count: 1 },
      ]
      const res = evaluatePk({ wounds, survivalChance: 30 })
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
