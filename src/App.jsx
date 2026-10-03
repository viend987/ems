import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import BBCodeBuilder from './components/BBCodeBuilder.jsx'
import Board from './components/Board.jsx'
import CodeTable from './components/CodeTable.jsx'
import CriminalRecordReport from './components/CriminalRecordReport.jsx'
import FlowBar from './components/FlowBar.jsx'
import Header from './components/Header.jsx'
import LinkList from './components/LinkList.jsx'
import PatientCareReport from './components/PatientCareReport.jsx'
import PatrolLog from './components/PatrolLog.jsx'
import Section from './components/Section.jsx'
import SearchResults from './components/SearchResults.jsx'
import SectionNav from './components/SectionNav.jsx'
import UnitGallery from './components/UnitGallery.jsx'
import VehicleMaintenanceReport from './components/VehicleMaintenanceReport.jsx'
import { CATEGORIES, PROCEDURES } from './data/index.js'
import { useCopy, useRoute, useTheme } from './hooks.js'
import { useLang } from './hooks.js'
import { pick } from './lib/lang.js'
import { strings } from './lib/strings.js'
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
  const [lang, toggleLang] = useLang()
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  const category = RESOLVED.get(route.category) ?? CATEGORIES.find((c) => c.id === route.category)
  const hits = useMemo(() => searchAll(query, lang), [query, lang])
  const s = strings(lang)

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

  // Loncat ke bagian yang dituju percabangan atau pita alur. `route.nonce` ikut
  // jadi kebergantungan supaya perpindahan ke bagian yang sedang aktif pun tetap
  // melompat — lihat catatan di useRoute.
  //
  // Perpindahan tanpa bagian tujuan — papan kategori — melompat ke puncak isi.
  // Tanpa itu, membuka kategori lain saat halaman tergeser jauh ke bawah menaruh
  // judulnya di atas layar dan yang terlihat justru tengah-tengah kategori baru.
  // Yang dituju puncak `main`, bukan puncak dokumen, karena di bawah `lg` papan
  // kategori adalah grid setinggi layar di atas isi: mendarat di dokumen paling
  // atas berarti mendarat di menu yang baru saja diketuk. Di `lg` ke atas papan
  // itu jadi kolom sendiri dan scroll-margin `main` cukup besar untuk menjepit
  // lompatan ke angka nol, jadi kepala halaman dan pita alur tetap terlihat.
  // Pada muat pertama (`nonce` 0) posisinya tidak diusik, supaya pemulihan gulir
  // peramban setelah reload tetap bekerja.
  useEffect(() => {
    if (route.section) {
      const el = document.getElementById(`${route.category}-${route.section}`)
      el?.scrollIntoView({ block: 'start' })
    } else if (route.nonce > 0) {
      document.getElementById('isi')?.scrollIntoView({ block: 'start' })
    }
  }, [route.category, route.section, route.nonce])

  // Stabil antar-render: StepRow melewatkan render ulang hanya kalau propnya sama.
  const goAndClear = useCallback(
    (to) => {
      setQuery('')
      go(to)
    },
    [go],
  )

  const board = { active: route.category, onGo: goAndClear, query, onQuery: setQuery, searchRef, lang }

  // Di desktop papan kategori berdiri sendiri di kiri, setinggi layar sejak
  // puncak halaman, sementara pita alur dan kepala halaman ikut kolom kanan.
  // Dengan begitu papan selalu berakhir tepat di dasar layar.
  return (
    <div className="mx-auto flex min-h-dvh max-w-[100rem] border-line min-[1616px]:border-x">
      <Board variant="rail" {...board} />

      <div className="flex min-w-0 flex-1 flex-col">
        <FlowBar onGo={goAndClear} lang={lang} />
        <Header
          stepCount={STEP_COUNT}
          theme={theme}
          onTheme={toggleTheme}
          lang={lang}
          onLang={toggleLang}
        />
        <Board variant="grid" {...board} />

        <main id="isi" className="min-w-0 flex-1 scroll-mt-4 px-4 py-6 sm:px-6 lg:scroll-mt-96 lg:px-8">
          {query.trim() ? (
            <SearchResults
              query={query}
              hits={hits}
              onGo={goAndClear}
              onClear={() => setQuery('')}
              lang={lang}
            />
          ) : (
            <>
              <div className="mb-4">
                <h2 className="slab text-2xl text-bone sm:text-3xl">{pick(category, 'name', lang)}</h2>
                <p className="mt-1 max-w-prose text-xs leading-relaxed text-dim">
                  {pick(category, 'blurb', lang)}
                </p>
              </div>

              <SectionNav
                categoryId={category.id}
                sections={category.sections ?? category.tables ?? category.groups ?? category.fleet ?? []}
                onGo={goAndClear}
                lang={lang}
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
                    lang={lang}
                  />
                ))}
                {category.tables?.map((table) => (
                  <CodeTable
                    key={table.id}
                    categoryId={category.id}
                    table={table}
                    status={status}
                    onCopy={copy}
                    lang={lang}
                  />
                ))}
                {category.groups?.map((group) => (
                  <LinkList key={group.id} group={group} lang={lang} />
                ))}
                {category.fleet?.map((group) => (
                  <UnitGallery key={group.id} categoryId={category.id} group={group} lang={lang} />
                ))}
                {category.form === 'patrol' && <PatrolLog lang={lang} />}
                {category.form === 'builder' && <BBCodeBuilder lang={lang} />}
                {category.form === 'pcr' && <PatientCareReport lang={lang} />}
                {category.form === 'maintenance' && <VehicleMaintenanceReport lang={lang} />}
                {category.form === 'criminal-record' && <CriminalRecordReport lang={lang} />}
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-line px-4 py-6 text-center text-[11px] text-muted sm:px-6">
          {s.footer}
        </footer>
      </div>

      <div aria-live="polite" className="sr-only">
        {status ? (status.ok ? s.liveCopied : s.liveFailed) : ''}
      </div>
    </div>
  )
}
