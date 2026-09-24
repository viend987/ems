// Vite mengurus hashing dan path akhir untuk semua foto unit.
const IMAGES = import.meta.glob('../assets/units/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
const srcOf = (name) => IMAGES[`../assets/units/${name}.webp`]

/**
 * Galeri unit: dua kolom kartu landscape. Fotonya ditampilkan apa adanya —
 * tidak dipotong dan tidak ada tampilan ukuran penuh, karena yang perlu terlihat
 * cuma bentuk kendaraannya dan rasio aslinya sudah pas untuk itu.
 *
 * Unit yang fotonya belum ada tetap tampil dengan callsign dan keterangannya.
 */
function UnitCard({ unit }) {
  const images = (unit.images ?? []).map((name) => [name, srcOf(name)]).filter(([, src]) => src)

  return (
    <li className="flex flex-col overflow-hidden rounded-sm border border-line bg-panel">
      {images.map(([name, src]) => (
        <img
          key={name}
          src={src}
          alt={`Unit ${unit.callsign}`}
          loading="lazy"
          decoding="async"
          width="960"
          height="540"
          className="w-full border-b border-line bg-raise object-cover"
        />
      ))}

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="slab text-lg text-alarm sm:text-xl">{unit.callsign}</h3>
          <span className="text-[11px] text-muted">{unit.vehicle}</span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-dim">{unit.desc}</p>
      </div>
    </li>
  )
}

export default function UnitGallery({ categoryId, group }) {
  return (
    <section id={`${categoryId}-${group.id}`} className="scroll-mt-28 lg:scroll-mt-6">
      <h2 className="slab mb-1 flex items-center gap-2.5 text-lg text-bone sm:text-xl">
        <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
        {group.name}
      </h2>
      <p className="mb-3 text-xs leading-relaxed text-dim">{group.blurb}</p>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {group.units.map((unit) => (
          <UnitCard key={unit.callsign} unit={unit} />
        ))}
      </ul>
    </section>
  )
}
