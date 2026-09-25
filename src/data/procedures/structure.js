// Kebakaran Bangunan — dari [GUIDE] STRUCTURE FIRE PROCEDURES (Caitlin Swenchjaeger).
//
// Komunikasi di lokasi pindah ke Fireground Frequency (WT 917), kanal /wt. Gaya
// bicaranya santai seperti ngobrol lewat walkie-talkie, bukan bahasa radio formal /r.
// Fire Truck belum punya unit di server, jadi semua tugasnya di-RP-kan dengan
// Fire Engine — sesuai catatan di panduan aslinya.
//
// Empat bagian di panduan aslinya cuma disebut judulnya tanpa RP: forcible entry,
// ventilasi, pemeriksaan awal korban, dan terminasi. Semuanya ditulis di sini
// dari praktik pemadaman nyata, begitu juga langkah size-up keliling bangunan, cek tekanan
// SCBA, dan thermal imaging saat overhaul.

export default {
  id: 'structure',
  group: 'pemadam',
  name: 'Kebakaran Bangunan',
  blurb: 'Structure fire dari dispatch sampai RTB: size-up, fire attack, search & rescue, overhaul.',
  sections: [
    {
      id: 'respon',
      name: 'Dispatch & berangkat',
      steps: [
        {
          kind: 'note',
          text: 'Pahami info awal dari dispatch dulu: lokasi, jenis bangunan, kondisi asap/api, kemungkinan korban, dan unit pendukung yang ikut. Respon Code 3.',
        },
        {
          kind: 'me',
          text: 'mengenakan turnout gear lengkap lalu memeriksa gauge tabung SCBA sebelum naik ke unit.',
        },
        {
          kind: 'do',
          text: 'Berapa tekanan udara yang tertera pada gauge SCBA? (penuh / di bawah setengah)',
        },
        {
          kind: 'note',
          text: 'Tabung di bawah setengah diganti sebelum berangkat — udara itulah batas waktumu di dalam bangunan.',
        },
        {
          kind: 'radio',
          label: 'Berangkat',
          text: '~ Status-5e, 10-97 CODE-3 to structure fire, 10-20 Grove Street.',
        },
      ],
    },
    {
      id: 'fireground',
      name: 'Pindah ke Fireground Frequency',
      steps: [
        {
          kind: 'note',
          text: 'Semua komunikasi di lokasi pindah ke WT 917, supaya radio dispatch tidak penuh dan koordinasi di lapangan lebih cepat.',
        },
        {
          kind: 'radio',
          label: 'IC ke semua unit',
          text: 'Fire Alrik to all units on Grove Street structure fire scene, switch to Fireground Frequency 917.',
        },
        { kind: 'wt', label: 'Masuk WT', text: 'Udah masuk 917 ya, standby.' },
      ],
    },
    {
      id: 'size-up',
      name: 'Tiba & size-up',
      steps: [
        {
          kind: 'radio',
          label: 'Sampai lokasi',
          text: '~ Status-6 on Grove Street scene, working structure fire.',
        },
        {
          kind: 'note',
          text: 'Size-up dilakukan SEBELUM masuk bangunan, dan dilaporkan sedetail mungkin lewat WT.',
        },
        {
          kind: 'me',
          text: 'berjalan mengitari bangunan untuk melihat keempat sisinya sebelum menentukan strategi.',
        },
        {
          kind: 'do',
          text: 'Bagaimana kondisi api dan asap yang terlihat? (ringan / sedang / berat, dari lantai berapa)',
        },
        { kind: 'do', text: 'Apakah ada tanda korban masih berada di dalam bangunan?' },
        {
          kind: 'wt',
          label: 'Laporan size-up',
          text: 'Udah di lokasi. Rumah 2 lantai, asap tebal keluar dari lantai 2, kayaknya masih ada orang di dalam. Kita langsung serang apinya.',
        },
        {
          kind: 'note',
          text: 'Pilih strategi: Offensive (masuk dan padamkan dari dalam, kalau masih aman), Defensive (dari luar saja, kalau api besar atau bangunan berisiko runtuh), Transitional (kendalikan dari luar dulu, baru masuk). Kalau ada korban, penyelamatan didahulukan.',
        },
        {
          kind: 'radio',
          label: 'Ada korban → minta bantuan',
          text: '~ to OCD. Requesting 10-70 additional unit at 10-20 Grove Street, possible victim trapped inside.',
        },
      ],
    },
    {
      id: 'scene-control',
      name: 'Amankan area',
      steps: [
        {
          kind: 'me',
          text: 'memasang garis pembatas di sekitar bangunan lalu mengarahkan warga menjauh dari area berbahaya.',
        },
        { kind: 'shout', text: 'Semua mundur dari bangunan! Area ini berbahaya!' },
        {
          kind: 'me',
          text: 'memeriksa sekeliling bangunan untuk mencari kabel listrik yang putus atau bagian struktur yang mulai retak.',
        },
        {
          kind: 'note',
          text: 'Kalau warga tidak bisa dikendalikan, minta PD/SD lewat radio departemen.',
        },
        {
          kind: 'deptradio',
          label: 'Minta PD/SD',
          text: 'Fire @ to LSPD/LSSD. Requesting units for scene control at 10-20 Grove Street structure fire.',
        },
      ],
    },
    {
      id: 'suplai-air',
      name: 'Suplai air',
      steps: [
        {
          kind: 'note',
          text: 'Kalau ada beberapa hydrant, pilih yang bonnet-nya biru atau hijau — debitnya paling besar.',
          branches: [{ label: 'Kode warna hydrant', to: 'hydrant#cat' }],
        },
        { kind: 'me', text: 'mengambil hydrant wrench lalu membuka hydrant terdekat.' },
        {
          kind: 'me',
          text: 'menarik supply hose dari hydrant ke arah Fire Engine lalu menyambungkannya ke intake pompa.',
        },
        { kind: 'me', text: 'membuka valve secara perlahan.' },
        { kind: 'note', text: 'Kalau tidak ada hydrant di dekat lokasi:' },
        {
          kind: 'me',
          text: 'memeriksa indikator tekanan pada panel, lalu mengaktifkan internal water tank dengan menekan toggle switch utama, memastikan air masuk ke fire pump dengan normal.',
        },
      ],
    },
    {
      id: 'hose-line',
      name: 'Tarik hose line',
      steps: [
        {
          kind: 'me',
          text: 'mengambil hose line dari apparatus, lalu melakukan flaking untuk merapikan jalur selang menuju entry point.',
        },
        {
          kind: 'me',
          text: 'menarik hose line secara bertahap sambil memastikan tidak ada lilitan, tersangkut, atau tekukan yang menghambat aliran.',
        },
        {
          kind: 'me',
          text: 'menyambungkan nozzle ke coupling dan mengencangkan pengunci hingga terpasang sempurna.',
        },
        {
          kind: 'do',
          text: 'Hose line terpasang rapi, tidak ada kebocoran, dan siap dialiri air bertekanan.',
        },
        {
          kind: 'me',
          label: 'engineer',
          text: 'mengoperasikan pump panel untuk mengalirkan air bertekanan ke hose line.',
        },
      ],
    },
    {
      id: 'door-check',
      name: 'Cek pintu',
      steps: [
        {
          kind: 'me',
          text: 'mendekati pintu dengan posisi membungkuk, lalu menyentuh bagian atas pintu menggunakan punggung tangan.',
        },
        {
          kind: 'do',
          text: 'Apakah pintu terasa panas?',
          branches: [{ label: 'Pintu terkunci → forcible entry', to: 'structure#forcible-entry' }],
        },
        {
          kind: 'note',
          text: 'Pintu panas berarti api tepat di baliknya. Jangan dibuka lebar sekaligus — udara yang tiba-tiba masuk bisa memicu api menyembur (backdraft). Buka sedikit, semprot dulu, baru masuk.',
        },
        {
          kind: 'me',
          text: 'mengarahkan tangan ke depan sebagai isyarat tim untuk melakukan entry ke dalam bangunan.',
        },
      ],
    },
    {
      id: 'forcible-entry',
      name: 'Forcible entry',
      steps: [
        {
          kind: 'note',
          text: 'Coba buka dulu sebelum dibobol — pintu yang ternyata tidak terkunci tidak perlu dirusak.',
        },
        {
          kind: 'me',
          text: 'mencoba memutar gagang pintu untuk memastikan pintu benar-benar terkunci.',
        },
        { kind: 'do', text: 'Apakah pintu terkunci?' },
        {
          kind: 'me',
          text: 'mengambil Halligan Bar dan kapak dari kompartemen Fire Engine lalu membawanya ke pintu.',
        },
        {
          kind: 'me',
          text: 'menyelipkan ujung Halligan Bar ke celah antara pintu dan kusen, tepat di dekat kuncinya.',
        },
        {
          kind: 'me',
          text: 'memukul pangkal Halligan Bar dengan kapak hingga ujungnya masuk lebih dalam, lalu mencongkelnya ke arah luar.',
        },
        { kind: 'do', text: 'Pintu terbuka setelah dicongkel dengan Halligan Bar.' },
      ],
    },
    {
      id: 'masuk',
      name: 'Masuk & bergerak ke titik api',
      steps: [
        {
          kind: 'me',
          text: 'mengambil crouch position di sisi pintu, satu tangan menggenggam nozzle mengarah ke depan, tangan kiri berpegangan pada dinding.',
        },
        { kind: 'me', text: 'bergerak perlahan menyusuri dinding sambil berjalan.' },
        {
          kind: 'me',
          text: 'memberi isyarat ke tim di belakang agar hose line tetap terkontrol.',
        },
      ],
    },
    {
      id: 'pemadaman',
      name: 'Pemadaman',
      steps: [
        {
          kind: 'me',
          text: 'mengambil posisi tubuh merendah, lalu mengarahkan nozzle ke dasar api untuk memutus segitiga api pada sumber pembakaran.',
        },
        {
          kind: 'me',
          text: 'membuka aliran nozzle secara terkontrol, melakukan short burst untuk menghindari dorongan panas berlebihan ke dalam ruangan.',
        },
        {
          kind: 'me',
          text: 'melakukan sweeping dari kiri ke kanan untuk menjangkau seluruh area pembakaran yang terlihat.',
        },
        {
          kind: 'me',
          text: 'mengubah pola semprotan dari narrow stream ke fog pattern untuk mendinginkan area sekitar dan menurunkan suhu ruangan.',
        },
        {
          kind: 'do',
          text: 'Intensitas api mulai berkurang, namun masih ada hotspot di beberapa titik.',
          branches: [{ label: 'Asap tebal → ventilasi', to: 'structure#ventilasi' }],
        },
        {
          kind: 'me',
          text: 'melanjutkan suppressive flow ke titik api utama sambil menjaga posisi rendah untuk menghindari heat layer.',
        },
        { kind: 'do', text: 'Api mulai kehilangan intensitas dan menyusut secara perlahan.' },
      ],
    },
    {
      id: 'ventilasi',
      name: 'Ventilasi',
      steps: [
        {
          kind: 'note',
          text: 'Buka ventilasi hanya setelah hose line siap dan tim nozzle memberi tanda. Membuka jendela sebelum air siap justru memberi api pasokan oksigen baru.',
        },
        {
          kind: 'wt',
          label: 'Minta aba-aba',
          text: 'Jendela lantai 2 udah siap dipecah, nunggu aba-aba dari tim nozzle ya.',
        },
        {
          kind: 'me',
          text: 'berdiri di samping jendela, bukan di depannya, lalu memecahkan kacanya dengan kapak.',
        },
        {
          kind: 'me',
          text: 'membersihkan sisa pecahan kaca di bingkai jendela dengan gagang kapak.',
        },
        {
          kind: 'do',
          text: 'Asap tebal mulai keluar dari jendela dan jarak pandang di dalam ruangan membaik.',
        },
      ],
    },
    {
      id: 'knockdown',
      name: 'Knockdown',
      steps: [
        {
          kind: 'me',
          text: 'melakukan sweeping perlahan ke area api yang tersisa sambil menurunkan intensitas aliran untuk mengontrol hotspot.',
        },
        {
          kind: 'me',
          text: 'terus menyemprot hingga api benar-benar melemah dan tidak lagi membesar.',
        },
        {
          kind: 'wt',
          label: 'Lapor knockdown',
          text: 'Api di lantai 2 udah jinak, lanjut nyari korban.',
        },
      ],
    },
    {
      id: 'search',
      name: 'Primary search',
      steps: [
        {
          kind: 'me',
          text: 'masuk ke dalam struktur dalam posisi crouch, menjaga tubuh tetap rendah untuk menghindari heat layer sambil mengikuti dinding sebagai reference point.',
        },
        {
          kind: 'me',
          text: 'melakukan systematic search dengan meraba sepanjang dinding, pintu, dan objek di sekitar untuk memastikan tidak ada korban tersembunyi.',
        },
        {
          kind: 'me',
          text: 'memeriksa kolong tempat tidur, lemari, dan kamar mandi — tempat korban biasa bersembunyi dari asap.',
        },
        { kind: 'me', text: 'berhenti sejenak untuk mendengarkan suara atau respons dari dalam ruangan.' },
        {
          kind: 'shout',
          text: 'Fire Department! If anyone is inside, make yourself known!',
        },
        {
          kind: 'do',
          text: 'Apakah terdengar suara?',
          branches: [{ label: 'Ada korban', to: 'structure#korban' }],
        },
      ],
    },
    {
      id: 'korban',
      name: 'Korban ditemukan',
      steps: [
        {
          kind: 'me',
          text: 'meraba bentuk tubuh korban yang tergeletak di lantai lalu menahannya agar tidak bergeser.',
        },
        {
          kind: 'wt',
          label: 'Lapor korban',
          text: 'Nemu satu korban di lantai 2, lagi saya bawa keluar.',
        },
        {
          kind: 'note',
          text: 'Pemeriksaan di dalam dibuat singkat — cukup untuk menentukan cara evakuasi. Penanganan lengkap dilakukan di luar zona bahaya.',
        },
        { kind: 'me', text: 'mengguncang bahu korban sambil memanggilnya dengan suara keras.' },
        { kind: 'shout', text: 'Pak! Bu! Bisa dengar saya?' },
        { kind: 'do', text: 'Bagaimana respons korban? (A / V / P / U)' },
        {
          kind: 'me',
          text: 'mendekatkan wajah ke mulut korban sambil melihat dadanya, memastikan korban masih bernapas.',
        },
        { kind: 'do', text: 'Apakah korban masih bernapas?' },
      ],
    },
    {
      id: 'evakuasi',
      name: 'Evakuasi korban',
      steps: [
        { kind: 'note', text: 'Underarm drag — korban tidak sadar, ruang sempit, jarak pandang rendah.' },
        {
          kind: 'me',
          text: 'berlutut di samping korban, memasukkan kedua tangan ke bawah ketiak korban lalu mengunci grip pada lengan atasnya.',
        },
        { kind: 'me', text: 'menarik korban sambil mengikuti hose line menuju pintu keluar.' },
        { kind: 'note', text: 'Shoulder drag — korban tidak sadar dan jarak ke pintu keluar lebih jauh.' },
        {
          kind: 'me',
          text: 'meraih bahu dan kerah korban, lalu menarik tubuhnya ke belakang sambil bergerak mundur mengikuti hose line.',
        },
        {
          kind: 'me',
          text: 'membaringkan korban di area aman di luar bangunan lalu menyerahkannya ke tim RA.',
        },
        {
          kind: 'note',
          text: 'Korban kebakaran hampir selalu menghirup asap. Pasang NRB walau napasnya terlihat normal — keracunan asap tidak selalu kelihatan dari luar.',
          branches: [
            { label: 'Penanganan korban', to: 'field#response' },
            { label: 'Pasang NRB', to: 'abc#breathing-nrb' },
            { label: 'Luka bakar', to: 'wounds#luka-bakar-ringan' },
          ],
        },
      ],
    },
    {
      id: 'overhaul',
      name: 'Overhaul',
      steps: [
        {
          kind: 'note',
          text: 'Api utama sudah padam, tapi bara bisa bersembunyi di balik dinding, plafon, dan puing lalu menyala lagi.',
        },
        {
          kind: 'me',
          text: 'mengarahkan thermal imaging camera ke dinding dan plafon untuk mencari titik panas yang tidak terlihat.',
        },
        {
          kind: 'me',
          text: 'menggunakan pike pole untuk memeriksa dan menarik bagian plafon yang terlihat hangus.',
        },
        { kind: 'do', text: 'Apakah ada bara api yang tersisa?' },
        {
          kind: 'me',
          text: 'mengarahkan hose line dengan aliran rendah ke area yang masih panas.',
        },
      ],
    },
    {
      id: 'terminasi',
      name: 'Terminasi & RTB',
      steps: [
        {
          kind: 'me',
          text: 'melakukan pengecekan akhir ke seluruh ruangan, memastikan tidak ada asap, bara, maupun titik panas yang tersisa.',
        },
        { kind: 'do', text: 'Apakah seluruh area sudah dinyatakan aman?' },
        {
          kind: 'me',
          text: 'menggulung hose line, lalu mengembalikan nozzle dan forcible entry tools ke kompartemen Fire Engine.',
        },
        {
          kind: 'me',
          label: 'engineer',
          text: 'memeriksa sisa air di tangki dan kondisi pump panel untuk kesiapan panggilan berikutnya.',
        },
        {
          kind: 'wt',
          label: 'Tutup fireground',
          text: 'Api udah aman semua, kita keluar dari 917 ya. Makasih semuanya.',
        },
        {
          kind: 'radio',
          label: 'RTB',
          text: '~ reporting CODE-4 and 10-99 from Grove Street structure fire, now RTB to 10-20 DFS.',
        },
      ],
    },
  ],
}
