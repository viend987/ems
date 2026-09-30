// MVA & Kebakaran — chat RP dari "RP MVA" dan panduan Motor Vehicle Accident
// di draft.md. Hanya baris yang benar-benar diketik ke game yang masuk sini;
// penjelasan peran, daftar peralatan, dan kelas pemadam ada di dokumen aslinya.

export default {
  id: 'mva',
  group: 'pemadam',
  name: 'MVA & Mobil Terbakar',
  nameEn: 'MVA & Car Fires',
  blurb: 'Kecelakaan kendaraan: padamkan api, stabilkan mobil, matikan mesin, keluarkan korban.',
  blurbEn:
    'Vehicle collisions: put out the fire, stabilise the car, kill the engine, get the victim out.',
  sections: [
    {
      id: 'vehicle-identify',
      name: 'Identifikasi kendaraan',
      nameEn: 'Identifying the vehicle',
      steps: [
        { kind: 'note', text: 'Dipakai kalau korban berada di dalam mobil. Anim: .inspect · .mechanic · .mechanic3', en: 'Use this when the victim is inside the car. Anims: .inspect · .mechanic · .mechanic3' },
        { n: 256, kind: 'me', text: 'mengidentifikasi kendaraan di depannya.', en: 'identifies the vehicle in front of them.' },
        { n: 257, kind: 'do', text: 'Apakah ada kebocoran oli atau bensin?', en: 'Is there any oil or fuel leaking?' },
        {
          n: 258,
          kind: 'me',
          text: 'mengambil Crosslay Line dari Compartement Engine, lalu memutar katub ke mode Foam Class B.',
          en: 'takes the Crosslay Line from the Engine compartment and turns the valve to Foam Class B.',
        },
        { n: 259, kind: 'do', text: 'Dimana sumber api?', en: 'Where is the fire coming from?' },
        {
          n: 260,
          kind: 'me',
          text: 'mengarahkan Nozzle ke kap kendaraan yang mengeluarkan api, menyemprotkan air ke kap kendaraan tersebut.',
          en: 'aims the nozzle at the burning bonnet and sprays water onto it.',
        },
        { n: 261, kind: 'do', text: 'Terlihat api telah padam setelah disemprotkan air.', en: 'The fire is out after being sprayed with water.' },
        {
          n: 262,
          kind: 'me',
          text: 'membawa Crosslay Line kembali ke arah Engine lalu menaruhnya di Compartement Engine.',
          en: 'carries the Crosslay Line back to the Engine and stows it in the compartment.',
        },
      ],
    },
    {
      id: 'stabilisasi',
      name: 'Stabilisasi kendaraan (unit Engine)',
      nameEn: 'Stabilising the vehicle (Engine)',
      steps: [
        { kind: 'me', text: 'berjalan menuju ke arah mobil korban lalu melihat sekelilingnya.', en: 'walks over to the victim\'s car and looks it over.' },
        { kind: 'do', text: 'Apakah posisi mobil dalam keadaan miring?', en: 'Is the car sitting at an angle?' },
        {
          kind: 'me',
          text: 'kembali ke arah Engine, mengambil Stabilization Rods dari Compartement Engine lalu membawanya ke arah mobil korban.',
          en: 'goes back to the Engine, takes the Stabilization Rods from the compartment, and carries them to the victim\'s car.',
        },
        { kind: 'me', text: 'memasangkan Stabilization Rods di kedua sisi mobil dengan perlahan.', en: 'sets the Stabilization Rods carefully against both sides of the car.' },
        { kind: 'do', text: 'Terlihat mobil sudah tidak miring lagi setelah dipasangkan Stabilization Rods.', en: 'The car is no longer leaning now the Stabilization Rods are in place.' },
      ],
    },
    {
      id: 'kaca',
      name: 'Pecahkan kaca (Glass-Master)',
      nameEn: 'Breaking the glass (Glass-Master)',
      steps: [
        {
          kind: 'me',
          text: 'mencoba membuka pintu di samping korban.',
          en: 'tries the door beside the victim.',
        },
        { kind: 'do', text: 'Apakah pintu terkunci atau tidak?', en: 'Is the door locked or not?' },
        {
          kind: 'me',
          text: 'mengambil Glass-Master dari Engine lalu memecahkan kaca jendela samping korban secara terarah.',
          en: 'takes the Glass-Master from the Engine and breaks the side window next to the victim in a controlled way.',
        },
        {
          kind: 'me',
          text: 'membersihkan serpihan kaca pada tepi jendela menggunakan cutter agar aman.',
          en: 'clears the shards from the window frame with a cutter to make it safe.',
        },
        { kind: 'do', text: 'Jendela telah terbuka dan tepi kaca sudah bersih dari serpihan.', en: 'The window is open and the frame is clear of glass.' },
      ],
    },
    {
      id: 'kill-engine',
      name: 'Mematikan mesin',
      nameEn: 'Killing the engine',
      steps: [
        {
          n: 263,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier dari Compartement Engine lalu membawanya ke arah mobil korban.',
          en: 'takes the Halligan Bar and pliers from the Engine compartment and carries them to the victim\'s car.',
        },
        { n: 264, kind: 'me', text: 'membuka Kap mobil dengan menggunakan Halligan bar.', en: 'prises the bonnet open with the Halligan bar.' },
        { n: 265, kind: 'do', text: 'terlihat kap mobil mulai terbuka.', en: 'The bonnet is coming open.' },
        { n: 266, kind: 'me', text: 'memotong Power Supply dari aki menggunakan Plier.', en: 'cuts the power supply from the battery with the pliers.' },
        {
          n: 267,
          kind: 'do',
          text: 'Mesin mobil akan mati setelah Power Supply dan aki dipotong menggunakan Plier.',
          en: 'The engine will shut down once the power supply and battery are cut with the pliers.',
        },
        {
          n: 268,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier, membawanya ke arah Engine dan menaruhnya di Compartement Engine kembali.',
          en: 'picks up the Halligan Bar and pliers, carries them back to the Engine, and stows them in the compartment.',
        },
      ],
    },
    {
      id: 'jol',
      name: 'Potong pintu (Jaws of Life)',
      nameEn: 'Cutting the door (Jaws of Life)',
      steps: [
        {
          kind: 'me',
          text: 'mengambil Jaws of Life dari Engine lalu memasang mode Spreader untuk melebarkan celah engsel pintu.',
          en: 'takes the Jaws of Life from the Engine and sets it to Spreader mode to widen the gap at the door hinge.',
        },
        {
          kind: 'do',
          text: 'Engsel pintu mobil mulai terbuka dan merenggang.',
          en: 'The door hinge is opening up and spreading apart.',
        },
        {
          kind: 'me',
          text: 'mengganti mode JoL ke Cutter lalu memotong engsel pintu mobil di samping korban.',
          en: 'switches the JoL to Cutter mode and cuts the hinge of the door beside the victim.',
        },
        {
          kind: 'me',
          text: 'memindahkan pintu mobil yang terpotong ke area aman bersama rekan.',
          en: 'moves the cut-off door to a safe spot with a colleague.',
        },
        { kind: 'command', text: '/ado Pintu mobil yang terpotong', note: 'di tempat pintu ditaruh', noteEn: 'wherever the door was set down' },
      ],
    },
    {
      id: 'dashboard',
      name: 'Dashboard & seatbelt (Hydraulic Rams)',
      nameEn: 'Dashboard and seatbelt (Hydraulic Rams)',
      steps: [
        {
          kind: 'me',
          text: 'mengambil Hydraulic Rams dan Cutter dari Compartement Engine lalu membawanya ke arah mobil korban.',
          en: 'takes the Hydraulic Rams and the cutter from the Engine compartment and carries them to the victim\'s car.',
        },
        { kind: 'me', text: 'memeriksa kondisi kaki korban.', en: 'checks the state of the victim\'s legs.' },
        { kind: 'do', text: 'Apakah kaki korban tersangkut di Dashboard?', en: 'Are the victim\'s legs trapped under the dashboard?' },
        { kind: 'do', text: 'Apakah tubuh korban tersangkut oleh Seatbelt?', en: 'Is the victim held fast by the seatbelt?' },
        {
          kind: 'me',
          text: 'meletakkan Hydraulic Rams ke sela-sela kaki korban lalu menekan tombol "ON".',
          en: 'sets the Hydraulic Rams into the gap by the victim\'s legs and presses ON.',
        },
        { kind: 'do', text: 'Hydraulic Rams akan melebarkan Dashboard mobil.', en: 'The Hydraulic Rams will push the dashboard away.' },
        { kind: 'me', text: 'mengambil Cutter lalu memotong Seatbelt secara perlahan.', en: 'takes the cutter and cuts through the seatbelt slowly.' },
        { kind: 'do', text: 'Seatbelt berhasil dipotong.', en: 'The seatbelt is cut through.' },
      ],
    },
    {
      id: 'ked',
      name: 'C-Collar & KED sebelum diangkat',
      nameEn: 'C-Collar and KED before lifting',
      steps: [
        {
          kind: 'note',
          text: 'Lakukan BLS dulu pada korban, baru pasang C-Collar dan KED — MVA sering menyisakan cedera leher atau tulang belakang.',
          en: 'Do the BLS work first, then fit the C-Collar and KED — an MVA often leaves a neck or spinal injury behind.',
          branches: [{ label: 'Penanganan korban', labelEn: 'Victim handling', to: 'field#danger' }],
        },
        { kind: 'me', text: 'mengambil C-Collar dan KED dari Compartement Engine.', en: 'takes the C-Collar and the KED from the Engine compartment.' },
        { kind: 'me', text: 'memasangkan C-Collar ke leher korban secara perlahan.', en: 'fits the C-Collar carefully around the victim\'s neck.' },
        { kind: 'me', text: 'memasangkan KED ke punggung korban secara perlahan.', en: 'fits the KED carefully behind the victim\'s back.' },
        { kind: 'do', text: 'C-Collar dan KED sudah terpasangkan.', en: 'The C-Collar and KED are both in place.' },
        {
          kind: 'note',
          text: 'Setelah terpasang, ambil gurney dan bawa korban ke rumah sakit.',
          en: 'Once they are on, fetch the gurney and take the victim to hospital.',
          branches: [{ label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' }],
        },
      ],
    },
  ],
}
