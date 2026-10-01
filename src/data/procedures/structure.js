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
//
// Baris /wt sengaja tidak punya `en`: kanal radio di server ini sudah berbahasa
// Inggris, dan sebelas baris yang kebetulan Indonesia — termasuk obrolan WT di
// sini — dijaga jumlahnya oleh procedures.test.js, bukan diterjemahkan.

export default {
  id: 'structure',
  group: 'pemadam',
  name: 'Kebakaran Bangunan',
  nameEn: 'Structure Fire',
  blurb: 'Structure fire dari dispatch sampai RTB: size-up, fire attack, search & rescue, overhaul.',
  blurbEn:
    'A structure fire from dispatch to RTB: size-up, fire attack, search and rescue, overhaul.',
  sections: [
    {
      id: 'respon',
      name: 'Dispatch & berangkat',
      nameEn: 'Dispatch and turnout',
      steps: [
        {
          kind: 'note',
          text: 'Pahami info awal dari dispatch dulu: lokasi, jenis bangunan, kondisi asap/api, kemungkinan korban, dan unit pendukung yang ikut. Respon Code 3.',
          en: 'Take in the dispatch details first: location, type of building, smoke and fire conditions, possible victims, and which supporting units are coming. Respond Code 3.',
        },
        {
          kind: 'me',
          text: 'mengenakan turnout gear lengkap lalu memeriksa gauge tabung SCBA sebelum naik ke unit.',
          en: 'puts on full turnout gear and checks the SCBA cylinder gauge before boarding the unit.',
        },
        {
          kind: 'do',
          text: 'Berapa tekanan udara yang tertera pada gauge SCBA? (penuh / di bawah setengah)',
          en: 'What air pressure does the SCBA gauge read? (full / below half)',
        },
        {
          kind: 'note',
          text: 'Tabung di bawah setengah diganti sebelum berangkat — udara itulah batas waktumu di dalam bangunan.',
          en: 'A cylinder below half is swapped before turnout — that air is your time limit inside the building.',
        },
        {
          kind: 'radio',
          label: 'Berangkat',
          labelEn: 'Turnout',
          text: '~ Status-5e, 10-97 CODE-3 to structure fire, 10-20 Grove Street.',
        },
      ],
    },
    {
      id: 'fireground',
      name: 'Pindah ke Fireground Frequency',
      nameEn: 'Switching to the Fireground Frequency',
      steps: [
        {
          kind: 'note',
          text: 'Semua komunikasi di lokasi pindah ke WT 917, supaya radio dispatch tidak penuh dan koordinasi di lapangan lebih cepat.',
          en: 'All on-scene traffic moves to WT 917, so the dispatch channel stays clear and the crew can coordinate faster.',
        },
        {
          kind: 'radio',
          label: 'IC ke semua unit',
          labelEn: 'IC to all units',
          text: 'Fire Alrik to all units on Grove Street structure fire scene, switch to Fireground Frequency 917.',
        },
        {
          kind: 'wt',
          label: 'Masuk WT',
          labelEn: 'On the WT',
          text: 'Udah masuk 917 ya, standby.',
        },
      ],
    },
    {
      id: 'size-up',
      name: 'Tiba & size-up',
      nameEn: 'Arrival and size-up',
      steps: [
        {
          kind: 'radio',
          label: 'Sampai lokasi',
          labelEn: 'On scene',
          text: '~ Status-6 on Grove Street scene, working structure fire.',
        },
        {
          kind: 'note',
          text: 'Size-up dilakukan SEBELUM masuk bangunan, dan dilaporkan sedetail mungkin lewat WT.',
          en: 'The size-up happens BEFORE anyone goes in, and it is passed over the WT in as much detail as you can give.',
        },
        {
          kind: 'me',
          text: 'berjalan mengitari bangunan untuk melihat keempat sisinya sebelum menentukan strategi.',
          en: 'walks around the building to see all four sides before settling on a strategy.',
        },
        {
          kind: 'do',
          text: 'Bagaimana kondisi api dan asap yang terlihat? (ringan / sedang / berat, dari lantai berapa)',
          en: 'What fire and smoke conditions are showing? (light / moderate / heavy, and from which floor)',
        },
        {
          kind: 'do',
          text: 'Apakah ada tanda korban masih berada di dalam bangunan?',
          en: 'Is there any sign that a victim is still inside the building?',
        },
        {
          kind: 'wt',
          label: 'Laporan size-up',
          labelEn: 'Size-up report',
          text: 'Udah di lokasi. Rumah 2 lantai, asap tebal keluar dari lantai 2, kayaknya masih ada orang di dalam. Kita langsung serang apinya.',
        },
        {
          kind: 'note',
          text: 'Pilih strategi: Offensive (masuk dan padamkan dari dalam, kalau masih aman), Defensive (dari luar saja, kalau api besar atau bangunan berisiko runtuh), Transitional (kendalikan dari luar dulu, baru masuk). Kalau ada korban, penyelamatan didahulukan.',
          en: 'Pick a strategy: Offensive (go in and put it out from inside, while that is still safe), Defensive (from outside only, when the fire is large or the building may collapse), Transitional (knock it down from outside first, then go in). If there is a victim, the rescue comes first.',
        },
        {
          kind: 'radio',
          label: 'Ada korban → minta bantuan',
          labelEn: 'Victim inside → request help',
          text: '~ to OCD. Requesting 10-70 additional unit at 10-20 Grove Street, possible victim trapped inside.',
        },
      ],
    },
    {
      id: 'scene-control',
      name: 'Amankan area',
      nameEn: 'Securing the scene',
      steps: [
        {
          kind: 'me',
          text: 'memasang garis pembatas di sekitar bangunan lalu mengarahkan warga menjauh dari area berbahaya.',
          en: 'runs fire line around the building and directs bystanders away from the danger area.',
        },
        {
          kind: 'shout',
          text: 'Semua mundur dari bangunan! Area ini berbahaya!',
          en: 'Everyone back away from the building! This area is dangerous!',
        },
        {
          kind: 'me',
          text: 'memeriksa sekeliling bangunan untuk mencari kabel listrik yang putus atau bagian struktur yang mulai retak.',
          en: 'checks around the building for downed power lines or structural parts starting to crack.',
        },
        {
          kind: 'note',
          text: 'Kalau warga tidak bisa dikendalikan, minta PD/SD lewat radio departemen.',
          en: 'If the crowd cannot be held back, request PD/SD over the department radio.',
        },
        {
          kind: 'deptradio',
          label: 'Minta PD/SD',
          labelEn: 'Request PD/SD',
          text: 'Fire @ to LSPD/LSSD. Requesting units for scene control at 10-20 Grove Street structure fire.',
        },
      ],
    },
    {
      id: 'suplai-air',
      name: 'Suplai air',
      nameEn: 'Water supply',
      steps: [
        {
          kind: 'note',
          text: 'Kalau ada beberapa hydrant, pilih yang bonnet-nya biru atau hijau — debitnya paling besar.',
          en: 'With more than one hydrant to choose from, take the blue or green bonnet — those flow the most.',
          branches: [
            { label: 'Kode warna hydrant', labelEn: 'Hydrant colour codes', to: 'hydrant#cat' },
          ],
        },
        {
          kind: 'me',
          text: 'mengambil hydrant wrench lalu membuka hydrant terdekat.',
          en: 'takes the hydrant wrench and opens the nearest hydrant.',
        },
        {
          kind: 'me',
          text: 'menarik supply hose dari hydrant ke arah Fire Engine lalu menyambungkannya ke intake pompa.',
          en: 'runs the supply hose from the hydrant to the Fire Engine and connects it to the pump intake.',
        },
        {
          kind: 'me',
          text: 'membuka valve secara perlahan.',
          en: 'opens the valve slowly.',
        },
        {
          kind: 'note',
          text: 'Kalau tidak ada hydrant di dekat lokasi:',
          en: 'If there is no hydrant near the scene:',
        },
        {
          kind: 'me',
          text: 'memeriksa indikator panel, lalu mengaktifkan internal water tank untuk menyalurkan air ke fire pump.',
          en: 'checks the panel indicator, then brings the internal water tank online to feed the fire pump.',
        },
      ],
    },
    {
      id: 'hose-line',
      name: 'Tarik hose line',
      nameEn: 'Laying the hose line',
      steps: [
        {
          kind: 'me',
          text: 'mengambil hose line dari apparatus, lalu melakukan flaking untuk merapikan jalur selang menuju entry point.',
          en: 'pulls the hose line off the apparatus and flakes it out to clear the run to the entry point.',
        },
        {
          kind: 'me',
          text: 'menarik hose line secara bertahap sambil memastikan tidak ada lilitan, tersangkut, atau tekukan yang menghambat aliran.',
          en: 'advances the hose line in stages, making sure nothing is twisted, snagged, or kinked enough to choke the flow.',
        },
        {
          kind: 'me',
          text: 'menyambungkan nozzle ke coupling dan mengencangkan pengunci hingga terpasang sempurna.',
          en: 'attaches the nozzle to the coupling and tightens the lock until it is fully seated.',
        },
        {
          kind: 'do',
          text: 'Hose line terpasang rapi, tidak ada kebocoran, dan siap dialiri air bertekanan.',
          en: 'The hose line is laid out cleanly, there are no leaks, and it is ready to be charged.',
        },
        {
          kind: 'me',
          label: 'engineer',
          labelEn: 'engineer',
          text: 'mengoperasikan pump panel untuk mengalirkan air bertekanan ke hose line.',
          en: 'works the pump panel to charge the hose line.',
        },
      ],
    },
    {
      id: 'door-check',
      name: 'Cek pintu',
      nameEn: 'Checking the door',
      steps: [
        {
          kind: 'me',
          text: 'mendekati pintu dengan posisi membungkuk, lalu menyentuh bagian atas pintu menggunakan punggung tangan.',
          en: 'approaches the door low and touches the top of it with the back of their hand.',
        },
        {
          kind: 'do',
          text: 'Apakah pintu terasa panas?',
          en: 'Does the door feel hot?',
          branches: [
            {
              label: 'Pintu terkunci → forcible entry',
              labelEn: 'Door locked → forcible entry',
              to: 'structure#forcible-entry',
            },
          ],
        },
        {
          kind: 'note',
          text: 'Pintu panas berarti api tepat di baliknya. Jangan dibuka lebar sekaligus — udara yang tiba-tiba masuk bisa memicu api menyembur (backdraft). Buka sedikit, semprot dulu, baru masuk.',
          en: 'A hot door means the fire is right behind it. Do not swing it wide open — the sudden air can set off a backdraft. Crack it, put water in first, then enter.',
        },
        {
          kind: 'me',
          text: 'mengarahkan tangan ke depan sebagai isyarat tim untuk melakukan entry ke dalam bangunan.',
          en: 'points a hand forward to signal the crew to make entry.',
        },
      ],
    },
    {
      id: 'forcible-entry',
      name: 'Forcible entry',
      nameEn: 'Forcible entry',
      steps: [
        {
          kind: 'note',
          text: 'Coba buka dulu sebelum dibobol — pintu yang ternyata tidak terkunci tidak perlu dirusak.',
          en: 'Try the door before forcing it — one that turns out to be unlocked does not need breaking.',
        },
        {
          kind: 'me',
          text: 'mencoba memutar gagang pintu untuk memastikan pintu benar-benar terkunci.',
          en: 'tries the door handle to confirm it really is locked.',
        },
        {
          kind: 'do',
          text: 'Apakah pintu terkunci?',
          en: 'Is the door locked?',
        },
        {
          kind: 'me',
          text: 'mengambil Halligan Bar dan kapak dari kompartemen Fire Engine lalu membawanya ke pintu.',
          en: 'takes the Halligan Bar and an axe from the Fire Engine compartment and carries them to the door.',
        },
        {
          kind: 'me',
          text: 'menyelipkan ujung Halligan Bar ke celah antara pintu dan kusen, tepat di dekat kuncinya.',
          en: 'sets the tip of the Halligan Bar into the gap between door and frame, right beside the lock.',
        },
        {
          kind: 'me',
          text: 'memukul pangkal Halligan Bar dengan kapak hingga ujungnya masuk lebih dalam, lalu mencongkelnya ke arah luar.',
          en: 'strikes the head of the Halligan Bar with the axe to drive it deeper, then levers it outwards.',
        },
        {
          kind: 'do',
          text: 'Pintu terbuka setelah dicongkel dengan Halligan Bar.',
          en: 'The door gives way once it is levered with the Halligan Bar.',
        },
      ],
    },
    {
      id: 'masuk',
      name: 'Masuk & bergerak ke titik api',
      nameEn: 'Entry and moving to the fire',
      steps: [
        {
          kind: 'me',
          text: 'mengambil crouch position di sisi pintu, satu tangan menggenggam nozzle mengarah ke depan, tangan kiri berpegangan pada dinding.',
          en: 'takes a crouch position at the side of the doorway, one hand on the nozzle pointed ahead, the left hand on the wall.',
        },
        {
          kind: 'me',
          text: 'bergerak perlahan menyusuri dinding sambil berjalan.',
          en: 'moves slowly along the wall.',
        },
        {
          kind: 'me',
          text: 'memberi isyarat ke tim di belakang agar hose line tetap terkontrol.',
          en: 'signals the crew behind to keep the hose line under control.',
        },
      ],
    },
    {
      id: 'pemadaman',
      name: 'Pemadaman',
      nameEn: 'Fire attack',
      steps: [
        {
          kind: 'me',
          text: 'mengambil posisi tubuh merendah, lalu mengarahkan nozzle ke dasar api untuk memutus segitiga api pada sumber pembakaran.',
          en: 'stays low and aims the nozzle at the base of the fire to break the fire triangle at its source.',
        },
        {
          kind: 'me',
          text: 'membuka aliran nozzle secara terkontrol, melakukan short burst untuk menghindari dorongan panas berlebihan ke dalam ruangan.',
          en: 'opens the nozzle in a controlled way, using short bursts so no excess heat is pushed through the room.',
        },
        {
          kind: 'me',
          text: 'melakukan sweeping dari kiri ke kanan untuk menjangkau seluruh area pembakaran yang terlihat.',
          en: 'sweeps left to right to reach every part of the burning area in sight.',
        },
        {
          kind: 'me',
          text: 'mengubah pola semprotan dari narrow stream ke fog pattern untuk mendinginkan area sekitar dan menurunkan suhu ruangan.',
          en: 'switches the stream from narrow to a fog pattern to cool the surroundings and bring the room temperature down.',
        },
        {
          kind: 'do',
          text: 'Intensitas api mulai berkurang, namun masih ada hotspot di beberapa titik.',
          en: 'The fire is losing intensity, but hotspots remain in several places.',
          branches: [
            {
              label: 'Asap tebal → ventilasi',
              labelEn: 'Heavy smoke → ventilation',
              to: 'structure#ventilasi',
            },
          ],
        },
        {
          kind: 'me',
          text: 'melanjutkan suppressive flow ke titik api utama sambil menjaga posisi rendah untuk menghindari heat layer.',
          en: 'keeps a suppressive flow on the main body of fire, staying low to stay under the heat layer.',
        },
        {
          kind: 'do',
          text: 'Api mulai kehilangan intensitas dan menyusut secara perlahan.',
          en: 'The fire is losing intensity and slowly shrinking back.',
        },
      ],
    },
    {
      id: 'ventilasi',
      name: 'Ventilasi',
      nameEn: 'Ventilation',
      steps: [
        {
          kind: 'note',
          text: 'Buka ventilasi hanya setelah hose line siap dan tim nozzle memberi tanda. Membuka jendela sebelum air siap justru memberi api pasokan oksigen baru.',
          en: 'Only ventilate once the hose line is charged and the nozzle crew gives the word. A window opened before the water is ready just hands the fire fresh oxygen.',
        },
        {
          kind: 'wt',
          label: 'Minta aba-aba',
          labelEn: 'Ask for the word',
          text: 'Jendela lantai 2 udah siap dipecah, nunggu aba-aba dari tim nozzle ya.',
        },
        {
          kind: 'me',
          text: 'berdiri di samping jendela, bukan di depannya, lalu memecahkan kacanya dengan kapak.',
          en: 'stands to the side of the window rather than in front of it, then breaks the glass with the axe.',
        },
        {
          kind: 'me',
          text: 'membersihkan sisa pecahan kaca di bingkai jendela dengan gagang kapak.',
          en: 'clears the remaining shards from the window frame with the axe handle.',
        },
        {
          kind: 'do',
          text: 'Asap tebal mulai keluar dari jendela dan jarak pandang di dalam ruangan membaik.',
          en: 'Heavy smoke starts lifting out of the window and visibility inside improves.',
        },
      ],
    },
    {
      id: 'knockdown',
      name: 'Knockdown',
      nameEn: 'Knockdown',
      steps: [
        {
          kind: 'me',
          text: 'melakukan sweeping perlahan ke area api yang tersisa sambil menurunkan intensitas aliran untuk mengontrol hotspot.',
          en: 'sweeps slowly across what fire is left, easing the flow back to control the hotspots.',
        },
        {
          kind: 'me',
          text: 'terus menyemprot hingga api benar-benar melemah dan tidak lagi membesar.',
          en: 'keeps water on it until the fire is truly beaten down and no longer growing.',
        },
        {
          kind: 'wt',
          label: 'Lapor knockdown',
          labelEn: 'Report knockdown',
          text: 'Api di lantai 2 udah jinak, lanjut nyari korban.',
        },
      ],
    },
    {
      id: 'search',
      name: 'Primary search',
      nameEn: 'Primary search',
      steps: [
        {
          kind: 'me',
          text: 'masuk ke dalam struktur dengan posisi merendah, mengikuti dinding untuk menghindari heat layer.',
          en: 'enters the structure low, following the wall to stay under the heat layer.',
        },
        {
          kind: 'me',
          text: 'melakukan pencarian sistematis di sepanjang dinding dan ruangan untuk mencari korban.',
          en: 'searches systematically along the walls and through the rooms for a victim.',
        },
        {
          kind: 'me',
          text: 'memeriksa kolong tempat tidur, lemari, dan kamar mandi — tempat korban biasa bersembunyi dari asap.',
          en: 'checks under beds, inside wardrobes, and in the bathroom — where victims usually hide from the smoke.',
        },
        {
          kind: 'me',
          text: 'berhenti sejenak untuk mendengarkan suara atau respons dari dalam ruangan.',
          en: 'stops for a moment to listen for a voice or any response from inside the room.',
        },
        {
          kind: 'shout',
          // Teriakannya memang sudah Inggris di panduan aslinya, jadi tidak ada
          // yang perlu diterjemahkan — `en` kembar akan ditolak tesnya.
          alreadyEn: true,
          text: 'Fire Department! If anyone is inside, make yourself known!',
        },
        {
          kind: 'do',
          text: 'Apakah terdengar suara?',
          en: 'Is any sound heard?',
          branches: [{ label: 'Ada korban', labelEn: 'Victim found', to: 'structure#korban' }],
        },
      ],
    },
    {
      id: 'korban',
      name: 'Korban ditemukan',
      nameEn: 'Victim found',
      steps: [
        {
          kind: 'me',
          text: 'meraba bentuk tubuh korban yang tergeletak di lantai lalu menahannya agar tidak bergeser.',
          en: 'feels out the shape of the victim lying on the floor and steadies them so they do not shift.',
        },
        {
          kind: 'wt',
          label: 'Lapor korban',
          labelEn: 'Report the victim',
          text: 'Nemu satu korban di lantai 2, lagi saya bawa keluar.',
        },
        {
          kind: 'note',
          text: 'Pemeriksaan di dalam dibuat singkat — cukup untuk menentukan cara evakuasi. Penanganan lengkap dilakukan di luar zona bahaya.',
          en: 'Keep the check inside short — just enough to decide how to get them out. The full assessment happens outside the danger zone.',
        },
        {
          kind: 'me',
          text: 'mengguncang bahu korban sambil memanggilnya dengan suara keras.',
          en: "shakes the victim's shoulder while calling out to them loudly.",
        },
        {
          kind: 'shout',
          text: 'Pak! Bu! Bisa dengar saya?',
          en: "Sir! Ma'am! Can you hear me?",
        },
        {
          kind: 'do',
          text: 'Bagaimana respons korban? (A / V / P / U)',
          en: 'How does the victim respond? (A / V / P / U)',
        },
        {
          kind: 'me',
          text: 'mendekatkan wajah ke mulut korban sambil melihat dadanya, memastikan korban masih bernapas.',
          en: "leans their face close to the victim's mouth while watching the chest, checking the victim is still breathing.",
        },
        {
          kind: 'do',
          text: 'Apakah korban masih bernapas?',
          en: 'Is the victim still breathing?',
        },
      ],
    },
    {
      id: 'evakuasi',
      name: 'Evakuasi korban',
      nameEn: 'Removing the victim',
      steps: [
        {
          kind: 'note',
          text: 'Underarm drag — korban tidak sadar, ruang sempit, jarak pandang rendah.',
          en: 'Underarm drag — the victim is unconscious, the space is tight, and visibility is low.',
        },
        {
          kind: 'me',
          text: 'berlutut di samping korban, memasukkan kedua tangan ke bawah ketiak korban lalu mengunci grip pada lengan atasnya.',
          en: 'kneels beside the victim, slides both hands under their armpits, and locks a grip on their upper arms.',
        },
        {
          kind: 'me',
          text: 'menarik korban sambil mengikuti hose line menuju pintu keluar.',
          en: 'drags the victim out, following the hose line to the exit.',
        },
        {
          kind: 'note',
          text: 'Shoulder drag — korban tidak sadar dan jarak ke pintu keluar lebih jauh.',
          en: 'Shoulder drag — the victim is unconscious and the exit is further away.',
        },
        {
          kind: 'me',
          text: 'meraih bahu dan kerah korban, lalu menarik tubuhnya ke belakang sambil bergerak mundur mengikuti hose line.',
          en: "takes hold of the victim's shoulders and collar and hauls them backwards, moving in reverse along the hose line.",
        },
        {
          kind: 'me',
          text: 'membaringkan korban di area aman di luar bangunan lalu menyerahkannya ke tim RA.',
          en: 'lays the victim down in a safe area outside the building and hands them over to the RA crew.',
        },
        {
          kind: 'note',
          text: 'Korban kebakaran hampir selalu menghirup asap. Pasang NRB walau napasnya terlihat normal — keracunan asap tidak selalu kelihatan dari luar.',
          en: 'A fire victim has almost always breathed smoke. Fit an NRB even if the breathing looks normal — smoke poisoning does not always show from outside.',
          branches: [
            { label: 'Penanganan korban', labelEn: 'Victim care', to: 'field#response' },
            { label: 'Pasang NRB', labelEn: 'Fit an NRB', to: 'breathing#breathing-nrb' },
            { label: 'Luka bakar', labelEn: 'Burns', to: 'wounds#luka-bakar-ringan' },
          ],
        },
      ],
    },
    {
      id: 'overhaul',
      name: 'Overhaul',
      nameEn: 'Overhaul',
      steps: [
        {
          kind: 'note',
          text: 'Api utama sudah padam, tapi bara bisa bersembunyi di balik dinding, plafon, dan puing lalu menyala lagi.',
          en: 'The main body of fire is out, but embers can sit hidden behind walls, above ceilings, and in the debris, and light up again.',
        },
        {
          kind: 'me',
          text: 'mengarahkan thermal imaging camera ke dinding dan plafon untuk mencari titik panas yang tidak terlihat.',
          en: 'sweeps the thermal imaging camera across the walls and ceiling to find hotspots the eye cannot see.',
        },
        {
          kind: 'me',
          text: 'menggunakan pike pole untuk memeriksa dan menarik bagian plafon yang terlihat hangus.',
          en: 'uses the pike pole to check and pull down the charred sections of ceiling.',
        },
        {
          kind: 'do',
          text: 'Apakah ada bara api yang tersisa?',
          en: 'Are there any embers left?',
        },
        {
          kind: 'me',
          text: 'mengarahkan hose line dengan aliran rendah ke area yang masih panas.',
          en: 'puts a low flow from the hose line onto the areas still holding heat.',
        },
      ],
    },
    {
      id: 'terminasi',
      name: 'Terminasi & RTB',
      nameEn: 'Termination and RTB',
      steps: [
        {
          kind: 'me',
          text: 'melakukan pengecekan akhir ke seluruh ruangan, memastikan tidak ada asap, bara, maupun titik panas yang tersisa.',
          en: 'makes a final pass through every room, confirming no smoke, embers, or hotspots are left.',
        },
        {
          kind: 'do',
          text: 'Apakah seluruh area sudah dinyatakan aman?',
          en: 'Has the whole area been declared safe?',
        },
        {
          kind: 'me',
          text: 'menggulung hose line, lalu mengembalikan nozzle dan forcible entry tools ke kompartemen Fire Engine.',
          en: 'rolls up the hose line and returns the nozzle and forcible entry tools to the Fire Engine compartment.',
        },
        {
          kind: 'me',
          label: 'engineer',
          labelEn: 'engineer',
          text: 'memeriksa sisa air di tangki dan kondisi pump panel untuk kesiapan panggilan berikutnya.',
          en: 'checks the water left in the tank and the state of the pump panel, ready for the next call.',
        },
        {
          kind: 'wt',
          label: 'Tutup fireground',
          labelEn: 'Close the fireground',
          text: 'Api udah aman semua, kita keluar dari 917 ya. Makasih semuanya.',
        },
        {
          kind: 'radio',
          label: 'RTB',
          labelEn: 'RTB',
          text: '~ reporting CODE-4 and 10-99 from Grove Street structure fire, now RTB to 10-20 DFS.',
        },
      ],
    },
  ],
}
