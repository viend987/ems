/**
 * Teks antarmuka dalam dua bahasa. Dua objek datar dengan kunci yang sama;
 * `strings.test.js` gagal kalau ada kunci yang cuma punya satu bahasa atau
 * bentuknya beda (teks di satu sisi, fungsi di sisi lain).
 *
 * Yang di sini cuma label situs. Nama tag BBCode **tidak** ada di sini: ia
 * memang selalu Inggris karena itu nama tagnya sendiri — lihat `bbcode-tags.js`.
 */

const id = {
  // Kepala halaman
  tagline: 'Panduan RP ketik LSFD di JGVRP. Klik barisnya, teksnya masuk clipboard.',
  stepCount: (n) => `${n} baris siap salin`,
  toDark: 'Ganti ke tema gelap',
  toLight: 'Ganti ke tema terang',
  toEnglish: 'Switch to English',
  toIndonesian: 'Ganti ke bahasa Indonesia',
  langShort: 'ID',

  // Navigasi
  navCategories: 'Kategori prosedur',
  navSections: 'Bagian dalam kategori ini',

  // Menyalin
  copyHint: 'Klik untuk menyalin',
  copyHintCode: 'Klik untuk menyalin kodenya',
  copied: 'tersalin',
  copyFailedShort: 'gagal',
  copyFailedLong: 'gagal menyalin',
  reused: 'ulang',
  copyAll: 'Salin semua',
  copiedAllCount: (n) => `${n} baris tersalin`,
  liveCopied: 'Teks tersalin ke clipboard.',
  liveFailed: 'Gagal menyalin. Salin manual dari baris.',

  // Pencarian
  searchPlaceholder: 'Cari teks atau nomor',
  searchLabel: 'Cari teks RP atau nomor shortcut',
  searchHits: (n) => `${n} baris cocok`,
  searchNone: 'Tidak ada yang cocok',
  searchBack: 'Kembali ke papan',
  searchEmpty: (q) =>
    `Tidak ada baris yang memuat “${q}”. Coba potongan kata yang lebih pendek, atau pilih kategorinya langsung dari papan.`,

  footer:
    'Fan-made tool by JGVRP Player. Based on LSFD Handbook Procedure + Some Adjustments· JGVRP',

  // BBCode Builder
  bbEditor: 'Editor BBCode',
  bbPlaceholder: 'Racik BBCode di sini, atau mulai dari tombol di atas.',
  bbPreview: 'Pratinjau',
  bbCopy: 'Salin BBCode',
  bbCopied: 'Tersalin',
  bbCopyFailed: 'Gagal menyalin',
  bbLoadExample: 'Muat contoh',
  bbClear: 'Kosongkan',
  bbClearConfirm: 'Kosongkan editor? Racikan sekarang akan hilang.',
  bbChars: (n) => `${n} karakter`,

  // Patrol Log
  plResult: 'Hasil laporan',
  plTabs: 'Tampilan hasil',
  plBbcodeLabel: 'BBCode laporan',
  plNewReport: 'Laporan baru',
  plNewConfirm: 'Kosongkan form untuk laporan baru? Nama anggota tetap dipilih.',
  plMember: 'Nama anggota',
  plCrewHint: 'Kosongkan atau biarkan N/A kalau duty sendiri.',
  plActivityHint: 'Ceritakan patroli ke mana saja dan apa yang dikerjakan selama duty.',
  plDuration: (formatted) => `Durasi duty: ${formatted}`,
  plMinimum: (minutes) => ` — minimal ${minutes} menit`,
  plMidnight: ' (melewati tengah malam)',
  plImageOf: (label) => `Gambar ${label}`,
  plImageLinkOf: (label) => `Link gambar ${label}`,
  plProofOf: (label) => `Bukti ${label}`,
  plOpenImage: 'Buka gambar di tab baru',
  plImageHint: 'Tempel link gambar langsung, mis. https://i.imgur.com/xxxx.jpeg.',
  plImageIsPage: 'Ini link halaman, bukan gambar. Buka gambarnya, klik kanan, lalu "Copy image address".',
  plImageNotLink: 'Kolom ini hanya menerima link (diawali https://), bukan teks biasa.',
  plImageBroken:
    'Gambar dari link ini tidak bisa dimuat. Pastikan link-nya mengarah langsung ke gambar.',
  plImageLoading: 'Memuat pratinjau…',
  plImageOk: 'Gambar termuat.',

  // Formulir laporan umum
  reportPreviewTab: 'Pratinjau',
  reportBbcodeTab: 'Kode BBCode',
  reportCopyBbcode: 'Salin BBCode',
  reportCopied: 'Tersalin',
  reportCopyFailed: 'Gagal menyalin',
  reportNew: 'Laporan baru',
  reportAddImage: 'Tambah link gambar',
  reportRemove: 'Hapus',

  // Mode switcher & Guide
  modeOps: 'Operasional',
  modeGuide: 'Buku Panduan',
  modeOpsDesc: 'Prosedur lapangan & salin baris RP cepat',
  modeGuideDesc: 'Panduan, rules server & kalkulator interaktif',
  guideNavTitle: 'Daftar Panduan',
  guideSectionsTitle: 'Daftar Isi Panduan',
  guideUpcoming: 'Segera Hadir',
  guideSource: 'Sumber Rujukan Resmi',
  guideBackToOps: 'Kembali ke Operasional',
}

