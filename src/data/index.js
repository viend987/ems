import abc from './procedures/abc.js'
import animals from './procedures/animals.js'
import coroner from './procedures/coroner.js'
import deat from './procedures/deat.js'
import drugs from './procedures/drugs.js'
import field from './procedures/field.js'
import fracture from './procedures/fracture.js'
import hospital from './procedures/hospital.js'
import load from './procedures/load.js'
import mva from './procedures/mva.js'
import ocd from './procedures/ocd.js'
import radio from './procedures/radio.js'
import vertical from './procedures/vertical.js'
import wounds from './procedures/wounds.js'
import LINKS from './links.js'
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
  coroner,
  mva,
  vertical,
  animals,
]

export const CATEGORIES = [...PROCEDURES, ...REFERENCE, LINKS]

export { LINKS }

/** Kelompok di papan status, berurutan dari yang paling sering dipakai. */
export const GROUPS = [
  { id: 'tkp', name: 'TKP' },
  { id: 'radio', name: 'Radio' },
  { id: 'transport', name: 'Transport' },
  { id: 'khusus', name: 'Khusus' },
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
