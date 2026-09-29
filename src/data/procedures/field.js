// Penanganan Korban — dari "FIELD PROCEDURE" di draft.md

export default {
  id: 'field',
  group: 'tkp',
  name: 'Penanganan Korban',
  blurb: 'Danger dan Response di TKP, sampai menentukan korban kena fracture atau GSW.',
  sections: [
    {
      id: 'danger',
      name: 'Danger (kondisional)',
      steps: [
        { kind: 'note', text: 'Pakai yang sesuai keadaan — tidak semuanya perlu tiap scene.' },
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
      ],
    },
    {
      id: 'response',
      name: 'Response',
      steps: [
        {
          n: 54,
          kind: 'me',
          text: 'mengambil ILS Bag dari unit kendaraan, berjalan cepat menuju korban, dan meletakkan ILS Bag di sampingnya.',
        },
        { kind: 'command', text: '/fo', note: 'pilih BLS bag sebagai visual di lapangan' },
        { kind: 'anim', text: '.medic2' },
        {
          n: 56,
          kind: 'me',
          text: 'mengambil N-Gloves dari ILS Bag lalu mengenakannya pada kedua tangan.',
        },
        { n: 57, kind: 'say', text: 'Halo, apakah bisa mendengar suara saya?' },
        { n: 58, kind: 'me', text: 'mencubit kulit korban untuk memicu respon nyeri.' },
        { n: 59, kind: 'do', text: 'Apakah terlihat ada reaksi otot atau rasa nyeri dari cubitan?' },
        { kind: 'command', text: '/inspect [id]' },
        {
          kind: 'note',
          text: 'Pasang /bls sedini mungkin — memperpanjang durasi injured korban. Kalau durasinya habis dan korban jatuh ke critical, petugas bisa disalahkan IC.',
        },
        { kind: 'command', text: '/bls' },
        {
          kind: 'note',
          text: 'Lanjut sesuai temuan pada tubuh korban.',
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
            { label: 'Close Fracture → ABC, lalu bidai', to: 'airway#airway-headtilt' },
            { label: 'Open Fracture → DEAT dulu', to: 'deat#direct-pressure' },
          ],
        },
        {
          kind: 'note',
          text: 'Close Fracture: A-B-C, lalu penanganan patah tulang. Open Fracture: DEAT dulu, baru A-B-C, baru penanganan patah tulang.',
        },
      ],
    },
    {
      id: 'gsw',
      name: 'Kalau GSW',
      steps: [
        { n: 63, kind: 'me', text: 'menemukan adanya bekas luka tembakan pada tubuh korban.' },
        {
          kind: 'note',
          text: 'Kondisi ini disebut X (Exsanguinating Hemorrhage). Penanganannya DEAT, lalu lanjut A-B-C.',
          branches: [
            { label: 'Lanjut DEAT', to: 'deat#direct-pressure' },
            { label: 'Lalu ABC', to: 'airway#airway-headtilt' },
          ],
        },
      ],
    },
  ],
}
