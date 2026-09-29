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
  blurb: 'Untuk event donor darah LSFD: tes golongan darah, skrining pendonor, pengambilan darah, dan transfusi saat operasi.',
  sections: [
    {
      id: 'golongan-darah',
      name: 'Tes golongan darah',
      steps: [
        {
          kind: 'note',
          text: 'Wajib sebelum donor maupun transfusi. Hasilnya dicatat supaya tidak perlu dites ulang lain kali.',
        },
        {
          kind: 'me',
          text: 'membersihkan ujung jari pasien dengan alcohol swab, menusuknya dengan blood lancet, lalu mengumpulkan sampel darah dengan pipet.',
        },
        {
          kind: 'me',
          text: 'meneteskan sampel ke kartu golongan darah, menambahkan empat reagen, dan mengaduknya perlahan agar tercampur.',
        },
        { kind: 'do', text: 'Sampel darah dan reagen yang cocok mulai terlihat menggumpal.' },
        { kind: 'do', text: 'Golongan darah apa yang bereaksi pada kartu? (A / B / AB / O)' },
        { kind: 'do', text: 'Apakah Rhesus golongan darah pasien? (Positive / Negative)' },
        {
          kind: 'me',
          text: 'mencatat hasil golongan darah di database lalu memberikan kartu kepada pasien.',
        },
      ],
    },
    {
      id: 'skrining-donor',
      name: 'Skrining sebelum donor',
      steps: [
        {
          kind: 'note',
          text: 'Donor hanya boleh kalau golongan darah sudah dites, tekanan darah normal, dan hemoglobin cukup. Kalau salah satunya tidak lolos, donor ditunda.',
          branches: [{ label: 'Belum tes golongan darah', to: 'blood#golongan-darah' }],
        },
        {
          kind: 'me',
          text: 'memasang manset tensimeter di lengan atas pendonor lalu mengukur tekanan darahnya.',
        },
        {
          kind: 'do',
          text: 'Berapa tekanan darah pendonor? (sistolik 90–180, diastolik 50–100 boleh donor)',
        },
        {
          kind: 'me',
          text: 'menusuk ujung jari pendonor dengan blood lancet lalu meneteskan sampelnya ke alat pengukur hemoglobin.',
        },
        { kind: 'do', text: 'Berapa kadar hemoglobin pendonor? (minimal 12.5 g/dL)' },
        {
          kind: 'do',
          text: 'Apakah pendonor sudah makan dan cukup minum dalam beberapa jam terakhir?',
        },
        {
          kind: 'note',
          text: 'Pendonor yang perutnya kosong gampang pingsan saat darahnya diambil. Kalau belum makan, suruh makan dan minum dulu.',
        },
      ],
    },
    {
      id: 'donor',
      name: 'Donor darah',
      steps: [
        {
          kind: 'me',
          text: 'mengikatkan tourniquet pada lengan atas pendonor lalu membersihkan area lengan dengan alcohol swab.',
        },
        {
          kind: 'me',
          text: 'menginjeksikan jarum 16 Gauge perlahan pada lengan pendonor, menyambungkan catheter, dan merekatkannya dengan medical tape.',
        },
        { kind: 'me', text: 'menyambungkan kantong darah pertama ke catheter lalu melepas tourniquet.' },
        { kind: 'do', text: 'Darah mulai mengalir mengisi kantong darah perlahan.' },
        { kind: 'do', text: '10 menit berlalu, kantong darah pertama sudah terisi penuh.' },
        {
          kind: 'me',
          text: 'melepas kantong darah pertama, mengikat ujung selangnya, lalu menyambungkan kantong darah kedua ke catheter.',
        },
        { kind: 'do', text: '10 menit berlalu, kantong darah kedua sudah terisi penuh.' },
        {
          kind: 'me',
          text: 'melepas kantong kedua, mencabut jarum dari lengan pendonor, dan menutup bekas tusukan dengan medical bandage.',
        },
        { kind: 'me', text: 'memberikan kedua kantong darah kepada perawat.' },
        { kind: 'note', text: 'Baris berikut RPLY — perawatnya tidak benar-benar ada.' },
        { kind: 'do', text: 'Perawat membawa kantong darah ke lab untuk diproses.' },
        { kind: 'me', text: 'mencatat informasi donor pada database pasien.' },
        {
          kind: 'say',
          label: 'setelah donor',
          text: 'Duduk dulu sebentar ya, minum air ini. Hari ini jangan angkat yang berat-berat dulu.',
        },
      ],
    },
    {
      id: 'transfusi',
      name: 'Transfusi saat operasi',
      steps: [
        {
          kind: 'note',
          text: 'Dipakai saat pasien kehilangan banyak darah di tengah operasi. Darah masuk lewat jalur IV, jadi IV harus sudah terpasang.',
          branches: [{ label: 'Pasang IV dulu', to: 'drugs#setup-iv' }],
        },
        {
          kind: 'me',
          text: 'memeriksa catatan medis pasien untuk mencari golongan darah yang dibutuhkan.',
        },
        {
          kind: 'do',
          text: 'Apakah golongan darah pasien sudah tercatat di database?',
          branches: [{ label: 'Belum → tes golongan darah', to: 'blood#golongan-darah' }],
        },
        {
          kind: 'note',
          text: 'Kalau pasien kritis dan tidak sempat dites, pakai O Negative — golongan darah yang bisa diterima semua orang.',
        },
        {
          kind: 'me',
          text: 'mengambil kantong darah berlabel [golongan darah] sebanyak [jumlah] kantong dari Bank Darah dan membawanya ke meja operasi.',
        },
        { kind: 'note', text: 'Baris berikut RPLY — perawatnya tidak benar-benar ada.' },
        { kind: 'do', text: 'Perawat mencatat jumlah kantong darah yang diambil dari Bank Darah.' },
        {
          kind: 'me',
          text: 'mencocokkan label golongan darah pada kantong dengan catatan medis pasien sebelum dipasang.',
        },
        {
          kind: 'note',
          text: 'Jangan dilewati. Salah golongan darah adalah kesalahan transfusi yang paling fatal, dan satu-satunya penjaganya adalah pengecekan ini.',
        },
        { kind: 'me', text: 'menjepit pembuluh arteri pasien yang berdarah dengan clamp.' },
        {
          kind: 'me',
          text: 'menggantung kantong darah pada IV stand, menyambungkannya ke selang IV, dan mengatur kecepatan tetesan.',
        },
        {
          kind: 'do',
          text: 'Apakah muncul tanda reaksi transfusi pada pasien? (demam / menggigil / gatal / sesak)',
          branches: [{ label: 'Ada reaksi → hentikan transfusi', to: 'blood#reaksi' }],
        },
        { kind: 'do', text: 'Transfusi darah berlangsung selama [jumlah] jam.' },
        {
          kind: 'do',
          text: 'Berapa denyut nadi pasien per menit setelah dilakukan transfusi darah? (60 - 100 normal)',
        },
      ],
    },
    {
      id: 'reaksi',
      name: 'Kalau terjadi reaksi transfusi',
      steps: [
        {
          kind: 'note',
          text: 'Tubuh pasien menolak darah yang masuk. Hentikan saat itu juga — setiap tetes tambahan memperparah reaksinya.',
        },
        {
          kind: 'me',
          text: 'menutup regulator transfusi lalu melepas kantong darah dari selang IV.',
        },
        {
          kind: 'me',
          text: 'menyambungkan kantong saline ke selang IV yang sama agar jalur infus tetap terbuka.',
        },
        {
          kind: 'me',
          text: 'memeriksa ulang suhu tubuh, denyut nadi, dan pernapasan pasien.',
        },
        { kind: 'do', text: 'Apakah kondisi pasien mulai stabil setelah transfusi dihentikan?' },
        {
          kind: 'me',
          text: 'menyimpan kantong darah yang dipakai beserta labelnya untuk dicek ulang ke Bank Darah.',
        },
      ],
    },
  ],
}
