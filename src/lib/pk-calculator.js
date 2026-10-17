/**
 * Logika evaluasi status Player Kill (PK) berdasarkan:
 * 1. Server Rules Jogjagamers V Roleplay (Bab I, Pasal 11, Pasal 21, Pasal 23)
 * 2. LSFD Operational Guide #1239: "Calculation to get Player Kill"
 */

export const WOUND_TYPES = [
  { id: 'gsw', name: 'Gunshot Wound (GSW / Luka Tembak)', nameEn: 'Gunshot Wound (GSW)' },
  { id: 'graze', name: 'Graze (Luka Lecet / Gesekan)', nameEn: 'Graze' },
  { id: 'cut', name: 'Cut Wound (Luka Tusuk / Sayat)', nameEn: 'Cut Wound' },
  { id: 'fracture', name: 'Bone Fracture (Patah Tulang)', nameEn: 'Bone Fracture' },
  { id: 'dislocated', name: 'Dislocated (Keseleo / Terkilir)', nameEn: 'Dislocated' },
  { id: 'burns', name: 'Burns (Luka Bakar)', nameEn: 'Burns' },
  { id: 'bruise', name: 'Bruise (Memar / Hantaman)', nameEn: 'Bruise' },
]

export const GSW_LOCATIONS = [
  { id: 'head', name: 'Head (Kepala / Otak)', nameEn: 'Head (Brain)', minVital: 1 },
  { id: 'torso', name: 'Torso (Dada, Paru, Jantung, Perut, Punggung)', nameEn: 'Torso (Heart, Lungs, Abdomen, Back)', minVital: 3 },
  { id: 'limbs', name: 'Ekstremitas (Lengan, Tangan, Paha, Kaki)', nameEn: 'Limbs (Arms, Hands, Legs, Feet)', minVital: 0 },
]

export const PK_STATUS = {
  AUTO_PK: 'AUTO_PK',
  CHANCE_PK: 'CHANCE_PK',
  NO_PK: 'NO_PK',
}

/**
 * Menghitung kelayakan PK berdasarkan status luka dan survival chance.
 *
 * @param {Object} params
 * @param {string} params.woundType - Jenis luka ('gsw', 'graze', 'cut', 'fracture', 'dislocated', 'burns', 'bruise')
 * @param {string} params.location - Lokasi luka tembak ('head', 'torso', 'limbs')
 * @param {number} params.bullets - Jumlah peluru GSW pada lokasi tersebut
 * @param {number} params.survivalChance - Angka persentase survival chance di /health (0 - 100)
 * @param {boolean} [params.bleedExpired=false] - Apakah sudah lewat 15 menit tanpa penanganan RP sama sekali
 * @param {boolean} [params.medicArrived=false] - Apakah petugas LSFD atau penolong medis sudah tiba di TKP
 * @param {boolean} [params.explosionDrowningOnly=false] - Mati murni ledakan/tenggelam tanpa luka tembak
 * @returns {Object} Evaluasi status, komando /chance, penjelasan, dan pasal rujukan
 */
