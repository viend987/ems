import { describe, expect, it } from 'vitest'
import { CATEGORIES, FLOW, GROUPS, PROCEDURES } from '../data/index.js'
import { KINDS, copyText, isCopyable } from './copy.js'
import { allSteps, resolveCategory, stepDefinitions } from './procedures.js'

const resolved = PROCEDURES.map((c) => resolveCategory(c))

describe('integritas data prosedur', () => {
  it('setiap id langkah yang bisa dirujuk unik', () => {
    const seen = new Map()
    for (const [id, step] of stepDefinitions(PROCEDURES)) {
      expect(seen.has(id), `id langkah ganda: ${id}`).toBe(false)
      seen.set(id, step)
    }
  })

  it('setiap ref menunjuk id yang benar-benar ada', () => {
    const defined = new Set(stepDefinitions(PROCEDURES).keys())
    for (const category of PROCEDURES) {
      for (const section of category.sections) {
        for (const step of section.steps) {
          if (!step.ref) continue
          expect(defined.has(step.ref), `ref menggantung: ${step.ref} di ${category.id}#${section.id}`).toBe(
            true,
          )
        }
      }
    }
  })

  it('setiap langkah memakai kind yang dikenal', () => {
    for (const step of allSteps(resolved)) {
      expect(KINDS, `kind tak dikenal: ${step.kind}`).toContain(step.kind)
    }
  })

  it('setiap langkah yang bisa disalin punya teks', () => {
    for (const step of allSteps(resolved)) {
      if (!isCopyable(step)) continue
      expect(copyText(step).trim().length, `teks kosong di langkah ${step.n ?? step.id}`).toBeGreaterThan(0)
    }
  })

  it('tidak ada id kategori yang bentrok', () => {
    const ids = CATEGORIES.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('tidak ada id bagian yang bentrok di dalam satu kategori', () => {
    for (const category of PROCEDURES) {
      const ids = category.sections.map((s) => s.id)
      expect(new Set(ids).size, `id bagian ganda di ${category.id}`).toBe(ids.length)
    }
  })

  it('setiap kategori masuk kelompok yang terdaftar', () => {
    const groups = new Set(GROUPS.map((g) => g.id))
    for (const category of CATEGORIES) {
      expect(groups, `kelompok tak dikenal di ${category.id}`).toContain(category.group)
    }
  })

  it('setiap subgroup kategori terdaftar di kelompoknya', () => {
    const byGroup = new Map(GROUPS.map((g) => [g.id, (g.subgroups ?? []).map((s) => s.id)]))
    for (const category of CATEGORIES) {
      if (!category.subgroup) continue
      expect(
        byGroup.get(category.group) ?? [],
        `subgroup "${category.subgroup}" di ${category.id} tidak ada di kelompok "${category.group}"`,
      ).toContain(category.subgroup)
    }
  })

  it('tidak ada id subgroup ganda dalam satu kelompok', () => {
    for (const group of GROUPS) {
      const ids = (group.subgroups ?? []).map((s) => s.id)
      expect(new Set(ids).size, `subgroup ganda di kelompok ${group.id}`).toBe(ids.length)
    }
  })
})

describe('sasaran loncat', () => {
  const targets = new Set()
  for (const category of PROCEDURES) {
    for (const section of category.sections) targets.add(`${category.id}#${section.id}`)
  }

  const branchTargets = []
  for (const category of PROCEDURES) {
    for (const section of category.sections) {
      for (const step of section.steps) {
        for (const branch of step.branches ?? []) {
          branchTargets.push([`${category.id}#${section.id}`, branch.to])
        }
      }
    }
  }

  it('setiap percabangan menunjuk bagian yang ada', () => {
    for (const [from, to] of branchTargets) {
      expect(targets, `percabangan dari ${from} menunjuk ${to} yang tidak ada`).toContain(to)
    }
  })

  it('setiap simpul pita alur menunjuk bagian yang ada', () => {
    for (const node of FLOW) {
      expect(targets, `simpul alur "${node.label}" menunjuk ${node.to} yang tidak ada`).toContain(node.to)
    }
  })
})

describe('resolveCategory', () => {
  it('mengganti ref dengan isi definisinya', () => {
    const deat = resolved.find((c) => c.id === 'deat')
    const elevation = deat.sections.find((s) => s.id === 'elevation')
    const last = elevation.steps.at(-1)

    expect(last.kind).toBe('do')
    expect(last.text).toBe('Apakah pendarahan berhenti?')
    expect(last.n).toBe(73)
  })

  it('menandai langkah hasil rujukan supaya bisa ditampilkan beda', () => {
    const deat = resolved.find((c) => c.id === 'deat')
    const elevation = deat.sections.find((s) => s.id === 'elevation')
    expect(elevation.steps.at(-1).reused).toBe(true)
  })

  it('tidak menandai langkah aslinya sebagai rujukan', () => {
    const deat = resolved.find((c) => c.id === 'deat')
    const direct = deat.sections.find((s) => s.id === 'direct-pressure')
    expect(direct.steps[0].reused).toBeFalsy()
  })

  it('merujuk lintas kategori', () => {
    const load = resolved.find((c) => c.id === 'load')
    const radioSection = load.sections.find((s) => s.id === 'load-radio')
    expect(radioSection.steps[0].text).toContain('Status-7e')
    expect(radioSection.steps[0].reused).toBe(true)
  })
})

describe('terjemahan Inggris', () => {
  // Penerjemahan dikerjakan bertahap dan disengaja: yang tersering dipakai
  // lebih dulu. Tes ini bukan untuk memaksa semuanya selesai, tapi untuk
  // menjaga yang sudah selesai supaya tidak pelan-pelan bolong lagi.
  const LENGKAP = [
    'field',
    'deat',
    'airway',
    'breathing',
    'circulation',
    'load',
    'fracture',
    'wounds',
    'hospital',
    'drugs',
    'radio',
    'ocd',
    'coroner',
  ]

  // Yang butuh versi Inggris: baris yang diketik sebagai narasi atau ucapan.
  // Dikecualikan:
  // - `command` dan `anim` — sintaks game, bukan bahasa.
  // - kanal radio — di server ini lalu lintas radio memang ditulis Inggris sejak
  //   awal ("~ to OCD. Requesting 10-70 ILS Unit at 10-20 Legion."), jadi tidak
  //   ada yang perlu diterjemahkan. Yang Indonesia di antaranya dijaga tes
  //   terpisah di bawah.
  const RADIO = new Set(['radio', 'deptradio', 'wt', 'ooc', 'deptooc'])
  const SKIP = new Set(['command', 'anim', ...RADIO])

  const copyable = (cat) =>
    cat.sections.flatMap((s) => s.steps).filter((st) => isCopyable(st) && !SKIP.has(st.kind))

  it('baris radio yang masih berbahasa Indonesia punya versi Inggris', () => {
    // Heuristik, dan memang boleh: kalau ia salah menuduh, yang terjadi cuma
    // diminta menulis terjemahan untuk baris yang sudah Inggris.
    const indonesia =
      /(dan|yang|untuk|dengan|korban|sudah|tidak|saya|kami|menuju|lokasi|mohon|segera|siap|udah|nunggu|nemu|lagi|bersiap|silahkan)/i
    const bolong = []
    for (const cat of PROCEDURES) {
      for (const sec of cat.sections) {
        for (const st of sec.steps) {
          if (!RADIO.has(st.kind) || st.en) continue
          if (indonesia.test(st.text)) bolong.push(`${cat.id}#${sec.id}: ${st.text.slice(0, 50)}`)
        }
      }
    }
    // Sisa yang belum dikerjakan masih boleh ada selama penerjemahan bertahap,
    // tapi jumlahnya tidak boleh bertambah.
    expect(bolong.length, bolong.join(' | ')).toBeLessThanOrEqual(11)
  })

  it('setiap kategori, kelompok, dan simpul alur punya nama Inggris', () => {
    // Ini rangka situs, bukan isi RP: ia harus lengkap walau penerjemahan
    // barisnya masih bertahap, supaya sidebar tidak setengah Inggris.
    for (const cat of CATEGORIES) {
      expect(cat.nameEn, `${cat.id}.nameEn`).toBeTruthy()
      expect(cat.blurbEn, `${cat.id}.blurbEn`).toBeTruthy()
    }
    for (const group of GROUPS) {
      expect(group.nameEn, `kelompok ${group.id}`).toBeTruthy()
      for (const sub of group.subgroups ?? []) {
        expect(sub.nameEn, `subgroup ${group.id}/${sub.id}`).toBeTruthy()
      }
    }
    for (const node of FLOW) expect(node.labelEn, `alur ${node.label}`).toBeTruthy()
  })

  it('kategori yang sudah selesai tetap utuh terjemahannya', () => {
    for (const id of LENGKAP) {
      const cat = resolveCategory(PROCEDURES.find((c) => c.id === id))
      // `alreadyEn` menandai baris yang teksnya sudah Inggris di data, mis.
      // format Doctor Report — tidak ada yang perlu diterjemahkan di sana.
      const bolong = copyable(cat).filter((st) => !st.en && !st.alreadyEn)
      expect(bolong.map((st) => st.text), `${id} punya baris tanpa terjemahan`).toEqual([])
    }
  })

  it('kategori yang sudah selesai menerjemahkan nama bagian dan blurb-nya', () => {
    for (const id of LENGKAP) {
      const cat = PROCEDURES.find((c) => c.id === id)
      expect(cat.nameEn, `${id}.nameEn`).toBeTruthy()
      expect(cat.blurbEn, `${id}.blurbEn`).toBeTruthy()
      for (const section of cat.sections) {
        expect(section.nameEn, `${id}#${section.id}.nameEn`).toBeTruthy()
      }
    }
  })

  it('terjemahan tidak sama persis dengan aslinya', () => {
    for (const id of LENGKAP) {
      const cat = resolveCategory(PROCEDURES.find((c) => c.id === id))
      for (const st of copyable(cat)) {
        if (st.en) expect(st.en, `${id}: "${st.text}"`).not.toBe(st.text)
      }
    }
  })

  it('setiap label percabangan yang diterjemahkan tetap menunjuk tujuan yang sama', () => {
    for (const cat of PROCEDURES) {
      for (const section of cat.sections) {
        for (const step of section.steps) {
          for (const branch of step.branches ?? []) {
            if (branch.labelEn) expect(branch.to, `${cat.id}: ${branch.labelEn}`).toBeTruthy()
          }
        }
      }
    }
  })

  // Laporan cakupan, supaya sisa pekerjaannya kelihatan tanpa menghitung manual.
  it('melaporkan cakupan terjemahan per kategori', () => {
    const baris = []
    let total = 0
    let jadi = 0
    for (const cat of PROCEDURES) {
      const steps = copyable(resolveCategory(cat))
      const n = steps.filter((st) => st.en || st.alreadyEn).length
      total += steps.length
      jadi += n
      baris.push(`${cat.id}: ${n}/${steps.length}`)
    }
    // Bukan assertion ketat — cuma menjaga hitungannya waras dan terbaca.
    expect(total).toBeGreaterThan(400)
    expect(jadi).toBeGreaterThan(0)
    console.log(`Terjemahan: ${jadi}/${total} baris — ${baris.join(', ')}`)
  })
})
