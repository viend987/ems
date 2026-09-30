// BREATHING — dari "BREATHING" di draft.md.

export default {
  id: 'breathing',
  group: 'tkp',
  name: 'Breathing',
  nameEn: 'Breathing',
  blurb: 'Pemeriksaan laju pernapasan dan terapi oksigen. Setiap tindakan diikuti pemeriksaan ulang sebelum lanjut.',
  blurbEn:
    'Checking respiratory rate and giving oxygen therapy. Every action is followed by a re-check before moving on.',
  sections: [
    {
      id: 'breathing-ecg',
      name: 'Breathing — pakai ECG (torso bersih)',
      steps: [
        {
          n: 117,
          kind: 'me',
          text: 'menarik perangkat ECG mendekat lalu menempelkan elektroda 12-lead satu per satu di dada korban sesuai posisi standar.',
        },
        {
          n: 119,
          kind: 'me',
          text: 'menghubungkan kabel ke unit monitor, menyalakannya, lalu memperhatikan respiratory rate di layar.',
        },
        {
          n: 120,
          kind: 'do',
          text: 'Berapa laju pernafasan korban yang terbaca pada monitor ECG? (12 - 20 Normal)',
          branches: [
            { label: 'Di bawah 12 → Simple Face Mask', to: 'breathing#breathing-simple-face' },
            { label: 'Di bawah 8 → bantu dengan BVM', to: 'breathing#breathing-bvm' },
            { label: 'Di atas 20 tanpa luka → hiperventilasi', to: 'breathing#breathing-hiperventilasi' },
            { label: '12–20 → Nasal Cannula bila perlu', to: 'breathing#breathing-nasal-cannula' },
            { label: 'Di atas 20 / abnormal → NRB', to: 'breathing#breathing-nrb' },
            { label: 'Normal → lanjut Circulation', to: 'circulation#circulation-ecg' },
            { label: 'Ada luka di torso', to: 'breathing#breathing-manual' },
          ],
        },
      ],
    },
    {
      id: 'breathing-manual',
      name: 'Breathing — tanpa ECG (ada luka di torso)',
      steps: [
        {
          kind: 'note',
          text: 'Torso yang berdarah atau patah tidak bisa ditempeli 12-lead, jadi hitungannya manual. Tapi yang berubah bukan cuma cara mengukur — penyebabnya ada di torso itu, dan oksigen saja tidak menyelesaikannya.',
        },
        {
          kind: 'me',
          text: 'mendekatkan telinga ke mulut korban sambil memandang dada lalu mendengarkan suara pernapasan.',
        },
        {
          kind: 'me',
          text: 'mengambil stetoskop dari ILS Bag lalu menempatkan membrannya pada dinding dada korban.',
        },
        {
          kind: 'do',
          text: 'Berapa laju pernapasan korban per menitnya? (12 - 20 Normal)',
          branches: [{ label: 'Normal → Circulation', to: 'circulation#circulation-manual' }],
        },
        {
          kind: 'do',
          text: 'Apa yang terlihat pada dinding dada korban? (luka tembus / segmen bergerak berlawanan / utuh)',
          branches: [
            { label: 'Luka tembus dada → chest seal', to: 'deat#chest-seal' },
            { label: 'Segmen bergerak → rusuk patah', to: 'fracture#rusuk' },
            { label: 'Utuh, hanya sesak → NRB', to: 'breathing#breathing-nrb' },
          ],
        },
        {
          kind: 'note',
          text: 'Tutup luka atau topang rusuknya dulu, baru pasang oksigen. Memasang masker lebih dulu di atas dada yang bocor tidak akan menaikkan angkanya.',
        },
      ],
    },
    {
      id: 'breathing-simple-face',
      name: 'Breathing — Simple Face Mask (di bawah 12)',
      steps: [
        {
          id: 'oxy-note',
          kind: 'note',
          text: 'Lewati dua langkah berikut kalau oxygen outlet sudah ada di samping korban dari tindakan sebelumnya.',
        },
        {
          id: 'oxy-fetch',
          n: 121,
          kind: 'me',
          text: 'kembali ke unit kendaraan untuk mengambil oxygen outlet lalu membawanya menuju korban.',
        },
        { id: 'oxy-place', n: 122, kind: 'me', text: 'meletakkan oxygen outlet di samping korban.' },
        {
          n: 123,
          kind: 'me',
          text: 'mengambil Simple Face Mask dari ILS Bag, menyambungkan selangnya ke oxygen outlet, dan mengatur aliran oksigen ke 5–10 L/min.',
        },
        {
          n: 125,
          kind: 'me',
          text: 'menempatkan masker pada wajah korban menutupi hidung dan mulut, lalu mengaitkan tali ke belakang kepala.',
        },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'breathing-nasal-cannula',
      name: 'Breathing — Nasal Cannula (laju napas di tengah)',
      steps: [
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        {
          n: 127,
          kind: 'me',
          text: 'mengambil nasal cannula dari ILS Bag, menghubungkannya ke oxygen outlet, lalu mengatur aliran oksigen pada 2–4 L/min.',
        },
        {
          n: 129,
          kind: 'me',
          text: 'menempatkan dua ujung nozzle ke lubang hidung korban lalu melingkarkan tali ke belakang telinga.',
        },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'breathing-nrb',
      name: 'Breathing — Non-Rebreather Mask (di atas 20 / abnormal)',
      steps: [
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        {
          id: 'nrb-take',
          n: 131,
          kind: 'me',
          text: 'mengambil Non-Rebreather Mask dari ILS Bag dan memastikan reservoir bag telah mengembang.',
        },
        {
          id: 'nrb-flow',
          n: 132,
          kind: 'me',
          text: 'menghubungkan selang ke oxygen outlet dan mengatur aliran oksigen ke 10–15 L/min.',
        },
        { id: 'nrb-place', n: 133, kind: 'me', text: 'menempatkan NRB mask pada wajah korban dengan posisi rapat.' },
        { id: 'nrb-valve', n: 134, kind: 'me', text: 'memastikan katup satu arah bekerja dan reservoir bag tetap terisi.' },
        { id: 'nrb-strap', n: 135, kind: 'me', text: 'mengaitkan tali ke belakang kepala korban agar mask tidak bergeser.' },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'breathing-intubasi',
      name: 'Breathing — Intubasi (airway berdarah terus)',
      steps: [
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        {
          n: 136,
          kind: 'me',
          text: 'memposisikan kepala korban ke posisi sniffing lalu memasukkan laryngoscope perlahan ke mulut untuk memvisualisasikan pita suara.',
        },
        { n: 138, kind: 'do', text: 'Pita suara korban mulai terlihat dengan bantuan cahaya laryngoscope.' },
        {
          n: 139,
          kind: 'me',
          text: 'memasukkan endotracheal tube melewati pita suara, mengembangkan cuff, lalu menyambungkannya ke oxygen outlet.',
        },
        { n: 142, kind: 'do', text: 'Aliran oksigen mengalir dengan baik melalui ET tube.' },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'breathing-recheck',
      name: 'Breathing — periksa ulang',
      steps: [
        {
          id: 'breathing-recheck',
          n: 143,
          kind: 'do',
          text: 'Apakah laju pernapasan korban terlihat membaik? (12 – 20 Normal)',
          branches: [
            { label: 'Membaik → Circulation', to: 'circulation#circulation-ecg' },
            { label: 'Belum → naikkan bantuan napas', to: 'breathing#breathing-nrb' },
          ],
        },
      ],
    },
    {
      id: 'breathing-bvm',
      name: 'Bantuan napas dengan BVM (napas sangat lambat)',
      steps: [
        {
          kind: 'note',
          text: 'Di bawah 8 kali per menit, masker oksigen saja tidak cukup. Napasnya harus dibantu. Ini bisa dilakukan tanpa izin ILS.',
        },
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        { kind: 'me', text: 'mengeluarkan BVM dari ILS Bag dan menyambungkannya ke oxygen outlet.' },
        {
          kind: 'me',
          text: 'menempatkan masker BVM menutupi hidung dan mulut korban, menekan tepinya rapat, lalu memompa kantong sekali setiap lima detik.',
        },
        { kind: 'do', text: 'Apakah dada korban terangkat setiap kali kantong BVM dipompa?' },
        {
          kind: 'note',
          text: 'Kalau dadanya tidak terangkat, sealnya bocor atau airway-nya tertutup lagi. Perbaiki posisi kepala sebelum memompa lebih keras.',
          branches: [{ label: 'Buka ulang airway', to: 'airway#airway-headtilt' }],
        },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'breathing-hiperventilasi',
      name: 'Napas terlalu cepat tanpa luka (hiperventilasi)',
      steps: [
        {
          kind: 'note',
          text: 'Napas di atas 20 tanpa luka apa pun biasanya panik, bukan cedera. Yang dibutuhkan ketenangan, bukan oksigen aliran tinggi. Jangan pernah menyuruh korban bernapas ke dalam kantong kertas — itu cara lama yang berbahaya.',
        },
        {
          kind: 'me',
          text: 'berjongkok sejajar pandangan korban lalu berbicara dengan tenang untuk menarik perhatiannya.',
        },
        { kind: 'say', text: 'Tarik napas bareng saya ya, pelan-pelan. Empat hitungan masuk, empat hitungan keluar.' },
        {
          kind: 'me',
          text: 'menuntun korban menarik dan mengembuskan napas dalam hitungan yang tetap sambil memegang bahunya.',
        },
        { kind: 'do', text: 'Apakah laju napas korban mulai turun setelah dituntun?' },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'posisi-pemulihan',
      name: 'Posisi pemulihan (tidak sadar tapi bernapas)',
      steps: [
        {
          kind: 'note',
          text: 'Korban tidak sadar yang telentang bisa tersedak lidah atau muntahannya sendiri. Kalau napas dan nadinya ada tapi dia tidak merespon, miringkan. Jangan lakukan ini bila dicurigai ada cedera tulang belakang.',
        },
        {
          kind: 'me',
          text: 'menekuk lengan dekat ke atas dan menyilangkan lengan jauh ke dada korban.',
        },
        {
          kind: 'me',
          text: 'menekuk lutut korban yang jauh lalu menariknya hingga tubuh berguling miring ke samping.',
        },
        {
          kind: 'me',
          text: 'menengadahkan kepala korban agar jalan napas terbuka dan cairan bisa mengalir keluar.',
        },
        { kind: 'do', text: 'Terlihat korban bernapas lebih lega dalam posisi miring.' },
      ],
    },
  ],
}
