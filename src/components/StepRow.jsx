import { Component } from 'preact'
import { copyText, isCopyable, prefixOf } from '../lib/copy.js'

/**
 * Satu baris = satu teks siap salin. Nomor di kiri adalah penanda mata untuk
 * shortcut in-game; ia tidak pernah ikut tersalin. Mengklik di mana saja pada
 * baris menyalin teksnya.
 *
 * Warna menandai jenis baris, tapi tidak pernah jadi satu-satunya penanda —
 * awalan /me, /do, /r selalu tertulis.
 */

// Satu warna per kanal chat, sehingga jenis baris kebaca sebelum teksnya.
const TONE = {
  me: { edge: 'border-l-chat-me', prefix: 'text-chat-me' },
  do: { edge: 'border-l-chat-do', prefix: 'text-chat-do' },
  radio: { edge: 'border-l-chat-radio', prefix: 'text-chat-radio' },
  deptradio: { edge: 'border-l-chat-dept', prefix: 'text-chat-dept' },
  shout: { edge: 'border-l-chat-shout', prefix: 'text-chat-shout' },
  command: { edge: 'border-l-chat-cmd', prefix: 'text-chat-cmd' },
  anim: { edge: 'border-l-chat-anim', prefix: 'text-chat-anim' },
  // Bicara biasa tidak punya awalan, jadi tidak perlu warna penanda.
  say: { edge: 'border-l-bone', prefix: 'text-bone' },
  // OOC berada di luar cerita, jadi sengaja dibuat paling tenang.
  ooc: { edge: 'border-l-muted', prefix: 'text-muted' },
  deptooc: { edge: 'border-l-muted', prefix: 'text-muted' },
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

function StepRowView({ step, rowKey, status, onCopy, onGo }) {
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
        className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-raise sm:gap-4 sm:px-4"
      >
        <span
          className={`mt-px w-9 shrink-0 text-[11px] tabular-nums sm:w-16 ${
            copied ? (status.ok ? 'text-mech' : 'text-alarm') : 'text-bone'
          }`}
        >
          {copied ? marker : step.n ? `/${step.n}` : '—'}
        </span>

        <span className="min-w-0 flex-1 text-[13.5px] leading-relaxed break-words sm:text-[13px]">
          {prefix && <span className={`${tone.prefix} mr-1.5`}>{prefix}</span>}
          <span className="text-bone">{step.text}</span>
          {step.label && <span className="ml-2 text-[11px] text-muted">({step.label})</span>}
          {step.reused && <span className="ml-2 text-[11px] text-muted">ulang</span>}
          {step.note && <span className="ml-2 text-[11px] text-muted">— {step.note}</span>}
        </span>

        {/* Di HP ikon ini tidak memberi tahu apa-apa — tidak ada hover di sana dan
            seluruh barisnya memang bisa diketuk — jadi lebarnya dikembalikan ke teks. */}
        <span aria-hidden="true" className="mt-px hidden shrink-0 text-xs text-muted sm:block">
          ⧉
        </span>
      </button>

      {step.branches && (
        <div className="px-3 pb-2.5 pl-[3.125rem] sm:px-4 sm:pl-24">
          <Branches branches={step.branches} onGo={onGo} />
        </div>
      )}
    </div>
  )
}

/**
 * Setiap klik salin mengubah `status`, dan tanpa ini seluruh baris di kategori
 * ikut di-render ulang — 167 baris di ABC — padahal yang berubah cuma penanda
 * "tersalin" di satu atau dua baris. Baris hanya digambar ulang kalau isinya
 * berganti atau status salinnya sendiri berubah.
 *
 * Preact inti tidak punya memo() tanpa preact/compat, jadi ini ditulis langsung.
 */
export default class StepRow extends Component {
  shouldComponentUpdate(next) {
    const prev = this.props
    if (
      prev.step !== next.step ||
      prev.rowKey !== next.rowKey ||
      prev.onCopy !== next.onCopy ||
      prev.onGo !== next.onGo
    ) {
      return true
    }
    const was = prev.status?.key === prev.rowKey ? prev.status : null
    const now = next.status?.key === next.rowKey ? next.status : null
    return was !== now
  }

  render(props) {
    return <StepRowView {...props} />
  }
}
