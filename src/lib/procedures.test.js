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
