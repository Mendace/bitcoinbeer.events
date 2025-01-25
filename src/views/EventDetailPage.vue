<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Barra superiore con titolo e guest -->
    <div class="relative bg-orange-600 py-12">
      <div class="container mx-auto px-6 flex flex-col items-center main">
        <!-- Titolo -->
        <h1 class="text-5xl md:text-6xl font-extrabold text-center">
          {{ event?.title || "Evento non trovato" }}
        </h1>
        <!-- Guest -->
        <p v-if="event?.guest" class="mt-4 text-xl font-extrabold text-gray-100 text-center">
          Ospite: <span class="text-white">{{ event.guest }}</span>
        </p>
      </div>
    </div>

    <!-- Locandina sovrapposta -->
    <div class="relative max-w-4xl mx-auto px-4 -mt-16 z-10 loca">
      <img
        :src="event?.locandina"
        alt="Locandina"
        class="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-transform duration-500 hover:scale-105"
      />
    </div>

    <!-- Descrizione -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold mb-4">Descrizione</h2>
      <p class="text-lg leading-relaxed whitespace-pre-line text-gray-300">
        {{ event?.description || "Descrizione non disponibile" }}
      </p>
    </div>

    <!-- Mappa -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">Location</h2>
      <div id="map" class="w-full h-80 rounded-lg shadow-md"></div>
    </div>

    <!-- Informazioni aggiuntive e pulsante -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p v-if="event?.venue" class="mb-4 text-gray-400">
            <strong>Venue:</strong> <span class="text-white">{{ event.venue }}</span>
          </p>
          <p class="mb-4 text-gray-400">
            <strong>Data e ora:</strong> <span class="text-white">{{ formatDateTime(event?.event_date) }}</span>
          </p>
          <p class="mb-4 text-gray-400">
            <strong>Indirizzo:</strong> <span class="text-white">{{ event?.address }}</span>
          </p>
          <p v-if="event?.ticket_price && event.ticket_price !== '0.00'" class="mb-4 text-gray-400">
            <strong>Prezzo:</strong> <span class="text-white">{{ event.ticket_price }} €</span>
          </p>
        </div>
        <div class="flex items-center">
         <!-- Pulsante Acquista -->
         <button
         class="relative inline-block py-3 px-6 font-bold text-white border border-white rounded-full overflow-hidden group focus:outline-none focus:ring-4 focus:ring-orange-500"
         @click="goToTicket(event)"
          >
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          <span class="relative z-10">Acquista</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "EventDetailPage",
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  methods: {
    async fetchEvent(id) {
      try {
        const response = await fetch("https://api.bitcoinbeer.events/get_events.php");
        const data = await response.json();
        const found = data.events.find((ev) => ev.id == id);
        if (!found) {
          console.error("Evento non trovato con ID:", id);
          return;
        }
        this.event = found;

        // Inizializza la mappa una volta trovato l'evento
        this.$nextTick(() => {
          this.initMap();
        });
      } catch (err) {
        console.error("Errore nel caricamento:", err);
      }
    },
    formatDateTime(dateTime) {
      if (!dateTime) return "Data non disponibile";
      const d = new Date(dateTime.replace(" ", "T"));
      return isNaN(d) ? "Data non valida" : d.toLocaleString();
    },
    initMap() {
      if (!this.event || !this.event.latitude || !this.event.longitude) {
        console.warn("Coordinate non valide");
        return;
      }
      const lat = parseFloat(this.event.latitude);
      const lon = parseFloat(this.event.longitude);
      this.map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap",
      }).addTo(this.map);
      L.marker([lat, lon]).addTo(this.map);
    },
    goToTicket(event) {
      const url =
        event.eventbrite_url && (event.tag === "FREE_EDU" || event.tag === "FREE_PUB")
          ? event.eventbrite_url
          : event.ticket_purchase_url;
      if (url) window.open(url, "_blank");
    },
  },
  async created() {
    const id = this.$route?.params?.id || this.id;
    if (id) await this.fetchEvent(id);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.main{
  margin-top: 8rem;
  margin-bottom: 8rem;
}
.loca{
  margin-top: -10rem;
}
#map {
  width: 100%;
  height: 320px;
}

:root {
  font-family: "Roboto", sans-serif;
}
</style>
