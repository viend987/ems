import STAFF from '../data/staff.js'
import { isImageUrl, normalizeImageUrl } from './patrol.js'
import { formatDatePattern } from './dates.js'

export const FORUM_SURGERY_URL = 'https://fire.los-santos.net/viewforum.php?f=153'

export const GENDER_OPTIONS = ['Male', 'Female']

export const PROCEDURE_OPTIONS = [
  'Rhinoplasty',
  'Liposuction',
  'Rhinoplasty & Liposuction',
  'Other',
]

export const BLOOD_OPTIONS = [
  'O+',
  'O-',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'Unknown',
]

export const blankSurgery = (staffId = '') => {
  const staff = STAFF.find((s) => s.id === staffId)
  return {
    staffId: staff?.id ?? '',
    fullName: staff?.name ?? '',
    dob: staff ? formatDatePattern(staff.dob, 'DD/MM/YYYY') : '',
    birthPlace: staff?.birthPlace ?? '',
    gender: staff?.gender ?? 'Male',
    address: staff?.address ?? '',
    phone: staff?.phone ?? '',
    bloodType: '',
    weight: '',
    height: '',
    diseaseHistory: '',
    idCardImage: '',
    backgroundCheckImage: '',
    reason: '',
    procedure: 'Rhinoplasty',
    procedureOther: '',
    expectations: '',
    photoImage: '',
    signatureImage: staff?.signature ?? '',
    signerName: staff?.name ?? '',
    signDate: formatDatePattern(new Date().toISOString().slice(0, 10), 'DD/MM/YYYY'),
  }
}

