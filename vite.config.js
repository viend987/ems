import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // reactAliasesEnabled: false — kode memakai Preact langsung (preact/hooks, onInput),
  // tanpa lapisan compat React. Itu yang membuat runtime-nya ~4 KB, bukan ~68 KB.
  plugins: [preact({ reactAliasesEnabled: false }), tailwindcss()],
  server: { port: Number(process.env.PORT) || 5173 },
  build: {
    // Semua browser yang dituju sudah mendukung <link rel="modulepreload">,
    // jadi polyfill kecil yang disuntikkan Vite ke entry tidak perlu ikut.
    modulePreload: { polyfill: false },
  },
})
