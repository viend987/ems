/**
 * Kumpulan rujukan. Bentuknya tautan keluar, bukan teks yang disalin, jadi
 * tiap barisnya anchor sungguhan yang membuka tab baru.
 */
export default function LinkList({ group }) {
  return (
    <section id={`links-${group.id}`} className="lazy-section scroll-mt-28 lg:scroll-mt-6">
      <h2 className="slab mb-2 flex items-center gap-2.5 text-lg text-bone sm:text-xl">
        <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
        {group.name}
      </h2>

      <div className="flex flex-col gap-px overflow-hidden rounded-sm border border-line bg-line">
        {group.items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex w-full flex-col gap-1 bg-panel px-3 py-2.5 hover:bg-raise sm:px-4"
          >
            <span className="flex items-baseline gap-2 text-[12.5px] text-calm">
              {item.label}
            </span>
            <span className="text-[12.5px] leading-relaxed text-dim">{item.desc}</span>
            <span className="text-[10px] break-all text-muted">{item.url}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
