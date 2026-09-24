# LSFD RP Reference — Design Spec

**Tanggal:** 2026-09-24
**Repo:** https://github.com/farhanmaul987/ems
**Domain produksi:** https://ems.viend.my.id

---

## 1. Tujuan

Mengganti dokumen justpaste.it (`justpaste.it/lsfdalr`) dengan alat operasional yang bisa dipakai
sambil main: pemain LSFD di JGVRP (server ketik) membuka web ini di layar kedua saat menangani
korban, mengklik kategori yang relevan, dan menyalin teks RP untuk ditempel ke chat game.

Masalah yang diselesaikan: dokumen lama adalah satu dinding teks. Mencari prosedur yang tepat
berarti menggulir panjang sementara pemain lain menunggu di TKP.

**Ukuran keberhasilan:** dari membuka web sampai teks ada di clipboard, cukup dua klik —
satu ke kategori, satu ke baris langkahnya. Tanpa mengetik apa pun. Tanpa menunggu animasi.

### Bukan tujuan

- Bukan alat latihan atau kuis. Tidak ada progres, skor, atau riwayat.
- Bukan alat kolaborasi. Tidak ada akun, tidak ada server, tidak ada data yang dikirim ke mana pun.
- Tidak menyunting konten dari dalam web. Teks RP diubah dengan menyunting berkas data di repo.

---

## 2. Pengguna dan konteks pakai

Pemilik repo dan rekan-rekan LSFD-nya. Dibuka di laptop/PC (layar kedua atau alt-tab), kadang di
ponsel. Dipakai dalam keadaan terburu-buru: korban sudah tergeletak, pemain lain menunggu ketikan.

Konsekuensi desain dari konteks ini:

- Tidak ada gerakan yang harus selesai sebelum aksi berikutnya bisa dilakukan.
- Pencarian ada, tapi tidak pernah menjadi satu-satunya jalan. Semua bisa dicapai dengan klik.
- Teks harus terbaca sekilas dari jarak pandang menyamping.

---

## 3. Sumber konten

| Berkas | Peran |
|---|---|
| `LSFD RP.md` | **Patokan utama.** Semua teks RP, nomor shortcut, dan urutan prosedur berasal dari sini. |
| `LSFD Field Handbook.md` | Referensi sekunder. Sumber arti 10-code, Code 0–4, Status 1–10, CAT, Triage, LOC, dan penjelasan teori tiap tahap. |
| `LSFD RP.pdf` | Arsip sumber asli, tidak dipakai langsung. |
| `lsfd.png` | Lambang LSFD, dipakai sebagai logo dan favicon setelah dikonversi. |

Bila kedua dokumen berbeda, `LSFD RP.md` menang.

---

## 4. Arah visual — "TONE OUT"

Idenya adalah momen panggilan masuk di stasiun pemadam: pita status di puncak layar, papan status
apparatus sebagai navigasi, dan langkah RP yang tersaji seperti log radio bermonospace.

### Palet

| Token | Nilai | Peran |
|---|---|---|
| `ink` | `#0A0A0B` | Latar halaman |
| `panel` | `#121215` | Papan, kartu, permukaan naik |
| `line` | `#1E1E22` | Garis pemisah, tepi |
| `muted` | `#5E5E68` | Nomor, label sekunder |
| `bone` | `#EDEDEF` | Teks utama |
| `alarm` | `#FF3B30` | Merah LSFD: kategori aktif, baris radio, pita LED |
| `signal` | `#FFB800` | Kuning LSFD: `/me`, penanda waktu, aksen |
| `calm` | `#8FB8FF` | `/do` — pertanyaan ke lawan RP |
| `mech` | `#5FD3A0` | Command mekanik server |
| `anim` | `#C79BFF` | Nama animasi |

Merah dan kuning mendapat porsi seimbang sesuai lambang LSFD: merah menandai apa yang sedang aktif
dan apa yang disiarkan, kuning menandai apa yang diperbuat karakter.

### Tipografi

