import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // reactAliasesEnabled: false — kode memakai Preact langsung (preact/hooks, onInput),
  // tanpa lapisan compat React. Itu yang membuat runtime-nya ~4 KB, bukan ~68 KB.
  plugins: [preact({ reactAliasesEnabled: false }), tailwindcss()],
  server: { port: Number(process.env.PORT) || 5173 },
  test: {
    // `.kilo/worktrees/*` adalah salinan repo yang dibuat perkakas lain. Tanpa
    // pengecualian ini vitest menjalankan tes di dalamnya juga, jadi jumlah tes
    // tampak dua kali lipat dan salinan yang tertinggal versinya bisa gagal
    // padahal kode di sini benar.
    exclude: ['**/node_modules/**', '**/dist/**', '**/.kilo/**'],
  },
  build: {
    // Semua browser yang dituju sudah mendukung <link rel="modulepreload">,
    // jadi polyfill kecil yang disuntikkan Vite ke entry tidak perlu ikut.
    modulePreload: { polyfill: false },
  },
})
