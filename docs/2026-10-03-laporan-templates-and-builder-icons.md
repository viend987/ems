# Dokumentasi Pembaruan: Template Laporan Baru & Perapihan Icon Toolbar BBCode Builder

**Tanggal:** 2026-10-03  
**Status:** Selesai & Teruji (`156 tests passed`, `lint clean`, `build 88.94 kB gzip`)

---

## 1. Ringkasan Perubahan

Sesi ini menyelesaikan dua kelompok kebutuhan utama pengguna:

1. **Perapihan Ikon Toolbar BBCode Builder:**
   - Menghilangkan tombol hibrida (ikon + label teks mini yang membuat tombol melebar tidak beraturan seperti `img-resize (px)`, `altspoiler (alt)`, `block (pad)`, dan `list-plain (0)`).
   - Memastikan seluruh tombol toolbar memiliki ukuran seragam persis `size-8` (32×32px) dengan penempatan ikon terpusat.
   - Menggambar ulang dan memperbarui path SVG di `Icon.jsx` agar lebih presisi, tajam, dan proporsional (droplet tinta yang bersih pada `color`, tipografi clean pada `font`, tag `</>` sesungguhnya pada `code`, numbered list yang proporsional, serta bintang simetris pada `item`).
   - Menambahkan ikon dan tombol baru untuk `td1` (sel tabel dengan warna latar).

2. **Penambahan 3 Template BBCode Laporan:**
   - **Patient Care Report (PCR)** (`#/pcr`) di bawah sub-group `Field Unit`.
   - **Vehicle Maintenance Report** (`#/maintenance`) di bawah sub-group `Field Unit`, dilengkapi tabel biaya interaktif untuk 22 unit kendaraan dinas bawaan dan kalkulasi total otomatis (_Total salary proposed_).
   - **Request Criminal Record** (`#/criminal-record`) di bawah sub-group baru **`LSPD`**, formulir instansi luar yang mendukung pengisian data pribadi, upload link KTP & SIM, serta tanda tangan pemohon.

---

## 2. Perapihan Toolbar BBCode Builder

### Masalah Awal

Sebelumnya, beberapa tombol pada toolbar menggabungkan elemen `<Icon />` dan `<span>label</span>` di dalam satu tombol:

- `img-resize` menampilkan ikon gambar + teks `px`
- `altspoiler` menampilkan ikon mata + teks `alt`
- `block` menampilkan ikon kotak + teks `pad`
- `list-plain` menampilkan ikon list + angka `0`

Hal ini menyebabkan tombol tersebut memanjang secara horizontal (~44px) dibandingkan tombol lainnya (32px), membuat grid toolbar terlihat tidak rata dan tidak estetik (_"gak rapi"_).

### Solusi Desain

1. **Ikon Mandiri Eksklusif:**
   Dibuatkan ikon SVG mandiri 16×16 pada `src/components/Icon.jsx`:
   - `imgResize`: Bingkai gambar dengan indikator handle resize di sudut kanan-bawah.
   - `altspoiler`: Spoiler dengan bilah header judul di atasnya.
   - `block`: Kontainer dengan padding garis ganda di dalamnya.
   - `listPlain`: Garis daftar teks rapi tanpa peluru bullet.
   - `td1`: Grid tabel dengan sel kiri-atas yang terarsir/terisi.
   - `code`: Menampilkan simbol `</>` yang simetris dan jelas.
   - `color`: Bentuk tetesan tinta (_ink droplet_) yang mulus.
2. **Keseragaman Tombol:**
   Semua tombol toolbar menggunakan kelas Tailwind `flex size-8 items-center justify-center rounded-sm border border-line bg-ink text-dim transition-colors hover:border-alarm hover:text-bone`.
   Hanya tombol `B`, `I`, `U` yang tetap mempertahankan huruf tipografi tebal/miring/garis bawah sesuai konvensi global editor teks.

---

## 3. Template 1: Patient Care Report (PCR)

