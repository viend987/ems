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
            { label: '12–20 → Nasal Cannula bila perlu', to: 'abc#breathing-nasal-cannula' },
            { label: 'Di atas 20 / abnormal → NRB', to: 'abc#breathing-nrb' },
            { label: 'Normal → lanjut Circulation', to: 'abc#circulation-ecg' },
          ],
        },
      ],
    },
    {
      id: 'breathing-manual',
      name: 'Breathing — tanpa ECG (ada luka di torso)',
      steps: [
        {
          kind: 'me',
          text: 'mendekatkan telinganya ke atas mulut korban sambil melihat ke arah dada korban lalu mendengarkan suara pernapasan korban.',
        },
        { kind: 'do', text: 'Berapa laju pernapasan korban per menitnya? (12 - 20 Normal)' },
      ],
    },
    {
      id: 'breathing-simple-face',
      name: 'Breathing — Simple Face Mask (di bawah 12)',
      steps: [
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
          kind: 'me',
          text: 'meletakkan jari telunjuk dan jari tengahnya ke carotid artery korban untuk memeriksa denyut nadinya.',
        },
        { kind: 'do', text: 'Berapa denyut nadi per menit korban? (60 - 100 normal)' },
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
          n: 146,
          kind: 'me',
          text: 'memasang Non-Rebreather Mask pada korban untuk menopang pasokan oksigen sambil memantau monitor.',
        },
        {
          n: 147,
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
          n: 148,
          kind: 'me',
          text: 'memasang Non-Rebreather Mask pada korban lalu memantau ulang denyut nadi di monitor ECG.',
        },
        {
          n: 149,
          kind: 'do',
          text: 'Apakah korban kehilangan banyak darah sebelum nadinya memacu?',
          branches: [
            { label: 'Ya, banyak pendarahan → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Tidak ada pendarahan → Verapamil', to: 'drugs#verapamil' },
            { label: 'Belum boleh pakai ILS', to: 'abc#tanpa-ils' },
          ],
        },
        {
          kind: 'note',
          text: 'Kalau korban baru kehilangan banyak darah, jantungnya memacu justru karena volume darahnya kurang — yang dibutuhkan cairan pengganti, bukan obat penurun denyut. Verapamil baru tepat kalau nadi tinggi tanpa riwayat pendarahan, misalnya sakit kepala berat.',
        },
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
          text: 'Terlihat petugas mengambil AED dari dalam ambulans lalu kembali ke sisi korban.',
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
          text: 'Berhenti di tengah bukan pilihan — itu menggantung buat lawan RP. Kalau B dan C tidak membaik dan kamu belum berizin ILS, urutannya: minta unit berizin, lalu kalau tidak ada, transport.',
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
