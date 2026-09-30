import { pick } from '../lib/lang.js'

// Vite mengurus hashing dan path akhir untuk semua foto unit (hanya URL, bukan isi file).
const IMAGES = import.meta.glob('../assets/units/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Harus sama dengan WIDTHS di scripts/units.mjs.
const WIDTHS = [480, 960]
const urlOf = (name, width, ext) => IMAGES[`../assets/units/${name}-${width}.${ext}`]
const srcsetOf = (name, ext) => WIDTHS.map((w) => `${urlOf(name, w, ext)} ${w}w`).join(', ')

// Lebar kartu yang sebenarnya di tiap ukuran layar: satu kolom penuh di ponsel,
// dua kolom di tablet, dan dua kolom di samping papan (~480px) di desktop.
// Dengan ini desktop 1x cukup mengunduh versi 480, bukan 960.
const SIZES = '(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw'

/**
 * Galeri unit: dua kolom kartu landscape. Fotonya ditampilkan apa adanya —
 * tidak dipotong dan tidak ada tampilan ukuran penuh, karena yang perlu terlihat
 * cuma bentuk kendaraannya dan rasio aslinya sudah pas untuk itu.
 *
 * Unit yang fotonya belum ada tetap tampil dengan callsign dan keterangannya.
 */
function UnitCard({ unit, lang }) {
  const images = (unit.images ?? []).filter((name) => urlOf(name, WIDTHS[0], 'webp'))

  return (
    <li className="flex flex-col overflow-hidden rounded-sm border border-line bg-panel">
      {images.map((name) => (
        // AVIF dulu, browser lama jatuh ke WebP — hanya satu yang diunduh.
        // `contents`: <picture> tidak membuat kotak sendiri, jadi <img> tetap
        // berukuran terhadap kartunya.
        <picture key={name} className="contents">
          <source type="image/avif" srcSet={srcsetOf(name, 'avif')} sizes={SIZES} />
          <img
            src={urlOf(name, WIDTHS[0], 'webp')}
            srcSet={srcsetOf(name, 'webp')}
            sizes={SIZES}
            alt={`Unit ${unit.callsign}`}
            loading="lazy"
            decoding="async"
            width="960"
            height="540"
            className="aspect-video w-full border-b border-line bg-raise object-cover"
          />
        </picture>
      ))}

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="slab text-lg text-alarm sm:text-xl">{unit.callsign}</h3>
          <span className="text-[11px] text-muted">{unit.vehicle}</span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-dim">{pick(unit, 'desc', lang)}</p>
      </div>
    </li>
  )
}

export default function UnitGallery({ categoryId, group, lang }) {
  return (
    <section id={`${categoryId}-${group.id}`} className="lazy-section scroll-mt-28 lg:scroll-mt-6">
      <h2 className="slab mb-1 flex items-center gap-2.5 text-lg text-bone sm:text-xl">
        <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
        {pick(group, 'name', lang)}
      </h2>
      <p className="mb-3 text-xs leading-relaxed text-dim">{pick(group, 'blurb', lang)}</p>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {group.units.map((unit) => (
          <UnitCard key={unit.callsign} unit={unit} lang={lang} />
        ))}
      </ul>
    </section>
  )
}
