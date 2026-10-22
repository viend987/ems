// DEAT / Pendarahan — dari "BLEEDING PROCEDURE (DEAT)" di draft.md.
// Dipakai untuk GSW, Vital Wound, Flesh Wound, dan Open Fracture.

export default {
  id: 'deat',
  group: 'tkp',
  name: 'DEAT / Pendarahan',
  nameEn: 'DEAT / Bleeding',
  blurb: 'Direct pressure → elevation → arterial pressure → tourniquet. Naik tingkat kalau darah belum berhenti.',
  blurbEn:
    'Direct pressure → elevation → arterial pressure → tourniquet. Step up if the bleeding has not stopped.',
  sections: [
    {
      id: 'direct-pressure',
      name: 'Direct Pressure',
      nameEn: 'Direct Pressure',
      steps: [
        {
          n: 71,
          kind: 'me',
          text: 'mengambil Trauma Scissor dari ILS Bag lalu menggunting pakaian korban yang menutupi luka.',
          en: 'takes the Trauma Scissors from the ILS Bag and cuts away the clothing covering the wound.',
        },
        {
          n: 72,
          kind: 'me',
          text: 'mengambil Trauma Dressing dari ILS Bag lalu meletakkannya di atas luka korban sambil memberi tekanan.',
          en: 'takes a Trauma Dressing from the ILS Bag and presses it down over the wound.',
        },
        {
          id: 'bleed-check',
          n: 73,
          kind: 'do',
          text: 'Apakah pendarahan berhenti?',
          en: 'Has the bleeding stopped?',
          branches: [
            { label: 'Berhenti → lanjut Airway', labelEn: 'Stopped → on to Airway', to: 'airway#airway-headtilt' },
            { label: 'Masih → Elevation', labelEn: 'Still bleeding → Elevation', to: 'deat#elevation' },
            { label: 'Luka tembus dada', labelEn: 'Penetrating chest wound', to: 'deat#chest-seal' },
            { label: 'Luka perut', labelEn: 'Abdominal wound', to: 'deat#luka-perut' },
          ],
        },
        { kind: 'note', text: 'Jika belum berhenti, lapisi ulang dulu sebelum naik ke Elevation.', en: 'If it has not stopped, re-pack it before stepping up to Elevation.' },
        { n: 74, kind: 'me', text: 'mengambil trauma dressing yang baru dari ILS Bag.', en: 'takes a fresh trauma dressing from the ILS Bag.' },
        { n: 75, kind: 'me', text: 'melapisi kembali area pendarahan dengan trauma dressing yang baru.', en: 'packs the bleeding site again with the fresh trauma dressing.' },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'elevation',
      name: 'Elevation',
      nameEn: 'Elevation',
      steps: [
        {
          n: 76,
          kind: 'me',
          text: 'mengangkat bagian tubuh korban yang mengalami luka lebih tinggi daripada jantung.',
          en: 'raises the injured limb above the level of the heart.',
        },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'arterial',
      name: 'Arterial Pressure',
      nameEn: 'Arterial Pressure',
      steps: [
        {
          n: 77,
          kind: 'me',
          text: 'menekan titik nadi arteri proksimal di atas area luka untuk membendung aliran pendarahan.',
          en: 'applies pressure to the proximal arterial pulse point above the wound to stop blood flow.',
        },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'tourniquet',
      name: 'Tourniquet — luka di tangan/kaki',
      nameEn: 'Tourniquet — wounds on an arm or leg',
      steps: [
        { n: 78, kind: 'me', text: 'mengambil tourniquet dan memasangnya 5cm di atas luka.', en: 'takes the tourniquet and fits it 5cm above the wound.' },
        { n: 79, kind: 'me', text: 'mengencangkan windlass sampai perdarahan berhenti.', en: 'tightens the windlass until the bleeding stops.' },
        { n: 80, kind: 'me', text: 'memastikan tourniquet tetap pada posisi dan tidak longgar.', en: 'checks that the tourniquet is still in place and has not loosened.' },
        { ref: 'bleed-check' },
      ],
    },
    {
      id: 'chest-seal',
      name: 'Luka tembus dada (chest seal)',
      nameEn: 'Penetrating chest wound (chest seal)',
      steps: [
        {
          kind: 'note',
          text: 'Luka tembus dinding dada membuat udara masuk ke rongga dada setiap korban menarik napas. Menutupnya rapat-rapat di keempat sisi justru memerangkap udara itu dan menekan paru — karena itu satu sisi selalu dibiarkan terbuka.',
          en: 'A wound through the chest wall lets air into the chest cavity every time the victim breathes in. Sealing it tight on all four sides traps that air and presses on the lung — which is why one side is always left open.',
        },
        {
          kind: 'me',
          text: 'memeriksa dinding dada korban dan menemukan luka tembus yang mengeluarkan gelembung udara bersama darah.',
          en: 'examines the victim\'s chest wall and finds a penetrating wound bubbling air along with the blood.',
        },
        { kind: 'do', text: 'Apakah terdengar suara desis dari luka setiap korban menarik napas?', en: 'Can you hear a hiss from the wound each time the victim breathes in?' },
        {
          kind: 'me',
          text: 'membersihkan sekitar luka lalu menempelkan occlusive dressing dengan merekatkan tiga sisinya (three-sided seal).',
          en: 'cleans around the wound and applies an occlusive dressing, taping down three of its sides (a three-sided seal).',
        },
        {
          kind: 'me',
          text: 'memiringkan tubuh korban untuk memeriksa punggung, mencari kemungkinan luka keluar.',
          en: 'rolls the victim to check their back for a possible exit wound.',
        },
        { kind: 'do', text: 'Apakah ada luka keluar di punggung korban?', en: 'Is there an exit wound on the victim\'s back?' },
        {
          kind: 'me',
          text: 'menutup luka keluar dengan occlusive dressing kedua pada tiga sisinya.',
          en: 'covers the exit wound with a second occlusive dressing, again on three sides.',
        },
        {
          kind: 'do',
          text: 'Apakah napas korban mulai membaik setelah luka ditutup?',
          en: 'Is the victim\'s breathing improving now the wound is sealed?',
          branches: [
            { label: 'Membaik → pasang NRB', labelEn: 'Improving → fit an NRB', to: 'breathing#breathing-nrb' },
            { label: 'Makin berat → lepas tekanan', labelEn: 'Getting worse → release the pressure', to: 'deat#chest-seal' },
          ],
        },
        {
          kind: 'note',
          text: 'Kalau napasnya justru makin berat sesudah ditutup, berarti udara terjebak di dalam. Buka sebentar sisi yang direkatkan.',
          en: 'If the breathing gets worse after sealing, air is trapped inside. Lift the taped side for a moment.',
        },
        {
          kind: 'me',
          text: 'membuka salah satu sisi dressing untuk melepaskan tekanan udara yang terjebak di rongga dada.',
          en: 'lifts one side of the dressing to release the air trapped in the chest cavity.',
        },
        { kind: 'do', text: 'Terdengar udara keluar dari sela dressing dan napas korban mulai melonggar.', en: 'Air can be heard escaping from under the dressing and the victim\'s breathing starts to ease.' },
      ],
    },
    {
      id: 'luka-perut',
      name: 'Luka perut & organ keluar',
      nameEn: 'Abdominal wound with organs exposed',
      steps: [
        {
          kind: 'me',
          text: 'memeriksa perut korban dan menemukan luka terbuka pada dinding perutnya.',
          en: 'examines the victim\'s abdomen and finds an open wound in the abdominal wall.',
        },
        { kind: 'do', text: 'Apakah ada organ yang keluar dari luka tersebut?', en: 'Is any organ protruding from the wound?' },
        {
          kind: 'note',
          text: 'Organ yang sudah keluar tidak boleh didorong masuk kembali. Tugasnya menjaga tetap lembap dan tertutup sampai sampai di rumah sakit.',
          en: 'An organ that is already out must never be pushed back in. The job is to keep it moist and covered until you reach hospital.',
        },
        {
          kind: 'me',
          text: 'membasahi kasa steril dengan saline solution lalu menutupkannya di atas organ yang keluar.',
          en: 'soaks sterile gauze in saline solution and lays it over the exposed organ.',
        },
        {
          kind: 'me',
          text: 'melapisi kasa lembap tersebut dengan penutup kedap agar kelembapannya terjaga selama perjalanan.',
          en: 'covers the moist gauze with an occlusive layer so it stays damp throughout the journey.',
        },
        {
          kind: 'me',
          text: 'menekuk kedua lutut korban agar otot dinding perutnya mengendur dan tidak menarik lukanya.',
          en: 'bends both of the victim\'s knees so the abdominal wall muscles relax and stop pulling at the wound.',
        },
        { kind: 'do', text: 'Terlihat luka perut korban sudah tertutup dan organnya tetap lembap.', en: 'The abdominal wound is covered and the organ is staying moist.' },
        {
          kind: 'note',
          text: 'Jangan beri korban minum. Perdarahan di dalam perut tidak bisa ditekan dari luar, jadi ini termasuk yang harus cepat dibawa.',
          en: 'Do not give the victim anything to drink. Bleeding inside the abdomen cannot be pressed on from outside, so this one needs to move fast.',
          branches: [
            { label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' },
            { label: 'Lactated Ringer', labelEn: 'Lactated Ringer', to: 'drugs#lactated-ringer' },
          ],
        },
      ],
    },
    {
      id: 'croc',
      name: 'CRoC — luka di tubuh / groin',
      nameEn: 'CRoC — wounds to the torso or groin',
      steps: [
        { n: 81, kind: 'me', text: 'mengeluarkan CRoC dari dalam ILS Bag dan merakitnya.', en: 'takes the CRoC out of the ILS Bag and assembles it.' },
        { n: 82, kind: 'me', text: 'memposisikan pressure plate CRoC tepat di atas area pendarahan.', en: 'sets the CRoC pressure plate directly over the bleeding site.' },
        {
          n: 83,
          kind: 'me',
          text: 'melilitkan strap CRoC pada area groin dan mengencangkannya untuk menstabilkan alat.',
          en: 'wraps the CRoC strap around the groin and tightens it to hold the device steady.',
        },
        {
          n: 84,
          kind: 'me',
          text: 'memutar windlass secara perlahan untuk memberikan kompresi langsung hingga pendarahan berhenti.',
          en: 'turns the windlass slowly to apply direct compression until the bleeding stops.',
        },
        {
          n: 85,
          kind: 'me',
          text: 'mengunci windlass pada pengait pengaman CRoC untuk menjaga tekanan tetap stabil.',
          en: 'locks the windlass into the CRoC safety catch to hold the pressure steady.',
        },
        { ref: 'bleed-check' },
        {
          kind: 'note',
          text: 'Kalau korban kehilangan banyak darah, lanjutkan dengan ILS IV Lactated Ringer.',
          en: 'If the victim has lost a lot of blood, follow up with an ILS IV of Lactated Ringer.',
          branches: [{ label: 'Lactated Ringer', labelEn: 'Lactated Ringer', to: 'drugs#lactated-ringer' }],
        },
      ],
    },
  ],
}