export function evaluatePk({
  woundType = 'gsw',
  location = 'torso',
  bullets = 1,
  survivalChance = 75,
  bleedExpired = false,
  medicArrived = false,
  explosionDrowningOnly = false,
}) {
  const chance = Math.max(0, Math.min(100, Number(survivalChance) || 0))
  const bulletCount = Math.max(0, Number(bullets) || 0)

  // 1. Kasus Bleeding 15 Menit:
  // Bleeding 15 menit diizinkan PK JIKA tidak ada RP sama sekali.
  // Namun jika LSFD / responder sudah tiba di TKP, timer 15 menit LANGSUNG BATAL.
  if (bleedExpired && !medicArrived) {
    return {
      status: PK_STATUS.CHANCE_PK,
      isVital: false,
      canChance: true,
      autoPk: false,
      chanceCommand: `/chance ${chance}`,
      titleId: 'Dapat PK Karena Bleeding >15 Menit',
      titleEn: 'Eligible for PK Due to >15 Min Bleeding',
      reasonId:
        'Korban tidak mendapatkan penanganan RP sama sekali selama lebih dari 15 menit. Berdasarkan panduan LSFD, diperbolehkan mengajukan PK menggunakan /chance sesuai survival chance.',
      reasonEn:
        'The victim received no medical RP response for over 15 minutes. Permitted to roll /chance based on survival chance.',
      actionId: `Lakukan /chance ${chance} sebanyak 1 kali setelah izin OOC. Jika PASS = selamat, FAIL = PK.`,
      actionEn: `Execute /chance ${chance} once with OOC permission. PASS = survives, FAIL = PK.`,
      ruleRef: 'LSFD Guide Calculation Point C: Bleeding Rules',
    }
  }

  // 2. Jenis luka non-GSW (Graze, Fracture, Dislocated, Cut, Burns, Bruise):
  // TIDAK DAPAT PK dan DILARANG KERAS menggunakan fitur /chance!
  if (woundType !== 'gsw') {
    if (woundType === 'burns' && explosionDrowningOnly) {
      return {
        status: PK_STATUS.NO_PK,
        isVital: false,
        canChance: false,
        autoPk: false,
        chanceCommand: null,
        titleId: 'Ledakan/Tenggelam Murni: Tetap Mengacu /health',
        titleEn: 'Pure Explosion/Drowning: Refer to /health',
        reasonId:
          'Kematian karena ledakan atau tenggelam tanpa luka tembak tidak bisa serta merta dijadikan alasan otomatis untuk PK. Korban wajib mendeskripsikan luka tubuhnya secara realistis dan LSFD tetap mengkondisikan sesuai status /health.',
        reasonEn:
          'Death caused by explosion or drowning without gunshot wounds cannot be used as an automatic justification for PK. Medical triage follows /health.',
        actionId: 'Lanjutkan prosedur penanganan luka bakar (Burns) atau asfiksia tanpa /chance.',
        actionEn: 'Proceed with burns or asphyxiation medical treatment without /chance.',
        ruleRef: 'LSFD Guide Calculation Point D: Additional Notes',
      }
    }

    return {
      status: PK_STATUS.NO_PK,
      isVital: false,
      canChance: false,
      autoPk: false,
      chanceCommand: null,
      titleId: 'Tidak Dapat PK — /chance Dilarang',
      titleEn: 'Cannot PK — /chance Forbidden',
      reasonId:
        'Pengecualian mutlak: jenis luka non-tembakan (Graze, Bone Fracture, Dislocated, Burns, Bruise, Cut Wound) TIDAK BISA menggunakan fitur /chance dan TIDAK DAPAT di-PK.',
      reasonEn:
        'Strict exception: non-gunshot wound types (Graze, Fracture, Dislocation, Burns, Bruise, Cut) CANNOT use /chance and CANNOT trigger PK.',
      actionId: 'Wajib melanjutkan prosedur penanganan medis (D.E.A.T, splint, immobilisasi, ABC, transport).',
      actionEn: 'Must continue medical treatment (D.E.A.T, splints, immobilization, ABC, transport).',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Pengecualian /chance',
    }
  }

  // 3. Luka Tembak di Ekstremitas (Tangan / Kaki):
  // Tidak ada organ vital pemutus fungsi nadi; tidak bisa PK (risiko cacat/amputasi).
  if (location === 'limbs') {
    return {
      status: PK_STATUS.NO_PK,
      isVital: false,
      canChance: false,
      autoPk: false,
      chanceCommand: null,
      titleId: 'Luka Ekstremitas (Tangan/Kaki) — Tidak Dapat PK',
      titleEn: 'Limb Wounds (Hands/Legs) — Cannot PK',
      reasonId:
        'Luka tembak pada lengan, tangan, paha, atau kaki tidak mengenai organ vital yang menghilangkan fungsi nadi. Konsekuensi terburuk adalah kecacatan fisik atau amputasi, bukan PK.',
      reasonEn:
        'Gunshot wounds on limbs do not strike vital organs capable of eliminating pulse. Worst consequence is physical disability or amputation, not PK.',
      actionId: 'Lakukan hemostasis dengan Tourniquet / Direct Pressure, lalu evakuasi ke rumah sakit.',
      actionEn: 'Perform hemostasis with Tourniquet / Direct Pressure, then transport to hospital.',
      ruleRef: 'LSFD Guide Calculation Point D & QnA #13',
    }
  }

  // 4. Klasifikasi Vital Wound:
  // - Head: minimal 1 peluru (1x GSW on head)
  // - Torso: minimal 3 peluru (3x GSW on torso)
  const isVital =
    (location === 'head' && bulletCount >= 1) ||
    (location === 'torso' && bulletCount >= 3)

  // Kasus A: Vital Wound dengan Survival Chance < 50%
  // -> AUTO PK (Otomatis PK, /chance tidak perlu digunakan!)
  if (isVital && chance < 50) {
    return {
      status: PK_STATUS.AUTO_PK,
      isVital: true,
      canChance: false,
      autoPk: true,
      chanceCommand: null,
      titleId: 'AUTO PK (Otomatis Mati / PK)',
      titleEn: 'AUTO PK (Automatic Death / PK)',
      reasonId: `Korban mengalami Vital Wound (${location === 'head' ? `${bulletCount}x GSW di Kepala` : `${bulletCount}x GSW di Torso`}) dengan Survival Chance di bawah 50% (${chance}%). Kerusakan organ vital dan tulang fatal tak tertolong.`,
      reasonEn: `Victim sustained a Vital Wound (${location === 'head' ? `${bulletCount}x GSW to Head` : `${bulletCount}x GSW to Torso`}) with Survival Chance below 50% (${chance}%). Fatal organ/skeletal trauma.`,
      actionId:
        'Korban dinyatakan PK secara otomatis. Fitur /chance TIDAK PERLU digunakan. Paramedis mencatat kematian dan korban menjalani New Life Rule (NLR).',
      actionEn:
        'Victim is declared PK automatically. Command /chance is NOT needed. Paramedics record death and victim enters New Life Rule (NLR).',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Vital Wound (<50%)',
    }
  }

  // Kasus B: Vital Wound dengan Survival Chance >= 50%
  // -> Dapat PK dengan /chance 50! (Kesempatan survival diturunkan menjadi 50%)
  if (isVital && chance >= 50) {
    return {
      status: PK_STATUS.CHANCE_PK,
      isVital: true,
      canChance: true,
      autoPk: false,
      chanceCommand: '/chance 50',
      titleId: 'Dapat PK Menggunakan /chance 50',
      titleEn: 'Eligible for PK with /chance 50',
      reasonId: `Korban terkena luka vital (${location === 'head' ? `${bulletCount}x GSW di Kepala` : `${bulletCount}x GSW di Torso`}) tetapi survival chance masih ${chance}%. Regulasi LSFD memberikan kesempatan fair roll dengan menurunkan survival chance menjadi 50%.`,
      reasonEn: `Victim has vital wound (${location === 'head' ? `${bulletCount}x Head GSW` : `${bulletCount}x Torso GSW`}) but survival chance is ${chance}%. LSFD regulation lowers survival chance to 50% for a fair roll.`,
      actionId:
        'Izin OOC via /pm atau /b, lalu ketik /chance 50 sebanyak 1 kali. PASS = Selamat (paramedis berhasil); FAIL = Korban PK (paramedis gagal).',
      actionEn:
        'Request OOC consent via /pm or /b, then execute /chance 50 once. PASS = Survives; FAIL = PK.',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Vital Wound (>50%)',
    }
  }

  // Kasus C: Flesh Wound (Bukan luka vital, misal Torso < 3 peluru)
  // Subkasus C1: Survival Chance > 50%
  // -> TIDAK DAPAT PK, /chance TIDAK DAPAT DIGUNAKAN!
  if (chance > 50) {
    return {
      status: PK_STATUS.NO_PK,
      isVital: false,
      canChance: false,
      autoPk: false,
      chanceCommand: null,
      titleId: 'Tidak Dapat PK — /chance Tidak Dapat Digunakan',
      titleEn: 'Cannot PK — /chance Cannot Be Used',
      reasonId: `Luka tergolong Flesh Wound (${location === 'torso' ? `${bulletCount}x GSW di Torso (butuh min. 3x untuk vital)` : 'bukan area vital'}) dengan Survival Chance >50% (${chance}%). Peluru hanya merobek otot tanpa merusak tulang atau organ inti.`,
      reasonEn: `Wound is classified as Flesh Wound with Survival Chance >50% (${chance}%). Bullet tore muscle tissue only without destroying bone or core organs.`,
      actionId:
        'Dilarang melakukan /chance. Setelah diagnosis, paramedis wajib melanjutkan ke prosedur D.E.A.T dan A.B.C.',
      actionEn:
        'Command /chance is forbidden. Paramedics must proceed directly to D.E.A.T and A.B.C procedures.',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Fleshwound (>50%)',
    }
  }

  // Subkasus C2: Flesh Wound dengan Survival Chance <= 50%
  // -> DAPAT PK dengan /chance sesuai angka survival chance!
  return {
    status: PK_STATUS.CHANCE_PK,
    isVital: false,
    canChance: true,
    autoPk: false,
    chanceCommand: `/chance ${chance}`,
    titleId: `Dapat PK Menggunakan /chance ${chance}`,
    titleEn: `Eligible for PK with /chance ${chance}`,
    reasonId: `Luka tembak non-vital (Flesh Wound) tetapi kondisi korban kritis dengan Survival Chance <=50% (${chance}%). Pendarahan hebat berisiko mematikan.`,
    reasonEn: `Non-vital gunshot wound but victim is in critical state with Survival Chance <=50% (${chance}%). Severe hemorrhage is life-threatening.`,
    actionId: `Lakukan /chance ${chance} sebanyak 1 kali sebelum prosedur D.E.A.T setelah izin OOC. PASS = Selamat, FAIL = PK.`,
    actionEn: `Execute /chance ${chance} once before D.E.A.T after OOC consent. PASS = Survives, FAIL = PK.`,
    ruleRef: 'LSFD Guide Calculation Point B.2 & C: Fleshwound (<=50%)',
  }
}

