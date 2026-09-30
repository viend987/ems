// Wild Animal Handling — chat RP dari panduan Wild Animal Handling di draft.md.
// Hanya baris yang diketik ke game. Klasifikasi risiko, daftar peralatan,
// resep penetral bau sigung, dan cara membersihkan kotoran kelelawar ada di
// dokumen aslinya, bukan di sini.

export default {
  id: 'animals',
  group: 'khusus',
  name: 'Hewan Liar',
  nameEn: 'Wild Animals',
  blurb: 'Penanganan hewan liar di permukiman. Semua alat ada di kompartemen unit Engine.',
  blurbEn:
    'Wild animals in residential areas. Every tool is in the Engine compartment.',
  sections: [
    {
      id: 'tikus',
      name: 'Tikus, mencit, tupai',
      steps: [
        { kind: 'me', text: 'mengidentifikasi lubang tempat keluar masuknya tikus.' },
        { kind: 'me', text: 'mengambil trap box dari dalam kompartemen unit Engine.' },
        { kind: 'me', text: 'memasang trap box di sekitar lubang tersebut dengan umpan taburan biji-bijian.' },
        {
          kind: 'me',
          text: 'menjauh dari lokasi dan menunggu beberapa saat hingga tikus masuk ke dalam trap box.',
        },
        { kind: 'do', text: 'Terlihat tikus perlahan memakan umpan dan masuk ke trap box.' },
        { kind: 'me', text: 'mengangkat trap box dan memasukkannya ke kotak kardus.' },
        {
          kind: 'me',
          text: 'menyemprotkan disinfectant spray di sekitar area lubang tikus untuk mensterilkan kuman dan bakteri.',
        },
      ],
    },
    {
      id: 'kucing',
      name: 'Kucing liar & opossum',
      steps: [
        { kind: 'note', text: 'Jangan sampai memprovokasi hewan atau membuatnya merasa terancam.' },
        {
          kind: 'me',
          text: 'menyiapkan animal cage tertutup dan umpan berupa makanan kucing kalengan.',
        },
        { kind: 'me', text: 'menaruh umpan di dalam animal cage.' },
        {
          kind: 'me',
          text: 'menjauh dari lokasi dan menunggu beberapa saat hingga kucing memakan umpan.',
        },
        { kind: 'do', text: 'Perlahan kucing mencium umpan dan masuk ke animal cage.' },
        {
          kind: 'me',
          text: 'mengangkat animal cage dengan hati-hati supaya kucing tidak merasa terancam.',
        },
      ],
    },
    {
      id: 'burung',
      name: 'Burung',
      steps: [
        {
          kind: 'note',
          text: 'Kalau burung ada di dalam bangunan, tutup dulu semua akses keluarnya. Pakai tangga kalau posisinya tinggi.',
        },
        {
          kind: 'me',
          text: 'menyiapkan catch net dari kompartemen unit Engine dan biji-bijian sebagai umpan.',
        },
        { kind: 'me', text: 'menaburkan biji-bijian di area terbuka untuk memancing burung keluar.' },
        { kind: 'me', text: 'mengangkat catch net dan menangkap burung yang sedang memakan biji-bijian.' },
        { kind: 'me', text: 'memasukkan burung ke dalam animal cage dengan hati-hati.' },
      ],
    },
    {
      id: 'coyote',
      name: 'Coyote & beruang hitam',
      steps: [
        {
          kind: 'note',
          text: 'Keduanya penakut. Buat kebisingan dan buat dirimu terlihat besar. Jangan pernah lari menjauh atau mendekat.',
        },
        {
          kind: 'me',
          text: 'mengamankan area sekitar coyote dan memasang perimeter untuk menghindari adanya korban.',
        },
        { kind: 'me', text: 'mengaktifkan sirine unit Engine untuk membuat kebisingan.' },
        {
          kind: 'me',
          text: 'meregangkan kedua tangannya untuk membuat dirinya terlihat lebih besar sambil maju perlahan.',
        },
        { kind: 'do', text: 'Coyote terlihat mundur perlahan dan pergi dari lokasi.' },
      ],
    },
    {
      id: 'sigung',
      name: 'Sigung',
      steps: [
        {
          kind: 'note',
          text: 'Sigung menyemprot saat merasa terganggu. Pancing dengan makanan, lalu tutup penglihatannya dengan kain lembut sebelum diangkat.',
        },
        { kind: 'me', text: 'menyiapkan animal cage tertutup dan umpan berupa sayuran.' },
        { kind: 'me', text: 'menaruh umpan di tempat terbuka.' },
        {
          kind: 'me',
          text: 'menjauh dari lokasi dan menunggu beberapa saat hingga sigung memakan umpan.',
        },
        { kind: 'do', text: 'Sigung perlahan mulai mendekati umpan dan memakannya.' },
        {
          kind: 'me',
          text: 'dengan hati-hati mendekati sigung dan langsung menutup penglihatannya menggunakan selimut.',
        },
        { kind: 'me', text: 'memasukkan sigung ke dalam animal cage tertutup.' },
        {
          kind: 'note',
          text: 'Kalau terlanjur kena semprot, lanjutkan dulu prosedurnya. Penetralan bau dilakukan setelah hewannya aman.',
        },
      ],
    },
    {
      id: 'kelelawar',
      name: 'Kelelawar',
      steps: [
        {
          kind: 'note',
          text: 'Kelelawar terbang membentuk huruf U — lebih tinggi di dekat dinding, lebih rendah di tengah ruangan. Tetaplah di dekat dinding.',
        },
        { kind: 'me', text: 'menyiapkan catch net dari kompartemen unit Engine.' },
        { kind: 'me', text: 'menutup pintu rumah dan membuka ventilasi sebagai jalan keluar kelelawar.' },
        { kind: 'me', text: 'tetap berada di dekat dinding sambil menunggu kelelawar terbang keluar.' },
        {
          kind: 'me',
          text: 'menunggu jeda saat kelelawar mendekati dinding lalu secepatnya menangkapnya dengan catch net.',
        },
        { kind: 'me', text: 'memasukkan kelelawar ke dalam karung dengan hati-hati.' },
        {
          kind: 'note',
          text: 'Kotoran kelelawar jangan disapu atau disedot. Basahi dulu dengan air bertekanan rendah sebelum dibersihkan.',
        },
      ],
    },
    {
      id: 'ular',
      name: 'Ular (berbisa & tidak)',
      steps: [
        { kind: 'note', text: 'Jangan pernah menyentuh ular secara langsung. Jangan memprovokasi.' },
        {
          kind: 'me',
          text: 'mengamankan area sekitar ular dan memasang perimeter untuk menghindari adanya korban.',
        },
        { kind: 'me', text: 'mengambil snake tongs dan snake bag dari dalam kompartemen unit Engine.' },
        {
          kind: 'me',
          text: 'perlahan mendekati ular dan menggunakan snake tongs untuk menjepit bagian tengah tubuh ular.',
        },
        { kind: 'me', text: 'memasukkan ular ke dalam snake bag dengan hati-hati.' },
        { kind: 'me', text: 'membawa ular ke tempat yang aman jauh dari permukiman warga.' },
      ],
    },
    {
      id: 'lebah',
      name: 'Sarang lebah',
      steps: [
        { kind: 'note', text: 'Pakai Bee Veil. Sarang bisa menggantung, tersembunyi di celah, atau di dalam tanah.' },
        {
          kind: 'me',
          text: 'mengambil Dry Chemical Fire Extinguisher dari kompartemen unit Engine dan mengenakan Bee Veil di kepalanya.',
        },
        { kind: 'me', text: 'memasang tangga di bawah sarang lebah dengan hati-hati.' },
        {
          kind: 'me',
          text: 'menarik pin pengaman Dry Chemical Fire Extinguisher lalu mengarahkan nozzle ke bagian dasar sarang lebah.',
        },
        {
          kind: 'me',
          text: 'menekan tuas dan menahannya dengan stabil untuk menyemprotkan Dry Chemical Fire Extinguisher.',
        },
        { kind: 'do', text: 'Penyemprotan berlangsung selama 20 detik.' },
        { kind: 'do', text: 'Terlihat koloni lebah mulai berjatuhan dan mati.' },
        {
          kind: 'me',
          text: 'menyiapkan box kosong dan perlahan menaiki tangga untuk mengambil sarang lebah yang tergantung.',
        },
        { kind: 'me', text: 'memasukkan sarang lebah ke dalam box dengan hati-hati.' },
      ],
    },
    {
      id: 'singa-gunung',
      name: 'Singa gunung',
      steps: [
        {
          kind: 'note',
          text: 'Jangan pernah berlari — itu memicu naluri mengejar. Lihat ke arah kakinya, hindari tatapan mata. Hati-hati kalau ada anakannya.',
        },
        {
          kind: 'me',
          text: 'mengamankan area sekitar singa gunung dan memasang perimeter untuk menghindari adanya korban.',
        },
        { kind: 'me', text: 'mengaktifkan sirine unit Engine untuk membuat kebisingan.' },
        {
          kind: 'me',
          text: 'meregangkan kedua tangannya dengan mata menatap kaki singa gunung untuk membuat dirinya terlihat lebih besar sambil maju perlahan.',
        },
        { kind: 'do', text: 'Singa gunung terlihat mundur perlahan dan meninggalkan wilayah permukiman.' },
      ],
    },
  ],
}
