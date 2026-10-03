import { describe, expect, it } from 'vitest'
import { buildCriminalRecord } from './records.js'
import { parseBBCode, textOf } from './bbcode.js'

const testRecord = {
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

describe('buildCriminalRecord', () => {
  it('menghasilkan BBCode Criminal Record Form sesuai spesifikasi', () => {
    const bbcode = buildCriminalRecord(testRecord)

    expect(bbcode).toContain('[block=transparent,1,black,10,10,10]')
    expect(bbcode).toContain('CRIMINAL RECORD INFORMATION ─ REQUEST FORM')
    expect(bbcode).toContain('[b]Full Name[/b]: Aurelia Ravenscroft')
    expect(bbcode).toContain('[b]Sex[/b]: Female')
    expect(bbcode).toContain('[b]Race[/b]: Caucasian')
    expect(bbcode).toContain('[b]Date of Birth[/b]: 25/06/2003')
    expect(bbcode).toContain('[b]Address[/b]: Los Santos')
    expect(bbcode).toContain('[b]Phone Number[/b]: 685-8993')
    expect(bbcode).toContain('[altspoiler=Identification Card]')
    expect(bbcode).toContain('[altspoiler=Drivers License]')
    expect(bbcode).toContain('[img]https://i.imgur.com/example-sig.png[/img]\n\nAurelia Ravenscroft')
  })

  it('dapat diurai oleh parser BBCode', () => {
    const bbcode = buildCriminalRecord(testRecord)
    const text = textOf(parseBBCode(bbcode))
    expect(text).toContain('CRIMINAL RECORD INFORMATION')
    expect(text).toContain('Aurelia Ravenscroft')
    expect(text).toContain('Los Santos')
  })
})