/**
 * Mensimulasikan roll /chance (1 kali percobaan, probabilitas 50:50).
 *
 * @param {number} [targetPercent=50] - Persentase sukses (standar 50)
 * @returns {Object} Hasil roll { roll, pass, verdict, textId, textEn }
 */
export function simulateChanceRoll(targetPercent = 50) {
  const roll = Math.floor(Math.random() * 100) + 1
  const pass = roll <= targetPercent

  return {
    roll,
    pass,
    verdict: pass ? 'PASS' : 'FAIL',
    textId: pass
      ? `PASS (${roll} ≤ ${targetPercent}) — Korban SELAMAT! Paramedis berhasil menstabilkan kondisi fisik korban. Dilarang Force RP untuk tetap mati.`
      : `FAIL (${roll} > ${targetPercent}) — Korban PK (Player Kill)! Paramedis tidak berhasil menyelamatkan korban. Karakter wajib mematuhi New Life Rule (NLR).`,
    textEn: pass
      ? `PASS (${roll} ≤ ${targetPercent}) — Victim SURVIVED! Paramedics stabilized the victim. Forbidden to Force RP death.`
      : `FAIL (${roll} > ${targetPercent}) — Victim PK (Player Kill)! Paramedics failed resuscitation. Character must abide by New Life Rule (NLR).`,
  }
}
