import { describe, expect, it, vi } from 'vitest'
import { uploadToImgur } from './index.js'

const ORIGIN = 'https://ems.viend.my.id'

function request({ file = new File(['x'], 'a.png', { type: 'image/png' }), origin = ORIGIN } = {}) {
  const body = new FormData()
  if (file) body.append('image', file)
  return new Request(`${ORIGIN}/api/imgur`, {
    method: 'POST',
    headers: origin ? { origin } : {},
    body,
  })
}

const imgurOk = () =>
  vi.fn(async () => Response.json({ success: true, data: { link: 'https://i.imgur.com/abc123.png' } }))

describe('proxy upload Imgur', () => {
  it('meneruskan gambar dengan Client-ID dan mengembalikan link', async () => {
    const fetchImpl = imgurOk()
    const res = await uploadToImgur(request(), { IMGUR_CLIENT_ID: 'cid' }, fetchImpl)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ link: 'https://i.imgur.com/abc123.png' })
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe('https://api.imgur.com/3/image')
    expect(init.headers.authorization).toBe('Client-ID cid')
    expect(init.body.get('image')).toBeInstanceOf(File)
  })

  it('503 tanpa secret, supaya form jatuh ke link manual', async () => {
    const res = await uploadToImgur(request(), {}, imgurOk())
    expect(res.status).toBe(503)
  })

  it('menolak origin lain dan berkas bukan gambar', async () => {
    const env = { IMGUR_CLIENT_ID: 'cid' }
    expect((await uploadToImgur(request({ origin: 'https://evil.example' }), env, imgurOk())).status).toBe(403)
    const txt = new File(['x'], 'a.txt', { type: 'text/plain' })
    expect((await uploadToImgur(request({ file: txt }), env, imgurOk())).status).toBe(415)
  })

  it('meneruskan penolakan Imgur sebagai error yang terbaca', async () => {
    const fetchImpl = vi.fn(async () =>
      Response.json({ success: false, data: { error: 'Too Many Requests' } }, { status: 429 }),
    )
    const res = await uploadToImgur(request(), { IMGUR_CLIENT_ID: 'cid' }, fetchImpl)
    expect(res.status).toBe(502)
    expect((await res.json()).error).toContain('Too Many Requests')
  })
})
