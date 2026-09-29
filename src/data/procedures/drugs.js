// Obat ILS — dari bab Intermediate Life Support di Field Handbook resmi.
//
// Setup IV bukan bagian yang setara dengan yang lain: ia gerbang. Lactated
// Ringer, Saline, dan Naloxone semuanya mengalir lewat jalur yang dipasang di
// sana, jadi tiap bagian itu menunjuk balik ke Setup IV kalau jalurnya belum ada.
//
// Langkah yang tidak bernomor adalah tambahan dari handbook resmi yang belum
// punya shortcut in-game. Nomor lama sengaja tidak digeser.

export default {
  id: 'drugs',
  group: 'tkp',
  name: 'Obat ILS',
  blurb: 'BLS dulu, ILS kemudian. Obat lewat infus butuh jalur IV terpasang sebelum apa pun mengalir.',
  sections: [
    {
      id: 'setup-iv',
      name: 'Setup IV — wajib sebelum obat lewat infus',
      steps: [
        {
          kind: 'note',
          text: 'Lactated Ringer, Saline, dan Naloxone semuanya masuk lewat jalur ini. Tidak ada jalur, tidak ada cairan yang bisa mengalir.',
        },
        {
          n: 161,
          kind: 'me',
          text: 'mengikatkan tourniquet di lengan atas korban lalu membersihkan area pembuluh darah dengan antiseptik.',
        },
        {
          n: 163,
          kind: 'me',
          text: 'menusukkan jarum IV ke pembuluh darah hingga tampak flashback, lalu mendorong catheter masuk dan mencabut jarum.',
        },
        {
          n: 165,
          kind: 'me',
          text: 'mengunci catheter dengan plester medis lalu melepas ikatan tourniquet.',
        },
        {
          id: 'iv-hang',
          kind: 'me',
          text: 'menggantungkan kantong cairan di IV stand lalu menyambungkan IV tubing ke catheter.',
        },
        {
          kind: 'note',
          text: 'Kantong infus harus selalu berada lebih tinggi dari jantung korban.',
          branches: [
            { label: 'Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Saline', to: 'drugs#saline' },
            { label: 'Naloxone', to: 'drugs#naloxone' },
          ],
        },
      ],
    },
    {
      id: 'lactated-ringer',
      name: 'Lactated Ringer — kehilangan banyak darah',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu. 500ml, untuk trauma, luka berat, pasca operasi, dan luka bakar.',
          branches: [{ label: 'Pasang IV dulu', to: 'drugs#setup-iv' }],
        },
        { n: 166, kind: 'me', text: 'mengambil kantong LR 500ml dari ILS Bag.' },
        { ref: 'iv-hang' },
        { n: 168, kind: 'me', text: 'membuka sedikit regulator untuk mengatur aliran cairan.' },
        { n: 169, kind: 'do', text: 'Cairan mulai mengalir masuk ke tubuh korban.' },
      ],
    },
    {
      id: 'saline',
      name: 'Saline Solution — dehidrasi',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu. 500ml, biasanya dipakai setelah korban di atas gurney.',
          branches: [{ label: 'Pasang IV dulu', to: 'drugs#setup-iv' }],
        },
        { n: 170, kind: 'me', text: 'mengambil kantong Saline 500ml dari ILS Bag.' },
        { ref: 'iv-hang' },
        { n: 172, kind: 'me', text: 'mengatur aliran saline melalui tubing sambil memantau respon korban.' },
      ],
    },
    {
      id: 'naloxone',
      name: 'Naloxone — overdosis opioid',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu, atau disuntikkan ke otot. Dosis 0.01mg per kilogram berat korban.',
          branches: [{ label: 'Pasang IV dulu', to: 'drugs#setup-iv' }],
        },
        {
          kind: 'me',
          text: 'mengambil vial Naloxone dari ILS Bag lalu menarik dosis sesuai berat korban ke dalam spuit.',
        },
        { kind: 'me', text: 'menyuntikkan Naloxone melalui IV line yang sudah terpasang.' },
        { kind: 'do', text: 'Apakah kesadaran dan pernapasan korban mulai kembali?' },
      ],
    },
    {
      id: 'atropine',
      name: 'Atropine — nadi menurun abnormal',
      steps: [
        { kind: 'note', text: 'Dosis 0.5mg, lewat mulut atau suntikan ke otot. Tidak perlu jalur IV.' },
        { n: 173, kind: 'me', text: 'mengambil vial Atropine dari ILS Bag dan membuka tutupnya.' },
        { n: 174, kind: 'me', text: 'menyiapkan spuit kecil dan menarik dosis sesuai berat korban.' },
        { n: 175, kind: 'me', text: 'menyuntikkan Atropine ke otot korban dengan perlahan.' },
        { n: 176, kind: 'me', text: 'menarik jarum kemudian menekan area suntikan dengan kasa.' },
        { n: 177, kind: 'me', text: 'memantau ulang denyut nadi korban melalui pergelangan tangan.' },
        {
          id: 'pulse-recheck',
          n: 178,
          kind: 'do',
          text: 'Apakah ada perubahan pada denyut nadi korban?',
          branches: [{ label: 'Normal → Cek Ulang', to: 'circulation#circulation-normal' }],
        },
      ],
    },
    {
      id: 'epinephrine',
      name: 'Epinephrine — henti jantung',
      steps: [
        {
          kind: 'note',
          text: 'Dosis 0.1mg per kilogram berat korban, ke otot. Wajib dibarengi CPR atau AED, bukan disuntik lalu ditinggal.',
          branches: [{ label: 'CPR', to: 'circulation#cpr' }, { label: 'AED', to: 'circulation#aed' }],
        },
        { n: 179, kind: 'me', text: 'menyiapkan spuit dan menarik cairan epinephrine.' },
        { n: 180, kind: 'me', text: 'menyuntikkan Epinephrine ke otot korban.' },
        {
          n: 181,
          kind: 'me',
          text: 'kembali menekan tombol shock pada AED sambil memantau respon jantung.',
        },
        { ref: 'pulse-recheck' },
        {
          kind: 'note',
          text: 'Kalau setelah Epinephrine dan shock berulang tetap tidak ada respons sama sekali, itu titik untuk menyatakan korban tidak tertolong.',
          branches: [{ label: 'Korban tidak tertolong', to: 'circulation#meninggal' }],
        },
      ],
    },
    {
      id: 'verapamil',
      name: 'Verapamil — nadi terlalu tinggi / sakit kepala berat',
      steps: [
        {
          kind: 'note',
          text: 'Dosis 0.1mg per kilogram. Jangan dipakai kalau nadi tinggi karena kehilangan banyak darah — itu butuh cairan pengganti, bukan penurun denyut.',
          branches: [{ label: 'Kalau pendarahan → Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
        { n: 182, kind: 'me', text: 'menyiapkan spuit untuk injeksi intramuscular.' },
        { n: 183, kind: 'me', text: 'menyuntikkan Verapamil ke otot korban.' },
        { n: 184, kind: 'me', text: 'memantau denyut nadi korban untuk menilai penurunan detak jantung.' },
        {
          n: 185,
          kind: 'do',
          text: 'Apakah ada perubahan pada denyut nadi korban?',
          branches: [{ label: 'Normal → Cek Ulang', to: 'circulation#circulation-normal' }],
        },
      ],
    },
    {
      id: 'valium',
      name: 'Valium — korban kejang',
      steps: [
        { kind: 'note', text: 'Dosis 0.1mg per kilogram berat korban, lewat mulut atau suntikan ke otot.' },
        {
          kind: 'me',
          text: 'menyingkirkan benda keras di sekitar korban lalu menahan kepalanya agar tidak terbentur.',
        },
        { kind: 'me', text: 'menyiapkan spuit lalu menarik dosis Valium sesuai berat korban.' },
        { kind: 'me', text: 'menyuntikkan Valium ke otot korban untuk meredakan kejangnya.' },
        { kind: 'do', text: 'Apakah kejang korban mulai mereda?' },
      ],
    },
    {
      id: 'aspirin',
      name: 'Aspirin — serangan jantung & demam',
      steps: [
        { kind: 'note', text: 'Lewat mulut, maksimum 400mg per 4 jam.' },
        { kind: 'me', text: 'mengambil tablet Aspirin dari ILS Bag, tidak lebih dari 400mg.' },
        { kind: 'me', text: 'memberikan tablet Aspirin kepada korban untuk dikunyah perlahan.' },
        { kind: 'do', text: 'Apakah nyeri dada korban mulai berkurang?' },
      ],
    },
    {
      id: 'charcoal',
      name: 'Activated Charcoal — keracunan & overdosis',
      steps: [
        { kind: 'note', text: 'Tablet 250mg, lewat mulut. Untuk keracunan makanan, minuman beralkohol, dan sejenisnya.' },
        { kind: 'me', text: 'mengambil tablet Activated Charcoal 250mg dari ILS Bag.' },
        { kind: 'me', text: 'memberikan Activated Charcoal kepada korban lalu memastikan tertelan.' },
        { kind: 'do', text: 'Apakah kondisi korban mulai membaik setelah menelan Activated Charcoal?' },
      ],
    },
    {
      id: 'ibuprofen',
      name: 'Ibuprofen — pereda nyeri',
      steps: [
        { kind: 'note', text: 'Dua pil, masing-masing 200mg sampai 400mg, lewat mulut.' },
        { n: 186, kind: 'me', text: 'mengambil dua pil Ibuprofen dari ILS bag.' },
        { n: 187, kind: 'me', text: 'memberikan pil Ibuprofen kepada korban.' },
      ],
    },
  ],
}
