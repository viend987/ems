import { CATEGORIES, GROUPS } from '../data/index.js'
import SearchField from './SearchField.jsx'

/**
 * Papan status stasiun. Di desktop (`variant="rail"`) ia kolom kiri setinggi
 * layar yang menempel sejak puncak halaman; kolom cari tetap di atas dan hanya
 * daftar kategorinya yang menggulir, di dalam papan itu sendiri. Di layar kecil
 * (`variant="grid"`) ia jadi menu kotak-kotak yang membungkus ke bawah, supaya
 * semua kategori kelihatan sekaligus tanpa perlu digeser ke samping.
 *
 * Kelompok bisa punya sub-kelompok (lihat `GROUPS` di src/data/index.js).
 * Kategori tanpa `subgroup` tetap berdiri langsung di bawah judul kelompoknya,
 * dan sub-kelompok yang kosong tidak digambar sama sekali.
 */

const BY_GROUP = GROUPS.map((group) => {
  const items = CATEGORIES.filter((c) => c.group === group.id)
  return {
    ...group,
    loose: items.filter((c) => !c.subgroup),
    subgroups: (group.subgroups ?? [])
      .map((sub) => ({ ...sub, items: items.filter((c) => c.subgroup === sub.id) }))
      .filter((sub) => sub.items.length > 0),
  }
}).filter((group) => group.loose.length > 0 || group.subgroups.length > 0)

function Light({ active }) {
  return (
    <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${active ? 'bg-white' : 'bg-line'}`} />
  )
}

export default function Board({ variant, active, onGo, query, onQuery, searchRef }) {
  if (variant === 'grid') {
    const Tiles = ({ items }) => (
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {items.map((cat) => {
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
    )

    return (
      <div className="border-b border-line px-4 py-4 sm:px-6 lg:hidden">
        <SearchField value={query} onChange={onQuery} inputRef={searchRef} />

        <nav aria-label="Kategori prosedur" className="mt-3 flex flex-col gap-3">
          {BY_GROUP.map((group) => (
            <div key={group.id}>
              <div className="slab mb-1.5 text-[10px] tracking-[0.24em] text-muted">{group.name}</div>
              {group.loose.length > 0 && <Tiles items={group.loose} />}

              {group.subgroups.map((sub) => (
                <div key={sub.id} className="mt-2 border-l border-line pl-2.5">
                  <div className="mb-1.5 text-[11px] text-muted">{sub.name}</div>
                  <Tiles items={sub.items} />
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>
    )
  }

  const Item = ({ cat, indent }) => {
    const isActive = active === cat.id
    return (
      <button
        type="button"
        onClick={() => onGo(cat.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex w-full items-center gap-2.5 py-2 pr-3 text-left ${indent} ${
          isActive ? 'bg-alarm' : 'hover:bg-raise'
        }`}
      >
        <Light active={isActive} />
        <span className={`slab flex-1 text-sm ${isActive ? 'text-white' : 'text-bone'}`}>{cat.name}</span>
      </button>
    )
  }

  return (
    <nav
      aria-label="Kategori prosedur"
      className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-panel lg:flex xl:w-64"
    >
      <div className="shrink-0 border-b border-line p-3">
        <SearchField value={query} onChange={onQuery} inputRef={searchRef} />
      </div>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {BY_GROUP.map((group) => (
          <div key={group.id} className="border-b border-line py-2">
            <div className="slab px-3 py-1.5 text-[10px] tracking-[0.24em] text-muted">{group.name}</div>

            {group.loose.map((cat) => (
              <Item key={cat.id} cat={cat} indent="pl-3" />
            ))}

            {group.subgroups.map((sub) => (
              <div key={sub.id} className="mt-0.5 ml-3 border-l border-line">
                <div className="py-1 pl-3 text-[11px] text-muted">{sub.name}</div>
                {sub.items.map((cat) => (
                  <Item key={cat.id} cat={cat} indent="pl-3" />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}
