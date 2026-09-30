// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { applyTheme, DEFAULT_THEME, isTheme, nextTheme, readTheme, writeTheme } from './theme.js'

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

describe('tema', () => {
  it('bawaannya terang, bukan mengikuti setelan sistem', () => {
    expect(DEFAULT_THEME).toBe('light')
    expect(readTheme()).toBe('light')
  })

  it('berganti bolak-balik antara dua tema', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })

  it('mengingat pilihan lalu membacanya kembali', () => {
    writeTheme('dark')
    expect(readTheme()).toBe('dark')
  })

  it('mengabaikan nilai tersimpan yang bukan tema', () => {
    localStorage.setItem('lsfd:theme', 'neon')
    expect(readTheme()).toBe('light')
    expect(isTheme('neon')).toBe(false)
  })

  it('memasang data-theme dan menyamakan warna bilah browser', () => {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#FFFFFF'
    document.head.append(meta)

    applyTheme('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(meta.content).toBe('#0A0A0B')

    applyTheme('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(meta.content).toBe('#FFFFFF')
    meta.remove()
  })

  it('jatuh ke tema bawaan kalau diberi nilai ngawur', () => {
    expect(applyTheme('neon')).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
