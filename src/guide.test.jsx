// @vitest-environment jsdom
import { render } from 'preact'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

const pause = (ms) => new Promise((r) => setTimeout(r, ms))

let root

beforeEach(() => {
  Element.prototype.scrollIntoView = () => {}
})

afterEach(() => {
  if (root) render(null, root)
  root = null
  document.body.innerHTML = ''
  location.hash = ''
})

async function mount(hash = '') {
  location.hash = hash
  root = document.createElement('div')
  document.body.append(root)
  render(<App />, root)
  await pause(150)
  return root
}

describe('mode switcher & guide mode', () => {
  it('menampilkan tombol switcher mode di header', async () => {
    const el = await mount()
    const opsBtn = el.querySelector('button[aria-selected="true"]')
    expect(opsBtn.textContent).toContain('Operasional')

    const guideBtn = [...el.querySelectorAll('button[role="tab"]')].find((b) =>
      b.textContent.includes('Buku Panduan'),
    )
    expect(guideBtn).toBeTruthy()
  })

  it('berpindah ke mode guide saat tombol Buku Panduan diklik', async () => {
    const el = await mount()
    const guideBtn = [...el.querySelectorAll('button[role="tab"]')].find((b) =>
      b.textContent.includes('Buku Panduan'),
    )
    guideBtn.click()
    await pause(150)

    expect(location.hash).toBe('#/guide-pk')
    expect(el.textContent).toContain('Ketentuan & Kalkulasi Player Kill (PK)')
    expect(el.textContent).toContain('Kalkulator Status PK')
  })

  it('dapat langsung membuka mode guide via hash url #/guide-pk', async () => {
    const el = await mount('#/guide-pk')
    expect(el.textContent).toContain('Ketentuan & Kalkulasi Player Kill (PK)')
    expect(el.textContent).toContain('Tabel Matriks Kriteria PK')
    expect(el.textContent).toContain('AUTO PK')

    const activeTab = el.querySelector('button[aria-selected="true"]')
    expect(activeTab.textContent).toContain('Buku Panduan')
  })

  it('dapat berpindah kembali ke mode operasional', async () => {
    const el = await mount('#/guide-pk')
    const opsBtn = [...el.querySelectorAll('button[role="tab"]')].find((b) =>
      b.textContent.includes('Operasional'),
    )
    opsBtn.click()
    await pause(150)

    expect(location.hash).toBe('#/field')
    expect(el.textContent).toContain('Danger (kondisional)')
  })

  it('dapat membuka modul panduan Terminologi Anatomi & Cedera (#/guide-anatomy)', async () => {
    const el = await mount('#/guide-anatomy')
    expect(el.textContent).toContain('Terminologi Anatomi & Klasifikasi Cedera Medis')
    expect(el.textContent).toContain('Generator Doctor Report & Radio Dispatch')
    expect(el.textContent).toContain('Upper Extremity')
    expect(el.textContent).toContain('Lower Extremity')
    expect(el.textContent).toContain('Combat Ready Clamp (CRoC)')
  })

  it('mengklik daftar isi guide tidak melempar route ke builder operasional', async () => {
    const el = await mount('#/guide-anatomy')
    const secBtn = [...el.querySelectorAll('button')].find((b) =>
      b.textContent.includes('Generator Doctor Report & Radio'),
    )
    expect(secBtn).toBeTruthy()
    secBtn.click()
    await pause(150)

    // Tetap di mode guide dan hash tidak berubah jadi #builder
    expect(location.hash).toBe('#/guide-anatomy')
    expect(el.textContent).toContain('Terminologi Anatomi')
  })
})
