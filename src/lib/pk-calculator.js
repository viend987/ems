/**
 * Logika evaluasi status Player Kill (PK) berdasarkan:
 * 1. Server Rules Jogjagamers V Roleplay (Bab I, Pasal 11, Pasal 21, Pasal 23)
 * 2. LSFD Operational Guide #1239: "Calculation to get Player Kill"
 * 3. LSFD Community Reference #339263: "General Guide PK"
 */

export const WOUND_TYPES = [
  { id: 'gsw', name: 'Gunshot Wound (GSW / Luka Tembak)', nameEn: 'Gunshot Wound (GSW)', isGunshot: true, isVitalCandidate: true },
  { id: 'flesh', name: 'Flesh Wound (Luka Tembak Ringan / Otot)', nameEn: 'Flesh Wound (Muscle / Non-Vital GSW)', isGunshot: true, isVitalCandidate: false },
  { id: 'graze', name: 'Graze (Luka Lecet / Gesekan)', nameEn: 'Graze', isGunshot: false, isVitalCandidate: false },
  { id: 'cut', name: 'Cut Wound (Luka Tusuk / Sayat)', nameEn: 'Cut Wound', isGunshot: false, isVitalCandidate: false },
  { id: 'fracture', name: 'Bone Fracture (Patah Tulang)', nameEn: 'Bone Fracture', isGunshot: false, isVitalCandidate: false },
  { id: 'dislocated', name: 'Dislocated (Keseleo / Terkilir)', nameEn: 'Dislocated', isGunshot: false, isVitalCandidate: false },
  { id: 'burns', name: 'Burns (Luka Bakar)', nameEn: 'Burns', isGunshot: false, isVitalCandidate: false },
  { id: 'bruise', name: 'Bruise (Memar / Hantaman)', nameEn: 'Bruise', isGunshot: false, isVitalCandidate: false },
]

export const BODY_REGIONS = [
  { id: 'head', name: 'Head (Kepala / Otak / Leher)', nameEn: 'Head (Brain / Neck)', isVital: true, minGswForVital: 1 },
  { id: 'torso', name: 'Torso (Dada, Paru, Jantung, Perut, Punggung)', nameEn: 'Torso (Heart, Lungs, Abdomen, Back)', isVital: true, minGswForVital: 3 },
  { id: 'limbs', name: 'Ekstremitas (Lengan, Tangan, Paha, Kaki)', nameEn: 'Limbs (Arms, Hands, Legs, Feet)', isVital: false, minGswForVital: 0 },
]

// Kompatibilitas mundur dengan nama GSW_LOCATIONS
export const GSW_LOCATIONS = BODY_REGIONS

export const PK_STATUS = {
  AUTO_PK: 'AUTO_PK',
  CHANCE_PK: 'CHANCE_PK',
  NO_PK: 'NO_PK',
}

/**
 * Menormalisasi daftar luka (mendukung multi-wound array maupun parameter tunggal warisan).
 *
 * @param {Array|null} woundsInput - Array luka: [{ id, type, location, count }]
 * @param {Object} fallbackParams - Parameter luka tunggal { woundType, location, bullets }
 * @returns {Array} Daftar luka ternormalisasi
 */
export function normalizeWounds(woundsInput, fallbackParams = {}) {
  if (Array.isArray(woundsInput) && woundsInput.length > 0) {
    return woundsInput.map((w, index) => ({
      id: w.id || `wound-${index}-${Date.now()}`,
      type: w.type || w.woundType || 'gsw',
      location: w.location || 'torso',
      count: Math.max(1, Number(w.count ?? w.bullets ?? 1)),
    }))
  }

  // Fallback parameter tunggal
  const { woundType = 'gsw', location = 'torso', bullets = 1 } = fallbackParams
  return [
    {
      id: 'legacy-wound-1',
      type: woundType,
      location,
      count: Math.max(1, Number(bullets) || 1),
    },
  ]
}

/**
 * Menghasilkan teks ringkasan gabungan luka korban.
 *
 * @param {Array} wounds
 * @param {boolean} isEn
 * @returns {string} Ringkasan luka
 */
