// OCD Takeover — dari "OCD TAKEOVER" di LSFD RP.md

export default {
  id: 'ocd',
  group: 'radio',
  name: 'OCD Takeover',
  blurb: 'Radio saat kamu yang memegang dispatch.',
  sections: [
    {
      id: 'ocd-radio',
      name: 'Radio OCD',
      steps: [
        { kind: 'radio', label: 'Ambil OCD', text: 'Fire Alrik takover OCD right now.' },
        { kind: 'radio', label: 'Lepas OCD', text: 'Fire Alrik releasing OCD now.' },
        { kind: 'radio', label: 'Tanya lokasi', text: 'OCD to All/Field unit. Please 10-21.' },
        {
          kind: 'radio',
          label: 'Dispatch unit',
          text: 'OCD to [nama_unit]. Please 10-97 to RID 9 with CODE-3, how copy?',
        },
        {
          kind: 'radio',
          label: 'Self dispatch',
          text: 'OCD under [nama_unit] Self Dispatch and taking Status-5e heading to RID 4 with CODE-3, ETA 4 Minutes.',
        },
        { kind: 'deptradio', label: 'Ke departemen lain (1)', text: 'Fire @ to LSPD/LSSD.' },
        {
          kind: 'deptradio',
          label: 'Ke departemen lain (2)',
          text: 'Please send your unit to Hospital, we have patient bring an ilegal items.',
        },
        {
          kind: 'deptradio',
          label: 'Tanya kebutuhan (1)',
          text: 'What units are needed and how many casualties are there?',
        },
        { kind: 'deptradio', label: 'Tanya kebutuhan (2)', text: 'Alright, please drop beacon there.' },
        {
          kind: 'deptradio',
          label: 'Tanya kebutuhan (3)',
          text: 'All units have been dispatched and will arrive there in 2 minutes.',
        },
      ],
    },
  ],
}
