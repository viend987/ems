// Konversi foto unit LSFD untuk galeri Unit: AVIF (utama) + WebP (cadangan),
// masing-masing dalam dua lebar supaya layar kecil/1x tidak mengunduh versi retina.
//
// Taruh file mentah (png/jpg/webp) di folder `images-incoming/`, lalu jalankan:
//   npm run units
// Untuk memproses ulang semua file di `images-incoming/done/` (mis. setelah ganti setelan):
//   npm run units -- --rebuild
//
// Nama file jadi id-nya — beri nama sesuai callsign unitnya (mis. `engine.jpeg`,
// `lifeflight.png`), lalu pakai id itu di `images` pada src/data/units.js.
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

// 480 untuk kartu di layar 1x (desktop dua kolom), 960 untuk layar retina dan ponsel.
// Harus sama dengan WIDTHS di src/components/UnitGallery.jsx.
const WIDTHS = [480, 960]
// AVIF q50 setara WebP q76 secara visual untuk foto kendaraan in-game.
const AVIF = { quality: 50, effort: 6 }
const WEBP = { quality: 76 }

const rebuild = process.argv.includes('--rebuild')

const run = async () => {
  if (!existsSync(IN_DIR)) {
    await mkdir(IN_DIR, { recursive: true })
    console.log(`Folder ${IN_DIR}/ dibuat. Taruh gambar di sana lalu jalankan lagi.`)
    return
  }
  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(DONE_DIR, { recursive: true })

  const srcDir = rebuild ? DONE_DIR : IN_DIR
  const files = (await readdir(srcDir, { withFileTypes: true }))
    .filter((f) => f.isFile() && /\.(png|jpe?g|webp)$/i.test(f.name))
    .map((f) => f.name)

  if (files.length === 0) {
    console.log(`Tidak ada gambar di ${srcDir}/`)
    return
  }

  for (const file of files) {
    const id = path
      .basename(file, path.extname(file))
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const src = path.join(srcDir, file)
    const sizes = []

    for (const width of WIDTHS) {
      const base = sharp(src).resize(width, null, { withoutEnlargement: true })
      const avif = await base.clone().avif(AVIF).toFile(path.join(OUT_DIR, `${id}-${width}.avif`))
      await base.clone().webp(WEBP).toFile(path.join(OUT_DIR, `${id}-${width}.webp`))
      sizes.push(`${width}w ${(avif.size / 1024).toFixed(0)} KB`)
    }

    if (!rebuild) await rename(src, path.join(DONE_DIR, file))
    console.log(`✓ ${id}  avif ${sizes.join(' · ')}`)
  }
  console.log(`\nSelesai. Pakai image: '<id>' di src/data/units.js`)
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
