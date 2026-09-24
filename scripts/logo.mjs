// Mengubah lsfd.png (1,6 MB) jadi aset kecil: logo WebP untuk header dan
// favicon PNG. Jalankan ulang kalau berkas sumbernya diganti.
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const SOURCE = 'lsfd.png'

await mkdir('src/assets', { recursive: true })

await sharp(SOURCE).resize(144, 144).webp({ quality: 88 }).toFile('src/assets/lsfd.webp')
await sharp(SOURCE).resize(64, 64).png({ compressionLevel: 9 }).toFile('public/favicon.png')

console.log('lsfd.webp + favicon.png dibuat')
