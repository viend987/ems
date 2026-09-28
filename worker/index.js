/**
 * Worker pendamping aset statis. Satu-satunya tugasnya meneruskan unggahan
 * gambar Patrol Log ke Imgur, supaya Client-ID Imgur tetap tersimpan sebagai
 * secret di Cloudflare dan tidak ikut terkirim di bundle JS.
 *
 * Semua request lain langsung dilayani aset statis (wrangler.jsonc hanya
 * menjalankan Worker lebih dulu untuk /api/*).
 *
 * Secret: IMGUR_CLIENT_ID — daftar di https://api.imgur.com/oauth2/addclient
 * ("Anonymous usage without user authorization"), lalu pasang lewat
 * `npx wrangler secret put IMGUR_CLIENT_ID` atau dashboard Cloudflare.
 * Tanpa secret itu endpoint menjawab 503 dan form jatuh ke input link manual.
 */

// Batas Imgur untuk gambar non-animasi.
const MAX_BYTES = 20 * 1024 * 1024

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

export async function uploadToImgur(request, env, fetchImpl = fetch) {
  if (request.method !== 'POST') return json({ error: 'Gunakan POST.' }, 405)

  // Hanya halaman ini sendiri yang boleh memakai kuota Client-ID-nya.
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Origin tidak diizinkan.' }, 403)
  }

  if (!env.IMGUR_CLIENT_ID) {
    return json({ error: 'Upload Imgur belum diaktifkan di server. Tempel link gambar manual.' }, 503)
  }

  let image
  try {
    image = (await request.formData()).get('image')
  } catch {
    return json({ error: 'Kirim gambar sebagai multipart/form-data.' }, 400)
  }
  if (!image || typeof image === 'string') return json({ error: 'Gambar tidak ditemukan.' }, 400)
  if (!image.type.startsWith('image/')) return json({ error: 'Berkas bukan gambar.' }, 415)
  if (image.size > MAX_BYTES) return json({ error: 'Gambar lebih dari 20 MB.' }, 413)

  const body = new FormData()
  body.append('image', image)
  body.append('type', 'file')

  let res
  try {
    res = await fetchImpl('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: { authorization: `Client-ID ${env.IMGUR_CLIENT_ID}` },
      body,
    })
  } catch {
    return json({ error: 'Imgur tidak bisa dihubungi.' }, 502)
  }

  const data = await res.json().catch(() => null)
  const link = data?.data?.link
  if (!res.ok || !link) {
    const reason = typeof data?.data?.error === 'string' ? data.data.error : `status ${res.status}`
    return json({ error: `Imgur menolak unggahan (${reason}).` }, 502)
  }

  return json({ link })
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/imgur') return uploadToImgur(request, env)
    if (pathname.startsWith('/api/')) return json({ error: 'Tidak ditemukan.' }, 404)
    return env.ASSETS.fetch(request)
  },
}
