import STAFF from '../data/staff.js'
import { isImageUrl, normalizeImageUrl } from './patrol.js'

export const FORUM_MAINTENANCE_URL = 'https://fire.los-santos.net/viewforum.php?f=270'

export const DEFAULT_MAINTENANCE_UNITS = [
  { name: 'RA-111', repair: '', refuel: '', additional: '' },
  { name: 'RA-112', repair: '', refuel: '', additional: '' },
  { name: 'RA-113', repair: '', refuel: '', additional: '' },
  { name: 'RA-114', repair: '', refuel: '', additional: '' },
  { name: 'RA-115', repair: '', refuel: '', additional: '' },
  { name: 'Engine-111', repair: '', refuel: '', additional: '' },
  { name: 'Engine-112', repair: '', refuel: '', additional: '' },
  { name: 'Engine-113', repair: '', refuel: '', additional: '' },
  { name: 'Engine-114', repair: '', refuel: '', additional: '' },
  { name: 'Brush-111', repair: '', refuel: '', additional: '' },
  { name: 'Brush-112', repair: '', refuel: '', additional: '' },
  { name: 'Squad', repair: '', refuel: '', additional: '' },
  { name: 'USAR-1', repair: '', refuel: '', additional: '' },
  { name: 'OSAR-1', repair: '', refuel: '', additional: '' },
  { name: 'Hazmat', repair: '', refuel: '', additional: '' },
  { name: 'OC-111', repair: '', refuel: '', additional: '' },
  { name: 'OC-112', repair: '', refuel: '', additional: '' },
  { name: 'OC-113', repair: '', refuel: '', additional: '' },
  { name: 'OC-114', repair: '', refuel: '', additional: '' },
  { name: 'OC-115', repair: '', refuel: '', additional: '' },
  { name: 'CORONER-1', repair: '', refuel: '', additional: '' },
  { name: 'ETU', repair: '', refuel: '', additional: '' },
]

export function formatCost(value) {
  if (value === null || value === undefined || value === '') return '$0'
  const str = String(value).trim()
  if (str.startsWith('$')) {
    const inner = str.slice(1).trim()
    return inner === '' ? '$0' : `$${inner}`
  }
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
  week: '',
  date: '',
  staffId,
  evidenceImages: [''],
  units: DEFAULT_MAINTENANCE_UNITS.map((u) => ({ ...u })),
})

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
