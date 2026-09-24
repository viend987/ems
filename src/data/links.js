// Kumpulan rujukan. Semua dibuka di tab baru.
// Menambah link cukup menyisipkan satu baris di grup yang cocok.

export default {
  id: 'links',
  group: 'referensi',
  name: 'Link Rujukan',
  blurb: 'Berkas dan halaman yang sering dibuka, biar tidak dicari manual tiap kali.',
  groups: [
    {
      id: 'link-lsfd',
      name: 'LSFD',
      items: [
        {
          url: 'https://justpaste.it/lsfdalr',
          label: 'LSFD RP (justpaste)',
          desc: 'Dokumen RP versi lama yang jadi cikal bakal web ini.',
        },
      ],
    },
    {
      id: 'link-web',
      name: 'Web ini',
      items: [
        {
          url: 'https://github.com/farhanmaul987/ems',
          label: 'Repo GitHub',
          desc: 'Sumber web ini. Teks RP ada di src/data/procedures/.',
        },
        {
          url: 'https://ems.viend.my.id',
          label: 'ems.viend.my.id',
          desc: 'Alamat web ini kalau mau dibagikan ke rekan satu faction.',
        },
      ],
    },
  ],
}
