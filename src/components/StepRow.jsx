import { copyText, isCopyable, prefixOf } from '../lib/copy.js'

/**
 * Satu baris = satu teks siap salin. Nomor di kiri adalah penanda mata untuk
 * shortcut in-game; ia tidak pernah ikut tersalin. Mengklik di mana saja pada
 * baris menyalin teksnya.
 *
 * Warna menandai jenis baris, tapi tidak pernah jadi satu-satunya penanda —
 * awalan /me, /do, /r selalu tertulis.
 */

const TONE = {
  me: { edge: 'border-l-signal', prefix: 'text-signal' },
  do: { edge: 'border-l-calm', prefix: 'text-calm' },
  radio: { edge: 'border-l-alarm', prefix: 'text-alarm' },
  say: { edge: 'border-l-bone', prefix: 'text-bone' },
  command: { edge: 'border-l-mech', prefix: 'text-mech' },
  anim: { edge: 'border-l-anim', prefix: 'text-anim' },
  note: { edge: 'border-l-line', prefix: 'text-muted' },
}

function Note({ step, onGo }) {
  return (
    <div className="border-l-2 border-l-line bg-ink px-3 py-2.5 sm:px-4">
      <p className="text-[11px] leading-relaxed text-muted sm:text-xs">{step.text}</p>
      {step.branches && <Branches branches={step.branches} onGo={onGo} />}
    </div>
  )
}

function Branches({ branches, onGo }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {branches.map((branch) => (
        <button
          key={branch.to + branch.label}
          type="button"
          onClick={() => onGo(branch.to)}
          className="rounded-sm border border-line bg-panel px-2.5 py-1.5 text-[11px] text-dim hover:border-signal hover:text-signal"
        >
          {branch.label}
        </button>
      ))}
    </div>
  )
}

export default function StepRow({ step, rowKey, status, onCopy, onGo }) {
  if (!isCopyable(step)) return <Note step={step} onGo={onGo} />

  const tone = TONE[step.kind] ?? TONE.say
  const text = copyText(step)
  const prefix = prefixOf(step)
  const copied = status?.key === rowKey
  const marker = copied ? (status.ok ? 'tersalin' : 'gagal') : (step.n ?? '·')

  return (
    <div className={`border-l-2 bg-panel ${tone.edge}`}>
      <button
        type="button"
        onClick={() => onCopy(rowKey, text)}
        title="Klik untuk menyalin"
        className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-raise sm:gap-4 sm:px-4"
      >
        <span
          className={`mt-px w-14 shrink-0 text-[10px] tabular-nums sm:w-16 sm:text-[11px] ${
            copied ? (status.ok ? 'text-mech' : 'text-alarm') : 'text-muted'
          }`}
        >
          {copied ? marker : step.n ? `/${step.n}` : '—'}
        </span>

        <span className="min-w-0 flex-1 text-[12.5px] leading-relaxed break-words sm:text-[13px]">
          {prefix && <span className={`${tone.prefix} mr-1.5`}>{prefix}</span>}
          <span className="text-bone">{step.text}</span>
          {step.label && <span className="ml-2 text-[11px] text-muted">({step.label})</span>}
          {step.reused && <span className="ml-2 text-[11px] text-muted">ulang</span>}
          {step.note && <span className="ml-2 text-[11px] text-muted">— {step.note}</span>}
        </span>

        <span aria-hidden="true" className="mt-px shrink-0 text-xs text-muted">
          ⧉
        </span>
      </button>

      {step.branches && (
        <div className="px-3 pb-2.5 pl-20 sm:px-4 sm:pl-24">
          <Branches branches={step.branches} onGo={onGo} />
        </div>
      )}
    </div>
  )
}
