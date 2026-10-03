import { useEffect, useRef, useState } from 'preact/hooks'
import STAFF from '../data/staff.js'
import BBCodePreview from './BBCodePreview.jsx'
import { writeClipboard } from '../lib/copy.js'
import { isImageUrl, normalizeImageUrl } from '../lib/patrol.js'
import { DOB_FORMATS, formatDatePattern } from '../lib/dates.js'
import {
  blankSurgery,
  BLOOD_OPTIONS,
  buildPlasticSurgeryReport,
  FORUM_SURGERY_URL,
  GENDER_OPTIONS,
  PROCEDURE_OPTIONS,
} from '../lib/plastic-surgery.js'
import { strings } from '../lib/strings.js'

const STORE_KEY = 'lsfd:surgery-draft'

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    if (saved && typeof saved === 'object') return { ...blankSurgery(), ...saved }
  } catch {
    // fallback jika storage bermasalah
  }
  return blankSurgery()
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

export default function PlasticSurgeryReport({ lang }) {
  const s = strings(lang)
  const [draft, setDraft] = useState(readDraft)
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(null)
  const timer = useRef(null)

  useEffect(() => writeDraft(draft), [draft])
  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }))

  const bbcode = buildPlasticSurgeryReport(draft)

  const copy = async () => {
    const ok = await writeClipboard(bbcode)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1600)
  }

  const resetForm = () => {
    if (confirm('Kosongkan formulir Plastic Surgery?')) {
      setDraft(blankSurgery())
    }
  }

  const useTobrianAlrik = () => {
    const tobrian = STAFF.find((st) => st.id === 'tobrian-alrik') ?? STAFF[0]
    setDraft((d) => ({
      ...d,
      staffId: tobrian.id,
      fullName: tobrian.name,
      dob: formatDatePattern(tobrian.dob, 'DD/MM/YYYY') || d.dob,
      birthPlace: tobrian.birthPlace || d.birthPlace,
      gender: tobrian.gender || d.gender,
      address: tobrian.address || d.address,
      phone: tobrian.phone || d.phone,
      bloodType: d.bloodType || 'O+',
      signatureImage: tobrian.signature || '',
      signerName: tobrian.name,
    }))
  }

  const applyDobFormat = (formatId) => {
    if (!draft.dob) return
    const formatted = formatDatePattern(draft.dob, formatId, lang)
    if (formatted) setDraft((d) => ({ ...d, dob: formatted }))
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
              href={FORUM_SURGERY_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 rounded-sm border border-line bg-panel px-2.5 py-1 text-xs text-dim hover:border-alarm hover:text-bone"
              title="Buka subforum Plastic Surgery di tab baru"
            >
              <span>Forum Pengajuan</span>
              <span aria-hidden="true" className="text-muted">↗</span>
            </a>
          </div>
        </div>

        {/* SECTION A: PERSONAL DETAILS */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">A. Personal Details</legend>

          <Field label="A1. Full Name">
            <input
              type="text"
              value={draft.fullName}
              onInput={(e) => set('fullName')(e.currentTarget.value)}
              placeholder="Firstname Lastname"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Field label="A2. Date of Birth">
                <input
                  type="text"
                  value={draft.dob}
                  onInput={(e) => set('dob')(e.currentTarget.value)}
                  placeholder="DD/MM/YYYY"
                  className={inputClass}
                />
              </Field>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="text-[10px] text-muted">Format:</span>
                {DOB_FORMATS.slice(0, 4).map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => applyDobFormat(fmt.id)}
                    className="rounded-sm bg-ink px-1.5 py-0.5 text-[10px] text-muted hover:bg-raise hover:text-bone"
                    title={`Ubah ke ${fmt.label}`}
                  >
                    {fmt.id}
                  </button>
                ))}
              </div>
            </div>

            <Field label="A3. Place of Birth">
              <input
                type="text"
                value={draft.birthPlace}
                onInput={(e) => set('birthPlace')(e.currentTarget.value)}
                placeholder="Stockholm, Sweden"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="A4. Gender">
              <select
                value={draft.gender}
                onChange={(e) => set('gender')(e.currentTarget.value)}
                className={inputClass}
              >
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="A7. Blood Type">
              <select
                value={draft.bloodType}
                onChange={(e) => set('bloodType')(e.currentTarget.value)}
                className={inputClass}
              >
                <option value="">Pilih Golongan Darah</option>
                {BLOOD_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="A6. Phone Number">
              <input
                type="tel"
                value={draft.phone}
                onInput={(e) => set('phone')(e.currentTarget.value)}
                placeholder="356-6302"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="A5. Address">
            <input
              type="text"
              value={draft.address}
              onInput={(e) => set('address')(e.currentTarget.value)}
              placeholder="West Mirror Drive"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="A8. Weight (kg)">
              <input
                type="number"
                value={draft.weight}
                onInput={(e) => set('weight')(e.currentTarget.value)}
                placeholder="75"
                className={inputClass}
              />
            </Field>

            <Field label="A9. Height (cm)">
              <input
                type="number"
                value={draft.height}
                onInput={(e) => set('height')(e.currentTarget.value)}
                placeholder="178"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="A10. Disease History" hint="Tulis 'None' jika tidak memiliki riwayat penyakit.">
            <input
              type="text"
              value={draft.diseaseHistory}
              onInput={(e) => set('diseaseHistory')(e.currentTarget.value)}
              placeholder="None"
              className={inputClass}
            />
          </Field>

          <ImageField
            label="A11. Valid ID Card (State of Los Santos)"
            value={draft.idCardImage}
            onChange={set('idCardImage')}
            placeholder="https://i.imgur.com/example-ktp.png"
          />

          <ImageField
            label="A12. Criminal Background Check (LSPD PM screenshot)"
            value={draft.backgroundCheckImage}
            onChange={set('backgroundCheckImage')}
            placeholder="https://i.imgur.com/example-pm.png"
          />
        </fieldset>

        {/* SECTION B: PLASTIC SURGERY INFORMATION */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">B. Plastic Surgery Information</legend>

          <Field label="B1. Reason for doing Plastic Surgery">
            <textarea
              value={draft.reason}
              onInput={(e) => set('reason')(e.currentTarget.value)}
              rows={4}
              placeholder="Alasan mengajukan operasi plastik..."
              className={`${inputClass} resize-y`}
            />
          </Field>

          <Field label="B2. Desired Plastic Surgery Procedure">
            <select
              value={draft.procedure}
              onChange={(e) => set('procedure')(e.currentTarget.value)}
              className={inputClass}
            >
              {PROCEDURE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>

          {draft.procedure === 'Other' && (
            <Field label="Nama Prosedur Lainnya">
              <input
                type="text"
                value={draft.procedureOther}
                onInput={(e) => set('procedureOther')(e.currentTarget.value)}
                placeholder="Nama prosedur operasi..."
                className={inputClass}
              />
            </Field>
          )}

          <Field
            label="B3. Specific Expectations Regarding Surgery Outcome (Optional)"
            hint="Ekspektasi hasil operasi yang diharapkan."
          >
            <textarea
              value={draft.expectations}
              onInput={(e) => set('expectations')(e.currentTarget.value)}
              rows={3}
              placeholder="Ekspektasi hasil operasi (opsional)..."
              className={`${inputClass} resize-y`}
            />
          </Field>

          <ImageField
            label="B4. Photo (Full face for rhinoplasty / full body for liposuction)"
            value={draft.photoImage}
            onChange={set('photoImage')}
            placeholder="https://i.imgur.com/example-photo.png"
          />
        </fieldset>

        {/* TERMS OF AGREEMENT */}
        <fieldset className="flex flex-col gap-3 rounded-sm border border-line bg-panel p-3 sm:p-4">
          <legend className="slab px-1 text-sm text-bone">Terms of Agreement & Signature</legend>

          <p className="text-[11px] leading-relaxed text-muted">
            Dengan menandatangani formulir ini, pemohon menyetujui seluruh ketentuan pemeriksaan, kerahasiaan data medis, dan kebenaran informasi yang diberikan.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nama Penandatangan">
              <input
                type="text"
                value={draft.signerName || draft.fullName}
                onInput={(e) => set('signerName')(e.currentTarget.value)}
                placeholder="Firstname Lastname"
                className={inputClass}
              />
            </Field>

            <Field label="Tanggal Tanda Tangan">
              <input
                type="text"
                value={draft.signDate}
                onInput={(e) => set('signDate')(e.currentTarget.value)}
                placeholder="DD/MM/YYYY"
                className={inputClass}
              />
            </Field>
          </div>

          <ImageField
            label="Gambar Tanda Tangan"
            value={draft.signatureImage}
            onChange={set('signatureImage')}
            placeholder="https://i.imgur.com/signature.png"
          />
        </fieldset>
      </form>

      {/* RESULT & PREVIEW */}
      <section aria-label="Hasil BBCode" className="flex flex-col gap-3 xl:sticky xl:top-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div role="tablist" aria-label="Tab tampilan" className="flex rounded-sm border border-line bg-panel p-0.5">
            {[
              ['preview', s.reportPreviewTab],
              ['bbcode', s.reportBbcodeTab],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`slab rounded-sm px-3 py-1.5 text-xs transition-colors ${
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
            className="slab rounded-sm bg-alarm px-4 py-2 text-sm text-white transition-opacity hover:opacity-95"
          >
            {copied === null ? s.reportCopyBbcode : copied ? s.reportCopied : s.reportCopyFailed}
          </button>
        </div>

        {tab === 'preview' ? (
          <BBCodePreview code={bbcode} className="max-h-[32rem] xl:max-h-[calc(100dvh-10rem)]" />
        ) : (
          <textarea
            readOnly
            value={bbcode}
            aria-label="BBCode output"
            rows={22}
            onFocus={(e) => e.currentTarget.select()}
            className="scroll-thin w-full resize-y rounded-sm border border-line bg-panel p-3 text-[11.5px] leading-relaxed text-dim"
          />
        )}
      </section>
    </div>
  )
}
