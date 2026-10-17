/**
 * Data Terminologi Anatomi Tubuh & Klasifikasi Cedera Medis LSFD.
 * Digunakan sebagai rujukan teori roleplay medis, penulisan Doctor Report,
 * komunikasi radio emergency, dan sinkronisasi dengan status vital luka.
 */

export const BODY_REGIONS = [
  // Upper Extremity
  {
    id: 'upper-extremity',
    group: 'extremity-upper',
    name: 'Upper Extremity (Anggota Gerak Atas)',
    nameEn: 'Upper Extremity (Arms & Hands)',
    latin: 'Extremitas Superior',
    subparts: [
      {
        id: 'clavicle',
        name: 'Clavicle & Shoulder',
        nameEn: 'Clavicle & Shoulder',
        desc: 'Tulang selangka dan pundak. Rentan fraktur akibat benturan sabuk pengaman/benturan kendaraan.',
        descEn: 'Collarbone and shoulder. Susceptible to fracture from seatbelt impact or vehicular trauma.',
        treatment: 'Imobilisasi lengan dengan sling / Triangular Bandage. Hindari pergerakan bahu.',
        treatmentEn: 'Immobilize arm using sling / Triangular Bandage. Prevent shoulder movement.',
        vital: false,
      },
      {
        id: 'brachium',
        name: 'Brachium / Upper Arm',
        nameEn: 'Upper Arm (Humerus)',
        desc: 'Lengan atas (tulang humerus). Melewati pembuluh darah Brachial Artery.',
        descEn: 'Upper arm containing the humerus bone and brachial artery.',
        treatment: 'Triangular Bandage untuk fraktur tertutup; Tourniquet 5cm di atas luka jika pendarahan masif.',
        treatmentEn: 'Triangular Bandage for closed fracture; Tourniquet 5cm above wound for massive bleeding.',
        vital: false,
      },
      {
        id: 'antecubital',
        name: 'Antecubital / Elbow',
        nameEn: 'Elbow & Antecubital Fossa',
        desc: 'Sendi siku dan lipatan dalam siku. Titik perabaan nadi arteri brakialis.',
        descEn: 'Elbow joint and inner crease. Palpation point for brachial artery pulse.',
        treatment: 'Imobilisasi posisi diagonal. Hindari penekukan sendi jika dicurigai dislokasi/patah.',
        treatmentEn: 'Immobilize in diagonal posture. Avoid bending joint if dislocation/fracture suspected.',
        vital: false,
      },
      {
        id: 'antebrachium',
        name: 'Antebrachium / Forearm',
        nameEn: 'Forearm (Radius & Ulna)',
        desc: 'Lengan bawah yang ditopang tulang radius dan ulna.',
        descEn: 'Forearm supported by radius and ulna bones.',
        treatment: 'Pemasangan Vacuum Splint. Tourniquet di atas siku jika pendarahan arteri tidak berhenti.',
        treatmentEn: 'Apply Vacuum Splint. Tourniquet above elbow if arterial bleeding persists.',
        vital: false,
      },
      {
        id: 'wrist',
        name: 'Wrist / Carpus',
        nameEn: 'Wrist (Carpals)',
        desc: 'Pergelangan tangan. Titik utama perabaan Radial Artery untuk memeriksa denyut nadi dan syok.',
        descEn: 'Wrist joint. Primary palpation site for Radial Artery pulse and shock assessment.',
        treatment: 'Balut tekan kasa steril. Jangan pasang tourniquet langsung di sendi pergelangan.',
        treatmentEn: 'Direct pressure with sterile gauze. Do not place tourniquet directly on wrist joint.',
        vital: false,
      },
      {
        id: 'hand-digits',
        name: 'Hand & Phalanges',
        nameEn: 'Hand & Digits',
        desc: 'Telapak tangan dan jari-jari. Kaya serabut saraf dan pembuluh darah perifer.',
        descEn: 'Palm and fingers. Rich in peripheral nerves and capillary vessels.',
        treatment: 'Balut kasa steril, elevasi melewati tinggi jantung untuk mengurangi pendarahan.',
        treatmentEn: 'Sterile gauze wrap, elevate above heart level to reduce hemorrhage.',
        vital: false,
      },
    ],
  },

  // Lower Extremity
  {
    id: 'lower-extremity',
    group: 'extremity-lower',
    name: 'Lower Extremity (Anggota Gerak Bawah)',
    nameEn: 'Lower Extremity (Legs & Feet)',
    latin: 'Extremitas Inferior',
    subparts: [
      {
        id: 'thigh-femur',
        name: 'Thigh / Femoral Region',
        nameEn: 'Thigh (Femur)',
        desc: 'Paha dan tulang femur. Patah tulang femur terbuka berisiko tinggi memotong Femoral Artery.',
        descEn: 'Thigh and femur. Open femur fracture poses critical risk of lacerating the femoral artery.',
        treatment: 'Traction Splint untuk patah paha terbuka. Pasang Tourniquet di pangkal paha jika pendarahan masif.',
        treatmentEn: 'Traction Splint for open femur fracture. Apply Tourniquet at upper thigh if bleeding massive.',
        vital: false,
      },
      {
        id: 'knee-patella',
        name: 'Knee / Patella',
        nameEn: 'Knee & Patella',
        desc: 'Sendi lutut dan tempurung lutut. Area lewatnya Popliteal Artery di bagian belakang.',
        descEn: 'Knee joint and kneecap. Popliteal artery passes behind the joint.',
        treatment: 'Imobilisasi bantalan lembut, hindari meluruskan paksa jika terkunci/dislokasi.',
        treatmentEn: 'Cushioned immobilization, avoid forced straightening if locked or dislocated.',
        vital: false,
      },
      {
        id: 'crus-shin',
        name: 'Crus / Shin & Calf',
        nameEn: 'Lower Leg (Tibia & Fibula)',
        desc: 'Tungkai bawah (tulang kering tibia & betis fibula). Rentan patah terbuka akibat kecelakaan motor/tabrakan.',
        descEn: 'Lower leg (tibia shin & fibula calf). High risk of compound fracture from vehicular crashes.',
        treatment: 'Vacuum Splint untuk patah tertutup/terbuka setelah prosedur DEAT menghentikan darah.',
        treatmentEn: 'Vacuum Splint for closed/open fracture following DEAT bleeding control.',
        vital: false,
      },
      {
        id: 'ankle-tarsus',
        name: 'Ankle / Tarsus',
        nameEn: 'Ankle (Tarsals)',
        desc: 'Pergelangan kaki. Sendi penopang berat tubuh utama, sering terkilir atau fraktur maleolus.',
        descEn: 'Ankle joint bearing body weight, common site for sprains or malleolar fractures.',
        treatment: 'Fiksasi dengan perban elastis / Vacuum Splint pendek, lepas sepatu jika tidak tertusuk.',
        treatmentEn: 'Fixate with elastic wrap / short Vacuum Splint, loosen footwear if not impaled.',
        vital: false,
      },
      {
        id: 'foot-toes',
        name: 'Foot & Phalanges',
        nameEn: 'Foot & Toes',
        desc: 'Telapak kaki dan jari kaki. Titik raba Dorsalis Pedis Artery untuk sirkulasi perifer ekstremitas bawah.',
        descEn: 'Sole and toes. Palpation site for dorsalis pedis artery pulse checking lower extremity perfusion.',
        treatment: 'Balut steril, elevasi tungkai, periksa ada/tidaknya pulsasi dorsalis pedis.',
        treatmentEn: 'Sterile dressing, limb elevation, verify presence of dorsalis pedis pulse.',
        vital: false,
      },
    ],
  },

  // Torso / Trunk
  {
    id: 'torso-trunk',
    group: 'torso',
    name: 'Torso / Trunk (Batang Tubuh)',
    nameEn: 'Torso / Trunk',
    latin: 'Truncus',
    subparts: [
      {
        id: 'thorax',
        name: 'Thorax / Chest (Dada)',
        nameEn: 'Thorax / Chest',
        desc: 'Rongga dada berisi organ vital: Jantung (Heart) & Paru-paru (Lungs). Tulang rusuk (Ribs) & Sternum.',
        descEn: 'Chest cavity housing vital organs: Heart & Lungs. Protected by Ribs & Sternum.',
        treatment: 'ECG 12-lead (jika tak ada luka terbuka dada), CPR 30:2 di atas sternum jika henti jantung, AED pads.',
        treatmentEn: '12-lead ECG (if no open chest wound), 30:2 CPR on sternum for cardiac arrest, AED pads.',
        vital: true,
      },
      {
        id: 'abdomen',
        name: 'Abdomen (Rongga Perut)',
        nameEn: 'Abdomen (Abdominal Cavity)',
        desc: 'Kuadran atas (Hati/Liver di kanan, Limpa/Spleen di kiri, Lambung). Kuadran bawah (Usus halus & usus besar).',
        descEn: 'Upper quadrants (Liver on right, Spleen on left, Stomach). Lower quadrants (Intestines).',
        treatment: 'Direct pressure dengan trauma dressing berlapis. JANGAN pasang tourniquet di perut. Pasang IV LR jika syok.',
        treatmentEn: 'Layered direct pressure with trauma dressings. DO NOT use tourniquet on abdomen. IV LR for shock.',
        vital: true,
      },
      {
        id: 'pelvis-groin',
        name: 'Pelvis & Groin (Panggul & Lipat Paha)',
        nameEn: 'Pelvis & Inguinal / Groin',
        desc: 'Area panggul dan lipat paha. Jalur arteri besar Femoralis. Tourniquet biasa TIDAK BISA dipasang di sini.',
        descEn: 'Pelvic ring and inguinal junction. Houses large femoral artery. Standard tourniquets CANNOT be placed here.',
        treatment: 'WAJIB menggunakan Combat Ready Clamp (CRoC) untuk menjepit pembuluh darah pangkal paha.',
        treatmentEn: 'MANDATORY use of Combat Ready Clamp (CRoC) to compress junctional femoral vessels.',
        vital: true,
      },
      {
        id: 'spine-back',
        name: 'Spine & Posterior (Punggung & Tulang Belakang)',
        nameEn: 'Spine & Posterior Trunk',
        desc: 'Kolom tulang belakang (Vertebrae: Cervical, Thoracic, Lumbar) yang membungkus sumsum tulang belakang.',
        descEn: 'Spinal column (Vertebrae: Cervical, Thoracic, Lumbar) shielding the spinal cord.',
        treatment: 'Imobilisasi penuh papan spinal / vacuum mattress. DILARANG memiringkan kepala dengan Head-Tilt.',
        treatmentEn: 'Full immobilization on spinal backboard / vacuum mattress. FORBIDDEN to perform Head-Tilt.',
        vital: true,
      },
    ],
  },

  // Cranial & Cervical
  {
    id: 'cranial-cervical',
    group: 'head-neck',
    name: 'Cranial & Cervical (Kepala & Leher)',
    nameEn: 'Head & Neck (Cranial & Cervical)',
    latin: 'Caput et Collum',
    subparts: [
      {
        id: 'cranium',
        name: 'Cranium & Skull (Batok Kepala)',
        nameEn: 'Cranium & Skull',
        desc: 'Tengkorak kepala pelindung jaringan otak. 1 luka tembak di kepala memenuhi batas otomatis PK.',
        descEn: 'Cranial skull encasing brain tissue. 1 gunshot wound to head fulfills auto-PK standard.',
        treatment: 'Balut longgar steril untuk trauma terbuka, periksa refleks pupil dengan penlight, hindari penekanan otak.',
        treatmentEn: 'Loose sterile dressing for open cranial trauma, penlight pupil check, avoid intracranial compression.',
        vital: true,
      },
      {
        id: 'cervical-neck',
        name: 'Cervical Spine & Neck (Leher)',
        nameEn: 'Cervical Spine & Neck',
        desc: 'Ruas leher penopang kepala dan jalur arteri utama Carotid Artery serta trakea pernapasan.',
        descEn: 'Neck vertebrae supporting head, carotid artery pathway, and respiratory trachea.',
        treatment: 'Pasang C-Collar segera. Cek Carotid Artery untuk nadi sentral. Gunakan Jaw-Thrust untuk buka napas.',
        treatmentEn: 'Apply C-Collar immediately. Check Carotid Artery for central pulse. Use Jaw-Thrust maneuver.',
        vital: true,
      },
      {
        id: 'facial-mandible',
        name: 'Facial & Mandible (Wajah & Rahang)',
        nameEn: 'Facial & Mandible',
        desc: 'Struktur wajah, tulang rahang bawah (mandibula) dan atas (maksila).',
        descEn: 'Facial skeleton, lower jaw (mandible) and upper jaw (maxilla).',
        treatment: 'Sudut rahang bawah ditarik ke atas saat manuver Jaw-Thrust. Evaluasi patah gigi atau obstruksi mulut.',
        treatmentEn: 'Mandibular angles pulled upward during Jaw-Thrust. Inspect for dislodged teeth or oral obstructions.',
        vital: false,
      },
      {
        id: 'airway-oral',
        name: 'Oral Cavity & Trachea (Jalan Napas)',
        nameEn: 'Airway & Oral Cavity',
        desc: 'Rongga mulut, pita suara, dan saluran trakea menuju paru-paru.',
        descEn: 'Oral cavity, vocal cords, and tracheal tube leading to the lungs.',
        treatment: 'Suction gumpalan darah, ambil benda asing pakai tweezer steril, intubasi Endotracheal Tube jika tersumbat.',
        treatmentEn: 'Suction clotted blood, extract foreign debris with sterile tweezers, intubate ET Tube if obstructed.',
        vital: true,
      },
    ],
  },
]

