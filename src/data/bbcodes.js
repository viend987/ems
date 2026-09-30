// Referensi tag BBCode forum. Bentuknya tabel "kode + arti" seperti
// src/data/reference.js, jadi tidak perlu komponen baru — CodeTable yang
// menggambarnya, dan tiap barisnya bisa diklik untuk menyalin tagnya.
//
// Daftar tag ini datang dari toolbar forum LSFD. `[blink]` sengaja tidak ada:
// pemiliknya minta tag itu tidak dimasukkan.

export default {
  id: 'bbcodes',
  group: 'laporan',
  subgroup: 'general',
  name: 'BBCode Tags',
  nameEn: 'BBCode Tags',
  blurb:
    'Seluruh tag BBCode yang dipakai forum LSFD, beserta fungsinya. Klik barisnya untuk menyalin tagnya — atau pakai tombolnya langsung di BBCode Builder.',
  blurbEn:
    'Every BBCode tag the LSFD forum uses, and what each one does. Click a row to copy the tag — or use the buttons in BBCode Builder instead.',
  tables: [
    {
      id: 'bbcode-text',
      name: 'Teks',
      rows: [
        { code: '[b][/b]', desc: 'Huruf tebal.' },
        { code: '[i][/i]', desc: 'Huruf miring.' },
        { code: '[u][/u]', desc: 'Garis bawah.' },
        {
          code: '[size=100][/size]',
          desc: 'Ukuran huruf dalam persen. Forum memakai 50 (tiny), 85 (small), 100 (normal), 150 (large), dan 200 (huge).',
        },
        { code: '[color=#FFFFFF][/color]', desc: 'Warna huruf, dari kode heks atau nama warna.' },
        { code: '[font=Arial][/font]', desc: 'Ganti jenis huruf.' },
      ],
    },
    {
      id: 'bbcode-align',
      name: 'Perataan',
      rows: [
        { code: '[left][/left]', desc: 'Rata kiri.' },
        { code: '[center][/center]', desc: 'Rata tengah.' },
        { code: '[right][/right]', desc: 'Rata kanan — dipakai untuk blok tanda tangan.' },
        { code: '[justify][/justify]', desc: 'Rata kanan-kiri, untuk paragraf panjang.' },
      ],
    },
    {
      id: 'bbcode-blocks',
      name: 'Blok',
      rows: [
        { code: '[divbox=white][/divbox]', desc: 'Kotak putih berbingkai — badan sebuah postingan.' },
        { code: '[divbox=maroon][/divbox]', desc: 'Batang maroon — judul bagian di dalam laporan.' },
        { code: '[list][/list]', desc: 'Daftar dengan bullet.' },
        { code: '[list=1][/list]', desc: 'Daftar bernomor.' },
        { code: '[list=0][/list]', desc: 'Daftar tanpa bullet — ini yang dipakai template laporan forum.' },
        { code: '[*]', desc: 'Satu item daftar. Tidak punya penutup; item berikutnya yang mengakhirinya.' },
        { code: '[quote][/quote]', desc: 'Kutipan.' },
        { code: '[code][/code]', desc: 'Blok kode, huruf monospace dan spasi dipertahankan.' },
        { code: '[spoiler][/spoiler]', desc: 'Isi yang disembunyikan sampai diklik.' },
        { code: '[secspoiler][/secspoiler]', desc: 'Spoiler yang baru terbuka setelah pembacanya membalas.' },
        { code: '[hr][/hr]', desc: 'Garis pemisah mendatar.' },
        { code: '[space][/space]', desc: 'Jeda kosong setinggi satu baris.' },
      ],
    },
    {
      id: 'bbcode-notices',
      name: 'Kotak pesan',
      rows: [
        { code: '[info][/info]', desc: 'Kotak biru untuk keterangan.' },
        { code: '[success][/success]', desc: 'Kotak hijau untuk sesuatu yang disetujui atau selesai.' },
        { code: '[warn][/warn]', desc: 'Kotak oranye untuk peringatan.' },
        { code: '[error][/error]', desc: 'Kotak merah untuk penolakan atau kesalahan.' },
        { code: '[progress=50][/progress]', desc: 'Batang kemajuan, angkanya persen dari 0 sampai 100.' },
      ],
    },
    {
      id: 'bbcode-media',
      name: 'Media & tautan',
      rows: [
        { code: '[img][/img]', desc: 'Gambar pada ukuran aslinya. Alamatnya ditulis di antara tag.' },
        { code: '[img-resize=200][/img-resize]', desc: 'Gambar dengan lebar tertentu dalam piksel.' },
        { code: '[imageleft][/imageleft]', desc: 'Gambar merapat ke kiri, teks mengalir di sebelahnya.' },
        { code: '[url=https://][/url]', desc: 'Tautan. Alamatnya di nilai tag, teksnya di antara tag.' },
        { code: '[table][/table]', desc: 'Tabel. Barisnya [tr], sel judulnya [th], sel biasanya [td].' },
        { code: '[aligntable][/aligntable]', desc: 'Menaruh tabel di tengah halaman.' },
      ],
    },
  ],
}