- **Rute:** `#/pcr`
- **Kelompok:** `Laporan` › `Field Unit` (`subgroup: 'field'`)
- **Tujuan:** Formulir penanganan medis darurat di lapangan oleh personel LSFD.

### Fitur Formulir:

- **Personal Details:**
  - Pemilihan personel dari `src/data/staff.js`.
  - Default Callsign Tobrian Alrik diperbarui menjadi `RA-105` (sebelumnya `RA-113`).
  - Kolom _Duty Partner_ dengan nilai default `N/A`.
- **Duty Information:**
  - Tanggal, jam, lokasi TKP.
  - Pilihan _Dispatch_ (`911 Request`, `Department Request`, `Other (...)` dengan input kustom).
- **Patient Information:**
  - _Triage (Opsional):_ Opsi `N/A`, `Black`, `Red`, `Yellow`, `Green`.
  - _Level of Consciousness (LoC):_ Pilihan baku `Alert`, `Verbal`, `Pain Stimuli`, `Unresponsive`.
  - _Breath & Pulse:_ Satuan default `20 LPM` dan `75 BPM`.
  - _Patient Condition:_ `GSW`, `Bone Fracture`, `Burn`, `Cut`, `Other (...)`.
  - _Summary of Action:_ Textarea narasi panjang yang mendukung tag warna BBCode (mis. `[color=#FFFFFF]`).
  - _Screenshots:_ Manajemen daftar URL gambar bukti dinamis dengan preview langsung dan tombol tambah/hapus.
- **Tindakan Cepat:**
  - Bilah aksi atas memuat tombol **Laporan baru** dan tautan langsung **Forum Pengajuan ↗** (tombol _Muat contoh_ ditiadakan di seluruh template agar alur kerja bersih dan cepat).
  - Tab **Pratinjau** dan **Kode BBCode** dengan tombol **Salin BBCode**.

---

## 4. Template 2: Vehicle Maintenance Report

- **Rute:** `#/maintenance`
- **Kelompok:** `Laporan` › `Field Unit` (`subgroup: 'field'`)
- **Tujuan:** Laporan pertanggungjawaban mingguan keuangan rumah sakit untuk pemeliharaan armada Davis Fire Station.

### Fitur & Kalkulasi Otomatis:

- **Tabel 22 Unit Bawaan:**
  Daftar kendaraan resmi Davis Fire Station (`RA-111` s/d `ETU`) diinisialisasi bersih dengan nominal kosong (`''`), tanpa data contoh/sampel hardcode yang mengotori memori atau form.
  Daftar unit: `RA-111`, `RA-112`, `RA-113`, `RA-114`, `RA-115`, `Engine-111`, `Engine-112`, `Engine-113`, `Engine-114`, `Brush-111`, `Brush-112`, `Squad`, `USAR-1`, `OSAR-1`, `Hazmat`, `OC-111`, `OC-112`, `OC-113`, `OC-114`, `OC-115`, `CORONER-2`, `ETU`.
- **UX Input Nominal "Salary Breakdown Units":**
  - **Placeholder `$0`:** Setiap input nominal (`Repair`, `Refuel`, `Add.`) memiliki prefix visual `$` permanen dan placeholder `0`.
  - **Pencegahan Bug `$050`:** Nilai nominal tidak lagi diinisialisasi dengan angka `0` mentah melainkan string kosong `''`. Pengguna yang mengetik angka (misal `50`) langsung menghasilkan nominal `50` bersih tanpa harus menghapus angka `0` terlebih dahulu.
  - **Evaluasi Aman:** Kolom yang dibiarkan kosong otomatis dievaluasi sebagai `$0` dalam BBCode dan bernilai `0` dalam perhitungan total, sehingga pengguna tidak diwajibkan mengisi angka `0` manual untuk unit yang tidak memiliki biaya.
- **Kalkulasi Real-Time:**
  Fungsi murni `calculateTotals(units)` menghitung penjumlahan `repair + refuel + additional` di seluruh baris secara otomatis dan menghasilkan format mata uang standar ribuan.
