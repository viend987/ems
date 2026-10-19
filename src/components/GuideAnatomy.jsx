import { useState } from 'preact/hooks'
import Icon from './Icon.jsx'
import {
  ARTERY_POINTS,
  BODY_REGIONS,
  BONES_REFERENCE,
  buildDoctorReport,
  buildInspectDo,
  buildRadioReport,
  WOUND_TYPES,
} from '../data/anatomy.js'

export default function GuideAnatomy({ lang }) {
  const isEn = lang === 'en'

  // Generator State
  const [loc, setLoc] = useState('U')
  const [selectedRegionId, setSelectedRegionId] = useState('lower-extremity')
  const [subpartText, setSubpartText] = useState('Right Leg')
  const [selectedWoundId, setSelectedWoundId] = useState('gsw')
  const [abcStatus, setAbcStatus] = useState('Unstable')
  const [hospital, setHospital] = useState('PBH')
  const [eta, setEta] = useState('3 Minutes')
  const [bleedingActive, setBleedingActive] = useState(true)

  // Copy Feedback States
  const [copiedType, setCopiedType] = useState(null)

  // Region Filter State in Section 2
  const [activeRegionFilter, setActiveRegionFilter] = useState('all')

  const currentRegion = BODY_REGIONS.find((r) => r.id === selectedRegionId) || BODY_REGIONS[0]
  const currentWound = WOUND_TYPES.find((w) => w.id === selectedWoundId) || WOUND_TYPES[0]

  const regionLabel = subpartText
    ? `${currentRegion.name.split(' (')[0]} (${subpartText})`
    : currentRegion.name.split(' (')[0]

  const doctorReportText = buildDoctorReport({
    loc,
    woundType: currentWound.id.toUpperCase(),
    bodyRegion: regionLabel,
    abcStatus,
  })

  const radioReportText = buildRadioReport({
    callsign: '~',
    status: '7e',
    woundType: currentWound.id.toUpperCase(),
    bodyRegion: regionLabel,
    hospital,
    eta,
  })

  const inspectDoText = buildInspectDo({
    woundType: currentWound.id.toUpperCase(),
    bodyRegion: regionLabel,
    bleeding: bleedingActive,
  })

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 1500)
  }

  const filteredRegions =
    activeRegionFilter === 'all'
      ? BODY_REGIONS
      : BODY_REGIONS.filter((r) => r.group === activeRegionFilter)

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Doktrin */}
      <header className="mb-2">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-muted mb-1">
          <span className="font-mono text-alarm font-bold">
            {isEn ? 'ANATOMY & MEDICAL DOCTRINE' : 'ANATOMI & DOKTRIN MEDIS'}
          </span>
          <span>•</span>
          <span>{isEn ? 'LSFD Trauma Care' : 'Trauma Care LSFD'}</span>
          <span>•</span>
          <span>Doctor Report Protocol</span>
        </div>

        <h2 className="slab text-2xl text-bone sm:text-3xl">
          {isEn ? 'Anatomy & Injury Terminology Reference' : 'Terminologi Anatomi & Klasifikasi Cedera Medis'}
        </h2>
        <p className="mt-1 max-w-prose text-xs leading-relaxed text-dim">
          {isEn
            ? 'A comprehensive medical guide for field paramedics and roleplay enthusiasts: understanding anatomical regions (Upper/Lower Extremity, Torso, Cranial, Cervical), wound pathophysiology, arterial pressure sites, bone fracture splinting, and instant Doctor Report generation for emergency handovers.'
            : 'Panduan medis terstruktur bagi petugas lapangan LSFD dan penggiat roleplay: memahami pembagian regio tubuh (Upper/Lower Extremity, Torso, Cranial, Cervical), patofisiologi luka, titik tekan arteri pendarahan, penanganan fraktur tulang, serta generator Doctor Report instan untuk serah-terima di ruang IGD/ER.'}
        </p>
      </header>

      {/* Quick jump navigation (seragam dengan SectionNav) */}
      <nav aria-label="Daftar Isi" className="-mt-4 flex flex-wrap gap-1">
        {[
          { id: 'builder', label: isEn ? 'Generator Laporan' : 'Generator Laporan' },
          { id: 'regions', label: isEn ? 'Regio Anatomi' : 'Regio Anatomi' },
          { id: 'wounds', label: isEn ? 'Jenis Luka' : 'Jenis Luka' },
          { id: 'arteries', label: isEn ? 'Titik Arteri' : 'Titik Arteri' },
          { id: 'bones', label: isEn ? 'Fraktur Tulang' : 'Fraktur Tulang' },
          { id: 'field-tips', label: isEn ? 'Etika Lapangan' : 'Etika Lapangan' },
        ].map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="rounded-sm border border-line bg-panel px-2.5 py-1.5 text-[11px] text-dim hover:border-signal hover:text-signal"
          >
            {sec.label}
          </a>
        ))}
      </nav>

      {/* SEKSI 1: GENERATOR DOCTOR REPORT & RADIO */}
      <section id="builder" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between gap-x-4">
          <h3 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
            <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
            {isEn ? 'Interactive Doctor Report & Radio Generator' : 'Generator Doctor Report & Radio Dispatch'}
          </h3>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-dim">
          {isEn
            ? 'Generate standardized handover reports for Hospital ER and dispatch status with 1-click clipboard copy.'
            : 'Alat bantu otomatis untuk menyusun laporan serah-terima medis ke Tim Dokter di Rumah Sakit (PBH / ASGH) dan transmisi radio Status-7e.'}
        </p>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Panel Kontrol Form */}
          <div className="space-y-3.5 rounded-sm border border-line bg-panel p-3.5 sm:p-4 lg:col-span-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono block">
              {isEn ? 'Patient Assessment Parameters' : 'Parameter Penilaian Pasien'}
            </span>

            {/* Tingkat Kesadaran (LOC) */}
            <div>
              <label className="text-[11px] font-bold text-bone block mb-1">
                1. {isEn ? 'Level of Consciousness (LOC)' : 'Tingkat Kesadaran (LOC)'}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { val: 'A', label: 'A (Alert)', desc: isEn ? 'Fully conscious' : 'Sadar penuh' },
                  { val: 'V', label: 'V (Verbal)', desc: isEn ? 'Responds to sound' : 'Respon suara' },
                  { val: 'P', label: 'P (Pain)', desc: isEn ? 'Responds to pinch' : 'Respon nyeri' },
                  { val: 'U', label: 'U (Unresponsive)', desc: isEn ? 'Passed out' : 'Tidak sadar' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setLoc(item.val)}
                    className={`rounded-sm border p-1.5 text-center text-xs transition-colors ${
                      loc === item.val
                        ? 'border-alarm bg-alarm text-white font-bold'
                        : 'border-line bg-ink text-bone hover:border-muted hover:bg-raise'
                    }`}
                  >
                    <span className="block font-bold">{item.val}</span>
                    <span className="text-[9px] opacity-80 block truncate font-mono">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Regio Tubuh */}
            <div>
              <label className="text-[11px] font-bold text-bone block mb-1">
                2. {isEn ? 'Anatomical Region' : 'Regio Bagian Tubuh'}
              </label>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {BODY_REGIONS.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => {
                      setSelectedRegionId(region.id)
                      setSubpartText(region.subparts[0]?.name.split(' (')[0] || '')
                    }}
                    className={`rounded-sm border p-1.5 text-left text-xs transition-colors ${
                      selectedRegionId === region.id
                        ? 'border-alarm bg-alarm text-white font-bold'
                        : 'border-line bg-ink text-bone hover:border-muted hover:bg-raise'
                    }`}
                  >
                    <span className="block font-bold text-[11px] truncate">
                      {region.name.split(' (')[0]}
                    </span>
                    <span className="text-[9px] opacity-80 block font-mono">{region.latin}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lokasi Spesifik / Subbagian */}
            <div>
              <label className="text-[11px] font-bold text-bone block mb-1">
                3. {isEn ? 'Specific Subpart / Side' : 'Subbagian / Keterangan Sisi'}
              </label>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {currentRegion.subparts.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSubpartText(sub.name.split(' (')[0])}
                    className={`rounded-sm border px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      subpartText === sub.name.split(' (')[0]
                        ? 'border-alarm bg-alarm/20 text-alarm font-bold'
                        : 'border-line bg-ink text-dim hover:text-bone'
                    }`}
                  >
                    {sub.name.split(' (')[0]}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={subpartText}
                onInput={(e) => setSubpartText(e.target.value)}
                placeholder={isEn ? 'e.g. Right Leg, Left Arm, Upper Torso' : 'Contoh: Right Leg, Left Arm, Upper Torso'}
                className="w-full rounded-sm border border-line bg-ink px-2.5 py-1 text-xs text-bone focus:border-alarm focus:outline-none"
              />
            </div>

            {/* Jenis Luka */}
            <div>
              <label className="text-[11px] font-bold text-bone block mb-1">
                4. {isEn ? 'Wound / Trauma Type' : 'Jenis Luka / Trauma'}
              </label>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {WOUND_TYPES.slice(0, 4).map((wound) => (
                  <button
                    key={wound.id}
                    type="button"
                    onClick={() => setSelectedWoundId(wound.id)}
                    className={`rounded-sm border p-1 text-center text-xs transition-colors ${
                      selectedWoundId === wound.id
                        ? 'border-alarm bg-alarm text-white font-bold'
                        : 'border-line bg-ink text-bone hover:border-muted hover:bg-raise'
                    }`}
                  >
                    {wound.id.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 mt-1">
                {WOUND_TYPES.slice(4).map((wound) => (
                  <button
                    key={wound.id}
                    type="button"
                    onClick={() => setSelectedWoundId(wound.id)}
                    className={`rounded-sm border p-1 text-center text-[10px] transition-colors ${
                      selectedWoundId === wound.id
                        ? 'border-alarm bg-alarm text-white font-bold'
                        : 'border-line bg-ink text-bone hover:border-muted hover:bg-raise'
                    }`}
                  >
                    {wound.label.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Status ABC & Opsi Tambahan */}
            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              <div>
                <label className="text-[11px] font-bold text-bone block mb-1">
                  {isEn ? 'ABC Status' : 'Status ABC'}
                </label>
                <select
                  value={abcStatus}
                  onChange={(e) => setAbcStatus(e.target.value)}
                  className="w-full rounded-sm border border-line bg-ink px-2 py-1 text-xs text-bone focus:border-alarm focus:outline-none"
                >
                  <option value="Normal">Normal</option>
                  <option value="Unstable">Unstable (Tachycardia / Tachypnea)</option>
                  <option value="Critical">Critical (Cardiac Arrest)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-bone block mb-1">
                  {isEn ? 'Target Hospital' : 'RS Tujuan'}
                </label>
                <div className="flex gap-1.5">
                  <select
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-2/3 rounded-sm border border-line bg-ink px-2 py-1 text-xs text-bone focus:border-alarm focus:outline-none"
                  >
                    <option value="PBH">PBH (Pillbox)</option>
                    <option value="ASGH">ASGH (All Saints)</option>
                    <option value="CGH">CGH (County Gen.)</option>
                  </select>
                  <select
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    className="w-1/3 rounded-sm border border-line bg-ink px-1.5 py-1 text-xs text-bone focus:border-alarm focus:outline-none"
                  >
                    <option value="2 Minutes">2m</option>
                    <option value="3 Minutes">3m</option>
                    <option value="4 Minutes">4m</option>
                    <option value="5 Minutes">5m</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Toggle Bleeding Active */}
            <label className="flex items-center gap-2 cursor-pointer pt-0.5 text-xs text-bone">
              <input
                type="checkbox"
                checked={bleedingActive}
                onChange={(e) => setBleedingActive(e.target.checked)}
                className="accent-alarm size-4 rounded"
              />
              <span className="text-[11px]">{isEn ? 'Active external hemorrhage / bleeding present' : 'Disertai pendarahan aktif luar yang merembes'}</span>
            </label>
          </div>

          {/* Panel Output & 1-Click Copy */}
          <div className="space-y-3 lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono block">
                {isEn ? 'Ready-to-Use Roleplay Outputs' : 'Format Siap Salin untuk Roleplay'}
              </span>

              {/* Output 1: Doctor Report */}
              <div className="rounded-sm border border-line bg-ink p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-alarm uppercase">
                    1. Doctor Report (PBH / ASGH Handover)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(doctorReportText, 'doctor')}
                    className="rounded-sm border border-alarm/50 bg-alarm/10 px-2 py-0.5 text-[10px] font-bold text-alarm hover:bg-alarm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Icon name={copiedType === 'doctor' ? 'check' : 'clipboard'} className="size-3" />
                    {copiedType === 'doctor' ? (isEn ? 'COPIED!' : 'TERSALIN!') : (isEn ? 'COPY' : 'SALIN')}
                  </button>
                </div>
                <div className="font-mono text-xs font-bold text-bone bg-panel p-2 rounded-sm border border-line/60 break-all select-all">
                  {doctorReportText}
                </div>
                <p className="text-[10px] text-muted">
                  {isEn
                    ? 'Reported to the attending surgeon or ER doctor upon arrival at Emergency Room.'
                    : 'Diberikan langsung kepada dokter jaga atau tim trauma saat korban diturunkan di ruang IGD.'}
                </p>
              </div>

              {/* Output 2: Radio Status-7e */}
              <div className="rounded-sm border border-line bg-ink p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-alarm uppercase">
                    2. Radio Transmission (Status-7e)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(radioReportText, 'radio')}
                    className="rounded-sm border border-alarm/50 bg-alarm/10 px-2 py-0.5 text-[10px] font-bold text-alarm hover:bg-alarm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Icon name={copiedType === 'radio' ? 'check' : 'radio'} className="size-3" />
                    {copiedType === 'radio' ? (isEn ? 'COPIED!' : 'TERSALIN!') : (isEn ? 'COPY' : 'SALIN')}
                  </button>
                </div>
                <div className="font-mono text-xs font-bold text-bone bg-panel p-2 rounded-sm border border-line/60 break-all select-all leading-relaxed">
                  {radioReportText}
                </div>
                <p className="text-[10px] text-muted">
                  {isEn
                    ? 'Sent over tactical radio (/r) while en route from scene to hospital so ER staff can prepare.'
                    : 'Ditransmisikan via radio (/r) dalam perjalanan dari TKP agar pihak rumah sakit menyiapkan ER.'}
                </p>
              </div>

              {/* Output 3: RP /do Diagnosa Lapangan */}
              <div className="rounded-sm border border-line bg-ink p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-alarm uppercase">
                    3. Roleplay /do Pemeriksaan / Inspect
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(inspectDoText, 'do')}
                    className="rounded-sm border border-alarm/50 bg-alarm/10 px-2 py-0.5 text-[10px] font-bold text-alarm hover:bg-alarm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Icon name={copiedType === 'do' ? 'check' : 'clipboard'} className="size-3" />
                    {copiedType === 'do' ? (isEn ? 'COPIED!' : 'TERSALIN!') : (isEn ? 'COPY' : 'SALIN')}
                  </button>
                </div>
                <div className="font-mono text-xs text-bone bg-panel p-2 rounded-sm border border-line/60 break-all select-all leading-relaxed">
                  {inspectDoText}
                </div>
                <p className="text-[10px] text-muted">
                  {isEn
                    ? 'Field diagnosis command after /inspect to clarify physiological wound condition.'
                    : 'Gunakan sebagai respon deskripsi luka lapangan setelah melakukan /inspect.'}
                </p>
              </div>
            </div>

            {/* Catatan Protokol */}
            <div className="rounded-sm border border-line/60 bg-raise/30 p-2.5 text-[11px] text-dim">
              <span className="font-bold text-bone block text-[10px]">
                {isEn ? 'LSFD Protocol Note:' : 'Catatan Protokol LSFD:'}
              </span>
              {isEn
                ? 'Standard format always specifies LOC first, followed by injury and anatomical region, and terminates with ABC vital status.'
                : 'Urutan baku Doctor Report selalu diawali LOC (A/V/P/U), dilanjutkan jenis cedera dan regio anatomis, lalu diakhiri evaluasi status ABC.'}
            </div>
          </div>
        </div>
      </section>

      {/* SEKSI 2: REGIO ANATOMI TUBUH */}
      <section id="regions" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between gap-x-4">
          <h3 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
            <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
            {isEn ? 'Anatomical Body Regions & Protocol Matrix' : 'Regio Anatomi Tubuh & Matriks Protokol'}
          </h3>
        </div>
        <p className="mb-4 text-xs text-dim leading-relaxed">
          {isEn
            ? 'Detailed anatomical divisions, standard Latin medical nomenclature, common field risks, and mandatory LSFD treatments.'
            : 'Pembagian anatomi tubuh, terminologi medis Latin baku, bahaya patologis di lapangan, dan protokol penanganan resmi LSFD.'}
        </p>

        {/* Filter Regio */}
        <div className="flex flex-wrap gap-1.5 border-b border-line pb-2.5 mb-3">
          {[
            { id: 'all', label: isEn ? 'Semua Regio' : 'Semua Regio' },
            { id: 'extremity-upper', label: 'Upper Extremity' },
            { id: 'extremity-lower', label: 'Lower Extremity' },
            { id: 'torso', label: 'Torso / Trunk' },
            { id: 'head-neck', label: 'Cranial & Cervical' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveRegionFilter(tab.id)}
              className={`rounded-sm px-2.5 py-1 text-[11px] font-bold transition-colors ${
                activeRegionFilter === tab.id
                  ? 'bg-alarm text-white'
                  : 'border border-line bg-ink text-dim hover:text-bone hover:border-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Daftar Regio & Subbagian */}
        <div className="space-y-4">
          {filteredRegions.map((region) => (
            <div key={region.id} className="rounded-sm border border-line bg-panel p-3.5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-1.5">
                <div>
                  <h4 className="text-sm font-bold text-bone">{region.name}</h4>
                  <span className="font-mono text-xs text-alarm italic">{region.latin}</span>
                </div>
                <span className="rounded-sm border border-line bg-ink px-2 py-0.5 font-mono text-[10px] text-dim">
                  {region.subparts.length} {isEn ? 'Subdivisions' : 'Subdivisi'}
                </span>
              </div>

              <div className="grid gap-2.5 md:grid-cols-2">
                {region.subparts.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-sm border border-line/70 bg-ink p-2.5 space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-bone">{sub.name}</span>
                        <span
                          className={`rounded-xs px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase ${
                            sub.vital
                              ? 'bg-alarm/15 text-alarm border border-alarm/30'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {sub.vital
                            ? isEn ? 'VITAL (PK RISK)' : 'VITAL (RISIKO PK)'
                            : isEn ? 'NON-VITAL' : 'NON-VITAL'}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-dim leading-relaxed">
                        {isEn ? sub.descEn : sub.desc}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-line/50 text-[11px]">
                      <span className="font-bold text-bone block text-[10px] uppercase tracking-wider text-muted font-mono">
                        {isEn ? 'Field Protocol:' : 'Prosedur Penanganan:'}
                      </span>
                      <span className="text-bone/90 mt-0.5 block text-[11px]">
                        {isEn ? sub.treatmentEn : sub.treatment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 3: KLASIFIKASI JENIS LUKA */}
      <section id="wounds" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between gap-x-4">
          <h3 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
            <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
            {isEn ? 'Medical Wound Classifications' : 'Klasifikasi & Definisi Jenis Luka Medis'}
          </h3>
        </div>
        <p className="mb-4 text-xs text-dim leading-relaxed">
          {isEn
            ? 'Pathological definitions, severity grades, and direct operational actions according to LSFD standard procedure.'
            : 'Definisi patologis, tingkat keparahan klinis, dan tindakan operasional penanganan langsung di lapangan sesuai prosedur LSFD.'}
        </p>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {WOUND_TYPES.map((wound) => (
            <div
              key={wound.id}
              className="rounded-sm border border-line bg-panel p-3 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-alarm uppercase">
                    {wound.id}
                  </span>
                  <span className="text-[10px] font-mono text-muted">{wound.severity}</span>
                </div>
                <h4 className="text-xs font-bold text-bone mt-1">{wound.label}</h4>
                <p className="mt-1 text-[11px] text-dim leading-relaxed">
                  {isEn ? wound.descEn : wound.desc}
                </p>
              </div>

              <div className="border-t border-line/60 pt-1.5 text-[11px]">
                <span className="font-bold text-bone block text-[10px] uppercase tracking-wider text-muted font-mono">
                  {isEn ? 'Direct Action:' : 'Tindakan Lapangan:'}
                </span>
                <span className="text-bone/90 mt-0.5 block text-[11px]">
                  {isEn ? wound.fieldActionEn : wound.fieldAction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 4: TITIK ARTERI & PENDARAHAN MASIF */}
      <section id="arteries" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between gap-x-4">
          <h3 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
            <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
            {isEn ? 'Arterial Pressure Points & Exsanguination Control' : 'Titik Arteri & Penanganan Pendarahan Masif'}
          </h3>
        </div>
        <p className="mb-4 text-xs text-dim leading-relaxed">
          {isEn
            ? 'Arterial anatomy determines bleeding control hierarchy: Tourniquets for limbs, CRoC for junctional groin, and direct pressure for trunk.'
            : 'Anatomi pembuluh darah arteri menentukan hierarki penghentian darah: Tourniquet untuk anggota gerak, CRoC untuk lipat paha, dan balut tekan berlapis untuk batang tubuh.'}
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          {ARTERY_POINTS.map((art) => (
            <div key={art.id} className="rounded-sm border border-line bg-panel p-3.5 space-y-1.5">
              <div className="flex items-center justify-between border-b border-line pb-1.5">
                <span className="text-xs font-bold text-bone">{art.name}</span>
                <span className="font-mono text-[10px] text-alarm font-bold uppercase">
                  {art.id}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted block font-bold font-mono">
                  {isEn ? 'Anatomical Landmark:' : 'Lokasi Anatomis:'}
                </span>
                <span className="text-xs text-dim">{isEn ? art.locationEn : art.location}</span>
              </div>
              <div className="pt-0.5">
                <span className="text-[10px] uppercase tracking-wider text-muted block font-bold font-mono">
                  {isEn ? 'Clinical Relevance & Tool:' : 'Kepentingan Klinis & Alat:'}
                </span>
                <span className="text-xs text-bone/90">{isEn ? art.useCaseEn : art.useCase}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sorotan Khusus: CRoC vs Tourniquet */}
        <div className="rounded-sm border border-alarm/50 bg-alarm/5 p-3.5 space-y-2.5 mt-3">
          <div className="flex items-center gap-2">
            <Icon name="shield" className="size-4 text-alarm" />
            <span className="text-xs font-bold uppercase tracking-wider text-alarm font-mono">
              {isEn ? 'CRITICAL EQUIPMENT RULE: TOURNIQUET VS CROC' : 'ATURAN KRITIS: KAPAN MENGGUNAKAN CROC VS TOURNIQUET?'}
            </span>
          </div>
          <div className="grid gap-2.5 text-xs sm:grid-cols-2">
            <div className="rounded-sm border border-line bg-ink p-2.5">
              <span className="font-bold text-bone block mb-0.5 text-xs">Combat Application Tourniquet (CAT)</span>
              <p className="text-dim text-[11px] leading-relaxed">
                Hanya dapat digunakan pada <strong>tangan (Upper Extremity)</strong> dan <strong>kaki (Lower Extremity)</strong>.
                Dipasang 5 cm di atas luka. <em>DILARANG</em> dipasang pada leher, kepala, atau perut.
              </p>
            </div>
            <div className="rounded-sm border border-line bg-ink p-2.5">
              <span className="font-bold text-bone block mb-0.5 text-xs">Combat Ready Clamp (CRoC)</span>
              <p className="text-dim text-[11px] leading-relaxed">
                Wajib digunakan khusus untuk pendarahan area <strong>Groin / Inguinal</strong> (pertemuan paha dan panggul)
                tempat arteri femoralis melintas di mana tourniquet biasa melorot dan tidak dapat mengunci.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEKSI 5: FRAKTUR & RUJUKAN TULANG */}
      <section id="bones" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between gap-x-4">
          <h3 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
            <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
            {isEn ? 'Bone Reference & Splinting Equipment Matrix' : 'Rujukan Anatomi Tulang & Matriks Pembidaian'}
          </h3>
        </div>
        <p className="mb-4 text-xs text-dim leading-relaxed">
          {isEn
            ? 'Selection of immobilizing equipment (Vacuum Splint, Traction Splint, Triangular Bandage, C-Collar) mapped to fractured bone anatomy.'
            : 'Pemilihan alat pembidaian imobilisasi yang tepat sesuai dengan anatomi tulang yang mengalami fraktur tertutup maupun terbuka.'}
        </p>

        <div className="overflow-x-auto rounded-sm border border-line bg-panel">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-ink font-mono text-[10px] uppercase tracking-wider text-muted">
              <tr>
                <th className="p-2.5">Nama Tulang</th>
                <th className="p-2.5">Bagian Tubuh</th>
                <th className="p-2.5">Alat Bidai / Splint</th>
                <th className="p-2.5">Risiko Patologis Lapangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {BONES_REFERENCE.map((row) => (
                <tr key={row.bone} className="hover:bg-raise/50 transition-colors">
                  <td className="p-2.5 font-bold text-bone font-mono">{row.bone}</td>
                  <td className="p-2.5 text-dim">{row.part}</td>
                  <td className="p-2.5 text-alarm font-medium">{row.splint}</td>
                  <td className="p-2.5 text-dim text-[11px]">{row.danger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEKSI 6: PROSEDUR KLINIS LAPANGAN */}
      <section id="field-tips" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between gap-x-4">
          <h3 className="slab flex items-center gap-2.5 text-lg text-bone sm:text-xl">
            <span aria-hidden="true" className="h-4 w-1 bg-alarm sm:h-5" />
            {isEn ? 'Field Clinical Best Practices & RP Etiquette' : 'Etika Roleplay Medis & Ketentuan Lapangan'}
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-sm border border-line bg-panel p-3.5 space-y-1">
            <h4 className="text-xs font-bold text-bone">
              1. Deskripsi Detail (/me & /do)
            </h4>
            <p className="text-[11px] text-dim leading-relaxed">
              Gunakan nama regio spesifik seperti <em>Lower Extremity (Right Leg)</em> atau <em>Thorax</em> daripada sekadar menyebut "di kaki" atau "di badan". Ini memudahkan dokter di ER menentukan prosedur operasi.
            </p>
          </div>

          <div className="rounded-sm border border-line bg-panel p-3.5 space-y-1">
            <h4 className="text-xs font-bold text-bone">
              2. Jangan Cabut Benda Tertancap
            </h4>
            <p className="text-[11px] text-dim leading-relaxed">
              Jika korban mengalami luka tusuk (*Puncture Wound*) di mana pisau atau pecahan masih menancap, <strong>jangan mencabutnya</strong> di TKP karena benda tersebut menahan aliran darah utama. Fiksasi posisinya dan bawa ke ER.
            </p>
          </div>

          <div className="rounded-sm border border-line bg-panel p-3.5 space-y-1">
            <h4 className="text-xs font-bold text-bone">
              3. Selalu Konfirmasi Jaw-Thrust
            </h4>
            <p className="text-[11px] text-dim leading-relaxed">
              Bila ada kecurigaan cedera tulang belakang (*Cervical Spine*), <strong>DILARANG</strong> melakukan <em>Head-Tilt</em> karena dapat merusak saraf leher permanen. Wajib gunakan <em>Jaw-Thrust maneuver</em>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
