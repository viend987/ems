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
      steps: [
        {
          kind: 'radio',
          label: 'Minta izin',
          text: 'Fire Alrik to OCD. Requesting permission for duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lapor bertugas',
          text: 'Fire Alrik now duty as Pilot of ~ and unavailable for Vertical Rescue Training.',
        },
        {
          kind: 'radio',
          label: 'Lapor lepas landas',
          text: 'Fire Alrik under ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, over.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor ke ATC',
          text: 'ATC, ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, squawk 1200.',
        },
        { kind: 'radio', label: 'Lapor mendarat', text: '~ has fully landed on DFS helipad, full-stop.' },
      ],
    },
    {
      id: 'radio-lifeflight',
      name: 'Radio — panggilan helikopter',
      steps: [
        {
          kind: 'note',
          text: 'OCD menanyakan 10-21 Pilot Certified lebih dulu, dan jawaban itu wajib dibalas. Pastikan unitmu sudah dibuat lewat /createunit supaya ~ terisi nama unit.',
        },
        {
          kind: 'radio',
          label: 'Jawab 10-21',
          text: 'Fire Alrik on duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lepas landas',
          text: '~ airborne from PBH helipad, alt 400, department call, VFR, heading North on departure, over.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor ke ATC',
          text: 'ATC, ~ airborne from PBH helipad, alt 400, VFR, heading North on departure, squawk 1200.',
        },
        {
          kind: 'radio',
          label: 'Mendarat darurat di lokasi',
          text: '~ emergency landing on Angel Pine area.',
        },
        { kind: 'radio', label: 'Sampai lokasi', text: '~ Status-6 10-20 Angel Pine.' },
        {
          kind: 'radio',
          label: 'Selesai menangani',
          text: '~ 10-99 from Angel Pine scene, victim has been taken by Rescue, airborne from scene, alt 400, VFR, departing North for RTB.',
        },
        {
          kind: 'radio',
          label: 'Sudah mendarat',
          text: '~ has fully landed on PBH helipad, full-stop.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor mendarat ke ATC',
          text: 'ATC, ~ has fully landed on PBH helipad, full-stop.',
        },
      ],
    },
    {
      id: 'ic-rescuer',
      name: 'Koordinasi IC dengan Rescuer',
      steps: [
        { kind: 'note', text: 'Yang memegang IC adalah Pilot atau Co-Pilot. Biasanya Co-Pilot.' },
        {
          kind: 'radio',
          label: 'IC',
          text: '~ take over IC. IC to Rescuer, bersiap untuk melakukan Vertical Rescue.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          text: 'Rescuer to IC, persiapan telah selesai, silahkan melanjutkan observasi.',
        },
        {
          kind: 'radio',
          label: 'IC',
          text: 'IC to Rescuer, lokasi sudah ditentukan, silahkan memasangkan device ke Steel Rod.',
        },
        { kind: 'radio', label: 'Rescuer', text: 'Rescuer to IC, harness telah terpasang.' },
        {
          kind: 'me',
          text: 'memasangkan Ferno basket stretcher ke carabiner lalu mengaitkannya ke steel rod.',
        },
        {
          kind: 'me',
          text: 'memasangkan safety harness ke steel rod sambil memangku Ferno basket stretcher.',
        },
        {
          kind: 'me',
          text: 'menekan tombol rod activation, membuka kunci pengaman, lalu menekan tombol turun untuk menurunkan steel rod.',
        },
        { kind: 'radio', label: 'Rescuer', text: 'Rescuer to IC, saya sudah berada di ground.' },
        {
          kind: 'radio',
          label: 'IC',
          text: 'IC to Rescuer, di copy. Silahkan menuju ke lokasi korban dan lakukan penanganan. Saya akan mendarat di tempat yang memungkinkan.',
        },
        {
          kind: 'me',
          text: 'menaikkan korban ke atas Ferno basket stretcher dan mengencangkan sabuk Velcro di setiap bagian.',
        },
      ],
    },
    {
      id: 'ground',
      name: 'Ground Vertical Rescue',
      steps: [
        {
          kind: 'note',
          text: 'Dipakai saat korban terjebak di tebing atau tempat yang tidak bisa digapai dari darat.',
        },
        {
          kind: 'me',
          text: 'membuat simpul di pohon menggunakan descender lalu membuat dua anchor point.',
        },
        {
          kind: 'me',
          text: 'memasang static rope ke anchor lalu mengaitkan descender ke harness dengan carabiner.',
        },
        {
          kind: 'me',
          text: 'memasang static rope kedua ke anchor lalu mengaitkan figure of eight ke basket stretcher.',
        },
        { kind: 'me', text: 'menurunkan basket stretcher terlebih dahulu dengan teknik katrol.' },
        {
          kind: 'me',
          text: 'turun dengan berhati-hati sembari membuka perlahan katup descender agar pengait tidak terlalu menggigit tali.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          text: 'Rescuer to IC, korban sudah berada di bawah dengan aman. Requesting pickup at my location.',
        },
      ],
    },
  ],
}
