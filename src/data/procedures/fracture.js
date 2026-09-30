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
      nameEn: 'Closed — upper arm (Triangular Bandage)',
      steps: [
        {
          n: 191,
          kind: 'me',
          text: 'mengeluarkan Triangular Bandage dari ILS Bag dan memposisikan lengan korban dalam posisi diagonal untuk mengurangi pergerakan.',
          en: 'takes the Triangular Bandage from the ILS Bag and sets the victim\'s arm diagonally across the body to limit movement.',
        },
        {
          n: 192,
          kind: 'me',
          text: 'memasangkan Triangular Bandage ke bawah lengan yang patah dan belakang leher, mengaitkan ujung-ujungnya secara diagonal.',
          en: 'passes the Triangular Bandage under the broken arm and behind the neck, crossing the ends diagonally.',
        },
        {
          n: 193,
          kind: 'me',
          text: 'mengikat kedua ujung Triangular Bandage di belakang leher korban untuk memastikan lengan tetap stabil dan mencegah cedera lebih lanjut.',
          en: 'ties both ends of the Triangular Bandage behind the victim\'s neck so the arm stays stable and cannot be injured further.',
        },
      ],
    },
    {
      id: 'c-collar',
      name: 'Kepala & leher (C-Collar)',
      nameEn: 'Head and neck (C-Collar)',
      steps: [
        {
          n: 194,
          kind: 'me',
          text: 'memeriksa kondisi korban dan menentukan bahwa C-Collar diperlukan untuk menstabilkan bagian leher dan kepala korban.',
          en: 'assesses the victim and decides a C-Collar is needed to stabilise the neck and head.',
        },
        { n: 195, kind: 'me', text: 'mengeluarkan C-Collar dari ILS Bag.', en: 'takes the C-Collar out of the ILS Bag.' },
        {
          n: 196,
          kind: 'me',
          text: 'melebarkan C-Collar dengan menarik bagian depan dan belakang, lalu memasangkannya ke leher korban dengan hati-hati.',
          en: 'opens the C-Collar out by pulling the front and back apart, then fits it carefully around the victim\'s neck.',
        },
      ],
    },
    {
      id: 'vacuum-splint',
      name: 'Open & close tangan, close kaki (Vacuum Splint)',
      nameEn: 'Open and closed arm, closed leg (Vacuum Splint)',
      steps: [
        { n: 197, kind: 'me', text: 'mengeluarkan Vacuum Splint dari ILS Bag.', en: 'takes the Vacuum Splint out of the ILS Bag.' },
        {
          n: 198,
          kind: 'me',
          text: 'membuka katup Vacuum Splint dan memasangnya dengan hati-hati pada titik lokasi yang patah pada korban.',
          en: 'opens the Vacuum Splint valve and fits it carefully over the site of the break.',
        },
        { n: 199, kind: 'me', text: 'memastikan bahwa splint terpasang dengan baik dan aman.', en: 'checks the splint is seated properly and secure.' },
      ],
    },
    {
      id: 'rusuk',
      name: 'Rusuk patah / flail chest',
      nameEn: 'Broken ribs / flail chest',
      steps: [
        {
          kind: 'note',
          text: 'Rusuk patah membuat napas jadi dangkal dan cepat karena tiap tarikan napas terasa nyeri. Dadanya tidak boleh dibalut ketat — itu justru menghambat napas yang sudah susah.',
          en: 'Broken ribs make breathing shallow and fast, because every breath hurts. Do not strap the chest tightly — that only obstructs breathing that is already difficult.',
        },
        {
          kind: 'me',
          text: 'melakukan palpasi perlahan pada dinding dada korban untuk mencari titik nyeri dan tulang rusuk yang patah.',
          en: 'palpates the victim\'s chest wall gently, feeling for the tender point and the broken rib.',
        },
        {
          kind: 'do',
          text: 'Apakah ada bagian dinding dada yang bergerak berlawanan arah saat korban bernapas?',
          en: 'Is any part of the chest wall moving the opposite way as the victim breathes?',
        },
        {
          kind: 'note',
          text: 'Kalau ada, itu flail chest — satu segmen dinding dada lepas dan bergerak sendiri. Korban ini prioritas transport.',
          en: 'If there is, that is a flail chest — a segment of the chest wall has come loose and is moving on its own. This victim is a transport priority.',
        },
        {
          kind: 'me',
          text: 'menopang sisi dada yang patah dengan bantalan lembut tanpa membalutnya ketat, agar napas korban tidak makin terhambat.',
          en: 'supports the broken side of the chest with soft padding, without strapping it tight, so the breathing is not obstructed further.',
        },
        {
          kind: 'me',
          text: 'memposisikan korban setengah duduk bila memungkinkan agar dadanya lebih leluasa mengembang.',
          en: 'sits the victim half upright if possible, so the chest has more room to expand.',
        },
        {
          kind: 'do',
          text: 'Apakah napas korban mulai membaik setelah ditopang?',
          en: 'Is the victim\'s breathing improving now the chest is supported?',
          branches: [
            { label: 'Belum → pasang NRB', labelEn: 'Not yet → fit an NRB', to: 'breathing#breathing-nrb' },
            { label: 'Nyeri berat → Ibuprofen', labelEn: 'Severe pain → Ibuprofen', to: 'drugs#ibuprofen' },
            { label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'traction-splint',
      name: 'Open kaki (Traction Splint)',
      nameEn: 'Open leg (Traction Splint)',
      steps: [
        {
          n: 200,
          kind: 'me',
          text: 'mengambil Traction Splint dari Unit Kendaraan lalu membawanya ke dekat korban.',
          en: 'takes the Traction Splint from the unit and carries it over to the victim.',
        },
        { n: 201, kind: 'me', text: 'membuka strap Traction Splint satu persatu lalu memasangnya ke kaki korban.', en: 'undoes the Traction Splint straps one by one and fits it to the victim\'s leg.' },
        { n: 202, kind: 'me', text: 'menutup strap satu persatu dan memastikan kaki korban tidak dapat bergerak.', en: 'fastens the straps one by one and checks the victim\'s leg cannot move.' },
      ],
    },
  ],
}
