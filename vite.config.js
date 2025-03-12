import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], 
  server: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "https://message-board-g0z0.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
})
