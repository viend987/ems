// Vertical Rescue — chat RP dari [GUIDE] VERTICAL RESCUE dan panduan helikopter di draft.md.
//
// Prosedur ini mencakup:
// - Persiapan APD khusus (Safety Helmet, Gloves, Full-body Harness, SAR Kit, LSB).
// - Radio penerbangan helikopter LifeFlight dari DFS dan PBH (VFR, Squawk 1200 baku / Squawk 2222 per dispatch).
// - Koordinasi IC udara (Pilot/Co-Pilot) dengan Rescuer menggunakan Hoist Steel Rod.
// - Ground Vertical Rescue: evakuasi tebing dengan dual-line rigging, aturan 2 vs 3 anchor points, dan penurunan katrol.

export default {
  id: 'vertical',
  group: 'khusus',
  name: 'Vertical Rescue',
  nameEn: 'Vertical Rescue',
  blurb: 'Radio penerbangan, koordinasi IC dengan Rescuer, dan penurunan korban dari tebing.',
  blurbEn:
    'Aviation radio, IC coordinating with the Rescuer, and lowering the victim off a cliff.',
  sections: [
    {
      id: 'apd',
      name: 'Persiapan APD Rescuer',
      nameEn: 'Rescuer PPE Preparation',
      steps: [
        {
          kind: 'note',
          text: 'Sebelum operasi udara atau penanganan tebing, Rescuer wajib mengenakan APD keselamatan lengkap dan menyiapkan perlengkapan SAR. Anim: .handsup · .adjust',
          en: 'Before aerial or cliff operations, Rescuers must don full safety PPE and prepare their SAR kit. Anims: .handsup · .adjust',
        },
        {
          kind: 'me',
          text: 'mengenakan Safety Helmet (Petzl Vertex) lalu mengencangkan chinstrap di bawah dagu.',
          en: 'puts on the Petzl Vertex Safety Helmet and secures the chinstrap beneath their chin.',
        },
        {
          kind: 'me',
          text: 'memakai Safety Gloves berbahan kulit tebal pada kedua tangan.',
          en: 'pulls on heavy-duty leather Safety Gloves on both hands.',
        },
        {
          kind: 'me',
          text: 'mengenakan full-body Safety Harness lalu mengunci buckle di pinggang dan kedua paha hingga presisi.',
          en: 'steps into the full-body Safety Harness and fastens the waist and leg buckles securely.',
        },
        {
          kind: 'me',
          text: 'mengecek tas perlengkapan SAR (static rope, carabiner, descender, figure of eight) dan Life Support Bag (LSB).',
          en: 'checks the SAR equipment pack (static rope, carabiners, descender, figure of eight) and the Life Support Bag (LSB).',
        },
        {
          kind: 'do',
          text: 'Seluruh APD keselamatan dan perlengkapan SAR siap digunakan.',
          en: 'All safety PPE and SAR equipment are inspected and ready for deployment.',
        },
      ],
    },
    {
      id: 'radio-latihan',
      name: 'Radio — latihan dari DFS',
      nameEn: 'Radio — training flight from DFS',
      steps: [
        {
          kind: 'radio',
          label: 'Minta izin',
          labelEn: 'Request clearance',
          text: 'Fire Alrik to OCD. Requesting permission for duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lapor bertugas',
          labelEn: 'Report on duty',
          text: 'Fire Alrik now duty as Pilot of ~ and unavailable for Vertical Rescue Training.',
        },
        {
          kind: 'radio',
          label: 'Lapor lepas landas',
          labelEn: 'Report takeoff',
          text: 'Fire Alrik under ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, over.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor ke ATC',
          labelEn: 'Report to ATC',
          text: 'ATC, ~ airborne from DFS helipad, alt 400, for Vertical Rescue Training, VFR, heading North on departure, squawk 1200.',
        },
        {
          kind: 'radio',
          label: 'Lapor mendarat',
          labelEn: 'Report landing',
          text: '~ has fully landed on DFS helipad, full-stop.',
        },
      ],
    },
    {
      id: 'radio-lifeflight',
      name: 'Radio — panggilan helikopter',
      nameEn: 'Radio — helicopter callout',
      steps: [
        {
          kind: 'note',
          text: 'OCD menanyakan 10-21 Pilot Certified lebih dulu, dan panggilan ini wajib dibalas. Standar transponder: squawk 1200 (VFR), atau squawk 2222 bila diarahkan oleh dispatch departemen.',
          en: 'OCD calls for a 10-21 Pilot Certified first, and this call must be answered. Transponder standard: squawk 1200 (VFR), or squawk 2222 when assigned by department dispatch.',
        },
        {
          kind: 'radio',
          label: 'Jawab 10-21',
          labelEn: 'Answer the 10-21',
          text: 'Fire Alrik on duty as Pilot of ~.',
        },
        {
          kind: 'radio',
          label: 'Lepas landas',
          labelEn: 'Takeoff',
          text: '~ airborne from PBH helipad, alt 400, department call, VFR, heading North on departure, over.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor ke ATC',
          labelEn: 'Report to ATC',
          text: 'ATC, ~ airborne from PBH helipad, alt 400, VFR, heading North on departure, squawk 1200.',
        },
        {
          kind: 'radio',
          label: 'Mendarat darurat di lokasi',
          labelEn: 'Emergency landing on scene',
          text: '~ emergency landing on Angel Pine area.',
        },
        {
          kind: 'radio',
          label: 'Sampai lokasi',
          labelEn: 'On scene',
          text: '~ Status-6 10-20 Angel Pine.',
        },
        {
          kind: 'radio',
          label: 'Selesai menangani',
          labelEn: 'Treatment complete',
          text: '~ 10-99 from Angel Pine scene, victim has been taken by Rescue, airborne from scene, alt 400, VFR, departing North for RTB.',
        },
        {
          kind: 'radio',
          label: 'Sudah mendarat',
          labelEn: 'Landed',
          text: '~ has fully landed on PBH helipad, full-stop.',
        },
        {
          kind: 'deptradio',
          label: 'Lapor mendarat ke ATC',
          labelEn: 'Report the landing to ATC',
          text: 'ATC, ~ has fully landed on PBH helipad, full-stop.',
        },
      ],
    },
    {
      id: 'ic-rescuer',
      name: 'Koordinasi IC dengan Rescuer (Aerial Hoist)',
      nameEn: 'IC coordinating with the Rescuer (Aerial Hoist)',
      steps: [
        {
          kind: 'note',
          text: 'Yang memegang IC adalah Pilot atau Co-Pilot (biasanya Co-Pilot). Gunakan Hoist Steel Rod untuk menurunkan Rescuer ke medan yang tidak bisa didarati helikopter.',
          en: 'IC is held by the Pilot or Co-Pilot (usually Co-Pilot). Deploy the Hoist Steel Rod to lower the Rescuer into terrain where the helicopter cannot land.',
        },
        {
          kind: 'radio',
          label: 'IC',
          labelEn: 'IC',
          text: '~ take over IC. IC to Rescuer, bersiap untuk melakukan Vertical Rescue.',
          en: '~ take over IC. IC to Rescuer, stand by for a Vertical Rescue.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          labelEn: 'Rescuer',
          text: 'Rescuer to IC, persiapan telah selesai, silahkan melanjutkan observasi.',
          en: 'Rescuer to IC, preparations complete, go ahead with your observation.',
        },
        {
          kind: 'radio',
          label: 'IC',
          labelEn: 'IC',
          text: 'IC to Rescuer, lokasi sudah ditentukan, silahkan memasangkan device ke Steel Rod.',
          en: 'IC to Rescuer, the location is set, go ahead and attach the device to the Steel Rod.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          labelEn: 'Rescuer',
          text: 'Rescuer to IC, harness telah terpasang.',
          en: 'Rescuer to IC, harness is secured.',
        },
        {
          kind: 'me',
          text: 'memasangkan Ferno basket stretcher ke carabiner lalu mengaitkannya ke steel rod.',
          en: 'clips the Ferno basket stretcher to a carabiner and hooks it onto the steel rod.',
        },
        {
          kind: 'me',
          text: 'memasangkan safety harness ke steel rod sambil memangku Ferno basket stretcher.',
          en: 'clips their safety harness to the steel rod while holding the Ferno basket stretcher on their lap.',
        },
        {
          kind: 'me',
          text: 'menekan tombol rod activation, membuka kunci pengaman, lalu menekan tombol turun untuk menurunkan steel rod.',
          en: 'presses the rod activation button, releases the safety lock, then presses the descend button to lower the steel rod.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          labelEn: 'Rescuer',
          text: 'Rescuer to IC, saya sudah berada di ground.',
          en: 'Rescuer to IC, I am on the ground.',
        },
        {
          kind: 'radio',
          label: 'IC',
          labelEn: 'IC',
          text: 'IC to Rescuer, di copy. Silahkan menuju ke lokasi korban dan lakukan penanganan. Saya akan mendarat di tempat yang memungkinkan.',
          en: 'IC to Rescuer, copy that. Proceed to the victim and begin treatment. I will land wherever I can.',
        },
        {
          kind: 'me',
          text: 'menaikkan korban ke atas Ferno basket stretcher dan mengencangkan sabuk Velcro di setiap bagian.',
          en: 'lifts the victim onto the Ferno basket stretcher and tightens the Velcro straps at every point.',
        },
      ],
    },
    {
      id: 'ground',
      name: 'Ground Vertical Rescue (Evakuasi Tebing)',
      nameEn: 'Ground Vertical Rescue (Cliff Evacuation)',
      steps: [
        {
          kind: 'note',
          text: 'Standar Anchor: Buat 2 Anchor Point untuk 1 Rescuer, atau 3 Anchor Point jika terdapat 2 Rescuer. Gunakan sistem dual-line: Working Line (Rescuer) dan Stretcher Line (Ferno Stretcher).',
          en: 'Anchor Standard: Rig 2 Anchor Points for 1 Rescuer, or 3 Anchor Points for 2 Rescuers. Utilize a dual-line system: Working Line (Rescuer) and Stretcher Line (Ferno Stretcher).',
        },
        {
          kind: 'me',
          text: 'mencari pohon kokoh atau batuan tebing lalu membuat simpul anchor point pengaman.',
          en: 'identifies a sturdy tree or rock outcrop and rigs the primary safety anchor points.',
        },
        {
          kind: 'me',
          text: 'memasang static rope utama ke anchor lalu mengaitkan descender ke harness dengan carabiner.',
          en: 'rigs the primary static rope to the anchor and clips the descender to the harness with a carabiner.',
        },
        {
          kind: 'me',
          text: 'memasang static rope kedua ke anchor kedua lalu mengaitkan figure of eight ke Ferno basket stretcher dengan carabiner.',
          en: 'rigs a second static rope to the secondary anchor and clips a figure of eight to the Ferno basket stretcher with a carabiner.',
        },
        {
          kind: 'me',
          text: 'menurunkan Ferno basket stretcher terlebih dahulu menuju titik korban dengan teknik katrol.',
          en: 'lowers the Ferno basket stretcher down towards the victim first using a pulley technique.',
        },
        {
          kind: 'me',
          text: 'turun menuruni tebing dengan berhati-hati sembari membuka perlahan katup descender agar pengait tidak terlalu menggigit tali.',
          en: 'descends the cliff face carefully, easing the descender valve open so the brake feeds rope smoothly.',
        },
        {
          kind: 'radio',
          label: 'Rescuer',
          labelEn: 'Rescuer',
          text: 'Rescuer to IC, korban sudah berada di bawah dengan aman. Requesting pickup at my location.',
          en: 'Rescuer to IC, the victim is safely down. Requesting pickup at my location.',
        },
      ],
    },
  ],
}