- **Saira Condensed** (800/900) — judul, nama kategori, nama bagian. Rapat dan berat; memberi bobot
  tanpa memakan ruang lebar.
- **IBM Plex Mono** (400/500/600) — seluruh teks RP, nomor, label kecil. Monospace dipakai karena
  teks ini memang akan ditempel ke chat game; melihatnya dalam lebar tetap membantu memindai baris.

Keduanya di-*host* sendiri dari `src/assets/fonts/` sebagai `.woff2`, bukan dari Google Fonts, agar
tidak ada permintaan ke server pihak ketiga saat halaman dibuka.

### Gerak

**Aturan keras: hanya ada satu elemen bergerak di seluruh web, yaitu pita alur di puncak layar, dan
hanya ketika isinya tidak muat.**

Di layar lebar rantai alur muat seluruhnya sehingga pita itu diam. Di layar sempit ia bergeser
pelan (durasi ±22 detik, linear, berulang) karena tak ada cara lain menampilkannya utuh.

Selain itu: tidak ada animasi masuk saat scroll, tidak ada transisi hover pada kartu, tidak ada
buka-tutup beranimasi. Satu-satunya umpan balik bergerak adalah perubahan chip nomor menjadi
`✓ tersalin` selama ±1 detik setelah pengguna menyalin — itu menjawab aksi pengguna, bukan hiasan.

`prefers-reduced-motion: reduce` menghentikan pergeseran pita.

---

## 5. Kerangka layar

```
┌────────────────────────────────────────────────────────────────┐
│ DANGER → RESPONSE → X BLEEDING → AIRWAY → BREATHING →          │ pita alur
│ CIRCULATION → RE-ASSESS → LOAD → TRANSPORT                     │
├────────────────────────────────────────────────────────────────┤
│ [logo] LOS SANTOS                                              │
│        FIRE DEPT        Panduan RP ketik LSFD · JGVRP          │ header
├──────────────┬─────────────────────────────────────────────────┤
│ [cari…]      │  DIRECT PRESSURE                    Salin semua │
│              │  ┌────┬─────────────────────────────────┬─────┐ │
│ TKP          │  │ 71 │ /me mengambil Trauma Scissor…   │  ⧉  │ │
│  ● Penanganan│  ├────┼─────────────────────────────────┼─────┤ │
│  ○ DEAT      │  │ 72 │ /me mengambil Trauma Dressing…  │  ⧉  │ │
│  ○ ABC       │  ├────┼─────────────────────────────────┼─────┤ │
│  ○ …         │  │ 73 │ /do Apakah pendarahan berhenti? │  ⧉  │ │
│ RADIO        │  │    │  Berhenti → ABC    Masih → ↓    │     │ │
│  ○ Radio     │  └────┴─────────────────────────────────┴─────┘ │
│ REFERENSI    │                                                 │
│  ○ Anim      │  ELEVATION                          Salin semua │
└──────────────┴─────────────────────────────────────────────────┘
```

### Pita alur

Merangkap dua peran: satu-satunya elemen bergerak, sekaligus gambaran alur yang selalu terlihat.
Isinya rantai tetap `DANGER → RESPONSE → X BLEEDING → AIRWAY → BREATHING → CIRCULATION →
RE-ASSESS → LOAD → TRANSPORT`. Tiap simpul adalah tautan yang meloncat ke bagian terkait.

### Papan navigasi

Papan status stasiun: kategori dikelompokkan dengan judul kelompok, kategori aktif menyala merah
dengan titik indikator. Menempel (`position: sticky`) saat menggulir di desktop.

Di bawah 768px papan berubah menjadi deretan chip mendatar yang bisa digeser, menempel di bawah
header. Kelompok menjadi pemisah visual di dalam deretan itu.

### Panel isi

Menampilkan seluruh bagian dari kategori terpilih, satu di bawah lainnya. Tiap bagian punya judul
dan tombol **Salin semua**.

---

## 6. Baris langkah

Satu baris = satu teks yang bisa disalin.

