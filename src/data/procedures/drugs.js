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
          text: 'Pilihan rute: Semprot hidung (Intranasal), suntikan ke otot (IM 0.01mg/kg), atau lewat infus (IV).',
          en: 'Route options: Nasal spray (Intranasal), intramuscular injection (IM 0.01mg/kg), or through the IV line.',
          branches: [
            { label: 'Semprot Hidung (IN)', labelEn: 'Nasal Spray (IN)', to: 'drugs#naloxone-in' },
            { label: 'Suntik Otot (IM)', labelEn: 'Intramuscular (IM)', to: 'drugs#naloxone-im' },
            { label: 'Lewat Infus (IV)', labelEn: 'Through IV Line', to: 'drugs#naloxone-iv' },
          ],
        },
      ],
    },
    {
      id: 'naloxone-in',
      name: 'Naloxone (Intranasal) — semprot hidung',
      nameEn: 'Naloxone (Intranasal) — nasal spray',
      steps: [
        {
          kind: 'note',
          text: 'Paling cepat saat vena kolaps atau korban tidak sadar di jalanan. Tanpa jarum suntik.',
          en: 'Fastest when veins have collapsed or the victim is unconscious on the street. Needleless.',
        },
        {
          kind: 'me',
          text: 'mengambil Narcan nasal spray dari dalam ILS Bag dan membuka segel pelindungnya.',
          en: 'takes the Narcan nasal spray from the ILS Bag and peels off the protective seal.',
        },
        {
          kind: 'me',
          text: 'memasukkan ujung nozzle ke salah satu lubang hidung korban lalu menekan plunger semprotan.',
          en: 'inserts the nozzle tip into one of the victim\'s nostrils and presses the spray plunger.',
        },
        {
          id: 'naloxone-recheck',
          kind: 'do',
          text: 'Apakah pernapasan dan kesadaran korban mulai berangsur pulih?',
          en: 'Is the victim\'s breathing and consciousness beginning to gradually recover?',
        },
      ],
    },
    {
      id: 'naloxone-im',
      name: 'Naloxone (Intramuskular) — suntik otot',
      nameEn: 'Naloxone (Intramuscular) — muscle injection',
      steps: [
        {
          kind: 'note',
          text: 'Dosis 0.01mg per kg berat badan, disuntikkan ke otot paha atau lengan jika tidak ada semprot hidung.',
          en: 'Dose of 0.01mg per kg body weight, injected into thigh or upper arm muscle when nasal spray is unavailable.',
        },
        {
          kind: 'me',
          text: 'mengambil vial Naloxone dan spuit steril dari dalam ILS Bag.',
          en: 'takes a vial of Naloxone and a sterile syringe from the ILS Bag.',
        },
        {
          kind: 'me',
          text: 'menarik dosis cairan Naloxone sesuai berat badan korban ke dalam spuit.',
          en: 'draws up the Naloxone dose for the victim\'s body weight into the syringe.',
        },
        {
          kind: 'me',
          text: 'mengusapkan alcohol prep pad pada area otot paha korban.',
          en: 'swabs the victim\'s thigh muscle with an alcohol prep pad.',
        },
        {
          kind: 'me',
          text: 'menyuntikkan jarum ke dalam jaringan otot paha lalu mendorong obat perlahan.',
          en: 'inserts the needle into the thigh muscle tissue and pushes the medication slowly.',
        },
        {
          kind: 'me',
          text: 'menarik jarum suntik keluar lalu menekan bekas suntikan dengan kasa steril.',
          en: 'withdraws the needle and presses sterile gauze over the injection site.',
        },
        { ref: 'naloxone-recheck' },
      ],
    },
    {
      id: 'naloxone-iv',
      name: 'Naloxone (Intravena) — lewat infus IV',
      nameEn: 'Naloxone (Intravenous) — via IV line',
      steps: [
        {
          kind: 'note',
          text: 'Butuh jalur IV terpasang lebih dulu. Dosis 0.01mg per kg berat badan.',
          en: 'Requires an existing IV line. Dose of 0.01mg per kg body weight.',
          branches: [{ label: 'Pasang IV dulu', labelEn: 'Set up IV first', to: 'drugs#setup-iv' }],
        },
        {
          kind: 'me',
          text: 'mengambil vial Naloxone lalu menarik dosis sesuai takaran ke dalam spuit.',
          en: 'takes a vial of Naloxone and draws up the measured dose into the syringe.',
        },
        {
          kind: 'me',
          text: 'membersihkan injection port pada IV tubing dengan alcohol prep pad.',
          en: 'cleans the injection port on the IV tubing with an alcohol prep pad.',
        },
        {
          kind: 'me',
          text: 'menyuntikkan Naloxone melalui injection port pada jalur infus IV.',
          en: 'injects the Naloxone into the injection port of the IV line.',
        },
        { ref: 'naloxone-recheck' },
      ],
    },
    {
      id: 'atropine',
      name: 'Atropine — nadi menurun abnormal',
      nameEn: 'Atropine — abnormally slow pulse',
      steps: [
        {
          kind: 'note',
          text: 'Dosis 0.5mg lewat suntikan ke otot (IM). Tidak perlu jalur IV.',
          en: 'Dose of 0.5mg via intramuscular (IM) injection. No IV line needed.',
        },
        { n: 173, kind: 'me', text: 'mengambil vial Atropine dan spuit steril dari dalam ILS Bag.', en: 'takes a vial of Atropine and a sterile syringe from the ILS Bag.' },
        { n: 174, kind: 'me', text: 'menarik dosis 0.5mg cairan Atropine ke dalam spuit.', en: 'draws up a 0.5mg dose of Atropine into the syringe.' },
        { kind: 'me', text: 'mengusapkan alcohol prep pad pada area otot lengan atas korban.', en: 'swabs the victim\'s upper arm muscle with an alcohol prep pad.' },
        { n: 175, kind: 'me', text: 'menyuntikkan jarum ke jaringan otot lalu mendorong obat perlahan.', en: 'inserts the needle into the muscle tissue and pushes the medication slowly.' },
        { n: 176, kind: 'me', text: 'menarik jarum suntik kemudian menekan area suntikan dengan kasa steril.', en: 'withdraws the needle and presses sterile gauze over the injection site.' },
        { n: 177, kind: 'me', text: 'memeriksa ulang denyut nadi korban melalui pergelangan tangan.', en: 're-checks the victim\'s pulse at the wrist.' },
        {
          id: 'pulse-recheck',
          n: 178,
          kind: 'do',
          text: 'Apakah ada kenaikan atau perubahan pada denyut nadi korban?',
          en: 'Is there any rise or change in the victim\'s pulse?',
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
          text: 'Dosis 0.1mg per kg berat badan, disuntikkan ke otot (IM). Wajib dibarengi CPR atau AED.',
          en: '0.1mg per kg body weight, intramuscular (IM). Must be combined with CPR or AED.',
          branches: [{ label: 'CPR', labelEn: 'CPR', to: 'circulation#cpr' }, { label: 'AED', labelEn: 'AED', to: 'circulation#aed' }],
        },
        { n: 179, kind: 'me', text: 'mengambil ampul Epinephrine dan menarik cairan obat ke dalam spuit steril.', en: 'takes an ampoule of Epinephrine and draws the medication into a sterile syringe.' },
        { kind: 'me', text: 'mengusapkan alcohol prep pad pada area otot paha samping korban.', en: 'swabs the victim\'s outer thigh muscle with an alcohol prep pad.' },
        { n: 180, kind: 'me', text: 'menyuntikkan Epinephrine ke dalam otot paha korban secara intramuskular.', en: 'injects Epinephrine intramuscularly into the victim\'s thigh muscle.' },
        { kind: 'me', text: 'menarik jarum suntik lalu menekan bekas suntikan dengan kasa steril.', en: 'withdraws the needle and presses sterile gauze over the injection site.' },
        {
          n: 181,
          kind: 'me',
          text: 'kembali menekan tombol shock pada AED / melanjutkan siklus kompresi CPR.',
          en: 'presses the AED shock button again / resumes the CPR compression cycle.',
        },
        {
          id: 'epi-recheck',
          kind: 'do',
          text: 'Apakah ritme detak jantung korban mulai terasa kembali?',
          en: 'Is the victim\'s heartbeat rhythm beginning to be felt again?',
          branches: [{ label: 'Normal → Cek Ulang', labelEn: 'Normal → Re-check', to: 'circulation#circulation-normal' }],
        },
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
          text: 'Dosis 0.1mg per kg berat badan secara intramuskular (IM). Jangan dipakai jika nadi tinggi akibat pendarahan hebat.',
          en: '0.1mg per kg body weight intramuscularly (IM). Do not use if high pulse is caused by heavy hemorrhage.',
          branches: [{ label: 'Kalau pendarahan → Lactated Ringer', labelEn: 'If bleeding → Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
        { n: 182, kind: 'me', text: 'menyiapkan spuit steril dan menarik dosis Verapamil dari dalam vial.', en: 'prepares a sterile syringe and draws up the Verapamil dose from the vial.' },
        { kind: 'me', text: 'mengusapkan alcohol prep pad pada area otot lengan korban.', en: 'swabs the victim\'s arm muscle with an alcohol prep pad.' },
        { n: 183, kind: 'me', text: 'menyuntikkan Verapamil ke dalam otot lengan korban secara perlahan.', en: 'injects the Verapamil slowly into the victim\'s arm muscle.' },
        { kind: 'me', text: 'menarik jarum suntik keluar lalu menempelkan kasa steril pada area bekas suntikan.', en: 'withdraws the needle and places sterile gauze over the injection site.' },
        { n: 184, kind: 'me', text: 'memeriksa denyut nadi korban untuk menilai penurunan laju detak jantung.', en: 'checks the victim\'s pulse to assess the reduction in heart rate.' },
        {
          n: 185,
          kind: 'do',
          text: 'Apakah laju denyut nadi korban mulai melambat mendekati normal?',
          en: 'Is the victim\'s pulse rate beginning to slow toward normal?',
          branches: [{ label: 'Normal → Cek Ulang', labelEn: 'Normal → Re-check', to: 'circulation#circulation-normal' }],
        },
      ],
    },
    {
      id: 'valium',
      name: 'Valium — korban kejang',
      nameEn: 'Valium — the victim is seizing',
      steps: [
        { kind: 'note', text: 'Dosis 0.1mg per kg berat badan, disuntikkan ke otot (IM).', en: '0.1mg per kg of body weight, injected into muscle (IM).' },
        {
          kind: 'me',
          text: 'menyingkirkan benda keras di sekitar korban dan menahan kepala korban agar tidak terbentur.',
          en: 'clears hard objects away from the victim and cradles their head so it cannot strike anything.',
        },
        { kind: 'me', text: 'mengambil vial Valium dan menarik dosis cairan sesuai takaran ke dalam spuit.', en: 'takes a vial of Valium and draws up the measured dose into the syringe.' },
        { kind: 'me', text: 'mengusap otot paha korban dengan alcohol swab lalu menyuntikkan Valium perlahan.', en: 'swabs the victim\'s thigh muscle with an alcohol swab and injects the Valium slowly.' },
        { kind: 'me', text: 'menarik jarum suntik kemudian menekan area suntikan dengan kasa steril.', en: 'withdraws the needle and presses sterile gauze over the injection site.' },
        { kind: 'do', text: 'Apakah kejang-kejang pada tubuh korban mulai mereda?', en: 'Are the seizures in the victim\'s body starting to subside?' },
      ],
    },
    {
      id: 'aspirin',
      name: 'Aspirin — serangan jantung & demam',
      nameEn: 'Aspirin — heart attack and fever',
      steps: [
        { kind: 'note', text: 'Diberikan lewat mulut (oral), maksimal 400mg per 4 jam untuk nyeri dada atau demam.', en: 'Administered orally, maximum 400mg per 4 hours for chest pain or fever.' },
        { kind: 'me', text: 'mengambil tablet Aspirin dan sebotol air mineral dari dalam ILS Bag.', en: 'takes Aspirin tablets and a bottle of mineral water from the ILS Bag.' },
        { kind: 'me', text: 'memberikan tablet Aspirin kepada korban untuk dikunyah perlahan dengan sedikit air.', en: 'hands the Aspirin tablets to the victim to chew slowly with a sip of water.' },
        { kind: 'do', text: 'Apakah rasa nyeri dada atau rasa tertekan di dada korban mulai berkurang?', en: 'Is the chest pain or tightness beginning to ease?' },
      ],
    },
    {
      id: 'charcoal',
      name: 'Activated Charcoal — keracunan & overdosis',
      nameEn: 'Activated Charcoal — poisoning and overdose',
      steps: [
        { kind: 'note', text: 'Tablet 250mg lewat mulut. Untuk penyerapan racun makanan atau overdosis zat tertelan.', en: '250mg tablet orally. For absorbing food toxins or ingested substance overdoses.' },
        { kind: 'me', text: 'mengambil tablet Activated Charcoal 250mg dan botol air mineral dari ILS Bag.', en: 'takes a 250mg Activated Charcoal tablet and a bottle of mineral water from the ILS Bag.' },
        { kind: 'me', text: 'memberikan tablet Activated Charcoal kepada korban untuk diminum bersama air.', en: 'hands the Activated Charcoal tablet to the victim to drink down with water.' },
        { kind: 'do', text: 'Apakah keluhan mual, pusing, atau rasa terbakar di lambung mulai mereda?', en: 'Is the nausea, dizziness, or burning sensation in the stomach beginning to subside?' },
      ],
    },
    {
      id: 'ibuprofen',
      name: 'Ibuprofen — pereda nyeri',
      nameEn: 'Ibuprofen — pain relief',
      steps: [
        { kind: 'note', text: 'Dua butir tablet (200mg - 400mg), diberikan lewat mulut (oral).', en: 'Two tablets (200mg - 400mg), given orally.' },
        { n: 186, kind: 'me', text: 'mengambil dua butir tablet Ibuprofen dan sebotol air mineral dari dalam ILS Bag.', en: 'takes two Ibuprofen tablets and a bottle of mineral water from the ILS Bag.' },
        { n: 187, kind: 'me', text: 'menyerahkan tablet Ibuprofen kepada korban untuk diminum bersama air.', en: 'hands the Ibuprofen tablets to the victim to drink down with water.' },
        { kind: 'do', text: 'Apakah rasa sakit dan nyeri pada tubuh korban mulai berkurang?', en: 'Is the pain and soreness in the victim\'s body starting to decrease?' },
      ],
    },
  ],
}
