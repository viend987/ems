// Luka Ringan — dari "GRAZE PROCEDURE" dan "BRUISE PROCEDURE" di LSFD RP.md

export default {
  id: 'wounds',
  group: 'tkp',
  name: 'Luka Ringan',
  blurb: 'Luka lecet dan memar — tanpa pendarahan masif.',
  sections: [
    {
      id: 'graze',
      name: 'Graze (luka lecet)',
      steps: [
        { n: 211, kind: 'me', text: 'mengeluarkan satu botol kecil Saline Solution dari ILS Bag.' },
        { n: 212, kind: 'me', text: 'menuangkan Saline Solutionnya ke atas cotton pad.' },
        {
          n: 213,
          kind: 'me',
          text: 'mengeluarkan gauze pad lalu meletakkannya di atas luka dan memerbannya perlahan.',
        },
      ],
    },
    {
      id: 'bruise',
      name: 'Bruise (memar)',
      steps: [
        {
          n: 214,
          kind: 'me',
          text: 'memeriksa kembali kondisi korban dengan teknik palpasi untuk mencari adanya luka memar.',
        },
        { n: 215, kind: 'do', text: 'Apakah terdapat luka memar/bruise pada tubuh korban?' },
        {
          n: 216,
          kind: 'me',
          text: 'mengambil ICP serta kain tipis dari ILS Bag lalu membungkus ICP dengan kain tipis.',
        },
        {
          n: 217,
          kind: 'me',
          text: 'meletakkan ICP yang dibalut kain tersebut di atas luka memar korban selama 15 menit.',
        },
        { n: 218, kind: 'do', text: '15 menit telah berlalu, ICP telah mencair.' },
        { n: 219, kind: 'me', text: 'mengangkat ICP dari tubuh korban lalu memasukan ICP ke ILS Bag.' },
        {
          n: 220,
          kind: 'me',
          text: 'mengambil elastic bandage dari ILS Bag lalu menaruhnya di luka korban dan menutupnya.',
        },
      ],
    },
  ],
}