```
┌──────┬──────────────────────────────────────────────────┬─────┐
│  71  │ /me mengambil Trauma Scissor dari ILS Bag lalu…  │  ⧉  │
└──────┴──────────────────────────────────────────────────┴─────┘
  ^ nomor shortcut, penanda mata — TIDAK ikut tersalin
```

**Aturan salin:** yang masuk clipboard hanyalah teks RP itu sendiri. Nomor `(/71)`, label jenis,
dan segala penanda antarmuka tidak ikut. Mengklik di mana saja pada baris menyalin; tombol `⧉` ada
sebagai penanda visual bahwa baris itu bisa diklik.

**Jenis baris** ditandai warna garis tepi kiri dan warna awalan perintahnya:

| Jenis | Warna | Contoh |
|---|---|---|
| `me` | `signal` kuning | `/me mengambil ILS Bag dari dalam unit kendaraan…` |
| `do` | `calm` biru | `/do Apakah pendarahan berhenti?` |
| `radio` | `alarm` merah | `/r ~ Status-6 on 10-20 Legion.` |
| `say` | `bone` putih | `Halo, apakah bisa mendengar suara saya?` |
| `command` | `mech` hijau | `/gurney get 2` |
| `anim` | `anim` ungu | `.medic2` |
| `note` | `muted`, tanpa tombol salin | `Kalo jawab CLOSE FRACTURE: A B C → Broken Bone` |

Baris `note` adalah catatan pedoman, bukan teks yang diketik ke game, jadi tidak bisa disalin dan
tidak punya nomor.

### Percabangan

Pertanyaan `/do` yang menentukan cabang tetap satu baris biasa — tidak ada wizard, tidak ada
langkah yang dipaksa dilewati. Di bawah teksnya muncul penunjuk berupa tautan ke bagian tujuan:

```
│ 61 │ /do Patah tulang jenis apa yang dialami korban?  │ ⧉ │
│    │   Close Fracture → ABC        Open Fracture → DEAT   │
```

Ini menjaga kecepatan: pemain berpengalaman mengabaikannya, pemain baru mengikutinya.

---

## 7. Struktur data

### Bentuk

Satu berkas per kategori di `src/data/procedures/`, masing-masing mengekspor objek kategori:

```js
// src/data/procedures/deat.js
export default {
  id: 'deat',
  group: 'tkp',
  name: 'DEAT / Pendarahan',
  blurb: 'GSW, vital wound, flesh wound, open fracture.',
  sections: [
    {
      id: 'direct-pressure',
      name: 'Direct Pressure',
      steps: [
        { n: 71, kind: 'me', text: 'mengambil Trauma Scissor dari ILS Bag lalu menggunting pakaian korban yang menutupi luka.' },
        { n: 72, kind: 'me', text: 'mengambil Trauma Dressing dari ILS Bag lalu meletakkannya diatas luka korban sambil memberi tekanan.' },
        { n: 73, kind: 'do', text: 'Apakah pendarahan berhenti?' },
        { kind: 'note', text: 'Jika belum:' },
        { n: 74, kind: 'me', text: 'mengambil trauma dressing yang baru dari dalam ILS Bag.' },
        { ref: 73 },
      ],
    },
  ],
}
```

`text` menyimpan kalimatnya saja; awalan `/me`, `/do`, `/r` diturunkan dari `kind` saat render dan
saat menyusun teks salinan. Ini mencegah awalan salah ketik dan membuat pewarnaan konsisten.

### Langkah berulang

Dokumen sumber mengulang langkah yang sama di banyak cabang. `/73` muncul lima kali, `/119`–`/121`
muncul di empat varian bantuan napas, `/101`–`/103` di dua metode airway, `/31`–`/36` di dua tempat.

Kemunculan pertama menuliskan langkahnya penuh dan diberi `id`; kemunculan berikutnya cukup
`{ ref: 'id-itu' }` dan teksnya diambil dari definisi aslinya. Satu sumber kebenaran, tanpa memaksa
penulis konten memindahkan apa pun ke berkas terpisah. Rujukan bekerja lintas berkas kategori,
sehingga urutan definisi tidak perlu dipikirkan.

