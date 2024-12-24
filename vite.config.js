import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // Assicurati di usare questa versione per i custom elements
    },
  },
  assetsInclude: ['**/*.JPG'], // Include i file con estensione .JPG
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      external: ['lottie-player'], // Escludi il lottie-player dal bundle
    },
  },
});
