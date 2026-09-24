// Radio & Status — dari "RADIO PROCEDURE" di LSFD RP.md
// `text` menyimpan kalimatnya saja; awalan (/r, /me, /do) diturunkan dari `kind`.

export default {
  id: 'radio',
  group: 'radio',
  name: 'Radio & Status',
  blurb: 'Pager, on/off duty, panggilan OCD, dan lalu lintas radio di TKP.',
  sections: [
    {
      id: 'pager',
      name: 'Pager',
      steps: [
        { kind: 'say', label: 'Positif', text: '*PAGER* Positive from Fire Alrik.' },
        { kind: 'say', label: 'Negatif', text: '*PAGER* Negative from Fire Alrik.' },
        {
          kind: 'radio',
          prefix: '/ro',
          label: 'Alasan negatif',
          text: 'Maaf saya sebentar lagi mau off game karena mau pergi jadi tidak bisa on duty.',
        },
      ],
    },
    {
      id: 'default-radio',
      name: 'Default Radio',
      steps: [
        { n: 21, kind: 'radio', label: 'On Duty', text: 'Fire Alrik reporting Status-2 on 10-20 DFS.' },
        { n: 22, kind: 'radio', label: 'Off Duty', text: 'Fire Alrik take Status-1 on 10-20 DFS.' },
        {
          n: 23,
          kind: 'radio',
          label: 'Break patrol',
          text: '~ clearing from Status-4, now taking Status-3 on 10-20 Legion.',
        },
        {
          n: 24,
          kind: 'radio',
          label: 'Mulai patroli dari DFS',
          text: 'Fire Alrik under ~ reporting Status-4 clearing from 10-20 DFS.',
        },
        { n: 25, kind: 'radio', label: 'RTB', text: '~ clearing from Status-4, now RTB to 10-20 DFS.' },
        {
          n: 26,
          kind: 'radio',
          label: 'Parkir & bubar',
          text: '~ has been parked and disbanded, Fire Alrik on Status-10 10-20 DFS.',
        },
      ],
    },
    {
      id: 'ocd-calling',
      name: 'Dipanggil OCD',
      steps: [
        { kind: 'note', text: 'OCD memanggil: "MAIN to Field unit, 10-21 please."' },
        { kind: 'radio', label: 'Sedang patroli', text: '~ is on Status-4 10-20 Legion.' },
        { kind: 'radio', label: 'Sedang break', text: '~ is on Status-3 10-20 Legion.' },
        {
          kind: 'radio',
          label: 'Ambil panggilan',
          text: '~ taking Status-5e heading to 10-20 Legion with CODE-3, ETA 4 Minutes.',
        },
      ],
    },
    {
      id: 'scene-proc',
      name: 'Di TKP',
      steps: [
        { id: 'on-location', kind: 'radio', label: 'Sampai lokasi', text: '~ Status-6 on 10-20 Legion.' },
        {
          id: 'loaded-victim-fracture',
          n: 31,
          kind: 'radio',
          label: 'Muat korban — fracture',
          text: '~ Status-7e, bring one victim down with Fracture, please prepare ER. Now heading to 10-20 PBH with ETA 4 Minutes.',
        },
        {
          id: 'loaded-victim-gsw',
          n: 32,
          kind: 'radio',
          label: 'Muat korban — GSW',
          text: '~ Status-7e, bring one victim down with GSW, please prepare ER. Now heading to 10-20 PBH with ETA 4 Minutes.',
        },
        {
          id: 'loaded-suspect-gsw',
          n: 33,
          kind: 'radio',
          label: 'Muat suspect — GSW',
          text: '~ Status-7e, bring one suspect down with GSW, please prepare ER. Now heading to 10-20 PBH with ETA 4 Minutes.',
        },
        {
          id: 'loaded-suspect-fracture',
          n: 34,
          kind: 'radio',
          label: 'Muat suspect — fracture',
          text: '~ Status-7e, bring one suspect down with Fracture, please prepare ER. Now heading to 10-20 PBH with ETA 4 Minutes.',
        },
        { id: 'on-hospital', n: 35, kind: 'radio', label: 'Sampai rumah sakit', text: '~ Status-8 10-20 PBH.' },
        {
          id: 'rtb-from-scene',
          n: 36,
          kind: 'radio',
          label: 'RTB dari TKP',
          text: '~ reporting 10-99 from Last Scene, now RTB to 10-20 DFS.',
        },
      ],
    },
    {
      id: 'megaphone',
      name: 'Megaphone',
      steps: [
        {
          n: 8,
          kind: 'command',
          label: 'Minta jalan',
          text: '/megaphone LSFD EMERGENCY! Please clear the road!',
        },
      ],
    },
    {
      id: 'jarang',
      name: 'Jarang dipakai',
      steps: [
        { kind: 'radio', label: 'Radio ke departemen lain (1)', text: 'Fire @ to LSPD/LSSD.' },
        {
          kind: 'radio',
          label: 'Radio ke departemen lain (2)',
          text: 'Please send your unit to Hospital, we have patient bring an ilegal items.',
        },
        {
          kind: 'radio',
          label: 'Minta dukungan Engine',
          text: '~ to OCD. Requesting 10-70e ENGINE Support at 10-20 Legion.',
        },
      ],
    },
  ],
}