export function buildPlasticSurgeryReport(form) {
  const fullName = form.fullName?.trim() || ''
  const dob = form.dob?.trim() || ''
  const birthPlace = form.birthPlace?.trim() || ''
  const gender = form.gender || 'Male'
  const address = form.address?.trim() || ''
  const phone = form.phone?.trim() || ''
  const bloodType = form.bloodType?.trim() || ''
  const weight = form.weight?.trim() || ''
  const height = form.height?.trim() || ''
  const diseaseHistory = form.diseaseHistory?.trim() || 'None'

  const idCardUrl = form.idCardImage ? normalizeImageUrl(form.idCardImage) : ''
  const bgCheckUrl = form.backgroundCheckImage ? normalizeImageUrl(form.backgroundCheckImage) : ''
  const photoUrl = form.photoImage ? normalizeImageUrl(form.photoImage) : ''
  const sigUrl = form.signatureImage ? normalizeImageUrl(form.signatureImage) : ''

  const idCardBBCode = isImageUrl(idCardUrl) ? `[img]${idCardUrl}[/img]` : '[img][/img]'
  const bgCheckBBCode = isImageUrl(bgCheckUrl) ? `[img]${bgCheckUrl}[/img]` : '[img][/img]'
  const photoBBCode = isImageUrl(photoUrl) ? `[img]${photoUrl}[/img]` : '[img][/img]'
  const sigBlock = isImageUrl(sigUrl) ? `[img]${sigUrl}[/img]\n` : ''

  const reason = form.reason?.trim() || ''
  const procedure =
    form.procedure === 'Other' && form.procedureOther?.trim()
      ? form.procedureOther.trim()
      : form.procedure || 'Rhinoplasty'
  const expectations = form.expectations?.trim() || ''

  const signerName = form.signerName?.trim() || fullName || ''
  const signDate = form.signDate?.trim() || formatDatePattern(new Date().toISOString().slice(0, 10), 'DD/MM/YYYY')

  return `[divbox=beige][aligntable=left,0,0,0,0,0,transparent][left][img-resize=150]https://ristek.link/jgvrp-lsfd-logo[/img-resize][/left][/aligntable][aligntable=right,0,0,0,0,0,transparent][left][img-resize=150]https://ristek.link/jgvrp-lsfd-logo[/img-resize][/left][/aligntable] 
[center][size=170][font=times new roman]LOS SANTOS FIRE DEPARTMENT[/font][/size][/center] [center][size=170][font=times new roman]Hospital General Information[/font][/size][/center][center][size=120][font=times new roman][i]Serving with Courage, Integrity, and Pride[/i][/font][/size][/center] [center][size=100][font=times new roman]Rockford Hills, South Blvd Del Perro / Rockford Drive, Los Santos Fire Department HQ[/font][/size] [center][size=100][font=times new roman]Email: lsfd@goverment.us[/font][/size][/center][/center]
[hr][/hr]
[b][size=150][center]PLASTIC SURGERY FORM[/center][/size][/b]
[hr][/hr]
[divbox=beige][divbox=maroon][b][color=#FFFFFF][center][size=150]Personal Details[/size][/center][/color][/b][/divbox]
[HR]
[list=none]
[b][color=#f20707]A1.[/color] Full Name: [/b]${fullName}
[b][color=#f20707]A2.[/color] Date of Birth: [/b]${dob}
[b][color=#f20707]A3.[/color] Place of Birth: [/b]${birthPlace}
[b][color=#f20707]A4.[/color] Gender: [/b]${gender}
[b][color=#f20707]A5.[/color] Address: [/b]${address}
[b][color=#f20707]A6.[/color] Phone Number: [/b]${phone}
[b][color=#f20707]A7.[/color] Blood Type: [/b] ${bloodType}
[b][color=#f20707]A8.[/color] Weight (in kilograms): [/b]${weight}
[b][color=#f20707]A9.[/color] Height (in centimeters): [/b]${height}
[b][color=#f20707]A10.[/color] Disease History: [/b]${diseaseHistory}
[b][color=#f20707]A11.[/color] Do you possess a valid ID card within State of Los Santos ? If yes, please attach it[/b] 
[spoiler]${idCardBBCode}[/spoiler]
[b][color=#f20707]A12.[/color] Please attach a Criminal Background Check from Los Santos Police Department ((SS of personal message from Police Officer)): [/b] [spoiler]${bgCheckBBCode}[/spoiler]
[/list][/divbox]

[divbox=beige][divbox=maroon][b][color=#FFFFFF][center][size=150]Plastic Surgery Information[/size][/center][/color][/b][/divbox]
[HR]
[list=none]
[b][color=#f20707]B1.[/color] Reason for doing Plastic Surgery: [/b] 
[list=none]${reason}[/list]

[b][color=#f20707]B2.[/color] Desired Plastic Surgery Procedure: [/b] ${procedure}

[b][color=#f20707]B3.[/color] Do you have specific expectations regarding the surgery outcome? (Optional) [/b]
[list=none]${expectations}[/list]

[b][b][color=#f20707]B4.[/color] Please attach your full face photo (for rhinoplasty) and or your full body photo (for liposuction)[/b]
[spoiler]${photoBBCode}[/spoiler]

[/list][/divbox]
[divbox=beige][divbox=maroon][b][color=#FFFFFF][center][size=150][b]Terms of Agreement[/b][/size][/center][/color][/b][/divbox]
[HR]
[size=90][quote]
[i]By signing this form, I, the undersigned, agree to the following terms:
[list=1][*][b]Accuracy of Information:[/b] I confirm that all information provided on this form is accurate and complete to the best of my knowledge.
[*][b]Consent for Medical and Administrative Use:[/b] I grant permission for the medical team to use the information provided for medical and administrative purposes only.[*][b]Confidentiality:[/b] I understand that the clinic will maintain the confidentiality of my information in accordance with applicable laws. Information will not be disclosed to third parties without my written consent unless required by law.
[*][b]Voluntary Provision of Information:[/b] I acknowledge that providing this information is voluntary, and I am under no obligation to disclose any details that I am uncomfortable sharing.
[*][b]Right to Privacy:[/b] I retain the right to privacy, and I have the option to refrain from providing certain optional information, such as blood type or specific reasons for undergoing plastic surgery.
[*][b]Declaration of Voluntariness:[/b] I declare that the information is provided voluntarily and without pressure from any party.[/list]
I have read and understood the terms and conditions outlined above. My signature below indicates my acceptance of these terms.
[/i]

[right][b]Signed[/b],
${sigBlock}${signerName}
${signDate}[/right]
[/quote][/divbox][/divbox]`
}
