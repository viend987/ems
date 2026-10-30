import Icon from './Icon.jsx'
import { strings } from '../lib/strings.js'
import logoAvif from '../assets/lsfd.avif'
import logoWebp from '../assets/lsfd.webp'

export default function Header({
  stepCount,
  theme,
  onTheme,
  lang,
  onLang,
  mode = 'ops',
  onMode,
}) {
  const gelap = theme === 'dark'
  const s = strings(lang)

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[100rem] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
          <picture className="contents">
            <source type="image/avif" srcSet={logoAvif} />
            <img
              src={logoWebp}
              alt=""
              width="64"
              height="64"
              className="size-12 shrink-0 sm:size-16"
              fetchPriority="high"
            />
          </picture>
          <div className="min-w-0">
            <h1 className="slab text-[clamp(1.5rem,5vw,2.75rem)] text-bone">
              Los Santos <span className="text-alarm">Fire Dept</span>
            </h1>
          </div>
        </div>

        {/* Right side: Mode Switcher & Utility Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher */}
          <div
            role="tablist"
            aria-label="Mode aplikasi"
            className="flex rounded-sm border border-line bg-panel p-0.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'ops'}
              onClick={() => onMode?.('ops')}
              title={s.modeOpsDesc}
              className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs transition-colors ${
                mode === 'ops'
                  ? 'bg-alarm text-white font-bold'
                  : 'text-dim hover:text-bone'
              }`}
            >
              <Icon name="bolt" className="size-3.5 shrink-0" />
              <span className="slab uppercase tracking-wide">{s.modeOps}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'guide'}
              onClick={() => onMode?.('guide')}
              title={s.modeGuideDesc}
              className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs transition-colors ${
                mode === 'guide'
                  ? 'bg-alarm text-white font-bold'
                  : 'text-dim hover:text-bone'
              }`}
            >
              <Icon name="book" className="size-3.5 shrink-0" />
              <span className="slab uppercase tracking-wide">{s.modeGuide}</span>
            </button>
          </div>

          <div className="hidden text-right text-[11px] leading-relaxed text-muted xl:block">
            {mode === 'ops' ? (
              <div className="text-signal">{s.stepCount(stepCount)}</div>
            ) : (
              <div className="text-signal font-mono text-[10px]">LSFD DOCTRINE</div>
            )}
          </div>

          {/* Bahasa baris RP */}
          <button
            type="button"
            onClick={onLang}
            title={lang === 'en' ? s.toIndonesian : s.toEnglish}
            aria-label={lang === 'en' ? s.toIndonesian : s.toEnglish}
            className="slab flex size-9 items-center justify-center rounded-sm border border-line bg-panel text-[11px] text-dim hover:border-alarm hover:text-bone"
          >
            {s.langShort}
          </button>

          <button
            type="button"
            onClick={onTheme}
            title={gelap ? s.toLight : s.toDark}
            aria-label={gelap ? s.toLight : s.toDark}
            aria-pressed={gelap}
            className="flex size-9 items-center justify-center rounded-sm border border-line bg-panel text-dim hover:border-alarm hover:text-bone"
          >
            <Icon name={gelap ? 'sun' : 'moon'} className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  )
}