export const WOUND_TYPES = [
  {
    id: 'gsw',
    label: 'GSW (Gunshot Wound)',
    labelEn: 'Gunshot Wound (GSW)',
    desc: 'Luka akibat proyektil peluru senjata api. Terdapat luka masuk (entry) dan luka keluar (exit).',
    descEn: 'Trauma caused by firearm bullet projectile. Involves entry and possible exit wounds.',
    fieldAction: 'Prosedur DEAT: Direct Pressure → Elevation → Arterial Pressure → Tourniquet / CRoC.',
    fieldActionEn: 'DEAT Procedure: Direct Pressure → Elevation → Arterial Pressure → Tourniquet / CRoC.',
    severity: 'High to Critical',
  },
  {
    id: 'open-fracture',
    label: 'Open Fracture (Patah Tulang Terbuka)',
    labelEn: 'Open (Compound) Fracture',
    desc: 'Tulang patah merobek kulit dan mencuat keluar, disertai pendarahan aktif hebat.',
    descEn: 'Broken bone penetrates skin surface with active external hemorrhage.',
    fieldAction: 'Hentikan pendarahan terlebih dahulu dengan DEAT, jangan dorong tulang masuk, pasang Splint yang sesuai.',
    fieldActionEn: 'Control hemorrhage first with DEAT, never push bone back inward, immobilize with appropriate Splint.',
    severity: 'High',
  },
  {
    id: 'close-fracture',
    label: 'Close Fracture (Patah Tulang Tertutup)',
    labelEn: 'Closed (Simple) Fracture',
    desc: 'Tulang retak atau patah di dalam tanpa merusak integritas kulit luar.',
    descEn: 'Bone fractured internally without rupturing the skin barrier.',
    fieldAction: 'Langsung pasang bidai: Triangular Bandage (lengan atas), Vacuum Splint (lengan bawah/tungkai).',
    fieldActionEn: 'Direct splinting: Triangular Bandage (upper arm), Vacuum Splint (forearm/lower leg).',
    severity: 'Moderate',
  },
  {
    id: 'laceration',
    label: 'Laceration / Cut Wound (Luka Robek/Sayat)',
    labelEn: 'Laceration / Incised Wound',
    desc: 'Luka robek jaringan kulit dan otot akibat sayatan senjata tajam, pecahan kaca, atau logam tajam.',
    descEn: 'Tearing or slicing of soft tissue from edged weapons, shattered glass, or jagged metal.',
    fieldAction: 'Trauma dressing langsung di atas luka, balut perban elastis, pertimbangkan penjahitan di ER.',
    fieldActionEn: 'Trauma dressing directly on wound, secure with elastic bandage, prepare for ER suturing.',
    severity: 'Moderate to High',
  },
  {
    id: 'puncture',
    label: 'Puncture Wound (Luka Tusuk)',
    labelEn: 'Puncture Wound (Impaled Object)',
    desc: 'Luka tembus dalam dengan lubang kecil di permukaan (pisau, obeng, paku, serpihan besi).',
    descEn: 'Deep penetrating trauma with narrow exterior opening (knife, screwdriver, nails, shrapnel).',
    fieldAction: 'JANGAN PERNAH MENCABUT BENDA TERTANCAP! Stabilkan benda dengan balutan melingkar di sekelilingnya.',
    fieldActionEn: 'NEVER WITHDRAW IMPALED OBJECTS! Stabilize the object with circumferential dressings.',
    severity: 'High',
  },
  {
    id: 'blunt-trauma',
    label: 'Blunt Force Trauma / Bruise (Memar / Hantaman)',
    labelEn: 'Blunt Force Trauma & Contusions',
    desc: 'Cedera jaringan akibat hantaman benda tumpul tanpa robekan kulit luar.',
    descEn: 'Subcutaneous tissue damage from blunt impact without breach of skin continuity.',
    fieldAction: 'Teknik ICP (Instant Cold Pack) dibalut kain tipis selama 15 menit, fiksasi dengan elastic bandage.',
    fieldActionEn: 'Apply ICP (Instant Cold Pack) wrapped in thin cloth for 15 minutes, wrap with elastic bandage.',
    severity: 'Low to Moderate',
  },
  {
    id: 'graze',
    label: 'Graze / Abrasion (Luka Lecet)',
    labelEn: 'Graze / Superficial Abrasion',
    desc: 'Pengikisan lapisan kulit terluar akibat gesekan aspal atau proyektil yang menyerempet.',
    descEn: 'Frictional scraping of epidermis against pavement or superficial bullet grazing.',
    fieldAction: 'Tuang Saline Solution ke cotton pad, bersihkan luka perlahan, tutup dengan gauze pad steril.',
    fieldActionEn: 'Pour Saline Solution onto cotton pad, gently swab wound, dress with sterile gauze pad.',
    severity: 'Low',
  },
  {
    id: 'burns',
    label: 'Burns (Luka Bakar)',
    labelEn: 'Thermal Burns',
    desc: 'Kerusakan jaringan akibat panas api, cairan mendidih, atau zat kimia.',
    descEn: 'Tissue destruction from thermal flames, scalding fluids, or chemical agents.',
    fieldAction: 'Bilas dengan Saline steril dingin, tutup dengan dressing non-lengket steril, pasang IV LR untuk hidrasi.',
    fieldActionEn: 'Irrigate with cool sterile saline, dress with sterile non-adherent pad, start IV LR hydration.',
    severity: 'Moderate to Critical',
  },
]

