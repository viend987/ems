import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import BBCodePreview from './BBCodePreview.jsx'
import Icon from './Icon.jsx'
import { writeClipboard } from '../lib/copy.js'
import { isImageUrl, normalizeImageUrl } from '../lib/patrol.js'
import {
  blankMaintenance,
  buildMaintenanceReport,
  calculateTotals,
  DEFAULT_MAINTENANCE_UNITS,
  FORUM_MAINTENANCE_URL,
} from '../lib/maintenance.js'
import { strings } from '../lib/strings.js'

const STORE_KEY = 'lsfd:maintenance-draft'

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    if (saved && typeof saved === 'object') return { ...blankMaintenance(), ...saved }
  } catch {
    // fallback jika storage bermasalah
  }
  return blankMaintenance()
}

function writeDraft(draft) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(draft))
  } catch {
    // abaikan jika storage penuh
  }
}

const inputClass =
  'w-full rounded-sm border border-line bg-ink px-2.5 py-1.5 text-xs text-bone placeholder:text-muted transition-colors focus:border-alarm focus:outline-none'

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="slab text-[11px] tracking-[0.18em] text-muted">{label}</span>
      {children}
      {hint && <span className="text-[11px] leading-relaxed text-muted">{hint}</span>}
    </label>
  )
}

