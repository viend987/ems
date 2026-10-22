// Mengubah lsfd.png (1,6 MB) jadi aset kecil: logo header (AVIF + WebP) dan
// favicon PNG. Jalankan ulang kalau berkas sumbernya diganti.
//
//   npm run logo
import { existsSync } from 'node:fs'
import { mkdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

const SOURCE = 'lsfd.png'

if (!existsSync(SOURCE)) {
  console.error(`Berkas ${SOURCE} tidak ditemukan di root. Pastikan berkas sumber ${SOURCE} ada untuk membuat ulang logo.`)
  process.exit(1)
}
// Logo tampil 64px di layar lebar; 128px cukup untuk layar retina 2x.
const LOGO = 128
// Tab browser memakai 16–32px; 48px memberi ruang untuk layar berkerapatan tinggi.
const FAVICON = 48

await mkdir('src/assets', { recursive: true })

const logo = sharp(SOURCE).resize(LOGO, LOGO)
await logo.clone().avif({ quality: 60, effort: 6 }).toFile('src/assets/lsfd.avif')
await logo.clone().webp({ quality: 86 }).toFile('src/assets/lsfd.webp')
// palette: lambang LSFD hanya punya sedikit warna, jadi PNG berpalet jauh lebih kecil.
await sharp(SOURCE)
  .resize(FAVICON, FAVICON)
  .png({ palette: true, compressionLevel: 9, effort: 10 })
  .toFile('public/favicon.png')

for (const f of ['src/assets/lsfd.avif', 'src/assets/lsfd.webp', 'public/favicon.png']) {
  console.log(`✓ ${f}  ${((await stat(f)).size / 1024).toFixed(1)} KB`)
}
