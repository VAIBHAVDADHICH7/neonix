import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssMinify: true,
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        calculator: resolve(__dirname, 'solar-calculator.html'),
        residential: resolve(__dirname, 'residential-solar.html'),
        commercial: resolve(__dirname, 'commercial-solar.html'),
        industrial: resolve(__dirname, 'industrial-solar.html'),
        amc: resolve(__dirname, 'solar-amc.html'),
        pmsuryaghar: resolve(__dirname, 'pm-surya-ghar-yojana.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lenis/')) {
            return 'vendor-lenis';
          }
          if (id.includes('src/components/ConsultationModal') || id.includes('src/components/UI/')) {
            return 'shared-ui';
          }
        },
      },
    },
  },
})