export function summarizeWounds(wounds, isEn = false) {
  if (!wounds || wounds.length === 0) {
    return isEn ? 'No wounds recorded' : 'Tidak ada data luka'
  }

  const woundTypeMap = Object.fromEntries(WOUND_TYPES.map((t) => [t.id, isEn ? t.nameEn : t.name]))
  const regionMap = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, isEn ? r.nameEn : r.name]))

  return wounds
    .map((w) => {
      const typeLabel = woundTypeMap[w.type] || w.type
      const regLabel = regionMap[w.location] || w.location
      return `${w.count}x ${typeLabel} (${regLabel})`
    })
    .join(', ')
}

/**
 * Menghitung kelayakan PK berdasarkan gabungan status luka dan survival chance.
 *
 * @param {Object} params
 * @param {Array} [params.wounds] - Daftar gabungan luka korban [{ type, location, count }]
 * @param {string} [params.woundType='gsw'] - Jenis luka tunggal (opsional / fallback)
 * @param {string} [params.location='torso'] - Lokasi luka tunggal (opsional / fallback)
 * @param {number} [params.bullets=1] - Jumlah peluru luka tunggal (opsional / fallback)
 * @param {number} [params.survivalChance=75] - Angka persentase survival chance di /health (0 - 100)
 * @param {boolean} [params.bleedExpired=false] - Apakah LSFD belum datang selama lebih dari 15 menit
 * @param {boolean} [params.medicArrived=false] - Apakah LSPD/LSSD melakukan RP BLS/penanganan darurat (menggugurkan aturan PK 15 menit)
 * @param {boolean} [params.explosionDrowningOnly=false] - Mati murni ledakan/tenggelam tanpa luka tembak
 * @returns {Object} Evaluasi status, komando /chance, rincian luka, dan pasal rujukan
 */
