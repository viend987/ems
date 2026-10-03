# Dokumentasi Pembaruan: Template Laporan Baru & Perapihan Icon Toolbar BBCode Builder

**Tanggal:** 2026-10-03  
**Status:** Selesai & Teruji (`148 tests passed`, `lint clean`, `build 85.92 kB gzip`)

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
  - Tombol **Muat contoh** memuat narasi penanganan korban patah tulang di Legion Square oleh Tobrian Alrik.
  - Tab **Pratinjau** dan **Kode BBCode** dengan tombol **Salin BBCode**.

---

## 4. Template 2: Vehicle Maintenance Report

- **Rute:** `#/maintenance`
- **Kelompok:** `Laporan` › `Field Unit` (`subgroup: 'field'`)
- **Tujuan:** Laporan pertanggungjawaban mingguan keuangan rumah sakit untuk pemeliharaan armada Davis Fire Station.

### Fitur & Kalkulasi Otomatis:

- **Tabel 22 Unit Bawaan:**
  Diinisialisasi dengan 22 unit dinas LSFD:
  1. `RA-111` ($4, $0.9, $0)
  2. `RA-112` ($57, $20.7, $0)
  3. `RA-113` ($56, $36.53, $50)
  4. `RA-114` ($46, $42.23, $50)
  5. `RA-115` ($552, $75.83, $50)
  6. `Engine-111` ($42, $25.65, $50)
  7. `Engine-112` ($0, $0, $0)
  8. `Engine-113` ($0, $0, $0)
  9. `Engine-114` ($0, $0, $0)
  10. `Brush-111` ($175, $25.8, $50)
  11. `Brush-112` ($0, $0, $0)
  12. `Squad` ($0, $0, $0)
  13. `USAR-1` ($0, $0, $0)
  14. `OSAR-1` ($116, $9.53, $0)
  15. `Hazmat` ($124, $0, $0)
  16. `OC-111` ($77, $20.18, $0)
  17. `OC-112` ($0, $0, $0)
  18. `OC-113` ($0, $27.38, $0)
  19. `OC-114` ($0, $0, $0)
  20. `OC-115` ($0, $0, $0)
  21. `CORONER-2` ($137, $0, $0)
  22. `ETU` ($0, $0, $0)
- **Kalkulasi Real-Time:**
  Fungsi murni `calculateTotals(units)` menghitung penjumlahan `repair + refuel + additional` di seluruh baris secara otomatis, menghasilkan format uang standar ribuan (contoh data sampel menghasilkan persis `$1,920.73`).
- **Keluwesan Baris:**
  - Pengguna dapat menghapus baris tertentu dengan tombol `×`.
  - Pengguna dapat menambahkan unit baru dengan tombol `+ Tambah Unit`.
  - Terdapat tombol `Reset 22 Unit Bawaan` untuk mengembalikan susunan unit asli jika sewaktu-waktu dibutuhkan.
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
- **Tombol Cepat:**
  - Tombol **Gunakan Data Tobrian Alrik** untuk pengisian kilat data personel LSFD.
  - Tombol **Muat contoh** memuat data sampel Aurelia Ravenscroft.

---

## 6. Penyempurnaan Engine BBCode & Preview

1. **Tag `td1`:**
   - Ditambahkan ke `KNOWN` dan `BLOCK` pada `src/lib/bbcode.js`.
   - Di `BBCodePreview.jsx`, tag `td1` membaca nilai warna (contoh `[td1=Red]` atau `[td1=white]`), divalidasi dengan regex `SAFE_COLOR`, dan diaplikasikan sebagai `backgroundColor`.
2. **Variasi Warna `divbox`:**
   - Mendukung `divbox=maroon` (bar merah tua), `divbox=beige` (latar krem `#f8f5ee` bergaris `#d8d2be`), dan `divbox=black` (baris pembatas gelap).
3. **Judul `secspoiler`:**
   - Mendukung parameter judul (misal `[secspoiler=Photo evidence of activities.]`) yang ditampilkan di elemen `<summary>`.

---

## 7. Hasil Pengujian & Ukuran Bundle

- **Vitest Suite:** 16 berkas tes, 148 pengujian berhasil (100% pass).
- **Oxlint:** 0 warning, 0 error pada 86 berkas.
- **Ukuran Produksi:**
  - JS: 285.88 kB (85.92 kB gzip — aman di bawah batas anggaran 90 kB).
  - CSS: 26.85 kB (6.62 kB gzip).
  - Dependensi baru: **0** (sepenuhnya statis dan mandiri).
