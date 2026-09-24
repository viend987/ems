// Konversi foto unit LSFD ke WebP untuk galeri Unit.
//
// Taruh file mentah (png/jpg/webp) di folder `images-incoming/`, lalu jalankan:
//   npm run units
//
// Nama file jadi id-nya — beri nama sesuai callsign unitnya (mis. `engine.jpeg`,
// `lifeflight.png`), lalu pakai id itu di `image` pada src/data/units.js.
//
// Gambar tidak dipotong sama sekali. Foto unit selalu landscape dan yang penting
// justru kendaraannya utuh, jadi rasio aslinya dipertahankan dan hanya dikecilkan.
import { mkdir, readdir, rename } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const IN_DIR = 'images-incoming'
const OUT_DIR = 'src/assets/units'
const DONE_DIR = path.join(IN_DIR, 'done')
const WIDTH = 960 // cukup tajam untuk kartu dua kolom di layar retina

const run = async () => {
  if (!existsSync(IN_DIR)) {
    await mkdir(IN_DIR, { recursive: true })
    console.log(`Folder ${IN_DIR}/ dibuat. Taruh gambar di sana lalu jalankan lagi.`)
    return
  }
  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(DONE_DIR, { recursive: true })

  const files = (await readdir(IN_DIR, { withFileTypes: true }))
    .filter((f) => f.isFile() && /\.(png|jpe?g|webp)$/i.test(f.name))
    .map((f) => f.name)

  if (files.length === 0) {
    console.log(`Tidak ada gambar baru di ${IN_DIR}/`)
    return
  }

  for (const file of files) {
    const id = path
      .basename(file, path.extname(file))
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const out = path.join(OUT_DIR, `${id}.webp`)
    const info = await sharp(path.join(IN_DIR, file))
      .resize(WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(out)

    await rename(path.join(IN_DIR, file), path.join(DONE_DIR, file))
    console.log(`✓ ${id}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`)
  }
  console.log(`\nSelesai. Pakai image: '<id>' di src/data/units.js`)
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
