// Rumah Sakit — dari "SAMPAI DI PBH", "DOCTOR REPORT", "RPLY NPC", dan "RP Bill" di LSFD RP.md

export default {
  id: 'hospital',
  group: 'transport',
  name: 'Rumah Sakit',
  blurb: 'Serah terima di PBH, laporan ke dokter, reply NPC kalau dokter kosong, dan RP bill.',
  sections: [
    {
      id: 'arrive',
      name: 'Sampai di PBH',
      steps: [
        { ref: 'on-hospital' },
        {
          n: 42,
          kind: 'me',
          text: 'menurunkan korban dengan perlahan dan membawanya ke Emergency Room untuk ditangani lebih lanjut oleh tim dokter.',
        },
        { kind: 'note', text: 'Tekan Alt lalu Eject untuk menurunkan korban.' },
        { kind: 'command', text: '/bed [id]' },
        { ref: 'rtb-from-scene' },
      ],
    },
    {
      id: 'doctor-report',
      name: 'Doctor Report',
      steps: [
        { kind: 'note', text: 'Format laporan ke dokter yang menerima pasien.' },
        { kind: 'say', text: 'LOC A/V/P/U, GSW/Open Fracture on Right Leg, ABC Normal' },
      ],
    },
    {
      id: 'npc-reply',
      name: 'Reply NPC kalau tidak ada dokter',
      steps: [
        { kind: 'command', text: '/dropbody' },
        { kind: 'command', text: '/bed [id]' },
        { kind: 'anim', text: '.mechanic' },
        { n: 231, kind: 'do', text: 'Dokter dan Tim Trauma mulai memasuki ruang operasi.' },
        { n: 232, kind: 'do', text: 'Dokter memulai tindakan operasi selama beberapa jam.' },
        { n: 233, kind: 'do', text: 'Setelah 3 jam apakah kondisi pasien membaik?' },
        { kind: 'note', text: 'Dua baris berikut kondisional, pakai kalau korban diduga membawa barang terlarang.' },
        { kind: 'do', text: 'Security memasuki ruang operasi untuk memeriksa barang bawaan korban.' },
        { kind: 'do', text: 'Apakah pasien membawa barang ilegal/terlarang?' },
        { kind: 'note', text: 'Kalau operasi berhasil:' },
        { kind: 'command', text: '/stabilize [id]', note: 'tunggu sampai notifikasi muncul' },
        { kind: 'command', text: '/heal [id]' },
      ],
    },
    {
      id: 'bill',
      name: 'RP Bill di lobi',
      steps: [
        { kind: 'note', text: '(( Minta ID Card dulu ))' },
        {
          n: 234,
          kind: 'me',
          text: 'menerima ID Card yang diberikan dengan tangan kanan dan melakukan pengecekan.',
        },
        { n: 235, kind: 'anim', text: '.prop_tablet2' },
        { kind: 'command', text: '/hospitalbill search [patient name]' },
        { kind: 'note', text: '(( Kalau ada tunggakan, suruh bayar dulu ))' },
        { n: 236, kind: 'me', text: 'membuatkan bill sesuai dengan kebutuhan dan mencetaknya.' },
        { kind: 'command', text: '/medicreport [id]' },
        { n: 237, kind: 'me', text: 'memberikan kembali ID Card serta Bill kepada pasien.' },
      ],
    },
  ],
}
