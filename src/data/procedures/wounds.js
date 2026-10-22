// Luka Ringan — dari "GRAZE PROCEDURE" dan "BRUISE PROCEDURE" di LSFD RP.md

export default {
  id: 'wounds',
  group: 'tkp',
  name: 'Luka Ringan',
  nameEn: 'Minor Wounds',
  blurb: 'Luka lecet dan memar — tanpa pendarahan masif.',
  blurbEn:
    'Grazes and bruises — nothing with massive bleeding.',
  sections: [
    {
      id: 'graze',
      name: 'Graze (luka lecet)',
      nameEn: 'Graze',
      steps: [
        { n: 211, kind: 'me', text: 'mengeluarkan satu botol kecil Saline Solution dari ILS Bag.', en: 'takes a small bottle of Saline Solution out of the ILS Bag.' },
        { n: 212, kind: 'me', text: 'menuangkan cairan Saline Solution ke atas kapas steril (cotton pad).', en: 'pours Saline Solution onto a sterile cotton pad.' },
        {
          n: 213,
          kind: 'me',
          text: 'menutup luka menggunakan gauze pad lalu membalutnya dengan perban secara rapi.',
          en: 'covers the wound with a gauze pad and wraps it neatly with a bandage.',
        },
      ],
    },
    {
      id: 'luka-bakar-ringan',
      name: 'Luka bakar tingkat 1 & 2',
      nameEn: 'Burns, first and second degree',
      steps: [
        {
          kind: 'note',
          text: 'Tingkat 1: kulit kemerahan, kering, nyeri ringan. Tingkat 2: merah, lembap, nyeri parah.',
          en: 'First degree: skin reddened, dry, mildly painful. Second degree: red, moist, severely painful.',
        },
        {
          kind: 'me',
          text: 'memeriksa area luka bakar korban untuk menentukan tingkat keparahannya.',
          en: 'examines the burn to work out how deep it is.',
        },
        {
          kind: 'do',
          text: 'Bagaimana tampak dan tekstur kulit pada area luka bakar korban? (kemerahan kering / merah lembap / putih kering / hitam kasar)',
          en: 'How does the skin over the burn look and feel? (red and dry / red and moist / white and dry / black and leathery)',
          branches: [{ label: 'Putih atau hitam → tingkat 3 & 4', labelEn: 'White or black → third and fourth degree', to: 'wounds#luka-bakar-berat' }],
        },
        {
          kind: 'me',
          text: 'mengambil ice cold pack (ICP) dan melapisinya dengan kain tipis sebelum menaruhnya di atas luka bakar.',
          en: 'takes an ice cold pack (ICP) and wraps it in a thin cloth before placing it over the burn.',
        },
        { kind: 'do', text: '15 menit telah berlalu dan area luka bakar terasa lebih dingin.', en: 'Fifteen minutes have passed and the burn feels cooler.' },
        {
          kind: 'me',
          text: 'menutup luka bakar dengan non-stick bandage lalu merekatkannya dengan medical tape.',
          en: 'covers the burn with a non-stick bandage and secures it with medical tape.',
        },
        {
          kind: 'note',
          text: 'Beri Ibuprofen bila korban kesakitan. Kalau butuh obat lain, hubungi unit ILS lewat radio.',
          en: 'Give Ibuprofen if the victim is in pain. If anything else is needed, call an ILS unit on the radio.',
          branches: [{ label: 'Ibuprofen', labelEn: 'Ibuprofen', to: 'drugs#ibuprofen' }],
        },
      ],
    },
    {
      id: 'luka-bakar-berat',
      name: 'Luka bakar tingkat 3 & 4',
      nameEn: 'Burns, third and fourth degree',
      steps: [
        {
          kind: 'note',
          text: 'Tingkat 3: kulit dalam rusak, putih, kering, mati rasa. Tingkat 4: hitam, kasar, mati rasa. Jangan pakai ICP atau air dingin di tingkat ini.',
          en: 'Third degree: the deeper skin is destroyed — white, dry, numb. Fourth degree: black, leathery, numb. Do not use an ICP or cold water on these.',
        },
        {
          kind: 'me',
          text: 'menutup luka bakar dengan non-stick bandage lalu merekatkannya dengan medical tape.',
          en: 'covers the burn with a non-stick bandage and secures it with medical tape.',
        },
        {
          kind: 'me',
          text: 'memasang dressing pada luka bakar yang berada di tangan atau kaki korban.',
          en: 'dresses the burn where it sits on the victim\'s hand or foot.',
        },
        {
          kind: 'me',
          text: 'meninggikan bagian tubuh korban yang terbakar lalu menyelimutinya agar tetap hangat selama perjalanan.',
          en: 'raises the burned limb and covers the victim to keep them warm for the journey.',
        },
        {
          kind: 'do',
          text: 'Terlihat luka bakar korban sudah tertutup dan tubuhnya tetap hangat.',
          en: 'The burn is covered and the victim is being kept warm.',
          branches: [{ label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' }],
        },
      ],
    },
    {
      id: 'bruise',
      name: 'Bruise (memar)',
      nameEn: 'Bruise',
      steps: [
        {
          n: 214,
          kind: 'me',
          text: 'memeriksa kembali kondisi korban dengan teknik palpasi untuk mencari adanya luka memar.',
          en: 'goes over the victim again by palpation, looking for bruising.',
        },
        { n: 215, kind: 'do', text: 'Apakah terdapat luka memar/bruise pada tubuh korban?', en: 'Is there any bruising on the victim?' },
        {
          n: 216,
          kind: 'me',
          text: 'mengambil ICP serta kain tipis dari ILS Bag lalu membungkus ICP dengan kain tipis.',
          en: 'takes an ICP and a thin cloth from the ILS Bag and wraps the ICP in the cloth.',
        },
        {
          n: 217,
          kind: 'me',
          text: 'meletakkan ICP yang dibalut kain tersebut di atas luka memar korban selama 15 menit.',
          en: 'holds the wrapped ICP over the bruise for 15 minutes.',
        },
        { n: 218, kind: 'do', text: '15 menit telah berlalu, ICP telah mencair.', en: 'Fifteen minutes have passed and the ICP has melted.' },
        { n: 219, kind: 'me', text: 'mengangkat ICP dari tubuh korban lalu memasukan ICP ke ILS Bag.', en: 'lifts the ICP off the victim and puts it back in the ILS Bag.' },
        {
          n: 220,
          kind: 'me',
          text: 'mengambil elastic bandage dari ILS Bag lalu menaruhnya di luka korban dan menutupnya.',
          en: 'takes an elastic bandage from the ILS Bag, lays it over the bruise, and wraps it.',
        },
      ],
    },
  ],
}
