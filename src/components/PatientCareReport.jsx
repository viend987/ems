import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import BBCodePreview from './BBCodePreview.jsx'
import { writeClipboard } from '../lib/copy.js'
import { isImageUrl, normalizeImageUrl, todayIso } from '../lib/patrol.js'
import {
  blankPCR,
  buildPatientCareReport,
  CONDITION_OPTIONS,
  DISPATCH_OPTIONS,
  FORUM_PCR_URL,
  LOC_OPTIONS,
  TRIAGE_OPTIONS,
} from '../lib/pcr.js'
import { strings } from '../lib/strings.js'

const STORE_KEY = 'lsfd:pcr-draft'

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    if (saved && typeof saved === 'object') return { ...blankPCR(), ...saved }
  } catch {
    // fallback jika storage bermasalah
  }
  return { ...blankPCR(), date: todayIso() }
}

function writeDraft(draft) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(draft))
  } catch {
    // abaikan jika storage penuh
  }
}

const inputClass =
  'w-full rounded-sm border border-line bg-ink px-3 py-2 text-xs text-bone placeholder:text-muted transition-colors focus:border-alarm focus:outline-none'

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="slab text-[11px] tracking-[0.18em] text-muted">{label}</span>
      {children}
      {hint && <span className="text-[11px] leading-relaxed text-muted">{hint}</span>}
    </label>
  )
}

function ImageInput({ url, onUpdate, onRemove, label, s }) {
  const [loaded, setLoaded] = useState({ url: '', ok: false })
  const norm = normalizeImageUrl(url)
  const valid = norm && isImageUrl(norm)
  const state = !valid || loaded.url !== norm ? 'loading' : loaded.ok ? 'ok' : 'broken'

  return (
    <div className="flex flex-col gap-1.5 rounded-sm border border-line bg-ink/50 p-2.5">
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={url}
          onInput={(e) => onUpdate(e.currentTarget.value.trim())}
          placeholder="https://i.imgur.com/xxxx.png"
          aria-label={label}
          className={inputClass}
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-line bg-panel text-muted hover:border-alarm hover:text-alarm"
            title={s.reportRemove}
          >
            ×
          </button>
        )}
      </div>
      {valid && (
        <div className="mt-1">
          <img
            key={norm}
            src={norm}
            alt="Preview"
            referrerPolicy="no-referrer"
            decoding="async"
            onLoad={() => setLoaded({ url: norm, ok: true })}
            onError={() => setLoaded({ url: norm, ok: false })}
            className={`max-h-36 rounded-sm border border-line object-contain ${
              state === 'broken' ? 'hidden' : ''
            }`}
          />
        </div>
      )}
    </div>
  )
}