Rujukan sengaja memakai `id`, bukan nomor `n`. Alasannya ditemukan saat memindahkan isi: dokumen
sumber memakai `/73` untuk **dua kalimat berbeda** — "Apakah pendarahan berhenti?" di direct
pressure, elevation, dan arterial pressure; lalu "Terlihat pendarahan mulai dapat diatasi." di
tourniquet dan CRoC. Keduanya dipertahankan apa adanya. Karena `n` hanya penanda tampilan dan bukan
kunci rujukan, ketidakkonsistenan itu tidak merusak apa pun — tapi perlu diketahui kalau suatu saat
shortcut in-game mau dirapikan.

### Aturan yang ditegakkan tes

`src/lib/procedures.test.js` gagal bila:

1. Ada `id` langkah yang dipakai dua kali.
2. Ada `ref` menunjuk `id` yang tidak pernah didefinisikan.
3. Ada `kind` di luar daftar yang dikenal.
4. Ada `id` kategori atau `id` bagian yang bentrok, atau kategori masuk kelompok tak terdaftar.
5. Ada langkah yang bisa disalin tapi teksnya kosong.
6. Ada percabangan atau simpul pita alur menunjuk bagian yang tidak ada.

### Berkas data lain

- `src/data/anims.js` — daftar animasi (`.medic2`, `.cpr`, `.mechanic`, `.inspect`, `.prop_tablet2`,
  `.prop_clipboard`, `.mechanic3`, `.medic`, dst) dengan keterangan kapan dipakai.
- `src/data/commands.js` — command mekanik server (`/fo`, `/inspect [id]`, `/gurney get|load|return`,
  `/removebarrier`, `/bed [id]`, `/dropbody`, `/stabilize [id]`, `/heal [id]`,
  `/hospitalbill search [nama]`, `/medicreport [id]`, `/megaphone`, `/ro`, `/d`).
- `src/data/codes.js` — kamus kode dari Field Handbook: 10-code, Code 0–4, Status 1–10 (termasuk
  5a/5e/7e/9e), CAT-A/B/C, Triage (Black/Red/Yellow/Green), LOC A/V/P/U, dan singkatan tempat
  (DFS, PBH, OCD, RID).
- `src/data/flow.js` — simpul pita alur dan tautan tujuannya.

---

## 8. Peta kategori

| Kelompok | Kategori | Bagian di dalamnya |
|---|---|---|
| **TKP** | Penanganan Korban | Default Procedure · Kalau Bone Fracture · Kalau GSW |
| | DEAT / Pendarahan | Direct Pressure · Elevation · Arterial Pressure · Tourniquet (tangan/kaki) · CRoC (tubuh) |
| | ABC | Airway: Head-Tilt Chin-Lift · Airway: Jaw-Thrust · Breathing (4 varian oksigen + 2 cara ukur) · Circulation · CPR · Cardiac Arrest / AED |
| | Patah Tulang | Triangular Bandage · C-Collar · Vacuum Splint · Traction Splint |
| | Luka Ringan | Graze · Bruise |
| | Obat ILS | Setup IV · Lactated Ringer · Saline · Atropine · Epinephrine · Verapamil · Ibuprofen |
| **RADIO** | Radio & Status | Pager · Default Radio · OCD Calling · Scene Proc · Megaphone · Jarang Dipakai |
| | OCD Takeover | Radio OCD |
| **TRANSPORT** | Patient Load | Prosedur muat pasien |
| | Rumah Sakit | Sampai di PBH · Doctor Report · Reply NPC tanpa dokter · RP Bill |
| **KHUSUS** | Coroner | RPLy · Possible CK Scene |
| | MVA & Kebakaran | Vehicle Identify · Mematikan Mesin |
| | Vertical Rescue | Radio penerbangan |
| **REFERENSI** | Stok Anim | Daftar animasi |
| | Command Game | Daftar command mekanik |
| | Kamus Kode | 10-Code · Code · Status · CAT · Triage · LOC |

