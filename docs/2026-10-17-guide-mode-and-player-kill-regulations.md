# Dokumentasi Pembaruan: Mode Switcher (Operasional vs Buku Panduan) & Guide Ketentuan Player Kill (PK)

**Tanggal:** 2026-10-17  
**Status:** Selesai & Teruji (`20 test suites, 177 tests passed`, `lint clean (0 error, 0 warning)`, `build production clean`)

---

## 1. Ringkasan Fitur

Pembaruan ini menambahkan sistem **Mode Switcher** untuk mengubah mode situs antara kebutuhan operasional lapangan dan kebutuhan panduan/doktrin teoritis, serta meluncurkan modul panduan pertama: **Guide Ketentuan Player Kill (PK)**.

1. **Mode Switcher (⚡ Operasional vs 📖 Buku Panduan)**:
   - Terintegrasi di `Header.jsx` dengan antarmuka dual segmented control yang taktil dan responsif.
   - Mengingat halaman terakhir yang dibuka pada masing-masing mode (`localStorage: lsfd:last-ops`, `lsfd:last-guide`).
   - Sinkronisasi penuh dengan URL hash:
     - `#/field` (atau rute prosedur/laporan lainnya) otomatis mengaktifkan Mode Operasional.
     - `#/guide-pk` otomatis membuka Mode Buku Panduan.
   - Menjaga kebersihan navigasi tanpa merusak histori peramban (tombol back/forward tetap bekerja presisi).

2. **Tampilan Khusus Mode Buku Panduan**:
   - Memiliki nuansa desain editorial/doktrin taktis militer/medis yang tetap selaras dengan identitas LSFD (warna `--color-alarm`, tipografi Saira Condensed dan IBM Plex Mono, dukungan penuh tema gelap/terang).
   - Sidebar navigasi `GuideBoard.jsx` yang memuat daftar panduan, perkiraan waktu baca, daftar isi dengan navigasi loncat cepat (*anchor links*), daftar panduan mendatang (*upcoming*), dan tautan kembali cepat ke mode operasional.

---

## 2. Modul Panduan: Ketentuan & Kalkulasi Player Kill (PK) (`#/guide-pk`)

Sintesis lengkap dari dua sumber rujukan resmi:
- **Server Rules Jogjagamers V Roleplay** (Bab I: Istilah, Pasal 4 Kewajiban RP, Pasal 5 Penolakan RP, Pasal 8 RP Kriminal, Pasal 11 CK & NLR, Pasal 21 Deathmatch, Pasal 23 Powergaming & Revenge Kill).
- **LSFD Operational Guide #1239: Calculation to get Player Kill** (Penulis: Cavero Aliester & Caitlin Swenchjaeger).

### Fitur Utama:

### A. Kalkulator & Simulator Interaktif PK (`src/lib/pk-calculator.js`)
Pemain atau petugas medis dapat memilih kondisi korban secara interaktif:
1. **Jenis Luka**:
   - `Gunshot Wound (GSW)`: Pilihan lokasi (Kepala, Torso, Ekstremitas) dan jumlah peluru (slider 1x s/d 10x).
   - `Non-GSW`: Graze, Bone Fracture, Dislocated, Cut Wound, Burns, Bruise.
2. **Survival Chance di `/health`**:
   - Slider interaktif 0% — 100% dengan tombol cepat 75%, 60%, 50%, 45%, 20%.
3. **Kondisi Khusus**:
   - Bleeding > 15 menit tanpa penanganan RP.
   - Status kedatangan petugas LSFD / responder di TKP.
   - Ledakan murni tanpa peluru.
