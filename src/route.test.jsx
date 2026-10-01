// @vitest-environment jsdom
import { render } from 'preact'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'

/**
 * Lompatan percabangan adalah kejadian, bukan keadaan. Dulu ia digerakkan oleh
 * useEffect yang hanya bergantung pada nilai route, jadi menekan tombol yang
 * menunjuk ke bagian yang sedang aktif tidak mengubah satu nilai pun — dan 80
 * dari 149 percabangan di situs ini menunjuk ke bagian di kategorinya sendiri.
 * Di produksi itu terbaca sebagai "tombolnya tidak bisa diklik".
 *
 * Jumlahnya ikut diuji, bukan cuma ada-tidaknya: menulis location.hash memicu
 * hashchange, jadi tanpa penjaga di useRoute satu klik melompat dua kali.
 */

// Preact menunda efek lewat requestAnimationFrame, yang di jsdom jatuh ke timer
// ~100 ms. Jadi yang ditunggu kondisinya, bukan sejumlah tick tertentu.
const pause = (ms) => new Promise((r) => setTimeout(r, ms))

let scrolls
let root

beforeEach(() => {
  scrolls = []
  Element.prototype.scrollIntoView = function () {
    scrolls.push(this.id)
  }
})

// Wajib di-unmount, bukan cuma dikosongkan: App memasang listener hashchange,
// dan komponen yang tertinggal hidup ikut bereaksi di tes berikutnya.
afterEach(() => {
  if (root) render(null, root)
  root = null
  document.body.innerHTML = ''
  location.hash = ''
})

async function mount(hash) {
  location.hash = hash
  root = document.createElement('div')
  document.body.append(root)
  render(<App />, root)
  await pause(150)
  scrolls.length = 0
  return root
}

/** Tombol percabangan dengan label tertentu. */
function branchButton(el, label) {
  return [...el.querySelectorAll('button')].find((b) => b.textContent.trim() === label)
}

/** Menunggu sampai lompatannya sejumlah `n`, lalu memastikan tidak bertambah. */
async function jumps(n) {
  await vi.waitFor(() => expect(scrolls.length).toBe(n), { timeout: 2000, interval: 10 })
  await pause(150)
  expect(scrolls.length, 'tidak boleh melompat lebih dari sekali per klik').toBe(n)
  return scrolls
}

describe('lompatan percabangan', () => {
  it('melompat sekali saja per klik', async () => {
    const el = await mount('#/deat')
    const btn = branchButton(el, 'Masih → Elevation')
    expect(btn, 'tombol percabangan harus ada').toBeTruthy()

    btn.click()
    expect(await jumps(1)).toEqual(['deat-elevation'])
  })

  it('melompat lagi saat tombol yang sama ditekan dua kali', async () => {
    const el = await mount('#/deat')
    const btn = branchButton(el, 'Masih → Elevation')

    btn.click()
    await jumps(1)
    btn.click()
    expect(await jumps(2), 'tekanan kedua juga harus melompat').toEqual([
      'deat-elevation',
      'deat-elevation',
    ])
  })

  it('melompat walau bagian tujuan sudah jadi route aktif', async () => {
    const el = await mount('#/deat#elevation')

    branchButton(el, 'Masih → Elevation').click()
    expect(await jumps(1)).toEqual(['deat-elevation'])
  })

  it('melompat ke bagian di kategori lain', async () => {
    const el = await mount('#/deat')

    branchButton(el, 'Muat korban').click()
    expect(await jumps(1)).toEqual(['load-load'])
  })
})

describe('pindah kategori', () => {
  /**
   * Papan kategori tidak menunjuk bagian tertentu, jadi dulu tidak ada yang
   * menggeser layar. Kalau halaman sedang tergeser jauh ke bawah, isi kategori
   * baru muncul di bawah kaki — judulnya ada di atas layar, dan yang terlihat
   * justru tengah-tengah kategori yang baru dibuka.
   */
  it('melompat ke puncak isi, bukan ke bagian mana pun', async () => {
    const el = await mount('#/deat')
    expect(scrolls, 'muat pertama tidak boleh mengusik posisi peramban').toEqual([])

    const btn = [...el.querySelectorAll('button')].find(
      (b) => b.textContent.trim() === 'Hewan Liar',
    )
    expect(btn, 'tombol kategori harus ada').toBeTruthy()

    btn.click()
    expect(await jumps(1)).toEqual(['isi'])
  })
})
