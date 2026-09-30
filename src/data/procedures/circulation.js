// CIRCULATION — dari "CIRCULATION" di draft.md.

export default {
  id: 'circulation',
  group: 'tkp',
  name: 'Circulation',
  nameEn: 'Circulation',
  blurb: 'Pemeriksaan denyut nadi, penanganan syok, resusitasi (CPR & AED), dan cek ulang.',
  blurbEn:
    'Checking the pulse, treating shock, resuscitation (CPR & AED), and the re-check.',
  sections: [
    {
      id: 'circulation-ecg',
      name: 'Circulation — pakai ECG (torso bersih)',
      nameEn: 'Circulation — with an ECG (torso intact)',
      steps: [
        {
          n: 144,
          kind: 'me',
          text: 'menatap ke layar ECG, memantau grafik denyut jantung serta indikator heart rate.',
          en: 'watches the ECG screen, following the heart trace and the heart-rate reading.',
        },
        {
          n: 145,
          kind: 'do',
          text: 'Berapa denyut nadi per menit yang terbaca pada monitor ECG? (60 - 100 Normal)',
          en: 'What pulse per minute does the ECG monitor show? (60 - 100 is normal)',
          branches: [
            { label: '60–100 → Cek Ulang', labelEn: '60–100 → Re-check', to: 'circulation#circulation-normal' },
            { label: 'Di bawah 60 → nadi melambat', labelEn: 'Under 60 → slowing pulse', to: 'circulation#circulation-bradi' },
            { label: 'Di atas 100 → nadi memacu', labelEn: 'Over 100 → racing pulse', to: 'circulation#circulation-taki' },
            { label: 'Tidak ada denyut → CPR', labelEn: 'No pulse → CPR', to: 'circulation#cpr' },
          ],
        },
      ],
    },
    {
      id: 'circulation-manual',
      name: 'Circulation — tanpa ECG (ada luka di torso)',
      nameEn: 'Circulation — without an ECG (torso wounded)',
      steps: [
        {
          kind: 'note',
          text: 'Jangan periksa nadi di bagian yang terluka. Kalau pergelangan tangan terluka, pakai leher; kalau leher terluka, pakai pergelangan tangan.',
          en: 'Do not take the pulse at an injured site. If the wrist is hurt use the neck; if the neck is hurt use the wrist.',
        },
        {
          kind: 'me',
          text: 'meletakkan jari telunjuk dan jari tengahnya ke carotid artery korban untuk memeriksa denyut nadinya.',
          en: 'places their index and middle fingers on the victim\'s carotid artery to feel for a pulse.',
        },
        {
          kind: 'do',
          text: 'Berapa denyut nadi per menit korban? (60 - 100 normal)',
          en: 'What is the victim\'s pulse per minute? (60 - 100 is normal)',
          branches: [
            { label: '60–100 → Cek Ulang', labelEn: '60–100 → Re-check', to: 'circulation#circulation-normal' },
            { label: 'Di bawah 60', labelEn: 'Under 60', to: 'circulation#circulation-bradi' },
            { label: 'Di atas 100 dengan luka torso', labelEn: 'Over 100 with a torso wound', to: 'circulation#circulation-torso' },
            { label: 'Tidak ada denyut → CPR', labelEn: 'No pulse → CPR', to: 'circulation#cpr' },
          ],
        },
      ],
    },
    {
      id: 'circulation-torso',
      name: 'Circulation — nadi tinggi dengan luka di torso',
      nameEn: 'Circulation — fast pulse with a torso wound',
      steps: [
        {
          kind: 'note',
          text: 'Perdarahan di dalam dada atau perut tidak bisa ditekan dari luar dan tidak bisa ditourniquet. Nadi yang memacu di sini berarti korban kehilangan darah ke dalam rongga tubuhnya sendiri — ini kasus yang menang oleh kecepatan, bukan oleh alat.',
          en: 'Bleeding inside the chest or abdomen cannot be pressed on from outside and cannot be tourniqueted. A racing pulse here means the victim is losing blood into their own body cavity — this one is won by speed, not by equipment.',
        },
        {
          kind: 'me',
          text: 'memeriksa perut dan dada korban dengan palpasi, mencari area yang mengeras atau membengkak.',
          en: 'palpates the victim\'s abdomen and chest, feeling for any area that is firm or swollen.',
        },
        {
          kind: 'do',
          text: 'Apakah perut korban terasa mengeras atau tegang saat ditekan?',
          en: 'Does the victim\'s abdomen feel firm or rigid under pressure?',
          branches: [
            { label: 'Luka terbuka di perut', labelEn: 'Open abdominal wound', to: 'deat#luka-perut' },
            { label: 'Luka tembus dada', labelEn: 'Penetrating chest wound', to: 'deat#chest-seal' },
          ],
        },
        {
          kind: 'me',
          text: 'menyelimuti korban agar tidak kehilangan panas tubuh lalu bersiap memuatnya ke unit kendaraan.',
          en: 'wraps the victim to stop them losing body heat and gets ready to load them into the unit.',
        },
        {
          kind: 'note',
          text: 'Pasang Lactated Ringer kalau kamu berizin ILS, lalu jalan. Kalau belum berizin, jangan tertahan di TKP — muat dan transport.',
          en: 'Start Lactated Ringer if you are cleared for ILS, then move. If you are not cleared, do not get stuck on scene — load and transport.',
          branches: [
            { label: 'Lactated Ringer', labelEn: 'Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Belum boleh ILS', labelEn: 'Not cleared for ILS', to: 'circulation#tanpa-ils' },
            { label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'circulation-normal',
      name: 'Cek Ulang (nadi 60–100, atau kembali normal)',
      nameEn: 'Re-check (pulse 60–100, or back to normal)',
      steps: [
        { kind: 'note', text: 'A, B, dan C sudah beres.' },
        {
          kind: 'note',
          text: 'Kalau kasus ini patah tulang — close maupun open fracture, sudah ketahuan sejak awal di Penanganan Korban — bidainya wajib dipasang sekarang. Bukan pilihan, dan bukan sesuatu yang "ditemukan" di cek ulang ini.',
          en: 'If this case is a fracture — closed or open, which you already knew back in Victim Handling — the splint goes on now. It is not optional, and it is not something you "discover" at this re-check.',
          branches: [{ label: 'Penanganan patah tulang', labelEn: 'Treating the fracture', to: 'fracture#triangular' }],
        },
        {
          kind: 'note',
          text: 'Sisanya baru cek ulang sungguhan: luka kedua yang belum ketahuan, sering luput waktu perhatian masih tertuju ke luka pertama.',
          en: 'The rest is the real re-check: a second wound nobody has spotted yet, which is easy to miss while all the attention is on the first one.',
        },
        {
          n: 148,
          kind: 'me',
          text: 'melakukan palpasi menyeluruh dari kepala hingga kaki korban, memeriksa apakah ada luka tambahan yang belum tertangani.',
          en: 'palpates the victim thoroughly from head to foot, checking for any further wound left untreated.',
        },
        {
          n: 149,
          kind: 'do',
          text: 'Apakah ditemukan luka tambahan pada tubuh korban? (luka lecet / memar / tidak ada)',
          en: 'Is there any further wound on the victim? (graze / bruise / none)',
          branches: [
            { label: 'Luka lecet', labelEn: 'Graze', to: 'wounds#graze' },
            { label: 'Memar', labelEn: 'Bruise', to: 'wounds#bruise' },
            { label: 'Tidak ada → muat korban', labelEn: 'None → load the victim', to: 'load#load' },
          ],
        },
      ],
    },
    {
      id: 'circulation-bradi',
      name: 'Circulation — nadi di bawah 60',
      nameEn: 'Circulation — pulse under 60',
      steps: [
        {
          kind: 'note',
          text: 'Nadi melambat berarti aliran darah ke otak berkurang, dan korban akan ikut sesak. Topang napasnya dulu sebelum menyentuh obat.',
          en: 'A slowing pulse means less blood reaching the brain, and the victim will be short of breath with it. Support the breathing before you touch any drug.',
        },
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        { ref: 'nrb-take' },
        { ref: 'nrb-flow' },
        { ref: 'nrb-place' },
        { ref: 'nrb-valve' },
        { ref: 'nrb-strap' },
        {
          n: 146,
          kind: 'do',
          text: 'Apakah denyut nadi korban naik setelah oksigen terpasang? (60 - 100 Normal)',
          en: 'Has the victim\'s pulse come up now the oxygen is on? (60 - 100 is normal)',
          branches: [
            { label: 'Naik → Cek Ulang', labelEn: 'Up → Re-check', to: 'circulation#circulation-normal' },
            { label: 'Masih di bawah 60 → Atropine', labelEn: 'Still under 60 → Atropine', to: 'drugs#atropine' },
            { label: 'Belum boleh pakai ILS', labelEn: 'Not cleared for ILS', to: 'circulation#tanpa-ils' },
          ],
        },
      ],
    },
    {
      id: 'circulation-taki',
      name: 'Circulation — nadi di atas 100',
      nameEn: 'Circulation — pulse over 100',
      steps: [
        {
          kind: 'note',
          text: 'Nadi di atas 100 hampir selalu disertai sesak, jadi pasang NRB lebih dulu dan pantau ulang di monitor ECG. Kalau nadinya belum turun juga, baru penyebabnya menentukan obatnya — dan dua penyebab itu penanganannya berlawanan.',
          en: 'A pulse over 100 almost always comes with shortness of breath, so fit the NRB first and watch the ECG again. Only if it still has not come down does the cause decide the drug — and those two causes are treated in opposite ways.',
        },
        { ref: 'oxy-note' },
        { ref: 'oxy-fetch' },
        { ref: 'oxy-place' },
        { ref: 'nrb-take' },
        { ref: 'nrb-flow' },
        { ref: 'nrb-place' },
        { ref: 'nrb-valve' },
        { ref: 'nrb-strap' },
        {
          n: 147,
          kind: 'do',
          text: 'Apakah denyut nadi korban turun setelah NRB terpasang? (60 - 100 Normal)',
          en: 'Has the victim\'s pulse come down now the NRB is on? (60 - 100 is normal)',
          branches: [{ label: 'Turun → Cek Ulang', labelEn: 'Down → Re-check', to: 'circulation#circulation-normal' }],
        },
        {
          kind: 'note',
          text: 'Kalau masih di atas 100 walau oksigen sudah terpasang, baru cari penyebabnya.',
          en: 'If it is still over 100 with the oxygen running, now look for the cause.',
        },
        {
          kind: 'do',
          text: 'Apakah korban kehilangan banyak darah sebelum nadinya memacu?',
          en: 'Did the victim lose a lot of blood before the pulse started racing?',
          branches: [
            { label: 'Ya, banyak pendarahan → Lactated Ringer', labelEn: 'Yes, heavy bleeding → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Tidak ada pendarahan → Verapamil', labelEn: 'No bleeding → Verapamil', to: 'drugs#verapamil' },
            { label: 'Tanpa obat → posisi syok', labelEn: 'No drugs → shock position', to: 'circulation#circulation-syok' },
          ],
        },
        {
          kind: 'note',
          text: 'Kalau korban baru kehilangan banyak darah, jantungnya memacu justru karena volume darahnya kurang — yang dibutuhkan cairan pengganti, bukan obat penurun denyut. Verapamil baru tepat kalau nadi tinggi tanpa riwayat pendarahan, misalnya sakit kepala berat.',
          en: 'If the victim has just lost a lot of blood, the heart is racing precisely because the blood volume is low — what it needs is replacement fluid, not a drug to slow it. Verapamil is only right for a high pulse with no history of bleeding, for instance a severe headache.',
        },
      ],
    },
    {
      id: 'circulation-syok',
      name: 'Posisi syok (nadi memacu, tanpa obat)',
      nameEn: 'Shock position (racing pulse, no drugs)',
      steps: [
        {
          kind: 'note',
          text: 'Kalau korban kehilangan darah dan tidak ada cairan pengganti, darah yang tersisa bisa diarahkan ke tempat yang paling butuh. Ini yang dikerjakan unit BLS sambil menunggu atau jalan.',
          en: 'If the victim has lost blood and there is no replacement fluid, the blood they have left can be steered to where it is needed most. This is what a BLS unit does while waiting, or while moving.',
        },
        {
          kind: 'me',
          text: 'membaringkan korban, mengganjal kedua tungkainya setinggi 30cm, lalu menyelimutinya dengan foam blanket.',
          en: 'lays the victim flat, props both legs up about 30cm, and covers them with a foam blanket.',
        },
        { kind: 'me', text: 'memantau ulang denyut nadi dan napas korban setiap beberapa saat.', en: 're-checks the victim\'s pulse and breathing every few moments.' },
        {
          kind: 'do',
          text: 'Apakah denyut nadi korban mulai melambat mendekati normal?',
          en: 'Is the victim\'s pulse starting to slow towards normal?',
          branches: [
            { label: 'Membaik → muat korban', labelEn: 'Improving → load the victim', to: 'load#load' },
            { label: 'Belum → Lactated Ringer', labelEn: 'Not yet → Lactated Ringer', to: 'drugs#lactated-ringer' },
            { label: 'Belum boleh ILS', labelEn: 'Not cleared for ILS', to: 'circulation#tanpa-ils' },
          ],
        },
        { kind: 'note', text: 'Jangan beri korban makan atau minum apa pun.' },
      ],
    },
    {
      id: 'cpr',
      name: 'CPR (tidak ada denyut, torso tanpa gejala abnormal)',
      nameEn: 'CPR (no pulse, torso showing nothing abnormal)',
      steps: [
        {
          n: 150,
          kind: 'me',
          text: 'mengeluarkan BVM dari ILS Bag lalu memasangkannya di area hidung dan mulut korban dengan rapat.',
          en: 'takes the BVM out of the ILS Bag and seats it firmly over the victim\'s nose and mouth.',
        },
        { n: 152, kind: 'me', text: 'meletakkan kedua telapak tangan di atas sternum korban.', en: 'places both palms over the victim\'s sternum.' },
        { kind: 'anim', text: '.cpr' },
        {
          n: 153,
          kind: 'me',
          text: 'mulai memberikan 30 kompresi dada secara ritmis, menekan kuat dan dalam dengan kecepatan stabil.',
          en: 'begins 30 rhythmic chest compressions, pushing hard and deep at a steady rate.',
        },
        {
          n: 154,
          kind: 'do',
          text: 'Apakah ada perubahan pada ritme ECG atau respons korban? (60 - 100 Normal)',
          en: 'Any change in the ECG rhythm or in the victim\'s response? (60 - 100 is normal)',
          branches: [
            { label: 'Kembali → Cek Ulang', labelEn: 'Back → Re-check', to: 'circulation#circulation-normal' },
            { label: 'Belum → AED', labelEn: 'Not yet → AED', to: 'circulation#aed' },
          ],
        },
      ],
    },
    {
      id: 'aed',
      name: 'AED / Defibrilasi (CPR belum berhasil)',
      nameEn: 'AED / defibrillation (CPR has not worked)',
      steps: [
        { n: 155, kind: 'me', text: 'berlari menuju unit kendaraan lalu membuka kompartemen medis.', en: 'runs to the unit and opens the medical compartment.' },
        {
          n: 156,
          kind: 'do',
          text: 'Terlihat petugas mengambil AED dari dalam RA Unit lalu kembali ke sisi korban.',
          en: 'The responder can be seen taking the AED from the RA Unit and returning to the victim\'s side.',
        },
        { n: 157, kind: 'me', text: 'meletakkan AED di samping korban dan menyalakannya.', en: 'sets the AED down beside the victim and switches it on.' },
        {
          n: 158,
          kind: 'me',
          text: 'membuka baju bagian dada korban hingga terlihat jelas area sternum dan memastikan permukaannya kering.',
          en: 'opens the victim\'s clothing over the chest until the sternum is clearly exposed, and checks the skin is dry.',
        },
        {
          n: 159,
          kind: 'me',
          text: 'meletakkan pads AED di atas dada korban lalu menekan tombol shock pada AED.',
          en: 'places the AED pads on the victim\'s chest and presses the shock button.',
        },
        { n: 160, kind: 'do', text: 'AED otomatis akan memberikan shock.', en: 'The AED will deliver the shock automatically.' },
        {
          kind: 'do',
          text: 'Apakah ritme jantung korban kembali setelah shock? (60 - 100 Normal)',
          en: 'Has the victim\'s heart rhythm come back after the shock? (60 - 100 is normal)',
          branches: [
            { label: 'Kembali → Cek Ulang', labelEn: 'Back → Re-check', to: 'circulation#circulation-normal' },
            { label: 'Belum → Epinephrine', labelEn: 'Not yet → Epinephrine', to: 'drugs#epinephrine' },
            { label: 'Belum boleh pakai ILS', labelEn: 'Not cleared for ILS', to: 'circulation#tanpa-ils' },
          ],
        },
      ],
    },
    {
      id: 'meninggal',
      name: 'Kalau korban tidak tertolong',
      nameEn: 'If the victim cannot be saved',
      steps: [
        {
          kind: 'note',
          text: 'Dipakai kalau CPR, AED, dan Epinephrine semua sudah dicoba dan nadi tidak pernah kembali. Menyatakan waktu kematian biasanya disepakati dulu dengan pemain lain di scene sebelum RP ini jalan — bukan keputusan sepihak.',
          en: 'Used once CPR, AED and Epinephrine have all been tried and the pulse never came back. Calling the time of death is normally agreed with the other players in the scene first — it is not a one-sided decision.',
        },
        {
          kind: 'me',
          text: 'menghentikan kompresi dan menatap monitor ECG sekali lagi, memastikan benar-benar tidak ada aktivitas jantung.',
          en: 'stops compressions and looks at the ECG monitor once more, confirming there is truly no cardiac activity.',
        },
        { kind: 'do', text: 'Monitor menunjukkan garis datar, tidak ada aktivitas jantung sama sekali.', en: 'The monitor shows a flat line, with no cardiac activity at all.' },
        {
          kind: 'me',
          text: 'melihat jam di radio lalu mencatat waktu kematian korban.',
          en: 'checks the time on the radio and records the victim\'s time of death.',
        },
        {
          kind: 'note',
          text: 'Dua baris berikut buat menyampaikan ke orang di sekitar TKP — keluarga, saksi, atau rekan korban. Pilih salah satu, atau gabung sesuai situasinya.',
          en: 'The next two lines are for telling the people around the scene — family, witnesses, or the victim\'s colleagues. Pick one, or combine them to suit.',
        },
        {
          kind: 'say',
          label: 'opsi 1',
          labelEn: 'option 1',
          text: 'Kami sudah coba semua cara yang bisa dilakukan, tapi kondisinya memang sudah tidak tertolong. Saya turut berduka.',
          en: 'We tried everything we could, but the injuries were beyond saving. I am sorry.',
        },
        {
          kind: 'say',
          label: 'opsi 2',
          labelEn: 'option 2',
          text: 'Maaf, korban tidak bisa kami selamatkan. Kami turut berdukacita untuk keluarganya.',
          en: 'I am sorry, we could not save them. Our condolences to the family.',
        },
        {
          kind: 'me',
          text: 'menutup wajah korban dengan kain dari ILS Bag sambil menunggu unit Coroner tiba di lokasi.',
          en: 'covers the victim\'s face with a cloth from the ILS Bag while waiting for the Coroner unit to arrive.',
        },
        { ref: 'minta-coroner' },
        {
          kind: 'note',
          text: 'Lanjut ke penanganan pasca-kematian sesuai situasi di scene.',
          en: 'Carry on with the post-mortem handling that fits the scene.',
          branches: [
            { label: 'RPLY versi ringkas', labelEn: 'The short RPLY version', to: 'coroner#rply' },
            { label: 'Possible CK Scene', labelEn: 'Possible CK scene', to: 'coroner#ck-scene' },
          ],
        },
      ],
    },
    {
      id: 'tanpa-ils',
      name: 'Kalau belum boleh pakai ILS',
      nameEn: 'If you are not cleared for ILS',
      steps: [
        {
          kind: 'note',
          text: 'Belum berizin ILS bukan berarti kehabisan tindakan. Yang di bawah ini semuanya boleh dikerjakan unit BLS, dan tiga di antaranya sering lebih menentukan daripada obat.',
          en: 'Not being cleared for ILS does not mean you are out of options. Everything below is open to a BLS unit, and three of them often matter more than any drug.',
          branches: [
            { label: 'Napas sangat lambat → bantu dengan BVM', labelEn: 'Very slow breathing → assist with a BVM', to: 'breathing#breathing-bvm' },
            { label: 'Nadi memacu → posisi syok', labelEn: 'Racing pulse → shock position', to: 'circulation#circulation-syok' },
            { label: 'Tidak sadar tapi bernapas → posisi pemulihan', labelEn: 'Unconscious but breathing → recovery position', to: 'breathing#posisi-pemulihan' },
          ],
        },
        {
          kind: 'note',
          text: 'Sesudah itu, minta unit berizin. Kalau tidak ada yang bertugas, transport itu jawabannya — bukan berhenti di tengah.',
          en: 'After that, ask for a cleared unit. If none is on duty, transport is the answer — not stopping halfway.',
        },
        {
          kind: 'radio',
          label: 'Minta unit ILS',
          labelEn: 'Request an ILS unit',
          text: '~ to OCD. Requesting 10-70 ILS Unit at 10-20 Legion.',
        },
        {
          kind: 'note',
          text: 'Kalau ada yang datang, serahkan penanganan lanjutannya dan kamu tetap membantu sebagai BLS.',
          en: 'If one turns up, hand the ongoing treatment over and keep assisting as BLS.',
        },
        {
          kind: 'me',
          text: 'mempertahankan bantuan napas dan tekanan pada luka korban sambil menunggu, memastikan kondisinya tidak memburuk.',
          en: 'keeps up the ventilation support and the pressure on the wound while waiting, making sure nothing gets worse.',
        },
        {
          kind: 'note',
          text: 'Kalau tidak ada unit berizin yang bertugas, transport itu jawabannya. Muat korban, jalan ke PBH, dan tutup RP dengan Doctor Report ke dokter yang menerima.',
          en: 'If no cleared unit is on duty, transport is the answer. Load the victim, run to PBH, and close the RP with a Doctor Report to the receiving doctor.',
          branches: [
            { label: 'Muat korban', labelEn: 'Load the victim', to: 'load#load' },
            { label: 'Doctor Report', labelEn: 'Doctor Report', to: 'hospital#doctor-report' },
          ],
        },
      ],
    },
  ],
}
