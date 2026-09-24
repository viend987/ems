// DEAT / Pendarahan — dari "BLEEDING PROCEDURE (DEAT)" di LSFD RP.md
// Dipakai untuk GSW, Vital Wound, Flesh Wound, dan Open Fracture.

export default {
  id: 'deat',
  group: 'tkp',
  name: 'DEAT / Pendarahan',
  blurb: 'Direct pressure → elevation → arterial pressure → tourniquet. Naik tingkat kalau darah belum berhenti.',
  sections: [
    {
      id: 'direct-pressure',
      name: 'Direct Pressure',
      steps: [
        {
          n: 71,
          kind: 'me',
          text: 'mengambil Trauma Scissor dari ILS Bag lalu menggunting pakaian korban yang menutupi luka.',
        },
        {
          n: 72,
          kind: 'me',
          text: 'mengambil Trauma Dressing dari ILS Bag lalu meletakkannya diatas luka korban sambil memberi tekanan.',
        },
        {
          id: 'bleed-check',
          n: 73,
          kind: 'do',
          text: 'Apakah pendarahan berhenti?',
          branches: [
            { label: 'Berhenti → lanjut ABC', to: 'abc#airway-headtilt' },
            { label: 'Masih → Elevation', to: 'deat#elevation' },
          ],
        },
        { kind: 'note', text: 'Kalau belum berhenti, lapisi ulang dulu sebelum naik ke Elevation.' },
        { n: 74, kind: 'me', text: 'mengambil trauma dressing yang baru dari dalam ILS Bag.' },
        { n: 75, kind: 'me', text: 'melapisi kembali area pendarahan dengan trauma dressing yang baru.' },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'elevation',
      name: 'Elevation',
      steps: [
        {
          n: 76,
          kind: 'me',
          text: 'mengangkat bagian tubuh korban yang mengalami luka lebih tinggi daripada jantung.',
        },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'arterial',
      name: 'Arterial Pressure',
      steps: [
        {
          n: 77,
          kind: 'me',
          text: 'memberi tekanan dengan menutup aliran darah di bagian pembuluh darah korban.',
        },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'tourniquet',
      name: 'Tourniquet — luka di tangan/kaki',
      steps: [
        { n: 78, kind: 'me', text: 'mengambil tourniquet dan memasangnya 5cm di atas luka.' },
        { n: 79, kind: 'me', text: 'mengencangkan windlass sampai perdarahan berhenti.' },
        { n: 80, kind: 'me', text: 'memastikan tourniquet tetap pada posisi dan tidak longgar.' },
        { id: 'bleed-controlled', n: 73, kind: 'do', text: 'Terlihat pendarahan mulai dapat diatasi.' },
      ],
    },
    {
      id: 'croc',
      name: 'CRoC — luka di tubuh',
      steps: [
        { n: 81, kind: 'me', text: 'mengeluarkan CRoC dari dalam ILS Bag.' },
        { n: 82, kind: 'me', text: 'merakit CRoC.' },
        { n: 83, kind: 'me', text: 'meletakkan CRoC di atas area pendarahan.' },
        { n: 84, kind: 'me', text: 'memposisikan kepala cakram CRoC menyentuh area pendarahan.' },
        { n: 85, kind: 'me', text: 'memutar T-Handle, memberikan tekanan hingga pendarahan berhenti.' },
        { n: 86, kind: 'me', text: 'memasangkan tali pengaman.' },
        { ref: 'bleed-controlled' },
        {
          kind: 'note',
          text: 'Kalau korban kehilangan banyak darah, lanjutkan dengan ILS IV Lactated Ringer.',
          branches: [{ label: 'Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
      ],
    },
  ],
}
