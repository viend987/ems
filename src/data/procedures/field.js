// Penanganan Korban — dari "FIELD PROCEDURE" di draft.md
//
// Versi Inggris (`en`, `nameEn`, `blurbEn`, `noteEn`, `labelEn`) ditulis tangan,
// bukan hasil mesin. Aturan gayanya ada di CLAUDE.md; ringkasnya: `/me` selalu
// orang ketiga tunggal tanpa subjek, karena di game ia menempel di belakang nama
// karakter — "reaches for the ILS Bag", bukan "I reach for the ILS Bag".

export default {
  id: 'field',
  group: 'tkp',
  name: 'Penanganan Korban',
  nameEn: 'Victim Handling',
  blurb: 'Danger dan Response di TKP, sampai menentukan korban kena fracture atau GSW.',
  blurbEn:
    'Danger and Response on scene, through to deciding whether the victim has a fracture or a GSW.',
  sections: [
    {
      id: 'danger',
      name: 'Danger (kondisional)',
      nameEn: 'Danger (as needed)',
      steps: [
        {
          kind: 'note',
          text: 'Pakai yang sesuai keadaan — tidak semuanya perlu tiap scene.',
          en: 'Use whichever fits the scene — not all of these are needed every time.',
        },
        {
          n: 51,
          kind: 'me',
          text: 'segera melakukan pengamanan area sekitar agar aman dari ancaman lanjutan.',
          en: 'immediately secures the surrounding area against any further threat.',
        },
        {
          n: 52,
          kind: 'me',
          text: 'melepas atribut dan segala aksesoris dari kepala korban untuk mengantisipasi adanya cedera tambahan.',
          en: "removes the helmet and every accessory from the victim's head to guard against further injury.",
        },
        {
          n: 53,
          kind: 'me',
          text: 'memindahkan tubuh korban untuk penanganan di lokasi yang lebih aman.',
          en: 'moves the victim so treatment can continue somewhere safer.',
        },
      ],
    },
    {
      id: 'response',
      name: 'Response',
      nameEn: 'Response',
      steps: [
        {
          n: 54,
          kind: 'me',
          text: 'mengambil ILS Bag dari unit kendaraan, berjalan cepat menuju korban, dan meletakkan ILS Bag di sampingnya.',
          en: 'takes the ILS Bag from the unit, walks briskly over to the victim, and sets the bag down beside them.',
        },
        {
          kind: 'command',
          text: '/fo',
          note: 'pilih BLS bag sebagai visual di lapangan',
          noteEn: 'pick the BLS bag so it shows on scene',
        },
        { kind: 'anim', text: '.medic2' },
        {
          n: 56,
          kind: 'me',
          text: 'mengambil N-Gloves dari ILS Bag lalu mengenakannya pada kedua tangan.',
          en: 'takes the N-Gloves from the ILS Bag and pulls them on.',
        },
        {
          n: 57,
          kind: 'say',
          text: 'Halo, apakah bisa mendengar suara saya?',
          en: 'Hello, can you hear my voice?',
        },
        {
          n: 58,
          kind: 'me',
          text: 'mencubit kulit korban untuk memicu respon nyeri.',
          en: "pinches the victim's skin to provoke a response to pain.",
        },
        {
          n: 59,
          kind: 'do',
          text: 'Apakah terlihat ada reaksi otot atau rasa nyeri dari cubitan?',
          en: 'Is there any muscle reaction or sign of pain from the pinch?',
        },
        { kind: 'command', text: '/inspect [id]' },
        {
          kind: 'note',
          text: 'Pasang /bls sedini mungkin — memperpanjang durasi injured korban. Kalau durasinya habis dan korban jatuh ke critical, petugas bisa disalahkan IC.',
          en:
            "Run /bls as early as you can — it extends the victim's injured timer. If it runs out and they drop to critical, the responder can be blamed in character.",
        },
        { kind: 'command', text: '/bls' },
        {
          kind: 'note',
          text: 'Lanjut sesuai temuan pada tubuh korban.',
          en: "Carry on according to what you find on the victim's body.",
          branches: [
            { label: 'Patah tulang', labelEn: 'Fracture', to: 'field#fracture' },
            { label: 'Luka tembak', labelEn: 'Gunshot wound', to: 'field#gsw' },
          ],
        },
      ],
    },
    {
      id: 'fracture',
      name: 'Kalau Bone Fracture',
      nameEn: 'If it is a bone fracture',
      steps: [
        {
          n: 60,
          kind: 'me',
          text: 'memeriksa tubuh korban dan menemukan adanya kemungkinan patah tulang pada tubuh korban.',
          en: 'examines the victim and finds what looks like a fractured bone.',
        },
        {
          n: 61,
          kind: 'do',
          text: 'Patah tulang jenis apa yang dialami korban? (Open Fracture / Close Fracture)',
          en: 'Which kind of fracture does the victim have? (Open Fracture / Closed Fracture)',
          branches: [
            {
              label: 'Close Fracture → ABC, lalu bidai',
              labelEn: 'Closed Fracture → ABC, then splint',
              to: 'airway#airway-headtilt',
            },
            {
              label: 'Open Fracture → DEAT dulu',
              labelEn: 'Open Fracture → DEAT first',
              to: 'deat#direct-pressure',
            },
          ],
        },
        {
          kind: 'note',
          text: 'Close Fracture: A-B-C, lalu penanganan patah tulang. Open Fracture: DEAT dulu, baru A-B-C, baru penanganan patah tulang.',
          en:
            'Closed Fracture: A-B-C, then treat the fracture. Open Fracture: DEAT first, then A-B-C, then treat the fracture.',
        },
      ],
    },
    {
      id: 'gsw',
      name: 'Kalau GSW',
      nameEn: 'If it is a GSW',
      steps: [
        {
          n: 63,
          kind: 'me',
          text: 'menemukan adanya bekas luka tembakan pada tubuh korban.',
          en: 'finds a gunshot wound on the victim.',
        },
        {
          kind: 'note',
          text: 'Kondisi ini disebut X (Exsanguinating Hemorrhage). Penanganannya DEAT, lalu lanjut A-B-C.',
          en:
            'This is the X in DR-XABC — Exsanguinating Haemorrhage. Treat it with DEAT, then carry on to A-B-C.',
          branches: [
            { label: 'Lanjut DEAT', labelEn: 'On to DEAT', to: 'deat#direct-pressure' },
            { label: 'Lalu ABC', labelEn: 'Then ABC', to: 'airway#airway-headtilt' },
          ],
        },
      ],
    },
  ],
}