- **Keluwesan Baris:**
  - Pengguna dapat menghapus baris tertentu dengan tombol `×`.
  - Pengguna dapat menambahkan unit baru dengan tombol `+ Tambah Unit`.
  - Terdapat tombol `Reset 22 Unit Bawaan` untuk mengembalikan susunan unit asli dalam keadaan bersih siap isi.
- **Lampiran Gambar:**
  Dokumentasi foto kegiatan ditempatkan di dalam tag `[secspoiler=Photo evidence of activities.]` dengan jumlah link gambar fleksibel.

---

## 5. Template 3: Request Criminal Record (LSPD)

- **Rute:** `#/criminal-record`
- **Kelompok:** `Laporan` › `LSPD` (`subgroup: 'lspd'`)
- **Tujuan:** Formulir permohonan informasi catatan kriminal untuk instansi kepolisian Los Santos Police Department.

### Fitur Formulir:

- **Kontainer Khusus:**
  Menggunakan kerangka `[block=transparent,1,black,10,10,10]` dengan garis tepi hitam dan padding proporsional.
- **Data Pemohon:**
  - Nama Lengkap (_Full Name_).
  - Jenis Kelamin (_Sex:_ Male / Female).
  - Ras (_Race:_ Caucasian, African-American, Hispanic, Asian, Other).
  - Tanggal Lahir (_Date of Birth_), Alamat, Nomor Telepon.
