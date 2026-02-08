import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose to network
    proxy: {
      '/api': 'http://localhost:3001' // Proxy API requests to backend
    }
  }
})
