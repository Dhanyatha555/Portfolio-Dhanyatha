import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['sb-6y3qbiugaep1.vercel.run'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vanta: ['vanta/dist/vanta.fog.min.js'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
