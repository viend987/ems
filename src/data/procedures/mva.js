// MVA & Kebakaran — chat RP dari "RP MVA" dan panduan Motor Vehicle Accident
// di draft.md. Hanya baris yang benar-benar diketik ke game yang masuk sini;
// penjelasan peran, daftar peralatan, dan kelas pemadam ada di dokumen aslinya.

export default {
  id: 'mva',
  group: 'pemadam',
  name: 'MVA & Mobil Terbakar',
  blurb: 'Kecelakaan kendaraan: padamkan api, stabilkan mobil, matikan mesin, keluarkan korban.',
  sections: [
    {
      id: 'vehicle-identify',
      name: 'Identifikasi kendaraan',
      steps: [
        { kind: 'note', text: 'Dipakai kalau korban berada di dalam mobil. Anim: .inspect · .mechanic · .mechanic3' },
        { n: 256, kind: 'me', text: 'mengidentifikasi kendaraan di depannya.' },
        { n: 257, kind: 'do', text: 'Apakah ada kebocoran oli atau bensin?' },
        {
          n: 258,
          kind: 'me',
          text: 'mengambil Crosslay Line dari Compartement Engine, lalu memutar katub ke mode Foam Class B.',
        },
        { n: 259, kind: 'do', text: 'Dimana sumber api?' },
        {
          n: 260,
          kind: 'me',
          text: 'mengarahkan Nozzle ke kap kendaraan yang mengeluarkan api, menyemprotkan air ke kap kendaraan tersebut.',
        },
        { n: 261, kind: 'do', text: 'Terlihat api telah padam setelah disemprotkan air.' },
        {
          n: 262,
          kind: 'me',
          text: 'membawa Crosslay Line kembali ke arah Engine lalu menaruhnya di Compartement Engine.',
        },
      ],
    },
    {
      id: 'stabilisasi',
      name: 'Stabilisasi kendaraan (unit Engine)',
      steps: [
        { kind: 'me', text: 'berjalan menuju ke arah mobil korban lalu melihat sekelilingnya.' },
        { kind: 'do', text: 'Apakah posisi mobil dalam keadaan miring?' },
        {
          kind: 'me',
          text: 'kembali ke arah Engine, mengambil Stabilization Rods dari Compartement Engine lalu membawanya ke arah mobil korban.',
        },
        { kind: 'me', text: 'memasangkan Stabilization Rods di kedua sisi mobil dengan perlahan.' },
        { kind: 'do', text: 'Terlihat mobil sudah tidak miring lagi setelah dipasangkan Stabilization Rods.' },
      ],
    },
    {
      id: 'kaca',
      name: 'Pecahkan kaca (Glass-Master)',
      steps: [
        {
          kind: 'me',
          text: 'mencoba membuka pintu di samping korban.',
        },
        { kind: 'do', text: 'Apakah pintu terkunci atau tidak?' },
        {
          kind: 'me',
          text: 'mengambil Glass-Master dari Engine lalu memecahkan kaca jendela samping korban secara terarah.',
        },
        {
          kind: 'me',
          text: 'membersihkan serpihan kaca pada tepi jendela menggunakan cutter agar aman.',
        },
        { kind: 'do', text: 'Jendela telah terbuka dan tepi kaca sudah bersih dari serpihan.' },
      ],
    },
    {
      id: 'kill-engine',
      name: 'Mematikan mesin',
      steps: [
        {
          n: 263,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier dari Compartement Engine lalu membawanya ke arah mobil korban.',
        },
        { n: 264, kind: 'me', text: 'membuka Kap mobil dengan menggunakan Halligan bar.' },
        { n: 265, kind: 'do', text: 'terlihat kap mobil mulai terbuka.' },
        { n: 266, kind: 'me', text: 'memotong Power Supply dari aki menggunakan Plier.' },
        {
          n: 267,
          kind: 'do',
          text: 'Mesin mobil akan mati setelah Power Supply dan aki dipotong menggunakan Plier.',
        },
        {
          n: 268,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier, membawanya ke arah Engine dan menaruhnya di Compartement Engine kembali.',
        },
      ],
    },
    {
      id: 'jol',
      name: 'Potong pintu (Jaws of Life)',
      steps: [
        {
          kind: 'me',
          text: 'mengambil Jaws of Life dari Engine lalu memasang mode Spreader untuk melebarkan celah engsel pintu.',
        },
        {
          kind: 'do',
          text: 'Engsel pintu mobil mulai terbuka dan merenggang.',
        },
        {
          kind: 'me',
          text: 'mengganti mode JoL ke Cutter lalu memotong engsel pintu mobil di samping korban.',
        },
        {
          kind: 'me',
          text: 'memindahkan pintu mobil yang terpotong ke area aman bersama rekan.',
        },
        { kind: 'command', text: '/ado Pintu mobil yang terpotong', note: 'di tempat pintu ditaruh' },
      ],
    },
    {
      id: 'dashboard',
      name: 'Dashboard & seatbelt (Hydraulic Rams)',
      steps: [
        {
          kind: 'me',
          text: 'mengambil Hydraulic Rams dan Cutter dari Compartement Engine lalu membawanya ke arah mobil korban.',
        },
        { kind: 'me', text: 'memeriksa kondisi kaki korban.' },
        { kind: 'do', text: 'Apakah kaki korban tersangkut di Dashboard?' },
        { kind: 'do', text: 'Apakah tubuh korban tersangkut oleh Seatbelt?' },
        {
          kind: 'me',
          text: 'meletakkan Hydraulic Rams ke sela-sela kaki korban lalu menekan tombol "ON".',
        },
        { kind: 'do', text: 'Hydraulic Rams akan melebarkan Dashboard mobil.' },
        { kind: 'me', text: 'mengambil Cutter lalu memotong Seatbelt secara perlahan.' },
        { kind: 'do', text: 'Seatbelt berhasil dipotong.' },
      ],
    },
    {
      id: 'ked',
      name: 'C-Collar & KED sebelum diangkat',
      steps: [
        {
          kind: 'note',
          text: 'Lakukan BLS dulu pada korban, baru pasang C-Collar dan KED — MVA sering menyisakan cedera leher atau tulang belakang.',
          branches: [{ label: 'Penanganan korban', to: 'field#danger' }],
        },
        { kind: 'me', text: 'mengambil C-Collar dan KED dari Compartement Engine.' },
        { kind: 'me', text: 'memasangkan C-Collar ke leher korban secara perlahan.' },
        { kind: 'me', text: 'memasangkan KED ke punggung korban secara perlahan.' },
        { kind: 'do', text: 'C-Collar dan KED sudah terpasangkan.' },
        {
          kind: 'note',
          text: 'Setelah terpasang, ambil gurney dan bawa korban ke rumah sakit.',
          branches: [{ label: 'Muat korban', to: 'load#load' }],
        },
      ],
    },
  ],
}
