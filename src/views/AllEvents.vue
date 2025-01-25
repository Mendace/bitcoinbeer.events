<template>
    <!-- Contenitore principale con sfondo nero -->
    <div
      class="relative w-full min-h-screen bg-black text-white 
             bg-[radial-gradient(circle_at_top_left,_#333,_#000)]"
    >
      <!-- SEZIONE IN ALTO: Titolo + Descrizione -->
      <header class="container mx-auto px-4 pt-24 pb-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-3">
          {{ $t("eventspage.title") }}
        </h1>
        <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {{ $t("eventspage.description") }}
        </p>
      </header>
  
      <!-- GRIGLIA DEGLI EVENTI -->
      <div class="container mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Card dell'evento -->
          <div
            v-for="event in events"
            :key="event.id"
            class="relative p-6 rounded-xl shadow-lg
                   bg-white bg-opacity-10 
                   backdrop-blur-md 
                   flex flex-col justify-between"
          >
            <!-- Immagine (Locandina) -->
            <img
              :src="event.locandina"
              alt="Locandina evento"
              class="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
            />
  
            <!-- Titolo -->
            <h2 class="text-2xl font-bold mb-4">
              {{ event.title }}
            </h2>
  
            <!-- Pulsante Explore -->
            <button
            class="relative inline-block py-3 px-6 font-bold text-white border border-white rounded-full overflow-hidden group focus:outline-none focus:ring-4 focus:ring-orange-500"
            @click="goToEvent(event)"
            >
            <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            <span class="relative z-10">{{ $t("eventspage.explore") }}</span>

            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AllEvents",
    data() {
      return {
        events: [],
      };
    },
    methods: {
      async fetchEvents() {
        try {
          const response = await fetch("https://api.bitcoinbeer.events/get_events.php");
          const data = await response.json();
          this.events = data.events;
        } catch (err) {
          console.error("Errore nel caricamento degli eventi:", err);
        }
      },
      goToEvent(event) {
        this.$router.push({ name: "EventDetailPage", params: { id: event.id } });
      },
    },
    async created() {
      await this.fetchEvents();
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap");
  
  :root {
    --glass-bg: rgba(255, 255, 255, 0.1);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html,
  body {
    background-color: #000;
    font-family: "Poppins", sans-serif;
  }
  </style>
  