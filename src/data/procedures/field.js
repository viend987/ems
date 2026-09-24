// Penanganan Korban — dari "FIELD PROCEDURE" di LSFD RP.md

export default {
  id: 'field',
  group: 'tkp',
  name: 'Penanganan Korban',
  blurb: 'Langkah pembuka di TKP, sampai menentukan korban kena fracture atau GSW.',
  sections: [
    {
      id: 'default',
      name: 'Prosedur Awal',
      steps: [
        { kind: 'note', text: 'Tiga langkah berikut kondisional — pakai kalau situasinya menuntut.' },
        {
          n: 51,
          kind: 'me',
          text: 'segera melakukan pengamanan area sekitar agar aman dari ancaman lanjutan.',
        },
        {
          n: 52,
          kind: 'me',
          text: 'melepas atribut dan segala aksesoris dari kepala korban untuk mengantisipasi adanya cedera tambahan.',
        },
        { n: 53, kind: 'me', text: 'memindahkan tubuh korban untuk penanganan di lokasi yang lebih aman.' },
        {
          n: 54,
          kind: 'me',
          text: 'mengambil ILS Bag dari dalam unit kendaraan, kemudian berjalan cepat menuju korban.',
        },
        {
          n: 55,
          kind: 'me',
          text: 'meletakkan ILS Bag di samping korban, membukanya lalu mengeluarkan perangkat ECG dari dalam ILS Bag.',
        },
        { kind: 'command', text: '/fo', note: 'pilih Lifepack' },
        { kind: 'anim', text: '.medic2' },
        {
          n: 56,
          kind: 'me',
          text: 'mengambil sepasang N-Gloves dari dalam ILS Bag lalu mengenakannya dengan rapi pada kedua tangan.',
        },
        { n: 57, kind: 'say', text: 'Halo, apakah bisa mendengar suara saya?' },
        { n: 58, kind: 'me', text: 'mencubit kulit korban dengan tangan kanan untuk memicu respon nyeri.' },
        { n: 59, kind: 'do', text: 'Apakah terlihat ada reaksi otot atau rasa nyeri dari cubitan?' },
        { kind: 'command', text: '/inspect [id]' },
        {
          kind: 'note',
          text: 'Dari sini, lanjut sesuai temuan pada tubuh korban.',
          branches: [
            { label: 'Patah tulang', to: 'field#fracture' },
            { label: 'Luka tembak', to: 'field#gsw' },
          ],
        },
      ],
    },
    {
      id: 'fracture',
      name: 'Kalau Bone Fracture',
      steps: [
        {
          n: 60,
          kind: 'me',
          text: 'memeriksa tubuh korban dan menemukan adanya kemungkinan patah tulang pada tubuh korban.',
        },
        {
          n: 61,
          kind: 'do',
          text: 'Patah tulang jenis apa yang dialami korban? (Open Fracture / Close Fracture)',
          branches: [
            { label: 'Close Fracture → ABC, lalu bidai', to: 'abc#airway-headtilt' },
            { label: 'Open Fracture → DEAT dulu', to: 'deat#direct-pressure' },
          ],
        },
        {
          kind: 'note',
          text: 'Close Fracture: langsung A-B-C, lalu penanganan patah tulang. Open Fracture: RP di bawah ini → DEAT → A-B-C → penanganan patah tulang.',
        },
        {
          n: 62,
          kind: 'me',
          text: 'segera memulai prosedur penanganan D.E.A.T. untuk menghentikan pendarahan pada area patah tulang.',
        },
      ],
    },
    {
      id: 'gsw',
      name: 'Kalau GSW',
      steps: [
        { n: 63, kind: 'me', text: 'menemukan adanya area bekas luka tertembak pada tubuh korban.' },
        {
          kind: 'note',
          text: 'Kondisi ini disebut X (Exsanguinating Hemorrhage). Penanganannya DEAT, lalu lanjut A-B-C.',
          branches: [
            { label: 'Lanjut DEAT', to: 'deat#direct-pressure' },
            { label: 'Lalu ABC', to: 'abc#airway-headtilt' },
          ],
        },
      ],
    },
  ],
}
