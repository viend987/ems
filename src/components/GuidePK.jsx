import { useState } from 'preact/hooks'
import Icon from './Icon.jsx'
import {
  evaluatePk,
  GSW_LOCATIONS,
  PK_STATUS,
  simulateChanceRoll,
  WOUND_TYPES,
} from '../lib/pk-calculator.js'

export default function GuidePK({ lang }) {
  const isEn = lang === 'en'

  // Calculator state
  const [woundType, setWoundType] = useState('gsw')
  const [location, setLocation] = useState('torso')
  const [bullets, setBullets] = useState(3)
  const [survivalChance, setSurvivalChance] = useState(75)
  const [bleedExpired, setBleedExpired] = useState(false)
  const [medicArrived, setMedicArrived] = useState(false)
  const [explosionDrowningOnly, setExplosionDrowningOnly] = useState(false)

  // Simulator roll state
  const [rollResult, setRollResult] = useState(null)
  const [copiedCmd, setCopiedCmd] = useState(false)

  const evaluation = evaluatePk({
    woundType,
    location,
    bullets,
    survivalChance,
    bleedExpired,
    medicArrived,
    explosionDrowningOnly,
  })

  const handleRoll = () => {
    const target = evaluation.chanceCommand === '/chance 50' ? 50 : survivalChance
    const sim = simulateChanceRoll(target)
    setRollResult(sim)
  }

  const handleCopyCmd = () => {
    if (!evaluation.chanceCommand) return
    navigator.clipboard?.writeText(evaluation.chanceCommand)
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 1500)
  }

  const statusColors = {
    [PK_STATUS.AUTO_PK]: 'border-alarm bg-alarm/10 text-alarm',
    [PK_STATUS.CHANCE_PK]: 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    [PK_STATUS.NO_PK]: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  }

  const statusBadge = {
    [PK_STATUS.AUTO_PK]: isEn ? 'AUTO PK (MANDATORY DEATH)' : 'AUTO PK (OTOMATIS GUGUR / PK)',
    [PK_STATUS.CHANCE_PK]: isEn ? 'ELIGIBLE FOR PK VIA /CHANCE' : 'DAPAT PK MENGGUNAKAN /CHANCE',
    [PK_STATUS.NO_PK]: isEn ? 'CANNOT PK — /CHANCE FORBIDDEN' : 'TIDAK DAPAT PK — /CHANCE DILARANG',
  }

  return (
    <article className="mx-auto max-w-4xl space-y-12 pb-16">
      {/* Header Doktrin */}
      <header className="border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-muted">
          <span className="rounded-sm bg-panel px-2 py-0.5 border border-line">
            {isEn ? 'LSFD Operational Doctrine' : 'Doktrin Operasional LSFD'}
          </span>
          <span>•</span>
          <span>Topic #1239</span>
          <span>•</span>
          <span>JGVRP Server Rules Bab I & Pasal 11</span>
        </div>

        <h1 className="slab mt-3 text-3xl font-extrabold text-bone sm:text-4xl">
          {isEn ? 'Player Kill (PK) Regulations & Calculation' : 'Ketentuan & Kalkulasi Player Kill (PK)'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-dim sm:text-base">
          {isEn
            ? 'Official guide on character death determination, vital wound standardization, /chance percentage rules, and faction authority based on JGVRP Server Rules & LSFD Medical Protocol.'
            : 'Pedoman resmi penentuan status kematian karakter, standarisasi luka vital, persentase /chance, wewenang faksi, dan batas waktu 15 menit berdasarkan Server Rules JGVRP & Protokol Medis LSFD.'}
        </p>

        {/* Quick jump navigation */}
        <nav aria-label="Daftar Isi" className="mt-6 flex flex-wrap gap-1.5 text-[11px]">
          <a href="#calc" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="calculator" className="size-3 text-alarm" />
            <span>{isEn ? 'Interactive Calculator' : 'Kalkulator Interaktif'}</span>
          </a>
          <a href="#concepts" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="pin" className="size-3 text-alarm" />
            <span>{isEn ? 'PK vs CK vs NLR' : 'PK vs CK vs NLR'}</span>
          </a>
          <a href="#matrix" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="chart" className="size-3 text-alarm" />
            <span>{isEn ? 'Criteria Matrix' : 'Matriks Kriteria PK'}</span>
          </a>
          <a href="#scheme" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="pulse" className="size-3 text-alarm" />
            <span>{isEn ? 'Life Support Scheme' : 'Skema Prosedur LSFD'}</span>
          </a>
          <a href="#authority" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="scale" className="size-3 text-alarm" />
            <span>{isEn ? 'Faction Authority' : 'Wewenang Faksi'}</span>
          </a>
          <a href="#rules" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="warn" className="size-3 text-alarm" />
            <span>{isEn ? 'Prohibitions & Penalties' : 'Larangan & Sanksi'}</span>
          </a>
          <a href="#qna" className="flex items-center gap-1.5 rounded-sm border border-line bg-panel px-2.5 py-1 text-dim hover:border-alarm hover:text-bone">
            <Icon name="question" className="size-3 text-alarm" />
            <span>{isEn ? 'Field Q&A' : 'Tanya Jawab Kasus'}</span>
          </a>
        </nav>
      </header>

      {/* SEKSI 1: KALKULATOR & SIMULATOR PK INTERAKTIF */}
      <section id="calc" className="scroll-mt-6 rounded-md border border-line bg-panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-alarm uppercase">Interactive Tool</span>
            <h2 className="slab text-xl font-bold text-bone sm:text-2xl">
              {isEn ? 'PK Status Calculator & Chance Simulator' : 'Kalkulator Status PK & Simulator /chance'}
            </h2>
          </div>
          <span className="text-xs text-muted">
            {isEn ? 'Instant diagnosis based on /health & /inspect' : 'Diagnosa instan berdasar /health & /inspect'}
          </span>
        </div>

        {/* Input Form Simulator */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Kolom Kiri: Jenis Luka & Lokasi */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-bone">
                {isEn ? 'Primary Wound Type (/health)' : 'Jenis Luka Utama (/health)'}
              </label>
              <select
                value={woundType}
                onChange={(e) => setWoundType(e.target.value)}
                className="mt-1.5 w-full rounded-sm border border-line bg-ink px-3 py-2 text-xs text-bone focus:border-alarm focus:outline-none"
              >
                {WOUND_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {isEn ? t.nameEn : t.name}
                  </option>
                ))}
              </select>
            </div>

            {woundType === 'gsw' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-bone">
                    {isEn ? 'Bullet Location' : 'Lokasi Tembakan'}
                  </label>
                  <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                    {GSW_LOCATIONS.map((loc) => {
                      const active = location === loc.id
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setLocation(loc.id)}
                          className={`rounded-sm border px-2 py-2 text-center text-[11px] font-medium transition-colors ${
                            active
                              ? 'border-alarm bg-alarm text-white'
                              : 'border-line bg-ink text-dim hover:border-muted hover:text-bone'
                          }`}
                        >
                          {loc.id === 'head' ? 'Kepala (Head)' : loc.id === 'torso' ? 'Dada (Torso)' : 'Tangan / Kaki'}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-bone">
                      {isEn ? 'Number of Bullets (GSW Count)' : 'Jumlah Peluru (Jumlah GSW)'}
                    </label>
                    <span className="text-xs font-bold text-alarm">{bullets} Peluru</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={bullets}
                      onInput={(e) => setBullets(Number(e.target.value))}
                      className="w-full accent-alarm cursor-pointer"
                    />
                    <div className="flex gap-1">
                      {[1, 2, 3, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setBullets(n)}
                          className={`rounded border px-2 py-0.5 text-[10px] ${
                            bullets === n ? 'border-alarm bg-alarm text-white' : 'border-line bg-ink text-muted'
                          }`}
                        >
                          {n}x
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    {location === 'head'
                      ? (isEn ? 'Head: min. 1 bullet is vital' : 'Kepala: minimal 1 peluru tergolong Vital')
                      : location === 'torso'
                        ? (isEn ? 'Torso: min. 3 bullets is vital' : 'Torso: minimal 3 peluru tergolong Vital')
                        : (isEn ? 'Limbs: cannot PK' : 'Ekstremitas: tidak bisa PK')}
                  </p>
                </div>
              </>
            ) : woundType === 'burns' ? (
              <div className="rounded-sm border border-line bg-ink p-3 text-[11px] text-dim">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={explosionDrowningOnly}
                    onChange={(e) => setExplosionDrowningOnly(e.target.checked)}
                    className="accent-alarm"
                  />
                  <span>{isEn ? 'Victim down due to pure explosion without bullets' : 'Korban roboh akibat ledakan murni tanpa luka tembak'}</span>
                </label>
              </div>
            ) : null}

            {/* Kondisi Khusus / Bleeding Checkbox */}
            <div className="space-y-2 rounded-sm border border-line bg-ink p-3">
              <span className="block text-[11px] font-bold text-muted uppercase tracking-wider">
                {isEn ? 'Special Case Conditions' : 'Kondisi Khusus'}
              </span>
              <label className="flex items-center gap-2 text-xs text-dim cursor-pointer">
                <input
                  type="checkbox"
                  checked={bleedExpired}
                  onChange={(e) => setBleedExpired(e.target.checked)}
                  className="accent-alarm"
                />
                <span>{isEn ? 'Bleeding > 15 minutes with NO medical RP' : 'Bleeding > 15 menit tanpa ada penanganan RP sama sekali'}</span>
              </label>

              {bleedExpired && (
                <label className="flex items-center gap-2 text-xs text-dim cursor-pointer pl-5 border-l-2 border-line">
                  <input
                    type="checkbox"
                    checked={medicArrived}
                    onChange={(e) => setMedicArrived(e.target.checked)}
                    className="accent-alarm"
                  />
                  <span className="text-muted">
                    {isEn ? 'LSFD / Medical responder has arrived at scene' : 'Petugas LSFD / Penolong medis sudah tiba di TKP'}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Survival Chance & Verdict Box */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-bone">
                  {isEn ? 'Survival Chance (/health)' : 'Survival Chance di /health'}
                </label>
                <span className={`text-sm font-extrabold ${survivalChance <= 50 ? 'text-alarm' : 'text-emerald-500'}`}>
                  {survivalChance}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={survivalChance}
                onInput={(e) => setSurvivalChance(Number(e.target.value))}
                className="mt-1.5 w-full accent-alarm cursor-pointer"
              />
              <div className="mt-1.5 flex gap-1.5">
                {[75, 60, 50, 45, 20].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSurvivalChance(val)}
                    className={`flex-1 rounded border py-1 text-center text-[10px] font-mono transition-colors ${
                      survivalChance === val ? 'border-alarm bg-alarm text-white' : 'border-line bg-ink text-muted hover:text-bone'
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* HASIL DIAGNOSIS / VERDICT */}
            <div className={`rounded-sm border p-4 space-y-3 ${statusColors[evaluation.status]}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {statusBadge[evaluation.status]}
                </span>
                {evaluation.isVital && (
                  <span className="rounded bg-alarm/20 px-1.5 py-0.5 text-[10px] font-bold text-alarm">
                    VITAL WOUND
                  </span>
                )}
              </div>

              <h3 className="slab text-lg font-bold text-bone">
                {isEn ? evaluation.titleEn : evaluation.titleId}
              </h3>

              <p className="text-xs leading-relaxed text-dim">
                {isEn ? evaluation.reasonEn : evaluation.reasonId}
              </p>

              <div className="rounded border border-line/40 bg-ink/70 p-2.5 text-xs text-bone">
                <span className="font-semibold text-dim">{isEn ? 'Required Action: ' : 'Tindakan Wajib: '}</span>
                <span>{isEn ? evaluation.actionEn : evaluation.actionId}</span>
              </div>

              {evaluation.chanceCommand && (
                <div className="flex items-center justify-between gap-2 rounded bg-ink px-3 py-2 border border-line">
                  <div className="font-mono text-xs font-bold text-bone">
                    {evaluation.chanceCommand}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCmd}
                    className="rounded border border-line bg-panel px-2.5 py-1 text-[11px] text-dim hover:border-alarm hover:text-bone"
                  >
                    {copiedCmd ? (isEn ? 'Copied!' : 'Tersalin!') : (isEn ? 'Copy Command' : 'Salin Command')}
                  </button>
                </div>
              )}
            </div>

            {/* TEST ROLL SIMULATOR */}
            {evaluation.canChance && (
              <div className="rounded-sm border border-line bg-ink p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-bone">
                    {isEn ? 'Simulate In-Game /chance Roll' : 'Simulasi Roll /chance In-Game'}
                  </span>
                  <button
                    type="button"
                    onClick={handleRoll}
                    className="flex items-center gap-1.5 rounded bg-alarm px-3 py-1 text-xs font-bold text-white hover:opacity-90"
                  >
                    <Icon name="dice" className="size-3.5 shrink-0" />
                    <span>{isEn ? 'Roll /chance (1x)' : 'Roll /chance (1x)'}</span>
                  </button>
                </div>

                {rollResult && (
                  <div className={`mt-2 rounded p-2.5 text-xs border ${
                    rollResult.pass ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-alarm bg-alarm/10 text-alarm'
                  }`}>
                    <div className="font-bold flex items-center justify-between">
                      <span>HASIL: {rollResult.verdict} (D100: {rollResult.roll})</span>
                      <span>{rollResult.pass ? 'SELAMAT' : 'PLAYER KILL'}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed">
                      {isEn ? rollResult.textEn : rollResult.textId}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEKSI 2: KONSEP DASAR (PK vs CK vs NLR vs Brutally Wounded) */}
      <section id="concepts" className="scroll-mt-6 space-y-4">
        <h2 className="slab text-2xl font-bold text-bone sm:text-3xl border-b border-line pb-2">
          {isEn ? '1. Core Concepts: PK vs CK vs NLR vs Brutally Wounded' : '1. Konsep Dasar: PK vs CK vs NLR vs Brutally Wounded'}
        </h2>
        <p className="text-xs leading-relaxed text-dim sm:text-sm">
          {isEn
            ? 'Based on Jogjagamers V Roleplay Server Rules Chapter I and Article 11, players must clearly distinguish the four levels of injury and death.'
            : 'Berdasarkan Peraturan Dasar & Istilah serta Pasal 11 Server Rules JGVRP, setiap pemain wajib memahami perbedaan empat tingkatan status cedera dan kematian berikut:'}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Brutally Wounded */}
          <div className="rounded-sm border border-line bg-panel p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-alarm">STATUS: DOWN</span>
              <span className="text-[10px] text-muted">Pasal 5 Ayat 2d</span>
            </div>
            <h3 className="slab text-lg font-bold text-bone">Brutally Wounded (Injured)</h3>
            <p className="text-xs leading-relaxed text-dim">
              {isEn
                ? 'State where a character collapses and enters the injured stage (15-minute countdown before critical). Paramedics use /bls to prolong this. Accepting death to avoid RP with opponents is a violation (Refusing RP).'
                : 'Kondisi saat karakter roboh dan memasuki tahap injured (waktu 15 menit sebelum masuk tahap critical). Paramedis menggunakan /bls untuk memperpanjang waktu ini. Menerima kematian untuk menghindari RP dengan lawan adalah pelanggaran (Menolak Ajakan RP).'}
            </p>
          </div>

          {/* Player Kill (PK) */}
          <div className="rounded-sm border border-line bg-panel p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-500">SCENARIO DEATH</span>
              <span className="text-[10px] text-muted">Bab I & Pasal 11</span>
            </div>
            <h3 className="slab text-lg font-bold text-bone">Player Kill (PK)</h3>
            <p className="text-xs leading-relaxed text-dim">
              {isEn
                ? 'Character is declared dead for that specific RP event (shootout, severe accident). The player can still play the character afterward, but MUST forget the final RP events and everyone involved.'
                : 'Kondisi di mana karakter dinyatakan mati dalam satu aktivitas RP tertentu (shootout, perkelahian, kecelakaan). Karakter tetap dapat dimainkan kembali, namun WAJIB LUPA INGATAN terhadap alur RP terakhir dan orang-orang yang terlibat.'}
            </p>
          </div>

          {/* New Life Rule (NLR) */}
          <div className="rounded-sm border border-line bg-panel p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-500">OBLIGATION</span>
              <span className="text-[10px] text-muted">Pasal 11 Ayat 3 & 5</span>
            </div>
            <h3 className="slab text-lg font-bold text-bone">New Life Rule (NLR)</h3>
            <p className="text-xs leading-relaxed text-dim">
              {isEn
                ? 'Legal obligation after PK: player cannot return to the death location during NLR and cannot commit Revenge Kill (Article 23: killing past killer for vengeance is Powergaming).'
                : 'Kewajiban hukum setelah PK: pemain dilarang kembali ke lokasi terakhir mati selama masa NLR dan dilarang keras melakukan Revenge Kill (Pasal 23: membunuh pemain yang membunuhmu sebelumnya adalah Powergaming).'}
            </p>
          </div>

          {/* Character Kill (CK) */}
          <div className="rounded-sm border border-line bg-panel p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-500">PERMANENT DEATH</span>
              <span className="text-[10px] text-muted">Pasal 11 Ayat 1 & 2</span>
            </div>
            <h3 className="slab text-lg font-bold text-bone">Character Kill (CK)</h3>
            <p className="text-xs leading-relaxed text-dim">
              {isEn
                ? 'Permanent death of the character requiring OOC mutual consent, or unilateral CK during official Families & Gangs takedown, or Staff order. Character is retired and must perform Change Name (CN).'
                : 'Kematian permanen karakter yang membutuhkan persetujuan OOC kedua pihak, atau CK sepihak saat gugur dalam Takedown resmi Families & Gangs, atau perintah Staff. Karakter tidak bisa dimainkan lagi dan wajib Change Name (CN).'}
            </p>
          </div>
        </div>
      </section>

      {/* SEKSI 3: TABEL MATRIKS KRITERIA PK RESMI LSFD */}
      <section id="matrix" className="scroll-mt-6 space-y-4">
        <h2 className="slab text-2xl font-bold text-bone sm:text-3xl border-b border-line pb-2">
          {isEn ? '2. Official LSFD PK Criteria Matrix Table' : '2. Tabel Matriks Kriteria PK Resmi LSFD'}
        </h2>
        <p className="text-xs leading-relaxed text-dim sm:text-sm">
          {isEn
            ? 'Based on LSFD Operational Guide #1239, /chance is used strictly according to the following standardized matrix to prevent non-constructive debates:'
            : 'Berdasarkan LSFD Operational Guide #1239, fitur /chance hanya digunakan secara terstandarisasi untuk mencegah perdebatan tidak solutif antara korban dan paramedis:'}
        </p>

        <div className="overflow-x-auto rounded-sm border border-line bg-panel">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-line bg-raise text-bone">
                <th className="p-3 font-bold">{isEn ? 'Wound Type' : 'Jenis Luka'}</th>
                <th className="p-3 font-bold">{isEn ? 'Survival Chance' : 'Survival Chance'}</th>
                <th className="p-3 font-bold text-center">{isEn ? 'PK Status' : 'Status PK'}</th>
                <th className="p-3 font-bold">{isEn ? 'Mandatory Regulation & Protocol' : 'Ketentuan & Prosedur Wajib'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="hover:bg-raise/40">
                <td className="p-3 font-medium text-bone">Fleshwound</td>
                <td className="p-3 font-mono">&gt; 50%</td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <Icon name="cross" className="size-2.5 shrink-0" />
                    <span>{isEn ? 'No PK' : 'Tidak PK'}</span>
                  </span>
                </td>
                <td className="p-3 text-dim">
                  {isEn
                    ? 'Cannot PK. /chance is strictly FORBIDDEN. Continue to D.E.A.T procedure.'
                    : 'Tidak dapat PK. /chance TIDAK BISA digunakan. Paramedis wajib lanjut ke prosedur D.E.A.T.'}
                </td>
              </tr>

              <tr className="hover:bg-raise/40">
                <td className="p-3 font-medium text-bone">Fleshwound</td>
                <td className="p-3 font-mono">&le; 50%</td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 font-bold text-amber-600 dark:text-amber-400">
                    <Icon name="check" className="size-2.5 shrink-0" />
                    <span>{isEn ? 'Can PK' : 'Dapat PK'}</span>
                  </span>
                </td>
                <td className="p-3 text-dim">
                  {isEn
                    ? 'Eligible for PK via /chance according to exact survival chance (e.g. /chance 45). 1 attempt only.'
                    : 'Dapat PK dengan menggunakan /chance disesuaikan angka survival chance (misal /chance 45). Dilakukan 1 kali.'}
                </td>
              </tr>

              <tr className="bg-alarm/5 hover:bg-alarm/10">
                <td className="p-3 font-bold text-alarm">Vital Wound</td>
                <td className="p-3 font-mono font-bold text-alarm">&lt; 50%</td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded bg-alarm text-white px-2 py-0.5 font-bold">
                    <Icon name="check" className="size-2.5 shrink-0" />
                    <span>AUTO PK</span>
                  </span>
                </td>
                <td className="p-3 text-alarm font-medium">
                  {isEn
                    ? 'Automatic PK (AUTO PK). Command /chance is NOT used. Massive vital trauma.'
                    : 'Korban dinyatakan PK OTOMATIS (Auto PK). Fitur /chance TIDAK PERLU digunakan.'}
                </td>
              </tr>

              <tr className="hover:bg-raise/40">
                <td className="p-3 font-medium text-bone">Vital Wound</td>
                <td className="p-3 font-mono">&ge; 50%</td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 font-bold text-amber-600 dark:text-amber-400">
                    <Icon name="check" className="size-2.5 shrink-0" />
                    <span>{isEn ? 'Can PK' : 'Dapat PK'}</span>
                  </span>
                </td>
                <td className="p-3 text-dim">
                  {isEn
                    ? 'Eligible for PK IF: Min. 1 bullet on head OR Min. 3 bullets on torso. Must use /chance 50.'
                    : 'Dapat PK JIKA: Min. 1 GSW di Head ATAU Min. 3 GSW di Torso. Wajib menggunakan perintah /chance 50.'}
                </td>
              </tr>

              {['Graze (Luka Lecet)', 'Bone Fracture (Patah Tulang)', 'Dislocated (Keseleo)', 'Cut Wound (Luka Tusuk)', 'Burns (Luka Bakar)', 'Bruise (Memar)'].map((name) => (
                <tr key={name} className="hover:bg-raise/40 text-muted">
                  <td className="p-3 font-medium">{name}</td>
                  <td className="p-3 font-mono">&gt; / &lt; 50%</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 rounded bg-line px-2 py-0.5 font-bold text-muted">
                      <Icon name="cross" className="size-2.5 shrink-0" />
                      <span>{isEn ? 'Forbidden' : 'Dilarang'}</span>
                    </span>
                  </td>
                  <td className="p-3">
                    {isEn
                      ? 'Cannot PK. /chance CANNOT BE USED. Standard medical treatment applies.'
                      : 'Tidak dapat PK. /chance TIDAK BISA DIGUNAKAN. Wajib penanganan medis standar.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEKSI 4: SKEMA PROSEDUR LIFE SUPPORT LSFD */}
      <section id="scheme" className="scroll-mt-6 space-y-4">
        <h2 className="slab text-2xl font-bold text-bone sm:text-3xl border-b border-line pb-2">
          {isEn ? '3. Life Support Scheme & Medical Protocols' : '3. Skema Prosedur Life Support & Protokol Medis'}
        </h2>
        <p className="text-xs leading-relaxed text-dim sm:text-sm">
          {isEn
            ? 'The official sequence of on-scene emergency medical care for LSFD responders:'
            : 'Rantai alur baku penanganan korban di tempat kejadian perkara (TKP) oleh petugas LSFD:'}
        </p>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 1</span>
            <div className="slab text-sm font-bold text-bone mt-1">DANGER</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Perimeter security check' : 'Periksa perimeter TKP'}</p>
          </div>

          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 2</span>
            <div className="slab text-sm font-bold text-bone mt-1">RESPONSE</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Verbal & tactile stimuli' : 'Rangsangan suara & sentuh'}</p>
          </div>

          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 3</span>
            <div className="slab text-sm font-bold text-bone mt-1">DIAGNOSIS</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Examine /inspect & /health' : 'Periksa luka & peluru'}</p>
          </div>

          <div className="rounded border border-amber-500/50 bg-amber-500/5 p-3 text-center">
            <span className="text-[10px] font-bold text-amber-500">TITIK EVALUASI</span>
            <div className="slab text-sm font-bold text-bone mt-1">/CHANCE</div>
            <p className="mt-1 text-[11px] text-dim">{isEn ? 'OOC consent, 1 attempt' : 'Izin OOC, 1x percobaan'}</p>
          </div>

          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 4</span>
            <div className="slab text-sm font-bold text-bone mt-1">D.E.A.T</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Direct Pressure, Tourniquet' : 'Balut tekan & tourniquet'}</p>
          </div>

          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 5</span>
            <div className="slab text-sm font-bold text-bone mt-1">A.B.C</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Airway, Breathing, Pulse' : 'Jalan nafas, BVM, Nadi'}</p>
          </div>

          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 6</span>
            <div className="slab text-sm font-bold text-bone mt-1">EXTRACTION</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Backboard / Gurney' : 'Papan spinal & tandu'}</p>
          </div>

          <div className="rounded border border-line bg-panel p-3 text-center">
            <span className="text-[10px] font-bold text-alarm">LANGKAH 7</span>
            <div className="slab text-sm font-bold text-bone mt-1">TRANSPORT</div>
            <p className="mt-1 text-[11px] text-muted">{isEn ? 'Evacuate once ABC clear' : 'Evakuasi saat ABC clear'}</p>
          </div>
        </div>

        {/* Aturan Farmakologi Jantung */}
        <div className="rounded-sm border border-line bg-panel p-4 space-y-2">
          <h3 className="slab text-base font-bold text-bone">
            {isEn ? 'Emergency Cardiac Pharmacology Protocol' : 'Protokol Farmakologi Denyut Jantung Darurat'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded border border-line bg-ink p-3">
              <span className="font-bold text-alarm">Denyut Nadi 0 — 10 BPM</span>
              <p className="mt-1 text-dim">
                {isEn ? 'Directly administer 1x Epinephrine to restart cardiac rhythm.' : 'Langsung berikan Epinephrine 1x untuk memicu kembali pacu jantung.'}
              </p>
            </div>
            <div className="rounded border border-line bg-ink p-3">
              <span className="font-bold text-blue-500">Denyut Nadi &gt; 10 BPM</span>
              <p className="mt-1 text-dim">
                {isEn ? 'Administer Atropine to raise heart rate toward normal.' : 'Cukup berikan Atropine untuk menaikkan denyut nadi ke ambang normal.'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded border border-alarm/30 bg-alarm/5 p-2.5 text-[11px] text-alarm font-medium">
            <Icon name="warn" className="size-4 shrink-0 mt-0.5" />
            <div>
              <strong>ATURAN MUTLAK:</strong> Atropine dan Epinephrine HANYA UNTUK SEKALI DIGUNAKAN. DILARANG KERAS mencampur atau memberikan kedua obat sekaligus pada satu pasien.
            </div>
          </div>
        </div>
      </section>

      {/* SEKSI 5: WEWENANG & HAK ANTAR FAKSI */}
      <section id="authority" className="scroll-mt-6 space-y-4">
        <h2 className="slab text-2xl font-bold text-bone sm:text-3xl border-b border-line pb-2">
          {isEn ? '4. Faction Authority & Player Standing' : '4. Wewenang & Hak Faksi / Player'}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-sm border border-line bg-panel p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-alarm" />
              <h3 className="slab text-base font-bold text-bone">Los Santos Fire Dept (LSFD)</h3>
            </div>
            <p className="text-dim leading-relaxed">
              {isEn
                ? 'Authorized medical authority holding the jurisdiction to execute /chance according to the calculation table. Must ask OOC permission first and explain PASS=Survives, FAIL=PK.'
                : 'Pemegang wewenang medis resmi di server. Berhak menggunakan perintah /chance sesuai panduan kalkulasi. Wajib meminta izin OOC terlebih dahulu via /pm atau /b dan menjelaskan arti PASS=selamat serta FAIL=PK.'}
            </p>
          </div>

          <div className="rounded-sm border border-line bg-panel p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-600" />
              <h3 className="slab text-base font-bold text-bone">Law Enforcement (LSPD / LSSD)</h3>
            </div>
            <p className="text-dim leading-relaxed">
              {isEn
                ? 'May only use NPC Mode IF NO LSFD IS ONLINE, provided the suspect has NO brutal wounds to vital parts (head, brain, neck, torso). If suspect roleplays normal conditions, NPC mode is fully permitted.'
                : 'Hanya boleh menggunakan NPC Mode JIKA TIDAK ADA ANGGOTA LSFD ONLINE, dan suspect TIDAK memiliki luka brutal pada bagian vital (head, brain, neck, torso). Jika korban meroleplaykan kondisi normal, sangat diperbolehkan.'}
            </p>
          </div>

          <div className="rounded-sm border border-line bg-panel p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-purple-500" />
              <h3 className="slab text-base font-bold text-bone">Families & Gangs (FnG)</h3>
            </div>
            <p className="text-dim leading-relaxed">
              {isEn
                ? 'FnG members are permitted and have the standing to conduct RP PK if it has been roleplayed out by their opponents during gang conflict.'
                : 'Anggota faksi FnG dapat dan berhak melakukan roleplay PK jika telah di-roleplay-kan oleh lawannya dalam alur konflik antar-geng / kriminalitas.'}
            </p>
          </div>

          <div className="rounded-sm border border-line bg-panel p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-slate-400" />
              <h3 className="slab text-base font-bold text-bone">Warga Sipil / Non-Faction</h3>
            </div>
            <p className="text-dim leading-relaxed">
              {isEn
                ? 'Strictly FORBIDDEN from using /chance in any roleplay scenario. Civil players have no right to force PK upon opponents or unilaterally declare PK on themselves.'
                : 'DILARANG KERAS menggunakan command /chance dalam situasi roleplay apapun. Warga sipil tidak berhak melakukan PK kepada lawan roleplaynya maupun memaksakan PK sepihak pada diri sendiri.'}
            </p>
          </div>
        </div>
      </section>

      {/* SEKSI 6: LARANGAN KERAS & SANKSI SERVER */}
      <section id="rules" className="scroll-mt-6 space-y-4">
        <h2 className="slab text-2xl font-bold text-bone sm:text-3xl border-b border-line pb-2">
          {isEn ? '5. Strict Prohibitions & Server Penalties' : '5. Larangan Keras & Sanksi Server'}
        </h2>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="rounded-sm border-l-4 border-alarm bg-panel p-4 space-y-1">
            <h3 className="slab text-base font-bold text-bone">
              {isEn ? 'Prohibition of Force RP Post-/chance' : 'Larangan Force RP Pasca-Roll /chance'}
            </h3>
            <p className="text-dim">
              {isEn
                ? 'Player is NOT permitted to force death (Force RP PK) once /chance has resulted in PASS. A PASS verdict means the paramedics successfully resuscitated the victim.'
                : 'Pemain TIDAK DIPERBOLEHKAN memaksakan roleplay PK (Force RP) setelah hasil /chance menunjukkan PASS (Selamat). Paramedis resmi berhasil menyelamatkan korban.'}
            </p>
          </div>

          <div className="rounded-sm border-l-4 border-alarm bg-panel p-4 space-y-1">
            <h3 className="slab text-base font-bold text-bone">
              {isEn ? 'The 15-Minute Bleeding Rule Voidance' : 'Batalnya Aturan 15 Menit Bleeding Saat Petugas Hadir'}
            </h3>
            <p className="text-dim">
              {isEn
                ? 'While 15 minutes of unresponded bleeding allows PK, the arrival of LSFD, LSPD, LSSD, or a Life Support Certify Holder IMMEDIATELY VOIDS the timer. Players cannot claim PK if responders arrived before or at the 15-minute mark.'
                : 'Meskipun bleeding 15 menit tanpa respon mengizinkan PK, kehadiran LSFD, LSPD, LSSD, atau Life Support Holder SEKETIKA MENGGUGURKAN perhitungan menit tersebut. Korban tidak bisa menuntut PK atas dalih "sudah lewat 15 menit" jika penolong sudah berada di TKP.'}
            </p>
          </div>

          <div className="rounded-sm border-l-4 border-alarm bg-panel p-4 space-y-1">
            <h3 className="slab text-base font-bold text-bone">
              {isEn ? 'Fabrication of Congenital Disease (Invalid RPLY)' : 'Larangan Mengarang Riwayat Penyakit Mendadak (RPLY Invalid)'}
            </h3>
            <p className="text-dim">
              {isEn
                ? 'Roleplaying congenital illnesses (heart failure, asthma, cancer) to increase PK chances is ONLY valid with prior verified medical RP history with LSFD doctors (chatlog/SS). Fabricating "*RPly has weak heart since birth" during an active PK debate is strictly invalid and punishable.'
                : 'Mengaku memiliki penyakit bawaan (jantung lemah, asma, tumor) untuk menaikkan kans PK HANYA SAH jika ada riwayat character development konsisten yang pernah didiagnosa dokter LSFD sebelumnya (ada bukti chatlog/SS). Mengarang secara mendadak saat debat PK adalah pelanggaran.'}
            </p>
          </div>

          <div className="rounded-sm border border-line bg-panel p-4">
            <span className="text-[10px] font-bold text-muted uppercase">Rujukan Pasal Server Rules JGVRP:</span>
            <ul className="mt-2 space-y-1 text-dim list-disc list-inside">
              <li><strong>Pasal 5 Ayat 2d:</strong> Menerima kematian saat brutally wounded untuk menghindari RP = Penjara 15 menit s/d 3 jam.</li>
              <li><strong>Pasal 11 Ayat 3 & 5:</strong> Melanggar New Life Rule (NLR) = Hukuman setara Powergaming (Pasal 23: Penjara 10 menit s/d 2 jam).</li>
              <li><strong>Pasal 21:</strong> Deathmatch (DM) — Membunuh tanpa alasan RP yang jelas dan masuk akal = Penjara 15 s/d 90 menit.</li>
              <li><strong>Pasal 23 Ayat 2d:</strong> Revenge Kill — Membunuh pemain yang sebelumnya membunuhmu untuk membalas dendam = Powergaming.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEKSI 7: FAQ & STUDI KASUS LAPANGAN */}
      <section id="qna" className="scroll-mt-6 space-y-4">
        <h2 className="slab text-2xl font-bold text-bone sm:text-3xl border-b border-line pb-2">
          {isEn ? '6. Field Medical Q&A & Case Studies' : '6. Tanya Jawab Medis & Studi Kasus Lapangan'}
        </h2>

        <div className="space-y-3">
          {[
            {
              q: 'Pada struktur health atau /inspect tidak pernah ada tulisan luka "vital", bagaimana mengetahuinya?',
              a: 'Benar, status luka vital ditandai dengan kode GSW dan standarisasi jumlah peluru: minimal 1x GSW pada Kepala, atau minimal 3x GSW pada Torso.',
            },
            {
              q: 'Bagaimana jika luka vital memiliki Survival Chance lebih dari 50%, apakah bisa PK?',
              a: 'Bisa, diberikan kesempatan roll dengan menurunkan survival chance menjadi 50%, sehingga wajib menggunakan perintah /chance 50.',
            },
            {
              q: 'Apakah korban boleh meminta /chance dilakukan di akhir roleplay?',
              a: 'Boleh. Lawan RP berhak meminta /chance dilakukan di akhir setelah selesai rangkaian tindakan RP, asalkan memenuhi kriteria PK Criteria Table.',
            },
            {
              q: 'Apakah bisa meroleplaykan PK karena ledakan atau tenggelam?',
              a: 'Mati karena ledakan atau tenggelam tidak bisa serta merta dijadikan alasan otomatis untuk PK. LSFD tetap mengkondisikan sesuai status /health. Jika korban juga memiliki luka tembak, kembali ke aturan Bullet Wound.',
            },
            {
              q: 'Apakah saya bisa PK jika hanya mengalami luka Flesh Wound di kaki atau tangan?',
              a: 'Tidak bisa. Tidak ada organ vital pada kaki atau tangan yang menghilangkan fungsi denyut nadi. Risiko terburuknya adalah amputasi atau cacat fisik permanen.',
            },
            {
              q: 'Berapa perbandingan probabilitas dalam roll /chance?',
              a: 'Rasio 1:2 (50% kemungkinan sukses/PASS dan 50% kemungkinan gagal/FAIL). Kedua belah pihak mendapatkan peluang yang adil dan sama besar.',
            },
          ].map((item, idx) => (
            <details key={idx} className="group rounded-sm border border-line bg-panel p-3.5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-xs text-bone">
                <span>{item.q}</span>
                <span className="ml-2 text-muted transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2.5 text-xs leading-relaxed text-dim border-t border-line/40 pt-2.5">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </article>
  )
}
