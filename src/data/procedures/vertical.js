// Vertical Rescue — chat RP dari "VERTICAL RESCUE" dan panduan helikopter di draft.md.
//
// Frasa radionya dirapikan mengikuti kebiasaan penerbangan Amerika:
// - Helipad LSFD hanya DFS dan PBH. ASGH/CGH/FS di naskah asal terbawa dari
//   panduan server lain dan dihapus.
// - Selalu VFR. IFR menuntut rencana penerbangan yang diajukan lebih dulu dan
//   tidak dipakai unit penyelamat yang terbang dengan pandangan mata.
// - Squawk 1200 adalah kode transponder VFR baku di Amerika saat tidak sedang
//   dilayani ATC. Kalau ATC memberi kode khusus, pakai kode itu. 7700 hanya
//   untuk pesawat yang sendirinya sedang darurat.

export default {
  id: 'vertical',
  group: 'khusus',
  name: 'Vertical Rescue',
  nameEn: 'Vertical Rescue',
  blurb: 'Radio penerbangan, koordinasi IC dengan Rescuer, dan penurunan korban dari tebing.',
  blurbEn:
    'Aviation radio, IC coordinating with the Rescuer, and lowering the victim off a cliff.',
  sections: [
    {
      id: 'radio-latihan',
      name: 'Radio — latihan dari DFS',
      nameEn: 'Radio — training flight from DFS',
      steps: [
        {
          kind: 'radio',
          label: 'Minta izin',
          labelEn: 'Request clearance',
          text: 'Fire Alrik to OCD. Requesting permission for duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lapor bertugas',
          labelEn: 'Report on duty',
          text: 'Fire Alrik now duty as Pilot of ~ and unavailable for Vertical Rescue Training.',
        },
        {
          kind: 'radio',
          label: 'Lapor lepas landas',
          labelEn: 'Report takeoff',
          text: 'Fire Alrik under ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, over.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor ke ATC',
          labelEn: 'Report to ATC',
          text: 'ATC, ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, squawk 1200.',
        },
        { kind: 'radio', label: 'Lapor mendarat', labelEn: 'Report landing', text: '~ has fully landed on DFS helipad, full-stop.' },
      ],
    },
    {
      id: 'radio-lifeflight',
      name: 'Radio — panggilan helikopter',
      nameEn: 'Radio — helicopter callout',
      steps: [
        {
          kind: 'note',
          text: 'OCD menanyakan 10-21 Pilot Certified lebih dulu, dan jawaban itu wajib dibalas. Pastikan unitmu sudah dibuat lewat /createunit supaya ~ terisi nama unit.',
          en: 'OCD asks for a 10-21 Pilot Certified first, and that call has to be answered. Make sure your unit exists via /createunit so the ~ fills in with the unit name.',
        },
        {
          kind: 'radio',
          label: 'Jawab 10-21',
          labelEn: 'Answer the 10-21',
          text: 'Fire Alrik on duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lepas landas',
          labelEn: 'Takeoff',
          text: '~ airborne from PBH helipad, alt 400, department call, VFR, heading North on departure, over.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor ke ATC',
          labelEn: 'Report to ATC',
          text: 'ATC, ~ airborne from PBH helipad, alt 400, VFR, heading North on departure, squawk 1200.',
        },
        {
          kind: 'radio',
          label: 'Mendarat darurat di lokasi',
          labelEn: 'Emergency landing on scene',
          text: '~ emergency landing on Angel Pine area.',
        },
        { kind: 'radio', label: 'Sampai lokasi', labelEn: 'On scene', text: '~ Status-6 10-20 Angel Pine.' },
        {
          kind: 'radio',
          label: 'Selesai menangani',
          labelEn: 'Treatment complete',
          text: '~ 10-99 from Angel Pine scene, victim has been taken by Rescue, airborne from scene, alt 400, VFR, departing North for RTB.',
        },
        {
          kind: 'radio',
          label: 'Sudah mendarat',
          labelEn: 'Landed',
          text: '~ has fully landed on PBH helipad, full-stop.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor mendarat ke ATC',
          labelEn: 'Report the landing to ATC',
          text: 'ATC, ~ has fully landed on PBH helipad, full-stop.',
        },
      ],
    },
    {
      id: 'ic-rescuer',
      name: 'Koordinasi IC dengan Rescuer',
      nameEn: 'IC coordinating with the Rescuer',
      steps: [
        { kind: 'note', text: 'Yang memegang IC adalah Pilot atau Co-Pilot. Biasanya Co-Pilot.', en: 'IC is held by the Pilot or the Co-Pilot. Usually the Co-Pilot.' },
        {
          kind: 'radio',
          label: 'IC',
          labelEn: 'IC',
          text: '~ take over IC. IC to Rescuer, bersiap untuk melakukan Vertical Rescue.',
          en: '~ take over IC. IC to Rescuer, stand by for a Vertical Rescue.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          labelEn: 'Rescuer',
          text: 'Rescuer to IC, persiapan telah selesai, silahkan melanjutkan observasi.',
          en: 'Rescuer to IC, preparations complete, go ahead with your observation.',
        },
        {
          kind: 'radio',
          label: 'IC',
          labelEn: 'IC',
          text: 'IC to Rescuer, lokasi sudah ditentukan, silahkan memasangkan device ke Steel Rod.',
          en: 'IC to Rescuer, the location is set, go ahead and attach the device to the Steel Rod.',
        },
        { kind: 'radio', label: 'Rescuer', labelEn: 'Rescuer', text: 'Rescuer to IC, harness telah terpasang.' },
        {
          kind: 'me',
          text: 'memasangkan Ferno basket stretcher ke carabiner lalu mengaitkannya ke steel rod.',
          en: 'clips the Ferno basket stretcher to a carabiner and hooks it onto the steel rod.',
        },
        {
          kind: 'me',
          text: 'memasangkan safety harness ke steel rod sambil memangku Ferno basket stretcher.',
          en: 'clips their safety harness to the steel rod while holding the Ferno basket stretcher on their lap.',
        },
        {
          kind: 'me',
          text: 'menekan tombol rod activation, membuka kunci pengaman, lalu menekan tombol turun untuk menurunkan steel rod.',
          en: 'presses the rod activation button, releases the safety lock, then presses the descend button to lower the steel rod.',
        },
        { kind: 'radio', label: 'Rescuer', labelEn: 'Rescuer', text: 'Rescuer to IC, saya sudah berada di ground.', en: 'Rescuer to IC, I am on the ground.' },
        {
          kind: 'radio',
          label: 'IC',
          labelEn: 'IC',
          text: 'IC to Rescuer, di copy. Silahkan menuju ke lokasi korban dan lakukan penanganan. Saya akan mendarat di tempat yang memungkinkan.',
          en: 'IC to Rescuer, copy that. Proceed to the victim and begin treatment. I will land wherever I can.',
        },
        {
          kind: 'me',
          text: 'menaikkan korban ke atas Ferno basket stretcher dan mengencangkan sabuk Velcro di setiap bagian.',
          en: 'lifts the victim onto the Ferno basket stretcher and tightens the Velcro straps at every point.',
        },
      ],
    },
    {
      id: 'ground',
      name: 'Ground Vertical Rescue',
      nameEn: 'Ground Vertical Rescue',
      steps: [
        {
          kind: 'note',
          text: 'Dipakai saat korban terjebak di tebing atau tempat yang tidak bisa digapai dari darat.',
          en: 'Used when the victim is stuck on a cliff or somewhere that cannot be reached from the ground.',
        },
        {
          kind: 'me',
          text: 'membuat simpul di pohon menggunakan descender lalu membuat dua anchor point.',
          en: 'ties off to a tree with the descender and builds two anchor points.',
        },
        {
          kind: 'me',
          text: 'memasang static rope ke anchor lalu mengaitkan descender ke harness dengan carabiner.',
          en: 'rigs the static rope to the anchor and clips the descender to the harness with a carabiner.',
        },
        {
          kind: 'me',
          text: 'memasang static rope kedua ke anchor lalu mengaitkan figure of eight ke basket stretcher.',
          en: 'rigs a second static rope to the anchor and clips a figure of eight to the basket stretcher.',
        },
        { kind: 'me', text: 'menurunkan basket stretcher terlebih dahulu dengan teknik katrol.', en: 'lowers the basket stretcher first, using a pulley system.' },
        {
          kind: 'me',
          text: 'turun dengan berhati-hati sembari membuka perlahan katup descender agar pengait tidak terlalu menggigit tali.',
          en: 'descends carefully, easing the descender open so the brake does not bite too hard on the rope.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          labelEn: 'Rescuer',
          text: 'Rescuer to IC, korban sudah berada di bawah dengan aman. Requesting pickup at my location.',
          en: 'Rescuer to IC, the victim is safely down. Requesting pickup at my location.',
        },
      ],
    },
  ],
}
