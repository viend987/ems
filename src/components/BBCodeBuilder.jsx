import { useEffect, useRef, useState } from 'preact/hooks'
import BBCodePreview from './BBCodePreview.jsx'
import Icon from './Icon.jsx'
import { writeClipboard } from '../lib/copy.js'
import { applyTag } from '../lib/bbcode-insert.js'
import { SHORTCUTS, SIZES, sizeSpec, TAG_GROUPS } from '../lib/bbcode-tags.js'
import { PATIENT_CARE_REPORT } from '../lib/bbcode-example.js'

/**
 * Meracik BBCode bebas untuk forum. Tombol toolbar menyisipkan tag ke posisi
 * kursor — atau membungkus teks yang terpilih — dan pratinjaunya memakai
 * komponen yang sama dengan Patrol Log, jadi apa yang terlihat di sini sama
 * dengan yang nanti muncul di forum.
 *
 * Tombolnya bericon, dan namanya Inggris mengikuti tag yang disisipkannya:
 * "Align centre", bukan "Tengah". Nama Indonesia justru menyulitkan, karena
 * yang masuk ke teks tetap `[center]`.
 *
 * Tidak ada dialog `prompt()` untuk tag yang butuh alamat atau angka: yang
 * disisipkan kerangka dengan bagian nilainya sudah tersorot, tinggal ditimpa
 * ketikan. Dialog memblokir halaman dan memutus alur mengetik.
 *
 * Racikannya disimpan di localStorage supaya refresh tidak menghapus tulisan
 * panjang.
 */

const STORE_KEY = 'lsfd:bbcode-draft'

function readDraft() {
  try {
    const saved = localStorage.getItem(STORE_KEY)
    if (typeof saved === 'string') return saved
  } catch {
    // penyimpanan tidak tersedia
  }
  return ''
}

const buttonClass =
  'flex min-h-8 min-w-8 items-center justify-center gap-0.5 rounded-sm border border-line bg-ink px-1.5 py-1 text-dim hover:border-alarm hover:text-bone'

export default function BBCodeBuilder() {
  const [code, setCode] = useState(readDraft)
  const [copied, setCopied] = useState(null)
  const area = useRef(null)
  const pending = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, code)
    } catch {
      // halaman tetap jalan tanpa mengingat racikan
    }
  }, [code])

  useEffect(() => () => clearTimeout(timer.current), [])

  // Menyorot ulang sesudah tag disisipkan. Harus sesudah render, karena isi
  // textarea baru berubah pada render itu.
  useEffect(() => {
    if (!pending.current) return
    const { start, end } = pending.current
    pending.current = null
    const el = area.current
    if (!el) return
    el.focus()
    el.setSelectionRange(start, end)
  })

  const insert = (spec) => {
    const el = area.current
    // Isi diambil dari textarea, bukan dari `code` hasil render: kalau ada
    // perubahan yang belum sempat ter-render, nilai lama akan menimpanya.
    const text = el ? el.value : code
    const from = el ? el.selectionStart : text.length
    const to = el ? el.selectionEnd : text.length
    const out = applyTag(text, from, to, spec)
    pending.current = { start: out.start, end: out.end }
    setCode(out.text)
  }

  const onKeyDown = (e) => {
    if (!e.ctrlKey && !e.metaKey) return
    const spec = SHORTCUTS.get(e.key.toLowerCase())
    if (!spec) return
    e.preventDefault()
    insert(spec)
  }

  const copy = async () => {
    const ok = await writeClipboard(code)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1600)
  }

  const kosong = !code.trim()

  return (
    <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
      <section aria-label="Editor BBCode" className="flex min-w-0 flex-col gap-3">
        {/* flex-wrap di dua tingkat: kelompoknya turun baris, dan tombol di dalam
            kelompok juga, jadi di layar sempit tidak ada yang keluar layar. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-sm border border-line bg-panel p-1.5">
          {TAG_GROUPS.map((group) => (
            <div
              key={group.id}
              role="group"
              aria-label={group.name}
              title={group.name}
              className="flex flex-wrap items-center gap-1"
            >
              {group.tags.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => insert(spec)}
                  title={spec.name}
                  aria-label={spec.name}
                  className={buttonClass}
                >
                  {spec.icon && <Icon name={spec.icon} />}
                  {spec.label && (
                    <span
                      className={`text-[11px] leading-none ${
                        spec.icon ? 'text-[9px] text-muted' : ''
                      } ${spec.id === 'b' ? 'font-bold' : ''} ${spec.id === 'i' ? 'italic' : ''} ${
                        spec.id === 'u' ? 'underline' : ''
                      }`}
                    >
                      {spec.label}
                    </span>
                  )}
                </button>
              ))}

              {/* Lima ukuran huruf jadi satu dropdown; berderet cuma makan tempat. */}
              {group.id === 'text' && (
                <select
                  aria-label="Font size"
                  title="Font size"
                  value=""
                  onChange={(e) => {
                    const value = Number(e.currentTarget.value)
                    e.currentTarget.value = ''
                    if (value) insert(sizeSpec(value))
                  }}
                  className="min-h-8 rounded-sm border border-line bg-ink px-1.5 text-[11px] text-dim hover:border-alarm"
                >
                  <option value="">Size</option>
                  {SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label} ({s.value})
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <textarea
          ref={area}
          value={code}
          onInput={(e) => setCode(e.currentTarget.value)}
          onKeyDown={onKeyDown}
          rows={20}
          spellcheck={false}
          aria-label="BBCode"
          placeholder="Racik BBCode di sini, atau mulai dari tombol di atas."
          className="scroll-thin w-full resize-y rounded-sm border border-line bg-ink p-3 text-[11.5px] leading-relaxed text-bone placeholder:text-muted"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copy}
            disabled={kosong}
            className="slab rounded-sm bg-alarm px-4 py-2 text-sm text-white disabled:bg-line disabled:text-muted"
          >
            {copied === null ? 'Salin BBCode' : copied ? 'Tersalin' : 'Gagal menyalin'}
          </button>

          {kosong ? (
            <button
              type="button"
              onClick={() => setCode(PATIENT_CARE_REPORT)}
              className="rounded-sm border border-line bg-panel px-3 py-2 text-[11px] text-dim hover:border-alarm hover:text-alarm"
            >
              Muat contoh
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (confirm('Kosongkan editor? Racikan sekarang akan hilang.')) setCode('')
              }}
              className="rounded-sm border border-line bg-panel px-3 py-2 text-[11px] text-dim hover:border-alarm hover:text-alarm"
            >
              Kosongkan
            </button>
          )}

          <span className="ml-auto text-[11px] text-muted">{code.length} karakter</span>
        </div>
      </section>

      <section aria-label="Pratinjau" className="flex min-w-0 flex-col gap-2 xl:sticky xl:top-6">
        <span className="slab text-[11px] tracking-[0.18em] text-muted">Pratinjau</span>
        <BBCodePreview code={code} className="max-h-[32rem] xl:max-h-[calc(100dvh-8rem)]" />
      </section>
    </div>
  )
}
