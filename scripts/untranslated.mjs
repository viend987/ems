/**
 * Mendaftar apa saja yang masih perlu versi Inggris, per kategori.
 *
 * Ada karena mencarinya dengan grep tidak bisa dipercaya: langkah yang ditulis
 * satu baris (`{ n: 12, kind: 'me', text: '...' }`) tidak punya `text:` di awal
 * baris, jadi pola yang berpatokan pada awal baris melewatkannya diam-diam.
 * Skrip ini mengimpor datanya, jadi yang terdaftar persis yang dibaca aplikasi.
 *
 * Jalankan: node scripts/untranslated.mjs [id-kategori ...]
 */
import { PROCEDURES } from '../src/data/index.js'
import { isCopyable } from '../src/lib/copy.js'

// Kanal radio sudah ditulis Inggris di server ini, jadi tidak diminta `en`.
const RADIO = new Set(['radio', 'deptradio', 'wt', 'ooc', 'deptooc'])
const SKIP = new Set(['command', 'anim', ...RADIO])

const INDONESIA =
  /\b(dan|yang|untuk|dengan|korban|sudah|tidak|saya|kami|menuju|lokasi|mohon|segera|siap|udah|nunggu|nemu|lagi|bersiap|silahkan|ke|di|dari|pada)\b/i

const only = process.argv.slice(2)
const cats = only.length ? PROCEDURES.filter((c) => only.includes(c.id)) : PROCEDURES

for (const cat of cats) {
  const lines = []

  if (!cat.nameEn) lines.push(`  CATEGORY name :: ${cat.name}`)
  if (!cat.blurbEn) lines.push(`  CATEGORY blurb :: ${cat.blurb}`)

  for (const section of cat.sections) {
    if (!section.nameEn) lines.push(`  SECTION ${section.id} :: ${section.name}`)

    for (const step of section.steps) {
      if (step.ref) continue // diterjemahkan di tempat ia didefinisikan

      // `alreadyEn` menandai baris yang di data memang sudah Inggris — mis.
      // format Doctor Report — jadi tidak ada yang perlu diterjemahkan.
      if (!step.en && !step.alreadyEn && isCopyable(step) && !SKIP.has(step.kind)) {
        lines.push(`  STEP ${step.kind} :: ${step.text}`)
      }
      // Baris radio yang kebetulan masih Indonesia tetap dilaporkan.
      if (!step.en && RADIO.has(step.kind) && INDONESIA.test(step.text)) {
        lines.push(`  RADIO-ID ${step.kind} :: ${step.text}`)
      }
      if (!step.en && !step.alreadyEn && step.kind === 'note') lines.push(`  NOTE :: ${step.text}`)
      if (step.note && !step.noteEn) lines.push(`  STEPNOTE :: ${step.note}`)
      if (step.label && !step.labelEn) lines.push(`  LABEL :: ${step.label}`)

      for (const branch of step.branches ?? []) {
        if (!branch.labelEn) lines.push(`  BRANCH :: ${branch.label}`)
      }
    }
  }

  if (lines.length) {
    console.log(`\n=== ${cat.id} (${lines.length}) ===`)
    for (const line of lines) console.log(line)
  }
}
