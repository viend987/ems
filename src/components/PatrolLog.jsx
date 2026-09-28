import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import { writeClipboard } from '../lib/copy.js'
import {
  buildPatrolLog,
  durationMinutes,
  formatDuration,
  isImageUrl,
  isLink,
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

/**
 * Link gambar bukti. Kolomnya hanya menerima link http(s) — dari host mana pun,
 * tidak dikunci ke imgur — dan gambarnya langsung dipratinjau, supaya link
 * yang salah ketahuan sebelum laporan dikirim ke forum.
 */
function ImageField({ label, value, onChange }) {
  // Status muat per link: gambar lama yang gagal tidak menandai link baru.
  const [loaded, setLoaded] = useState({ url: '', ok: false })

  const url = normalizeImageUrl(value)
  const valid = url && isImageUrl(url)
  const state = !valid || loaded.url !== url ? 'loading' : loaded.ok ? 'ok' : 'broken'
  const bad = url && (!valid || state === 'broken')

  let message = 'Tempel link gambar langsung, mis. https://i.imgur.com/xxxx.jpeg.'
  let tone = 'text-muted'
  if (url && !valid) {
    message = isLink(url)
      ? 'Ini link halaman, bukan gambar. Buka gambarnya, klik kanan, lalu "Copy image address".'
      : 'Kolom ini hanya menerima link (diawali https://), bukan teks biasa.'
    tone = 'text-alarm'
  } else if (valid && state === 'broken') {
    message = 'Gambar dari link ini tidak bisa dimuat. Pastikan link-nya mengarah langsung ke gambar.'
    tone = 'text-alarm'
  } else if (valid && state === 'loading') {
    message = 'Memuat pratinjau…'
  } else if (valid && state === 'ok') {
    message = 'Gambar termuat.'
    tone = 'text-mech'
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="slab text-[11px] tracking-[0.18em] text-muted">Gambar {label}</span>
      <input
        type="url"
        inputMode="url"
        value={value}
        onInput={(e) => onChange(e.currentTarget.value.trim())}
        placeholder="https://i.imgur.com/xxxx.jpeg"
        aria-label={`Link gambar ${label}`}
        aria-invalid={bad ? 'true' : undefined}
        spellcheck={false}
        autoComplete="off"
        className={bad ? inputClass.replace('border-line', 'border-alarm') : inputClass}
      />
      <span className={`text-[11px] leading-relaxed ${tone}`}>{message}</span>
      {valid && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          title="Buka gambar di tab baru"
          className={`block w-full overflow-hidden rounded-sm border border-line bg-raise ${
            state === 'broken' ? 'hidden' : ''
          }`}
        >
          <img
            key={url}
            src={url}
            alt={`Bukti ${label}`}
            referrerPolicy="no-referrer"
            decoding="async"
            onLoad={() => setLoaded({ url, ok: true })}
            onError={() => setLoaded({ url, ok: false })}
            className="aspect-video w-full object-contain"
          />
        </a>
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
