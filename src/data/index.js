import airway from './procedures/airway.js'
import animals from './procedures/animals.js'
import blood from './procedures/blood.js'
import breathing from './procedures/breathing.js'
import circulation from './procedures/circulation.js'
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
import BBCODES from './bbcodes.js'
import BUILDER from './builder.js'
import LINKS from './links.js'
import MAINTENANCE from './maintenance.js'
import PATROL from './patrol.js'
import PCR from './pcr.js'
import RECORDS from './records.js'
import UNITS from './units.js'
import { REFERENCE } from './reference.js'

/** Urutan kategori di papan. Kategori baru cukup diimpor dan ditaruh di sini. */
export const PROCEDURES = [
  field,
  deat,
  airway,
  breathing,
  circulation,
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

export const CATEGORIES = [
  ...PROCEDURES,
  BUILDER,
  BBCODES,
  PATROL,
  PCR,
  MAINTENANCE,
  RECORDS,
  ...REFERENCE,
  UNITS,
  LINKS,
]

export { LINKS, UNITS }

/**
 * Kelompok di papan status, berurutan dari yang paling sering dipakai.
 *
 * Kelompok boleh punya `subgroups` untuk menata isinya satu tingkat lebih
 * dalam; kategori memilih sub-kelompoknya lewat `subgroup: '<id>'`. Kategori
 * tanpa `subgroup` tetap tampil langsung di bawah judul kelompoknya, jadi
 * kelompok lama tidak perlu diubah. Sub-kelompok yang belum berisi apa pun
 * tidak digambar — ia muncul sendiri begitu ada kategori yang masuk ke sana.
 */
export const GROUPS = [
  { id: 'tkp', name: 'TKP', nameEn: 'On Scene' },
  { id: 'radio', name: 'Radio', nameEn: 'Radio' },
  { id: 'transport', name: 'Transport', nameEn: 'Transport' },
  { id: 'pemadam', name: 'Pemadam', nameEn: 'Fire' },
  { id: 'khusus', name: 'Khusus', nameEn: 'Special' },
  {
    id: 'laporan',
    name: 'Laporan',
    nameEn: 'Reports',
    subgroups: [
      { id: 'general', name: 'General', nameEn: 'General' },
      { id: 'field', name: 'Field Unit', nameEn: 'Field Unit' },
      { id: 'hospital', name: 'Hospital Unit', nameEn: 'Hospital Unit' },
      { id: 'lspd', name: 'LSPD', nameEn: 'LSPD' },
    ],
  },
  { id: 'referensi', name: 'Referensi', nameEn: 'Reference' },
]

/**
 * Rantai alur yang tampil di pita puncak layar. Ini pedoman DR-XABC dari
 * Field Handbook, dipetakan ke bagian yang menanganinya.
 */
export const FLOW = [
  { label: 'Danger', labelEn: 'Danger', to: 'field#danger' },
  { label: 'Response', labelEn: 'Response', to: 'field#response' },
  { label: 'X — Pendarahan', labelEn: 'X — Bleeding', to: 'deat#direct-pressure' },
  { label: 'Airway', labelEn: 'Airway', to: 'airway#airway-headtilt' },
  { label: 'Breathing', labelEn: 'Breathing', to: 'breathing#breathing-ecg' },
  { label: 'Circulation', labelEn: 'Circulation', to: 'circulation#circulation-ecg' },
  { label: 'Cek Ulang', labelEn: 'Re-check', to: 'circulation#circulation-normal' },
  { label: 'Load', labelEn: 'Load', to: 'load#load' },
  { label: 'Transport', labelEn: 'Transport', to: 'hospital#arrive' },
]

export const DEFAULT_CATEGORY = 'field'
