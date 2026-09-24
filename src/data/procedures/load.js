// Patient Load — dari "PATIENT LOAD PROCEDURE" di LSFD RP.md

export default {
  id: 'load',
  group: 'transport',
  name: 'Patient Load',
  blurb: 'Memindahkan korban ke gurney dan memuatnya ke unit, lalu lapor radio.',
  sections: [
    {
      id: 'load',
      name: 'Muat korban',
      steps: [
        {
          n: 37,
          kind: 'me',
          text: 'merapikan peralatan yang digunakan lalu mengambil gurney dari dalam Unit Kendaraan dan membawanya ke samping korban.',
        },
        { n: 38, kind: 'command', text: '/removebarrier' },
        { n: 39, kind: 'command', text: '/gurney get 2' },
        {
          n: 40,
          kind: 'me',
          text: 'memindahkan korban ke atas gurney lalu mendorongnya sampai ke Unit Kendaraan dan memasukkan korban dengan hati-hati.',
        },
        { kind: 'command', text: '/gurney load [id]' },
        { n: 41, kind: 'command', text: '/gurney return' },
      ],
    },
    {
      id: 'load-radio',
      name: 'Lapor radio setelah dimuat',
      steps: [
        { ref: 'loaded-victim-fracture' },
        { ref: 'loaded-victim-gsw' },
        { ref: 'loaded-suspect-gsw' },
        { ref: 'loaded-suspect-fracture' },
        {
          kind: 'note',
          text: 'Lanjut ke prosedur setibanya di rumah sakit.',
          branches: [{ label: 'Sampai di PBH', to: 'hospital#arrive' }],
        },
      ],
    },
  ],
}