const en = {
  tagline: 'Typing-RP guide for LSFD on JGVRP. Click a row and the text is on your clipboard.',
  stepCount: (n) => `${n} lines ready to copy`,
  toDark: 'Switch to the dark theme',
  toLight: 'Switch to the light theme',
  toEnglish: 'Switch to English',
  toIndonesian: 'Ganti ke bahasa Indonesia',
  langShort: 'EN',

  navCategories: 'Procedure categories',
  navSections: 'Sections in this category',

  copyHint: 'Click to copy',
  copyHintCode: 'Click to copy the code',
  copied: 'copied',
  copyFailedShort: 'failed',
  copyFailedLong: 'copy failed',
  reused: 'repeat',
  copyAll: 'Copy all',
  copiedAllCount: (n) => `${n} lines copied`,
  liveCopied: 'Text copied to clipboard.',
  liveFailed: 'Copy failed. Copy it from the row by hand.',

  searchPlaceholder: 'Search text or number',
  searchLabel: 'Search RP text or shortcut number',
  searchHits: (n) => `${n} matching lines`,
  searchNone: 'Nothing matches',
  searchBack: 'Back to the board',
  searchEmpty: (q) =>
    `No line contains “${q}”. Try a shorter fragment, or pick the category straight from the board.`,

  footer:
    'Fan-made tool by JGVRP Player. Based on LSFD Handbook Procedure + Some Adjustments· JGVRP',

  bbEditor: 'BBCode editor',
  bbPlaceholder: 'Write BBCode here, or start from the buttons above.',
  bbPreview: 'Preview',
  bbCopy: 'Copy BBCode',
  bbCopied: 'Copied',
  bbCopyFailed: 'Copy failed',
  bbLoadExample: 'Load example',
  bbClear: 'Clear',
  bbClearConfirm: 'Clear the editor? What you have written will be lost.',
  bbChars: (n) => `${n} characters`,

  plResult: 'Report output',
  plTabs: 'Output view',
  plBbcodeLabel: 'Report BBCode',
  plNewReport: 'New report',
  plNewConfirm: 'Clear the form for a new report? The member stays selected.',
  plMember: 'Member name',
  plCrewHint: 'Leave it empty or as N/A if you were on duty alone.',
  plActivityHint: 'Describe where you patrolled and what you did during the duty.',
  plDuration: (formatted) => `Duty length: ${formatted}`,
  plMinimum: (minutes) => ` — ${minutes} minutes minimum`,
  plMidnight: ' (crosses midnight)',
  plImageOf: (label) => `${label} screenshot`,
  plImageLinkOf: (label) => `${label} screenshot link`,
  plProofOf: (label) => `${label} proof`,
  plOpenImage: 'Open the image in a new tab',
  plImageHint: 'Paste a direct image link, e.g. https://i.imgur.com/xxxx.jpeg.',
  plImageIsPage:
    'That is a page link, not an image. Open the image, right-click, then "Copy image address".',
  plImageNotLink: 'This field only takes a link starting with https://, not plain text.',
  plImageBroken: 'The image at this link will not load. Make sure it points straight at the image.',
  plImageLoading: 'Loading preview…',
  plImageOk: 'Image loaded.',

  // Common report form
  reportPreviewTab: 'Preview',
  reportBbcodeTab: 'BBCode',
  reportCopyBbcode: 'Copy BBCode',
  reportCopied: 'Copied',
  reportCopyFailed: 'Copy failed',
  reportNew: 'New report',
  reportAddImage: 'Add image link',
  reportRemove: 'Remove',

  // Mode switcher & Guide
  modeOps: 'Operations',
  modeGuide: 'Field Guide',
  modeOpsDesc: 'Field procedures & fast RP copy',
  modeGuideDesc: 'Guides, server rules & interactive calculators',
  guideNavTitle: 'Guide Index',
  guideSectionsTitle: 'Table of Contents',
  guideUpcoming: 'Coming Soon',
  guideSource: 'Official References',
  guideBackToOps: 'Back to Operations',
}

const DICT = { id, en }

/** Semua teks antarmuka untuk satu bahasa: `const s = strings(lang)`. */
export function strings(lang) {
  return DICT[lang] ?? DICT.id
}

export const KEYS = Object.keys(id)
export { DICT }
