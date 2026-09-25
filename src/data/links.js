// Kumpulan rujukan. Semua dibuka di tab baru.
// Menambah link cukup menyisipkan satu baris di grup yang cocok.

export default {
  id: "links",
  group: "referensi",
  name: "Link Referensi",
  blurb:
    "Berkas dan halaman yang sering dibuka, biar tidak dicari manual tiap kali.",
  groups: [
    {
      id: "general",
      name: "General",
      items: [
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
      items: [
        {
          url: "https://fire.los-santos.net/viewforum.php?f=76",
          label: "Dokumen DFS",
          desc: "Berkas draft LSFD.",
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
        },
      ],
    },
    {
      id: "pillbox-hospital",
      name: "Pillbox Hospital",
      items: [
        {
          url: "https://github.com/farhanmaul987/ems",
          label: "Repo GitHub",
          desc: "Sumber web ini. Teks RP ada di src/data/procedures/.",
        },
        {
          url: "https://ems.viend.my.id",
          label: "ems.viend.my.id",
          desc: "Alamat web ini kalau mau dibagikan ke rekan satu faction.",
        },
      ],
    },
  ],
};
