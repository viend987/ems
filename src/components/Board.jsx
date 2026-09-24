import { CATEGORIES, GROUPS } from '../data/index.js'
import SearchField from './SearchField.jsx'

/**
 * Papan status stasiun. Di desktop ia kolom menempel di kiri; di layar kecil
 * ia jadi menu kotak-kotak yang membungkus ke bawah, supaya semua kategori
 * kelihatan sekaligus tanpa perlu digeser ke samping.
 */

const BY_GROUP = GROUPS.map((group) => ({
  ...group,
  items: CATEGORIES.filter((c) => c.group === group.id),
})).filter((g) => g.items.length > 0)

function Light({ active }) {
  return (
    <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${active ? 'bg-white' : 'bg-line'}`} />
  )
}

export default function Board({ active, onGo, query, onQuery, searchRef }) {
  return (
    <>
      {/* Layar kecil: menu kotak-kotak */}
      <div className="border-b border-line px-4 py-4 sm:px-6 lg:hidden">
        <SearchField value={query} onChange={onQuery} inputRef={searchRef} />

        <nav aria-label="Kategori prosedur" className="mt-3 flex flex-col gap-3">
          {BY_GROUP.map((group) => (
            <div key={group.id}>
              <div className="slab mb-1.5 text-[10px] tracking-[0.24em] text-muted">{group.name}</div>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {group.items.map((cat) => {
                  const isActive = active === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onGo(cat.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`slab min-h-11 rounded-sm px-2.5 py-2 text-center text-xs leading-tight ${
                        isActive ? 'bg-alarm text-white' : 'border border-line bg-panel text-bone'
                      }`}
                    >
                      {cat.name}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Desktop: papan menempel */}
      <nav
        aria-label="Kategori prosedur"
        className="sticky top-0 hidden h-dvh w-60 shrink-0 overflow-y-auto border-r border-line bg-panel lg:block xl:w-64"
      >
        <div className="border-b border-line p-3">
          <SearchField value={query} onChange={onQuery} inputRef={searchRef} />
        </div>

        {BY_GROUP.map((group) => (
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
