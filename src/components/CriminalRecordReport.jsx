import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import BBCodePreview from './BBCodePreview.jsx'
import { writeClipboard } from '../lib/copy.js'
import { isImageUrl, normalizeImageUrl } from '../lib/patrol.js'
import { formatDatePattern } from '../lib/dates.js'
import {
  blankRecord,
  buildCriminalRecord,
  FORUM_RECORDS_URL,
  RACE_OPTIONS,
  SEX_OPTIONS,
} from '../lib/records.js'
import { strings } from '../lib/strings.js'

const STORE_KEY = 'lsfd:records-draft'

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    if (saved && typeof saved === 'object') return { ...blankRecord(), ...saved }
  } catch {
    // fallback jika storage bermasalah
  }
  return blankRecord()
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

function ImageField({ label, value, onChange, placeholder = 'https://i.imgur.com/xxxx.png' }) {
  const norm = normalizeImageUrl(value)
  const valid = norm && isImageUrl(norm)

  return (
    <div className="flex flex-col gap-1.5">
      <span className="slab text-[11px] tracking-[0.18em] text-muted">{label}</span>
      <input
        type="url"
        value={value}
        onInput={(e) => onChange(e.currentTarget.value.trim())}
        placeholder={placeholder}
        className={inputClass}
      />
      {valid && (
        <div className="mt-1">
          <img
            src={norm}
            alt="Preview"
            referrerPolicy="no-referrer"
            decoding="async"
            className="max-h-36 rounded-sm border border-line object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default function CriminalRecordReport({ lang }) {
  const s = strings(lang)
  const [draft, setDraft] = useState(readDraft)
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(null)
  const timer = useRef(null)

  useEffect(() => writeDraft(draft), [draft])
  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }))
  const bbcode = buildCriminalRecord(draft)

  const copy = async () => {
    const ok = await writeClipboard(bbcode)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1600)
  }

  const resetForm = () => {
    if (confirm('Kosongkan formulir Request Criminal Record?')) {
      setDraft(blankRecord())
    }
  }

  const useTobrianAlrik = () => {
    const tobrian = STAFF.find((st) => st.id === 'tobrian-alrik') ?? STAFF[0]
    setDraft((d) => ({
      ...d,
      fullName: tobrian.name,
      sex: tobrian.gender || d.sex,
      race: tobrian.race || d.race,
      dob: formatDatePattern(tobrian.dob, 'DD/MM/YYYY') || d.dob,
      address: tobrian.address || d.address,
      phone: tobrian.phone || d.phone,
      signatureImage: tobrian.signature || '',
    }))
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
            <button
              type="button"
              onClick={useTobrianAlrik}
              className="rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-muted hover:border-alarm hover:text-bone"
            >
              Gunakan Data Tobrian Alrik
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={FORUM_RECORDS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-dim hover:border-alarm hover:text-bone"
              title="Buka subforum Request Criminal Record LSPD di tab baru"
            >
              <span>Forum Pengajuan</span>
              <span aria-hidden="true" className="text-muted">↗</span>
            </a>
          </div>
        </div>

        {/* APPLICANT DETAILS */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Applicant Details</legend>

          <Field label="Full Name">
            <input
              type="text"
              value={draft.fullName}
              onInput={(e) => set('fullName')(e.currentTarget.value)}
              placeholder="Firstname Lastname"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Sex">
              <select
                value={draft.sex}
                onChange={(e) => set('sex')(e.currentTarget.value)}
                className={inputClass}
              >
                {SEX_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Race">
              <select
                value={draft.race}
                onChange={(e) => set('race')(e.currentTarget.value)}
                className={inputClass}
              >
                {RACE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Date of Birth">
              <input
                type="text"
                value={draft.dob}
                onInput={(e) => set('dob')(e.currentTarget.value)}
                placeholder="25/06/2003"
                className={inputClass}
              />
            </Field>

            <Field label="Phone Number">
              <input
                type="text"
                value={draft.phone}
                onInput={(e) => set('phone')(e.currentTarget.value)}
                placeholder="685-8993"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Address">
            <input
              type="text"
              value={draft.address}
              onInput={(e) => set('address')(e.currentTarget.value)}
              placeholder="Los Santos"
              className={inputClass}
            />
          </Field>
        </fieldset>

        {/* IDENTIFICATION ATTACHMENTS */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Identification & Licenses</legend>

          <ImageField
            label="Identification Card (KTP)"
            value={draft.idCard}
            onChange={set('idCard')}
            placeholder="https://i.imgur.com/id-card.png"
          />

          <ImageField
            label="Driver's License (SIM)"
            value={draft.driverLicense}
            onChange={set('driverLicense')}
            placeholder="https://i.imgur.com/driver-license.png"
          />
        </fieldset>

        {/* SIGNATURE */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Signature</legend>
          <ImageField
            label="Signature Image (Opsional)"
            value={draft.signatureImage}
            onChange={set('signatureImage')}
            placeholder="https://i.imgur.com/signature.png"
          />
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
