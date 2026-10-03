// Kumpulan rujukan. Semua dibuka di tab baru.
// Menambah link cukup menyisipkan satu baris di grup yang cocok.

export default {
  id: "links",
  group: "referensi",
  name: "Link Referensi",
  nameEn: 'Reference Links',
  blurb:
    "Berkas dan halaman yang sering dibuka, biar tidak dicari manual tiap kali.",
  blurbEn:
    'Source documents and the LSFD forum, opened in a new tab.',
  groups: [
    {
      id: "general",
      name: "General",
      color: "bg-slate-400",
      items: [
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=10",
          label: "LSFD Handbook",
          desc: "Rules, Penalty, Procedures, dan lain-lain.",
        },
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=970",
          label: "[GUIDE] Blood Transfusion",
          desc: "RP donor darah.",
        },
      ],
    },
    {
      id: "davis-fire-station",
      name: "Davis Fire Station",
      color: "bg-alarm",
      items: [
        {
          url: "https://fire.los-santos.net/viewforum.php?f=76",
          label: "Dokumen DFS",
          desc: "Berkas draft LSFD.",
        },
        {
          url: "https://fire.los-santos.net/viewforum.php?f=132",
          label: "Tracker Reports",
          desc: "Berkas untuk naik rank.",
        },
        {
          url: "https://fire.los-santos.net/viewforum.php?f=131",
          label: "Patrol Logs",
          desc: "Laporan weekly Patrol Log.",
        },
        {
          url: "https://fire.los-santos.net/viewforum.php?f=129",
          label: "Patient Care Reports",
          desc: "Laporan penanganan korban di lapangan.",
          descEn: "On-scene patient care reports.",
        },
        {
          url: "https://fire.los-santos.net/viewforum.php?f=270",
          label: "Vehicle & Equipment Maintenance",
          desc: "Laporan mingguan pemeliharaan armada dan logistik.",
          descEn: "Weekly fleet and equipment maintenance reports.",
        },
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=749",
          label: "[GUIDE] Motor Vehicle Accident",
          desc: "RP kecelakaan kendaraan.",
        },
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=649",
          label: "[GUIDE] Vertical Rescue",
          desc: "RP aerial support.",
        },
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=649",
          label: "[GUIDE] Structure Fire Procedures",
          desc: "RP kebakaran bangunan.",
        },
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=1921",
          label: "[GUIDE] Wild Animal Handling",
          desc: "RP kontrol hewan liar.",
        },
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=849",
          label: "[GUIDE] Hydrant Pillar Inspection",
          desc: "RP inspeksi hydrant.",
        },
      ],
    },
    {
      id: "pillbox-hospital",
      name: "Pillbox Hospital",
      color: "bg-emerald-500",
      items: [
        {
          url: "https://fire.los-santos.net/viewtopic.php?t=27",
          label: "Hospital General Information",
          desc: "Informasi harga obat-obatan dan treatment di PBS.",
          descEn: "Medication prices and treatment costs at PBS.",
        },
        {
          url: "https://fire.los-santos.net/viewforum.php?f=153",
          label: "Plastic Surgery",
          desc: "Pengajuan operasi plastik Pillbox Hill Medical Center.",
          descEn: "Pillbox Hill Medical Center plastic surgery applications.",
        },
      ],
    },
    {
      id: "lspd",
      name: "Los Santos Police Department",
      color: "bg-blue-600",
      items: [
        {
          url: "https://police.los-santos.net/viewforum.php?f=298",
          label: "Request Criminal Record",
          desc: "Permohonan catatan riwayat kriminal LSPD.",
          descEn: "LSPD criminal record information requests.",
        },
      ],
    },
  ],
};
