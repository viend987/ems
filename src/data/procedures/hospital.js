// Rumah Sakit — dari "SAMPAI DI PBH", "DOCTOR REPORT", "RPLY NPC", dan "RP Bill" di LSFD RP.md

export default {
  id: 'hospital',
  group: 'transport',
  name: 'Rumah Sakit',
  nameEn: 'Hospital',
  blurb: 'Serah terima di PBH, laporan ke dokter, reply NPC kalau dokter kosong, dan RP bill.',
  blurbEn:
    'Handover at PBH, the report to the doctor, NPC replies when no doctor is on, and the RP bill.',
  sections: [
    {
      id: 'arrive',
      name: 'Sampai di PBH',
      nameEn: 'Arriving at PBH',
      steps: [
        { ref: 'on-hospital' },
        {
          n: 42,
          kind: 'me',
          text: 'menurunkan korban dengan perlahan dan membawanya ke Emergency Room untuk ditangani lebih lanjut oleh tim dokter.',
          en: 'eases the victim out and takes them into the Emergency Room for the doctors to take over.',
        },
        { kind: 'note', text: 'Tekan Alt lalu Eject untuk menurunkan korban.', en: 'Press Alt then Eject to unload the victim.' },
        { kind: 'command', text: '/bed [id]' },
        { ref: 'rtb-from-scene' },
      ],
    },
    {
      id: 'doctor-report',
      name: 'Doctor Report',
      nameEn: 'Doctor Report',
      steps: [
        { kind: 'note', text: 'Format laporan ke dokter yang menerima pasien.', en: 'The report format for the doctor receiving the patient.' },
        { kind: 'say', text: 'LOC A/V/P/U, GSW/Open Fracture on Right Leg, ABC Normal', alreadyEn: true },
      ],
    },
    {
      id: 'rply-operasi',
      name: 'RPLY operasi — tidak ada dokter bertugas',
      nameEn: 'RPLY surgery — no doctor on duty',
      steps: [
        {
          kind: 'note',
          text: 'RPLY singkatan dari Roleplay Lie: adegan yang hanya diceritakan lewat /do, tanpa ada kegiatan yang benar-benar terlihat. Dipakai di sini karena firefighter sebenarnya tidak berwenang mengoperasi — tapi kalau tidak ada dokter yang bertugas, operasinya dinarasikan supaya scene tetap bisa selesai.',
          en: 'RPLY stands for Roleplay Lie: a scene narrated entirely through /do, with nothing actually happening on screen. It is used here because a firefighter has no authority to operate — but if no doctor is on duty, the surgery is narrated so the scene can still be finished.',
        },
        { kind: 'command', text: '/dropbody' },
        { kind: 'command', text: '/bed [id]' },
        { kind: 'anim', text: '.mechanic' },
        { n: 231, kind: 'do', text: 'Dokter dan Tim Trauma mulai memasuki ruang operasi.', en: 'The doctor and the trauma team enter the operating theatre.' },
        { n: 232, kind: 'do', text: 'Dokter memulai tindakan operasi selama beberapa jam.', en: 'The doctor begins the operation, which runs for several hours.' },
        { n: 233, kind: 'do', text: 'Setelah 3 jam apakah kondisi pasien membaik?', en: 'After three hours, is the patient\'s condition improving?' },
        { kind: 'note', text: 'Dua baris berikut kondisional, pakai kalau korban diduga membawa barang terlarang.', en: 'The next two lines are conditional — use them if the victim is suspected of carrying contraband.' },
        { kind: 'do', text: 'Security memasuki ruang operasi untuk memeriksa barang bawaan korban.', en: 'Security enters the operating theatre to check what the victim was carrying.' },
        { kind: 'do', text: 'Apakah pasien membawa barang ilegal/terlarang?', en: 'Is the patient carrying anything illegal?' },
        { kind: 'note', text: 'Kalau operasi berhasil:', en: 'If the operation succeeds:' },
        { kind: 'command', text: '/stabilize [id]', note: 'tunggu sampai notifikasi muncul', noteEn: 'wait for the notification to appear' },
        { kind: 'command', text: '/heal [id]' },
      ],
    },
    {
      id: 'bill',
      name: 'RP Bill di lobi',
      nameEn: 'RP bill in the lobby',
      steps: [
        { kind: 'note', text: '(( Minta ID Card dulu ))', en: '(( Ask for the ID Card first ))' },
        {
          n: 234,
          kind: 'me',
          text: 'menerima ID Card yang diberikan dengan tangan kanan dan melakukan pengecekan.',
          en: 'takes the offered ID Card in their right hand and checks it over.',
        },
        { n: 235, kind: 'anim', text: '.prop_tablet2' },
        { kind: 'command', text: '/hospitalbill search [patient name]' },
        { kind: 'note', text: '(( Kalau ada tunggakan, suruh bayar dulu ))', en: '(( If there are unpaid bills, have them settled first ))' },
        { n: 236, kind: 'me', text: 'membuatkan bill sesuai dengan kebutuhan dan mencetaknya.', en: 'draws up the bill as needed and prints it.' },
        { kind: 'command', text: '/medicreport [id]' },
        { n: 237, kind: 'me', text: 'memberikan kembali ID Card serta Bill kepada pasien.', en: 'hands the ID Card and the bill back to the patient.' },
      ],
    },
  ],
}
