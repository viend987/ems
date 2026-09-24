import { copySection, isCopyable } from '../lib/copy.js'
import StepRow from './StepRow.jsx'

export default function Section({ categoryId, section, status, onCopy, onGo }) {
  const anchor = `${categoryId}-${section.id}`
  const allKey = `${anchor}:all`
  const count = section.steps.filter(isCopyable).length
  const copiedAll = status?.key === allKey

  return (
    <section id={anchor} className="scroll-mt-28 lg:scroll-mt-6">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
          <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
          {section.name}
        </h2>
        {count > 0 && (
          <button
            type="button"
            onClick={() => onCopy(allKey, copySection(section))}
            className={`text-[11px] ${copiedAll ? 'text-mech' : 'text-muted hover:text-signal'}`}
          >
            {copiedAll ? (status.ok ? `${count} baris tersalin` : 'gagal menyalin') : 'Salin semua'}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-px overflow-hidden rounded-sm border border-line">
        {section.steps.map((step, i) => (
          <StepRow
            key={`${anchor}-${i}`}
            rowKey={`${anchor}-${i}`}
            step={step}
            status={status}
            onCopy={onCopy}
            onGo={onGo}
          />
        ))}
      </div>
    </section>
  )
}
