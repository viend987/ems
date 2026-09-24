/**
 * Tata letak untuk kategori referensi (anim, command, kamus kode). Bentuknya
 * pasangan "kode + arti", bukan urutan langkah, jadi yang bisa disalin hanya
 * kodenya.
 */
export default function CodeTable({ categoryId, table, status, onCopy }) {
  const anchor = `${categoryId}-${table.id}`

  return (
    <section id={anchor} className="scroll-mt-28 lg:scroll-mt-6">
      <h2 className="slab mb-2 flex items-center gap-2.5 text-lg text-bone sm:text-xl">
        <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
        {table.name}
      </h2>

      <div className="flex flex-col gap-px overflow-hidden rounded-sm border border-line">
        {table.rows.map((row, i) => {
          const rowKey = `${anchor}-${i}`
          const copied = status?.key === rowKey
          return (
            <button
              key={rowKey}
              type="button"
              onClick={() => onCopy(rowKey, row.code)}
              title="Klik untuk menyalin kodenya"
              className="flex w-full flex-col gap-1 bg-panel px-3 py-2.5 text-left hover:bg-raise sm:flex-row sm:items-baseline sm:gap-4 sm:px-4"
            >
              <span
                className={`w-full shrink-0 text-[12.5px] font-medium sm:w-56 ${
                  copied ? (status.ok ? 'text-mech' : 'text-alarm') : 'text-signal'
                }`}
              >
                {copied ? (status.ok ? 'tersalin' : 'gagal menyalin') : row.code}
              </span>
              <span className="text-[12.5px] leading-relaxed text-dim">{row.desc}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
