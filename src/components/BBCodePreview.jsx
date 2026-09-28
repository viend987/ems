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

function render(node, key) {
  if (typeof node === 'string') return node

  const kids = node.children.map((child, i) => render(child, i))
  const value = node.value

  switch (node.tag) {
    case 'root':
      return <Fragment key={key}>{kids}</Fragment>

    case 'divbox':
      // Batang maroon adalah judul bagian; divbox putih adalah badan postingan.
      return value.toLowerCase() === 'maroon' ? (
        <div key={key} className="my-1.5 bg-[#7b0d12] px-2 py-1 text-white">
          {kids}
        </div>
      ) : (
        <div key={key} className="border border-[#c9c9c9] bg-white p-2.5 sm:p-3">
          {kids}
        </div>
      )

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

    case 'color':
      return (
        <span key={key} style={SAFE_COLOR.test(value) ? { color: value } : undefined}>
          {kids}
        </span>
      )

    case 'hr':
      return <hr key={key} className="my-1.5 border-t border-[#c9c9c9]" />

    // list=0 di forum berarti daftar tanpa bullet.
    case 'list':
      return (
        <ul key={key} className="my-1 list-none pl-0">
          {kids}
        </ul>
      )
    case '*':
      return <li key={key}>{kids}</li>

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

    case 'img':
    case 'img-resize': {
      const src = textOf(node).trim()
      if (!/^https?:\/\//i.test(src)) return null
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
      const href = value || textOf(node)
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
