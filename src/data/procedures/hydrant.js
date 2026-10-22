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
      nameEn: 'Gather the tools — from the Fire Engine',
      steps: [
        {
          kind: 'note',
          text: 'Dicek saat patroli, pemeriksaan rutin, setelah dipakai di kejadian, atau ada laporan rusak. Cukup 1 Fire Engine dan 1–2 firefighter.',
          en: 'Checked on patrol, at a routine inspection, after use at an incident, or when a fault is reported. One Fire Engine and one or two firefighters is enough.',
        },
        { kind: 'me', text: 'berjalan menuju Fire Engine lalu membuka kompartemen peralatan.', en: 'walks to the Fire Engine and opens the equipment compartment.' },
        {
          kind: 'me',
          text: 'mengambil hydrant wrench, hydrant valve, hose, nozzle, dan lubricant dari dalam kompartemen.',
          en: 'takes the hydrant wrench, hydrant valve, hose, nozzle and lubricant out of the compartment.',
        },
      ],
    },
    {
      id: 'alat-box',
      name: 'Siapkan alat — dari Hydrant Box',
      nameEn: 'Gather the tools — from the Hydrant Box',
      steps: [
        {
          kind: 'note',
          text: 'Hydrant Box di lokasi cuma berisi selang dan nozzle. Kunci dan pelumas tetap dibawa sendiri di Hydrant Tool Kit.',
          en: 'The Hydrant Box on site holds only hose and a nozzle. The wrench and lubricant come with you, in the Hydrant Tool Kit.',
        },
        { kind: 'me', text: 'membuka pintu hydrant box lalu mengambil hose, nozzle, dan hydrant valve.', en: 'opens the hydrant box and takes out the hose, nozzle and hydrant valve.' },
        {
          kind: 'me',
          text: 'menurunkan tas Hydrant Tool Kit dari bahunya, lalu mengambil hydrant wrench dan lubricant dari dalamnya.',
          en: 'lifts the Hydrant Tool Kit off their shoulder and takes out the hydrant wrench and lubricant.',
        },
      ],
    },
    {
      id: 'cap',
      name: 'Pemeriksaan cap pillar',
      nameEn: 'Checking the pillar cap',
      steps: [
        {
          kind: 'note',
          text: 'Operating nut di puncak hydrant dan cap berulir memiliki bentuk baut segi lima (pentagonal), sehingga wajib dibuka menggunakan hydrant wrench khusus.',
          en: 'The operating nut on top and the threaded caps are pentagonal, requiring the dedicated hydrant wrench.',
        },
        {
          kind: 'me',
          text: 'memposisikan hydrant wrench pada cap pillar lalu memutarnya perlahan berlawanan arah jarum jam.',
          en: 'sets the hydrant wrench on the pillar cap and turns it slowly anticlockwise.',
        },
        { kind: 'me', text: 'melepas cap lalu mengangkatnya dari nozzle hydrant.', en: 'frees the cap and lifts it off the hydrant nozzle.' },
        { kind: 'do', text: 'Terlihat cap pillar berhasil terlepas dari nozzle hydrant.', en: 'The pillar cap comes away from the hydrant nozzle.' },
        {
          kind: 'do',
          text: 'Apakah terdapat kerusakan pada struktur fisik cap pillar tersebut?',
          en: 'Is there any physical damage to the pillar cap?',
          branches: [
            { label: 'Retak → siapkan cap baru', labelEn: 'Cracked → fit a new cap', to: 'hydrant#cap-rusak' },
            { label: 'Bagus → cek aliran', labelEn: 'Good → check the flow', to: 'hydrant#aliran' },
          ],
        },
      ],
    },
    {
      id: 'cap-rusak',
      name: 'Kalau cap rusak',
      nameEn: 'If the cap is damaged',
      steps: [
        {
          kind: 'note',
          text: 'Cap yang retak bisa pecah saat hydrant dibuka dengan tekanan penuh. Ganti, jangan dipasang lagi.',
          en: 'A cracked cap can burst when the hydrant is opened at full pressure. Replace it; do not put it back on.',
        },
        {
          kind: 'me',
          text: 'mengambil cap pillar baru dari Hydrant Tool Kit lalu mencocokkan ukuran ulirnya dengan nozzle hydrant.',
          en: 'takes a new pillar cap from the Hydrant Tool Kit and matches its thread to the hydrant nozzle.',
        },
        {
          kind: 'me',
          text: 'menandai cap lama yang retak sebagai rusak lalu menyimpannya terpisah untuk dilaporkan.',
          en: 'marks the cracked cap as faulty and sets it aside separately to be reported.',
        },
      ],
    },
    {
      id: 'aliran',
      name: 'Cek aliran & katup',
      nameEn: 'Checking flow and valve',
      steps: [
        {
          kind: 'note',
          text: 'Standar NFPA 291 — Kode Warna Bonnet/Cap (Indikator Debit): Biru (≥1500 GPM - Sangat Tinggi), Hijau (1000–1499 GPM - Tinggi), Oranye (500–999 GPM - Sedang), Merah (<500 GPM - Rendah).',
          en: 'NFPA 291 Standard — Bonnet/Cap Color Code (Flow Indicator): Blue (≥1500 GPM - Very High), Green (1000–1499 GPM - High), Orange (500–999 GPM - Moderate), Red (<500 GPM - Low).',
        },
        {
          kind: 'me',
          text: 'memasang hydrant valve pada outlet nozzle, lalu menyambungkan hose beserta nozzle-nya hingga terkunci rapat.',
          en: 'fits the hydrant valve to the nozzle outlet, then couples the hose and its nozzle until they lock tight.',
        },
        {
          kind: 'me',
          text: 'memutar operating nut di puncak hydrant dengan hydrant wrench untuk membuka katup utama.',
          en: 'turns the operating nut on top of the hydrant with the wrench to open the main valve.',
        },
        {
          kind: 'me',
          text: 'mencengkeram tuas hydrant valve dengan kuat, lalu memutarnya perlahan ke arah open untuk mengalirkan air.',
          en: 'grips the hydrant valve lever firmly and turns it slowly towards open to let the water through.',
        },
        {
          kind: 'do',
          text: 'Apakah aliran air yang keluar dari nozzle tampak stabil dan tidak ada kebocoran pada sambungan coupling?',
          en: 'Is the flow from the nozzle steady, with no leaks at the coupling?',
          branches: [
            { label: 'Normal → kuras selang', labelEn: 'Normal → drain the hose', to: 'hydrant#kuras' },
            { label: 'Air keruh', labelEn: 'Water is dirty', to: 'hydrant#air-keruh' },
            { label: 'Sambungan bocor', labelEn: 'Coupling leaks', to: 'hydrant#coupling-bocor' },
            { label: 'Selang bocor', labelEn: 'Hose leaks', to: 'hydrant#selang-bocor' },
          ],
        },
      ],
    },
    {
      id: 'air-keruh',
      name: 'Kalau air keruh',
      nameEn: 'If the water runs dirty',
      steps: [
        {
          kind: 'note',
          text: 'Karat dan endapan di pipa biasanya ikut keluar di awal. Biarkan mengalir sampai jernih sendiri.',
          en: 'Rust and sediment in the pipe usually come out at the start. Let it run until it clears on its own.',
        },
        {
          kind: 'me',
          text: 'membiarkan air terus mengalir dengan bukaan penuh sambil memperhatikan warna air yang keluar.',
          en: 'lets the water keep running at full flow, watching the colour of it.',
        },
        {
          kind: 'do',
          text: 'Apakah air mulai jernih setelah beberapa saat dialirkan?',
          en: 'Is the water clearing after running for a while?',
          branches: [{ label: 'Jernih → kuras selang', labelEn: 'Clear → drain the hose', to: 'hydrant#kuras' }],
        },
        {
          kind: 'note',
          text: 'Kalau tetap keruh setelah lama dialirkan, catat nomor hydrant-nya untuk dilaporkan.',
          en: 'If it is still dirty after a long run, note the hydrant number so it can be reported.',
        },
      ],
    },
    {
      id: 'coupling-bocor',
      name: 'Kalau sambungan (coupling) bocor',
      nameEn: 'If the coupling leaks',
      steps: [
        {
          kind: 'me',
          text: 'menutup hydrant valve untuk menghentikan aliran sebelum menyentuh sambungan.',
          en: 'closes the hydrant valve to stop the flow before touching the coupling.',
        },
        { kind: 'me', text: 'melepas coupling yang bocor lalu memeriksa gasket karet di dalamnya.', en: 'uncouples the leaking joint and inspects the rubber gasket inside.' },
        { kind: 'do', text: 'Apakah gasket di dalam coupling terlihat rusak atau bergeser?', en: 'Does the gasket inside the coupling look damaged or displaced?' },
        {
          kind: 'me',
          text: 'memasang gasket baru dari Hydrant Tool Kit, lalu menyambung dan mengencangkan coupling kembali.',
          en: 'fits a new gasket from the Hydrant Tool Kit, then reconnects and tightens the coupling.',
        },
        { kind: 'me', text: 'membuka hydrant valve perlahan lalu memeriksa ulang sambungannya.', en: 'opens the hydrant valve slowly and checks the joint again.' },
        {
          kind: 'do',
          text: 'Apakah sambungan coupling masih bocor?',
          en: 'Is the coupling still leaking?',
          branches: [{ label: 'Sudah rapat → kuras selang', labelEn: 'Sealed → drain the hose', to: 'hydrant#kuras' }],
        },
      ],
    },
    {
      id: 'selang-bocor',
      name: 'Kalau selang bocor (pinhole)',
      nameEn: 'If the hose leaks (pinhole)',
      steps: [
        { kind: 'me', text: 'menutup hydrant valve lalu membuka nozzle untuk membuang sisa tekanan di selang.', en: 'closes the hydrant valve and opens the nozzle to bleed the remaining pressure from the hose.' },
        {
          kind: 'me',
          text: 'menempelkan isolasi penanda pada area selang yang bocor (pinhole) agar ditarik dari operasional.',
          en: 'applies marking tape over the punctured hose area so it is pulled from operational service.',
        },
        {
          kind: 'me',
          text: 'melepas bagian selang yang bocor lalu menggantinya dengan selang cadangan dari unit.',
          en: 'disconnects the leaking hose section and replaces it with a spare hose from the unit.',
        },
        {
          kind: 'me',
          text: 'memasang tag rusak pada selang yang bocor agar tidak terpakai lagi sebelum diperbaiki.',
          en: 'tags the leaking hose as faulty so it is not used again before it is repaired.',
        },
        {
          kind: 'me',
          text: 'membuka hydrant valve kembali lalu memeriksa aliran pada selang pengganti.',
          en: 'opens the hydrant valve again and checks the flow through the replacement hose.',
        },
        {
          kind: 'do',
          text: 'Apakah aliran air sekarang stabil tanpa kebocoran?',
          en: 'Is the flow steady now, with no leaks?',
          branches: [{ label: 'Stabil → kuras selang', labelEn: 'Steady → drain the hose', to: 'hydrant#kuras' }],
        },
      ],
    },
    {
      id: 'kuras',
      name: 'Kuras & pelumasan',
      nameEn: 'Draining and lubrication',
      steps: [
        {
          kind: 'me',
          text: 'menutup rapat hydrant valve menggunakan wrench untuk menghentikan aliran utama.',
          en: 'closes the hydrant valve tight with the wrench to shut off the main flow.',
        },
        {
          kind: 'me',
          text: 'memutar operating nut searah jarum jam sampai katup utama hydrant tertutup rapat.',
          en: 'turns the operating nut clockwise until the hydrant\'s main valve is fully closed.',
        },
        {
          kind: 'me',
          text: 'membuka nozzle ke posisi full open untuk membuang sisa tekanan dan air yang terperangkap di dalam selang.',
          en: 'opens the nozzle fully to release the remaining pressure and the water trapped in the hose.',
        },
        {
          kind: 'me',
          text: 'mengangkat salah satu ujung selang setinggi bahu, lalu berjalan perlahan ke ujung lainnya untuk mendorong sisa air keluar.',
          en: 'lifts one end of the hose to shoulder height and walks slowly to the other end to push the last of the water out.',
        },
        { kind: 'do', text: 'Sisa air di dalam selang telah terkuras habis.', en: 'The hose is drained of the last of the water.' },
        {
          kind: 'me',
          text: 'meneteskan lubricant pada poros valve dan ulir nozzle hydrant agar tidak mudah berkarat.',
          en: 'drips lubricant onto the valve spindle and the hydrant nozzle thread so they do not rust up.',
        },
        {
          kind: 'me',
          text: 'menyeka sisa air pada permukaan pillar dengan kain lap sampai kering.',
          en: 'wipes the remaining water off the pillar with a cloth until it is dry.',
        },
        { kind: 'me', text: 'menggulung selang dengan teknik donat lalu merapikannya kembali.', en: 'rolls the hose up doughnut-style and stows it away.' },
      ],
    },
    {
      id: 'cat',
      name: 'Pemeriksaan & pengecatan body',
      nameEn: 'Checking and repainting the body',
      steps: [
        { kind: 'me', text: 'mengamati kondisi lapisan cat pada seluruh permukaan hydrant pillar.', en: 'looks over the paintwork across the whole hydrant pillar.' },
        {
          kind: 'do',
          text: 'Bagaimana kondisi lapisan cat pada body hydrant pillar tersebut? (masih bagus / pudar dan mengelupas)',
          en: 'What state is the paint on the pillar body in? (still good / faded and flaking)',
          branches: [{ label: 'Masih bagus → rapikan alat', labelEn: 'Still good → stow the tools', to: 'hydrant#penutup' }],
        },
        {
          kind: 'note',
          text: 'PENTING: Yang dicat ulang HANYA body/barrel dengan chrome yellow. Bonnet dan nozzle caps JANGAN ikut dicat kuning karena warnanya adalah kode kapasitas debit NFPA 291: Biru (≥1500 GPM), Hijau (1000–1499), Oranye (500–999), Merah (<500 GPM).',
          en: 'IMPORTANT: ONLY the barrel body is repainted in chrome yellow. The bonnet and nozzle caps MUST NOT be painted yellow as their colors denote NFPA 291 flow capacity: Blue (≥1500 GPM), Green (1000–1499), Orange (500–999), Red (<500 GPM).',
        },
        {
          kind: 'me',
          text: 'menyiapkan kaleng cat chrome yellow dan sebuah kuas, lalu mulai mengecat body pillar.',
          en: 'gets out a tin of chrome yellow paint and a brush, and starts painting the pillar body.',
        },
        {
          kind: 'me',
          text: 'mengecat dengan sapuan merata sampai seluruh bagian yang mengelupas tertutup sempurna.',
          en: 'paints in even strokes until every flaking patch is fully covered.',
        },
        { kind: 'do', text: '15 menit kemudian, lapisan cat terlihat telah mengering.', en: 'Fifteen minutes later, the paint has dried.' },
      ],
    },
    {
      id: 'penutup',
      name: 'Pasang cap & rapikan alat',
      nameEn: 'Refit the cap and stow the tools',
      steps: [
        {
          kind: 'me',
          text: 'memasang kembali cap pillar pada tempatnya lalu mengencangkannya dengan hydrant wrench.',
          en: 'refits the pillar cap and tightens it down with the hydrant wrench.',
        },
        {
          kind: 'note',
          text: 'Cap wajib kencang — cap yang longgar bisa bocor atau dibuka orang iseng.',
          en: 'The cap has to be tight — a loose one can leak, or be opened by someone messing about.',
        },
        {
          kind: 'me',
          label: 'Hydrant Box',
          labelEn: 'Hydrant Box',
          text: 'merapikan peralatan kembali ke dalam hydrant box lalu memastikan pintunya terkunci rapat.',
          en: 'stows the tools back in the hydrant box and checks the door is locked shut.',
        },
        {
          kind: 'me',
          label: 'Fire Engine',
          labelEn: 'Fire Engine',
          text: 'membuka kompartemen Fire Engine lalu merapikan peralatan kembali ke dalamnya.',
          en: 'opens the Fire Engine compartment and stows the tools back inside.',
        },
        {
          kind: 'me',
          label: 'Hydrant Tool Kit',
          labelEn: 'Hydrant Tool Kit',
          text: 'memasukkan peralatan kembali ke Hydrant Tool Kit, menutupnya, lalu membawanya kembali ke unit.',
          en: 'puts the tools back in the Hydrant Tool Kit, closes it, and carries it back to the unit.',
        },
      ],
    },
  ],
}
