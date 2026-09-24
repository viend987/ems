export default function SearchResults({ query, hits, onGo, onClear }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="slab text-lg text-bone sm:text-xl">
          {hits.length > 0 ? `${hits.length} baris cocok` : 'Tidak ada yang cocok'}
        </h2>
        <button type="button" onClick={onClear} className="text-[11px] text-muted hover:text-signal">
          Kembali ke papan
        </button>
      </div>

      {hits.length === 0 ? (
        <p className="text-xs leading-relaxed text-dim">
          Tidak ada baris yang memuat “{query}”. Coba potongan kata yang lebih pendek, atau pilih
          kategorinya langsung dari papan.
        </p>
      ) : (
        <div className="flex flex-col gap-px overflow-hidden rounded-sm border border-line bg-line">
          {hits.map((hit, i) => (
            <button
              key={`${hit.to}-${i}`}
              type="button"
              onClick={() => onGo(hit.to)}
              className="flex w-full flex-col gap-1 bg-panel px-3 py-2.5 text-left hover:bg-raise sm:px-4"
            >
              <span className="text-[10px] text-muted">
                {hit.categoryName} · {hit.sectionName}
                {hit.n ? ` · /${hit.n}` : ''}
              </span>
              <span className="text-[12.5px] leading-relaxed break-words text-bone">{hit.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
