import { describe, expect, it } from 'vitest'
import {
  blankSurgery,
  buildPlasticSurgeryReport,
  FORUM_SURGERY_URL,
} from './plastic-surgery.js'
import { parseBBCode, textOf } from './bbcode.js'

describe('plastic-surgery generator', () => {
  const testForm = {
    fullName: 'Tobrian Alrik',
    dob: '19/09/1999',
    birthPlace: 'Stockholm, Sweden',
    gender: 'Male',
    address: 'West Mirror Drive',
    phone: '356-6302',
    bloodType: 'O+',
    weight: '78',
    height: '182',
    diseaseHistory: 'None',
    idCardImage: 'https://i.imgur.com/example-id.png',
    backgroundCheckImage: 'https://i.imgur.com/example-bg.png',
    reason: 'Kebutuhan rekonstruksi hidung pasca insiden tugas pemadam kebakaran.',
    procedure: 'Rhinoplasty',
    expectations: 'Kembalinya struktur hidung simetris normal.',
    photoImage: 'https://i.imgur.com/example-photo.png',
    signatureImage: 'https://i.imgur.com/example-sig.png',
    signerName: 'Tobrian Alrik',
    signDate: '03/10/2026',
  }

  it('menghasilkan BBCode Plastic Surgery Form sesuai struktur forum', () => {
    const bbcode = buildPlasticSurgeryReport(testForm)

    expect(bbcode).toContain('[divbox=beige]')
    expect(bbcode).toContain('PLASTIC SURGERY FORM')
    expect(bbcode).toContain('[b][color=#f20707]A1.[/color] Full Name: [/b]Tobrian Alrik')
    expect(bbcode).toContain('[b][color=#f20707]A2.[/color] Date of Birth: [/b]19/09/1999')
    expect(bbcode).toContain('[b][color=#f20707]A3.[/color] Place of Birth: [/b]Stockholm, Sweden')
    expect(bbcode).toContain('[b][color=#f20707]A4.[/color] Gender: [/b]Male')
    expect(bbcode).toContain('[b][color=#f20707]A5.[/color] Address: [/b]West Mirror Drive')
    expect(bbcode).toContain('[b][color=#f20707]A6.[/color] Phone Number: [/b]356-6302')
    expect(bbcode).toContain('[b][color=#f20707]A7.[/color] Blood Type: [/b] O+')
    expect(bbcode).toContain('[b][color=#f20707]A8.[/color] Weight (in kilograms): [/b]78')
    expect(bbcode).toContain('[b][color=#f20707]A9.[/color] Height (in centimeters): [/b]182')
    expect(bbcode).toContain('[spoiler][img]https://i.imgur.com/example-id.png[/img][/spoiler]')
    expect(bbcode).toContain('[spoiler][img]https://i.imgur.com/example-bg.png[/img][/spoiler]')
    expect(bbcode).toContain('[b][color=#f20707]B1.[/color] Reason for doing Plastic Surgery: [/b]')
    expect(bbcode).toContain('[b][color=#f20707]B2.[/color] Desired Plastic Surgery Procedure: [/b] Rhinoplasty')
    expect(bbcode).toContain('[spoiler][img]https://i.imgur.com/example-photo.png[/img][/spoiler]')
    expect(bbcode).toContain('[right][b]Signed[/b],')
    expect(bbcode).toContain('[img]https://i.imgur.com/example-sig.png[/img]\nTobrian Alrik\n03/10/2026[/right]')
  })

  it('dapat diurai oleh parser BBCode', () => {
    const bbcode = buildPlasticSurgeryReport(testForm)
    const text = textOf(parseBBCode(bbcode))
    expect(text).toContain('PLASTIC SURGERY FORM')
    expect(text).toContain('Tobrian Alrik')
    expect(text).toContain('Stockholm, Sweden')
  })

  it('menyediakan URL forum pengajuan yang benar', () => {
    expect(FORUM_SURGERY_URL).toBe('https://fire.los-santos.net/viewforum.php?f=153')
  })

  it('blankSurgery menginisialisasi form kosong', () => {
    const blank = blankSurgery()
    expect(blank.fullName).toBe('')
    expect(blank.procedure).toBe('Rhinoplasty')
  })
})
