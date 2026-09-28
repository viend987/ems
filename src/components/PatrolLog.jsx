import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import { writeClipboard } from '../lib/copy.js'
import {
  buildPatrolLog,
  durationMinutes,
  formatDuration,
  isImageUrl,
  MIN_DUTY_MINUTES,
  normalizeImageUrl,
  problems,
  todayIso,
} from '../lib/patrol.js'

/**
 * Form Weekly Patrol Log. Pemain hanya mengisi kolom; BBCode lengkapnya
 * disusun ulang di setiap ketikan dan tinggal disalin ke forum.
 *
 * Isian disimpan di localStorage supaya refresh tidak menghapus tulisan
 * Activity yang panjang. "Laporan baru" mengosongkan semuanya kecuali nama.
 */

const STORE_KEY = 'lsfd:patrol-draft'

const blank = (staffId = STAFF[0]?.id ?? '') => ({
  staffId,
  date: todayIso(),
  crew: 'N/A',
  start: '',
  end: '',
  startImage: '',
  endImage: '',
  activity: '',
})

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    if (saved && typeof saved === 'object') return { ...blank(), ...saved }
  } catch {
    // penyimpanan tidak tersedia atau isinya rusak
  }
  return blank()
}

function writeDraft(draft) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(draft))
  } catch {
    // halaman tetap jalan tanpa mengingat isian
  }
}

const inputClass =
  'w-full rounded-sm border border-line bg-ink px-3 py-2 text-xs text-bone placeholder:text-muted'

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="slab text-[11px] tracking-[0.18em] text-muted">{label}</span>
      {children}
      {hint && <span className="text-[11px] leading-relaxed text-muted">{hint}</span>}
    </label>
  )
}

async function uploadImage(file) {
  const body = new FormData()
  body.append('image', file)
  const res = await fetch('/api/imgur', { method: 'POST', body })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data?.link) throw new Error(data?.error ?? `Upload gagal (status ${res.status}).`)
  return data.link
}

/**
 * Link gambar bukti. Selalu bisa diisi manual; upload (tombol, tempel
 * screenshot dengan Ctrl+V, atau seret berkas ke kotak ini) hanya jalan pintas
 * yang mengisi kolom yang sama.
 */
