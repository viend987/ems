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
      id: 'luka-bakar-ringan',
      name: 'Luka bakar tingkat 1 & 2',
      steps: [
        {
          kind: 'note',
          text: 'Tingkat 1: kulit kemerahan, kering, nyeri ringan. Tingkat 2: merah, lembap, nyeri parah.',
        },
        {
          kind: 'me',
          text: 'memeriksa area luka bakar korban untuk menentukan tingkat keparahannya.',
        },
        {
          kind: 'do',
          text: 'Bagaimana tampak dan tekstur kulit pada area luka bakar korban? (kemerahan kering / merah lembap / putih kering / hitam kasar)',
          branches: [{ label: 'Putih atau hitam → tingkat 3 & 4', to: 'wounds#luka-bakar-berat' }],
        },
        {
          kind: 'me',
          text: 'mengambil ICP dari ILS Bag lalu menempelkannya pada area luka bakar selama 10 sampai 15 menit.',
        },
        { kind: 'do', text: '15 menit telah berlalu dan area luka bakar terasa lebih dingin.' },
        {
          kind: 'me',
          text: 'menutup luka bakar dengan non-stick bandage lalu merekatkannya dengan medical tape.',
        },
        {
          kind: 'note',
          text: 'Beri Ibuprofen bila korban kesakitan. Kalau butuh obat lain, hubungi unit ILS lewat radio.',
          branches: [{ label: 'Ibuprofen', to: 'drugs#ibuprofen' }],
        },
      ],
    },
    {
      id: 'luka-bakar-berat',
      name: 'Luka bakar tingkat 3 & 4',
      steps: [
        {
          kind: 'note',
          text: 'Tingkat 3: kulit dalam rusak, putih, kering, mati rasa. Tingkat 4: hitam, kasar, mati rasa. Jangan pakai ICP atau air dingin di tingkat ini.',
        },
        {
          kind: 'me',
          text: 'menutup luka bakar dengan non-stick bandage lalu merekatkannya dengan medical tape.',
        },
        {
          kind: 'me',
          text: 'memasang dressing pada luka bakar yang berada di tangan atau kaki korban.',
        },
        {
          kind: 'me',
          text: 'meninggikan bagian tubuh korban yang terbakar lalu menyelimutinya agar tetap hangat selama perjalanan.',
        },
        {
          kind: 'do',
          text: 'Terlihat luka bakar korban sudah tertutup dan tubuhnya tetap hangat.',
          branches: [{ label: 'Muat korban', to: 'load#load' }],
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
