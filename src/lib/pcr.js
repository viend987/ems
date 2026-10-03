import STAFF from '../data/staff.js'
import { formatDate, isImageUrl, normalizeImageUrl } from './patrol.js'

export const HEADER_IMAGE = 'https://i.postimg.cc/YSmH9hxj/image.png'

export const LOC_OPTIONS = ['Alert', 'Verbal', 'Pain Stimuli', 'Unresponsive']

export const TRIAGE_OPTIONS = ['N/A', 'Black', 'Red', 'Yellow', 'Green']

export const DISPATCH_OPTIONS = ['911 Request', 'Department Request', 'Other']

export const CONDITION_OPTIONS = ['GSW', 'Bone Fracture', 'Burn', 'Cut', 'Other']

export const blankPCR = (staffId = STAFF[0]?.id ?? '') => {
  const staff = STAFF.find((s) => s.id === staffId) ?? STAFF[0]
  return {
    staffId: staff?.id ?? '',
    callsign: staff?.callsign ?? 'RA-105',
    dutyPartner: 'N/A',
    date: '',
    time: '',
    location: '',
    dispatch: '911 Request',
    dispatchOther: '',
    triage: 'N/A',
    loc: 'Alert',
    breath: '20 LPM',
    pulse: '75 BPM',
    condition: 'Bone Fracture',
    conditionOther: '',
    summary: '',
    screenshots: [''],
  }
}

export const SAMPLE_PCR = {
  staffId: 'tobrian-alrik',
  callsign: 'RA-105',
  dutyPartner: 'N/A',
  date: '2025-11-20',
  time: '22:43 PM',
  location: 'Legion Square',
  dispatch: 'Department Request',
  dispatchOther: '',
  triage: 'N/A',
  loc: 'Alert',
  breath: '20 LPM',
  pulse: '75 BPM',
  condition: 'Bone Fracture',
  conditionOther: '',
  summary: `Pada tanggal 20 November malam hari itu, saya sedang melakukan Status-3 di restoran daerah Mirror Park untuk membeli kopi sebelum kembali melanjutkan patroli saya. Saat saya sedang berbincang dengan salah satu pegawai restoran disana, masuk sebuah transmisi radio dari salah satu petugas departemen LSSD yang menghubungi pihak LSFD dengan bunyi "Sheriff 286S to LSFD". Pada malam itu juga kebetulan Chief Aensley sedang bertugas dan langsung merespon transmisi radio tersebut dengan "Fire 14 here". Petugas LSSD lantas menjelaskan perihal masalah yang ingin disampaikan dengan transmisi radio "We got one person lay on the ground at the Legion Square and his left arm got broken bone, please send the medical unit immediately". Lau Chief Aensley meminta untuk mengirimkan signal lokasi tepatnya korban dengan transmisi radio "Send us your location and our RA Unit will go there". Lalu transmisi balasan yang diberikan adalah "I've shared the location in the last backup". Segera Chief Aensley menanyakan lokasi unit field yang bertugas dengan radio "OCD to Field Unit. Please 10-21" dan saya menjawabnya dengan "Fire Alrik under RA-113 is on Status-3 10-20 Restaurant around Mirror Park". Perintah dispatch pun langsung diberikan kepada saya oleh Chief Aensley dengan radio "OCD to Fire Alrik, take your RA and 10-97 to RID 58 with CODE-3, copy that?". Saya lalu berpamitan dengan pegawai restoran disana dan segera menuju unit RA saya dengan melaporkan radio "Fire Alrik under RA-113 taking Status-5e heading to 10-20 Legion Square with CODE-3, ETA 3 Minutes". Saya juga mendengar Chief Aensley melaporkan radio "RA Unit has been dispatched and will go there soon. ETA 3 minutes" dan transmisi terakhir yang diberikan LSSD adalah "Appreciate it. Sheriff 286S out from transmission".

Sesampainya saya di lokasi kejadian dan melaporkan radio "RA-113 Status-6 on 10-20 Legion Square", petugas LSSD langsung mengarahkan saya ke lokasi korban. Saya sekilas melihat kondisi lengan kiri korban yang sudah patah dan bercucuran darah. Tak lama berselang Chief Aensley mendatangi saya dan menginformasikan hasil olah TKP dari LSSD menunjukkan bahwa korban sebelumnya ada pertikaian dengan sekelompok gang motor dan berakhir seperti ini. Saya lalu meletakkan ILS Kit yang saya bawa dan perlahan melepaskan topi yang dikenakan korban. Lalu saya mengambil N-Gloves dan mengenakannya di kedua tangan saya. Selanjutnya saya mengecek apakah korban masih sadar dan dapat merespon cubitan saya. Untunglah korban masih bisa mendengar suara saya dan merasa kesakitan saat saya mencubitnya.

Kemudian saya segera menangani pendarahan di lengan kiri korban dengan menggunakan Trauma Dressing. Pertama saya menggunting jaket yang dikenakan korban dengan Trauma Scissor dan lalu meletakkan Trauma Dressing di atas pendarahan sambil terus memberikan tekanan supaya pendarahan dapat dihentikan. Pendarahan berhasil saya hentikan, saya lalu mengambil flashlight dari ILS Kit dan meminta korban untuk membuka mulutnya perlahan jika korban menyanggupinya. Setelah saya menyinari airway korban, saya tidak menemukan adanya halangan apapun yang menutupi airway korban. Lalu saya melakukan pengecekan laju pernafasan dan denyut nadi menggunakan perangkat ECG. Saya kemudian membuka panel sensor 12-lead lalu menempelkan elektroda satu per satu di area dada korban lalu menyalakan monitor ECG. Sesaat kemudian saya dapat melihat indikator status korban melalui monitor ECG dan mendapatkan data bahwa laju pernafasan korban dan denyut nadi korban masih ada di batas normal yaitu 20 LPM dan 75 BPM.

Penanganan berikutnya adalah mengatasi lengan kiri korban yang patah supaya tidak terjadi hal yang lebih buruk saat proses memindahkan korban dari lokasi kejadian ke PBH. Saya mengeluarkan Vacuum Splint dari ILS Kit lalu membuka katupnya dan memasangkannya dengan hati-hati pada lengan kiri korban. Setelah saya memastikan Vacuum Splint telah terpasang dengan baik, saya segera mengambil gurney dari unit RA saya dan membawa korban dengan hati-hati hingga masuk ke RA. Saya lalu melapor dan berpamitan kepada pihak LSSD dan Chief Aensley bahwa korban telah berhasil diberikan penanganan darurat dan akan segera dibawa menuju PBH secepatnya. Untuk memberikan informasi kepada tim dokter di PBH, saya melaporkan radio "RA-113 Status-7e, bring one victim down with Bone Fracture, please prepare ER. Now heading to 10-20 PBH with ETA 2 Minutes". Setelah sampai di PBH dan melaporkan radio "RA-113 Status-8 on 10-20 PBH", saya menginformasikan status korban kepada dokter yang bertugas yaitu untuk LoC korban A, open fracture in left arm, dan ABC nya normal. Dokter lalu mengkonfirmasi status tersebut dan memberitahukan bahwa mulai dari situ akan ditangani lebih lanjut oleh tim dokter dan saya dapat lanjut bertugas. Beranjak dari situ, saya lalu kembali melanjutkan patroli dengan melaporkan radio "RA-113 reporting 10-99 from Last Scene, now taking Status-4 clearing from 10-20 PBH".`,
  screenshots: [],
}

