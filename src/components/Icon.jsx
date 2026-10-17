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
  color: 'M8 2.2C8 2.2 3.5 7.6 3.5 10.5a4.5 4.5 0 0 0 9 0c0-2.9-4.5-8.3-4.5-8.3Z',
  font: 'M3 3.5h10M8 3.5v9M5.5 12.5h5',

  // Perataan
  left: 'M2 3.5h12M2 6.5h7M2 9.5h12M2 12.5h7',
  center: 'M2 3.5h12M4.5 6.5h7M2 9.5h12M4.5 12.5h7',
  right: 'M2 3.5h12M7 6.5h7M2 9.5h12M7 12.5h7',
  justify: 'M2 3.5h12M2 6.5h12M2 9.5h12M2 12.5h12',

  // Blok
  list: 'M5.5 4h9M5.5 8h9M5.5 12h9M2.5 4h.01M2.5 8h.01M2.5 12h.01',
  listNumbered: 'M6.5 4h7.5M6.5 8h7.5M6.5 12h7.5M2 3.2l1-.8v4.2M1.5 9h2L1.8 12.2h2.2',
  listPlain: 'M2.5 4h11M2.5 8h11M2.5 12h11',
  item: 'M8 3v10M3.7 5.5l8.6 5M3.7 10.5l8.6-5',
  quote: 'M3 7.5h2.5V10H3a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 3 4.5h2.5M10.5 7.5H13V10h-2.5a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5H13',
  code: 'm5 5-3 3 3 3M11 5l3 3-3 3M9.5 3.5l-3 9',
  box: 'M2.5 3.5h11v9h-11z',
  boxFilled: 'M2.5 3.5h11v9h-11zM2.5 6.5h11',
  block: 'M1.8 2.5h12.4v11H1.8zM4.5 5.5h7v5h-7z',
  hr: 'M1.5 8h13',
  space: 'M2.5 3.5h11M2.5 12.5h11M8 6v4M6.4 7.4 8 5.8l1.6 1.6M6.4 8.6 8 10.2l1.6-1.6',
  spoiler: 'M1.8 8S4 4.2 8 4.2 14.2 8 14.2 8S12 11.8 8 11.8 1.8 8 1.8 8Zm4.4 0a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0Z',
  altspoiler: 'M2.5 3h11M1.8 9.5S4 6.2 8 6.2s6.2 3.3 6.2 3.3-2.2 3.3-6.2 3.3-6.2-3.3-6.2-3.3Zm4.4 0a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0Z',
  lock: 'M4 7.5V5.6a4 4 0 0 1 8 0v1.9M3.2 7.5h9.6v6H3.2z',

  // Kotak pesan
  info: 'M8 2.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 8 2.2ZM8 7v4M8 5h.01',
  success: 'M8 2.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 8 2.2Zm-2.4 5.9 1.8 1.8 3.4-3.6',
  warn: 'M8 2.4 14.2 13H1.8L8 2.4ZM8 6.4v3.2M8 11.4h.01',
  error: 'M8 2.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 8 2.2ZM6 6l4 4M10 6l-4 4',
  progress: 'M1.8 6.2h12.4v3.6H1.8zM1.8 6.2h6.6v3.6H1.8z',

  // Media
  image: 'M2.2 3.4h11.6v9.2H2.2zM2.2 10.4l3.2-3 2.6 2.4 2.4-2.4 3.4 3.2M10.6 6.1h.01',
  imgResize: 'M2.2 3.4h11.6v9.2H2.2zM2.2 10.4l3.2-3 2.6 2.4 2.4-2.4 3.4 3.2M10.6 6.1h.01M13.8 9.5v3.1h-3.1',
  imageLeft: 'M1.8 3.6h6.4v6.4H1.8zM10.2 4.6h4M10.2 7.2h4M1.8 12.2h12.4',
  link: 'M6.6 9.4 9.4 6.6M6.9 4.6 8.2 3.3a2.8 2.8 0 0 1 4 4l-1.3 1.3M9.1 11.4 7.8 12.7a2.8 2.8 0 0 1-4-4l1.3-1.3',
  table: 'M2.2 3.6h11.6v8.8H2.2zM2.2 6.6h11.6M2.2 9.4h11.6M6.2 3.6v8.8M10.2 3.6v8.8',
  tableCentered: 'M4.2 4.6h7.6v6.8H4.2zM4.2 8h7.6M8 4.6v6.8M1.6 2.6h12.8M1.6 13.4h12.8',
  td1: 'M2 3h12v10H2zM2 7h12M6 3v10M2 3h4v4H2z',

  // Mode & Doktrin Panduan
  bolt: 'M8.5 1.5 3 8.5h4.5L6 14.5l7-7.5H8.5l1.5-5.5z',
  book: 'M2 3.5h4.5a2 2 0 0 1 2 2v7.5a1.5 1.5 0 0 0-2-1.5H2v-8zM14 3.5H9.5a2 2 0 0 0-2 2v7.5a1.5 1.5 0 0 1 2-1.5H14v-8z',
  calculator: 'M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm2 3h6M5 8h2M9 8h2M5 11h2M9 11h2',
  pin: 'M8 1.5a4 4 0 0 0-4 4c0 3 4 9 4 9s4-6 4-9a4 4 0 0 0-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z',
  chart: 'M2 13.5h12M4 11V8M8 11V4M12 11V6.5',
  pulse: 'M1.5 8.5h3l2-5 3 9 2-5.5 1.5 2.5h2',
  scale: 'M8 2v12M3 4.5h10M2 10.5 4.5 6 7 10.5h-5zM9 10.5 11.5 6 14 10.5H9z',
  question: 'M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM6.5 6a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5M8 11.5h.01',
  dice: 'M3 3h10v10H3zM5.5 5.5h.01M10.5 10.5h.01M10.5 5.5h.01M5.5 10.5h.01M8 8h.01',
  check: 'M3 8.5l3.5 3.5 6.5-7.5',
  cross: 'M4 4l8 8M12 4l-8 8',
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