export default function PatientCareReport({ lang }) {
  const s = strings(lang)
  const [draft, setDraft] = useState(readDraft)
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(null)
  const timer = useRef(null)

  useEffect(() => writeDraft(draft), [draft])
  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }))

  const staff = STAFF.find((st) => st.id === draft.staffId) ?? STAFF[0]
  const form = { ...draft, staff }
  const bbcode = buildPatientCareReport(form)

  const copy = async () => {
    const ok = await writeClipboard(bbcode)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1600)
  }

  const resetForm = () => {
    if (confirm('Kosongkan formulir PCR?')) {
      setDraft(blankPCR(staff?.id))
    }
  }

  const updateScreenshot = (index, value) => {
    const list = [...(draft.screenshots ?? [])]
    list[index] = value
    set('screenshots')(list)
  }

  const addScreenshot = () => {
    set('screenshots')([...(draft.screenshots ?? []), ''])
  }

  const removeScreenshot = (index) => {
    const list = (draft.screenshots ?? []).filter((_, i) => i !== index)
    set('screenshots')(list.length > 0 ? list : [''])
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-muted hover:border-alarm hover:text-bone"
            >
              {s.reportNew}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={FORUM_PCR_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-dim hover:border-alarm hover:text-bone"
              title="Buka subforum Patient Care Report di tab baru"
            >
              <span>Forum Pengajuan</span>
              <span aria-hidden="true" className="text-muted">↗</span>
            </a>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Personal Details</legend>
          <Field label={s.plMember}>
            <select
              value={staff?.id}
              onChange={(e) => {
                const newId = e.currentTarget.value
                const found = STAFF.find((x) => x.id === newId)
                setDraft((d) => ({
                  ...d,
                  staffId: newId,
                  callsign: found?.callsign || d.callsign,
                }))
              }}
              className={inputClass}
            >
              {STAFF.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Callsign">
              <input
                type="text"
                value={draft.callsign}
                onInput={(e) => set('callsign')(e.currentTarget.value)}
                placeholder="RA-105"
                className={inputClass}
              />
            </Field>
            <Field label="Duty Partner (if any)" hint="Default N/A jika tugas mandiri">
              <input
                type="text"
                value={draft.dutyPartner}
                onInput={(e) => set('dutyPartner')(e.currentTarget.value)}
                placeholder="N/A"
                className={inputClass}
              />
            </Field>
          </div>

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

        {/* DUTY INFORMATION */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Duty Information</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Date">
              <input
                type="text"
                value={draft.date}
                onInput={(e) => set('date')(e.currentTarget.value)}
                placeholder="20/11/2025 atau YYYY-MM-DD"
                className={inputClass}
              />
            </Field>
            <Field label="Time">
              <input
                type="text"
                value={draft.time}
                onInput={(e) => set('time')(e.currentTarget.value)}
                placeholder="22:43 PM"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Location">
            <input
              type="text"
              value={draft.location}
              onInput={(e) => set('location')(e.currentTarget.value)}
              placeholder="Legion Square"
              className={inputClass}
            />
          </Field>

          <Field label="Dispatch">
            <div className="flex flex-col gap-2">
              <select
                value={draft.dispatch}
                onChange={(e) => set('dispatch')(e.currentTarget.value)}
                className={inputClass}
              >
                {DISPATCH_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {draft.dispatch === 'Other' && (
                <input
                  type="text"
                  value={draft.dispatchOther}
                  onInput={(e) => set('dispatchOther')(e.currentTarget.value)}
                  placeholder="Keterangan dispatch lain..."
                  className={inputClass}
                />
              )}
            </div>
          </Field>
        </fieldset>

        {/* PATIENT INFORMATION */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Patient Information</legend>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Triage (Opsional)" hint="Kosongkan / N/A jika tidak diperlukan">
              <select
                value={draft.triage}
                onChange={(e) => set('triage')(e.currentTarget.value)}
                className={inputClass}
              >
                {TRIAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Level of Consciousness (LoC)">
              <select
                value={draft.loc}
                onChange={(e) => set('loc')(e.currentTarget.value)}
                className={inputClass}
              >
                {LOC_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Breath per minute">
              <input
                type="text"
                value={draft.breath}
                onInput={(e) => set('breath')(e.currentTarget.value)}
                placeholder="20 LPM"
                className={inputClass}
              />
            </Field>
            <Field label="Pulse per minute">
              <input
                type="text"
                value={draft.pulse}
                onInput={(e) => set('pulse')(e.currentTarget.value)}
                placeholder="75 BPM"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Patient Condition">
            <div className="flex flex-col gap-2">
              <select
                value={draft.condition}
                onChange={(e) => set('condition')(e.currentTarget.value)}
                className={inputClass}
              >
                {CONDITION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {draft.condition === 'Other' && (
                <input
                  type="text"
                  value={draft.conditionOther}
                  onInput={(e) => set('conditionOther')(e.currentTarget.value)}
                  placeholder="Kondisi pasien lainnya..."
                  className={inputClass}
                />
              )}
            </div>
          </Field>

          <Field
            label="Summary of Action"
            hint="Dapat menggunakan tag warna [color=#...] untuk sorotan kata."
          >
            <textarea
              rows={8}
              value={draft.summary}
              onInput={(e) => set('summary')(e.currentTarget.value)}
              placeholder="Ceritakan kronologi dan penanganan pasien..."
              className={`${inputClass} font-mono leading-relaxed`}
            />
          </Field>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="slab text-[11px] tracking-[0.18em] text-muted">
                Screen Shot Evidence
              </span>
              <button
                type="button"
                onClick={addScreenshot}
                className="rounded-sm border border-line bg-ink px-2 py-0.5 text-[11px] text-muted hover:border-alarm hover:text-bone"
              >
                + {s.reportAddImage}
              </button>
            </div>
            {(draft.screenshots ?? []).map((url, idx) => (
              <ImageInput
                key={idx}
                url={url}
                onUpdate={(val) => updateScreenshot(idx, val)}
                onRemove={(draft.screenshots ?? []).length > 1 ? () => removeScreenshot(idx) : null}
                label={`Screenshot #${idx + 1}`}
                s={s}
              />
            ))}
          </div>
        </fieldset>
      </form>

      {/* HASIL & PREVIEW */}
      <div className="flex flex-col gap-3 xl:sticky xl:top-4">
        <div className="flex items-center justify-between gap-2 rounded-sm border border-line bg-panel p-1.5">
          <div role="tablist" aria-label={s.plTabs} className="flex gap-1">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'preview'}
              onClick={() => setTab('preview')}
              className={`rounded-sm px-2.5 py-1 text-xs transition-colors ${
                tab === 'preview' ? 'bg-ink font-semibold text-bone' : 'text-dim hover:text-bone'
              }`}
            >
              {s.reportPreviewTab}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'bbcode'}
              onClick={() => setTab('bbcode')}
              className={`rounded-sm px-2.5 py-1 text-xs transition-colors ${
                tab === 'bbcode' ? 'bg-ink font-semibold text-bone' : 'text-dim hover:text-bone'
              }`}
            >
              {s.reportBbcodeTab}
            </button>
          </div>

          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1.5 rounded-sm border border-line bg-ink px-3 py-1 text-xs font-semibold text-bone hover:border-alarm hover:bg-raise active:translate-y-px"
          >
            {copied === true && <span className="text-mech">✓ {s.reportCopied}</span>}
            {copied === false && <span className="text-alarm">× {s.reportCopyFailed}</span>}
            {copied === null && <span>⧉ {s.reportCopyBbcode}</span>}
          </button>
        </div>

        {tab === 'preview' ? (
          <BBCodePreview
            code={bbcode}
            className="max-h-[38rem] xl:max-h-[calc(100dvh-10rem)]"
          />
        ) : (
          <textarea
            readOnly
            value={bbcode}
            aria-label={s.plBbcodeLabel}
            spellcheck={false}
            className="scroll-thin h-[38rem] w-full rounded-sm border border-line bg-ink p-3 font-mono text-[11.5px] leading-relaxed text-bone select-all xl:h-[calc(100dvh-10rem)]"
          />
        )}
      </div>
    </div>
  )
}
