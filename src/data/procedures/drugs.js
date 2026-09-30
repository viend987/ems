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
  nameEn: 'ILS Drugs',
  blurb: 'BLS dulu, ILS kemudian. Obat lewat infus butuh jalur IV terpasang sebelum apa pun mengalir.',
  blurbEn:
    'BLS first, ILS after. Anything given by drip needs an IV line running before it can flow.',
  sections: [
    {
      id: 'setup-iv',
      name: 'Setup IV — wajib sebelum obat lewat infus',
      nameEn: 'Setting up the IV — required before any drip',
      steps: [
        {
          kind: 'note',
          text: 'Lactated Ringer, Saline, dan Naloxone semuanya masuk lewat jalur ini. Tidak ada jalur, tidak ada cairan yang bisa mengalir.',
          en: 'Lactated Ringer, Saline and Naloxone all go in through this line. No line, no fluid.',
        },
        {
          n: 161,
          kind: 'me',
          text: 'mengikatkan tourniquet di lengan atas korban lalu membersihkan area pembuluh darah dengan antiseptik.',
          en: 'ties a tourniquet around the victim\'s upper arm and cleans the vein site with antiseptic.',
        },
        {
          n: 163,
          kind: 'me',
          text: 'menusukkan jarum IV ke pembuluh darah hingga tampak flashback, lalu mendorong catheter masuk dan mencabut jarum.',
          en: 'advances the IV needle into the vein until flashback appears, pushes the catheter in, and withdraws the needle.',
        },
        {
          n: 165,
          kind: 'me',
          text: 'mengunci catheter dengan plester medis lalu melepas ikatan tourniquet.',
          en: 'secures the catheter with medical tape and releases the tourniquet.',
        },
        {
          id: 'iv-hang',
          kind: 'me',
          text: 'menggantungkan kantong cairan di IV stand lalu menyambungkan IV tubing ke catheter.',
          en: 'hangs the fluid bag on the IV stand and connects the tubing to the catheter.',
        },
        {
          kind: 'note',
          text: 'Kantong infus harus selalu berada lebih tinggi dari jantung korban.',
          en: 'The bag must always sit higher than the victim\'s heart.',
          branches: [
            { label: 'Lactated Ringer', labelEn: 'Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Saline', labelEn: 'Saline', to: 'drugs#saline' },
            { label: 'Naloxone', labelEn: 'Naloxone', to: 'drugs#naloxone' },
          ],
        },
      ],
    },
    {
      id: 'lactated-ringer',
      name: 'Lactated Ringer — kehilangan banyak darah',
      nameEn: 'Lactated Ringer — heavy blood loss',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu. 500ml, untuk trauma, luka berat, pasca operasi, dan luka bakar.',
          en: 'Needs an IV line running first. 500ml, for trauma, serious wounds, post-operative care and burns.',
          branches: [{ label: 'Pasang IV dulu', labelEn: 'Set up the IV first', to: 'drugs#setup-iv' }],
        },
        { n: 166, kind: 'me', text: 'mengambil kantong LR 500ml dari ILS Bag.', en: 'takes a 500ml bag of LR from the ILS Bag.' },
        { ref: 'iv-hang' },
        { n: 168, kind: 'me', text: 'membuka sedikit regulator untuk mengatur aliran cairan.', en: 'opens the regulator a little to set the flow rate.' },
        { n: 169, kind: 'do', text: 'Cairan mulai mengalir masuk ke tubuh korban.', en: 'The fluid begins to run into the victim.' },
      ],
    },
    {
      id: 'saline',
      name: 'Saline Solution — dehidrasi',
      nameEn: 'Saline Solution — dehydration',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu. 500ml, biasanya dipakai setelah korban di atas gurney.',
          en: 'Needs an IV line running first. 500ml, usually given once the victim is on the gurney.',
          branches: [{ label: 'Pasang IV dulu', labelEn: 'Set up the IV first', to: 'drugs#setup-iv' }],
        },
        { n: 170, kind: 'me', text: 'mengambil kantong Saline 500ml dari ILS Bag.', en: 'takes a 500ml bag of Saline from the ILS Bag.' },
        { ref: 'iv-hang' },
        { n: 172, kind: 'me', text: 'mengatur aliran saline melalui tubing sambil memantau respon korban.', en: 'adjusts the saline flow through the tubing while watching how the victim responds.' },
      ],
    },
    {
      id: 'naloxone',
      name: 'Naloxone — overdosis opioid',
      nameEn: 'Naloxone — opioid overdose',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu, atau disuntikkan ke otot. Dosis 0.01mg per kilogram berat korban.',
          en: 'Needs an IV line running first, or give it intramuscularly. Dose is 0.01mg per kilogram of the victim\'s weight.',
          branches: [{ label: 'Pasang IV dulu', labelEn: 'Set up the IV first', to: 'drugs#setup-iv' }],
        },
        {
          kind: 'me',
          text: 'mengambil vial Naloxone dari ILS Bag lalu menarik dosis sesuai berat korban ke dalam spuit.',
          en: 'takes a vial of Naloxone from the ILS Bag and draws up the dose for the victim\'s weight.',
        },
        { kind: 'me', text: 'menyuntikkan Naloxone melalui IV line yang sudah terpasang.', en: 'gives the Naloxone through the IV line already in place.' },
        { kind: 'do', text: 'Apakah kesadaran dan pernapasan korban mulai kembali?', en: 'Is the victim\'s consciousness and breathing starting to come back?' },
      ],
    },
    {
      id: 'atropine',
      name: 'Atropine — nadi menurun abnormal',
      nameEn: 'Atropine — abnormally slow pulse',
      steps: [
        { kind: 'note', text: 'Dosis 0.5mg, lewat mulut atau suntikan ke otot. Tidak perlu jalur IV.', en: '0.5mg, by mouth or intramuscular injection. No IV line needed.' },
        { n: 173, kind: 'me', text: 'mengambil vial Atropine dari ILS Bag dan membuka tutupnya.', en: 'takes a vial of Atropine from the ILS Bag and opens it.' },
        { n: 174, kind: 'me', text: 'menyiapkan spuit kecil dan menarik dosis sesuai berat korban.', en: 'prepares a small syringe and draws up the dose for the victim\'s weight.' },
        { n: 175, kind: 'me', text: 'menyuntikkan Atropine ke otot korban dengan perlahan.', en: 'injects the Atropine slowly into the victim\'s muscle.' },
        { n: 176, kind: 'me', text: 'menarik jarum kemudian menekan area suntikan dengan kasa.', en: 'withdraws the needle and presses gauze over the injection site.' },
        { n: 177, kind: 'me', text: 'memantau ulang denyut nadi korban melalui pergelangan tangan.', en: 're-checks the victim\'s pulse at the wrist.' },
        {
          id: 'pulse-recheck',
          n: 178,
          kind: 'do',
          text: 'Apakah ada perubahan pada denyut nadi korban?',
          en: 'Any change in the victim\'s pulse?',
          branches: [{ label: 'Normal → Cek Ulang', labelEn: 'Normal → Re-check', to: 'circulation#circulation-normal' }],
        },
      ],
    },
    {
      id: 'epinephrine',
      name: 'Epinephrine — henti jantung',
      nameEn: 'Epinephrine — cardiac arrest',
      steps: [
        {
          kind: 'note',
          text: 'Dosis 0.1mg per kilogram berat korban, ke otot. Wajib dibarengi CPR atau AED, bukan disuntik lalu ditinggal.',
          en: '0.1mg per kilogram of the victim\'s weight, intramuscular. It must go alongside CPR or the AED — not injected and then left.',
          branches: [{ label: 'CPR', labelEn: 'CPR', to: 'circulation#cpr' }, { label: 'AED', labelEn: 'AED', to: 'circulation#aed' }],
        },
        { n: 179, kind: 'me', text: 'menyiapkan spuit dan menarik cairan epinephrine.', en: 'prepares a syringe and draws up the epinephrine.' },
        { n: 180, kind: 'me', text: 'menyuntikkan Epinephrine ke otot korban.', en: 'injects the Epinephrine into the victim\'s muscle.' },
        {
          n: 181,
          kind: 'me',
          text: 'kembali menekan tombol shock pada AED sambil memantau respon jantung.',
          en: 'presses the AED shock button again while watching for a cardiac response.',
        },
        { ref: 'pulse-recheck' },
        {
          kind: 'note',
          text: 'Kalau setelah Epinephrine dan shock berulang tetap tidak ada respons sama sekali, itu titik untuk menyatakan korban tidak tertolong.',
          en: 'If there is still no response at all after Epinephrine and repeated shocks, that is the point at which the victim is declared beyond saving.',
          branches: [{ label: 'Korban tidak tertolong', labelEn: 'The victim cannot be saved', to: 'circulation#meninggal' }],
        },
      ],
    },
    {
      id: 'verapamil',
      name: 'Verapamil — nadi terlalu tinggi / sakit kepala berat',
      nameEn: 'Verapamil — pulse too high or severe headache',
      steps: [
        {
          kind: 'note',
          text: 'Dosis 0.1mg per kilogram. Jangan dipakai kalau nadi tinggi karena kehilangan banyak darah — itu butuh cairan pengganti, bukan penurun denyut.',
          en: '0.1mg per kilogram. Do not use it when the pulse is high from heavy blood loss — that needs replacement fluid, not something to slow the heart.',
          branches: [{ label: 'Kalau pendarahan → Lactated Ringer', labelEn: 'If bleeding → Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
        { n: 182, kind: 'me', text: 'menyiapkan spuit untuk injeksi intramuscular.', en: 'prepares a syringe for an intramuscular injection.' },
        { n: 183, kind: 'me', text: 'menyuntikkan Verapamil ke otot korban.', en: 'injects the Verapamil into the victim\'s muscle.' },
        { n: 184, kind: 'me', text: 'memantau denyut nadi korban untuk menilai penurunan detak jantung.', en: 'watches the victim\'s pulse to judge whether the heart rate is coming down.' },
        {
          n: 185,
          kind: 'do',
          text: 'Apakah ada perubahan pada denyut nadi korban?',
          en: 'Any change in the victim\'s pulse?',
          branches: [{ label: 'Normal → Cek Ulang', labelEn: 'Normal → Re-check', to: 'circulation#circulation-normal' }],
        },
      ],
    },
    {
      id: 'valium',
      name: 'Valium — korban kejang',
      nameEn: 'Valium — the victim is seizing',
      steps: [
        { kind: 'note', text: 'Dosis 0.1mg per kilogram berat korban, lewat mulut atau suntikan ke otot.', en: '0.1mg per kilogram of the victim\'s weight, by mouth or intramuscular injection.' },
        {
          kind: 'me',
          text: 'menyingkirkan benda keras di sekitar korban lalu menahan kepalanya agar tidak terbentur.',
          en: 'clears hard objects away from the victim and cradles their head so it cannot strike anything.',
        },
        { kind: 'me', text: 'menyiapkan spuit lalu menarik dosis Valium sesuai berat korban.', en: 'prepares a syringe and draws up the Valium dose for the victim\'s weight.' },
        { kind: 'me', text: 'menyuntikkan Valium ke otot korban untuk meredakan kejangnya.', en: 'injects the Valium into the victim\'s muscle to settle the seizure.' },
        { kind: 'do', text: 'Apakah kejang korban mulai mereda?', en: 'Is the seizure starting to settle?' },
      ],
    },
    {
      id: 'aspirin',
      name: 'Aspirin — serangan jantung & demam',
      nameEn: 'Aspirin — heart attack and fever',
      steps: [
        { kind: 'note', text: 'Lewat mulut, maksimum 400mg per 4 jam.', en: 'By mouth, no more than 400mg every 4 hours.' },
        { kind: 'me', text: 'mengambil tablet Aspirin dari ILS Bag, tidak lebih dari 400mg.', en: 'takes Aspirin tablets from the ILS Bag, no more than 400mg.' },
        { kind: 'me', text: 'memberikan tablet Aspirin kepada korban untuk dikunyah perlahan.', en: 'gives the Aspirin to the victim to chew slowly.' },
        { kind: 'do', text: 'Apakah nyeri dada korban mulai berkurang?', en: 'Is the victim\'s chest pain starting to ease?' },
      ],
    },
    {
      id: 'charcoal',
      name: 'Activated Charcoal — keracunan & overdosis',
      nameEn: 'Activated Charcoal — poisoning and overdose',
      steps: [
        { kind: 'note', text: 'Tablet 250mg, lewat mulut. Untuk keracunan makanan, minuman beralkohol, dan sejenisnya.', en: '250mg tablet, by mouth. For food poisoning, alcohol, and the like.' },
        { kind: 'me', text: 'mengambil tablet Activated Charcoal 250mg dari ILS Bag.', en: 'takes a 250mg Activated Charcoal tablet from the ILS Bag.' },
        { kind: 'me', text: 'memberikan Activated Charcoal kepada korban lalu memastikan tertelan.', en: 'gives the Activated Charcoal to the victim and makes sure it goes down.' },
        { kind: 'do', text: 'Apakah kondisi korban mulai membaik setelah menelan Activated Charcoal?', en: 'Is the victim starting to improve after swallowing the Activated Charcoal?' },
      ],
    },
    {
      id: 'ibuprofen',
      name: 'Ibuprofen — pereda nyeri',
      nameEn: 'Ibuprofen — pain relief',
      steps: [
        { kind: 'note', text: 'Dua pil, masing-masing 200mg sampai 400mg, lewat mulut.', en: 'Two pills, 200mg to 400mg each, by mouth.' },
        { n: 186, kind: 'me', text: 'mengambil dua pil Ibuprofen dari ILS bag.', en: 'takes two Ibuprofen pills from the ILS Bag.' },
        { n: 187, kind: 'me', text: 'memberikan pil Ibuprofen kepada korban.', en: 'gives the Ibuprofen pills to the victim.' },
      ],
    },
  ],
}