Tiga kategori terakhir berbentuk tabel referensi, bukan urutan langkah, sehingga memakai tata letak
sendiri: daftar dua kolom (kode + arti) dengan tombol salin hanya pada kodenya.

---

## 9. Navigasi dan status

Kategori aktif disimpan di hash URL (`/#/deat`), sehingga tautan bisa dibagikan ke rekan satu
faction dan tombol *back* peramban bekerja. Tidak memakai pustaka router; cukup pembacaan
`location.hash` dan `hashchange`.

Kategori terakhir yang dibuka juga disimpan di `localStorage` sebagai tujuan awal ketika web dibuka
tanpa hash. Setiap pembacaan `localStorage` dibungkus `try/catch` dan halaman tetap benar bila
penyimpanan tidak tersedia.

Bagian di dalam kategori punya `id` sehingga bisa jadi sasaran loncat (`/#/abc#breathing-nrb`),
dipakai oleh penunjuk percabangan dan pita alur.

---

## 10. Pencarian

Kolom kecil di kepala papan. Menyaring kategori *dan* langkah secara bersamaan: mengetik `tourni`
menampilkan daftar pendek baris yang cocok lintas kategori, mengetik `73` menampilkan langkah
bernomor 73. Mengklik hasil membuka kategorinya dan menggulir ke barisnya.

Tombol `/` memfokuskan kolom ini; `Esc` mengosongkan dan melepas fokus. Pencarian tidak pernah
menjadi keharusan — semua isi tetap bisa dicapai dengan mengklik papan.

Pencocokan dilakukan atas teks tanpa memperhatikan huruf besar-kecil, atas nomor langkah, dan atas
nama bagian.

---

## 11. Menyalin

`navigator.clipboard.writeText()` dengan penurunan ke elemen `textarea` tersembunyi + `execCommand`
bila API clipboard tidak tersedia (mis. konteks tidak aman).

Teks yang disalin disusun oleh fungsi murni `copyText(step)` di `src/lib/copy.js`, yang menempelkan
awalan sesuai `kind` dan tidak pernah menyertakan nomor. Fungsi ini diuji.

**Salin semua** pada sebuah bagian menggabungkan teks semua langkah yang bisa disalin di bagian itu,
satu per baris, melewati baris `note`.

Bila penyalinan gagal, chip menampilkan `gagal — salin manual` dan barisnya menjadi teks terpilih
sehingga pengguna bisa menyalin sendiri. Pesan itu menjelaskan apa yang harus dilakukan, bukan
sekadar memberi tahu ada kesalahan.

---

## 12. Responsif

| Lebar | Tata letak |
|---|---|
| ≥1024px | Dua kolom: papan 260px menempel + panel isi. Pita alur diam. |
| 768–1023px | Dua kolom, papan menyempit jadi 200px. Pita alur mungkin bergeser. |
| <768px | Satu kolom. Papan jadi deretan chip mendatar yang menempel di bawah header. Pita alur bergeser. Baris langkah menumpuk: nomor dan tombol salin pindah ke baris atas, teks penuh di bawahnya. |

Sasaran sentuh minimal 44px di ponsel. Tidak ada gulir mendatar di tingkat halaman pada lebar mana
pun.

---

## 13. Susunan berkas

```
ems/
├─ index.html
├─ vite.config.js
├─ wrangler.jsonc
├─ package.json
├─ CLAUDE.md
├─ LSFD RP.md                 sumber konten utama
├─ LSFD Field Handbook.md     sumber konten sekunder
├─ scripts/
│  └─ logo.mjs                lsfd.png → WebP (sharp)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css               token @theme + kelas dasar
   ├─ assets/
   │  ├─ fonts/               woff2 self-host
   │  └─ lsfd-*.webp
   ├─ data/
   │  ├─ procedures/          satu berkas per kategori
   │  ├─ groups.js
   │  ├─ anims.js
   │  ├─ commands.js
   │  ├─ codes.js
   │  └─ flow.js
   ├─ lib/
   │  ├─ procedures.js        muat, resolusi ref, indeks pencarian
   │  ├─ procedures.test.js
   │  ├─ copy.js              copyText, copySection
   │  ├─ copy.test.js
   │  ├─ search.js
   │  └─ search.test.js
   ├─ hooks.js                useHashRoute, useLocalStorage, useCopy
   └─ components/
      ├─ FlowBar.jsx
      ├─ Header.jsx
      ├─ Board.jsx
      ├─ SearchField.jsx
      ├─ Section.jsx
      ├─ StepRow.jsx
      └─ CodeTable.jsx
```