export function evaluatePk({
  wounds = null,
  woundType = 'gsw',
  location = 'torso',
  bullets = 1,
  survivalChance = 75,
  bleedExpired = false,
  medicArrived = false,
  explosionDrowningOnly = false,
}) {
  const chance = Math.max(0, Math.min(100, Number(survivalChance) || 0))
  const normalized = normalizeWounds(wounds, { woundType, location, bullets })

  // Agregasi statistik luka gabungan
  let headGsw = 0
  let torsoGsw = 0
  let limbsGsw = 0
  let headFlesh = 0
  let torsoFlesh = 0
  let limbsFlesh = 0
  let totalGraze = 0
  let totalCut = 0
  let totalFracture = 0
  let totalDislocated = 0
  let totalBurns = 0
  let totalBruise = 0

  for (const w of normalized) {
    const count = w.count
    if (w.type === 'gsw') {
      if (w.location === 'head') headGsw += count
      else if (w.location === 'torso') torsoGsw += count
      else limbsGsw += count
    } else if (w.type === 'flesh') {
      if (w.location === 'head') headFlesh += count
      else if (w.location === 'torso') torsoFlesh += count
      else limbsFlesh += count
    } else if (w.type === 'graze') {
      totalGraze += count
    } else if (w.type === 'cut') {
      totalCut += count
    } else if (w.type === 'fracture') {
      totalFracture += count
    } else if (w.type === 'dislocated') {
      totalDislocated += count
    } else if (w.type === 'burns') {
      totalBurns += count
    } else if (w.type === 'bruise') {
      totalBruise += count
    }
  }

  const totalGsw = headGsw + torsoGsw + limbsGsw
  const totalFlesh = headFlesh + torsoFlesh + limbsFlesh
  const summaryId = summarizeWounds(normalized, false)
  const summaryEn = summarizeWounds(normalized, true)

  // 1. KASUS ATURAN 15 MENIT:
  // Korban/suspect diperbolehkan PK apabila LSFD belum datang selama 15 menit.
  // Pengecualian LSPD/LSSD: Apabila dalam 15 menit pihak LSPD/LSSD melakukan RP BLS / penanganan darurat,
  // maka aturan PK 15 menit dianggap gugur (korban tidak boleh PK).
  // Namun jika LSPD/LSSD tidak melakukan RP BLS dan LSFD juga belum datang selama 15 menit, barulah korban berhak PK via /chance.
  if (bleedExpired && !medicArrived) {
    return {
      status: PK_STATUS.CHANCE_PK,
      isVital: false,
      canChance: true,
      autoPk: false,
      chanceCommand: `/chance ${chance}`,
      titleId: 'Dapat PK — LSFD Belum Datang >15 Menit Tanpa RP BLS',
      titleEn: 'Eligible for PK — No LSFD for >15 Mins Without BLS',
      reasonId:
        'LSFD belum tiba di TKP selama lebih dari 15 menit dan pihak LSPD/LSSD di lokasi tidak melakukan RP BLS atau penanganan darurat. Korban diperbolehkan mengajukan PK menggunakan /chance sesuai nilai survival chance.',
      reasonEn:
        'LSFD has not arrived for over 15 minutes and on-scene LSPD/LSSD officers performed no BLS or emergency care RP. The victim is permitted to request a PK via /chance according to survival chance.',
      actionId: `Lakukan /chance ${chance} sebanyak 1 kali setelah izin OOC. Jika PASS = selamat, FAIL = PK.`,
      actionEn: `Execute /chance ${chance} once with OOC permission. PASS = survives, FAIL = PK.`,
      ruleRef: 'Ketentuan 15 Menit LSFD & Tindakan BLS LSPD/LSSD',
      summaryId,
      summaryEn,
      wounds: normalized,
    }
  }

  // 2. KASUS VITAL WOUND:
  // - Head: Minimal 1 peluru GSW (1x GSW on head)
  // - Torso: Minimal 3 peluru GSW (3x GSW on torso)
  const isVital = headGsw >= 1 || torsoGsw >= 3

  if (isVital) {
    const vitalDescId = [
      headGsw >= 1 ? `${headGsw}x GSW di Kepala` : null,
      torsoGsw >= 3 ? `${torsoGsw}x GSW di Torso` : null,
    ]
      .filter(Boolean)
      .join(' dan ')

    const vitalDescEn = [
      headGsw >= 1 ? `${headGsw}x Head GSW` : null,
      torsoGsw >= 3 ? `${torsoGsw}x Torso GSW` : null,
    ]
      .filter(Boolean)
      .join(' and ')

    // Kasus 2A: Vital Wound dengan Survival Chance < 50% -> AUTO PK!
    if (chance < 50) {
      return {
        status: PK_STATUS.AUTO_PK,
        isVital: true,
        canChance: false,
        autoPk: true,
        chanceCommand: null,
        titleId: 'AUTO PK (Otomatis Gugur / PK)',
        titleEn: 'AUTO PK (Mandatory Death / PK)',
        reasonId: `Korban mengalami luka tembak vital (${vitalDescId}) dengan Survival Chance di bawah 50% (${chance}%). Kerusakan organ vital dan fraktur fatal tak tertolong.`,
        reasonEn: `Victim sustained a Vital Wound (${vitalDescEn}) with Survival Chance below 50% (${chance}%). Fatal organ and skeletal trauma.`,
        actionId:
          'Korban dinyatakan PK secara otomatis. Fitur /chance TIDAK PERLU digunakan. Paramedis mencatat kematian dan korban wajib mematuhi New Life Rule (NLR).',
        actionEn:
          'Victim is declared PK automatically. Command /chance is NOT used. Paramedics record death and victim enters New Life Rule (NLR).',
        ruleRef: 'LSFD Guide Calculation Point B.2 & C: Vital Wound (<50%)',
        summaryId,
        summaryEn,
        wounds: normalized,
      }
    }

    // Kasus 2B: Vital Wound dengan Survival Chance >= 50% -> /chance 50!
    return {
      status: PK_STATUS.CHANCE_PK,
      isVital: true,
      canChance: true,
      autoPk: false,
      chanceCommand: '/chance 50',
      titleId: 'Dapat PK Menggunakan /chance 50',
      titleEn: 'Eligible for PK with /chance 50',
      reasonId: `Korban mengalami luka tembak vital (${vitalDescId}) namun Survival Chance masih ${chance}%. Regulasi LSFD memberikan kesempatan fair roll 1:2 dengan menurunkan kesempatan menjadi 50%.`,
      reasonEn: `Victim has vital wound (${vitalDescEn}) but survival chance is ${chance}%. LSFD regulation lowers survival chance to 50% for a fair 1:2 roll.`,
      actionId:
        'Izin OOC via /pm atau /b, lalu ketik /chance 50 sebanyak 1 kali. PASS = Selamat (paramedis berhasil); FAIL = Korban PK (paramedis gagal).',
      actionEn:
        'Request OOC consent via /pm or /b, then execute /chance 50 once. PASS = Survives; FAIL = PK.',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Vital Wound (>50%)',
      summaryId,
      summaryEn,
      wounds: normalized,
    }
  }

  // 3. KASUS FLESH WOUND & LUKA TEMBAK NON-VITAL DI AREA VITAL (Head / Torso):
  // Ada peluru di area tubuh inti (Torso GSW 1-2, Head Flesh Wound, atau Torso Flesh Wound),
  // tetapi belum memenuhi kriteria luka tembak vital tulang/organ.
  const hasPenetratingCore =
    headFlesh > 0 || torsoFlesh > 0 || (torsoGsw > 0 && torsoGsw < 3)

  if (hasPenetratingCore) {
    const descId = [
      torsoGsw > 0 ? `${torsoGsw}x GSW di Torso` : null,
      torsoFlesh > 0 ? `${torsoFlesh}x Flesh Wound di Torso` : null,
      headFlesh > 0 ? `${headFlesh}x Flesh Wound di Kepala` : null,
    ]
      .filter(Boolean)
      .join(', ')

    const descEn = [
      torsoGsw > 0 ? `${torsoGsw}x Torso GSW` : null,
      torsoFlesh > 0 ? `${torsoFlesh}x Torso Flesh Wound` : null,
      headFlesh > 0 ? `${headFlesh}x Head Flesh Wound` : null,
    ]
      .filter(Boolean)
      .join(', ')

    // Subkasus 3A: Survival Chance <= 50% -> DAPAT PK via /chance sesuai survival chance!
    if (chance <= 50) {
      return {
        status: PK_STATUS.CHANCE_PK,
        isVital: false,
        canChance: true,
        autoPk: false,
        chanceCommand: `/chance ${chance}`,
        titleId: `Dapat PK Menggunakan /chance ${chance}`,
        titleEn: `Eligible for PK with /chance ${chance}`,
        reasonId: `Luka tembak non-vital / Flesh Wound (${descId}) tetapi kondisi korban kritis dengan Survival Chance ≤50% (${chance}%). Pendarahan hebat berisiko fatal.`,
        reasonEn: `Non-vital gunshot / Flesh Wound (${descEn}) with critical physical condition (Survival Chance ≤50%, ${chance}%). Severe hemorrhage is life-threatening.`,
        actionId: `Lakukan /chance ${chance} sebanyak 1 kali sebelum prosedur D.E.A.T setelah izin OOC. PASS = Selamat, FAIL = PK.`,
        actionEn: `Execute /chance ${chance} once before D.E.A.T after OOC consent. PASS = Survives, FAIL = PK.`,
        ruleRef: 'LSFD Guide Calculation Point B.2 & C: Fleshwound (<=50%)',
        summaryId,
        summaryEn,
        wounds: normalized,
      }
    }

    // Subkasus 3B: Survival Chance > 50% -> TIDAK DAPAT PK, /chance DILARANG!
    return {
      status: PK_STATUS.NO_PK,
      isVital: false,
      canChance: false,
      autoPk: false,
      chanceCommand: null,
      titleId: 'Tidak Dapat PK — /chance Tidak Dapat Digunakan',
      titleEn: 'Cannot PK — /chance Cannot Be Used',
      reasonId: `Luka tembak tergolong Flesh Wound (${descId}) dengan Survival Chance >50% (${chance}%). Peluru hanya merobek jaringan otot tanpa merusak tulang atau organ vital inti.`,
      reasonEn: `Wound is classified as Flesh Wound (${descEn}) with Survival Chance >50% (${chance}%). Bullet tore muscle tissue only without destroying bone or core organs.`,
      actionId:
        'Dilarang melakukan /chance. Setelah diagnosis, paramedis wajib melanjutkan ke prosedur D.E.A.T dan A.B.C.',
      actionEn:
        'Command /chance is forbidden. Paramedics must proceed directly to D.E.A.T and A.B.C procedures.',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Fleshwound (>50%)',
      summaryId,
      summaryEn,
      wounds: normalized,
    }
  }

  // 4. KASUS LUKA EKSTREMITAS MURNI (Hanya Tangan / Kaki):
  // Korban memiliki luka tembak atau flesh wound hanya pada ekstremitas.
  const isOnlyLimbs =
    (limbsGsw > 0 || limbsFlesh > 0) &&
    headGsw === 0 &&
    torsoGsw === 0 &&
    headFlesh === 0 &&
    torsoFlesh === 0

  if (isOnlyLimbs) {
    const limbCount = limbsGsw + limbsFlesh
    return {
      status: PK_STATUS.NO_PK,
      isVital: false,
      canChance: false,
      autoPk: false,
      chanceCommand: null,
      titleId: 'Luka Ekstremitas (Tangan/Kaki) — Tidak Dapat PK',
      titleEn: 'Limb Wounds (Hands/Legs) — Cannot PK',
      reasonId: `Seluruh luka tembak (${limbCount}x luka di ekstremitas) berada pada lengan, tangan, paha, atau kaki. Tidak mengenai organ vital yang menghilangkan fungsi nadi. Konsekuensi terburuk adalah kecacatan fisik atau amputasi, bukan PK.`,
      reasonEn: `All gunshot wounds (${limbCount}x limb wounds) are confined to arms, hands, thighs, or legs. No vital pulse organs struck. Worst outcome is amputation/disability, not PK.`,
      actionId: 'Lakukan hemostasis dengan Tourniquet / Direct Pressure, pasang splint fraktur, lalu evakuasi ke rumah sakit.',
      actionEn: 'Perform hemostasis with Tourniquet / Direct Pressure, splint fractures, then transport to hospital.',
      ruleRef: 'LSFD Guide Calculation Point D & QnA #13: Limbs Immunity',
      summaryId,
      summaryEn,
      wounds: normalized,
    }
  }

  // 5. KASUS TANPA LUKA TEMBAK SAMA SEKALI (Hanya Graze, Cut, Fracture, Dislocated, Burns, Bruise):
  if (totalGsw === 0 && totalFlesh === 0) {
    if (totalBurns > 0 && explosionDrowningOnly) {
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
        summaryId,
        summaryEn,
        wounds: normalized,
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
      actionId: 'Wajib melanjutkan prosedur penanganan medis lengkap (D.E.A.T, splint, balut tekan, A.B.C, transport).',
      actionEn: 'Must continue medical treatment (D.E.A.T, splints, pressure bandages, A.B.C, transport).',
      ruleRef: 'LSFD Guide Calculation Point B.2 & C: Pengecualian /chance',
      summaryId,
      summaryEn,
      wounds: normalized,
    }
  }

  // Fallback standar (misal kondisi lain yang tidak fatal)
  return {
    status: PK_STATUS.NO_PK,
    isVital: false,
    canChance: false,
    autoPk: false,
    chanceCommand: null,
    titleId: 'Tidak Memenuhi Kriteria PK',
    titleEn: 'Does Not Meet PK Criteria',
    reasonId: 'Kombinasi luka dan kondisi survival chance tidak memenuhi kriteria regulasi PK LSFD.',
    reasonEn: 'Wound combination and survival chance do not meet LSFD PK criteria.',
    actionId: 'Lanjutkan penanganan medis standar sesuai prosedur.',
    actionEn: 'Continue standard medical triage according to procedures.',
    ruleRef: 'LSFD Guide Calculation Point B & C',
    summaryId,
    summaryEn,
    wounds: normalized,
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
