import Icon from './Icon.jsx'
import { strings } from '../lib/strings.js'
import logoAvif from '../assets/lsfd.avif'
import logoWebp from '../assets/lsfd.webp'

export default function Header({ stepCount, theme, onTheme, lang, onLang }) {
  const gelap = theme === 'dark'
  const s = strings(lang)

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[100rem] items-center gap-4 px-4 py-5 sm:gap-6 sm:px-6 lg:px-8">
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
        <div className="min-w-0 flex-1">
          <h1 className="slab text-[clamp(1.75rem,6vw,3.25rem)] text-bone">
            Los Santos <span className="text-alarm">Fire Dept</span>
          </h1>
          <p className="mt-1 text-[11px] leading-relaxed text-dim sm:text-xs">
            {s.tagline}
          </p>
        </div>
        {/* Tombol tema duduk di pojok kanan atas: sudah di atas seperti yang
            diminta, dan tidak menambah elemen melayang. Di layar kecil hanya
            tombolnya yang tampil, hitungan langkahnya yang disembunyikan. */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right text-[11px] leading-relaxed text-muted lg:block">
            <div className="text-signal">{s.stepCount(stepCount)}</div>
          </div>

          {/* Bahasa baris RP. Labelnya kode dua huruf, bukan bendera: bendera
              menandai negara, bukan bahasa. */}
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
