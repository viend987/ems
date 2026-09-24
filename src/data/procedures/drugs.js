// Obat ILS — dari "ILS DRUGS" di LSFD RP.md

export default {
  id: 'drugs',
  group: 'tkp',
  name: 'Obat ILS',
  blurb: 'Pasang IV, cairan infus, dan obat jantung serta pereda nyeri.',
  sections: [
    {
      id: 'setup-iv',
      name: 'Setup IV (Lactated Ringer, Saline, Naloxone)',
      steps: [
        { n: 161, kind: 'me', text: 'membuka ILS Bag, mengambil jarum IV, catheter, dan antiseptik.' },
        {
          n: 162,
          kind: 'me',
          text: 'meraba-raba area kulit untuk mencari titik nadi lalu membersihkan area nadi korban.',
        },
        {
          n: 163,
          kind: 'me',
          text: 'menusukkan jarum IV perlahan ke pembuluh darah, memastikan flashback terlihat.',
        },
        {
          n: 164,
          kind: 'me',
          text: 'mendorong catheter masuk ke dalam pembuluh darah lalu mencabut needle safety device.',
        },
        { n: 165, kind: 'me', text: 'menempelkan plester untuk mengunci catheter pada kulit korban.' },
      ],
    },
    {
      id: 'lactated-ringer',
      name: 'Lactated Ringer — kehilangan banyak darah',
      steps: [
        { n: 166, kind: 'me', text: 'mengambil kantong LR 500ml dari ILS Bag.' },
        { n: 167, kind: 'me', text: 'menyambungkan kantong LR ke IV line yang sudah terpasang.' },
        { n: 168, kind: 'me', text: 'membuka sedikit regulator untuk mengatur aliran cairan.' },
        { n: 169, kind: 'do', text: 'Cairan mulai mengalir masuk ke tubuh korban.' },
      ],
    },
    {
      id: 'saline',
      name: 'Saline Solution — dehidrasi',
      steps: [
        { kind: 'note', text: 'Dipakai setelah korban sudah di atas gurney.' },
        { n: 170, kind: 'me', text: 'mengambil kantong Saline 500ml dari ILS Bag.' },
        { n: 171, kind: 'me', text: 'menggantungkan kantong saline di IV stand gurney.' },
        { n: 172, kind: 'me', text: 'mengatur aliran saline melalui tubing sambil memantau respon korban.' },
      ],
    },
    {
      id: 'atropine',
      name: 'Atropine — nadi menurun abnormal',
      steps: [
        { n: 173, kind: 'me', text: 'mengambil vial Atropine dari ILS Bag dan membuka tutupnya.' },
        { n: 174, kind: 'me', text: 'menyiapkan spuit kecil dan menarik dosis sesuai berat korban.' },
        { n: 175, kind: 'me', text: 'menyuntikkan Atropine ke otot korban dengan perlahan.' },
        { n: 176, kind: 'me', text: 'menarik jarum kemudian menekan area suntikan dengan kasa.' },
        { n: 177, kind: 'me', text: 'memantau ulang denyut nadi korban melalui pergelangan tangan.' },
        { id: 'pulse-recheck', n: 178, kind: 'do', text: 'Apakah ada perubahan pada denyut nadi korban?' },
      ],
    },
    {
      id: 'epinephrine',
      name: 'Epinephrine — henti jantung',
      steps: [
        { n: 179, kind: 'me', text: 'menyiapkan spuit dan menarik cairan epinephrine.' },
        { n: 180, kind: 'me', text: 'menyuntikkan Epinephrine ke otot korban.' },
        {
          n: 181,
          kind: 'me',
          text: 'kembali menekan tombol shock pada AED sambil memantau respon jantung.',
        },
        { ref: 'pulse-recheck' },
      ],
    },
    {
      id: 'verapamil',
      name: 'Verapamil — nadi terlalu tinggi / sakit kepala berat',
      steps: [
        { n: 182, kind: 'me', text: 'menyiapkan spuit untuk injeksi intramuscular.' },
        { n: 183, kind: 'me', text: 'menyuntikkan Verapamil ke otot korban.' },
        { n: 184, kind: 'me', text: 'memantau denyut nadi korban untuk menilai penurunan detak jantung.' },
        { n: 185, kind: 'do', text: 'Apakah ada perubahan pada denyut nadi korban?' },
      ],
    },
    {
      id: 'ibuprofen',
      name: 'Ibuprofen — pereda nyeri',
      steps: [
        { n: 186, kind: 'me', text: 'mengambil dua pil Ibuprofen dari ILS bag.' },
        { n: 187, kind: 'me', text: 'memberikan pil Ibuprofen kepada korban.' },
      ],
    },
  ],
}
