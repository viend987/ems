import { CATEGORIES, GROUPS } from '../data/index.js'
import SearchField from './SearchField.jsx'

/**
 * Papan status stasiun. Di desktop ia kolom menempel; di bawah 1024px ia
 * berubah jadi deretan chip mendatar yang bisa digeser, menempel di bawah
 * header. Kategori aktif menyala merah dengan lampu indikator.
 */

function Light({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`size-1.5 shrink-0 rounded-full ${active ? 'bg-bone' : 'bg-line'}`}
    />
  )
}

export default function Board({ active, onGo, query, onQuery, searchRef }) {
  const byGroup = GROUPS.map((group) => ({
    ...group,
    items: CATEGORIES.filter((c) => c.group === group.id),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      {/* Ponsel & tablet: chip mendatar */}
      <div className="sticky top-0 z-20 border-b border-line bg-ink/95 backdrop-blur lg:hidden">
        <div className="px-4 py-3 sm:px-6">
          <SearchField value={query} onChange={onQuery} inputRef={searchRef} />
        </div>
        <div className="no-bar flex gap-1.5 overflow-x-auto px-4 pb-3 sm:px-6">
          {byGroup.map((group) => (
            <div key={group.id} className="flex shrink-0 items-center gap-1.5">
              <span className="slab px-1 text-[10px] tracking-[0.2em] text-muted">{group.name}</span>
              {group.items.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onGo(cat.id)}
                  aria-current={active === cat.id ? 'page' : undefined}
                  className={`slab shrink-0 rounded-sm px-3 py-2 text-xs whitespace-nowrap ${
                    active === cat.id ? 'bg-alarm text-white' : 'bg-panel text-dim'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
              <span className="px-1 text-line">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: papan menempel */}
      <nav
        aria-label="Kategori prosedur"
        className="sticky top-0 hidden h-dvh w-60 shrink-0 overflow-y-auto border-r border-line bg-panel lg:block xl:w-64"
      >
        <div className="border-b border-line p-3">
          <SearchField value={query} onChange={onQuery} inputRef={searchRef} />
        </div>

        {byGroup.map((group) => (
          <div key={group.id} className="border-b border-line py-2">
            <div className="slab px-3 py-1.5 text-[10px] tracking-[0.24em] text-muted">{group.name}</div>
            {group.items.map((cat) => {
              const isActive = active === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onGo(cat.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left ${
                    isActive ? 'bg-alarm' : 'hover:bg-raise'
                  }`}
                >
                  <Light active={isActive} />
                  <span className={`slab flex-1 text-sm ${isActive ? 'text-white' : 'text-bone'}`}>
                    {cat.name}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </>
  )
}
