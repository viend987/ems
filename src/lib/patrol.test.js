import { describe, expect, it } from 'vitest'
import STAFF from '../data/staff.js'
import {
  buildPatrolLog,
  durationMinutes,
  formatDate,
  isImageUrl,
  normalizeImageUrl,
  problems,
} from './patrol.js'

// Contoh laporan jadi dari forum, disalin apa adanya.
const EXPECTED = `[divbox=white][center][img-resize=200]https://i.postimg.cc/YSmH9hxj/image.png[/img-resize]
[hr][/hr]
[size=150][b]Patrol Note[/b][/size]
[hr][/hr]
[/center]

[divbox=maroon][b][color=#FFFFFF][center][size=150]PERSONAL DETAILS[/size][/center][/color][/b][/divbox]
[list=0][*][b]Name[/b] : Tobrian Alrik
[*][b]Badge Number[/b] : 211205
[*][b]Rank[/b] : FireFighter III
[*][b]District[/b] : Davis Fire Station
[/list]

[divbox=maroon][b][color=#FFFFFF][center][size=150]DUTY INFORMATION[/size][/center][/color][/b][/divbox]
[list=0][*][b]Date[/b] : 21/09/2026
[*][b]Crew member[/b] : N/A
[*][b]Start Time[/b] : 20:01
[spoiler][img]https://i.imgur.com/ZKAMl8M.jpeg[/img][/spoiler]
[*][b]End Time[/b] : 22:32
[spoiler][img]https://i.imgur.com/rLit2Gd.jpeg[/img][/spoiler]
[*][b]Activity[/b] :
[quote][justify]Pada hari Senin saya melakukan patroli di wilayah city pada malam hari dan memutuskan untuk beristirahat sebentar di Legion Square. Tepat saat saya beristirahat ada radio masuk dari LSPD untuk assist penanganan beberapa korban di daerah Vespucci. Setelah semua korban berhasil dibawa ke PBH saya memutuskan untuk RTB ke PBH[/justify][/quote]


[right][b]Regards,[/b]
[img]https://i.imgur.com/OyltXL7.png[/img]
Tobrian Alrik[/right][/divbox]`

const FORM = {
  staff: STAFF.find((s) => s.id === 'tobrian-alrik'),
  date: '2026-09-21',
  crew: '',
  start: '20:01',
  end: '22:32',
  startImage: 'https://i.imgur.com/ZKAMl8M.jpeg',
  endImage: 'https://imgur.com/rLit2Gd',
  activity:
    'Pada hari Senin saya melakukan patroli di wilayah city pada malam hari dan memutuskan untuk beristirahat sebentar di Legion Square. Tepat saat saya beristirahat ada radio masuk dari LSPD untuk assist penanganan beberapa korban di daerah Vespucci. Setelah semua korban berhasil dibawa ke PBH saya memutuskan untuk RTB ke PBH\n',
}

describe('BBCode patrol log', () => {
  it('sama persis dengan contoh laporan jadi', () => {
    expect(buildPatrolLog(FORM)).toBe(EXPECTED)
    expect(problems(FORM)).toEqual([])
  })

  it('kolom gambar kosong tetap menyisakan [spoiler] template', () => {
    const out = buildPatrolLog({ ...FORM, startImage: '' })
    expect(out).toContain('[*][b]Start Time[/b] : 20:01\n[spoiler][/spoiler]')
  })
})

describe('durasi duty', () => {
  it('menghitung selisih dan melewati tengah malam', () => {
    expect(durationMinutes('20:01', '22:32')).toBe(151)
    expect(durationMinutes('23:30', '00:45')).toBe(75)
    expect(durationMinutes('20:00', '')).toBe(null)
  })

  it('menolak laporan di bawah 60 menit, menerima tepat 60', () => {
    expect(problems({ ...FORM, start: '20:00', end: '20:59' }).join()).toMatch(/59 menit/)
    expect(problems({ ...FORM, start: '20:00', end: '21:00' })).toEqual([])
  })
})

describe('link gambar', () => {
  it('mengubah link halaman imgur jadi link gambar langsung', () => {
    expect(normalizeImageUrl(' https://imgur.com/ZKAMl8M ')).toBe('https://i.imgur.com/ZKAMl8M.jpeg')
    expect(isImageUrl(normalizeImageUrl('https://imgur.com/a/AbCdE12'))).toBe(false)
    expect(isImageUrl('https://i.postimg.cc/x/y.png')).toBe(true)
  })

  it('format tanggal forum', () => {
    expect(formatDate('2026-09-21')).toBe('21/09/2026')
    expect(formatDate('')).toBe('')
  })
})

describe('master data anggota', () => {
  it('lengkap, id unik, dan tanda tangan berupa link gambar langsung', () => {
    const ids = STAFF.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of STAFF) {
      for (const key of ['id', 'name', 'badge', 'rank', 'district', 'signature']) {
        expect(String(s[key] ?? '').trim(), `${key} kosong di ${s.id}`).not.toBe('')
      }
      expect(isImageUrl(s.signature), `tanda tangan ${s.id}`).toBe(true)
    }
  })
})
