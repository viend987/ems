// AIRWAY — dari "ABC PROCEDURE AIRWAY" di draft.md.
//
// Penomoran ditata ulang di kategori ini karena beberapa langkah diringkas dan
// ada cabang baru (drainase). Drainase memegang /104 sesuai keputusan, jadi
// blok /99–/103 sengaja dibiarkan kosong sebagai ruang tumbuh head-tilt.

export default {
  id: 'airway',
  group: 'tkp',
  name: 'Airway',
  nameEn: 'Airway',
  blurb: 'Pemeriksaan dan pembukaan jalan napas korban. Setiap tindakan diikuti pemeriksaan ulang sebelum lanjut.',
  blurbEn:
    'Checking and opening the victim’s airway. Every action is followed by a re-check before moving on.',
  sections: [
    {
      id: 'airway-headtilt',
      name: 'Airway — Head-Tilt Chin-Lift (umum)',
      nameEn: 'Airway — Head-Tilt Chin-Lift (standard)',
      steps: [
        {
          n: 91,
          kind: 'me',
          text: 'menempatkan diri di sisi kepala korban, tangan kanan di dahi dan tangan kiri di dagu korban.',
          en: 'positions themself at the victim\'s head, right hand on the forehead and left hand under the chin.',
        },
        {
          n: 92,
          kind: 'me',
          text: 'menekan dahi sambil menarik dagu ke atas untuk membuka jalan napas.',
          en: 'presses down on the forehead while lifting the chin to open the airway.',
        },
        {
          n: 93,
          kind: 'me',
          text: 'membuka sedikit mulut korban lalu menyorot bagian dalamnya dengan flashlight.',
          en: 'opens the victim\'s mouth slightly and shines a flashlight inside.',
        },
        {
          n: 94,
          kind: 'do',
          text: 'Apakah ada halangan yang mengganggu airway korban?',
          en: 'Is there anything obstructing the victim\'s airway?',
          branches: [
            { label: 'Tidak ada → Breathing', labelEn: 'Clear → Breathing', to: 'breathing#breathing-ecg' },
            { label: 'Darah / gumpalan → Drainase', labelEn: 'Blood or clots → Drainage', to: 'airway#airway-drainase' },
            { label: 'Ada cedera kepala → Jaw-Thrust', labelEn: 'Head injury → Jaw-Thrust', to: 'airway#airway-jawthrust' },
          ],
        },
        { kind: 'note', text: 'Kalau yang menghalangi berupa benda padat:', en: 'If the obstruction is a solid object:' },
        {
          n: 95,
          kind: 'me',
          text: 'mengambil tweezer dari ILS Bag, membuka mulut korban lebih lebar, lalu menjepit objek dan menariknya keluar perlahan.',
          en: 'takes the tweezers from the ILS Bag, opens the victim\'s mouth wider, then grips the object and draws it out slowly.',
        },
        { id: 'airway-clear', n: 97, kind: 'do', text: 'Terlihat objek telah keluar dari airway korban.', en: 'The object is visibly out of the victim\'s airway.' },
        {
          id: 'airway-clean',
          n: 98,
          kind: 'me',
          text: 'membersihkan mulut korban menggunakan gauze sterile dari ILS Bag.',
          en: 'cleans the victim\'s mouth with sterile gauze from the ILS Bag.',
        },
      ],
    },
    {
      id: 'airway-drainase',
      name: 'Airway — Drainase darah (tanpa cedera kepala/leher)',
      nameEn: 'Airway — Draining blood (no head or neck injury)',
      steps: [
        {
          n: 104,
          kind: 'me',
          text: 'memiringkan kepala korban ke samping perlahan sambil membuka mulut sedikit, membiarkan darah dan gumpalan mengalir keluar.',
          en: 'turns the victim\'s head gently to one side while easing the mouth open, letting blood and clots drain out.',
        },
        { n: 106, kind: 'me', text: 'membiarkan darah mengalir hingga genangan di airway berkurang.', en: 'lets the blood drain until the pooling in the airway subsides.' },
        {
          n: 107,
          kind: 'me',
          text: 'membersihkan mulut korban dengan gauze sterile lalu mengembalikan kepala ke posisi netral.',
          en: 'cleans the victim\'s mouth with sterile gauze, then returns the head to a neutral position.',
        },
        {
          n: 109,
          kind: 'do',
          text: 'Apakah airway korban sudah tampak bersih dan tidak ada sumbatan?',
          en: 'Does the victim\'s airway look clear, with nothing blocking it?',
          branches: [
            { label: 'Bersih → Breathing', labelEn: 'Clear → Breathing', to: 'breathing#breathing-ecg' },
            { label: 'Darah tidak berhenti → Intubasi', labelEn: 'Bleeding will not stop → Intubation', to: 'breathing#breathing-intubasi' },
          ],
        },
        {
          n: 110,
          kind: 'me',
          text: 'mengulangi drainase atau menggunakan tweezer untuk mengambil sisa gumpalan.',
          en: 'repeats the drainage, or uses the tweezers to lift out what is left of the clot.',
        },
      ],
    },
    {
      id: 'airway-jawthrust',
      name: 'Airway — Jaw-Thrust (cedera kepala)',
      nameEn: 'Airway — Jaw-Thrust (head injury)',
      steps: [
        {
          n: 111,
          kind: 'me',
          text: 'menempatkan diri di atas kepala korban, lalu mendorong rahang bawah ke atas (jaw-thrust) tanpa menekan leher.',
          en: 'positions themself above the victim\'s head and pushes the lower jaw upward in a jaw-thrust, without pressing on the neck.',
        },
        {
          n: 113,
          kind: 'me',
          text: 'membuka mulut korban perlahan dengan kedua ibu jari lalu menyorot bagian dalamnya dengan flashlight.',
          en: 'eases the victim\'s mouth open with both thumbs and shines a flashlight inside.',
        },
        {
          n: 114,
          kind: 'do',
          text: 'Apakah terlihat ada objek yang menghalangi jalur napas korban?',
          en: 'Is there any object visibly blocking the victim\'s airway?',
          branches: [{ label: 'Tidak ada → Breathing', labelEn: 'Clear → Breathing', to: 'breathing#breathing-ecg' }],
        },
        { kind: 'note', text: 'Kalau ada:', en: 'If there is:' },
        {
          n: 115,
          kind: 'me',
          text: 'mengambil tweezer, membuka mulut korban lebih lebar, lalu menjepit dan menarik objek keluar sambil tetap melakukan jaw-thrust.',
          en: 'takes the tweezers, opens the victim\'s mouth wider, then grips the object and draws it out while holding the jaw-thrust.',
        },
        { ref: 'airway-clear' },
        { ref: 'airway-clean' },
      ],
    },
  ],
}
