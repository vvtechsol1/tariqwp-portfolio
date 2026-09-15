import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Absolute, not './'. Project pages live at /work/<slug>, and relative asset
  // paths would resolve against that directory (/work/assets/...) and 404.
  base: '/',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
})
