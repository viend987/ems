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
      nameEn: 'RPLY — the short version',
      steps: [
        {
          kind: 'note',
          text: 'RPLY singkatan dari Roleplay Lie: seluruh kedatangan dan kerja tim Coroner hanya dinarasikan lewat /do, tidak ada unit yang benar-benar datang.',
          en: 'RPLY stands for Roleplay Lie: the Coroner team\'s whole arrival and work is narrated through /do only, with no unit actually turning up.',
        },
        {
          id: 'minta-coroner',
          n: 238,
          kind: 'radio',
          label: 'Minta unit MED',
          labelEn: 'Request a MED unit',
          text: '~ to OCD. Requesting 10-70 MED Unit at 10-20 Legion.',
        },
        { n: 239, kind: 'do', text: 'Unit Coroner telah tiba di lokasi korban berada.', en: 'The Coroner unit has arrived where the body is.' },
        {
          n: 240,
          kind: 'do',
          text: 'Tim Coroner membuka pintu belakang unit Coroner dan mengeluarkan stretcher dengan body bag di atasnya.',
          en: 'The Coroner team opens the rear doors of the unit and pulls out a stretcher with a body bag on it.',
        },
        {
          n: 241,
          kind: 'do',
          text: 'Tim Coroner bersama-sama mengangkat tubuh korban dengan hati-hati dan meletakkannya di dalam body bag lalu menutup resletingnya rapat-rapat.',
          en: 'The Coroner team lift the body carefully together, lay it in the body bag, and zip it closed.',
        },
        {
          n: 242,
          kind: 'do',
          text: 'Tim Coroner mengangkut korban ke dalam unit Coroner dan pergi meninggalkan lokasi kejadian.',
          en: 'The Coroner team load the body into the unit and leave the scene.',
        },
      ],
    },
    {
      id: 'ck-scene',
      name: 'Possible CK Scene — versi penuh',
      nameEn: 'Possible CK scene — the full version',
      steps: [
        { ref: 'on-location' },
        { n: 243, kind: 'me', text: 'mengambil N-Gloves dan masker dari ILS Bag lalu mengenakannya.', en: 'takes N-Gloves and a mask from the ILS Bag and puts them on.' },
        { n: 244, kind: 'me', text: 'berjongkok di samping tubuh korban, memeriksa denyut nadi dan pupil mata.', en: 'crouches beside the body, checking for a pulse and examining the pupils.' },
        {
          n: 245,
          kind: 'me',
          text: 'tidak menemukan adanya tanda-tanda kehidupan, tubuh korban sudah tidak bernyawa.',
          en: 'finds no signs of life; the victim is dead.',
        },
        { n: 246, kind: 'me', text: 'menghela napas pelan, lalu mencatat waktu kematian di clipboard.', en: 'lets out a slow breath, then records the time of death on the clipboard.' },
        {
          n: 247,
          kind: 'say',
          label: 'opsi 1',
          labelEn: 'option 1',
          text: 'Saya turut berduka. Kami sudah coba semua cara, tapi memang sudah tidak tertolong.',
          en: 'I am sorry. We tried everything we could, but it was beyond saving.',
        },
        {
          kind: 'say',
          label: 'opsi 2',
          labelEn: 'option 2',
          text: 'Maaf, kondisinya sudah tidak memungkinkan lagi. Turut berdukacita untuk keluarganya.',
          en: 'I am sorry, there was nothing more that could be done. Our condolences to the family.',
        },
        { n: 248, kind: 'anim', text: '.prop_clipboard' },
        {
          n: 249,
          kind: 'me',
          text: 'membuka pintu belakang unit Coroner, mengeluarkan stretcher dengan body bag di atasnya.',
          en: 'opens the rear doors of the Coroner unit and pulls out a stretcher with a body bag on it.',
        },
        { n: 250, kind: 'me', text: 'meletakkan gurney di samping tubuh korban dengan hati-hati.', en: 'sets the gurney down carefully beside the body.' },
        { n: 251, kind: 'me', text: 'membuka body bag perlahan, memastikan dalam keadaan bersih.', en: 'opens the body bag slowly, checking it is clean.' },
        { kind: 'note', text: '(( RP minta tolong orang lain bantu angkat ))', en: '(( RP asking someone else to help lift ))' },
        {
          n: 252,
          kind: 'me',
          text: 'mengangkat tubuh korban dengan hati-hati dan meletakkannya di dalam body bag.',
          en: 'lifts the body carefully and lays it inside the body bag.',
        },
        { n: 253, kind: 'me', text: 'menutup resleting body bag dengan perlahan hingga rapat.', en: 'draws the body bag zip closed slowly until it is fully shut.' },
        {
          n: 254,
          kind: 'me',
          text: 'mendorong stretcher ke arah unit Coroner, memasukkan stretcher ke dalam unit lalu mengunci posisinya agar tidak bergeser.',
          en: 'wheels the stretcher to the Coroner unit, slides it in, and locks it so it cannot shift.',
        },
        { n: 255, kind: 'me', text: 'menutup pintu belakang unit Coroner rapat-rapat.', en: 'closes the rear doors of the Coroner unit firmly.' },
      ],
    },
  ],
}
