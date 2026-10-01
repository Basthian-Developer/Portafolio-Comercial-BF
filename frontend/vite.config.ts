import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// React transforma JSX y Tailwind genera las utilidades utilizadas en el código.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // El preview del build es solo frontend; reenviamos /api al FastAPI local.
  // En Vercel este proxy no se usa porque /api llega al backend del proyecto.
  preview: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
