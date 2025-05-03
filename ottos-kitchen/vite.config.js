import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ist363/ottos-kitchen/', // ← Add this line
  plugins: [react()],
})
