// DEAT / Pendarahan — dari "BLEEDING PROCEDURE (DEAT)" di draft.md.
// Dipakai untuk GSW, Vital Wound, Flesh Wound, dan Open Fracture.

export default {
  id: 'deat',
  group: 'tkp',
  name: 'DEAT / Pendarahan',
  blurb: 'Direct pressure → elevation → arterial pressure → tourniquet. Naik tingkat kalau darah belum berhenti.',
  sections: [
    {
      id: 'direct-pressure',
      name: 'Direct Pressure',
      steps: [
        {
          n: 71,
          kind: 'me',
          text: 'mengambil Trauma Scissor dari ILS Bag lalu menggunting pakaian korban yang menutupi luka.',
        },
        {
          n: 72,
          kind: 'me',
          text: 'mengambil Trauma Dressing dari ILS Bag lalu meletakkannya di atas luka korban sambil memberi tekanan.',
        },
        {
          id: 'bleed-check',
          n: 73,
          kind: 'do',
          text: 'Apakah pendarahan berhenti?',
          branches: [
            { label: 'Berhenti → lanjut Airway', to: 'airway#airway-headtilt' },
            { label: 'Masih → Elevation', to: 'deat#elevation' },
            { label: 'Luka tembus dada', to: 'deat#chest-seal' },
            { label: 'Luka perut', to: 'deat#luka-perut' },
          ],
        },
        { kind: 'note', text: 'Jika belum berhenti, lapisi ulang dulu sebelum naik ke Elevation.' },
        { n: 74, kind: 'me', text: 'mengambil trauma dressing yang baru dari ILS Bag.' },
        { n: 75, kind: 'me', text: 'melapisi kembali area pendarahan dengan trauma dressing yang baru.' },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'elevation',
      name: 'Elevation',
      steps: [
        {
          n: 76,
          kind: 'me',
          text: 'mengangkat bagian tubuh korban yang mengalami luka lebih tinggi daripada jantung.',
        },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'arterial',
      name: 'Arterial Pressure',
      steps: [
        {
          n: 77,
          kind: 'me',
          text: 'memberi tekanan dengan menutup aliran darah di bagian pembuluh darah korban.',
        },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'tourniquet',
      name: 'Tourniquet — luka di tangan/kaki',
      steps: [
        { n: 78, kind: 'me', text: 'mengambil tourniquet dan memasangnya 5cm di atas luka.' },
        { n: 79, kind: 'me', text: 'mengencangkan windlass sampai perdarahan berhenti.' },
        { n: 80, kind: 'me', text: 'memastikan tourniquet tetap pada posisi dan tidak longgar.' },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'chest-seal',
      name: 'Luka tembus dada (chest seal)',
      steps: [
        {
          kind: 'note',
          text: 'Luka tembus dinding dada membuat udara masuk ke rongga dada setiap korban menarik napas. Menutupnya rapat-rapat di keempat sisi justru memerangkap udara itu dan menekan paru — karena itu satu sisi selalu dibiarkan terbuka.',
        },
        {
          kind: 'me',
          text: 'memeriksa dinding dada korban dan menemukan luka tembus yang mengeluarkan gelembung udara bersama darah.',
        },
        { kind: 'do', text: 'Apakah terdengar suara desis dari luka setiap korban menarik napas?' },
        {
          kind: 'me',
          text: 'membersihkan sekitar luka lalu menempelkan occlusive dressing dengan merekatkan tiga sisinya (three-sided seal).',
        },
        {
          kind: 'me',
          text: 'memiringkan tubuh korban untuk memeriksa punggung, mencari kemungkinan luka keluar.',
        },
        { kind: 'do', text: 'Apakah ada luka keluar di punggung korban?' },
        {
          kind: 'me',
          text: 'menutup luka keluar dengan occlusive dressing kedua pada tiga sisinya.',
        },
        {
          kind: 'do',
          text: 'Apakah napas korban mulai membaik setelah luka ditutup?',
          branches: [
            { label: 'Membaik → pasang NRB', to: 'breathing#breathing-nrb' },
            { label: 'Makin berat → lepas tekanan', to: 'deat#chest-seal' },
          ],
        },
        {
          kind: 'note',
          text: 'Kalau napasnya justru makin berat sesudah ditutup, berarti udara terjebak di dalam. Buka sebentar sisi yang direkatkan.',
        },
        {
          kind: 'me',
          text: 'membuka salah satu sisi dressing untuk melepaskan tekanan udara yang terjebak di rongga dada.',
        },
        { kind: 'do', text: 'Terdengar udara keluar dari sela dressing dan napas korban mulai melonggar.' },
      ],
    },
    {
      id: 'luka-perut',
      name: 'Luka perut & organ keluar',
      steps: [
        {
          kind: 'me',
          text: 'memeriksa perut korban dan menemukan luka terbuka pada dinding perutnya.',
        },
        { kind: 'do', text: 'Apakah ada organ yang keluar dari luka tersebut?' },
        {
          kind: 'note',
          text: 'Organ yang sudah keluar tidak boleh didorong masuk kembali. Tugasnya menjaga tetap lembap dan tertutup sampai sampai di rumah sakit.',
        },
        {
          kind: 'me',
          text: 'membasahi kasa steril dengan saline solution lalu menutupkannya di atas organ yang keluar.',
        },
        {
          kind: 'me',
          text: 'melapisi kasa lembap tersebut dengan penutup kedap agar kelembapannya terjaga selama perjalanan.',
        },
        {
          kind: 'me',
          text: 'menekuk kedua lutut korban agar otot dinding perutnya mengendur dan tidak menarik lukanya.',
        },
        { kind: 'do', text: 'Terlihat luka perut korban sudah tertutup dan organnya tetap lembap.' },
        {
          kind: 'note',
          text: 'Jangan beri korban minum. Perdarahan di dalam perut tidak bisa ditekan dari luar, jadi ini termasuk yang harus cepat dibawa.',
          branches: [
            { label: 'Muat korban', to: 'load#load' },
            { label: 'Lactated Ringer', to: 'drugs#lactated-ringer' },
          ],
        },
      ],
    },
    {
      id: 'croc',
      name: 'CRoC — luka di tubuh / groin',
      steps: [
        { n: 81, kind: 'me', text: 'mengeluarkan CRoC dari dalam ILS Bag dan merakitnya.' },
        { n: 82, kind: 'me', text: 'memposisikan pressure plate CRoC tepat di atas area pendarahan.' },
        {
          n: 83,
          kind: 'me',
          text: 'melilitkan strap CRoC pada area groin dan mengencangkannya untuk menstabilkan alat.',
        },
        {
          n: 84,
          kind: 'me',
          text: 'memutar windlass secara perlahan untuk memberikan kompresi langsung hingga pendarahan berhenti.',
        },
        {
          n: 85,
          kind: 'me',
          text: 'mengunci windlass pada pengait pengaman CRoC untuk menjaga tekanan tetap stabil.',
        },
        { ref: 'bleed-check' },
        {
          kind: 'note',
          text: 'Kalau korban kehilangan banyak darah, lanjutkan dengan ILS IV Lactated Ringer.',
          branches: [{ label: 'Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
      ],
    },
  ],
}
