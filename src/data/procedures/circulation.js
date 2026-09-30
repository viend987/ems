// CIRCULATION — dari "CIRCULATION" di draft.md.

export default {
  id: 'circulation',
  group: 'tkp',
  name: 'Circulation',
  nameEn: 'Circulation',
  blurb: 'Pemeriksaan denyut nadi, penanganan syok, resusitasi (CPR & AED), dan cek ulang.',
  blurbEn:
    'Checking the pulse, treating shock, resuscitation (CPR & AED), and the re-check.',
  sections: [
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
            { label: '60–100 → Cek Ulang', to: 'circulation#circulation-normal' },
            { label: 'Di bawah 60 → nadi melambat', to: 'circulation#circulation-bradi' },
            { label: 'Di atas 100 → nadi memacu', to: 'circulation#circulation-taki' },
            { label: 'Tidak ada denyut → CPR', to: 'circulation#cpr' },
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
            { label: '60–100 → Cek Ulang', to: 'circulation#circulation-normal' },
            { label: 'Di bawah 60', to: 'circulation#circulation-bradi' },
            { label: 'Di atas 100 dengan luka torso', to: 'circulation#circulation-torso' },
            { label: 'Tidak ada denyut → CPR', to: 'circulation#cpr' },
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
            { label: 'Belum boleh ILS', to: 'circulation#tanpa-ils' },
            { label: 'Muat korban', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'circulation-normal',
      name: 'Cek Ulang (nadi 60–100, atau kembali normal)',
      steps: [
        { kind: 'note', text: 'A, B, dan C sudah beres.' },
        {
          kind: 'note',
          text: 'Kalau kasus ini patah tulang — close maupun open fracture, sudah ketahuan sejak awal di Penanganan Korban — bidainya wajib dipasang sekarang. Bukan pilihan, dan bukan sesuatu yang "ditemukan" di cek ulang ini.',
          branches: [{ label: 'Penanganan patah tulang', to: 'fracture#triangular' }],
        },
        {
          kind: 'note',
          text: 'Sisanya baru cek ulang sungguhan: luka kedua yang belum ketahuan, sering luput waktu perhatian masih tertuju ke luka pertama.',
        },
        {
          n: 148,
          kind: 'me',
          text: 'melakukan palpasi menyeluruh dari kepala hingga kaki korban, memeriksa apakah ada luka tambahan yang belum tertangani.',
        },
        {
          n: 149,
          kind: 'do',
          text: 'Apakah ditemukan luka tambahan pada tubuh korban? (luka lecet / memar / tidak ada)',
          branches: [
            { label: 'Luka lecet', to: 'wounds#graze' },
            { label: 'Memar', to: 'wounds#bruise' },
            { label: 'Tidak ada → muat korban', to: 'load#load' },
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
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        { ref: 'nrb-take' },
        { ref: 'nrb-flow' },
        { ref: 'nrb-place' },
        { ref: 'nrb-valve' },
        { ref: 'nrb-strap' },
        {
          n: 146,
          kind: 'do',
          text: 'Apakah denyut nadi korban naik setelah oksigen terpasang? (60 - 100 Normal)',
          branches: [
            { label: 'Naik → Cek Ulang', to: 'circulation#circulation-normal' },
            { label: 'Masih di bawah 60 → Atropine', to: 'drugs#atropine' },
            { label: 'Belum boleh pakai ILS', to: 'circulation#tanpa-ils' },
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
          text: 'Nadi di atas 100 hampir selalu disertai sesak, jadi pasang NRB lebih dulu dan pantau ulang di monitor ECG. Kalau nadinya belum turun juga, baru penyebabnya menentukan obatnya — dan dua penyebab itu penanganannya berlawanan.',
        },
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        { ref: 'nrb-take' },
        { ref: 'nrb-flow' },
        { ref: 'nrb-place' },
        { ref: 'nrb-valve' },
        { ref: 'nrb-strap' },
        {
          n: 147,
          kind: 'do',
          text: 'Apakah denyut nadi korban turun setelah NRB terpasang? (60 - 100 Normal)',
          branches: [{ label: 'Turun → Cek Ulang', to: 'circulation#circulation-normal' }],
        },
        {
          kind: 'note',
          text: 'Kalau masih di atas 100 walau oksigen sudah terpasang, baru cari penyebabnya.',
        },
        {
          kind: 'do',
          text: 'Apakah korban kehilangan banyak darah sebelum nadinya memacu?',
          branches: [
            { label: 'Ya, banyak pendarahan → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Tidak ada pendarahan → Verapamil', to: 'drugs#verapamil' },
            { label: 'Tanpa obat → posisi syok', to: 'circulation#circulation-syok' },
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
          text: 'Kalau korban kehilangan darah dan tidak ada cairan pengganti, darah yang tersisa bisa diarahkan ke tempat yang paling butuh. Ini yang dikerjakan unit BLS sambil menunggu atau jalan.',
        },
        {
          kind: 'me',
          text: 'membaringkan korban, mengganjal kedua tungkainya setinggi 30cm, lalu menyelimutinya dengan foam blanket.',
        },
        { kind: 'me', text: 'memantau ulang denyut nadi dan napas korban setiap beberapa saat.' },
        {
          kind: 'do',
          text: 'Apakah denyut nadi korban mulai melambat mendekati normal?',
          branches: [
            { label: 'Membaik → muat korban', to: 'load#load' },
            { label: 'Belum → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Belum boleh ILS', to: 'circulation#tanpa-ils' },
          ],
        },
        { kind: 'note', text: 'Jangan beri korban makan atau minum apa pun.' },
      ],
    },
    {
      id: 'cpr',
      name: 'CPR (tidak ada denyut, torso tanpa gejala abnormal)',
      steps: [
        {
          n: 150,
          kind: 'me',
          text: 'mengeluarkan BVM dari ILS Bag lalu memasangkannya di area hidung dan mulut korban dengan rapat.',
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
            { label: 'Kembali → Cek Ulang', to: 'circulation#circulation-normal' },
            { label: 'Belum → AED', to: 'circulation#aed' },
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
            { label: 'Kembali → Cek Ulang', to: 'circulation#circulation-normal' },
            { label: 'Belum → Epinephrine', to: 'drugs#epinephrine' },
            { label: 'Belum boleh pakai ILS', to: 'circulation#tanpa-ils' },
          ],
        },
      ],
    },
    {
      id: 'meninggal',
      name: 'Kalau korban tidak tertolong',
      steps: [
        {
          kind: 'note',
          text: 'Dipakai kalau CPR, AED, dan Epinephrine semua sudah dicoba dan nadi tidak pernah kembali. Menyatakan waktu kematian biasanya disepakati dulu dengan pemain lain di scene sebelum RP ini jalan — bukan keputusan sepihak.',
        },
        {
          kind: 'me',
          text: 'menghentikan kompresi dan menatap monitor ECG sekali lagi, memastikan benar-benar tidak ada aktivitas jantung.',
        },
        { kind: 'do', text: 'Monitor menunjukkan garis datar, tidak ada aktivitas jantung sama sekali.' },
        {
          kind: 'me',
          text: 'melihat jam di radio lalu mencatat waktu kematian korban.',
        },
        {
          kind: 'note',
          text: 'Dua baris berikut buat menyampaikan ke orang di sekitar TKP — keluarga, saksi, atau rekan korban. Pilih salah satu, atau gabung sesuai situasinya.',
        },
        {
          kind: 'say',
          label: 'opsi 1',
          text: 'Kami sudah coba semua cara yang bisa dilakukan, tapi kondisinya memang sudah tidak tertolong. Saya turut berduka.',
        },
        {
          kind: 'say',
          label: 'opsi 2',
          text: 'Maaf, korban tidak bisa kami selamatkan. Kami turut berdukacita untuk keluarganya.',
        },
        {
          kind: 'me',
          text: 'menutup wajah korban dengan kain dari ILS Bag sambil menunggu unit Coroner tiba di lokasi.',
        },
        { ref: 'minta-coroner' },
        {
          kind: 'note',
          text: 'Lanjut ke penanganan pasca-kematian sesuai situasi di scene.',
          branches: [
            { label: 'RPLY versi ringkas', to: 'coroner#rply' },
            { label: 'Possible CK Scene', to: 'coroner#ck-scene' },
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
            { label: 'Napas sangat lambat → bantu dengan BVM', to: 'breathing#breathing-bvm' },
            { label: 'Nadi memacu → posisi syok', to: 'circulation#circulation-syok' },
            { label: 'Tidak sadar tapi bernapas → posisi pemulihan', to: 'breathing#posisi-pemulihan' },
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
