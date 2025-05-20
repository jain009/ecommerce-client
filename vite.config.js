import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests
      '/api': {
        target: 'https://ecommerce-backend-1-npbm.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // Additional server configurations
    host: 'netlify',
    port: https://jolly-alpaca-5fcf71.netlify.app,
    strictPort: true,
    open: true
  }
});
