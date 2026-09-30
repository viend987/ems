import Icon from './Icon.jsx'
import logoAvif from '../assets/lsfd.avif'
import logoWebp from '../assets/lsfd.webp'

export default function Header({ stepCount, theme, onTheme }) {
  const gelap = theme === 'dark'

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
            Panduan RP ketik LSFD di JGVRP. Klik barisnya, teksnya masuk clipboard.
          </p>
        </div>
        {/* Tombol tema duduk di pojok kanan atas: sudah di atas seperti yang
            diminta, dan tidak menambah elemen melayang. Di layar kecil hanya
            tombolnya yang tampil, hitungan langkahnya yang disembunyikan. */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right text-[11px] leading-relaxed text-muted lg:block">
            <div className="text-signal">{stepCount} baris siap salin</div>
          </div>

          <button
            type="button"
            onClick={onTheme}
            title={gelap ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            aria-label={gelap ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
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
