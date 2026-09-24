// MVA & Kebakaran — dari "RP MVA" di LSFD RP.md

export default {
  id: 'mva',
  group: 'khusus',
  name: 'MVA & Kebakaran',
  blurb: 'Kecelakaan kendaraan: padamkan api, lalu matikan mesin sebelum mengeluarkan korban.',
  sections: [
    {
      id: 'vehicle-identify',
      name: 'Vehicle Identify',
      steps: [
        { kind: 'note', text: 'Dipakai kalau korban berada di dalam mobil. Kalau tidak, RP sendiri sesuai situasi.' },
        { kind: 'note', text: 'Referensi anim: .inspect · .mechanic · .mechanic3' },
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
      id: 'kill-engine',
      name: 'Mematikan mesin',
      steps: [
        {
          n: 263,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier dari Compartement Truck lalu membawanya ke arah mobil korban.',
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
          text: 'mengambil Halligan Bar dan Plier, membawanya ke arah Truck dan menaruhnya di Compartement Truck kembali.',
        },
        {
          kind: 'note',
          text: 'Mesin sudah mati — lanjut ke penanganan korban.',
          branches: [{ label: 'Penanganan Korban', to: 'field#default' }],
        },
      ],
    },
  ],
}
