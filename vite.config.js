import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/', // Assicurati che il percorso sia corretto
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // Usa la versione per custom elements
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.png', '**/*.webp', '**/*.svg'], // Estendi i tipi di file inclusi
  define: {
    'process.env': {}, // Definisci env per compatibilità
  },
  build: {
    rollupOptions: {
      // Specifica dipendenze da escludere se necessario
      external: [],
    },
  },
  server: {
    host: true, // Permetti accesso alla rete locale
    strictPort: true, // Usa sempre la stessa porta
  },
});
