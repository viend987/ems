/**
 * Ikon toolbar. Semuanya SVG inline, bukan paket ikon: satu dependensi ikon
 * mana pun lebih besar daripada seluruh kumpulan ini, dan yang dipakai cuma
 * dua puluhan bentuk.
 *
 * Semua digambar pada kanvas 16×16 dengan garis `currentColor`, jadi warnanya
 * ikut warna tombolnya dan tidak perlu diatur dua kali.
 */

const PATHS = {
  // Tema
  sun: 'M8 10.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM8 1.4v1.6M8 13v1.6M1.4 8H3M13 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1',
  moon: 'M13.2 10.4A5.6 5.6 0 0 1 5.6 2.8a5.8 5.8 0 1 0 7.6 7.6Z',

  // Teks
  color: 'M8 2s4 4.5 4 7a4 4 0 0 1-8 0c0-2.5 4-7 4-7Z',
  font: 'M2 13 5.5 3h1L10 13M3.2 10h6.1M11 13V7.5h1.2a1.9 1.9 0 0 1 0 3.8H11',

  // Perataan
  left: 'M2 3.5h12M2 6.5h7M2 9.5h12M2 12.5h7',
  center: 'M2 3.5h12M4.5 6.5h7M2 9.5h12M4.5 12.5h7',
  right: 'M2 3.5h12M7 6.5h7M2 9.5h12M7 12.5h7',
  justify: 'M2 3.5h12M2 6.5h12M2 9.5h12M2 12.5h12',

  // Blok
  list: 'M5.5 4h9M5.5 8h9M5.5 12h9M2.5 4h.01M2.5 8h.01M2.5 12h.01',
  listNumbered: 'M6 4h8.5M6 8h8.5M6 12h8.5M1.6 2.8h1v2.6M1.4 7.2h1.8L1.4 9.4h1.9M1.4 11h1.8v1.2H1.4v1.2h1.8',
  item: 'M8 3.2v9.6M4 5.5l8 5M12 5.5l-8 5',
  quote: 'M6 5H3.5A1.5 1.5 0 0 0 2 6.5v1A1.5 1.5 0 0 0 3.5 9H5v.8A1.2 1.2 0 0 1 3.8 11M14 5h-2.5A1.5 1.5 0 0 0 10 6.5v1A1.5 1.5 0 0 0 11.5 9H13v.8A1.2 1.2 0 0 1 11.8 11',
  code: 'm5.5 4.5-3.5 3.5 3.5 3.5M10.5 4.5 14 8l-3.5 3.5',
  box: 'M2.5 3.5h11v9h-11z',
  boxFilled: 'M2.5 3.5h11v9h-11zM2.5 6.5h11',
  hr: 'M1.5 8h13',
  space: 'M2.5 3.5h11M2.5 12.5h11M8 6v4M6.4 7.4 8 5.8l1.6 1.6M6.4 8.6 8 10.2l1.6-1.6',
  spoiler: 'M1.8 8S4 4.2 8 4.2 14.2 8 14.2 8S12 11.8 8 11.8 1.8 8 1.8 8Zm4.4 0a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0Z',
  lock: 'M4 7.5V5.6a4 4 0 0 1 8 0v1.9M3.2 7.5h9.6v6H3.2z',

  // Kotak pesan
  info: 'M8 2.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 8 2.2ZM8 7v4M8 5h.01',
  success: 'M8 2.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 8 2.2Zm-2.4 5.9 1.8 1.8 3.4-3.6',
  warn: 'M8 2.4 14.2 13H1.8L8 2.4ZM8 6.4v3.2M8 11.4h.01',
  error: 'M8 2.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 8 2.2ZM6 6l4 4M10 6l-4 4',
  progress: 'M1.8 6.2h12.4v3.6H1.8zM1.8 6.2h6.6v3.6H1.8z',

  // Media
  image: 'M2.2 3.4h11.6v9.2H2.2zM2.2 10.4l3.2-3 2.6 2.4 2.4-2.4 3.4 3.2M10.6 6.1h.01',
  imageLeft: 'M1.8 3.6h6.4v6.4H1.8zM10.2 4.6h4M10.2 7.2h4M1.8 12.2h12.4',
  link: 'M6.6 9.4 9.4 6.6M6.9 4.6 8.2 3.3a2.8 2.8 0 0 1 4 4l-1.3 1.3M9.1 11.4 7.8 12.7a2.8 2.8 0 0 1-4-4l1.3-1.3',
  table: 'M2.2 3.6h11.6v8.8H2.2zM2.2 6.6h11.6M2.2 9.4h11.6M6.2 3.6v8.8M10.2 3.6v8.8',
  tableCentered: 'M4.2 4.6h7.6v6.8H4.2zM4.2 8h7.6M8 4.6v6.8M1.6 2.6h12.8M1.6 13.4h12.8',
}

export default function Icon({ name, className = 'size-4' }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={path} />
    </svg>
  )
}
