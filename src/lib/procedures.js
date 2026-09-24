import { PROCEDURES } from '../data/index.js'

/**
 * Langkah yang berulang di banyak cabang ditulis sekali dengan `id`, lalu
 * disebut lagi sebagai `{ ref: 'id' }`. Modul ini menyatukan keduanya supaya
 * komponen tampilan cukup menerima daftar langkah yang sudah utuh.
 */

/** Peta id → langkah, dikumpulkan dari seluruh kategori. */
export function stepDefinitions(categories) {
  const map = new Map()
  for (const category of categories) {
    for (const section of category.sections) {
      for (const step of section.steps) {
        if (step.id && !step.ref) map.set(step.id, step)
      }
    }
  }
  return map
}

const DEFINITIONS = stepDefinitions(PROCEDURES)

export function resolveStep(step, definitions = DEFINITIONS) {
  if (!step.ref) return step
  const source = definitions.get(step.ref)
  if (!source) throw new Error(`Langkah "${step.ref}" dirujuk tapi tidak pernah didefinisikan.`)
  return { ...source, reused: true }
}

export function resolveCategory(category, definitions = DEFINITIONS) {
  return {
    ...category,
    sections: category.sections.map((section) => ({
      ...section,
      steps: section.steps.map((step) => resolveStep(step, definitions)),
    })),
  }
}

/** Semua langkah dari daftar kategori yang sudah di-resolve — untuk tes dan pencarian. */
export function* allSteps(categories) {
  for (const category of categories) {
    for (const section of category.sections) {
      yield* section.steps
    }
  }
}
