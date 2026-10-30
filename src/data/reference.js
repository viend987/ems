// Referensi: anim, command mekanik, dan kamus kode.
// Bentuknya berbeda dari prosedur — ini tabel "kode + arti", bukan urutan langkah.

export const ANIMS = {
  id: 'anims',
  group: 'referensi',
  name: 'Stok Anim',
  nameEn: 'Animations',
  blurb: 'Animasi yang kepakai di sepanjang prosedur.',
  blurbEn: 'The animations used throughout the procedures.',
  tables: [
    {
      id: 'anim-medis',
      name: 'Medis',
      rows: [
        { code: '.medic2', desc: 'Membuka ILS Bag dan menyiapkan alat di samping korban.' },
        { code: '.medic', desc: 'Menangani korban di posisi berjongkok.' },
        { code: '.cpr', desc: 'Kompresi dada saat CPR.' },
      ],
    },
    {
      id: 'anim-teknis',
      name: 'Teknis & pemeriksaan',
      rows: [
        { code: '.inspect', desc: 'Memeriksa benda atau kendaraan di depan karakter.' },
        { code: '.mechanic', desc: 'Bekerja di bawah kap — dipakai juga saat reply NPC operasi.' },
        { code: '.mechanic3', desc: 'Varian animasi mekanik untuk adegan MVA.' },
      ],
    },
    {
      id: 'anim-sikap',
      name: 'Sikap & gestur',
      rows: [
        {
          code: '.atease2',
          desc: 'Kedua tangan dilipat ke belakang seperti posisi istirahat — karakter tetap bisa berjalan, bukan anim mematung.',
        },
        { code: '.namaste', desc: 'Gestur mengatupkan kedua telapak tangan — untuk berterima kasih atau memberi hormat.' },
        { code: '.salute', desc: 'Memberi hormat dengan tangan kanan.' },
      ],
    },
    {
      id: 'anim-prop',
      name: 'Prop',
      rows: [
        { code: '.propbls', desc: 'Membawa BLS Bag di tangan.' },
        { code: '.prop_tablet2', desc: 'Memegang tablet — dipakai saat mengurus bill di lobi.' },
        { code: '.prop_clipboard', desc: 'Memegang clipboard — dipakai saat mencatat waktu kematian.' },
      ],
    },
  ],
}

export const COMMANDS = {
  id: 'commands',
  group: 'referensi',
  name: 'Command Game',
  nameEn: 'Game Commands',
  blurb: 'Command mekanik server, bukan narasi RP.',
  blurbEn: 'Server commands, not RP narration.',
  tables: [
    {
      id: 'cmd-korban',
      name: 'Korban & gurney',
      rows: [
        { code: '/inspect [id]', desc: 'Memeriksa kondisi dan luka korban.' },
        {
          code: '/bls [id]',
          desc: 'Memperpanjang durasi injured korban supaya tidak jatuh ke kondisi critical. Pakai sedini mungkin — kalau korban sampai critical, petugas bisa disalahkan secara IC karena dianggap kelamaan menangani.',
        },
        { code: '/gurney get [1-4]', desc: 'Mengeluarkan gurney dari unit. Biasanya dipakai 3.' },
        { code: '/gurney load [id]', desc: 'Memuat korban yang sudah di gurney ke dalam unit.' },
        { code: '/gurney put', desc: 'Mengembalikan gurney ke unit.' },
        { code: '/dropbody', desc: 'Menurunkan tubuh korban dari gendongan.' },
        { code: '/bed [id]', desc: 'Menaruh korban ke ranjang rumah sakit.' },
      ],
    },
    {
      id: 'cmd-medis',
      name: 'Tindakan medis',
      rows: [
        {
          code: '/fo',
          desc: 'Memilih objek yang muncul sebagai visual di lapangan — tangga, cone, BLS bag, dan lainnya.',
        },
        { code: '/removebarrier', desc: 'Menghapus objek yang tadi dimunculkan lewat /fo.' },
        { code: '/ado [nama_object]', desc: 'Menempelkan keterangan objek di suatu tempat.' },
        { code: '/delado [id_object]', desc: 'Menghapus keterangan objek di suatu tempat.' },
        { code: '/stabilize [id]', desc: 'Menstabilkan pasien setelah operasi berhasil.' },
        { code: '/heal [id]', desc: 'Menyembuhkan pasien setelah notifikasi stabilize muncul.' },
        { code: '/medicreport [id]', desc: 'Mengirim laporan medis ke pasien.' },
        { code: '/hospitalbill search [nama pasien]', desc: 'Mencari tagihan rumah sakit pasien.' },
      ],
    },
    {
      id: 'cmd-chat',
      name: 'Chat & radio',
      rows: [
        {
          code: '/createunit [nama_unit]',
          desc: 'Membuat unit sebelum bertugas. Setelah dibuat, tanda ~ di radio otomatis jadi nama unitmu — kalau belum, radio hanya menampilkan ~ mentah.',
        },
        { code: '/joinunit [nama_unit]', desc: 'Bergabung ke unit yang sudah dibuat rekan lain.' },
        { code: '/me', desc: 'Aksi karakter. Output diawali nama karakter.' },
        { code: '/do', desc: 'Keadaan atau pertanyaan untuk lawan RP. Output tanpa nama.' },
        { code: '/s', desc: 'Berteriak.' },
        { code: '/r', desc: 'Radio internal LSFD.' },
        { code: '/ro', desc: 'OOC lewat radio LSFD.' },
        { code: '/d', desc: 'Radio antar departemen, termasuk ke ATC.' },
        { code: '/od', desc: 'OOC antar departemen.' },
        { code: '/wt', desc: 'Walkie-talkie — dipakai untuk Fireground Frequency 917 di lokasi kebakaran.' },
        { code: '/megaphone', desc: 'Pengeras suara unit.' },
        { code: '/ado', desc: 'Menempelkan keterangan objek di suatu tempat.' },
      ],
    },
  ],
}

