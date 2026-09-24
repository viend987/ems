// Vertical Rescue — dari "VERTICAL RESCUE" di LSFD RP.md

export default {
  id: 'vertical',
  group: 'khusus',
  name: 'Vertical Rescue',
  blurb: 'Radio saat bertugas sebagai pilot helikopter.',
  sections: [
    {
      id: 'vertical-radio',
      name: 'Radio penerbangan',
      steps: [
        {
          kind: 'radio',
          label: 'Minta izin',
          text: 'Fire Alrik to OCD. Requesting permission for duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lapor bertugas',
          text: 'Fire Alrik now duty as Pilot of ~ and unavaliable for Vertical Rescue Training.',
        },
        {
          kind: 'radio',
          label: 'Lapor lepas landas',
          text: 'Fire Alrik under ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training VFR heading North on departure, over.',
        },
        {
          kind: 'radio',
          prefix: '/d',
          label: 'Lapor ke ATC',
          text: 'ATC, ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, squawk 2222.',
        },
        {
          kind: 'radio',
          label: 'Lapor mendarat',
          text: '~ has fully landed on DFS helipad, full-stop.',
        },
      ],
    },
  ],
}
