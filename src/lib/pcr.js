import STAFF from '../data/staff.js'
import { formatDate, isImageUrl, normalizeImageUrl } from './patrol.js'

export const HEADER_IMAGE = 'https://i.postimg.cc/YSmH9hxj/image.png'

export const FORUM_PCR_URL = 'https://fire.los-santos.net/viewforum.php?f=129'

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
