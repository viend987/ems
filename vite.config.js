import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: Number(process.env.PORT) || 5173 },
  build: {
    rollupOptions: {
      output: {
        // React dipisah dari kode aplikasi supaya menyunting teks RP — yang
        // sering terjadi — tidak ikut membatalkan cache pustaka yang tidak
        // berubah. Keduanya tetap di-preload, jadi tidak ada permintaan
        // jaringan yang menyelip antara ketukan dan teksnya.
        manualChunks: (id) =>
          id.includes('node_modules/react') || id.includes('node_modules/scheduler')
            ? 'vendor'
            : undefined,
      },
    },
  },
})