export const ARTERY_POINTS = [
  {
    id: 'radial',
    name: 'Radial Artery',
    location: 'Pergelangan tangan (sisi jempol)',
    locationEn: 'Lateral anterior wrist (thumb side)',
    useCase: 'Pemeriksaan rutin nadi sirkulasi pasien sadar. Jika nadi radial menghilang, indikasi syok berat (CAT-A).',
    useCaseEn: 'Standard pulse check in conscious patients. Absence of radial pulse signals severe hypovolemic shock (CAT-A).',
  },
  {
    id: 'carotid',
    name: 'Carotid Artery',
    location: 'Sisi samping leher (antara trakea dan otot leher)',
    locationEn: 'Lateral neck furrow between trachea and sternocleidomastoid',
    useCase: 'Pemeriksaan denyut nadi sentral pasien tidak sadar / henti jantung. Patokan sebelum dan selama CPR.',
    useCaseEn: 'Primary central pulse assessment for unconscious patients / cardiac arrest. Benchmark during CPR.',
  },
  {
    id: 'brachial',
    name: 'Brachial Artery',
    location: 'Lengan atas sisi dalam / lipatan siku',
    locationEn: 'Inner medial upper arm / antecubital fossa',
    useCase: 'Titik tekan arterial pressure untuk menghentikan pendarahan hebat di lengan bawah atau telapak tangan.',
    useCaseEn: 'Arterial pressure compression point to stem catastrophic bleeding on forearm or hand.',
  },
  {
    id: 'femoral',
    name: 'Femoral Artery',
    location: 'Lipat paha / area groin',
    locationEn: 'Inguinal crease / groin fold',
    useCase: 'Arteri terbesar anggota gerak bawah. Titik pemasangan Combat Ready Clamp (CRoC) saat tourniquet tidak menjangkau.',
    useCaseEn: 'Main artery of lower extremities. Application target for Combat Ready Clamp (CRoC) for junctional wounds.',
  },
]

