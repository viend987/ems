import abc from './procedures/abc.js'
import animals from './procedures/animals.js'
import blood from './procedures/blood.js'
import coroner from './procedures/coroner.js'
import deat from './procedures/deat.js'
import drugs from './procedures/drugs.js'
import field from './procedures/field.js'
import fracture from './procedures/fracture.js'
import hospital from './procedures/hospital.js'
import hydrant from './procedures/hydrant.js'
import load from './procedures/load.js'
import mva from './procedures/mva.js'
import ocd from './procedures/ocd.js'
import radio from './procedures/radio.js'
import structure from './procedures/structure.js'
import vertical from './procedures/vertical.js'
import wounds from './procedures/wounds.js'
import LINKS from './links.js'
import PATROL from './patrol.js'
import UNITS from './units.js'
import { REFERENCE } from './reference.js'

/** Urutan kategori di papan. Kategori baru cukup diimpor dan ditaruh di sini. */
export const PROCEDURES = [
  field,
  deat,
  abc,
  fracture,
  wounds,
  drugs,
  radio,
  ocd,
  load,
  hospital,
  structure,
  mva,
  hydrant,
  coroner,
  vertical,
  animals,
  blood,
]

export const CATEGORIES = [...PROCEDURES, PATROL, ...REFERENCE, UNITS, LINKS]

export { LINKS, UNITS }

/** Kelompok di papan status, berurutan dari yang paling sering dipakai. */
export const GROUPS = [
  { id: 'tkp', name: 'TKP' },
  { id: 'radio', name: 'Radio' },
  { id: 'transport', name: 'Transport' },
  { id: 'pemadam', name: 'Pemadam' },
  { id: 'khusus', name: 'Khusus' },
  { id: 'laporan', name: 'Laporan' },
  { id: 'referensi', name: 'Referensi' },
]

/**
 * Rantai alur yang tampil di pita puncak layar. Ini pedoman DR-XABC dari
 * Field Handbook, dipetakan ke bagian yang menanganinya.
 */
export const FLOW = [
  { label: 'Danger', to: 'field#danger' },
  { label: 'Response', to: 'field#response' },
  { label: 'X — Pendarahan', to: 'deat#direct-pressure' },
  { label: 'Airway', to: 'abc#airway-headtilt' },
  { label: 'Breathing', to: 'abc#breathing-ecg' },
  { label: 'Circulation', to: 'abc#circulation-ecg' },
  { label: 'Cek Ulang', to: 'abc#circulation-normal' },
  { label: 'Load', to: 'load#load' },
  { label: 'Transport', to: 'hospital#arrive' },
]

export const DEFAULT_CATEGORY = 'field'
