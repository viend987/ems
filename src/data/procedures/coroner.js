// Coroner — dari "RP CORONER (RPLy)" dan "RP CORONER (Possible CK Scene)" di LSFD RP.md

export default {
  id: 'coroner',
  group: 'khusus',
  name: 'Coroner',
  nameEn: 'Coroner',
  blurb: 'Korban sudah tidak bernyawa. Dua versi: RPLY yang dinarasikan, atau adegan penuh untuk possible CK.',
  blurbEn:
    'The victim is already dead. Two versions: a narrated RPLY, or a full scene for a possible CK.',
  sections: [
    {
      id: 'rply',
      name: 'RPLY — versi ringkas',
      steps: [
        {
          kind: 'note',
          text: 'RPLY singkatan dari Roleplay Lie: seluruh kedatangan dan kerja tim Coroner hanya dinarasikan lewat /do, tidak ada unit yang benar-benar datang.',
        },
        {
          id: 'minta-coroner',
          n: 238,
          kind: 'radio',
          label: 'Minta unit MED',
          text: '~ to OCD. Requesting 10-70 MED Unit at 10-20 Legion.',
        },
        { n: 239, kind: 'do', text: 'Unit Coroner telah tiba di lokasi korban berada.' },
        {
          n: 240,
          kind: 'do',
          text: 'Tim Coroner membuka pintu belakang unit Coroner dan mengeluarkan stretcher dengan body bag di atasnya.',
        },
        {
          n: 241,
          kind: 'do',
          text: 'Tim Coroner bersama-sama mengangkat tubuh korban dengan hati-hati dan meletakkannya di dalam body bag lalu menutup resletingnya rapat-rapat.',
        },
        {
          n: 242,
          kind: 'do',
          text: 'Tim Coroner mengangkut korban ke dalam unit Coroner dan pergi meninggalkan lokasi kejadian.',
        },
      ],
    },
    {
      id: 'ck-scene',
      name: 'Possible CK Scene — versi penuh',
      steps: [
        { ref: 'on-location' },
        { n: 243, kind: 'me', text: 'mengambil N-Gloves dan masker dari ILS Bag lalu mengenakannya.' },
        { n: 244, kind: 'me', text: 'berjongkok di samping tubuh korban, memeriksa denyut nadi dan pupil mata.' },
        {
          n: 245,
          kind: 'me',
          text: 'tidak menemukan adanya tanda-tanda kehidupan, tubuh korban sudah tidak bernyawa.',
        },
        { n: 246, kind: 'me', text: 'menghela napas pelan, lalu mencatat waktu kematian di clipboard.' },
        {
          n: 247,
          kind: 'say',
          label: 'opsi 1',
          text: 'Saya turut berduka. Kami sudah coba semua cara, tapi memang sudah tidak tertolong.',
        },
        {
          kind: 'say',
          label: 'opsi 2',
          text: 'Maaf, kondisinya sudah tidak memungkinkan lagi. Turut berdukacita untuk keluarganya.',
        },
        { n: 248, kind: 'anim', text: '.prop_clipboard' },
        {
          n: 249,
          kind: 'me',
          text: 'membuka pintu belakang unit Coroner, mengeluarkan stretcher dengan body bag di atasnya.',
        },
        { n: 250, kind: 'me', text: 'meletakkan gurney di samping tubuh korban dengan hati-hati.' },
        { n: 251, kind: 'me', text: 'membuka body bag perlahan, memastikan dalam keadaan bersih.' },
        { kind: 'note', text: '(( RP minta tolong orang lain bantu angkat ))' },
        {
          n: 252,
          kind: 'me',
          text: 'mengangkat tubuh korban dengan hati-hati dan meletakkannya di dalam body bag.',
        },
        { n: 253, kind: 'me', text: 'menutup resleting body bag dengan perlahan hingga rapat.' },
        {
          n: 254,
          kind: 'me',
          text: 'mendorong stretcher ke arah unit Coroner, memasukkan stretcher ke dalam unit lalu mengunci posisinya agar tidak bergeser.',
        },
        { n: 255, kind: 'me', text: 'menutup pintu belakang unit Coroner rapat-rapat.' },
      ],
    },
  ],
}