export const CODES = {
  id: 'codes',
  group: 'referensi',
  name: 'Callsign',
  nameEn: 'Callsign',
  blurb: 'Arti 10-code, code, status, kategori, dan triage. Dari Field Academy Handbook.',
  blurbEn:
    'What the 10-codes, codes, statuses, categories and triage levels mean. From the Field Academy Handbook.',
  tables: [
    {
      id: 'ten-codes',
      name: '10-Code',
      rows: [
        { code: '10-1', desc: 'Semua unit berkumpul di lokasi.' },
        { code: '10-2', desc: 'Ada tembakan di lokasi.' },
        { code: '10-3', desc: 'Kosongkan radio, hentikan semua transmisi.' },
        { code: '10-4', desc: 'Diterima dan dimengerti.' },
        { code: '10-5', desc: 'Ulangi pesan terakhir.' },
        { code: '10-6', desc: 'Abaikan transmisi terakhir.' },
        { code: '10-14', desc: 'Butuh dijemput.' },
        { code: '10-20', desc: 'Lokasi.' },
        { code: '10-21', desc: 'Laporkan lokasi, call-sign, dan status.' },
        { code: '10-22', desc: 'Datang langsung ke lokasi.' },
        { code: '10-27', desc: 'Ganti unit.' },
        { code: '10-70', desc: 'Butuh bantuan atau unit tambahan — sebutkan darurat atau tidak.' },
        { code: '10-70A', desc: 'Butuh RA Unit tambahan.' },
        { code: '10-70E', desc: 'Butuh Engine/Truck tambahan — sebutkan unitnya.' },
        { code: '10-90', desc: 'Dalam keadaan terdesak, sebutkan lokasi bila sempat.' },
        { code: '10-97', desc: 'Sedang menuju lokasi.' },
        { code: '10-99', desc: 'Situasi selesai — sebutkan hasilnya.' },
      ],
    },
    {
      id: 'codes',
      name: 'Code',
      rows: [
        { code: 'Code 0', desc: 'Butuh bantuan mendesak — semua unit tinggalkan tugas dan datang.' },
        { code: 'Code 1', desc: 'Bukan darurat, respons santai.' },
        { code: 'Code 2', desc: 'Darurat — lampu menyala, tanpa sirene.' },
        { code: 'Code 3', desc: 'Darurat — lampu dan sirene menyala.' },
        { code: 'Code 4', desc: 'Situasi terkendali.' },
      ],
    },
    {
      id: 'status',
      name: 'Status',
      rows: [
        { code: 'Status 1', desc: 'Off duty.' },
        { code: 'Status 2', desc: 'On duty.' },
        { code: 'Status 3', desc: 'Sedang break.' },
        { code: 'Status 4', desc: 'Sedang patroli.' },
        { code: 'Status 5', desc: 'Merespons tanpa lampu dan sirene.' },
        { code: 'Status 5a', desc: 'Darurat — lampu menyala, tanpa sirene.' },
        { code: 'Status 5e', desc: 'Merespons dengan lampu dan sirene.' },
        { code: 'Status 6', desc: 'Sudah sampai di TKP.' },
        { code: 'Status 7', desc: 'Pasien dimuat, menuju rumah sakit dengan lampu tanpa sirene.' },
        { code: 'Status 7e', desc: 'Pasien dimuat, menuju rumah sakit dengan lampu dan sirene.' },
        { code: 'Status 8', desc: 'Tiba di rumah sakit bersama pasien.' },
        { code: 'Status 9', desc: 'Bertugas di rumah sakit.' },
        { code: 'Status 9e', desc: 'Sibuk di rumah sakit — pemeriksaan, operasi, dan sejenisnya.' },
        { code: 'Status 10', desc: 'Berada di stasiun.' },
      ],
    },
    {
      id: 'cat',
      name: 'CAT (kategori panggilan)',
      rows: [
        {
          code: 'CAT-A',
          desc: 'Serangan jantung, pendarahan berat, trauma, pingsan, insiden berat, kecelakaan lalu lintas berat, percobaan bunuh diri, gagal bernapas.',
        },
        { code: 'CAT-B', desc: 'Kecelakaan ringan, kesulitan bernapas, serangan asma.' },
        { code: 'CAT-C', desc: 'Patah tulang, demam, pusing, dan sejenisnya.' },
      ],
    },
    {
      id: 'triage',
      name: 'Triage (korban lebih dari tiga)',
      rows: [
        {
          code: 'Black — Deceased',
          desc: 'Tidak bernapas walau head-tilt chin-lift sudah dilakukan. Upaya dialihkan ke korban yang masih mungkin diselamatkan.',
        },
        {
          code: 'Red — Immediate',
          desc: 'Napas di bawah 12 atau di atas 20, nadi di bawah 60 atau di atas 100, baru bernapas setelah head-tilt, nadi radial nyaris hilang, atau korban kebingungan.',
        },
        { code: 'Yellow — Delayed', desc: 'Tidak masuk kategori merah atau hitam, tapi tidak bisa berjalan.' },
        { code: 'Green — Minor', desc: 'Masih bisa berjalan saat diminta.' },
      ],
    },
    {
      id: 'loc',
      name: 'LOC (tingkat kesadaran)',
      rows: [
        { code: 'A — Alert', desc: 'Merespons suara maupun sentuhan.' },
        { code: 'V — Verbal', desc: 'Hanya merespons rangsangan suara.' },
        { code: 'P — Pain Stimuli', desc: 'Hanya merespons rangsangan sentuhan, misalnya cubitan otot.' },
        { code: 'U — Unresponsive', desc: 'Tidak merespons apa pun — pingsan.' },
      ],
    },
    {
      id: 'tempat',
      name: 'Singkatan tempat & unit',
      rows: [
        { code: 'DFS', desc: 'Davis Fire Station — markas.' },
        { code: 'PBH', desc: 'Pillbox Hospital.' },
        { code: 'OCD', desc: 'Operational Control Dispatch.' },
        { code: 'RID', desc: 'Nomor titik lokasi yang dipakai dispatch.' },
        { code: 'ER', desc: 'Emergency Room.' },
        { code: 'RA Unit', desc: 'Penamaan unit ambulans.' },
        { code: 'Engine', desc: 'Penamaan unit lapangan — bukan Truck. Semua compartment alat MVA ada di sini.' },
        {
          code: 'RPLY',
          desc: 'Roleplay Lie — adegan yang hanya diceritakan lewat /do tanpa ada kegiatan yang benar-benar terlihat. Dipakai saat sesuatu tidak mungkin dijalankan mekaniknya, misalnya firefighter menarasikan operasi karena tidak ada dokter yang bertugas.',
        },
        { code: '~', desc: 'Nama unit di radio. Muncul otomatis setelah /createunit dijalankan.' },
      ],
    },
  ],
}

export const REFERENCE = [ANIMS, COMMANDS, CODES]
