import logoAvif from '../assets/lsfd.avif'
import logoWebp from '../assets/lsfd.webp'

export default function Header({ stepCount }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:gap-6 sm:px-6 lg:px-8">
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
        <div className="hidden shrink-0 text-right text-[11px] leading-relaxed text-muted lg:block">
          <div className="text-signal">{stepCount} baris siap salin</div>
          <div>nomor di kiri tidak ikut tersalin</div>
        </div>
      </div>
    </header>
  )
}
