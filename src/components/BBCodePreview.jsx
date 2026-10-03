import { Fragment } from 'preact'
import { parseBBCode, textOf } from '../lib/bbcode.js'

/**
 * Menggambar BBCode jadi tampilan yang mendekati hasilnya di forum, supaya
 * laporan bisa diperiksa sebelum ditempel.
 *
 * Sumbernya BBCode itu sendiri, bukan isi form — jadi apa yang terlihat di sini
 * benar-benar berasal dari teks yang akan tersalin, dan tidak bisa melenceng
 * dari `buildPatrolLog()`.
 *
 * Fontnya sengaja font bawaan sistem, bukan IBM Plex Mono milik situs: forum
 * memang memakai sans-serif biasa, dan font sistem sudah membawa huruf tebal
 * sendiri — subset font situs ini tidak punya ketebalan selain 400.
 */

// Nilai warna dari BBCode tidak pernah masuk ke gaya begitu saja.
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|[a-z]+)$/i

// Nama font: huruf, angka, spasi, dan tanda hubung saja.
const SAFE_FONT = /^[a-z0-9 -]{1,40}$/i

/**
 * Hanya http(s) yang boleh jadi alamat gambar atau tautan. Isi Activity dan
 * Crew member masuk ke BBCode apa adanya, jadi `[url=javascript:…]` bisa saja
 * diketik ke sana; tanpa saringan ini pratinjau akan menggambarnya sebagai
 * tautan yang benar-benar bisa diklik.
 */
const SAFE_URL = /^https?:\/\//i

/** Kotak pesan forum: garis tebal di kiri dengan latar tipis sewarna. */
function Notice({ tone, bg, children }) {
  return (
    <div
      style={{ borderLeftColor: tone, background: bg, color: tone }}
      className="my-1.5 border border-[#c9c9c9] border-l-4 px-2.5 py-1.5"
    >
      {children}
    </div>
  )
}

