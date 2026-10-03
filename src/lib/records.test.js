import { describe, expect, it } from 'vitest'
import { buildCriminalRecord, SAMPLE_RECORD } from './records.js'
import { parseBBCode, textOf } from './bbcode.js'

describe('buildCriminalRecord', () => {
  it('menghasilkan BBCode Criminal Record Form sesuai spesifikasi', () => {
    const bbcode = buildCriminalRecord(SAMPLE_RECORD)

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
    const bbcode = buildCriminalRecord(SAMPLE_RECORD)
    const text = textOf(parseBBCode(bbcode))
    expect(text).toContain('CRIMINAL RECORD INFORMATION')
    expect(text).toContain('Aurelia Ravenscroft')
    expect(text).toContain('Los Santos')
  })
})
