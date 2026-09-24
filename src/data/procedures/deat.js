// DEAT / Pendarahan — dari "BLEEDING PROCEDURE (DEAT)" di draft.md.
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
          text: 'mengambil Trauma Dressing dari ILS Bag lalu meletakkannya di atas luka korban sambil memberi tekanan.',
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
        { kind: 'note', text: 'Jika belum berhenti, lapisi ulang dulu sebelum naik ke Elevation.' },
        { n: 74, kind: 'me', text: 'mengambil trauma dressing yang baru dari ILS Bag.' },
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
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'croc',
      name: 'CRoC — luka di tubuh / groin',
      steps: [
        { n: 81, kind: 'me', text: 'mengeluarkan CRoC dari dalam ILS Bag dan merakitnya.' },
        { n: 82, kind: 'me', text: 'memposisikan pressure plate CRoC tepat di atas area pendarahan.' },
        {
          n: 83,
          kind: 'me',
          text: 'melilitkan strap CRoC pada area groin dan mengencangkannya untuk menstabilkan alat.',
        },
        {
          n: 84,
          kind: 'me',
          text: 'memutar windlass secara perlahan untuk memberikan kompresi langsung hingga pendarahan berhenti.',
        },
        {
          n: 85,
          kind: 'me',
          text: 'mengunci windlass pada pengait pengaman CRoC untuk menjaga tekanan tetap stabil.',
        },
        { ref: 'bleed-check' },
        {
          kind: 'note',
          text: 'Kalau korban kehilangan banyak darah, lanjutkan dengan ILS IV Lactated Ringer.',
          branches: [{ label: 'Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
      ],
    },
  ],
}