function render(node, key) {
  if (typeof node === 'string') return node

  const kids = node.children.map((child, i) => render(child, i))
  const value = node.value

  switch (node.tag) {
    case 'root':
      return <Fragment key={key}>{kids}</Fragment>

    case 'divbox': {
      const val = (value || '').toLowerCase().trim()
      if (val === 'maroon') {
        return (
          <div key={key} className="my-1.5 bg-[#7b0d12] px-2 py-1 text-white">
            {kids}
          </div>
        )
      }
      if (val === 'black') {
        const isEmpty = !kids || (Array.isArray(kids) && kids.length === 0)
        return (
          <div
            key={key}
            className={`my-1.5 bg-black text-white ${isEmpty ? 'h-1.5 sm:h-2' : 'p-2.5 sm:p-3'}`}
          >
            {kids}
          </div>
        )
      }
      if (val === 'beige') {
        return (
          <div key={key} className="my-1.5 border border-[#d8d2be] bg-[#f8f5ee] p-2.5 text-[#222] sm:p-3">
            {kids}
          </div>
        )
      }
      if (val && SAFE_COLOR.test(val)) {
        return (
          <div key={key} style={{ backgroundColor: val }} className="my-1.5 border border-[#c9c9c9] p-2.5 sm:p-3">
            {kids}
          </div>
        )
      }
      return (
        <div key={key} className="my-1.5 border border-[#c9c9c9] bg-white p-2.5 sm:p-3">
          {kids}
        </div>
      )
    }

    case 'center':
      return (
        <div key={key} className="text-center">
          {kids}
        </div>
      )
    case 'right':
      return (
        <div key={key} className="text-right">
          {kids}
        </div>
      )
    case 'justify':
      return (
        <div key={key} className="text-justify">
          {kids}
        </div>
      )
    case 'left':
      return (
        <div key={key} className="text-left">
          {kids}
        </div>
      )

    case 'b':
      return <strong key={key}>{kids}</strong>
    case 'i':
      return <em key={key}>{kids}</em>
    case 'u':
      return <u key={key}>{kids}</u>

    case 'size':
      return (
        <span key={key} style={{ fontSize: `${Math.min(Number(value) || 100, 300)}%` }}>
          {kids}
        </span>
      )

    case 'font':
      // Nama font dari BBCode tidak boleh menyelinap jadi gaya sembarangan.
      return (
        <span key={key} style={SAFE_FONT.test(value) ? { fontFamily: value } : undefined}>
          {kids}
        </span>
      )

    case 'color':
      return (
        <span key={key} style={SAFE_COLOR.test(value) ? { color: value } : undefined}>
          {kids}
        </span>
      )

    case 'hr':
      return <hr key={key} className="my-1.5 border-t border-[#c9c9c9] clear-both" />

    // list=0 di forum berarti daftar tanpa bullet.
    case 'list':
      if (value === '1') {
        return (
          <ol key={key} className="my-1 list-decimal pl-6">
            {kids}
          </ol>
        )
      }
      if (value === '0') {
        return (
          <ul key={key} className="my-1 list-none pl-0">
            {kids}
          </ul>
        )
      }
      return (
        <ul key={key} className="my-1 list-disc pl-6">
          {kids}
        </ul>
      )
    case '*':
      return <li key={key} className="mb-0.5">{kids}</li>

    case 'table':
      return (
        <table key={key} className="my-1.5 border-collapse">
          <tbody>{kids}</tbody>
        </table>
      )
    case 'tr':
      return <tr key={key}>{kids}</tr>
    case 'th':
      return (
        <th key={key} className="border border-[#c9c9c9] bg-black/5 px-2 py-1 text-left align-top">
          {kids}
        </th>
      )
    case 'td':
    case 'td1': {
      const bg = value && SAFE_COLOR.test(value) ? value : undefined
      return (
        <td
          key={key}
          style={bg ? { backgroundColor: bg } : undefined}
          className="border border-[#c9c9c9] px-2 py-1 align-top"
        >
          {kids}
        </td>
      )
    }

    case 'quote':
      return (
        <blockquote key={key} className="my-1.5 border-l-2 border-[#c9c9c9] bg-black/5 px-2.5 py-1.5">
          {kids}
        </blockquote>
      )

    case 'spoiler':
      return (
        <details key={key} className="my-1.5 border border-[#c9c9c9] bg-black/5">
          <summary className="cursor-pointer px-2 py-1 text-[11px] tracking-wide text-[#555] select-none">
            Spoiler
          </summary>
          <div className="px-2 pb-2">{kids}</div>
        </details>
      )

    case 'code':
      return (
        <div key={key} className="my-1.5 border border-[#c9c9c9] bg-black/5 text-[11.5px]">
          <div className="flex items-center justify-between border-b border-[#c9c9c9] px-2 py-1 text-[11px] text-[#555]">
            <span className="font-semibold">Code:</span>
            <button
              type="button"
              onClick={(e) => {
                const pre = e.currentTarget.parentElement?.nextElementSibling
                if (pre) {
                  const range = document.createRange()
                  range.selectNodeContents(pre)
                  const sel = window.getSelection()
                  sel?.removeAllRanges()
                  sel?.addRange(range)
                }
              }}
              className="cursor-pointer text-[#0b57a4] hover:underline"
            >
              Select all
            </button>
          </div>
          <pre className="scroll-thin overflow-x-auto p-2 font-mono">{kids}</pre>
        </div>
      )

    // Kotak pesan forum. Warnanya ditulis tetap di sini, bukan lewat token
    // tema situs: yang ditiru penampilan forum, bukan penampilan halaman ini.
    case 'info':
      return (
        <Notice key={key} tone="#1d5fbf" bg="#e8f0fb">
          {kids}
        </Notice>
      )
    case 'success':
      return (
        <Notice key={key} tone="#0e7a4f" bg="#e6f5ee">
          {kids}
        </Notice>
      )
    case 'warn':
      return (
        <Notice key={key} tone="#a8500b" bg="#fdf1e3">
          {kids}
        </Notice>
      )
    case 'error':
      return (
        <Notice key={key} tone="#d0121f" bg="#fdeaec">
          {kids}
        </Notice>
      )

    case 'progress': {
      const pct = Math.max(0, Math.min(Number(value) || 0, 100))
      return (
        <div key={key} className="my-1.5">
          <div
            role="img"
            aria-label={`Progress ${pct}%`}
            className="h-4 w-full overflow-hidden border border-[#c9c9c9] bg-white"
          >
            <div style={{ width: `${pct}%` }} className="h-full bg-[#7b0d12]" />
          </div>
          {kids.length > 0 && <div className="text-[11px] text-[#555]">{kids}</div>}
        </div>
      )
    }

    // Pemisah setinggi satu baris atau spasi indentasi paragraf.
    case 'space':
      return <span key={key} aria-hidden="true" className="inline-block w-6" />

    case 'aligntable': {
      const parts = (value || '').split(',')
      const align = parts[0]?.trim().toLowerCase()
      if (align === 'left') {
        const mr = Number(parts[3]) || 12
        const mb = Number(parts[4]) || 8
        return (
          <div
            key={key}
            style={{ float: 'left', marginRight: `${mr}px`, marginBottom: `${mb}px` }}
            className="my-1"
          >
            <div className="min-w-0">{kids}</div>
          </div>
        )
      }
      if (align === 'right') {
        const ml = Number(parts[5]) || 12
        const mb = Number(parts[4]) || 8
        return (
          <div
            key={key}
            style={{ float: 'right', marginLeft: `${ml}px`, marginBottom: `${mb}px` }}
            className="my-1"
          >
            <div className="min-w-0">{kids}</div>
          </div>
        )
      }
      return (
        <div key={key} className="my-1.5 flex justify-center">
          <div className="min-w-0">{kids}</div>
        </div>
      )
    }

    case 'block': {
      // [block=bgcolor,borderWidth,borderColor,padTop,padRight,padBottom,padLeft]
      const parts = (value || '').split(',')
      const bg = SAFE_COLOR.test(parts[0]?.trim() || '') ? parts[0].trim() : 'transparent'
      const bw = Math.min(Number(parts[1]) || 1, 10)
      const bc = SAFE_COLOR.test(parts[2]?.trim() || '') ? parts[2].trim() : '#c9c9c9'
      const padTop = Number(parts[3]) || 10
      const padRight = Number(parts[4]) || padTop
      const padBottom = Number(parts[5]) || padTop
      const padLeft = Number(parts[6]) || padRight
      return (
        <div
          key={key}
          style={{
            background: bg,
            border: `${bw}px solid ${bc}`,
            padding: `${padTop}px ${padRight}px ${padBottom}px ${padLeft}px`,
          }}
          className="my-1.5"
        >
          {kids}
        </div>
      )
    }

    case 'secspoiler':
      return (
        <details key={key} className="my-1.5 border border-[#c9c9c9] bg-black/5">
          <summary className="cursor-pointer px-2 py-1 text-[11px] tracking-wide text-[#555] select-none">
            {value || 'Secure spoiler'}
          </summary>
          <div className="px-2 pb-2">{kids}</div>
        </details>
      )

    case 'altspoiler':
      return (
        <details key={key} className="my-1.5 border border-[#c9c9c9] bg-black/5">
          <summary className="cursor-pointer px-2 py-1 text-[11px] tracking-wide text-[#555] select-none">
            {value || 'Spoiler'}
          </summary>
          <div className="px-2 pb-2">{kids}</div>
        </details>
      )

    case 'imageleft': {
      const src = textOf(node).trim()
      if (!SAFE_URL.test(src)) return null
      return (
        <img
          key={key}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="mr-2 mb-1 max-w-[45%] float-left"
        />
      )
    }

    case 'img':
    case 'img-resize': {
      const src = textOf(node).trim()
      if (!SAFE_URL.test(src)) return null
      const width = node.tag === 'img-resize' ? Number(value) || undefined : undefined
      return (
        <img
          key={key}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          style={width ? { width: `${width}px` } : undefined}
          className="inline-block max-w-full align-middle"
        />
      )
    }

    case 'url': {
      const href = (value || textOf(node)).trim()
      // Skema selain http(s) tetap tampil sebagai teks, bukan tautan.
      if (!SAFE_URL.test(href)) return <Fragment key={key}>{kids}</Fragment>
      return (
        <a key={key} href={href} target="_blank" rel="noreferrer noopener" className="text-[#0b57a4] underline">
          {kids}
        </a>
      )
    }

    default:
      return <Fragment key={key}>{kids}</Fragment>
  }
}

export default function BBCodePreview({ code, className = '' }) {
  return (
    <div
      // Latar abu-abu di belakang kotak putih, supaya postingannya terbaca
      // sebagai lembar tersendiri di atas halaman yang juga putih.
      className={`scroll-thin overflow-y-auto rounded-sm border border-line bg-raise p-2 sm:p-3 ${className}`}
    >
      <div className="bbcode">{render(parseBBCode(code), 0)}</div>
    </div>
  )
}
