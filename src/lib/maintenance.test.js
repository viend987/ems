import { describe, expect, it } from 'vitest'
import STAFF from '../data/staff.js'
import {
  buildMaintenanceReport,
  calculateTotals,
  DEFAULT_MAINTENANCE_UNITS,
} from './maintenance.js'
import { parseBBCode, textOf } from './bbcode.js'

describe('calculateTotals', () => {
  it('menghitung total 0 untuk unit default yang kosong', () => {
    const { totalNumber, totalFormatted } = calculateTotals(DEFAULT_MAINTENANCE_UNITS)
    expect(totalNumber).toBe(0)
    expect(totalFormatted).toBe('$0.00')
  })

  it('menghitung total nominal biaya dengan benar', () => {
    const units = [
      { name: 'RA-111', repair: 4, refuel: 0.9, additional: '' },
      { name: 'RA-113', repair: 56, refuel: 36.53, additional: 50 },
    ]
    const { totalNumber, totalFormatted } = calculateTotals(units)
    expect(totalNumber).toBeCloseTo(147.43, 2)
    expect(totalFormatted).toBe('$147.43')
  })
})

describe('buildMaintenanceReport', () => {
  const tobrian = STAFF.find((s) => s.id === 'tobrian-alrik')
  const testReport = {
    week: '3',
    date: 'Saturday, 21 February 2026',
    staffId: 'tobrian-alrik',
    evidenceImages: ['https://i.imgur.com/example1.png'],
    units: [
      { name: 'RA-111', repair: 4, refuel: 0.9, additional: 0 },
      { name: 'RA-112', repair: 57, refuel: 20.7, additional: 0 },
    ],
  }

  it('menghasilkan BBCode Vehicle Maintenance Report sesuai spesifikasi', () => {
    const bbcode = buildMaintenanceReport({
      ...testReport,
      staff: tobrian,
    })

    expect(bbcode).toContain('[divbox=beige]')
    expect(bbcode).toContain('Subject: Weekly Vehicle and Equipment Maintenance #3')
    expect(bbcode).toContain('Date: Saturday, 21 February 2026')
    expect(bbcode).toContain('Person in Charge: Tobrian Alrik')
    expect(bbcode).toContain('[td1=Red][center][b][color=white]Unit[/color][/b][/center][/td1]')
    expect(bbcode).toContain('[td1=white][center]RA-111[/center][/td1]')
    expect(bbcode).toContain('Total salary proposed: $82.60')
    expect(bbcode).toContain('[secspoiler=Photo evidence of activities.]')
    expect(bbcode).toContain('[img]https://i.imgur.com/example1.png[/img]')
  })

  it('dapat diurai oleh parser BBCode', () => {
    const bbcode = buildMaintenanceReport({
      ...testReport,
      staff: tobrian,
    })
    const text = textOf(parseBBCode(bbcode))
    expect(text).toContain('LOS SANTOS FIRE DEPARTMENT')
    expect(text).toContain('Tobrian Alrik')
    expect(text).toContain('Total salary proposed: $82.60')
  })
})
