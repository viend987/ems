// Patah Tulang — dari "BONE FRACTURE PROCEDURE" di LSFD RP.md

export default {
  id: 'fracture',
  group: 'tkp',
  name: 'Patah Tulang',
  nameEn: 'Fractures',
  blurb: 'Bidai sesuai letak dan jenis patahnya: triangular bandage, C-collar, vacuum splint, traction splint.',
  blurbEn:
    'Splinting to match where and what kind the break is: triangular bandage, C-collar, vacuum splint, traction splint.',
  sections: [
    {
      id: 'triangular',
      name: 'Close — tangan bagian atas (Triangular Bandage)',
      steps: [
        {
          n: 191,
          kind: 'me',
          text: 'mengeluarkan Triangular Bandage dari ILS Bag dan memposisikan lengan korban dalam posisi diagonal untuk mengurangi pergerakan.',
        },
        {
          n: 192,
          kind: 'me',
          text: 'memasangkan Triangular Bandage ke bawah lengan yang patah dan belakang leher, mengaitkan ujung-ujungnya secara diagonal.',
        },
        {
          n: 193,
          kind: 'me',
          text: 'mengikat kedua ujung Triangular Bandage di belakang leher korban untuk memastikan lengan tetap stabil dan mencegah cedera lebih lanjut.',
        },
      ],
    },
    {
      id: 'c-collar',
      name: 'Kepala & leher (C-Collar)',
      steps: [
        {
          n: 194,
          kind: 'me',
          text: 'memeriksa kondisi korban dan menentukan bahwa C-Collar diperlukan untuk menstabilkan bagian leher dan kepala korban.',
        },
        { n: 195, kind: 'me', text: 'mengeluarkan C-Collar dari ILS Bag.' },
        {
          n: 196,
          kind: 'me',
          text: 'melebarkan C-Collar dengan menarik bagian depan dan belakang, lalu memasangkannya ke leher korban dengan hati-hati.',
        },
      ],
    },
    {
      id: 'vacuum-splint',
      name: 'Open & close tangan, close kaki (Vacuum Splint)',
      steps: [
        { n: 197, kind: 'me', text: 'mengeluarkan Vacuum Splint dari ILS Bag.' },
        {
          n: 198,
          kind: 'me',
          text: 'membuka katup Vacuum Splint dan memasangnya dengan hati-hati pada titik lokasi yang patah pada korban.',
        },
        { n: 199, kind: 'me', text: 'memastikan bahwa splint terpasang dengan baik dan aman.' },
      ],
    },
    {
      id: 'rusuk',
      name: 'Rusuk patah / flail chest',
      steps: [
        {
          kind: 'note',
          text: 'Rusuk patah membuat napas jadi dangkal dan cepat karena tiap tarikan napas terasa nyeri. Dadanya tidak boleh dibalut ketat — itu justru menghambat napas yang sudah susah.',
        },
        {
          kind: 'me',
          text: 'melakukan palpasi perlahan pada dinding dada korban untuk mencari titik nyeri dan tulang rusuk yang patah.',
        },
        {
          kind: 'do',
          text: 'Apakah ada bagian dinding dada yang bergerak berlawanan arah saat korban bernapas?',
        },
        {
          kind: 'note',
          text: 'Kalau ada, itu flail chest — satu segmen dinding dada lepas dan bergerak sendiri. Korban ini prioritas transport.',
        },
        {
          kind: 'me',
          text: 'menopang sisi dada yang patah dengan bantalan lembut tanpa membalutnya ketat, agar napas korban tidak makin terhambat.',
        },
        {
          kind: 'me',
          text: 'memposisikan korban setengah duduk bila memungkinkan agar dadanya lebih leluasa mengembang.',
        },
        {
          kind: 'do',
          text: 'Apakah napas korban mulai membaik setelah ditopang?',
          branches: [
            { label: 'Belum → pasang NRB', to: 'breathing#breathing-nrb' },
            { label: 'Nyeri berat → Ibuprofen', to: 'drugs#ibuprofen' },
            { label: 'Muat korban', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'traction-splint',
      name: 'Open kaki (Traction Splint)',
      steps: [
        {
          n: 200,
          kind: 'me',
          text: 'mengambil Traction Splint dari Unit Kendaraan lalu membawanya ke dekat korban.',
        },
        { n: 201, kind: 'me', text: 'membuka strap Traction Splint satu persatu lalu memasangnya ke kaki korban.' },
        { n: 202, kind: 'me', text: 'menutup strap satu persatu dan memastikan kaki korban tidak dapat bergerak.' },
      ],
    },
  ],
}
