// ABC — dari "ABC PROCEDURE" di LSFD RP.md

export default {
  id: 'abc',
  group: 'tkp',
  name: 'ABC',
  blurb: 'Airway, Breathing, Circulation. Termasuk CPR dan AED kalau jantung berhenti.',
  sections: [
    {
      id: 'airway-headtilt',
      name: 'Airway — Head-Tilt Chin-Lift (umum)',
      steps: [
        { n: 91, kind: 'me', text: 'menempatkan diri di sisi kepala korban, memastikan posisi aman dan stabil.' },
        { n: 92, kind: 'me', text: 'meletakkan tangan kanan di atas dahi korban, lalu tangan kiri di bagian dagu korban.' },
        {
          n: 93,
          kind: 'me',
          text: 'menekan dahi korban secara perlahan sambil menarik dagu ke atas, melakukan head-tilt chin-lift untuk membuka jalan napas.',
        },
        {
          n: 94,
          kind: 'me',
          text: 'memastikan kepala tidak tertarik terlalu jauh ke belakang agar tidak menyebabkan cedera tambahan.',
        },
        { n: 95, kind: 'me', text: 'membuka sedikit mulut korban setelah airway terbuka.' },
        { n: 96, kind: 'me', text: 'mengambil flashlight dari ILS Bag lalu menyorot bagian dalam mulut korban.' },
        {
          n: 97,
          kind: 'do',
          text: 'Apakah ada halangan yang menggangu airway korban?',
          branches: [
            { label: 'Tidak ada → Breathing', to: 'abc#breathing-ecg' },
            { label: 'Ada → keluarkan dulu', to: 'abc#airway-headtilt' },
          ],
        },
        { kind: 'note', text: 'Kalau ada halangan:' },
        { n: 98, kind: 'me', text: 'mengambil tweezer dari ILS Bag, memastikan alat dalam kondisi bersih.' },
        {
          n: 99,
          kind: 'me',
          text: 'membuka mulut korban lebih lebar dan mencoba menjepit objek tersebut dengan hati-hati.',
        },
        {
          n: 100,
          kind: 'me',
          text: 'menarik objek keluar dari airway dengan gerakan perlahan agar tidak mendorongnya lebih dalam.',
        },
        { id: 'airway-clear', n: 101, kind: 'do', text: 'Terlihat objek telah keluar dari airway korban.' },
        {
          id: 'airway-no-remains',
          n: 102,
          kind: 'me',
          text: 'memastikan tidak ada sisa-sisa kecil yang tertinggal di airway korban.',
        },
        {
          id: 'airway-clean-mouth',
          n: 103,
          kind: 'me',
          text: 'membersihkan area mulut korban menggunakan gauze sterile dari ILS Bag.',
        },
      ],
    },
    {
      id: 'airway-jawthrust',
      name: 'Airway — Jaw-Thrust (cedera kepala)',
      steps: [
        { n: 104, kind: 'me', text: 'menempatkan diri tepat di atas kepala korban untuk melakukan jaw-thrust maneuver.' },
        {
          n: 105,
          kind: 'me',
          text: 'meletakkan kedua tangan di sisi rahang bawah korban, tepat di belakang sudut rahang.',
        },
        {
          n: 106,
          kind: 'me',
          text: 'mendorong rahang korban ke atas dengan stabil, membuka airway tanpa memberikan tekanan pada leher.',
        },
        { n: 107, kind: 'me', text: 'menggunakan kedua ibu jari untuk membuka mulut korban dengan perlahan.' },
        { n: 108, kind: 'me', text: 'mengambil flashlight dari ILS Bag lalu menyorot ke bagian dalam mulut korban.' },
        { n: 109, kind: 'do', text: 'Apakah terlihat ada objek yang menghalangi jalur napas korban?' },
        { kind: 'note', text: 'Kalau ada halangan:' },
        { n: 110, kind: 'me', text: 'mengambil tweezer dari ILS Bag dan membuka mulut korban lebih lebar lagi.' },
        { n: 111, kind: 'me', text: 'menggunakan tweezer untuk menjepit objek yang berada di airway secara hati-hati.' },
        {
          n: 112,
          kind: 'me',
          text: 'menarik objek keluar sambil tetap melakukan jaw-thrust agar airway tetap terbuka.',
        },
        { ref: 'airway-clear' },
        { ref: 'airway-no-remains' },
        { ref: 'airway-clean-mouth' },
      ],
    },
    {
      id: 'breathing-ecg',
      name: 'Breathing — pakai ECG (torso bersih)',
      steps: [
        { n: 113, kind: 'me', text: 'menarik perangkat ECG mendekat, lalu membuka panel sensor 12-lead.' },
        {
          n: 114,
          kind: 'me',
          text: 'mulai menempelkan elektroda satu per satu di area dada korban sesuai posisi standar.',
        },
        {
          n: 115,
          kind: 'me',
          text: 'memastikan semua lead menempel dengan baik, lalu menghubungkan kabel ECG ke unit monitor.',
        },
        { n: 116, kind: 'me', text: 'menyalakan perangkat ECG dan mengatur mode monitor.' },
        { n: 117, kind: 'me', text: 'memperhatikan tampilan monitor ECG yang menampilkan respiratory rate korban.' },
        {
          n: 118,
          kind: 'do',
          text: 'Berapa laju pernafasan yang terbaca pada monitor ECG? (12 - 20 Normal)',
          branches: [
            { label: 'Di bawah 12 → Simple Face Mask', to: 'abc#breathing-simple-face' },
            { label: 'Di atas 12 → Nasal Cannula', to: 'abc#breathing-nasal-cannula' },
            { label: 'Abnormal/ekstrem → NRB', to: 'abc#breathing-nrb' },
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
          text: 'mendekatkan telinganya ke atas mulut korban sambil melihat ke arah dada korban lalu memperkirakan laju pernapasan korban.',
        },
        { kind: 'do', text: 'Berapa jumlah pernapasan korban? (12 - 20 Normal)' },
      ],
    },
    {
      id: 'breathing-intubation',
      name: 'Breathing — airway berdarah terus (intubasi)',
      steps: [
        { ref: 'oxy-walk' },
        { ref: 'oxy-take' },
        { ref: 'oxy-place' },
        { kind: 'me', text: 'memposisikan kepala korban ke posisi sniffing untuk membuka jalan napas.' },
        {
          kind: 'me',
          text: 'mengambil laryngoscope lalu memasukkannya perlahan ke dalam mulut korban untuk memvisualisasikan pita suara.',
        },
        { kind: 'do', text: 'Pita suara korban mulai terlihat dengan bantuan cahaya laryngoscope.' },
        {
          kind: 'me',
          text: 'memasukkan endotracheal tube secara perlahan melewati pita suara menuju trakea korban.',
        },
        {
          kind: 'me',
          text: 'mengembangkan cuff pada ET tube untuk mengamankan posisi dan mencegah kebocoran udara.',
        },
        { kind: 'me', text: 'menyambungkan ET tube ke selang oksigen dari oxygen outlet di samping korban.' },
        { kind: 'do', text: 'Aliran oksigen mengalir dengan baik melalui ET tube.' },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'breathing-simple-face',
      name: 'Breathing — Simple Face Mask (di bawah 12)',
      steps: [
        { id: 'oxy-walk', n: 119, kind: 'me', text: 'berdiri dan berjalan cepat menuju unit kendaraan.' },
        {
          id: 'oxy-take',
          n: 120,
          kind: 'me',
          text: 'mengambil oxygen outlet dari kompartemen unit dan membawanya menuju korban.',
        },
        { id: 'oxy-place', n: 121, kind: 'me', text: 'meletakkan oxygen outlet di samping korban.' },
        { n: 122, kind: 'me', text: 'mengambil Simple Face Mask dari ILS Bag.' },
        { n: 123, kind: 'me', text: 'menyambungkan selang ke oxygen outlet dan mengatur aliran oksigen ke 5–10 L/min.' },
        {
          n: 124,
          kind: 'me',
          text: 'menempatkan masker pada wajah korban, menutupi hidung dan mulut dengan rapat.',
        },
        { n: 125, kind: 'me', text: 'mengaitkan tali masker ke belakang kepala korban agar stabil.' },
        {
          id: 'breathing-recheck',
          n: 137,
          kind: 'do',
          text: 'Apakah laju pernapasan korban terlihat membaik? (12 – 20 Normal)',
        },
      ],
    },
    {
      id: 'breathing-nasal-cannula',
      name: 'Breathing — Nasal Cannula (di atas 12)',
      steps: [
        { ref: 'oxy-walk' },
        {
          id: 'oxy-take-do',
          n: 120,
          kind: 'do',
          text: 'Terlihat petugas sedang membuka kompartemen oksigen kemudian mengambil oxygen outlet beserta regulator.',
        },
        {
          id: 'oxy-carry',
          n: 121,
          kind: 'me',
          text: 'sambil berjalan cepat dengan membawa oxygen outlet kembali ke sisi korban dan memasangnya pada perangkat oksigen yang akan digunakan.',
        },
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
      name: 'Breathing — Non-Rebreather Mask (abnormal/ekstrem)',
      steps: [
        { ref: 'oxy-walk' },
        { ref: 'oxy-take-do' },
        { ref: 'oxy-carry' },
        {
          n: 132,
          kind: 'me',
          text: 'mengambil Non-Rebreather Mask dari ILS Bag dan memastikan reservoir bag telah mengembang.',
        },
        {
          n: 133,
          kind: 'me',
          text: 'menghubungkan selang ke oxygen outlet dan mengatur aliran oksigen ke 10–15 L/min.',
        },
        { n: 134, kind: 'me', text: 'menempatkan NRB mask pada wajah korban dengan posisi rapat.' },
        { n: 135, kind: 'me', text: 'memastikan katup satu arah bekerja dan reservoir bag tetap terisi.' },
        { n: 136, kind: 'me', text: 'mengaitkan tali ke belakang kepala korban agar mask tidak bergeser.' },
        { ref: 'breathing-recheck' },
      ],
    },
    {
      id: 'circulation-ecg',
      name: 'Circulation — pakai ECG (torso bersih)',
      steps: [
        {
          n: 138,
          kind: 'me',
          text: 'menatap ke layar ECG, memantau grafik denyut jantung serta indikator heart rate.',
        },
        {
          n: 139,
          kind: 'do',
          text: 'Berapa denyut nadi per menit yang terbaca pada monitor ECG? (60 - 100 Normal)',
          branches: [
            { label: 'Di atas 100 → pakai NRB juga', to: 'abc#breathing-nrb' },
            { label: 'Tidak ada denyut → CPR', to: 'abc#cpr' },
            { label: 'Menurun ekstrem → Atropine', to: 'drugs#atropine' },
          ],
        },
        { kind: 'note', text: 'Di atas 100 pakai NRB, karena korban pasti sesak napas juga.' },
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
      id: 'cpr',
      name: 'CPR (torso tanpa gejala abnormal)',
      steps: [
        { n: 140, kind: 'me', text: 'mengeluarkan BVM dari dalam ILS Bag.' },
        { n: 141, kind: 'me', text: 'memasangkan BVM di area hidung dan mulut korban dengan rapat.' },
        { n: 142, kind: 'me', text: 'memastikan seal mask tertutup sempurna.' },
        { n: 143, kind: 'me', text: 'meletakkan kedua telapak tangan di atas sternum korban.' },
        { kind: 'anim', text: '.cpr' },
        {
          n: 144,
          kind: 'me',
          text: 'mulai memberikan 30 kompresi dada secara ritmis, menekan kuat dan dalam dengan kecepatan stabil.',
        },
        {
          n: 145,
          kind: 'do',
          text: 'Apakah ada perubahan pada ritme ECG atau respons korban? (60 - 100 Normal)',
          branches: [{ label: 'Belum berhasil → AED', to: 'abc#cardiac-arrest' }],
        },
      ],
    },
    {
      id: 'cardiac-arrest',
      name: 'Cardiac Arrest / AED',
      steps: [
        { kind: 'note', text: 'Dipakai kalau CPR belum berhasil, atau ada gejala abnormal di torso.' },
        { n: 146, kind: 'me', text: 'berlari menuju unit kendaraan lalu membuka kompartemen medis.' },
        {
          n: 147,
          kind: 'do',
          text: 'Terlihat petugas mengambil AED dari dalam ambulans lalu kembali ke sisi korban.',
        },
        { n: 148, kind: 'me', text: 'meletakkan AED di samping korban dan menyalakannya.' },
        { n: 149, kind: 'me', text: 'membuka baju bagian dada korban hingga terlihat jelas area sternum.' },
        { n: 150, kind: 'me', text: 'memastikan permukaan dada korban kering.' },
        {
          n: 151,
          kind: 'me',
          text: 'meletakkan pads AED di atas dada korban lalu menekan tombol shock pada AED.',
        },
        { n: 152, kind: 'do', text: 'AED otomatis akan memberikan shock.' },
        { n: 153, kind: 'me', text: 'melihat monitor ECG dan mendapati ritme jantung mulai stabil kembali.' },
        {
          kind: 'note',
          text: 'Kalau masih belum berhasil, lanjut ILS: Atropine, atau Epinephrine kalau jantung sudah berhenti total.',
          branches: [
            { label: 'Atropine', to: 'drugs#atropine' },
            { label: 'Epinephrine', to: 'drugs#epinephrine' },
          ],
        },
      ],
    },
  ],
}