export function buildPatientCareReport(form) {
  const staff = form.staff ?? {}
  const callsign = form.callsign?.trim() || staff.callsign || 'RA-105'
  const partner = form.dutyPartner?.trim() || 'N/A'

  // Format tanggal: jika format YYYY-MM-DD maka gunakan formatDate, atau gunakan apa adanya jika sudah berformat DD/MM/YYYY
  const dateStr = form.date?.includes('-') ? formatDate(form.date) : (form.date?.trim() || '')

  const timeStr = form.time?.trim() || ''
  const locationStr = form.location?.trim() || ''

  const dispatchVal =
    form.dispatch === 'Other' && form.dispatchOther?.trim()
      ? form.dispatchOther.trim()
      : form.dispatch || '911 Request'

  const triageVal = form.triage?.trim() || 'N/A'
  const locVal = form.loc?.trim() || 'Alert'
  const breathVal = form.breath?.trim() || ''
  const pulseVal = form.pulse?.trim() || ''

  const conditionVal =
    form.condition === 'Other' && form.conditionOther?.trim()
      ? form.conditionOther.trim()
      : form.condition || 'Other (......)'

  const summaryVal = form.summary?.trim() || ''

  const validScreenshots = (form.screenshots ?? [])
    .map((s) => normalizeImageUrl(s))
    .filter((s) => isImageUrl(s))

  const screenshotBody =
    validScreenshots.length > 0
      ? validScreenshots.map((url) => `[img]${url}[/img]`).join('\n')
      : ''

  const sigBlock = staff.signature ? `[img]${staff.signature}[/img]\n` : '[i]Signature[/i]\n'

  return `[divbox=white][center][img-resize=200]${HEADER_IMAGE}[/img-resize]
[hr][/hr]
[size=150][b]Patient Care Report[/b][/size]
[hr][/hr]
[/center][divbox=maroon][b][color=#FFFFFF][center][size=150]PERSONAL DETAILS[/size][/center][/color][/b][/divbox]
[list=0][*][b]Name[/b] : ${staff.name ?? ''}
[*][b]Badge Number[/b] : ${staff.badge ?? ''}
[*][b]Rank[/b] : ${staff.rank ?? ''}
[*][b]District[/b] : ${staff.district ?? ''}
[*][b]Callsign[/b] : ${callsign}
[*][b]Duty Partner [/b] (if any) : ${partner}
[/list]

[divbox=maroon][b][color=#FFFFFF][center][size=150]DUTY INFORMATION[/size][/center][/color][/b][/divbox]
[list=0][*][b]Date[/b] : ${dateStr}
[*][b]Time[/b] : ${timeStr}
[*][b]Location[/b] : ${locationStr}
[*][b]Dispatch[/b] : ${dispatchVal}[/LIST]

[divbox=maroon][b][color=#FFFFFF][center][size=150]PATIENT INFORMATION[/size][/center][/color][/b][/divbox]
[list][*][b]Triage[/b] (If necessary) : ${triageVal}
[*][b]Level of Consciousness[/b] : ${locVal}
[*][b]Breath per minute[/b] : ${breathVal}
[*][b]Pulse per minute[/b] : ${pulseVal}
[*][b]Patient Condition[/b] : ${conditionVal}
[*][b]Summary of Action [/b]:
${summaryVal}
[*][b]Screen Shot[/b] :
[spoiler]${screenshotBody}[/spoiler]


[right][b]Regards,[/b]
${sigBlock}${staff.name ?? 'Name'}[/right][/divbox]`
}
