/**
 * Daftar lompat antar-bagian di dalam satu kategori. Membungkus ke bawah,
 * bukan menggulir ke samping, supaya bagian yang banyak (ABC punya sebelas)
 * tetap kelihatan seluruhnya sekaligus.
 */
export default function SectionNav({ categoryId, sections, onGo }) {
  if (sections.length < 2) return null

  return (
    <nav aria-label="Bagian dalam kategori ini" className="mb-6 flex flex-wrap gap-1">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onGo(`${categoryId}#${section.id}`)}
          className="rounded-sm border border-line bg-panel px-2.5 py-1.5 text-[11px] text-dim hover:border-signal hover:text-signal"
        >
          {section.name}
        </button>
      ))}
    </nav>
  )
}
