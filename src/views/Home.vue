<script setup>
import { useHead } from '@vueuse/head';

useHead({
  title: 'Bitcoin Beer - Meetup e Incontri Bitcoin in Italia',
  meta: [
    { name: 'description', content: 'Partecipa ai meetup Bitcoin in Italia: eventi, incontri e networking in tutte le principali città italiane. Scopri di più con Bitcoin Beer.' },
    { name: 'keywords', content: 'Bitcoin, Meetup Bitcoin, Incontri Bitcoin, Eventi Bitcoin, Bitcoin Italia, Milano, Roma, Napoli, Torino, Bologna, Firenze, Verona, Venezia, Bari, Palermo, Catania, Trieste, Meetup Blockchain, Tecnologia Bitcoin' },
    { name: 'author', content: 'BitcoinBeer' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { property: 'og:title', content: 'Bitcoin Beer - Meetup e Incontri Bitcoin in Italia' },
    { property: 'og:description', content: 'Scopri i migliori meetup Bitcoin in Italia, organizza incontri e connettiti con appassionati di Bitcoin in tutta Italia.' },
    { property: 'og:image', content: '/assets/blog.webp' },
    { property: 'og:url', content: 'https://bitcoinbeer.events' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Bitcoin Beer - Meetup e Incontri Bitcoin in Italia' },
    { name: 'twitter:description', content: 'Partecipa ai meetup Bitcoin in Italia: eventi e networking in tutte le principali città italiane.' },
    { name: 'twitter:image', content: '/assets/blog.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EventSeries',
        name: 'Bitcoin Beer Meetup',
        description: 'Partecipa ai meetup Bitcoin in Italia: eventi, incontri e networking in tutte le principali città italiane.',
        url: 'https://bitcoinbeer.events',
        location: [
          {
            '@type': 'Place',
            name: 'Milano Meetup',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Milano',
              addressCountry: 'IT',
            },
          },
          {
            '@type': 'Place',
            name: 'Roma Meetup',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Roma',
              addressCountry: 'IT',
            },
          },
          {
            '@type': 'Place',
            name: 'Napoli Meetup',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Napoli',
              addressCountry: 'IT',
            },
          },
          {
            '@type': 'Place',
            name: 'Faenza Meetup',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Faenza',
              addressCountry: 'IT',
            },
          },
          {
            '@type': 'Place',
            name: 'Bologna Meetup',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bologna',
              addressCountry: 'IT',
            },
          },
          {
            '@type': 'Place',
            name: 'Firenze Meetup',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Firenze',
              addressCountry: 'IT',
            },
          },
        ],
        image: '/assets/blog.webp',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        organizer: {
          '@type': 'Organization',
          name: 'Bitcoin Beer',
          url: 'https://bitcoinbeer.events',
        },
      }),
    },
  ],
});
</script>


<template>
  <div>
    <!-- Loader -->
    <div v-if="isLoading" class="loading-screen">
      <img src="/logos/marker.webp" alt="Logo" class="spinner" />
    </div>

    <!-- Contenuto della Home -->
    <div v-else class="main">
      <HeroSection />
      <BrandCarousel />
      <EventDetail />
      <Details />
      <CardsFloat />
      <Chapter />
      <Stats />
      <EduPub />
      <Donation />
      <Blog />
      <Mailing />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import HeroSection from "../components/HeroSection.vue";
import BrandCarousel from "../components/BrandCarousel.vue";
import EventDetail from "../components/EventDetail.vue";
import Details from "../components/Details.vue";
import CardsFloat from "../components/CardsFloat.vue";
import Chapter from "../components/Chapter.vue";
import Stats from "../components/Stats.vue";
import EduPub from "../components/EduPub.vue";
import Donation from "../components/Donation.vue";
import Blog from "../components/Blog.vue";
import Mailing from "../components/Mailing.vue";

export default {
  name: "Home",
  components: {
    HeroSection,
    BrandCarousel,
    EventDetail,
    Details,
    CardsFloat,
    Chapter,
    Stats,
    EduPub,
    Donation,
    Blog,
    Mailing,
  },
  setup() {
    const isLoading = ref(true);

    onMounted(() => {
      // Simula un tempo di caricamento (ad esempio, 2 secondi)
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    return { isLoading };
  },
};

console.log(

"%c ███████╗  ██████╗ █████╗ ███╗   ███╗\n" +           
  " ██╔════╝ ██╔════╝██╔══██╗████╗ ████║\n" +	
  " ██████╗░ ██║     ███████║██╔████╔██║\n" +    
  " ╚═══██╗░ ██║     ██╔══██║██║╚██╔╝██║\n" +
  " ██████║░ ╚██████╗██║  ██║██║ ╚═╝ ██║\n" +
  " ╚═════╝   ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝\n",
    "color: #FF0000; font-family: monospace; font-size: 16px; font-weight: bold;"
  );

console.log(
  "%c🚨 Teniamo lontano un Craig Wright come te!\n" +
  "🔒 Questo sito protegge il suo codice sorgente per garantire sicurezza e integrità.\n" +
  "💡 %cSe vuoi saperne di più, visita il nostro sito ufficiale!",
  "color: #FFD700; font-size: 16px; font-weight: bold;",
  "color: #00FFFF; font-size: 14px;"
);
</script>

<style scoped>
/* Stile per lo spinner */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black; /* Sfondo nero */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.main {
  background-color: black;
}

.spinner {
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