export const BONES_REFERENCE = [
  { bone: 'Femur', part: 'Paha', splint: 'Traction Splint (Open) / Vacuum Splint (Close)', danger: 'Pendarahan arteri femoralis masif' },
  { bone: 'Tibia & Fibula', part: 'Tungkai bawah / Kering & Betis', splint: 'Vacuum Splint', danger: 'Fraktur terbuka menusuk kulit' },
  { bone: 'Humerus', part: 'Lengan atas', splint: 'Triangular Bandage (Sling diagonal)', danger: 'Cedera saraf radialis / arteri brakialis' },
  { bone: 'Radius & Ulna', part: 'Lengan bawah', splint: 'Vacuum Splint', danger: 'Deformitas sendi pergelangan' },
  { bone: 'Clavicle', part: 'Tulang selangka', splint: 'Arm Sling / Triangular Bandage', danger: 'Menekan pembuluh subklavia' },
  { bone: 'Cervical Spine (C1-C7)', part: 'Tulang leher', splint: 'C-Collar + Spine Board', danger: 'Kelumpuhan pernapasan / tetraplegia' },
  { bone: 'Sternum & Ribs', part: 'Dada & Rusuk', splint: 'Imobilisasi posisi setengah duduk', danger: 'Tusukan ke paru-paru (Pneumothorax)' },
  { bone: 'Pelvis', part: 'Panggul', splint: 'Pelvic Binder / Vacuum Mattress', danger: 'Pendarahan internal tersembunyi (>2000ml)' },
]

/**
 * Generator Pelaporan Medis Cepat untuk Roleplay di RS (Doctor Report) dan Radio Dispatch.
 */
export function buildDoctorReport({ loc = 'U', woundType = 'GSW', bodyRegion = 'Torso', abcStatus = 'Normal' }) {
  return `LOC ${loc}, ${woundType} on ${bodyRegion}, ABC ${abcStatus}`
}

export function buildRadioReport({ callsign = '~', status = '7e', woundType = 'GSW', bodyRegion = 'Torso', hospital = 'PBH', eta = '3 Minutes' }) {
  return `/r ${callsign} Status-${status}, bring one victim down with ${woundType} on ${bodyRegion}, please prepare ER. Now heading to 10-20 ${hospital} with ETA ${eta}.`
}

export function buildInspectDo({ woundType = 'GSW', bodyRegion = 'Upper Extremity (Left Arm)', bleeding = true }) {
  const bleedText = bleeding ? 'disertai pendarahan aktif yang merembes' : 'tanpa pendarahan aktif luar'
  return `/do Terlihat luka jenis ${woundType} pada area ${bodyRegion}, ${bleedText}.`
}
