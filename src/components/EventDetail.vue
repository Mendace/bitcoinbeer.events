<template>
  <section class="bg-black text-white py-8 w-full">
    <div class="container mx-auto px-4">
      <!-- Titolo Sezione -->
      <h2 class="text-3xl font-bold mb-6 text-center">
        {{ $t("events.upcomingEvents") }}
      </h2>

      <!-- Lista Eventi (solo i primi 3) -->
      <div class="flex flex-col items-center gap-8">
        <div
          v-for="(event, idx) in events.slice(0, 3)" 
          :key="event.id"
          class="relative w-full md:max-w-4xl bg-black border border-white rounded-lg overflow-hidden shadow-lg"
        >
          <!-- Locandina in alto -->
          <div class="w-full">
            <img
              v-if="event.locandina"
              :src="event.locandina"
              alt="Locandina Evento"
              class="w-full h-148 object-cover"
            />
          </div>

          <!-- Badge Tag -->
          <div
            v-if="event.tag"
            class="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded"
          >
            {{ event.tag }}
          </div>

          <!-- Corpo Principale -->
          <div class="p-4 bg-black">
            <div class="flex items-center mb-3">
              <!-- Data -->
              <div class="bg-gray-200 text-gray-800 w-14 h-14 flex flex-col items-center justify-center rounded mr-3">
                <span class="text-md font-bold">
                  {{ getDay(event.event_date) }}
                </span>
                <span class="text-xs font-semibold">
                  {{ getMonth(event.event_date) }}
                </span>
              </div>
              <!-- Titolo -->
              <h3 class="text-xl font-semibold leading-tight">
                {{ event.title }}
              </h3>
            </div>

            <!-- Luogo, Indirizzo, Guest, ecc. -->
            <p class="text-sm mb-1">
              <strong>Luogo:</strong> {{ event.venue }}
            </p>
            <p class="text-sm mb-1">
              <strong>Indirizzo:</strong> {{ event.address }}
            </p>
            <p v-if="event.guest" class="text-sm mb-1">
              <strong>Guest:</strong> {{ event.guest }}
            </p>
            <p class="text-sm mb-2">
              <strong>Data:</strong> {{ formatDateTime(event.event_date) }}
            </p>
            <p v-if="event.location" class="text-sm mb-1">
              <strong>Location (DB field):</strong> {{ event.location }}
            </p>
            <p v-if="event.price && event.price != '0.00'" class="text-sm mb-1">
              <strong>Prezzo:</strong> {{ event.price }} €
            </p>
          </div>

          <!-- Pulsanti in basso -->
          <div class="flex">
            <!-- Condividi -->
            <button
              class="w-1/2 bg-blue-500 py-3 text-center text-white font-bold hover:bg-blue-600 transition-colors"
              @click="openShareModal(event)"
            >
              {{ $t("events.share") }}
            </button>

            <!-- Acquista (FREE_PUB o FREE_EDU => eventbrite_url) -->
            <button
              v-if="isFreeEvent(event)"
              class="w-1/2 bg-orange-500 py-3 text-center text-white font-bold hover:bg-orange-600 transition-colors"
              @click="openLink(event.eventbrite_url)"
            >
              {{ $t("events.buyTickets") }}
            </button>
            <!-- Altrimenti, se c'è ticket_purchase_url -->
            <button
              v-else-if="event.ticket_purchase_url"
              class="w-1/2 bg-orange-500 py-3 text-center text-white font-bold hover:bg-orange-600 transition-colors"
              @click="openLink(event.ticket_purchase_url)"
            >
              {{ $t("events.buyTickets") }}
            </button>
            <!-- Se manca, non mostrare nulla -->
          </div>
        </div>
      </div>

      <!-- Pulsante "Vedi tutti" -->
      <div class="flex justify-center mt-6">
        <router-link
          to="/all-events"
          class="relative inline-block py-3 px-6 font-bold text-white border border-white rounded-full overflow-hidden group focus:outline-none focus:ring-4 focus:ring-orange-500">
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          <span class="relative z-10">{{ $t("events.seeAllEvents") }}</span>
        </router-link>
      </div>
    </div>

    <!-- Modal di Condivisione -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="modal-content relative">
        <button @click="closeShareModal" class="close-button absolute top-2 right-2">
          <i class="fas fa-times"></i>
        </button>
        <h3 class="text-xl font-semibold mb-4">
          {{ $t("events.share") }} "{{ selectedEvent?.title }}"
        </h3>
        <div class="flex justify-around">
          <a
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedEvent?.title)}&url=${encodeURIComponent(selectedEvent?.ticket_purchase_url)}`"
            target="_blank"
            class="social-link twitter"
          >
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a
            :href="`https://t.me/share/url?url=${encodeURIComponent(selectedEvent?.ticket_purchase_url)}&text=${encodeURIComponent(selectedEvent?.title)}`"
            target="_blank"
            class="social-link telegram"
          >
            <i class="fab fa-telegram fa-2x"></i>
          </a>
          <a
            :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedEvent?.title)}%20${encodeURIComponent(selectedEvent?.ticket_purchase_url)}`"
            target="_blank"
            class="social-link whatsapp"
          >
            <i class="fab fa-whatsapp fa-2x"></i>
          </a>
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedEvent?.ticket_purchase_url)}`"
            target="_blank"
            class="social-link facebook"
          >
            <i class="fab fa-facebook fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      events: [],
      showModal: false,
      selectedEvent: null,
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch("https://api.bitcoinbeer.events/get_events.php");
        const data = await response.json();
        this.events = data.events.filter(e => e.category === this.category);
      } catch (err) {
        console.error("Errore nel caricamento degli eventi:", err);
      }
    },
    formatDateTime(dateTime) {
      const d = new Date(dateTime.replace(" ", "T"));
      if (isNaN(d)) return this.$t("events.invalidDate");
      return d.toLocaleString();
    },
    getDay(dateTime) {
      const d = new Date(dateTime.replace(" ", "T"));
      return isNaN(d) ? "--" : d.getDate();
    },
    getMonth(dateTime) {
      const d = new Date(dateTime.replace(" ", "T"));
      if (isNaN(d)) return "---";
      const months = ["GEN","FEB","MAR","APR","MAG","GIU","LUG","AGO","SET","OTT","NOV","DIC"];
      return months[d.getMonth()];
    },
    isFreeEvent(e) {
      return (
        (e.tag === 'FREE_PUB' || e.tag === 'FREE_EDU') &&
        e.has_tickets === 0 &&
        e.eventbrite_url
      );
    },
    openLink(url) {
      if (url) window.open(url, "_blank");
    },
    openShareModal(event) {
      this.selectedEvent = event;
      this.showModal = true;
    },
    closeShareModal() {
      this.showModal = false;
      this.selectedEvent = null;
    },
  },
  async created() {
    await this.fetchEvents();
  },
};
</script>

<style scoped>
section {
  min-height: 80vh;
}

.modal-content {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  text-align: center;
  backdrop-filter: blur(15px);
  max-width: 400px;
}
.close-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}
.close-button:hover {
  color: #ccc;
}
.social-link {
  margin: 0 0.5rem;
}
</style>