4. **Hasil Diagnosa Real-time**:
   - 🔴 **AUTO PK**: Luka vital dengan Survival Chance < 50% (fitur `/chance` tidak perlu digunakan, korban otomatis PK).
   - 🟡 **DAPAT PK DENGAN /CHANCE**:
     - Luka vital dengan Survival Chance &ge; 50% &rarr; `/chance 50`.
     - Fleshwound dengan Survival Chance &le; 50% &rarr; `/chance [survival%]`.
     - Dilengkapi tombol 1-klik untuk menyalin perintah `/chance`.
   - 🟢 **TIDAK DAPAT PK**:
     - Fleshwound dengan Survival Chance > 50%.
     - Luka ekstremitas (tangan/kaki &rarr; tidak mengenai organ vital, risiko amputasi).
     - Seluruh luka non-tembakan (Graze, Fraktur, Dislokasi, Tusuk, Bakar, Memar &rarr; `/chance` DILARANG KERAS).
5. **Simulator Roll `/chance` Langsung**:
   - Tombol **Roll /chance (1x)** untuk menguji hasil lemparan acak probabilitas fair 50:50.
   - Menampilkan hasil langsung: `PASS` (Selamat, dilarang Force RP PK) atau `FAIL` (Gugur / PK, wajib New Life Rule).

### B. Matriks Kriteria PK Resmi LSFD (PK Criteria Matrix)
Tabel tabulasi lengkap standarisasi luka vital, ambang batas peluru (Kepala: min. 1 GSW; Torso: min. 3 GSW), kriteria survival chance, dan tindakan wajib.

### C. Konsep Perbedaan Status Kematian
Perbandingan visual komprehensif:
- `Brutally Wounded (Down)`: Waktu cedera 15 menit sebelum critical. Fitur `/bls` untuk memperpanjang waktu. Larangan menerima kematian untuk menghindari lawan RP (Pasal 5 Ayat 2d).
- `Player Kill (PK)`: Kematian satu alur RP, karakter tetap bisa dimainkan namun wajib lupa ingatan alur dan orang yang terlibat.
- `New Life Rule (NLR)`: Larangan kembali ke lokasi kematian dan larangan keras Revenge Kill (Pasal 23: Powergaming).
- `Character Kill (CK)`: Kematian permanen yang memerlukan persetujuan OOC atau takedown resmi faksi FnG / perintah Staff. Wajib Change Name (CN).

### D. Rantai Alur Skema Life Support LSFD
Urutan baku: `DANGER` &rarr; `RESPONSE` &rarr; `DIAGNOSIS` &rarr; `TITIK EVALUASI /CHANCE` &rarr; `D.E.A.T` &rarr; `A.B.C` &rarr; `EXTRACTION` &rarr; `TRANSPORT`.
- Protokol Obat Pacu Jantung: Nadi 0-10 BPM berikan **Epinephrine**; Nadi > 10 BPM berikan **Atropine**. Dilarang keras mencampur atau memberi kedua obat sekaligus.

### E. Wewenang Faksi & Ketentuan Khusus
- **LSFD**: Pemegang wewenang resmi mengeksekusi `/chance`. Wajib izin OOC terlebih dahulu (`/pm` atau `/b`).
- **LSPD / LSSD**: Boleh NPC mode HANYA jika tidak ada LSFD online dan bukan luka brutal pada organ vital.
- **FnG**: Berhak roleplay PK jika di-roleplay-kan lawannya.
- **Warga Sipil / Non-Faction**: Dilarang keras menggunakan command `/chance` dan tidak berhak memaksakan PK.
- **Batalnya Aturan 15 Menit Bleeding**: Begitu petugas medis tiba di TKP sebelum 15 menit, batas waktu 15 menit otomatis gugur.
- **Larangan RPLY Penyakit Bawaan Mendadak**: Mengarang riwayat penyakit bawaan tanpa bukti RP konsisten sebelumnya dengan dokter LSFD adalah tindakan ilegal/invalid.

---

## 3. Hasil Pengujian & Kualitas Kode

- **Vitest**: 20 berkas tes, 177 pengujian berhasil lulus (100% pass).
- **Oxlint**: 0 warning, 0 error pada 98 berkas.
- **Vite Build**: Produksi bersih (1.51 detik).
