import { FLOW } from '../data/index.js'
import { pick } from '../lib/lang.js'

/**
 * Pita alur di puncak layar: pedoman DR-XABC yang selalu terlihat, sekaligus
 * satu-satunya elemen bergerak di web ini. Di layar ≥1280px rantainya muat
 * sehingga diam; di bawah itu ia bergeser pelan karena tak ada cara lain
 * menampilkannya utuh. Geraknya tidak pernah menahan aksi apa pun.
 */
function Chain({ onGo, ariaHidden, lang }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {FLOW.map((node, i) => (
        <span key={`${node.label}-${i}`} className="flex items-center">
          <button
            type="button"
            tabIndex={ariaHidden ? -1 : 0}
            onClick={() => onGo(node.to)}
            className="slab px-1 py-0.5 text-[11px] tracking-[0.18em] text-dim transition-none hover:text-signal sm:text-xs"
          >
            {pick(node, 'label', lang)}
          </button>
          {i < FLOW.length - 1 && <span className="px-2 text-[11px] text-alarm sm:px-3">&rsaquo;</span>}
        </span>
      ))}
      <span className="px-5 text-line xl:hidden">|</span>
    </div>
  )
}

export default function FlowBar({ onGo, lang }) {
  return (
    <div className="overflow-hidden border-b border-line bg-panel">
      <div className="flow-track flex w-max py-2 xl:mx-auto xl:w-full xl:max-w-[100rem] xl:justify-center xl:px-6">
        <Chain onGo={onGo} lang={lang} />
        {/* Salinan kedua menjaga pergeseran tetap mulus di layar sempit.
            Di layar lebar animasinya mati dan salinan ini disembunyikan. */}
        <div className="xl:hidden">
          <Chain onGo={onGo} lang={lang} ariaHidden />
        </div>
      </div>
    </div>
  )
}
