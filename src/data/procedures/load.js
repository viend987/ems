// Patient Load — dari "PATIENT LOAD PROCEDURE" di LSFD RP.md

export default {
  id: 'load',
  group: 'transport',
  name: 'Patient Load',
  nameEn: 'Patient Load',
  blurb: 'Memindahkan korban ke gurney dan memuatnya ke unit, lalu lapor radio.',
  blurbEn:
    'Moving the victim onto the gurney and into the unit, then the radio report.',
  sections: [
    {
      id: 'load',
      name: 'Muat korban',
      nameEn: 'Load the victim',
      steps: [
        {
          n: 37,
          kind: 'me',
          text: 'merapikan peralatan yang digunakan lalu mengambil gurney dari dalam Unit Kendaraan dan membawanya ke samping korban.',
          en: 'tidies away the equipment used, fetches the gurney from the unit, and brings it alongside the victim.',
        },
        { n: 38, kind: 'command', text: '/removebarrier', note: 'menghapus objek /fo yang tadi dipasang', noteEn: 'removes the /fo object placed earlier' },
        { n: 39, kind: 'command', text: '/gurney get 3', note: 'pilihan 1 sampai 4, biasanya 3', noteEn: 'options 1 to 4, usually 3' },
        {
          n: 40,
          kind: 'me',
          text: 'memindahkan korban ke atas gurney lalu mendorongnya sampai ke Unit Kendaraan dan memasukkan korban dengan hati-hati.',
          en: 'lifts the victim onto the gurney, wheels it to the unit, and loads them in carefully.',
        },
        { kind: 'command', text: '/gurney load [id]' },
        { n: 41, kind: 'command', text: '/gurney put' },
      ],
    },
    {
      id: 'load-radio',
      name: 'Lapor radio setelah dimuat',
      nameEn: 'Radio report once loaded',
      steps: [
        { ref: 'loaded-victim-fracture' },
        { ref: 'loaded-victim-gsw' },
        { ref: 'loaded-suspect-gsw' },
        { ref: 'loaded-suspect-fracture' },
        {
          kind: 'note',
          text: 'Lanjut ke prosedur setibanya di rumah sakit.',
          en: 'Carry on with the procedure for arriving at the hospital.',
          branches: [{ label: 'Sampai di PBH', labelEn: 'Arriving at PBH', to: 'hospital#arrive' }],
        },
      ],
    },
  ],
}
