// src/main.js
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import router from './router'; // Importa il router
import i18n from './i18n';
import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';
import VueMatomo from 'vue-matomo';

// Crea l'app Vue
const app = createApp(App);
const head = createHead();

// Usa i plugin
app.use(head);
app.use(router); // Usa il router
app.use(i18n);

// Configura Matomo
app.use(VueMatomo, {
  host: 'https://analysis.bitcoinbeer.events/', // URL del tuo server Matomo
  siteId: 1, // ID del sito configurato su Matomo
  router, // Associa il router per tracciare le visualizzazioni di pagina
  enableLinkTracking: true, // Abilita il tracciamento dei link
  trackInitialView: true, // Traccia la visualizzazione della prima pagina
});

// Monta l'app
app.mount('#app');