export default function VehicleMaintenanceReport({ lang }) {
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
  const bbcode = buildMaintenanceReport(form)
  const { totalFormatted } = calculateTotals(draft.units ?? [])

  const copy = async () => {
    const ok = await writeClipboard(bbcode)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1600)
  }

  const resetForm = () => {
    if (confirm('Kosongkan formulir Vehicle Maintenance?')) {
      setDraft(blankMaintenance(staff?.id))
    }
  }

  const resetDefaultUnits = () => {
    set('units')(DEFAULT_MAINTENANCE_UNITS.map((u) => ({ ...u, repair: '', refuel: '', additional: '' })))
  }

  const updateUnit = (index, field, value) => {
    const units = [...(draft.units ?? [])]
    units[index] = { ...units[index], [field]: value }
    set('units')(units)
  }

  const addUnit = () => {
    const units = [...(draft.units ?? [])]
    units.push({ name: `Unit-${units.length + 1}`, repair: '', refuel: '', additional: '' })
    set('units')(units)
  }

  const removeUnit = (index) => {
    const units = (draft.units ?? []).filter((_, i) => i !== index)
    set('units')(units)
  }

  const updateEvidence = (index, value) => {
    const list = [...(draft.evidenceImages ?? [])]
    list[index] = value
    set('evidenceImages')(list)
  }

  const addEvidence = () => {
    set('evidenceImages')([...(draft.evidenceImages ?? []), ''])
  }

  const removeEvidence = (index) => {
    const list = (draft.evidenceImages ?? []).filter((_, i) => i !== index)
    set('evidenceImages')(list.length > 0 ? list : [''])
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
            <button
              type="button"
              onClick={resetDefaultUnits}
              className="rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-muted hover:border-alarm hover:text-bone"
            >
              Reset 22 Unit Bawaan
            </button>
            <a
              href={FORUM_MAINTENANCE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-dim hover:border-alarm hover:text-bone"
              title="Buka subforum Vehicle & Equipment Maintenance di tab baru"
            >
              <span>Forum Pengajuan</span>
              <span aria-hidden="true" className="text-muted">↗</span>
            </a>
          </div>
        </div>

        {/* HEADER INFORMATION */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Statement Details</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Week #">
              <input
                type="text"
                value={draft.week}
                onInput={(e) => set('week')(e.currentTarget.value)}
                placeholder="3"
                className={inputClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Date">
                <input
                  type="text"
                  value={draft.date}
                  onInput={(e) => set('date')(e.currentTarget.value)}
                  placeholder="Saturday, 21 February 2026"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          <Field label="Person in Charge">
            <select
              value={staff?.id}
              onChange={(e) => set('staffId')(e.currentTarget.value)}
              className={inputClass}
            >
              {STAFF.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.rank})
                </option>
              ))}
            </select>
          </Field>
        </fieldset>

        {/* SALARY BREAKDOWN TABLE */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <legend className="slab px-1 text-sm text-bone">Salary Breakdown Units</legend>
              <p className="px-1 text-[11px] text-muted">
                Total otomatis terhitung: <strong className="text-signal">{totalFormatted}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={addUnit}
              className="rounded-sm border border-line bg-ink px-2.5 py-1 text-xs text-muted hover:border-alarm hover:text-bone"
            >
              + Tambah Unit
            </button>
          </div>

          {/* Unit List Container */}
          <div className="flex max-h-[32rem] flex-col gap-2 overflow-y-auto pr-1">
            {(draft.units ?? []).map((u, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-sm border border-line bg-ink p-2 sm:flex-row sm:items-center sm:gap-2"
              >
                <span className="w-6 text-center text-xs font-semibold text-muted">{idx + 1}</span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={u.name}
                    onInput={(e) => updateUnit(idx, 'name', e.currentTarget.value)}
                    placeholder="Nama Unit"
                    className={`${inputClass} font-semibold`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:w-64">
                  <div>
                    <label className="text-[10px] text-muted">Repair</label>
                    <div className="relative flex items-center">
                      <span className="pointer-events-none absolute left-2 text-xs text-muted">$</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={u.repair === 0 ? '' : (u.repair ?? '')}
                        onInput={(e) => {
                          const val = e.currentTarget.value.replace(/[^0-9.]/g, '')
                          updateUnit(idx, 'repair', val)
                        }}
                        placeholder="0"
                        className={`${inputClass} pl-5`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted">Refuel</label>
                    <div className="relative flex items-center">
                      <span className="pointer-events-none absolute left-2 text-xs text-muted">$</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={u.refuel === 0 ? '' : (u.refuel ?? '')}
                        onInput={(e) => {
                          const val = e.currentTarget.value.replace(/[^0-9.]/g, '')
                          updateUnit(idx, 'refuel', val)
                        }}
                        placeholder="0"
                        className={`${inputClass} pl-5`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted">Add.</label>
                    <div className="relative flex items-center">
                      <span className="pointer-events-none absolute left-2 text-xs text-muted">$</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={u.additional === 0 ? '' : (u.additional ?? '')}
                        onInput={(e) => {
                          const val = e.currentTarget.value.replace(/[^0-9.]/g, '')
                          updateUnit(idx, 'additional', val)
                        }}
                        placeholder="0"
                        className={`${inputClass} pl-5`}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeUnit(idx)}
                  className="flex size-7 shrink-0 items-center justify-center rounded-sm text-muted hover:bg-raise hover:text-alarm"
                  title="Hapus baris unit ini"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-line pt-2 text-xs">
            <span className="font-semibold text-dim">Total Salary Proposed:</span>
            <span className="font-mono text-sm font-bold text-alarm">{totalFormatted}</span>
          </div>
        </fieldset>

        {/* EVIDENCE PHOTOS */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <legend className="slab px-1 text-sm text-bone">
              Photo Evidence of Activities
            </legend>
            <button
              type="button"
              onClick={addEvidence}
              className="rounded-sm border border-line bg-ink px-2.5 py-1 text-xs text-muted hover:border-alarm hover:text-bone"
            >
              + {s.reportAddImage}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {(draft.evidenceImages ?? []).map((url, idx) => {
              const norm = normalizeImageUrl(url)
              const valid = norm && isImageUrl(norm)
              return (
                <div key={idx} className="flex flex-col gap-1.5 rounded-sm border border-line bg-ink p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={url}
                      onInput={(e) => updateEvidence(idx, e.currentTarget.value.trim())}
                      placeholder="https://i.imgur.com/xxxx.png"
                      className={inputClass}
                    />
                    {(draft.evidenceImages ?? []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEvidence(idx)}
                        className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-line bg-panel text-muted hover:border-alarm hover:text-alarm"
                        title={s.reportRemove}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  {valid && (
                    <img
                      src={norm}
                      alt="Bukti foto"
                      referrerPolicy="no-referrer"
                      decoding="async"
                      className="max-h-32 object-contain"
                    />
                  )}
                </div>
              )
            })}
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
            {copied === true && (
              <span className="flex items-center gap-1 text-mech">
                <Icon name="check" className="size-3" />
                {s.reportCopied}
              </span>
            )}
            {copied === false && (
              <span className="flex items-center gap-1 text-alarm">
                <Icon name="cross" className="size-3" />
                {s.reportCopyFailed}
              </span>
            )}
            {copied === null && (
              <span className="flex items-center gap-1">
                <Icon name="clipboard" className="size-3" />
                {s.reportCopyBbcode}
              </span>
            )}
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
