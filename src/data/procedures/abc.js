// ABC — dari "ABC PROCEDURE" di draft.md.
//
// Penomoran ditata ulang di kategori ini karena beberapa langkah diringkas dan
// ada cabang baru (drainase). Drainase memegang /104 sesuai keputusan, jadi
// blok /99–/103 sengaja dibiarkan kosong sebagai ruang tumbuh head-tilt.

export default {
  id: 'abc',
  group: 'tkp',
  name: 'ABC',
  blurb: 'Airway, Breathing, Circulation. Setiap tindakan diikuti pemeriksaan ulang sebelum lanjut.',
  sections: [
    {
      id: 'airway-headtilt',
      name: 'Airway — Head-Tilt Chin-Lift (umum)',
      steps: [
        {
          n: 91,
          kind: 'me',
          text: 'menempatkan diri di sisi kepala korban, meletakkan tangan kanan di atas dahi dan tangan kiri di bagian dagu korban.',
        },
        {
          n: 92,
          kind: 'me',
          text: 'menekan dahi korban secara perlahan sambil menarik dagu ke atas untuk membuka jalan napas, menjaga kepala tidak tertarik terlalu jauh ke belakang.',
        },
        {
          n: 93,
          kind: 'me',
          text: 'membuka sedikit mulut korban lalu menyorot bagian dalamnya dengan flashlight dari ILS Bag.',
        },
        {
          n: 94,
          kind: 'do',
          text: 'Apakah ada halangan yang mengganggu airway korban?',
          branches: [
            { label: 'Tidak ada → Breathing', to: 'abc#breathing-ecg' },
            { label: 'Darah / gumpalan → Drainase', to: 'abc#airway-drainase' },
            { label: 'Ada cedera kepala → Jaw-Thrust', to: 'abc#airway-jawthrust' },
          ],
        },
        { kind: 'note', text: 'Kalau yang menghalangi berupa benda padat:' },
        { n: 95, kind: 'me', text: 'mengambil tweezer dari ILS Bag lalu membuka mulut korban lebih lebar.' },
        {
          n: 96,
          kind: 'me',
          text: 'menjepit objek dengan tweezer dan menariknya keluar perlahan agar tidak terdorong lebih dalam.',
        },
        { id: 'airway-clear', n: 97, kind: 'do', text: 'Terlihat objek telah keluar dari airway korban.' },
        {
          id: 'airway-clean',
          n: 98,
          kind: 'me',
          text: 'memastikan tidak ada sisa kecil yang tertinggal lalu membersihkan mulut korban menggunakan gauze sterile dari ILS Bag.',
        },
      ],
    },
    {
      id: 'airway-drainase',
      name: 'Airway — Drainase darah (tanpa cedera kepala/leher)',
      steps: [
        {
          n: 104,
          kind: 'me',
          text: 'memiringkan kepala korban secara perlahan ke arah samping, tidak diputar berlebihan.',
        },
        { n: 105, kind: 'me', text: 'menahan posisi kepala miring sambil membuka mulut korban sedikit lebih lebar.' },
        { n: 106, kind: 'me', text: 'membiarkan darah dan gumpalan keluar hingga genangan di airway berkurang.' },
        {
          n: 107,
          kind: 'me',
          text: 'membersihkan mulut dan sekitar bibir korban menggunakan gauze sterile dari ILS Bag.',
        },
        { n: 108, kind: 'me', text: 'mengembalikan kepala korban ke posisi netral dengan hati-hati.' },
        {
          n: 109,
          kind: 'do',
          text: 'Apakah airway korban sudah tampak bersih dan tidak ada sumbatan?',
          branches: [
            { label: 'Bersih → Breathing', to: 'abc#breathing-ecg' },
            { label: 'Darah tidak berhenti → Intubasi', to: 'abc#breathing-intubasi' },
          ],
        },
        {
          n: 110,
          kind: 'me',
          text: 'mengulangi drainase perlahan atau menggunakan tweezer untuk mengambil sisa gumpalan yang terlihat.',
        },
      ],
    },
    {
      id: 'airway-jawthrust',
      name: 'Airway — Jaw-Thrust (cedera kepala)',
      steps: [
        {
          n: 111,
          kind: 'me',
          text: 'menempatkan diri tepat di atas kepala korban untuk melakukan jaw-thrust maneuver.',
        },
        {
          n: 112,
          kind: 'me',
          text: 'meletakkan kedua tangan di sisi rahang bawah korban tepat di belakang sudut rahang, lalu mendorong rahang ke atas dengan stabil tanpa memberi tekanan pada leher.',
        },
        {
          n: 113,
          kind: 'me',
          text: 'membuka mulut korban perlahan dengan kedua ibu jari lalu menyorot bagian dalamnya dengan flashlight dari ILS Bag.',
        },
        {
          n: 114,
          kind: 'do',
          text: 'Apakah terlihat ada objek yang menghalangi jalur napas korban?',
          branches: [{ label: 'Tidak ada → Breathing', to: 'abc#breathing-ecg' }],
        },
        { kind: 'note', text: 'Kalau ada:' },
        { n: 115, kind: 'me', text: 'mengambil tweezer dari ILS Bag dan membuka mulut korban lebih lebar lagi.' },
        {
          n: 116,
          kind: 'me',
          text: 'menjepit objek dengan tweezer dan menariknya keluar sambil tetap melakukan jaw-thrust agar airway tetap terbuka.',
        },
        { ref: 'airway-clear' },
        { ref: 'airway-clean' },
      ],
    },
    {
      id: 'breathing-ecg',
      name: 'Breathing — pakai ECG (torso bersih)',
      steps: [
        {
          n: 117,
          kind: 'me',
          text: 'menarik perangkat ECG mendekat, membuka panel sensor 12-lead lalu menempelkan elektroda satu per satu di dada korban sesuai posisi standar.',
        },
        {
          n: 118,
          kind: 'me',
          text: 'memastikan semua lead menempel dengan baik lalu menghubungkan kabel ECG ke unit monitor.',
        },
        {
          n: 119,
          kind: 'me',
          text: 'menyalakan perangkat ECG, mengatur mode monitor, lalu memperhatikan respiratory rate korban di layar.',
        },
        {
          n: 120,
          kind: 'do',
          text: 'Berapa laju pernafasan korban yang terbaca pada monitor ECG? (12 - 20 Normal)',
          branches: [
            { label: 'Di bawah 12 → Simple Face Mask', to: 'abc#breathing-simple-face' },
            { label: 'Di bawah 8 → bantu dengan BVM', to: 'abc#breathing-bvm' },
            { label: 'Di atas 20 tanpa luka → hiperventilasi', to: 'abc#breathing-hiperventilasi' },
            { label: '12–20 → Nasal Cannula bila perlu', to: 'abc#breathing-nasal-cannula' },
            { label: 'Di atas 20 / abnormal → NRB', to: 'abc#breathing-nrb' },
            { label: 'Normal → lanjut Circulation', to: 'abc#circulation-ecg' },
            { label: 'Ada luka di torso', to: 'abc#breathing-manual' },
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
          text: 'mendekatkan telinganya ke atas mulut korban sambil melihat ke arah dada korban lalu mendengarkan suara pernapasan korban.',
        },
        {
          kind: 'me',
          text: 'mengambil stetoskop dari ILS Bag, memasangnya di telinga lalu menempatkan membrannya pada dinding dada korban.',
        },
        {
          kind: 'do',
          text: 'Berapa laju pernapasan korban per menitnya? (12 - 20 Normal)',
          branches: [{ label: 'Normal → Circulation', to: 'abc#circulation-manual' }],
        },
        {
          kind: 'do',
          text: 'Apa yang terlihat pada dinding dada korban? (luka tembus / segmen bergerak berlawanan / utuh)',
          branches: [
            { label: 'Luka tembus dada → chest seal', to: 'deat#chest-seal' },
            { label: 'Segmen bergerak → rusuk patah', to: 'fracture#rusuk' },
            { label: 'Utuh, hanya sesak → NRB', to: 'abc#breathing-nrb' },
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
        { n: 123, kind: 'me', text: 'mengambil Simple Face Mask dari ILS Bag.' },
        {
          n: 124,
          kind: 'me',
          text: 'menyambungkan selang ke oxygen outlet dan mengatur aliran oksigen ke 5–10 L/min.',
        },
        {
          n: 125,
          kind: 'me',
          text: 'menempatkan masker pada wajah korban, menutupi hidung dan mulut dengan rapat.',
        },
        { n: 126, kind: 'me', text: 'mengaitkan tali masker ke belakang kepala korban agar stabil.' },
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
          text: 'mengambil nasal cannula dari ILS Bag dan menghubungkannya pada oxygen outlet.',
        },
        { n: 128, kind: 'me', text: 'mengatur aliran oksigen pada 2–4 liter per menit.' },
        { n: 129, kind: 'me', text: 'menempatkan dua ujung nozzle cannula ke dalam lubang hidung korban.' },
        {
          n: 130,
          kind: 'me',
          text: 'melingkarkan tali cannula ke belakang telinga korban dan mengencangkannya agar tidak lepas.',
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
          n: 131,
          kind: 'me',
          text: 'mengambil Non-Rebreather Mask dari ILS Bag dan memastikan reservoir bag telah mengembang.',
        },
        {
          n: 132,
          kind: 'me',
          text: 'menghubungkan selang ke oxygen outlet dan mengatur aliran oksigen ke 10–15 L/min.',
        },
        { n: 133, kind: 'me', text: 'menempatkan NRB mask pada wajah korban dengan posisi rapat.' },
        { n: 134, kind: 'me', text: 'memastikan katup satu arah bekerja dan reservoir bag tetap terisi.' },
        { n: 135, kind: 'me', text: 'mengaitkan tali ke belakang kepala korban agar mask tidak bergeser.' },
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
        { n: 136, kind: 'me', text: 'memposisikan kepala korban ke posisi sniffing untuk membuka jalan napas.' },
        {
          n: 137,
          kind: 'me',
          text: 'mengambil laryngoscope lalu memasukkannya perlahan ke mulut korban untuk memvisualisasikan pita suara.',
        },
        { n: 138, kind: 'do', text: 'Pita suara korban mulai terlihat dengan bantuan cahaya laryngoscope.' },
        {
          n: 139,
          kind: 'me',
          text: 'memasukkan endotracheal tube secara perlahan melewati pita suara menuju trakea korban.',
        },
        {
          n: 140,
          kind: 'me',
          text: 'mengembangkan cuff pada ET tube untuk mengamankan posisi dan mencegah kebocoran udara.',
        },
        {
          n: 141,
          kind: 'me',
          text: 'menyambungkan ET tube ke selang oksigen dari oxygen outlet di samping korban.',
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
            { label: 'Membaik → Circulation', to: 'abc#circulation-ecg' },
            { label: 'Belum → naikkan bantuan napas', to: 'abc#breathing-nrb' },
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
          text: 'Di bawah 8 kali per menit, masker oksigen saja tidak cukup — korban menghirup oksigen yang bagus tapi terlalu jarang. Napasnya harus dibantu, bukan sekadar diberi. Ini bisa dilakukan tanpa izin ILS.',
        },
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        { kind: 'me', text: 'mengeluarkan BVM dari dalam ILS Bag dan menyambungkannya ke oxygen outlet.' },
        {
          kind: 'me',
          text: 'menempatkan masker BVM menutupi hidung dan mulut korban, menekan tepinya rapat dengan ibu jari dan telunjuk sambil mengangkat rahang dengan jari lainnya.',
        },
        {
          kind: 'me',
          text: 'memompa kantong BVM sekali setiap lima detik sambil memperhatikan dada korban terangkat setiap pompaan.',
        },
        { kind: 'do', text: 'Apakah dada korban terangkat setiap kali kantong BVM dipompa?' },
        {
          kind: 'note',
          text: 'Kalau dadanya tidak terangkat, sealnya bocor atau airway-nya tertutup lagi. Perbaiki posisi kepala sebelum memompa lebih keras.',
          branches: [{ label: 'Buka ulang airway', to: 'abc#airway-headtilt' }],
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
          text: 'menekuk lengan korban yang dekat dengannya ke atas dan menyilangkan lengan satunya ke dada korban.',
        },
        {
          kind: 'me',
          text: 'menekuk lutut korban yang jauh darinya lalu menariknya perlahan sehingga tubuh korban berguling ke samping.',
        },
        {
          kind: 'me',
          text: 'menengadahkan sedikit kepala korban agar jalan napasnya tetap terbuka dan cairan bisa mengalir keluar.',
        },
        { kind: 'do', text: 'Terlihat korban bernapas lebih lega dalam posisi miring.' },
      ],
    },
    {
      id: 'circulation-ecg',
      name: 'Circulation — pakai ECG (torso bersih)',
      steps: [
        {
          n: 144,
          kind: 'me',
          text: 'menatap ke layar ECG, memantau grafik denyut jantung serta indikator heart rate.',
        },
        {
          n: 145,
          kind: 'do',
          text: 'Berapa denyut nadi per menit yang terbaca pada monitor ECG? (60 - 100 Normal)',
          branches: [
            { label: '60–100 → lanjut penanganan luka', to: 'abc#circulation-normal' },
            { label: 'Di bawah 60 → nadi melambat', to: 'abc#circulation-bradi' },
            { label: 'Di atas 100 → nadi memacu', to: 'abc#circulation-taki' },
            { label: 'Tidak ada denyut → CPR', to: 'abc#cpr' },
          ],
        },
      ],
    },
    {
      id: 'circulation-manual',
      name: 'Circulation — tanpa ECG (ada luka di torso)',
      steps: [
        {
          kind: 'note',
          text: 'Jangan periksa nadi di bagian yang terluka. Kalau pergelangan tangan terluka, pakai leher; kalau leher terluka, pakai pergelangan tangan.',
        },
        {
          kind: 'me',
          text: 'meletakkan jari telunjuk dan jari tengahnya ke carotid artery korban untuk memeriksa denyut nadinya.',
        },
        {
          kind: 'do',
          text: 'Berapa denyut nadi per menit korban? (60 - 100 normal)',
          branches: [
            { label: '60–100 → lanjut penanganan luka', to: 'abc#circulation-normal' },
            { label: 'Di bawah 60', to: 'abc#circulation-bradi' },
            { label: 'Di atas 100 dengan luka torso', to: 'abc#circulation-torso' },
            { label: 'Tidak ada denyut → CPR', to: 'abc#cpr' },
          ],
        },
      ],
    },
    {
      id: 'circulation-torso',
      name: 'Circulation — nadi tinggi dengan luka di torso',
      steps: [
        {
          kind: 'note',
          text: 'Perdarahan di dalam dada atau perut tidak bisa ditekan dari luar dan tidak bisa ditourniquet. Nadi yang memacu di sini berarti korban kehilangan darah ke dalam rongga tubuhnya sendiri — ini kasus yang menang oleh kecepatan, bukan oleh alat.',
        },
        {
          kind: 'me',
          text: 'memeriksa perut dan dada korban dengan palpasi, mencari area yang mengeras atau membengkak.',
        },
        {
          kind: 'do',
          text: 'Apakah perut korban terasa mengeras atau tegang saat ditekan?',
          branches: [
            { label: 'Luka terbuka di perut', to: 'deat#luka-perut' },
            { label: 'Luka tembus dada', to: 'deat#chest-seal' },
          ],
        },
        {
          kind: 'me',
          text: 'menyelimuti korban agar tidak kehilangan panas tubuh lalu bersiap memuatnya ke unit kendaraan.',
        },
        {
          kind: 'note',
          text: 'Pasang Lactated Ringer kalau kamu berizin ILS, lalu jalan. Kalau belum berizin, jangan tertahan di TKP — muat dan transport.',
          branches: [
            { label: 'Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Belum boleh ILS', to: 'abc#tanpa-ils' },
            { label: 'Muat korban', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'circulation-normal',
      name: 'Circulation — nadi 60–100 (normal)',
      steps: [
        {
          kind: 'note',
          text: 'A, B, dan C sudah beres. Lanjut ke penanganan lukanya, baru muat korban.',
          branches: [
            { label: 'Patah tulang', to: 'fracture#triangular' },
            { label: 'Luka lecet', to: 'wounds#graze' },
            { label: 'Memar', to: 'wounds#bruise' },
            { label: 'Muat korban', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'circulation-bradi',
      name: 'Circulation — nadi di bawah 60',
      steps: [
        {
          kind: 'note',
          text: 'Nadi melambat berarti aliran darah ke otak berkurang, dan korban akan ikut sesak. Topang napasnya dulu sebelum menyentuh obat.',
        },
        {
          kind: 'note',
          text: 'Pasang Non-Rebreather Mask lewat prosedurnya sendiri — di sana termasuk mengambil oxygen outlet dari unit, yang mungkin belum pernah dilakukan kalau napas korban tadi terbaca normal.',
          branches: [{ label: 'Pasang NRB', to: 'abc#breathing-nrb' }],
        },
        {
          n: 146,
          kind: 'do',
          text: 'Apakah denyut nadi korban naik setelah oksigen terpasang? (60 - 100 Normal)',
          branches: [
            { label: 'Naik → lanjut penanganan luka', to: 'abc#circulation-normal' },
            { label: 'Masih di bawah 60 → Atropine', to: 'drugs#atropine' },
            { label: 'Belum boleh pakai ILS', to: 'abc#tanpa-ils' },
          ],
        },
      ],
    },
    {
      id: 'circulation-taki',
      name: 'Circulation — nadi di atas 100',
      steps: [
        {
          kind: 'note',
          text: 'Nadi di atas 100 hampir selalu disertai sesak, jadi pasang NRB lebih dulu. Sesudah itu penyebabnya menentukan obatnya — dan dua penyebab ini penanganannya berlawanan.',
        },
        {
          kind: 'note',
          text: 'Pasang Non-Rebreather Mask lewat prosedurnya sendiri, lalu pantau ulang denyut nadi di monitor ECG.',
          branches: [{ label: 'Pasang NRB', to: 'abc#breathing-nrb' }],
        },
        {
          n: 147,
          kind: 'do',
          text: 'Apakah korban kehilangan banyak darah sebelum nadinya memacu?',
          branches: [
            { label: 'Ya, banyak pendarahan → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Tidak ada pendarahan → Verapamil', to: 'drugs#verapamil' },
            { label: 'Tanpa obat → posisi syok', to: 'abc#circulation-syok' },
          ],
        },
        {
          kind: 'note',
          text: 'Kalau korban baru kehilangan banyak darah, jantungnya memacu justru karena volume darahnya kurang — yang dibutuhkan cairan pengganti, bukan obat penurun denyut. Verapamil baru tepat kalau nadi tinggi tanpa riwayat pendarahan, misalnya sakit kepala berat.',
        },
      ],
    },
    {
      id: 'circulation-syok',
      name: 'Posisi syok (nadi memacu, tanpa obat)',
      steps: [
        {
          kind: 'note',
          text: 'Kalau korban kehilangan darah dan kamu tidak punya cairan pengganti, darah yang tersisa bisa diarahkan ke tempat yang paling butuh. Ini yang dikerjakan unit BLS sambil menunggu atau sambil jalan.',
        },
        {
          kind: 'me',
          text: 'membaringkan korban telentang lalu mengangkat kedua tungkainya sekitar 30cm dengan ganjalan agar darah mengalir kembali ke tubuh bagian atas.',
        },
        {
          kind: 'me',
          text: 'menyelimuti korban dengan foam blanket dari unit kendaraan untuk menahan panas tubuhnya.',
        },
        {
          kind: 'note',
          text: 'Korban yang kehilangan banyak darah cepat kedinginan, dan darah yang dingin makin sulit membeku. Menjaganya hangat itu tindakan medis, bukan sekadar perhatian.',
        },
        { kind: 'me', text: 'memantau ulang denyut nadi dan napas korban setiap beberapa saat.' },
        {
          kind: 'do',
          text: 'Apakah denyut nadi korban mulai melambat mendekati normal?',
          branches: [
            { label: 'Membaik → muat korban', to: 'load#load' },
            { label: 'Belum → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Belum boleh ILS', to: 'abc#tanpa-ils' },
          ],
        },
        { kind: 'note', text: 'Jangan beri korban makan atau minum apa pun.' },
      ],
    },
    {
      id: 'cpr',
      name: 'CPR (tidak ada denyut, torso tanpa gejala abnormal)',
      steps: [
        { n: 150, kind: 'me', text: 'mengeluarkan BVM dari dalam ILS Bag.' },
        {
          n: 151,
          kind: 'me',
          text: 'memasangkan BVM di area hidung dan mulut korban dengan rapat, memastikan seal mask tertutup sempurna.',
        },
        { n: 152, kind: 'me', text: 'meletakkan kedua telapak tangan di atas sternum korban.' },
        { kind: 'anim', text: '.cpr' },
        {
          n: 153,
          kind: 'me',
          text: 'mulai memberikan 30 kompresi dada secara ritmis, menekan kuat dan dalam dengan kecepatan stabil.',
        },
        {
          n: 154,
          kind: 'do',
          text: 'Apakah ada perubahan pada ritme ECG atau respons korban? (60 - 100 Normal)',
          branches: [
            { label: 'Kembali → lanjut penanganan luka', to: 'abc#circulation-normal' },
            { label: 'Belum → AED', to: 'abc#aed' },
          ],
        },
      ],
    },
    {
      id: 'aed',
      name: 'AED / Defibrilasi (CPR belum berhasil)',
      steps: [
        { n: 155, kind: 'me', text: 'berlari menuju unit kendaraan lalu membuka kompartemen medis.' },
        {
          n: 156,
          kind: 'do',
          text: 'Terlihat petugas mengambil AED dari dalam RA Unit lalu kembali ke sisi korban.',
        },
        { n: 157, kind: 'me', text: 'meletakkan AED di samping korban dan menyalakannya.' },
        {
          n: 158,
          kind: 'me',
          text: 'membuka baju bagian dada korban hingga terlihat jelas area sternum dan memastikan permukaannya kering.',
        },
        {
          n: 159,
          kind: 'me',
          text: 'meletakkan pads AED di atas dada korban lalu menekan tombol shock pada AED.',
        },
        { n: 160, kind: 'do', text: 'AED otomatis akan memberikan shock.' },
        {
          kind: 'do',
          text: 'Apakah ritme jantung korban kembali setelah shock? (60 - 100 Normal)',
          branches: [
            { label: 'Kembali → lanjut penanganan luka', to: 'abc#circulation-normal' },
            { label: 'Belum → Epinephrine', to: 'drugs#epinephrine' },
            { label: 'Belum boleh pakai ILS', to: 'abc#tanpa-ils' },
          ],
        },
      ],
    },
    {
      id: 'tanpa-ils',
      name: 'Kalau belum boleh pakai ILS',
      steps: [
        {
          kind: 'note',
          text: 'Belum berizin ILS bukan berarti kehabisan tindakan. Yang di bawah ini semuanya boleh dikerjakan unit BLS, dan tiga di antaranya sering lebih menentukan daripada obat.',
          branches: [
            { label: 'Napas sangat lambat → bantu dengan BVM', to: 'abc#breathing-bvm' },
            { label: 'Nadi memacu → posisi syok', to: 'abc#circulation-syok' },
            { label: 'Tidak sadar tapi bernapas → posisi pemulihan', to: 'abc#posisi-pemulihan' },
          ],
        },
        {
          kind: 'note',
          text: 'Sesudah itu, minta unit berizin. Kalau tidak ada yang bertugas, transport itu jawabannya — bukan berhenti di tengah.',
        },
        {
          kind: 'radio',
          label: 'Minta unit ILS',
          text: '~ to OCD. Requesting 10-70 ILS Unit at 10-20 Legion.',
        },
        {
          kind: 'note',
          text: 'Kalau ada yang datang, serahkan penanganan lanjutannya dan kamu tetap membantu sebagai BLS.',
        },
        {
          kind: 'me',
          text: 'mempertahankan bantuan napas dan tekanan pada luka korban sambil menunggu, memastikan kondisinya tidak memburuk.',
        },
        {
          kind: 'note',
          text: 'Kalau tidak ada unit berizin yang bertugas, transport itu jawabannya. Muat korban, jalan ke PBH, dan tutup RP dengan Doctor Report ke dokter yang menerima.',
          branches: [
            { label: 'Muat korban', to: 'load#load' },
            { label: 'Doctor Report', to: 'hospital#doctor-report' },
          ],
        },
      ],
    },
  ],
}
