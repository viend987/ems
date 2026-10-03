import { isImageUrl, normalizeImageUrl } from './patrol.js'

export const BANNER_IMAGE = 'https://imgur.com/6y2LhQO.png'

export const SEX_OPTIONS = ['Male', 'Female']

export const RACE_OPTIONS = [
  'Caucasian',
  'African-American',
  'Hispanic',
  'Asian',
  'Other',
]

export const blankRecord = () => ({
  fullName: '',
  sex: 'Male',
  race: 'Caucasian',
  dob: '',
  address: '',
  phone: '',
  idCard: '',
  driverLicense: '',
  signatureImage: '',
})

export const SAMPLE_RECORD = {
  fullName: 'Aurelia Ravenscroft',
  sex: 'Female',
  race: 'Caucasian',
  dob: '25/06/2003',
  address: 'Los Santos',
  phone: '685-8993',
  idCard: 'https://i.imgur.com/example-id.png',
  driverLicense: 'https://i.imgur.com/example-dl.png',
  signatureImage: 'https://i.imgur.com/example-sig.png',
}

export function buildCriminalRecord(form) {
  const name = form.fullName?.trim() || 'Firstname Lastname'
  const sex = form.sex || 'Male'
  const race = form.race || 'Caucasian'
  const dob = form.dob?.trim() || 'DD/MMM/YYYY'
  const address = form.address?.trim() || 'Address here'
  const phone = form.phone?.trim() || '000-0000'

  const idCardUrl = form.idCard ? normalizeImageUrl(form.idCard) : ''
  const dlUrl = form.driverLicense ? normalizeImageUrl(form.driverLicense) : ''
  const sigUrl = form.signatureImage ? normalizeImageUrl(form.signatureImage) : ''

  const idCardBBCode = isImageUrl(idCardUrl) ? `[img]${idCardUrl}[/img]` : '[img]Here[/img]'
  const dlBBCode = isImageUrl(dlUrl) ? `[img]${dlUrl}[/img]` : '[img]Here[/img]'

  const sigBlock =
    isImageUrl(sigUrl)
      ? `[img]${sigUrl}[/img]\n\n${name}`
      : `${name}`

  return `[block=transparent,1,black,10,10,10]

[center]
[img]${BANNER_IMAGE}[/img]
[b]CRIMINAL RECORD INFORMATION ─ REQUEST FORM[/b]
[/center] [hr]
  
[b]Full Name[/b]: ${name}
[b]Sex[/b]: ${sex}
[b]Race[/b]: ${race}

[b]Date of Birth[/b]: ${dob}
[b]Address[/b]: ${address}
[b]Phone Number[/b]: ${phone}

[b]Attach a copy of your identification card[/b]:
[altspoiler=Identification Card] ${idCardBBCode} [/altspoiler]

[b]Attach a copy of your driver's license[/b]:
[altspoiler=Drivers License] ${dlBBCode} [/altspoiler]
  
[hr]
  
[b]Signature[/b]:
${sigBlock}
  
[/block]`
}
