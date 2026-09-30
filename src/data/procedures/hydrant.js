// Inspeksi Hydrant — dari [GUIDE] HYDRANT PILLAR INSPECTION.
//
// Panduan aslinya menyebut tiga masalah yang bisa muncul saat flow check (air
// keruh, sambungan bocor, selang bocor) tanpa menulis RP-nya, dan melompat dari
// melepas cap langsung ke membuka valve tanpa pernah menyambung selang ke
// hydrant. Bagian-bagian itu ditulis di sini dari praktik pemeliharaan nyata.

export default {
  id: 'hydrant',
  group: 'pemadam',
  name: 'Inspeksi Hydrant',
  nameEn: 'Hydrant Inspection',
  blurb: 'Pemeriksaan rutin hydrant pillar: cap, aliran air, pelumasan, dan cat.',
  blurbEn:
    'Routine pillar-hydrant checks: caps, water flow, lubrication, and paint.',
  sections: [
    {
      id: 'alat-engine',
      name: 'Siapkan alat — dari Fire Engine',
      steps: [
        {
          kind: 'note',
          text: 'Dicek saat patroli, pemeriksaan rutin, setelah dipakai di kejadian, atau ada laporan rusak. Cukup 1 Fire Engine dan 1–2 firefighter.',
        },
        { kind: 'me', text: 'berjalan menuju Fire Engine lalu membuka kompartemen peralatan.' },
        {
          kind: 'me',
          text: 'mengambil hydrant wrench, hydrant valve, hose, nozzle, dan lubricant dari dalam kompartemen.',
        },
      ],
    },
    {
      id: 'alat-box',
      name: 'Siapkan alat — dari Hydrant Box',
      steps: [
        {
          kind: 'note',
          text: 'Hydrant Box di lokasi cuma berisi selang dan nozzle. Kunci dan pelumas tetap dibawa sendiri di Hydrant Tool Kit.',
        },
        { kind: 'me', text: 'membuka pintu hydrant box lalu mengambil hose, nozzle, dan hydrant valve.' },
        {
          kind: 'me',
          text: 'menurunkan tas Hydrant Tool Kit dari bahunya, lalu mengambil hydrant wrench dan lubricant dari dalamnya.',
        },
      ],
    },
    {
      id: 'cap',
      name: 'Pemeriksaan cap pillar',
      steps: [
        {
          kind: 'me',
          text: 'memposisikan hydrant wrench pada cap pillar lalu memutarnya perlahan berlawanan arah jarum jam.',
        },
        { kind: 'me', text: 'melepas cap lalu mengangkatnya dari nozzle hydrant.' },
        { kind: 'do', text: 'Terlihat cap pillar berhasil terlepas dari nozzle hydrant.' },
        {
          kind: 'do',
          text: 'Apakah terdapat kerusakan pada struktur fisik cap pillar tersebut?',
          branches: [
            { label: 'Retak → siapkan cap baru', to: 'hydrant#cap-rusak' },
            { label: 'Bagus → cek aliran', to: 'hydrant#aliran' },
          ],
        },
      ],
    },
    {
      id: 'cap-rusak',
      name: 'Kalau cap rusak',
      steps: [
        {
          kind: 'note',
          text: 'Cap yang retak bisa pecah saat hydrant dibuka dengan tekanan penuh. Ganti, jangan dipasang lagi.',
        },
        {
          kind: 'me',
          text: 'mengambil cap pillar baru dari Hydrant Tool Kit lalu mencocokkan ukuran ulirnya dengan nozzle hydrant.',
        },
        {
          kind: 'me',
          text: 'menandai cap lama yang retak sebagai rusak lalu menyimpannya terpisah untuk dilaporkan.',
        },
      ],
    },
    {
      id: 'aliran',
      name: 'Cek aliran & katup',
      steps: [
        {
          kind: 'me',
          text: 'memasang hydrant valve pada outlet nozzle, lalu menyambungkan hose beserta nozzle-nya hingga terkunci rapat.',
        },
        {
          kind: 'me',
          text: 'memutar operating nut di puncak hydrant dengan hydrant wrench untuk membuka katup utama.',
        },
        {
          kind: 'me',
          text: 'mencengkeram tuas hydrant valve dengan kuat, lalu memutarnya perlahan ke arah open untuk mengalirkan air.',
        },
        {
          kind: 'do',
          text: 'Apakah aliran air yang keluar dari nozzle tampak stabil dan tidak ada kebocoran pada sambungan coupling?',
          branches: [
            { label: 'Normal → kuras selang', to: 'hydrant#kuras' },
            { label: 'Air keruh', to: 'hydrant#air-keruh' },
            { label: 'Sambungan bocor', to: 'hydrant#coupling-bocor' },
            { label: 'Selang bocor', to: 'hydrant#selang-bocor' },
          ],
        },
      ],
    },
    {
      id: 'air-keruh',
      name: 'Kalau air keruh',
      steps: [
        {
          kind: 'note',
          text: 'Karat dan endapan di pipa biasanya ikut keluar di awal. Biarkan mengalir sampai jernih sendiri.',
        },
        {
          kind: 'me',
          text: 'membiarkan air terus mengalir dengan bukaan penuh sambil memperhatikan warna air yang keluar.',
        },
        {
          kind: 'do',
          text: 'Apakah air mulai jernih setelah beberapa saat dialirkan?',
          branches: [{ label: 'Jernih → kuras selang', to: 'hydrant#kuras' }],
        },
        {
          kind: 'note',
          text: 'Kalau tetap keruh setelah lama dialirkan, catat nomor hydrant-nya untuk dilaporkan.',
        },
      ],
    },
    {
      id: 'coupling-bocor',
      name: 'Kalau sambungan (coupling) bocor',
      steps: [
        {
          kind: 'me',
          text: 'menutup hydrant valve untuk menghentikan aliran sebelum menyentuh sambungan.',
        },
        { kind: 'me', text: 'melepas coupling yang bocor lalu memeriksa gasket karet di dalamnya.' },
        { kind: 'do', text: 'Apakah gasket di dalam coupling terlihat rusak atau bergeser?' },
        {
          kind: 'me',
          text: 'memasang gasket baru dari Hydrant Tool Kit, lalu menyambung dan mengencangkan coupling kembali.',
        },
        { kind: 'me', text: 'membuka hydrant valve perlahan lalu memeriksa ulang sambungannya.' },
        {
          kind: 'do',
          text: 'Apakah sambungan coupling masih bocor?',
          branches: [{ label: 'Sudah rapat → kuras selang', to: 'hydrant#kuras' }],
        },
      ],
    },
    {
      id: 'selang-bocor',
      name: 'Kalau selang bocor (pinhole)',
      steps: [
        { kind: 'me', text: 'menutup hydrant valve lalu membuka nozzle untuk membuang sisa tekanan di selang.' },
        {
          kind: 'me',
          text: 'melepas bagian selang yang bocor lalu menggantinya dengan selang cadangan.',
        },
        {
          kind: 'me',
          text: 'memasang tag rusak pada selang yang bocor agar tidak terpakai lagi sebelum diperbaiki.',
        },
        {
          kind: 'me',
          text: 'membuka hydrant valve kembali lalu memeriksa aliran pada selang pengganti.',
        },
        {
          kind: 'do',
          text: 'Apakah aliran air sekarang stabil tanpa kebocoran?',
          branches: [{ label: 'Stabil → kuras selang', to: 'hydrant#kuras' }],
        },
      ],
    },
    {
      id: 'kuras',
      name: 'Kuras & pelumasan',
      steps: [
        {
          kind: 'me',
          text: 'menutup rapat hydrant valve menggunakan wrench untuk menghentikan aliran utama.',
        },
        {
          kind: 'me',
          text: 'memutar operating nut searah jarum jam sampai katup utama hydrant tertutup rapat.',
        },
        {
          kind: 'me',
          text: 'membuka nozzle ke posisi full open untuk membuang sisa tekanan dan air yang terperangkap di dalam selang.',
        },
        {
          kind: 'me',
          text: 'mengangkat salah satu ujung selang setinggi bahu, lalu berjalan perlahan ke ujung lainnya untuk mendorong sisa air keluar.',
        },
        { kind: 'do', text: 'Sisa air di dalam selang telah terkuras habis.' },
        {
          kind: 'me',
          text: 'meneteskan lubricant pada poros valve dan ulir nozzle hydrant agar tidak mudah berkarat.',
        },
        {
          kind: 'me',
          text: 'menyeka sisa air pada permukaan pillar dengan kain lap sampai kering.',
        },
        { kind: 'me', text: 'menggulung selang dengan teknik donat lalu merapikannya kembali.' },
      ],
    },
    {
      id: 'cat',
      name: 'Pemeriksaan & pengecatan body',
      steps: [
        { kind: 'me', text: 'mengamati kondisi lapisan cat pada seluruh permukaan hydrant pillar.' },
        {
          kind: 'do',
          text: 'Bagaimana kondisi lapisan cat pada body hydrant pillar tersebut? (masih bagus / pudar dan mengelupas)',
          branches: [{ label: 'Masih bagus → rapikan alat', to: 'hydrant#penutup' }],
        },
        {
          kind: 'note',
          text: 'Yang dicat ulang hanya body-nya dengan chrome yellow. Bonnet dan cap jangan ikut dicat kuning — warnanya menandai debit air: biru ≥1500 GPM, hijau 1000–1499, oranye 500–999, merah di bawah 500.',
        },
        {
          kind: 'me',
          text: 'menyiapkan kaleng cat chrome yellow dan sebuah kuas, lalu mulai mengecat body pillar.',
        },
        {
          kind: 'me',
          text: 'mengecat dengan sapuan merata sampai seluruh bagian yang mengelupas tertutup sempurna.',
        },
        { kind: 'do', text: '15 menit kemudian, lapisan cat terlihat telah mengering.' },
      ],
    },
    {
      id: 'penutup',
      name: 'Pasang cap & rapikan alat',
      steps: [
        {
          kind: 'me',
          text: 'memasang kembali cap pillar pada tempatnya lalu mengencangkannya dengan hydrant wrench.',
        },
        {
          kind: 'note',
          text: 'Cap wajib kencang — cap yang longgar bisa bocor atau dibuka orang iseng.',
        },
        {
          kind: 'me',
          label: 'Hydrant Box',
          text: 'merapikan peralatan kembali ke dalam hydrant box lalu memastikan pintunya terkunci rapat.',
        },
        {
          kind: 'me',
          label: 'Fire Engine',
          text: 'membuka kompartemen Fire Engine lalu merapikan peralatan kembali ke dalamnya.',
        },
        {
          kind: 'me',
          label: 'Hydrant Tool Kit',
          text: 'memasukkan peralatan kembali ke Hydrant Tool Kit, menutupnya, lalu membawanya kembali ke unit.',
        },
      ],
    },
  ],
}
