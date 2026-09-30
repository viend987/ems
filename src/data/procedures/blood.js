// Transfusi Darah — dari [GUIDE] Blood Transfusion (Donato Volta).
//
// Hanya baris chat yang masuk; penjelasan fungsi Blood Bank dan komponen darah
// tinggal di panduan aslinya. Beberapa langkah ditambahkan dari praktik medis
// nyata dan ditandai di bawah — panduan aslinya melewatkan pemeriksaan yang
// justru paling menentukan keselamatan transfusi.

export default {
  id: 'blood',
  group: 'khusus',
  name: 'Transfusi Darah',
  nameEn: 'Blood Transfusion',
  blurb: 'Untuk event donor darah LSFD: tes golongan darah, skrining pendonor, pengambilan darah, dan transfusi saat operasi.',
  blurbEn:
    'For LSFD blood-donation events: blood typing, donor screening, drawing blood, and transfusion during surgery.',
  sections: [
    {
      id: 'golongan-darah',
      name: 'Tes golongan darah',
      nameEn: 'Blood typing',
      steps: [
        {
          kind: 'note',
          text: 'Wajib sebelum donor maupun transfusi. Hasilnya dicatat supaya tidak perlu dites ulang lain kali.',
          en: 'Required before donating and before transfusing. Record the result so it does not have to be tested again.',
        },
        {
          kind: 'me',
          text: 'membersihkan ujung jari pasien dengan alcohol swab, menusuknya dengan blood lancet, lalu mengumpulkan sampel darah dengan pipet.',
          en: 'cleans the patient\'s fingertip with an alcohol swab, pricks it with a blood lancet, and collects a sample with a pipette.',
        },
        {
          kind: 'me',
          text: 'meneteskan sampel ke kartu golongan darah, menambahkan empat reagen, dan mengaduknya perlahan agar tercampur.',
          en: 'drops the sample onto a blood typing card, adds the four reagents, and stirs them gently to mix.',
        },
        { kind: 'do', text: 'Sampel darah dan reagen yang cocok mulai terlihat menggumpal.', en: 'The blood sample and the matching reagent are starting to clump.' },
        { kind: 'do', text: 'Golongan darah apa yang bereaksi pada kartu? (A / B / AB / O)', en: 'Which blood group reacts on the card? (A / B / AB / O)' },
        { kind: 'do', text: 'Apakah Rhesus golongan darah pasien? (Positive / Negative)', en: 'What is the patient\'s Rhesus factor? (Positive / Negative)' },
        {
          kind: 'me',
          text: 'mencatat hasil golongan darah di database lalu memberikan kartu kepada pasien.',
          en: 'records the blood group in the database and hands the card to the patient.',
        },
      ],
    },
    {
      id: 'skrining-donor',
      name: 'Skrining sebelum donor',
      nameEn: 'Screening before donation',
      steps: [
        {
          kind: 'note',
          text: 'Donor hanya boleh kalau golongan darah sudah dites, tekanan darah normal, dan hemoglobin cukup. Kalau salah satunya tidak lolos, donor ditunda.',
          en: 'Donation is only allowed if the blood group has been typed, the blood pressure is normal, and the haemoglobin is high enough. If any one of those fails, the donation is postponed.',
          branches: [{ label: 'Belum tes golongan darah', labelEn: 'Blood group not typed yet', to: 'blood#golongan-darah' }],
        },
        {
          kind: 'me',
          text: 'memasang manset tensimeter di lengan atas pendonor lalu mengukur tekanan darahnya.',
          en: 'fits the blood pressure cuff to the donor\'s upper arm and takes a reading.',
        },
        {
          kind: 'do',
          text: 'Berapa tekanan darah pendonor? (sistolik 90–180, diastolik 50–100 boleh donor)',
          en: 'What is the donor\'s blood pressure? (systolic 90–180, diastolic 50–100 may donate)',
        },
        {
          kind: 'me',
          text: 'menusuk ujung jari pendonor dengan blood lancet lalu meneteskan sampelnya ke alat pengukur hemoglobin.',
          en: 'pricks the donor\'s fingertip with a blood lancet and drops the sample onto the haemoglobin meter.',
        },
        { kind: 'do', text: 'Berapa kadar hemoglobin pendonor? (minimal 12.5 g/dL)', en: 'What is the donor\'s haemoglobin level? (12.5 g/dL minimum)' },
        {
          kind: 'do',
          text: 'Apakah pendonor sudah makan dan cukup minum dalam beberapa jam terakhir?',
          en: 'Has the donor eaten and had enough to drink in the last few hours?',
        },
        {
          kind: 'note',
          text: 'Pendonor yang perutnya kosong gampang pingsan saat darahnya diambil. Kalau belum makan, suruh makan dan minum dulu.',
          en: 'A donor on an empty stomach faints easily once the blood starts coming out. If they have not eaten, send them to eat and drink first.',
        },
      ],
    },
    {
      id: 'donor',
      name: 'Donor darah',
      nameEn: 'Blood donation',
      steps: [
        {
          kind: 'me',
          text: 'mengikatkan tourniquet pada lengan atas pendonor lalu membersihkan area lengan dengan alcohol swab.',
          en: 'ties a tourniquet around the donor\'s upper arm and cleans the site with an alcohol swab.',
        },
        {
          kind: 'me',
          text: 'menginjeksikan jarum 16 Gauge perlahan pada lengan pendonor, menyambungkan catheter, dan merekatkannya dengan medical tape.',
          en: 'advances the 16 Gauge needle slowly into the donor\'s arm, attaches the catheter, and tapes it down.',
        },
        { kind: 'me', text: 'menyambungkan kantong darah pertama ke catheter lalu melepas tourniquet.', en: 'connects the first blood bag to the catheter and releases the tourniquet.' },
        { kind: 'do', text: 'Darah mulai mengalir mengisi kantong darah perlahan.', en: 'Blood begins to flow, slowly filling the bag.' },
        { kind: 'do', text: '10 menit berlalu, kantong darah pertama sudah terisi penuh.', en: 'Ten minutes pass and the first bag is full.' },
        {
          kind: 'me',
          text: 'melepas kantong darah pertama, mengikat ujung selangnya, lalu menyambungkan kantong darah kedua ke catheter.',
          en: 'detaches the first bag, ties off its tubing, and connects the second bag to the catheter.',
        },
        { kind: 'do', text: '10 menit berlalu, kantong darah kedua sudah terisi penuh.', en: 'Ten minutes pass and the second bag is full.' },
        {
          kind: 'me',
          text: 'melepas kantong kedua, mencabut jarum dari lengan pendonor, dan menutup bekas tusukan dengan medical bandage.',
          en: 'detaches the second bag, withdraws the needle from the donor\'s arm, and covers the puncture with a medical bandage.',
        },
        { kind: 'me', text: 'memberikan kedua kantong darah kepada perawat.', en: 'hands both blood bags to the nurse.' },
        { kind: 'note', text: 'Baris berikut RPLY — perawatnya tidak benar-benar ada.', en: 'The next line is RPLY — there is no nurse actually there.' },
        { kind: 'do', text: 'Perawat membawa kantong darah ke lab untuk diproses.', en: 'The nurse takes the blood bags to the lab to be processed.' },
        { kind: 'me', text: 'mencatat informasi donor pada database pasien.', en: 'records the donation details in the patient database.' },
        {
          kind: 'say',
          label: 'setelah donor',
          labelEn: 'after donating',
          text: 'Duduk dulu sebentar ya, minum air ini. Hari ini jangan angkat yang berat-berat dulu.',
          en: 'Sit down for a bit and drink this. No heavy lifting for the rest of today.',
        },
      ],
    },
    {
      id: 'transfusi',
      name: 'Transfusi saat operasi',
      nameEn: 'Transfusion during surgery',
      steps: [
        {
          kind: 'note',
          text: 'Dipakai saat pasien kehilangan banyak darah di tengah operasi. Darah masuk lewat jalur IV, jadi IV harus sudah terpasang.',
          en: 'Used when the patient loses a lot of blood mid-surgery. The blood goes in through the IV line, so the IV has to be in already.',
          branches: [{ label: 'Pasang IV dulu', labelEn: 'Set up the IV first', to: 'drugs#setup-iv' }],
        },
        {
          kind: 'me',
          text: 'memeriksa catatan medis pasien untuk mencari golongan darah yang dibutuhkan.',
          en: 'checks the patient\'s medical record for the blood group needed.',
        },
        {
          kind: 'do',
          text: 'Apakah golongan darah pasien sudah tercatat di database?',
          en: 'Is the patient\'s blood group already recorded in the database?',
          branches: [{ label: 'Belum → tes golongan darah', labelEn: 'Not yet → type the blood', to: 'blood#golongan-darah' }],
        },
        {
          kind: 'note',
          text: 'Kalau pasien kritis dan tidak sempat dites, pakai O Negative — golongan darah yang bisa diterima semua orang.',
          en: 'If the patient is critical and there is no time to type them, use O Negative — the group everyone can receive.',
        },
        {
          kind: 'me',
          text: 'mengambil kantong darah berlabel [golongan darah] sebanyak [jumlah] kantong dari Bank Darah dan membawanya ke meja operasi.',
          en: 'collects [number] bags labelled [blood group] from the Blood Bank and brings them to the operating table.',
        },
        { kind: 'note', text: 'Baris berikut RPLY — perawatnya tidak benar-benar ada.', en: 'The next line is RPLY — there is no nurse actually there.' },
        { kind: 'do', text: 'Perawat mencatat jumlah kantong darah yang diambil dari Bank Darah.', en: 'The nurse records how many bags were taken from the Blood Bank.' },
        {
          kind: 'me',
          text: 'mencocokkan label golongan darah pada kantong dengan catatan medis pasien sebelum dipasang.',
          en: 'checks the blood group on the bag against the patient\'s medical record before hanging it.',
        },
        {
          kind: 'note',
          text: 'Jangan dilewati. Salah golongan darah adalah kesalahan transfusi yang paling fatal, dan satu-satunya penjaganya adalah pengecekan ini.',
          en: 'Do not skip this. The wrong blood group is the deadliest transfusion error there is, and this check is the only thing standing in its way.',
        },
        { kind: 'me', text: 'menjepit pembuluh arteri pasien yang berdarah dengan clamp.', en: 'clamps off the patient\'s bleeding artery.' },
        {
          kind: 'me',
          text: 'menggantung kantong darah pada IV stand, menyambungkannya ke selang IV, dan mengatur kecepatan tetesan.',
          en: 'hangs the blood bag on the IV stand, connects it to the IV line, and sets the drip rate.',
        },
        {
          kind: 'do',
          text: 'Apakah muncul tanda reaksi transfusi pada pasien? (demam / menggigil / gatal / sesak)',
          en: 'Any sign of a transfusion reaction in the patient? (fever / chills / itching / breathlessness)',
          branches: [{ label: 'Ada reaksi → hentikan transfusi', labelEn: 'Reaction → stop the transfusion', to: 'blood#reaksi' }],
        },
        { kind: 'do', text: 'Transfusi darah berlangsung selama [jumlah] jam.', en: 'The transfusion runs for [number] hours.' },
        {
          kind: 'do',
          text: 'Berapa denyut nadi pasien per menit setelah dilakukan transfusi darah? (60 - 100 normal)',
          en: 'What is the patient\'s pulse per minute after the transfusion? (60 - 100 is normal)',
        },
      ],
    },
    {
      id: 'reaksi',
      name: 'Kalau terjadi reaksi transfusi',
      nameEn: 'If a transfusion reaction happens',
      steps: [
        {
          kind: 'note',
          text: 'Tubuh pasien menolak darah yang masuk. Hentikan saat itu juga — setiap tetes tambahan memperparah reaksinya.',
          en: 'The patient\'s body is rejecting the blood going in. Stop it there and then — every further drop makes the reaction worse.',
        },
        {
          kind: 'me',
          text: 'menutup regulator transfusi lalu melepas kantong darah dari selang IV.',
          en: 'closes the transfusion regulator and disconnects the blood bag from the IV line.',
        },
        {
          kind: 'me',
          text: 'menyambungkan kantong saline ke selang IV yang sama agar jalur infus tetap terbuka.',
          en: 'connects a saline bag to the same IV line to keep the line open.',
        },
        {
          kind: 'me',
          text: 'memeriksa ulang suhu tubuh, denyut nadi, dan pernapasan pasien.',
          en: 're-checks the patient\'s temperature, pulse and breathing.',
        },
        { kind: 'do', text: 'Apakah kondisi pasien mulai stabil setelah transfusi dihentikan?', en: 'Is the patient stabilising now the transfusion has been stopped?' },
        {
          kind: 'me',
          text: 'menyimpan kantong darah yang dipakai beserta labelnya untuk dicek ulang ke Bank Darah.',
          en: 'keeps the used blood bag and its label so the Blood Bank can check it again.',
        },
      ],
    },
  ],
}