---

## 14. Teknologi dan deploy

Vite + React 19 + Tailwind CSS v4 lewat `@tailwindcss/vite`, tanpa `tailwind.config.js` — token
warna dan font didefinisikan dengan `@theme` di `src/index.css`. Oxlint untuk lint, Vitest untuk
tes. Node versi disematkan lewat `.node-version`.

Keluaran 100% statis. Tidak ada API, tidak ada server, tidak ada penyimpanan jarak jauh.

**Deploy:** Cloudflare Workers dengan static assets, pola yang sama seperti arms-calc.
`wrangler.jsonc` menunjuk `assets.directory: ./dist`, `not_found_handling:
single-page-application`, dan rute `custom_domain` untuk `ems.viend.my.id`. Repo disambungkan ke
**Cloudflare Workers Builds** sehingga tiap push ke `main` memicu build dan deploy di sisi
Cloudflare. Tidak ada GitHub Actions. `npm run deploy` tetap ada untuk deploy manual sesekali.

### Anggaran performa

- JS terkirim (gzip) di bawah 90 KB, termasuk React.
- CSS terkirim di bawah 15 KB.
- Dua berkas font, masing-masing di bawah 30 KB setelah subset ke latin.
- Logo WebP di bawah 20 KB.
- Setelah muat awal, berpindah kategori tidak meminta apa pun dari jaringan.

---

## 15. Pengujian

Vitest atas berkas murni di `src/lib/`, ditulis lebih dulu sesuai alur TDD:

- `procedures.test.js` — enam aturan integritas data di §7, ditambah pemeriksaan bahwa setiap
  rujukan benar-benar terselesaikan menjadi langkah utuh.
- `copy.test.js` — `copyText` menghasilkan awalan yang benar per `kind`, tidak pernah menyertakan
  nomor, dan `copySection` melewati baris `note`.
- `search.test.js` — pencocokan atas nomor, atas potongan teks tanpa memperhatikan huruf
  besar-kecil, dan atas nama bagian.

`smoke.test.jsx` merender seluruh halaman di jsdom untuk menangkap komponen yang crash dan
memastikan setiap kategori sampai ke papan. Selebihnya, pemeriksaan tampilan dilakukan dengan
melihat halaman langsung.

---

## 16. Aksesibilitas

- Kontras teks memenuhi WCAG AA atas latar gelapnya.
- Papan navigasi adalah daftar tombol dengan `aria-current` pada kategori aktif.
- Baris langkah adalah `<button>` sungguhan sehingga bisa dicapai dengan Tab dan ditekan dengan
  Enter/Spasi; fokus terlihat jelas dengan cincin kuning.
- Hasil penyalinan diumumkan lewat wilayah `aria-live` sopan.
- Warna tidak pernah menjadi satu-satunya penanda jenis baris — awalan `/me`, `/do`, `/r` selalu
  tertulis.
- `prefers-reduced-motion: reduce` menghentikan pergeseran pita alur.

---

## 17. Ruang tumbuh

Bentuk data sudah menampung penambahan tanpa mengubah kode: kategori baru cukup satu berkas baru di
`src/data/procedures/` yang didaftarkan di `groups.js`. Hal-hal yang mungkin menyusul — prosedur RP
lain, daftar anim yang lebih lengkap, koordinat lokasi — masuk lewat jalur yang sama.

Yang sengaja **tidak** disiapkan sekarang, agar tidak membangun yang belum tentu dipakai: profil
pemain untuk mengganti `~` dan nama karakter secara otomatis (sudah diputuskan teks disalin apa
adanya), mode wizard, dan penyuntingan konten dari dalam web.
