import { describe, expect, it } from 'vitest'
import STAFF from '../data/staff.js'
import {
  buildMaintenanceReport,
  calculateTotals,
  DEFAULT_MAINTENANCE_UNITS,
  SAMPLE_MAINTENANCE,
} from './maintenance.js'
import { parseBBCode, textOf } from './bbcode.js'

describe('calculateTotals', () => {
  it('menghitung total 22 unit sampel persis $1,920.73', () => {
    const { totalNumber, totalFormatted } = calculateTotals(DEFAULT_MAINTENANCE_UNITS)
    expect(totalNumber).toBeCloseTo(1920.73, 2)
    expect(totalFormatted).toBe('$1,920.73')
  })
})

describe('buildMaintenanceReport', () => {
  const tobrian = STAFF.find((s) => s.id === 'tobrian-alrik')

  it('menghasilkan BBCode Vehicle Maintenance Report sesuai spesifikasi', () => {
    const bbcode = buildMaintenanceReport({
      ...SAMPLE_MAINTENANCE,
      staff: tobrian,
    })

    expect(bbcode).toContain('[divbox=beige]')
    expect(bbcode).toContain('Subject: Weekly Vehicle and Equipment Maintenance #3')
    expect(bbcode).toContain('Date: Saturday, 21 February 2026')
    expect(bbcode).toContain('Person in Charge: Tobrian Alrik')
    expect(bbcode).toContain('[td1=Red][center][b][color=white]Unit[/color][/b][/center][/td1]')
    expect(bbcode).toContain('[td1=white][center]RA-111[/center][/td1]')
    expect(bbcode).toContain('Total salary proposed: $1,920.73')
    expect(bbcode).toContain('[secspoiler=Photo evidence of activities.]')
  })

  it('dapat diurai oleh parser BBCode', () => {
    const bbcode = buildMaintenanceReport({
      ...SAMPLE_MAINTENANCE,
      staff: tobrian,
    })
    const text = textOf(parseBBCode(bbcode))
    expect(text).toContain('LOS SANTOS FIRE DEPARTMENT')
    expect(text).toContain('Tobrian Alrik')
    expect(text).toContain('Total salary proposed: $1,920.73')
  })
})
