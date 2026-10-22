// Memotong font self-host sampai tinggal glyph yang benar-benar tampil di web ini.
//
//   npm run fonts
//
// Subset "latin" bawaan @fontsource membawa ~200 glyph — huruf beraksen, simbol
// mata uang, tanda baca yang tidak pernah muncul di sini. Hasilnya ditulis ke
// src/assets/fonts/ dan di-commit, jadi build biasa tidak perlu menjalankan ini.
// Jalankan ulang kalau konten mulai memakai karakter di luar daftar di bawah.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import subsetFont from 'subset-font'

const OUT_DIR = 'src/assets/fonts'

// ASCII yang bisa dicetak, U+0020 sampai U+007E.
const ASCII = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)).join('')
// Tanda baca tipografis yang dipakai di konten dan antarmuka.
const TYPO = '—–·“”‘’›…→≥≤'

const FONTS = [
  {
    // Judul (.slab). Selalu text-transform: uppercase, jadi huruf kecil tidak
    // pernah digambar — browser mencocokkan glyph setelah transformasi.
    src: 'node_modules/@fontsource/saira-condensed/files/saira-condensed-latin-800-normal.woff2',
    out: 'saira-condensed-800.woff2',
    text: ASCII.replace(/[a-z]/g, '') + TYPO,
  },
  {
    // Seluruh teks RP dan antarmuka.
    src: 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
    out: 'ibm-plex-mono-400.woff2',
    text: ASCII + TYPO,
  },
]

await mkdir(OUT_DIR, { recursive: true })

for (const font of FONTS) {
  const input = await readFile(font.src)
  const output = await subsetFont(input, font.text, { targetFormat: 'woff2' })
  await writeFile(`${OUT_DIR}/${font.out}`, output)
  const kb = (n) => (n / 1024).toFixed(1)
  console.log(`✓ ${font.out}  ${kb(input.length)} KB → ${kb(output.length)} KB`)
}