- **Lampiran Bukti Kartu Identitas:**
  - KTP (_Identification Card_) di dalam `[altspoiler=Identification Card] [img]...[/img] [/altspoiler]`.
  - SIM (_Driver's License_) di dalam `[altspoiler=Drivers License] [img]...[/img] [/altspoiler]`.
  - Preview gambar langsung saat link diinputkan.
- **Tanda Tangan:**
  - Opsional gambar tanda tangan (`[img]url[/img]`) disertai nama pemohon, atau nama saja jika gambar tidak diisi.
- **Tombol Aksi Cepat:**
  - Tombol **Gunakan Data Tobrian Alrik** untuk pengisian kilat data personel LSFD.
  - Tombol "Muat contoh" dihapus atas permintaan pengguna agar tampilan form lebih bersih dan fokus.

---

## 6. Integrasi Tautan Forum Pengajuan (New Tab)

Setiap template laporan kini memiliki rujukan tombol langsung **"Forum Pengajuan ↗"** yang membuka tab baru (`target="_blank" rel="noreferrer noopener"`) ke subforum/topik pengajuan yang relevan:

1. **Patrol Log (`#/patrol`):**
   - Menghubungkan ke topik privat mingguan masing-masing anggota.
   - Disimpan di data staf (`src/data/staff.js`), misalnya untuk Tobrian Alrik: `https://fire.los-santos.net/viewtopic.php?t=1652`.
   - Tautan ditampilkan pada bilah atas formulir serta di dalam kotak profil _Personal Details_.
2. **Patient Care Report (`#/pcr`):**
   - Menghubungkan ke subforum umum PCR LSFD: `https://fire.los-santos.net/viewforum.php?f=129`.
3. **Vehicle Maintenance Report (`#/maintenance`):**
   - Menghubungkan ke subforum pemeliharaan kendaraan LSFD: `https://fire.los-santos.net/viewforum.php?f=270`.
4. **Request Criminal Record (`#/criminal-record`):**
   - Menghubungkan ke subforum permohonan catatan kriminal LSPD: `https://police.los-santos.net/viewforum.php?f=298`.
5. **Plastic Surgery (`#/plastic-surgery`):**
   - Menghubungkan ke subforum operasi plastik Pillbox: `https://fire.los-santos.net/viewforum.php?f=153`.

---

## 7. Template 4: Plastic Surgery (Hospital Unit)

- **Rute:** `#/plastic-surgery`
- **Kelompok:** `Laporan` › `Hospital Unit` (`subgroup: 'hospital'`)
- **Tujuan:** Formulir pengajuan operasi plastik di Pillbox Hill Medical Center.

### Fitur Formulir:

- **Data Pasien:**
  - Nama lengkap, jenis kelamin, ras, tanggal lahir (dengan format switcher DD/MM/YYYY dsb.), alamat, nomor telepon.
  - Tombol **Gunakan Data Tobrian Alrik** untuk pengisian kilat.
- **Informasi Medis:**
  - Diagnosis, rincian tindakan bedah, foto sebelum-sesudah dengan live preview.
- **BBCode Generator:**
  - Menggunakan tag `[divbox=beige]`, `[aligntable=...]`, `[td1=...]` yang sudah didukung di BBCode preview engine.
- **Daftar File:**
  - `src/data/surgery.js` — metadata kategori.
  - `src/lib/plastic-surgery.js` — generator BBCode, opsi form, blank state.
  - `src/lib/plastic-surgery.test.js` — 4 pengujian unit.
  - `src/components/PlasticSurgeryReport.jsx` — komponen interaktif lengkap.

---

## 8. Data Pribadi Staff & Utilitas Tanggal

### `src/data/staff.js` — Tobrian Alrik:
- `dob: '1999-09-19'`, `address: 'West Mirror Drive'`, `phone: '356-6302'`
- `bankAccount: '9282905341'`, `birthPlace: 'Stockholm, Sweden'`
- `gender: 'Male'`, `race: 'Caucasian'`

### `src/lib/dates.js` — Format Tanggal Fleksibel:
- `formatDatePattern(isoDate, pattern, locale)` — mendukung:
  - `DD/MM/YYYY`, `MM/DD/YYYY`, `DD MMM YYYY`, `DD MMMM YYYY`
  - Locale `id` (Indonesia) dan `en` (English).
- Dipakai di Criminal Record (DoB), Plastic Surgery (DoB), dan template lain.
- 3 unit test di `src/lib/dates.test.js`.

---

## 9. Warna Aksen Kategori Link Referensi

Setiap kategori di halaman **Link Referensi** (`#/links`) kini memiliki garis aksen warna berbeda pada header:

| Kategori | Properti `color` | Warna |
|---|---|---|
| General | `bg-slate-400` | Abu-abu |
| Davis Fire Station | `bg-alarm` | Merah |
| Pillbox Hospital | `bg-emerald-500` | Hijau |
| Los Santos Police Department | `bg-blue-600` | Biru |

Implementasi di `LinkList.jsx`:
```jsx
<span aria-hidden="true" className={`h-4 w-1 sm:h-5 ${group.color || 'bg-alarm'}`} />
```

---

## 10. Penyempurnaan Engine BBCode & Preview

1. **Tag `td1`:**
   - Ditambahkan ke `KNOWN` dan `BLOCK` pada `src/lib/bbcode.js`.
   - Di `BBCodePreview.jsx`, tag `td1` membaca nilai warna (contoh `[td1=Red]` atau `[td1=white]`), divalidasi dengan regex `SAFE_COLOR`, dan diaplikasikan sebagai `backgroundColor`.
2. **Variasi Warna `divbox`:**
   - Mendukung `divbox=maroon` (bar merah tua), `divbox=beige` (latar krem `#f8f5ee` bergaris `#d8d2be`), dan `divbox=black` (baris pembatas gelap).
3. **Judul `secspoiler`:**
   - Mendukung parameter judul (misal `[secspoiler=Photo evidence of activities.]`) yang ditampilkan di elemen `<summary>`.
4. **Tag Baru:**
   - `[list=none]` / `[list=0]` — list tanpa bullet/nomor.
   - `[aligntable=...]` — tabel alignment dengan margin.

---

## 11. Hasil Pengujian & Ukuran Bundle

- **Vitest Suite:** 18 berkas tes, 156 pengujian berhasil (100% pass).
- **Oxlint:** 0 warning, 0 error pada 92 berkas.
- **Ukuran Produksi:**
  - JS: 301.79 kB (88.94 kB gzip).
  - CSS: 27.52 kB (6.77 kB gzip).
  - Dependensi baru: **0** (sepenuhnya statis dan mandiri).

