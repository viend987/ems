import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import BBCodePreview from './BBCodePreview.jsx'
import { writeClipboard } from '../lib/copy.js'
import { strings } from '../lib/strings.js'
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
function ImageField({ label, value, onChange, s }) {
  // Status muat per link: gambar lama yang gagal tidak menandai link baru.
  const [loaded, setLoaded] = useState({ url: '', ok: false })

  const url = normalizeImageUrl(value)
  const valid = url && isImageUrl(url)
  const state = !valid || loaded.url !== url ? 'loading' : loaded.ok ? 'ok' : 'broken'
  const bad = url && (!valid || state === 'broken')

  let message = s.plImageHint
  let tone = 'text-muted'
  if (url && !valid) {
    message = isLink(url) ? s.plImageIsPage : s.plImageNotLink
    tone = 'text-alarm'
  } else if (valid && state === 'broken') {
    message = s.plImageBroken
    tone = 'text-alarm'
  } else if (valid && state === 'loading') {
    message = s.plImageLoading
  } else if (valid && state === 'ok') {
    message = s.plImageOk
    tone = 'text-mech'
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="slab text-[11px] tracking-[0.18em] text-muted">{s.plImageOf(label)}</span>
      <input
        type="url"
        inputMode="url"
        value={value}
        onInput={(e) => onChange(e.currentTarget.value.trim())}
        placeholder="https://i.imgur.com/xxxx.jpeg"
        aria-label={s.plImageLinkOf(label)}
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
          title={s.plOpenImage}
          className={`block w-full overflow-hidden rounded-sm border border-line bg-raise ${
            state === 'broken' ? 'hidden' : ''
          }`}
        >
          <img
            key={url}
            src={url}
            alt={s.plProofOf(label)}
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

export default function PatrolLog({ lang }) {
  const s = strings(lang)
  const [draft, setDraft] = useState(readDraft)
  const [copied, setCopied] = useState(null)
  // Pratinjau lebih dulu: yang dicari pemain biasanya "sudah benar belum
  // tampilannya", bukan kode mentahnya.
  const [tab, setTab] = useState('preview')
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
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirm(s.plNewConfirm)) {
                  setDraft(blank(draft.staffId))
                }
              }}
              className="rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-muted hover:border-alarm hover:text-bone"
            >
              {s.plNewReport}
            </button>
          </div>
          {staff?.patrolTopic && (
            <div className="flex items-center gap-2">
              <a
                href={staff.patrolTopic}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-dim hover:border-alarm hover:text-bone"
                title="Buka topik patroli di forum LSFD di tab baru"
              >
                <span>Forum Pengajuan</span>
                <span aria-hidden="true" className="text-muted">↗</span>
              </a>
            </div>
          )}
        </div>

        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Personal Details</legend>
          <Field label={s.plMember}>
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
          {staff?.patrolTopic && (
            <div className="pt-1">
              <a
                href={staff.patrolTopic}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-alarm hover:underline"
              >
                <span>Buka Topik Patroli ({staff.name})</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
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
            <Field label="Crew member" hint={s.plCrewHint}>
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
              <ImageField label={label} value={draft[image]} onChange={set(image)} s={s} />
            </div>
          ))}

          {minutes !== null && (
            <p className={`text-xs ${minutes < MIN_DUTY_MINUTES ? 'text-alarm' : 'text-mech'}`}>
              {s.plDuration(formatDuration(minutes))}
              {minutes < MIN_DUTY_MINUTES && s.plMinimum(MIN_DUTY_MINUTES)}
              {draft.end < draft.start && s.plMidnight}
            </p>
          )}

          <Field label="Activity" hint={s.plActivityHint}>
            <textarea
              value={draft.activity}
              onInput={(e) => set('activity')(e.currentTarget.value)}
              rows={7}
              className={`${inputClass} resize-y leading-relaxed`}
            />
          </Field>
        </fieldset>

      </form>

      <section aria-label={s.plResult} className="flex flex-col gap-3 xl:sticky xl:top-6">
        <div className="flex flex-wrap items-center gap-2">
          <div role="tablist" aria-label={s.plTabs} className="flex rounded-sm border border-line bg-panel p-0.5">
            {[
              ['preview', s.bbPreview],
              ['bbcode', 'BBCode'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`slab rounded-sm px-3 py-1.5 text-xs ${
                  tab === id ? 'bg-alarm text-white' : 'text-dim hover:text-bone'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copy}
            disabled={issues.length > 0}
            className="slab ml-auto rounded-sm bg-alarm px-4 py-2 text-sm text-white disabled:bg-line disabled:text-muted"
          >
            {copied === null ? s.bbCopy : copied ? s.bbCopied : s.bbCopyFailed}
          </button>
        </div>

        {issues.length > 0 && (
          <ul className="flex flex-col gap-1 rounded-sm border border-alarm/40 bg-panel px-3 py-2.5 text-[11.5px] leading-relaxed text-alarm">
            {issues.map((issue) => (
              <li key={issue}>· {issue}</li>
            ))}
          </ul>
        )}

        {tab === 'preview' ? (
          <BBCodePreview code={bbcode} className="max-h-[32rem] xl:max-h-[calc(100dvh-10rem)]" />
        ) : (
          <textarea
            readOnly
            value={bbcode}
            aria-label={s.plBbcodeLabel}
            rows={18}
            onFocus={(e) => e.currentTarget.select()}
            className="scroll-thin w-full resize-y rounded-sm border border-line bg-panel p-3 text-[11.5px] leading-relaxed text-dim"
          />
        )}
      </section>
    </div>
  )
}
