import { describe, expect, it } from 'vitest'
import STAFF from '../data/staff.js'
import { buildPatientCareReport } from './pcr.js'
import { parseBBCode, textOf } from './bbcode.js'

const testPCR = {
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
  summary: 'Penanganan pasien patah tulang di Legion Square.',
  screenshots: [],
}

describe('buildPatientCareReport', () => {
  const tobrian = STAFF.find((s) => s.id === 'tobrian-alrik')

  it('menghasilkan BBCode PCR sesuai struktur resmi', () => {
    const bbcode = buildPatientCareReport({
      ...testPCR,
      staff: tobrian,
      screenshots: ['https://i.imgur.com/example1.png'],
    })

    expect(bbcode).toContain('[size=150][b]Patient Care Report[/b][/size]')
    expect(bbcode).toContain('[*][b]Name[/b] : Tobrian Alrik')
    expect(bbcode).toContain('[*][b]Badge Number[/b] : 211205')
    expect(bbcode).toContain('[*][b]Callsign[/b] : RA-105')
    expect(bbcode).toContain('[*][b]Duty Partner [/b] (if any) : N/A')
    expect(bbcode).toContain('[*][b]Date[/b] : 20/11/2025')
    expect(bbcode).toContain('[*][b]Time[/b] : 22:43 PM')
    expect(bbcode).toContain('[*][b]Location[/b] : Legion Square')
    expect(bbcode).toContain('[*][b]Dispatch[/b] : Department Request[/LIST]')
    expect(bbcode).toContain('[*][b]Triage[/b] (If necessary) : N/A')
    expect(bbcode).toContain('[*][b]Level of Consciousness[/b] : Alert')
    expect(bbcode).toContain('[*][b]Breath per minute[/b] : 20 LPM')
    expect(bbcode).toContain('[*][b]Pulse per minute[/b] : 75 BPM')
    expect(bbcode).toContain('[*][b]Patient Condition[/b] : Bone Fracture')
    expect(bbcode).toContain('[spoiler][img]https://i.imgur.com/example1.png[/img][/spoiler]')
    expect(bbcode).toContain('[img]https://i.imgur.com/OyltXL7.png[/img]\nTobrian Alrik[/right][/divbox]')
  })

  it('dapat diurai oleh parser BBCode tanpa meninggalkan tag mentah', () => {
    const bbcode = buildPatientCareReport({
      ...testPCR,
      staff: tobrian,
    })
    const text = textOf(parseBBCode(bbcode))
    expect(text).toContain('Patient Care Report')
    expect(text).toContain('Tobrian Alrik')
    expect(text).toContain('Legion Square')
    expect(text).not.toContain('[/LIST]')
  })
})
