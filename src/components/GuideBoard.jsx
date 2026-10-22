import { GUIDES } from '../data/guides.js'
import { pick } from '../lib/lang.js'
import { strings } from '../lib/strings.js'

export default function GuideBoard({ variant, active, onGo, lang, onSwitchToOps }) {
  const s = strings(lang)
  const isEn = lang === 'en'
  const currentGuide = GUIDES.find((g) => g.id === active) || GUIDES[0]

  const scrollToSection = (secId) => {
    const el = document.getElementById(secId) || document.getElementById(`${active}-${secId}`)
    el?.scrollIntoView?.({ block: 'start' })
  }

  if (variant === 'grid') {
    return (
      <div className="border-b border-line px-4 py-4 sm:px-6 lg:hidden bg-panel">
        <div className="flex items-center justify-between pb-2 border-b border-line">
          <span className="slab text-xs font-bold uppercase tracking-wider text-muted">
            {s.guideNavTitle}
          </span>
          <button
            type="button"
            onClick={onSwitchToOps}
            className="text-[11px] text-alarm hover:underline flex items-center gap-1 font-medium"
          >
            ← {s.guideBackToOps}
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-1.5">
          {GUIDES.map((guide) => {
            const isActive = active === guide.id
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => onGo(guide.id)}
                className={`slab flex items-center justify-between rounded-sm px-3 py-2 text-left text-xs ${
                  isActive ? 'bg-alarm text-white font-bold' : 'border border-line bg-ink text-bone'
                }`}
              >
                <span>{pick(guide, 'title', lang)}</span>
                <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-muted'}`}>
                  {guide.readTime}
                </span>
              </button>
            )
          })}
        </div>

        {/* Daftar Isi Cepat */}
        {currentGuide.sections && (
          <div className="mt-4 pt-3 border-t border-line">
            <span className="slab text-[10px] uppercase tracking-wider text-muted block mb-2">
              {s.guideSectionsTitle}
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              {currentGuide.sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="rounded-sm border border-line bg-ink px-2 py-1 text-left text-dim hover:text-bone hover:border-alarm"
                >
                  {pick(sec, 'name', lang)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <nav
      aria-label={s.guideNavTitle}
      className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-panel lg:flex xl:w-72"
    >
      <div className="shrink-0 border-b border-line p-3">
        <div className="flex items-center justify-between">
          <span className="slab text-[10px] tracking-[0.24em] uppercase text-muted font-bold">
            {s.guideNavTitle}
          </span>
          <button
            type="button"
            onClick={onSwitchToOps}
            className="text-[10px] text-alarm hover:underline font-bold"
          >
            ← {isEn ? 'Operations' : 'Operasional'}
          </button>
        </div>
      </div>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 space-y-4">
        {/* Modul Panduan Utama */}
        <div className="space-y-1">
          {GUIDES.map((guide) => {
            const isActive = active === guide.id
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => onGo(guide.id)}
                className={`w-full rounded-sm p-2.5 text-left transition-colors border ${
                  isActive
                    ? 'border-alarm bg-alarm text-white'
                    : 'border-line bg-ink text-bone hover:border-muted hover:bg-raise'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-mono ${isActive ? 'text-white/80' : 'text-alarm'}`}>
                    {pick(guide, 'badge', lang)}
                  </span>
                  <span className={isActive ? 'text-white/70' : 'text-muted'}>
                    {guide.readTime}
                  </span>
                </div>
                <div className="slab text-xs font-bold mt-1">
                  {pick(guide, 'title', lang)}
                </div>
                <p className={`mt-1 text-[10px] line-clamp-2 leading-relaxed ${isActive ? 'text-white/85' : 'text-dim'}`}>
                  {pick(guide, 'blurb', lang)}
                </p>
              </button>
            )
          })}
        </div>

        {/* Daftar Isi Panduan Aktif */}
        {currentGuide.sections && (
          <div className="rounded-sm border border-line bg-ink p-3 space-y-2">
            <span className="slab text-[10px] uppercase tracking-wider text-muted font-bold block">
              {s.guideSectionsTitle}
            </span>
            <div className="space-y-1">
              {currentGuide.sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="flex w-full items-center gap-1.5 py-1 text-left text-[11px] text-dim hover:text-alarm transition-colors"
                >
                  <span className="text-muted">•</span>
                  <span>{pick(sec, 'name', lang)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Panduan Mendatang (Coming Soon) */}
        <div className="rounded-sm border border-line/60 bg-raise/30 p-3 space-y-1.5 text-muted">
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {s.guideUpcoming}
          </span>
          <div className="text-[11px] space-y-1">
            <div className="opacity-60">• [GUIDE] Blood Transfusion Protocol</div>
            <div className="opacity-60">• [GUIDE] Structural Firefighting Tactics</div>
            <div className="opacity-60">• [GUIDE] Legal Limits & Paramedic Rights</div>
          </div>
        </div>

        {/* Sumber Resmi */}
        <div className="border-t border-line pt-3 px-1 text-[10px] text-muted space-y-1">
          <span className="font-bold uppercase tracking-wider block">{s.guideSource}:</span>
          <div>• JGVRP Server Rules 2024</div>
          <div>• LSFD Op. Guide #1239</div>
        </div>
      </div>
    </nav>
  )
}
