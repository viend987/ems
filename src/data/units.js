// Daftar unit LSFD beserta callsign dan kendaraannya.
//
// `images` berisi id berkas di src/assets/units/ tanpa ekstensi — hasil dari
// `npm run units`. Unit yang fotonya belum ada cukup dibiarkan tanpa `images`;
// kartunya tetap tampil dengan callsign dan keterangannya.

export default {
  id: 'units',
  group: 'referensi',
  name: 'Unit LSFD',
  blurb: 'Callsign, kendaraan, dan kapan tiap unit dipakai.',
  fleet: [
    {
      id: 'emergency',
      name: 'Emergency Unit',
      blurb: 'Dipakai saat ada situasi darurat yang butuh peralatan khusus.',
      units: [
        {
          callsign: 'ENGINE',
          vehicle: 'Fire Engine',
          images: ['engine'],
          desc: 'Unit pemadam utama. Membawa air, crosslay line, dan alat ekstrikasi — jadi tulang punggung hampir semua scene kebakaran dan MVA.',
        },
        {
          callsign: 'BRUSH',
          vehicle: 'Bison S Truck',
          images: ['brush'],
          desc: 'Pemadam medan sulit. Dipakai untuk kebakaran lahan dan semak di luar kota yang tidak bisa dijangkau Engine.',
        },
        {
          callsign: 'SQUAD',
          vehicle: 'Rescue Truck',
          images: ['squad'],
          desc: 'Technical rescue. Membawa alat berat untuk ekstrikasi rumit, ruang sempit, dan penyelamatan bertali.',
        },
        {
          callsign: 'HAZMAT',
          vehicle: 'Hazmat Heavy Truck',
          images: ['hazmat'],
          desc: 'Penanganan bahan berbahaya. Membawa APD khusus dan perlengkapan dekontaminasi untuk tumpahan atau kebocoran kimia.',
        },
        {
          callsign: 'USAR',
          vehicle: 'MonstroCiti',
          images: ['usar'],
          desc: 'Urban Search & Rescue. Untuk mencari dan mengeluarkan korban dari reruntuhan atau bangunan yang runtuh.',
        },
        {
          callsign: 'OSAR',
          vehicle: 'Caracara Pursuit',
          images: ['osar'],
          desc: 'Offroad Search & Rescue. Mencari korban di bukit, gurun, dan medan yang tidak bisa dilalui unit biasa.',
        },
        {
          callsign: 'RA',
          vehicle: 'Bison S Ambulance',
          images: ['ra'],
          desc: 'Rescue Ambulance. Membawa gurney, ILS Bag, oxygen outlet, dan AED — satu-satunya unit yang mengangkut korban ke rumah sakit.',
        },
      ],
    },
    {
      id: 'operational',
      name: 'Operational Unit',
      blurb: 'Dipakai saat sedang patroli.',
      units: [
        {
          callsign: 'CHIEF',
          vehicle: 'Swat SUV',
          images: ['chief'],
          desc: 'Head Command Vehicle. Kendaraan komando tertinggi di lapangan.',
        },
        {
          callsign: 'OC',
          vehicle: 'FIB / Stainer',
          images: ['oc'],
          desc: 'Operational Command. Kendaraan supervisor yang mengawasi jalannya patroli.',
        },
        {
          callsign: 'PAUL',
          vehicle: 'FIB',
          images: ['paul'],
          desc: 'Khusus staf rumah sakit. Bukan unit rescue, jadi tidak dipakai mengangkut korban dari TKP.',
        },
      ],
    },
    {
      id: 'support',
      name: 'Support Unit',
      blurb: 'Unit pendukung di luar patroli — evakuasi, transportasi, dan pembantu.',
      units: [
        {
          callsign: 'WR',
          vehicle: 'Sadler Rescue Utility Truck',
          images: ['wr'],
          desc: 'Water Rescue support. Membawa perlengkapan penyelamatan air dan menarik unit perairan ke lokasi.',
        },
        {
          callsign: 'QUAD',
          vehicle: 'Blazer Lifeguard',
          images: ['quad'],
          desc: 'Beach assist. Lincah di pasir untuk menjangkau korban di sepanjang garis pantai.',
        },
        {
          callsign: 'LIMA',
          vehicle: 'Lifeguard Mobile Asset',
          images: ['lima'],
          desc: 'Aset patroli lifeguard. Pos bergerak untuk mengawasi area pantai.',
        },
        {
          callsign: 'CORONER',
          vehicle: 'Rumpo',
          images: ['coroner'],
          desc: 'Medical examiner. Mengangkut korban yang sudah dinyatakan meninggal dari TKP.',
        },
        {
          callsign: 'ETU',
          vehicle: 'Towtruck',
          images: ['etu'],
          desc: 'Emergency Tow Unit. Menyingkirkan kendaraan yang menghalangi jalan atau menarik unit yang mogok.',
        },
        {
          callsign: 'ACADEMY',
          vehicle: 'Airport Bus',
          images: ['academy'],
          desc: 'Bus study tour calon anggota baru. Dipakai untuk mengajak Candidate LSFD berkeliling.',
        },
      ],
    },
    {
      id: 'water',
      name: 'Water Unit',
      blurb: 'Untuk penyelamatan, patroli, dan evakuasi di perairan.',
      units: [
        {
          callsign: 'LIFEBOAT',
          vehicle: 'Dinghy',
          images: ['lifeboat'],
          desc: 'Water Rescue Boat. Mengangkut tim dan korban di perairan yang lebih jauh dari pantai.',
        },
        {
          callsign: 'SKI',
          vehicle: 'Seashark',
          images: ['ski'],
          desc: 'Water Rescue Jet Ski. Paling cepat menjangkau korban yang terseret arus dekat pantai.',
        },
      ],
    },
    {
      id: 'air',
      name: 'Air Unit',
      // Catatan: di daftar aslinya keterangan Air Unit tersalin dari Water Unit
      // ("di area perairan"). Diperbaiki jadi udara.
      blurb: 'Untuk penyelamatan, patroli, dan evakuasi lewat udara.',
      units: [
        {
          callsign: 'LIFEFLIGHT',
          vehicle: 'AW139',
          images: ['lifeflight'],
          desc: 'Air Ambulance. Dipakai saat medan korban tidak mungkin dijangkau lewat darat — ini unit yang dipakai di prosedur Vertical Rescue.',
        },
        {
          callsign: 'FIREHAWK',
          vehicle: 'Maverick',
          images: ['firehawk'],
          desc: 'Pencarian udara untuk medan yang susah di-cover LifeFlight. Turun lebih dekat ke lokasi saat mencari korban di area yang sulit dijangkau.',
        },
        {
          callsign: 'SCOUT',
          vehicle: 'Swift',
          images: ['scout'],
          desc: 'Patroli dan pencarian dari udara, tapi terbatas di area terbuka — tidak bisa masuk ke celah-celah sempit seperti Firehawk.',
        },
      ],
    },
  ],
}
