import STAFF from '../data/staff.js'
import { isImageUrl, normalizeImageUrl } from './patrol.js'

export const DEFAULT_MAINTENANCE_UNITS = [
  { name: 'RA-111', repair: 4, refuel: 0.9, additional: 0 },
  { name: 'RA-112', repair: 57, refuel: 20.7, additional: 0 },
  { name: 'RA-113', repair: 56, refuel: 36.53, additional: 50 },
  { name: 'RA-114', repair: 46, refuel: 42.23, additional: 50 },
  { name: 'RA-115', repair: 552, refuel: 75.83, additional: 50 },
  { name: 'Engine-111', repair: 42, refuel: 25.65, additional: 50 },
  { name: 'Engine-112', repair: 0, refuel: 0, additional: 0 },
  { name: 'Engine-113', repair: 0, refuel: 0, additional: 0 },
  { name: 'Engine-114', repair: 0, refuel: 0, additional: 0 },
  { name: 'Brush-111', repair: 175, refuel: 25.8, additional: 50 },
  { name: 'Brush-112', repair: 0, refuel: 0, additional: 0 },
  { name: 'Squad', repair: 0, refuel: 0, additional: 0 },
  { name: 'USAR-1', repair: 0, refuel: 0, additional: 0 },
  { name: 'OSAR-1', repair: 116, refuel: 9.53, additional: 0 },
  { name: 'Hazmat', repair: 124, refuel: 0, additional: 0 },
  { name: 'OC-111', repair: 77, refuel: 20.18, additional: 0 },
  { name: 'OC-112', repair: 0, refuel: 0, additional: 0 },
  { name: 'OC-113', repair: 0, refuel: 27.38, additional: 0 },
  { name: 'OC-114', repair: 0, refuel: 0, additional: 0 },
  { name: 'OC-115', repair: 0, refuel: 0, additional: 0 },
  { name: 'CORONER-2', repair: 137, refuel: 0, additional: 0 },
  { name: 'ETU', repair: 0, refuel: 0, additional: 0 },
]

export function formatCost(value) {
  if (value === null || value === undefined || value === '') return '$0'
  const str = String(value).trim()
  if (str.startsWith('$')) return str
  const num = Number(str)
  if (isNaN(num)) return `$${str}`
  return `$${num}`
}

export function parseCostNumber(val) {
  if (typeof val === 'number') return isNaN(val) ? 0 : val
  if (!val) return 0
  const clean = String(val).replace(/[^0-9.-]/g, '')
  const num = parseFloat(clean)
  return isNaN(num) ? 0 : num
}

export function calculateTotals(units = []) {
  let total = 0
  for (const u of units) {
    const r = parseCostNumber(u.repair)
    const f = parseCostNumber(u.refuel)
    const a = parseCostNumber(u.additional)
    total += r + f + a
  }
  return {
    totalNumber: total,
    totalFormatted: '$' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  }
}

export const blankMaintenance = (staffId = STAFF[0]?.id ?? '') => ({
  week: '3',
  date: '',
  staffId,
  evidenceImages: [''],
  units: DEFAULT_MAINTENANCE_UNITS.map((u) => ({ ...u, repair: 0, refuel: 0, additional: 0 })),
})

export const SAMPLE_MAINTENANCE = {
  week: '3',
  date: 'Saturday, 21 February 2026',
  staffId: 'tobrian-alrik',
  evidenceImages: [],
  units: DEFAULT_MAINTENANCE_UNITS.map((u) => ({ ...u })),
}

export function buildMaintenanceReport(form) {
  const staff = form.staff ?? {}
  const week = form.week?.trim() || '1'
  const dateStr = form.date?.trim() || ''
  const pic = staff.name ?? form.pic?.trim() ?? 'Tobrian Alrik'
  const rank = staff.rank ?? form.rank?.trim() ?? 'FireFighter III'

  const units = form.units ?? DEFAULT_MAINTENANCE_UNITS
  const { totalFormatted } = calculateTotals(units)

  const rowsBBCode = units
    .map((u, i) => {
      const no = i + 1
      const name = u.name?.trim() || `Unit-${no}`
      const rep = formatCost(u.repair)
      const ref = formatCost(u.refuel)
      const add = formatCost(u.additional)
      return `[tr]
[td1=white][center]${no}[/center][/td1]
[td1=white][center]${name}[/center][/td1]
[td1=white][center]${rep}[/center][/td1]
[td1=white][center]${ref}[/center][/td1]
[td1=white][center]${add}[/center][/td1]
[/tr]`
    })
    .join('\n')

  const validEvidence = (form.evidenceImages ?? [])
    .map((s) => normalizeImageUrl(s))
    .filter((s) => isImageUrl(s))

  const evidenceBBCode =
    validEvidence.length > 0
      ? validEvidence.map((url) => `[img]${url}[/img]`).join('\n')
      : '[img][/img]\n[img][/img]'

  const sigBlock = staff.signature ? `[img]${staff.signature}[/img]` : '<signature>'

  return `[divbox=beige][aligntable=left,0,0,0,0,0,transparent][left][img-resize=150]https://ristek.link/jgvrp-lsfd-logo[/img-resize][/left][/aligntable][aligntable=right,0,0,0,0,0,transparent][left][img-resize=150]https://ristek.link/jgvrp-lsfd-logo[/img-resize][/left][/aligntable] 
[center][size=170][font=times new roman]LOS SANTOS FIRE DEPARTMENT[/font][/size][/center] [center][size=170][font=times new roman]Hospital Financial Statement[/font][/size][/center][center][size=120][font=times new roman]Commited To Exellence[/font][/size][/center] [center][size=100][font=times new roman]Rockford Hills, South Blvd Del Perro / Rockford Drive, Los Santos Fire Department HQ[/font][/size] [center][size=100][font=times new roman]Email: lsfd@goverment.us[/font][/size][/center][/center]
[space][/space]
[divbox=black][/divbox]
To: Financial Division
From: Hospital Command 
Subject: Weekly Vehicle and Equipment Maintenance #${week}
Date: ${dateStr}
Person in Charge: ${pic}

[list=1][*]Summary of Salary Usage
This financial statement is submitted for the reimbursement of costs from the Weekly Vehicle and Equipment Maintenance program, which aims to ensure the proper inspection and upkeep of Davis Fire Station units.

[*]Salary Breakdown
[center]
[table]
[tr]
[td1=Red][center][b][color=white]No[/color][/b][/center][/td1]
[td1=Red][center][b][color=white]Unit[/color][/b][/center][/td1]
[td1=Red][center][b][color=white]Repair Cost[/color][/b][/center][/td1]
[td1=red][center][b][color=white]Refuel Cost[/color][/b][/center][/td1]
[td1=red][center][b][color=white]Additional Cost[/color][/b][/center][/td1]
[/tr]
${rowsBBCode}
[/table]
[/center]
[*]Total Requested Amount
[b]Total salary proposed: ${totalFormatted}
[/b]

[right]Best Regards,
${sigBlock}
[i]${pic}
${rank}[/i][/right]

[secspoiler=Photo evidence of activities.]
[center]${evidenceBBCode}[/center][/secspoiler]
[/divbox]`
}
