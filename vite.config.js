import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias para la carpeta src (opcional)
    },
  },
  build: {
    rollupOptions: {
      external: [], // Asegúrate de que axios no esté listado aquí
    },
  },
})
