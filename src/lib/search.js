import { PROCEDURES } from '../data/index.js'
import { REFERENCE } from '../data/reference.js'
import UNITS from '../data/units.js'
import { copyText } from './copy.js'
import { resolveCategory } from './procedures.js'

/**
 * Pencarian di sini adalah pelengkap, bukan pintu masuk: semua isi tetap bisa
 * dicapai dengan mengklik papan. Karena itu indeksnya sederhana — satu larik
 * datar yang dibangun sekali saat modul dimuat.
 */

function buildIndex() {
  const entries = []

  for (const category of PROCEDURES.map((c) => resolveCategory(c))) {
    for (const section of category.sections) {
      for (const step of section.steps) {
        entries.push({
          kind: step.kind,
          n: step.n,
          label: step.label,
          text: copyText(step) || step.text,
          categoryId: category.id,
          categoryName: category.name,
          sectionName: section.name,
          to: `${category.id}#${section.id}`,
        })
      }
    }
  }

  for (const category of REFERENCE) {
    for (const table of category.tables) {
      for (const row of table.rows) {
        entries.push({
          kind: 'reference',
          text: `${row.code} — ${row.desc}`,
          code: row.code,
          categoryId: category.id,
          categoryName: category.name,
          sectionName: table.name,
          to: `${category.id}#${table.id}`,
        })
      }
    }
  }

  for (const group of UNITS.fleet) {
    for (const unit of group.units) {
      entries.push({
        kind: 'reference',
        text: `${unit.callsign} (${unit.vehicle}) — ${unit.desc}`,
        categoryId: UNITS.id,
        categoryName: UNITS.name,
        sectionName: group.name,
        to: `${UNITS.id}#${group.id}`,
      })
    }
  }

  // Teks yang dicocokkan disiapkan sekali dalam huruf kecil, bukan diulang di
  // setiap ketikan untuk ratusan entri. Pemisah NUL mencegah kata dari dua
  // kolom berbeda tersambung jadi kecocokan palsu.
  for (const entry of entries) {
    entry.haystack = [entry.text, entry.sectionName, entry.categoryName, entry.label ?? '']
      .join('\u0000')
      .toLowerCase()
  }

  return entries
}

// Dibangun saat pertama kali ada yang mencari, bukan saat halaman dibuka —
// kebanyakan kunjungan tidak pernah menyentuh kolom cari sama sekali.
let INDEX = null

export function searchAll(query, limit = 40) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  INDEX ??= buildIndex()

  // "/71" dan "71" sama-sama berarti cari langkah bernomor 71.
  const asNumber = Number(q.replace(/^\//, ''))
  const numeric = Number.isInteger(asNumber) && q.replace(/^\//, '') !== ''

  const hits = []
  for (const entry of INDEX) {
    if ((numeric && entry.n === asNumber) || entry.haystack.includes(q)) hits.push(entry)
    if (hits.length >= limit) break
  }

  return hits
}
