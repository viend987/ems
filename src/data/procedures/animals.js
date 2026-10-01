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
      nameEn: 'Rats, mice, squirrels',
      steps: [
        {
          kind: 'me',
          text: 'mengidentifikasi lubang tempat keluar masuknya tikus.',
          en: 'identifies the hole the rats are using to come and go.',
        },
        {
          kind: 'me',
          text: 'mengambil trap box dari dalam kompartemen unit Engine.',
          en: 'takes a trap box out of the Engine compartment.',
        },
        {
          kind: 'me',
          text: 'memasang trap box di sekitar lubang tersebut dengan umpan taburan biji-bijian.',
          en: 'sets the trap box beside the hole, baited with a scattering of grain.',
        },
        {
          kind: 'me',
          text: 'menjauh dari lokasi dan menunggu beberapa saat hingga tikus masuk ke dalam trap box.',
          en: 'steps away and waits a while for the rat to go into the trap box.',
        },
        {
          kind: 'do',
          text: 'Terlihat tikus perlahan memakan umpan dan masuk ke trap box.',
          en: 'The rat is seen slowly eating the bait and entering the trap box.',
        },
        {
          kind: 'me',
          text: 'mengangkat trap box dan memasukkannya ke kotak kardus.',
          en: 'lifts the trap box and puts it into a cardboard box.',
        },
        {
          kind: 'me',
          text: 'menyemprotkan disinfectant spray di sekitar area lubang tikus untuk mensterilkan kuman dan bakteri.',
          en: 'sprays disinfectant around the hole to kill off the germs and bacteria.',
        },
      ],
    },
    {
      id: 'kucing',
      name: 'Kucing liar & opossum',
      nameEn: 'Feral cats and opossums',
      steps: [
        {
          kind: 'note',
          text: 'Jangan sampai memprovokasi hewan atau membuatnya merasa terancam.',
          en: 'Never provoke the animal or let it feel cornered.',
        },
        {
          kind: 'me',
          text: 'menyiapkan animal cage tertutup dan umpan berupa makanan kucing kalengan.',
          en: 'prepares a covered animal cage and tinned cat food as bait.',
        },
        {
          kind: 'me',
          text: 'menaruh umpan di dalam animal cage.',
          en: 'places the bait inside the animal cage.',
        },
        {
          kind: 'me',
          text: 'menjauh dari lokasi dan menunggu beberapa saat hingga kucing memakan umpan.',
          en: 'steps away and waits a while for the cat to take the bait.',
        },
        {
          kind: 'do',
          text: 'Perlahan kucing mencium umpan dan masuk ke animal cage.',
          en: 'The cat slowly scents the bait and walks into the animal cage.',
        },
        {
          kind: 'me',
          text: 'mengangkat animal cage dengan hati-hati supaya kucing tidak merasa terancam.',
          en: 'lifts the animal cage carefully so the cat does not feel threatened.',
        },
      ],
    },
    {
      id: 'burung',
      name: 'Burung',
      nameEn: 'Birds',
      steps: [
        {
          kind: 'note',
          text: 'Kalau burung ada di dalam bangunan, tutup dulu semua akses keluarnya. Pakai tangga kalau posisinya tinggi.',
          en: 'If the bird is inside a building, close off every way out first. Use a ladder if it is perched high.',
        },
        {
          kind: 'me',
          text: 'menyiapkan catch net dari kompartemen unit Engine dan biji-bijian sebagai umpan.',
          en: 'prepares the catch net from the Engine compartment and some grain as bait.',
        },
        {
          kind: 'me',
          text: 'menaburkan biji-bijian di area terbuka untuk memancing burung keluar.',
          en: 'scatters the grain in the open to draw the bird out.',
        },
        {
          kind: 'me',
          text: 'mengangkat catch net dan menangkap burung yang sedang memakan biji-bijian.',
          en: 'raises the catch net and catches the bird while it is feeding on the grain.',
        },
        {
          kind: 'me',
          text: 'memasukkan burung ke dalam animal cage dengan hati-hati.',
          en: 'puts the bird into the animal cage carefully.',
        },
      ],
    },
    {
      id: 'coyote',
      name: 'Coyote & beruang hitam',
      nameEn: 'Coyotes and black bears',
      steps: [
        {
          kind: 'note',
          text: 'Keduanya penakut. Buat kebisingan dan buat dirimu terlihat besar. Jangan pernah lari menjauh atau mendekat.',
          en: 'Both are timid. Make noise and make yourself look big. Never run, either away from it or towards it.',
        },
        {
          kind: 'me',
          text: 'mengamankan area sekitar coyote dan memasang perimeter untuk menghindari adanya korban.',
          en: 'secures the area around the coyote and sets a perimeter so nobody gets hurt.',
        },
        {
          kind: 'me',
          text: 'mengaktifkan sirine unit Engine untuk membuat kebisingan.',
          en: "switches on the Engine's siren to make noise.",
        },
        {
          kind: 'me',
          text: 'meregangkan kedua tangannya untuk membuat dirinya terlihat lebih besar sambil maju perlahan.',
          en: 'spreads both arms wide to look bigger while advancing slowly.',
        },
        {
          kind: 'do',
          text: 'Coyote terlihat mundur perlahan dan pergi dari lokasi.',
          en: 'The coyote is seen backing off slowly and leaving the area.',
        },
      ],
    },
    {
      id: 'sigung',
      name: 'Sigung',
      nameEn: 'Skunks',
      steps: [
        {
          kind: 'note',
          text: 'Sigung menyemprot saat merasa terganggu. Pancing dengan makanan, lalu tutup penglihatannya dengan kain lembut sebelum diangkat.',
          en: 'A skunk sprays when it feels disturbed. Draw it in with food, then cover its eyes with a soft cloth before lifting it.',
        },
        {
          kind: 'me',
          text: 'menyiapkan animal cage tertutup dan umpan berupa sayuran.',
          en: 'prepares a covered animal cage and some vegetables as bait.',
        },
        {
          kind: 'me',
          text: 'menaruh umpan di tempat terbuka.',
          en: 'places the bait out in the open.',
        },
        {
          kind: 'me',
          text: 'menjauh dari lokasi dan menunggu beberapa saat hingga sigung memakan umpan.',
          en: 'steps away and waits a while for the skunk to take the bait.',
        },
        {
          kind: 'do',
          text: 'Sigung perlahan mulai mendekati umpan dan memakannya.',
          en: 'The skunk slowly comes up to the bait and eats it.',
        },
        {
          kind: 'me',
          text: 'dengan hati-hati mendekati sigung dan langsung menutup penglihatannya menggunakan selimut.',
          en: 'approaches the skunk carefully and covers its eyes straight away with a blanket.',
        },
        {
          kind: 'me',
          text: 'memasukkan sigung ke dalam animal cage tertutup.',
          en: 'puts the skunk into the covered animal cage.',
        },
        {
          kind: 'note',
          text: 'Kalau terlanjur kena semprot, lanjutkan dulu prosedurnya. Penetralan bau dilakukan setelah hewannya aman.',
          en: 'If you do get sprayed, carry on with the procedure. Dealing with the smell comes after the animal is secure.',
        },
      ],
    },
    {
      id: 'kelelawar',
      name: 'Kelelawar',
      nameEn: 'Bats',
      steps: [
        {
          kind: 'note',
          text: 'Kelelawar terbang membentuk huruf U — lebih tinggi di dekat dinding, lebih rendah di tengah ruangan. Tetaplah di dekat dinding.',
          en: 'A bat flies in a U — higher near the walls, lower in the middle of the room. Stay close to the wall.',
        },
        {
          kind: 'me',
          text: 'menyiapkan catch net dari kompartemen unit Engine.',
          en: 'prepares the catch net from the Engine compartment.',
        },
        {
          kind: 'me',
          text: 'menutup pintu rumah dan membuka ventilasi sebagai jalan keluar kelelawar.',
          en: 'shuts the front door and opens a vent to give the bat a way out.',
        },
        {
          kind: 'me',
          text: 'tetap berada di dekat dinding sambil menunggu kelelawar terbang keluar.',
          en: 'stays close to the wall while waiting for the bat to fly out.',
        },
        {
          kind: 'me',
          text: 'menunggu jeda saat kelelawar mendekati dinding lalu secepatnya menangkapnya dengan catch net.',
          en: 'waits for the moment the bat comes near the wall and catches it with the catch net as quickly as possible.',
        },
        {
          kind: 'me',
          text: 'memasukkan kelelawar ke dalam karung dengan hati-hati.',
          en: 'puts the bat into a sack carefully.',
        },
        {
          kind: 'note',
          text: 'Kotoran kelelawar jangan disapu atau disedot. Basahi dulu dengan air bertekanan rendah sebelum dibersihkan.',
          en: 'Never sweep or vacuum bat droppings. Wet them down with low-pressure water before clearing them.',
        },
      ],
    },
    {
      id: 'ular',
      name: 'Ular (berbisa & tidak)',
      nameEn: 'Snakes (venomous and not)',
      steps: [
        {
          kind: 'note',
          text: 'Jangan pernah menyentuh ular secara langsung. Jangan memprovokasi.',
          en: 'Never handle a snake with bare hands. Never provoke it.',
        },
        {
          kind: 'me',
          text: 'mengamankan area sekitar ular dan memasang perimeter untuk menghindari adanya korban.',
          en: 'secures the area around the snake and sets a perimeter so nobody gets hurt.',
        },
        {
          kind: 'me',
          text: 'mengambil snake tongs dan snake bag dari dalam kompartemen unit Engine.',
          en: 'takes the snake tongs and snake bag out of the Engine compartment.',
        },
        {
          kind: 'me',
          text: 'perlahan mendekati ular dan menggunakan snake tongs untuk menjepit bagian tengah tubuh ular.',
          en: "approaches the snake slowly and uses the snake tongs to grip the middle of its body.",
        },
        {
          kind: 'me',
          text: 'memasukkan ular ke dalam snake bag dengan hati-hati.',
          en: 'puts the snake into the snake bag carefully.',
        },
        {
          kind: 'me',
          text: 'membawa ular ke tempat yang aman jauh dari permukiman warga.',
          en: 'carries the snake to a safe place well away from where people live.',
        },
      ],
    },
    {
      id: 'lebah',
      name: 'Sarang lebah',
      nameEn: 'Beehives',
      steps: [
        {
          kind: 'note',
          text: 'Pakai Bee Veil. Sarang bisa menggantung, tersembunyi di celah, atau di dalam tanah.',
          en: 'Wear the Bee Veil. A hive may hang in the open, sit hidden in a gap, or be underground.',
        },
        {
          kind: 'me',
          text: 'mengambil Dry Chemical Fire Extinguisher dari kompartemen unit Engine dan mengenakan Bee Veil di kepalanya.',
          en: 'takes the Dry Chemical Fire Extinguisher from the Engine compartment and puts the Bee Veil on.',
        },
        {
          kind: 'me',
          text: 'memasang tangga di bawah sarang lebah dengan hati-hati.',
          en: 'sets the ladder under the beehive carefully.',
        },
        {
          kind: 'me',
          text: 'menarik pin pengaman Dry Chemical Fire Extinguisher lalu mengarahkan nozzle ke bagian dasar sarang lebah.',
          en: 'pulls the safety pin on the Dry Chemical Fire Extinguisher and aims the nozzle at the base of the hive.',
        },
        {
          kind: 'me',
          text: 'menekan tuas dan menahannya dengan stabil untuk menyemprotkan Dry Chemical Fire Extinguisher.',
          en: 'squeezes the lever and holds it steady to discharge the Dry Chemical Fire Extinguisher.',
        },
        {
          kind: 'do',
          text: 'Penyemprotan berlangsung selama 20 detik.',
          en: 'The discharge runs for 20 seconds.',
        },
        {
          kind: 'do',
          text: 'Terlihat koloni lebah mulai berjatuhan dan mati.',
          en: 'The colony is seen dropping and dying off.',
        },
        {
          kind: 'me',
          text: 'menyiapkan box kosong dan perlahan menaiki tangga untuk mengambil sarang lebah yang tergantung.',
          en: 'prepares an empty box and climbs the ladder slowly to take down the hanging hive.',
        },
        {
          kind: 'me',
          text: 'memasukkan sarang lebah ke dalam box dengan hati-hati.',
          en: 'puts the hive into the box carefully.',
        },
      ],
    },
    {
      id: 'singa-gunung',
      name: 'Singa gunung',
      nameEn: 'Mountain lions',
      steps: [
        {
          kind: 'note',
          text: 'Jangan pernah berlari — itu memicu naluri mengejar. Lihat ke arah kakinya, hindari tatapan mata. Hati-hati kalau ada anakannya.',
          en: 'Never run — it triggers the instinct to chase. Watch its feet and avoid eye contact. Take extra care if there are cubs.',
        },
        {
          kind: 'me',
          text: 'mengamankan area sekitar singa gunung dan memasang perimeter untuk menghindari adanya korban.',
          en: 'secures the area around the mountain lion and sets a perimeter so nobody gets hurt.',
        },
        {
          kind: 'me',
          text: 'mengaktifkan sirine unit Engine untuk membuat kebisingan.',
          en: "switches on the Engine's siren to make noise.",
        },
        {
          kind: 'me',
          text: 'meregangkan kedua tangannya dengan mata menatap kaki singa gunung untuk membuat dirinya terlihat lebih besar sambil maju perlahan.',
          en: "spreads both arms wide with their eyes on the mountain lion's feet to look bigger, advancing slowly.",
        },
        {
          kind: 'do',
          text: 'Singa gunung terlihat mundur perlahan dan meninggalkan wilayah permukiman.',
          en: 'The mountain lion is seen backing off slowly and leaving the residential area.',
        },
      ],
    },
  ],
}
