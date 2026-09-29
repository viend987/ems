// AIRWAY — dari "ABC PROCEDURE AIRWAY" di draft.md.
//
// Penomoran ditata ulang di kategori ini karena beberapa langkah diringkas dan
// ada cabang baru (drainase). Drainase memegang /104 sesuai keputusan, jadi
// blok /99–/103 sengaja dibiarkan kosong sebagai ruang tumbuh head-tilt.

export default {
  id: 'airway',
  group: 'tkp',
  name: 'Airway',
  blurb: 'Pemeriksaan dan pembukaan jalan napas korban. Setiap tindakan diikuti pemeriksaan ulang sebelum lanjut.',
  sections: [
    {
      id: 'airway-headtilt',
      name: 'Airway — Head-Tilt Chin-Lift (umum)',
      steps: [
        {
          n: 91,
          kind: 'me',
          text: 'menempatkan diri di sisi kepala korban, tangan kanan di dahi dan tangan kiri di dagu korban.',
        },
        {
          n: 92,
          kind: 'me',
          text: 'menekan dahi sambil menarik dagu ke atas untuk membuka jalan napas.',
        },
        {
          n: 93,
          kind: 'me',
          text: 'membuka sedikit mulut korban lalu menyorot bagian dalamnya dengan flashlight.',
        },
        {
          n: 94,
          kind: 'do',
          text: 'Apakah ada halangan yang mengganggu airway korban?',
          branches: [
            { label: 'Tidak ada → Breathing', to: 'breathing#breathing-ecg' },
            { label: 'Darah / gumpalan → Drainase', to: 'airway#airway-drainase' },
            { label: 'Ada cedera kepala → Jaw-Thrust', to: 'airway#airway-jawthrust' },
          ],
        },
        { kind: 'note', text: 'Kalau yang menghalangi berupa benda padat:' },
        {
          n: 95,
          kind: 'me',
          text: 'mengambil tweezer dari ILS Bag, membuka mulut korban lebih lebar, lalu menjepit objek dan menariknya keluar perlahan.',
        },
        { id: 'airway-clear', n: 97, kind: 'do', text: 'Terlihat objek telah keluar dari airway korban.' },
        {
          id: 'airway-clean',
          n: 98,
          kind: 'me',
          text: 'membersihkan mulut korban menggunakan gauze sterile dari ILS Bag.',
        },
      ],
    },
    {
      id: 'airway-drainase',
      name: 'Airway — Drainase darah (tanpa cedera kepala/leher)',
      steps: [
        {
          n: 104,
          kind: 'me',
          text: 'memiringkan kepala korban ke samping perlahan sambil membuka mulut sedikit, membiarkan darah dan gumpalan mengalir keluar.',
        },
        { n: 106, kind: 'me', text: 'membiarkan darah mengalir hingga genangan di airway berkurang.' },
        {
          n: 107,
          kind: 'me',
          text: 'membersihkan mulut korban dengan gauze sterile lalu mengembalikan kepala ke posisi netral.',
        },
        {
          n: 109,
          kind: 'do',
          text: 'Apakah airway korban sudah tampak bersih dan tidak ada sumbatan?',
          branches: [
            { label: 'Bersih → Breathing', to: 'breathing#breathing-ecg' },
            { label: 'Darah tidak berhenti → Intubasi', to: 'breathing#breathing-intubasi' },
          ],
        },
        {
          n: 110,
          kind: 'me',
          text: 'mengulangi drainase atau menggunakan tweezer untuk mengambil sisa gumpalan.',
        },
      ],
    },
    {
      id: 'airway-jawthrust',
      name: 'Airway — Jaw-Thrust (cedera kepala)',
      steps: [
        {
          n: 111,
          kind: 'me',
          text: 'menempatkan diri di atas kepala korban, lalu mendorong rahang bawah ke atas (jaw-thrust) tanpa menekan leher.',
        },
        {
          n: 113,
          kind: 'me',
          text: 'membuka mulut korban perlahan dengan kedua ibu jari lalu menyorot bagian dalamnya dengan flashlight.',
        },
        {
          n: 114,
          kind: 'do',
          text: 'Apakah terlihat ada objek yang menghalangi jalur napas korban?',
          branches: [{ label: 'Tidak ada → Breathing', to: 'breathing#breathing-ecg' }],
        },
        { kind: 'note', text: 'Kalau ada:' },
        {
          n: 115,
          kind: 'me',
          text: 'mengambil tweezer, membuka mulut korban lebih lebar, lalu menjepit dan menarik objek keluar sambil tetap melakukan jaw-thrust.',
        },
        { ref: 'airway-clear' },
        { ref: 'airway-clean' },
      ],
    },
  ],
}
