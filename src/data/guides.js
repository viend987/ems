/**
 * Daftar Panduan dan Doktrin Medis / Server Rules.
 * Setiap modul guide mengupas tuntas satu topik teori, rules, dan prosedur
 * dengan simulator interaktif dan referensi pasal resmi.
 */

export const GUIDES = [
  {
    id: 'guide-pk',
    title: 'Ketentuan Player Kill (PK)',
    titleEn: 'Player Kill (PK) Regulations',
    badge: 'Doktrin & Rules',
    badgeEn: 'Doctrine & Rules',
    readTime: '6 min baca',
    readTimeEn: '6 min read',
    blurb:
      'Pedoman penentuan status kematian karakter (PK) berdasarkan Server Rules JGVRP dan kalkulasi medis LSFD: kriteria luka vital, standarisasi /chance, wewenang faksi, batas waktu bleeding 15 menit, dan sanksi server.',
    blurbEn:
      'Character death status (PK) regulations based on JGVRP Server Rules and LSFD medical calculation: vital wound criteria, /chance standardization, faction authority, 15-minute bleeding rule, and server penalties.',
    sections: [
      { id: 'calc', name: 'Kalkulator & Simulator PK', nameEn: 'PK Calculator & Simulator' },
      { id: 'concepts', name: 'Konsep Dasar (PK, CK, NLR, Down)', nameEn: 'Core Concepts (PK, CK, NLR, Down)' },
      { id: 'matrix', name: 'Tabel Kriteria PK Resmi LSFD', nameEn: 'Official LSFD PK Criteria Matrix' },
      { id: 'scheme', name: 'Skema Prosedur Life Support', nameEn: 'Life Support Procedure Scheme' },
      { id: 'authority', name: 'Wewenang & Hak Faksi / Player', nameEn: 'Faction & Player Authority' },
      { id: 'rules', name: 'Larangan Keras & Sanksi Server', nameEn: 'Strict Prohibitions & Server Penalties' },
      { id: 'qna', name: 'Tanya Jawab Medis & Kasus Lapangan', nameEn: 'Medical Q&A & Field Cases' },
    ],
    sources: [
      {
        title: 'Jogjagamers V Roleplay — Server Rules',
        author: 'tianmetal, Opick, Torque, Sinatrio',
        ref: 'Bab I, Pasal 4, Pasal 5, Pasal 8, Pasal 11, Pasal 21, Pasal 23',
      },
      {
        title: 'LSFD Operational — [GUIDE] Calculation to get Player Kill',
        author: 'Cavero Aliester (Bimo) & Caitlin Swenchjaeger (Bella)',
        ref: 'Topic #1239 LSFD Operational',
      },
    ],
  },
  {
    id: 'guide-anatomy',
    title: 'Terminologi Anatomi & Cedera',
    titleEn: 'Anatomy & Injury Terminology',
    badge: 'Anatomi & Medis',
    badgeEn: 'Anatomy & Medical',
    readTime: '5 min baca',
    readTimeEn: '5 min read',
    blurb:
      'Rujukan komprehensif istilah anatomi tubuh (Upper/Lower Extremity, Torso, Cranial, Cervical), jenis luka medis, titik perabaan pembuluh darah arteri, klasifikasi fraktur tulang, serta generator Doctor Report & radio emergency LSFD.',
    blurbEn:
      'Comprehensive reference for anatomical body regions (Upper/Lower Extremity, Torso, Cranial, Cervical), wound classifications, arterial pulse sites, bone fractures, and an interactive Doctor Report & radio dispatch generator.',
    sections: [
      { id: 'builder', name: 'Generator Doctor Report & Radio', nameEn: 'Doctor Report & Radio Generator' },
      { id: 'regions', name: 'Regio Anatomi Tubuh', nameEn: 'Anatomical Body Regions' },
      { id: 'wounds', name: 'Klasifikasi Jenis Luka', nameEn: 'Wound Classifications' },
      { id: 'arteries', name: 'Titik Arteri & Pendarahan', nameEn: 'Arterial Pressure Points' },
      { id: 'bones', name: 'Fraktur & Rujukan Tulang', nameEn: 'Fractures & Bone Reference' },
      { id: 'field-tips', name: 'Prosedur Klinis Lapangan', nameEn: 'Field Clinical Procedures' },
    ],
    sources: [
      {
        title: 'LSFD Field Academy Handbook — BLS & ILS Protocol',
        author: 'Los Santos Fire Department Recruitment & Academy',
        ref: 'Bab Trauma Management, DR-XABC, DEAT, Fracture Splinting',
      },
      {
        title: 'LSFD Hospital Division — Medical Terminology Guidelines',
        author: 'ASGH / CGH / PBH Trauma & Emergency Department',
        ref: 'Doctor Report Standardization & Emergency Radio Codes',
      },
    ],
  },
]

export const DEFAULT_GUIDE = 'guide-pk'

export function isGuideRoute(id) {
  return String(id).startsWith('guide-') || GUIDES.some((g) => g.id === id)
}
