import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// React transforma JSX y Tailwind genera las utilidades utilizadas en el código.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
