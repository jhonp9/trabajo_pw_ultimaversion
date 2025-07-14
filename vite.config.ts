import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://trabajo-pw-backend-otv4.onrender.com', // Backend en puerto 3000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: '/trabajo_pw_ultimaversion', // Ruta base para GitHub Pages
});