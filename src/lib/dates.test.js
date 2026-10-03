import { describe, expect, it } from 'vitest'
import { formatDatePattern, parseDateParts } from './dates.js'

describe('dates utility', () => {
  it('mengurai berbagai format tanggal dengan benar', () => {
    expect(parseDateParts('1999-09-19')).toEqual({ year: 1999, month: 9, day: 19 })
    expect(parseDateParts('19/09/1999')).toEqual({ year: 1999, month: 9, day: 19 })
    expect(parseDateParts('09/19/1999')).toEqual({ year: 1999, month: 9, day: 19 })
    expect(parseDateParts('19 Sep 1999')).toEqual({ year: 1999, month: 9, day: 19 })
    expect(parseDateParts('19 September 1999')).toEqual({ year: 1999, month: 9, day: 19 })
  })

  it('memformat tanggal ke format yang diinginkan pengguna', () => {
    const dob = '1999-09-19'
    expect(formatDatePattern(dob, 'DD/MM/YYYY')).toBe('19/09/1999')
    expect(formatDatePattern(dob, 'MM/DD/YYYY')).toBe('09/19/1999')
    expect(formatDatePattern(dob, 'YYYY-MM-DD')).toBe('1999-09-19')
    expect(formatDatePattern(dob, 'DD MMM YYYY')).toBe('19 Sep 1999')
    expect(formatDatePattern(dob, 'DD MMMM YYYY', 'id')).toBe('19 September 1999')
    expect(formatDatePattern(dob, 'DD MMMM YYYY', 'en')).toBe('19 September 1999')
    expect(formatDatePattern('1999-01-05', 'DD MMMM YYYY', 'id')).toBe('5 Januari 1999')
    expect(formatDatePattern('1999-01-05', 'DD MMMM YYYY', 'en')).toBe('5 January 1999')
  })

  it('mengembalikan string apa adanya jika format tidak dikenali', () => {
    expect(formatDatePattern('Invalid Date')).toBe('Invalid Date')
    expect(formatDatePattern('')).toBe('')
  })
})
