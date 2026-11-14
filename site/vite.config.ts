import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE is read at build time. Leave it unset for local `/`.
// A later GitHub Pages deploy of this repo would use `/blackwell-studio/`.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE || '/'

  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      assetsInlineLimit: 4096,
    },
  }
})
