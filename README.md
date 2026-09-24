# LSFD RP

Panduan RP ketik Los Santos Fire Department untuk JGVRP, di <https://ems.viend.my.id>.

Dibuka di layar kedua saat main: klik kategori di papan kiri, klik barisnya, teks RP masuk
clipboard, tempel ke chat game. Nomor `/xx` di kiri cuma penanda shortcut in-game — dia tidak
pernah ikut tersalin.

## Isinya

Radio dan status, penanganan korban, DEAT, ABC, patah tulang, luka ringan, obat ILS, patient load,
rumah sakit, coroner, MVA, vertical rescue, plus tabel referensi: stok anim, command game, dan
kamus kode (10-code, Status, CAT, Triage, LOC).

Sumbernya `LSFD RP.md` (patokan utama) dan `LSFD Field Handbook.md` (arti kode dan teori).

## Menyunting isi

Teks RP ada di `src/data/procedures/`, satu berkas per kategori. Menambah kategori cukup membuat
berkas baru lalu mendaftarkannya di `src/data/index.js` — tidak perlu menyentuh komponen.

Langkah yang dipakai berulang di banyak cabang ditulis sekali dengan `id`, lalu disebut lagi
sebagai `{ ref: 'id' }`, jadi satu koreksi berlaku di semua tempat.

```bash
npm install
npm run dev     # buka http://localhost:5173
npm test        # cek keutuhan data sebelum push
```

`npm test` gagal kalau ada `ref` yang menggantung, id ganda, atau percabangan menunjuk bagian yang
tidak ada — jadi salah ketik ketahuan sebelum naik ke produksi.

## Deploy

Push ke `main` memicu build dan deploy otomatis lewat Cloudflare Workers Builds. Tidak ada langkah
manual.
