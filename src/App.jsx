import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import BBCodeBuilder from './components/BBCodeBuilder.jsx'
import Board from './components/Board.jsx'
import CodeTable from './components/CodeTable.jsx'
import FlowBar from './components/FlowBar.jsx'
import Header from './components/Header.jsx'
import LinkList from './components/LinkList.jsx'
import PatrolLog from './components/PatrolLog.jsx'
import Section from './components/Section.jsx'
import SearchResults from './components/SearchResults.jsx'
import SectionNav from './components/SectionNav.jsx'
import UnitGallery from './components/UnitGallery.jsx'
import { CATEGORIES, PROCEDURES } from './data/index.js'
import { useCopy, useRoute, useTheme } from './hooks.js'
import { isCopyable } from './lib/copy.js'
import { allSteps, resolveCategory } from './lib/procedures.js'
import { searchAll } from './lib/search.js'

const RESOLVED = new Map(
  PROCEDURES.map((c) => resolveCategory(c)).map((c) => [c.id, c]),
)

const STEP_COUNT = [...allSteps([...RESOLVED.values()])].filter(isCopyable).length

export default function App() {
  const [route, go] = useRoute()
  const [status, copy] = useCopy()
  const [theme, toggleTheme] = useTheme()
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  const category = RESOLVED.get(route.category) ?? CATEGORIES.find((c) => c.id === route.category)
  const hits = useMemo(() => searchAll(query), [query])

  // "/" memfokuskan pencarian, buat yang tangannya sudah hafal.
  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  // Loncat ke bagian yang dituju percabangan atau pita alur.
  useEffect(() => {
    if (!route.section) return
    const el = document.getElementById(`${route.category}-${route.section}`)
    el?.scrollIntoView({ block: 'start' })
  }, [route.category, route.section])

  // Stabil antar-render: StepRow melewatkan render ulang hanya kalau propnya sama.
  const goAndClear = useCallback(
    (to) => {
      setQuery('')
      go(to)
    },
    [go],
  )

  const board = { active: route.category, onGo: goAndClear, query, onQuery: setQuery, searchRef }

  // Di desktop papan kategori berdiri sendiri di kiri, setinggi layar sejak
  // puncak halaman, sementara pita alur dan kepala halaman ikut kolom kanan.
  // Dengan begitu papan selalu berakhir tepat di dasar layar.
  return (
    <div className="mx-auto flex min-h-dvh max-w-[100rem] border-line min-[1616px]:border-x">
      <Board variant="rail" {...board} />

      <div className="flex min-w-0 flex-1 flex-col">
        <FlowBar onGo={goAndClear} />
        <Header stepCount={STEP_COUNT} theme={theme} onTheme={toggleTheme} />
        <Board variant="grid" {...board} />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {query.trim() ? (
            <SearchResults query={query} hits={hits} onGo={goAndClear} onClear={() => setQuery('')} />
          ) : (
            <>
              <div className="mb-4">
                <h2 className="slab text-2xl text-bone sm:text-3xl">{category.name}</h2>
                <p className="mt-1 max-w-prose text-xs leading-relaxed text-dim">{category.blurb}</p>
              </div>

              <SectionNav
                categoryId={category.id}
                sections={category.sections ?? category.tables ?? category.groups ?? category.fleet ?? []}
                onGo={goAndClear}
              />

              <div className="flex flex-col gap-8">
                {category.sections?.map((section) => (
                  <Section
                    key={section.id}
                    categoryId={category.id}
                    section={section}
                    status={status}
                    onCopy={copy}
                    onGo={goAndClear}
                  />
                ))}
                {category.tables?.map((table) => (
                  <CodeTable
                    key={table.id}
                    categoryId={category.id}
                    table={table}
                    status={status}
                    onCopy={copy}
                  />
                ))}
                {category.groups?.map((group) => (
                  <LinkList key={group.id} group={group} />
                ))}
                {category.fleet?.map((group) => (
                  <UnitGallery key={group.id} categoryId={category.id} group={group} />
                ))}
                {category.form === 'patrol' && <PatrolLog />}
                {category.form === 'builder' && <BBCodeBuilder />}
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-line px-4 py-6 text-center text-[11px] text-muted sm:px-6">
          Fan-made tool by JGVRP Player. Based on LSFD Handbook Procedure + Some Adjustments· JGVRP
        </footer>
      </div>

      <div aria-live="polite" className="sr-only">
        {status ? (status.ok ? 'Teks tersalin ke clipboard.' : 'Gagal menyalin. Salin manual dari baris.') : ''}
      </div>
    </div>
  )
}
