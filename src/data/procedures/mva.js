// MVA & Kebakaran — chat RP dari "RP MVA" dan [GUIDE] Motor Vehicle Accident.
// Pembagian peran unit mengacu pada manual resmi LSFD:
// - Unit TRUCK: Stabilisasi kendaraan, pemutusan arus listrik aki, pelepasan dashboard & seatbelt.
// - Unit ENGINE: Identifikasi kebocoran bahan bakar/oli, pemadaman kap, pembongkaran kaca, pemotongan pintu (JoL).
// - Unit AMBULANCE: Penanganan medis BLS, imobilisasi tulang servikal & belakang (C-Collar & KED), evakuasi gurney.

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
      name: 'Identifikasi kendaraan & api (unit Engine)',
      nameEn: 'Vehicle & Fire Identification (Engine)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Engine. Cek kebocoran bensin/oli sebelum mendekat. Gunakan Crosslay Line mode Foam Class B untuk memadamkan api bahan bakar. Anims: .inspect · .mechanic · .mechanic3',
          en: 'Engine crew task. Check for fuel/oil leaks before approaching. Use Crosslay Line on Foam Class B mode for liquid fuel fires. Anims: .inspect · .mechanic · .mechanic3',
        },
        {
          n: 256,
          kind: 'me',
          text: 'mengidentifikasi kendaraan di depannya.',
          en: 'identifies the vehicle in front of them.',
        },
        {
          n: 257,
          kind: 'do',
          text: 'Apakah ada kebocoran oli atau bensin?',
          en: 'Is there any oil or fuel leaking?',
        },
        {
          n: 258,
          kind: 'me',
          text: 'mengambil Crosslay Line dari Compartement Engine, lalu memutar katup ke mode Foam Class B.',
          en: 'takes the Crosslay Line from the Engine compartment and turns the valve to Foam Class B.',
        },
        {
          n: 259,
          kind: 'do',
          text: 'Dimana sumber api?',
          en: 'Where is the fire coming from?',
        },
        {
          n: 260,
          kind: 'me',
          text: 'mengarahkan Nozzle ke kap kendaraan yang mengeluarkan api, menyemprotkan air busa ke kap kendaraan tersebut.',
          en: 'aims the nozzle at the burning bonnet and sprays foam onto it.',
        },
        {
          n: 261,
          kind: 'do',
          text: 'Terlihat api telah padam setelah disemprotkan busa.',
          en: 'The fire is out after being sprayed with foam.',
        },
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
      name: 'Stabilisasi kendaraan (unit Truck)',
      nameEn: 'Vehicle Stabilisation (Truck)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Truck. Pasang Stabilization Rods di kedua sisi mobil agar kendaraan tidak bergeser/terguling saat pemotongan pintu dan penanganan korban.',
          en: 'Truck crew task. Set Stabilization Rods on both sides to prevent the car shifting or rolling during door extrication and patient care.',
        },
        {
          kind: 'me',
          text: 'berjalan menuju ke arah mobil korban lalu melihat sekelilingnya.',
          en: "walks over to the victim's car and looks it over.",
        },
        {
          kind: 'do',
          text: 'Apakah posisi mobil dalam keadaan miring atau tidak stabil?',
          en: 'Is the car sitting at an angle or unstable?',
        },
        {
          kind: 'me',
          text: 'kembali ke arah Truck, mengambil Stabilization Rods dari Compartement Truck lalu membawanya ke arah mobil korban.',
          en: "returns to the Truck, takes the Stabilization Rods from the Truck compartment, and carries them to the victim's car.",
        },
        {
          kind: 'me',
          text: 'memasangkan Stabilization Rods di kedua sisi mobil dengan perlahan hingga mengunci rapat.',
          en: 'sets the Stabilization Rods carefully against both sides of the car until firmly secured.',
        },
        {
          kind: 'do',
          text: 'Terlihat mobil sudah stabil dan tidak miring lagi setelah dipasangkan Stabilization Rods.',
          en: 'The car is stable and no longer leaning with the Stabilization Rods in place.',
        },
      ],
    },
    {
      id: 'kaca',
      name: 'Pecahkan kaca jendela (Glass-Master — unit Engine)',
      nameEn: 'Breaking the Side Window (Glass-Master — Engine)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Engine atas arahan IC untuk membuka akses awal dan ventilasi kabin.',
          en: 'Engine crew task per IC orders to create initial cabin access and ventilation.',
        },
        {
          kind: 'me',
          text: 'berjalan ke sebelah pintu samping korban lalu mencoba membukanya perlahan.',
          en: 'walks to the door beside the victim and tries to open it carefully.',
        },
        {
          kind: 'do',
          text: 'Apakah pintu terkunci atau tidak?',
          en: 'Is the door locked or not?',
        },
        {
          kind: 'me',
          text: 'mengambil Glass-Master dari Compartement Engine lalu membawanya ke arah mobil korban.',
          en: 'takes the Glass-Master from the Engine compartment and brings it to the car.',
        },
        {
          kind: 'me',
          text: 'meletakkan Glass-Master di tengah kaca samping korban lalu menekan tombol "ON".',
          en: 'places the Glass-Master in the centre of the side window and presses the ON button.',
        },
        {
          kind: 'me',
          text: 'memecahkan kaca pintu mobil di samping korban menggunakan Glass-Master secara terarah.',
          en: 'breaks the side window next to the victim in a controlled manner using the Glass-Master.',
        },
        {
          kind: 'me',
          text: 'menekan tombol "OFF" pada Glass-Master lalu meletakkannya di tempat aman.',
          en: 'presses the OFF button on the Glass-Master and sets it down in a safe spot.',
        },
        {
          kind: 'me',
          text: 'mengambil Cutter dari kantung saku Turnout Trousers lalu membersihkan sisa serpihan kaca pada tepi jendela.',
          en: 'takes a cutter from their Turnout Trousers pocket and clears glass shards from the window frame.',
        },
        {
          kind: 'do',
          text: 'Sisi-sisi jendela sudah bersih dari serpihan kaca tajam.',
          en: 'The window frame is clear of sharp glass shards.',
        },
        {
          kind: 'me',
          text: 'memasukkan kembali Cutter ke dalam kantung saku lalu mengembalikan Glass-Master ke Compartement Engine.',
          en: 'puts the cutter back in their pocket and returns the Glass-Master to the Engine compartment.',
        },
      ],
    },
    {
      id: 'kill-engine',
      name: 'Matikan mesin & aki (unit Truck)',
      nameEn: 'Killing the Engine & Battery (Truck)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Truck atas arahan IC untuk memutus arus listrik aki dan mencegah potensi percikan api sekunder.',
          en: 'Truck crew task per IC orders to cut battery power and prevent electrical fires.',
        },
        {
          n: 263,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier dari Compartement Truck lalu membawanya ke arah mobil korban.',
          en: "takes the Halligan Bar and pliers from the Truck compartment and carries them to the victim's car.",
        },
        {
          n: 264,
          kind: 'me',
          text: 'membuka Kap mobil dengan menggunakan Halligan bar.',
          en: 'prises the bonnet open with the Halligan bar.',
        },
        {
          n: 265,
          kind: 'do',
          text: 'Apakah Kap mobil terbuka?',
          en: 'Is the bonnet open?',
        },
        {
          n: 266,
          kind: 'me',
          text: 'memotong Power Supply dari aki menggunakan Plier.',
          en: 'cuts the power supply from the battery with the pliers.',
        },
        {
          n: 267,
          kind: 'do',
          text: 'Mesin mobil akan mati setelah Power Supply dan aki dipotong menggunakan Plier.',
          en: 'The engine will shut down once the power supply and battery are cut with the pliers.',
        },
        {
          n: 268,
          kind: 'me',
          text: 'mengambil Halligan Bar dan Plier, membawanya ke arah Truck dan menaruhnya di Compartement Truck kembali.',
          en: 'picks up the Halligan Bar and pliers, carries them back to the Truck, and stows them in the compartment.',
        },
      ],
    },
    {
      id: 'jol',
      name: 'Potong engsel pintu (Jaws of Life — unit Engine)',
      nameEn: 'Cutting the Door (Jaws of Life — Engine)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Engine. Gunakan JoL Spreader untuk melebarkan celah engsel, lalu beralih ke JoL Cutter untuk memotong engsel pintu.',
          en: 'Engine crew task. Use the JoL Spreader to widen the hinge gap, then switch to the JoL Cutter to shear the hinges.',
        },
        {
          kind: 'me',
          text: 'berjalan ke arah mobil korban, mencoba untuk membuka pintu disamping korban.',
          en: 'walks towards the car and tries the door handle beside the victim.',
        },
        {
          kind: 'do',
          text: 'Apakah pintu mobil masih terkunci atau tidak?',
          en: 'Is the car door still locked or not?',
        },
        {
          kind: 'me',
          text: 'mengambil Jaws of Life (JoL) dari Compartement Engine dan membawanya ke arah mobil korban.',
          en: 'takes the Jaws of Life (JoL) from the Engine compartment and carries it to the car.',
        },
        {
          kind: 'me',
          text: 'mengubah JoL menjadi Spreader lalu melebarkan engsel pintu mobil di sebelah korban.',
          en: 'sets the JoL to Spreader mode and widens the door hinge beside the victim.',
        },
        {
          kind: 'do',
          text: 'Engsel pintu mobil melebar setelah dilebarkan menggunakan JoL yang diubah menjadi Spreader.',
          en: 'The door hinge widens after being forced open by the Spreader.',
        },
        {
          kind: 'me',
          text: 'mengubah JoL dari Spreader menjadi Cutter lalu memotong engsel pintu mobil di sebelah korban.',
          en: 'switches the JoL from Spreader to Cutter and shears through the door hinges.',
        },
        {
          kind: 'me',
          text: 'menahan pintu mobil yang terpotong engselnya dengan sendirian.',
          en: 'holds the severed car door upright to steady it.',
        },
        {
          kind: 'shout',
          text: 'Tolong bantu saya menahan pintu mobil ini!',
          en: 'Someone help me hold this car door!',
        },
        {
          kind: 'me',
          text: 'membawa pintu mobil yang terpotong lalu menaruhnya ke lantai secara perlahan dengan bantuan rekan.',
          en: 'carries the severed car door and lowers it carefully to the ground with their colleague.',
        },
        {
          kind: 'command',
          text: '/ado Pintu mobil yang terpotong',
          note: 'di tempat pintu ditaruh',
          noteEn: 'wherever the door was set down',
        },
        {
          kind: 'me',
          text: 'membawa kembali JoL ke arah Engine lalu menaruhnya di Compartement Engine.',
          en: 'carries the JoL back to the Engine and stows it in the compartment.',
        },
      ],
    },
    {
      id: 'dashboard',
      name: 'Dashboard & seatbelt (Hydraulic Rams — unit Truck)',
      nameEn: 'Dashboard and Seatbelt (Hydraulic Rams — Truck)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Truck. Periksa apakah kaki korban terjebak dashboard atau tubuhnya terikat seatbelt, lalu bebaskan dengan Rams dan Cutter.',
          en: 'Truck crew task. Check if legs are pinned by the dashboard or trapped by the seatbelt, then free the victim using Rams and a cutter.',
        },
        {
          kind: 'me',
          text: 'mengambil Hydraulic Rams dan Cutter dari Compartement Truck lalu membawanya ke arah mobil korban.',
          en: "takes the Hydraulic Rams and cutter from the Truck compartment and carries them to the victim's car.",
        },
        {
          kind: 'me',
          text: 'memeriksa kondisi kaki dan tubuh korban di dalam kabin.',
          en: "checks the condition of the victim's legs and body inside the cabin.",
        },
        {
          kind: 'do',
          text: 'Apakah kaki korban tersangkut di Dashboard?',
          en: 'Are the victim\'s legs trapped under the dashboard?',
        },
        {
          kind: 'do',
          text: 'Apakah tubuh korban tersangkut oleh Seatbelt?',
          en: 'Is the victim held fast by the seatbelt?',
        },
        {
          kind: 'me',
          text: 'meletakkan Hydraulic Rams ke sela-sela kaki korban lalu menekan tombol "ON".',
          en: 'places the Hydraulic Rams into the space by the victim\'s legs and presses the ON button.',
        },
        {
          kind: 'do',
          text: 'Hydraulic Rams akan melebarkan Dashboard mobil.',
          en: 'The Hydraulic Rams expand and push the dashboard away.',
        },
        {
          kind: 'me',
          text: 'mengambil Cutter, lalu memotong Seatbelt secara perlahan.',
          en: 'takes the cutter and slices slowly through the seatbelt webbing.',
        },
        {
          kind: 'do',
          text: 'Seatbelt berhasil dipotong.',
          en: 'The seatbelt is cut through.',
        },
        {
          kind: 'me',
          text: 'menonaktifkan Hydraulic Rams lalu merapikan kembali alat dan Cutter ke Compartement Truck.',
          en: 'powers down the Hydraulic Rams and stows the tools and cutter back into the Truck compartment.',
        },
      ],
    },
    {
      id: 'ked',
      name: 'C-Collar & KED (unit Ambulance)',
      nameEn: 'C-Collar and KED (Ambulance)',
      steps: [
        {
          kind: 'note',
          text: 'Tugas unit Ambulance/Rescue. Lakukan BLS awal lebih dulu. Pasang C-Collar dan KED untuk memproteksi tulang leher dan belakang sebelum korban dikeluarkan dari mobil.',
          en: 'Ambulance/Rescue crew task. Perform initial BLS first. Fit C-Collar and KED to protect the neck and spine before lifting the victim out.',
          branches: [{ label: 'Penanganan korban', labelEn: 'Victim handling', to: 'field#danger' }],
        },
        {
          kind: 'me',
          text: 'mengambil C-Collar dan KED dari Compartement Ambulance.',
          en: 'takes the C-Collar and KED from the Ambulance compartment.',
        },
        {
          kind: 'me',
          text: 'memasangkan C-Collar ke leher korban secara perlahan.',
          en: "fits the C-Collar carefully around the victim's neck.",
        },
        {
          kind: 'me',
          text: 'memasangkan KED ke punggung korban secara perlahan.',
          en: "fits the KED carefully behind the victim's back.",
        },
        {
          kind: 'do',
          text: 'C-Collar dan KED sudah terpasangkan.',
          en: 'The C-Collar and KED are both in place.',
        },
        {
          kind: 'note',
          text: 'Setelah terpasang stabil, bawa gurney dari ambulans dan pindahkan korban secara hati-hati untuk transportasi ke rumah sakit.',
          en: 'Once secured, bring the gurney from the ambulance and transfer the patient carefully for hospital transport.',
          branches: [{ label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' }],
        },
      ],
    },
  ],
}