function ImageField({ label, value, onChange }) {
  const [state, setState] = useState({ busy: false, error: '' })
  const [broken, setBroken] = useState('')
  const picker = useRef(null)

  const send = async (file) => {
    if (!file?.type.startsWith('image/')) return
    setState({ busy: true, error: '' })
    try {
      onChange(await uploadImage(file))
      setState({ busy: false, error: '' })
    } catch (err) {
      setState({ busy: false, error: `${err.message} Upload manual ke imgur.com lalu tempel link-nya.` })
    }
  }

  const url = normalizeImageUrl(value)
  const showPreview = url && isImageUrl(url) && broken !== url

  return (
    <div
      className="flex flex-col gap-1.5"
      onPaste={(e) => {
        const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith('image/'))
        if (file) {
          e.preventDefault()
          send(file)
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        send(e.dataTransfer?.files?.[0])
      }}
    >
      <span className="slab text-[11px] tracking-[0.18em] text-muted">Gambar {label}</span>
      <div className="flex gap-1.5">
        <input
          type="url"
          value={value}
          onInput={(e) => onChange(e.currentTarget.value)}
          placeholder="https://i.imgur.com/xxxx.jpeg"
          aria-label={`Link gambar ${label}`}
          className={inputClass}
        />
        <button
          type="button"
          disabled={state.busy}
          onClick={() => picker.current?.click()}
          className="shrink-0 rounded-sm border border-line bg-panel px-3 py-2 text-[11px] text-dim hover:border-signal hover:text-signal disabled:opacity-60"
        >
          {state.busy ? 'Mengunggah…' : 'Upload'}
        </button>
        <input
          ref={picker}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            send(e.currentTarget.files?.[0])
            e.currentTarget.value = ''
          }}
        />
      </div>
      {state.error ? (
        <span className="text-[11px] leading-relaxed text-alarm">{state.error}</span>
      ) : url && broken === url ? (
        <span className="text-[11px] leading-relaxed text-alarm">
          Gambar dari link ini tidak bisa dimuat. Cek lagi link-nya.
        </span>
      ) : (
        <span className="text-[11px] leading-relaxed text-muted">
          Tempel link, klik Upload, atau Ctrl+V screenshot di kolom ini.
        </span>
      )}
      {showPreview && (
        <img
          src={url}
          alt={`Bukti ${label}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setBroken(url)}
          className="aspect-video w-full max-w-72 rounded-sm border border-line bg-raise object-cover"
        />
      )}
    </div>
  )
}

export default function PatrolLog() {
  const [draft, setDraft] = useState(readDraft)
  const [copied, setCopied] = useState(null)
  const timer = useRef(null)

  useEffect(() => writeDraft(draft), [draft])
  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }))

  const staff = STAFF.find((s) => s.id === draft.staffId) ?? STAFF[0]
  const form = { ...draft, staff }
  const bbcode = buildPatrolLog(form)
  const issues = problems(form)
  const minutes = durationMinutes(draft.start, draft.end)

  const copy = async () => {
    const ok = await writeClipboard(bbcode)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1600)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Personal Details</legend>
          <Field label="Nama anggota">
            <select
              value={staff?.id}
              onChange={(e) => set('staffId')(e.currentTarget.value)}
              className={inputClass}
            >
              {STAFF.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          {staff && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px] leading-relaxed">
              <dt className="text-muted">Badge</dt>
              <dd className="text-bone">{staff.badge}</dd>
              <dt className="text-muted">Rank</dt>
              <dd className="text-bone">{staff.rank}</dd>
              <dt className="text-muted">District</dt>
              <dd className="text-bone">{staff.district}</dd>
            </dl>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-4 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Duty Information</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date">
              <input
                type="date"
                value={draft.date}
                onInput={(e) => set('date')(e.currentTarget.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Crew member" hint="Kosongkan atau biarkan N/A kalau duty sendiri.">
              <input
                type="text"
                value={draft.crew}
                onInput={(e) => set('crew')(e.currentTarget.value)}
                placeholder="N/A"
                className={inputClass}
              />
            </Field>
          </div>

          {[
            ['start', 'startImage', 'Start Time'],
            ['end', 'endImage', 'End Time'],
          ].map(([time, image, label]) => (
            <div key={time} className="grid gap-3 sm:grid-cols-[9rem_1fr]">
              <Field label={label}>
                <input
                  type="time"
                  value={draft[time]}
                  onInput={(e) => set(time)(e.currentTarget.value)}
                  className={inputClass}
                />
              </Field>
              <ImageField label={label} value={draft[image]} onChange={set(image)} />
            </div>
          ))}

          {minutes !== null && (
            <p className={`text-xs ${minutes < MIN_DUTY_MINUTES ? 'text-alarm' : 'text-mech'}`}>
              Durasi duty: {formatDuration(minutes)}
              {minutes < MIN_DUTY_MINUTES && ` — minimal ${MIN_DUTY_MINUTES} menit`}
              {draft.end < draft.start && ' (melewati tengah malam)'}
            </p>
          )}

          <Field label="Activity" hint="Ceritakan patroli ke mana saja dan apa yang dikerjakan selama duty.">
            <textarea
              value={draft.activity}
              onInput={(e) => set('activity')(e.currentTarget.value)}
              rows={7}
              className={`${inputClass} resize-y leading-relaxed`}
            />
          </Field>
        </fieldset>

        <button
          type="button"
          onClick={() => {
            if (confirm('Kosongkan form untuk laporan baru? Nama anggota tetap dipilih.')) {
              setDraft(blank(draft.staffId))
            }
          }}
          className="self-start rounded-sm border border-line bg-panel px-3 py-2 text-[11px] text-dim hover:border-alarm hover:text-alarm"
        >
          Laporan baru
        </button>
      </form>

      <section aria-label="Hasil BBCode" className="flex flex-col gap-3 xl:sticky xl:top-6">
        <div className="flex items-center gap-3">
          <h3 className="slab flex-1 text-lg text-bone">BBCode</h3>
          <button
            type="button"
            onClick={copy}
            disabled={issues.length > 0}
            className="slab rounded-sm bg-alarm px-4 py-2 text-sm text-white disabled:bg-line disabled:text-muted"
          >
            {copied === null ? 'Salin BBCode' : copied ? 'Tersalin' : 'Gagal menyalin'}
          </button>
        </div>

        {issues.length > 0 && (
          <ul className="flex flex-col gap-1 rounded-sm border border-alarm/40 bg-panel px-3 py-2.5 text-[11.5px] leading-relaxed text-alarm">
            {issues.map((issue) => (
              <li key={issue}>· {issue}</li>
            ))}
          </ul>
        )}

        <textarea
          readOnly
          value={bbcode}
          aria-label="BBCode laporan"
          rows={18}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full resize-y rounded-sm border border-line bg-panel p-3 text-[11.5px] leading-relaxed text-dim"
        />
      </section>
    </div>
  )
}
