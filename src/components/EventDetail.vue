<template>
  <section class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 w-full">
    <div class="w-full overflow-hidden relative">
      <!-- Titolo della Sezione -->
      <h2 class="text-3xl font-bold mb-6 text-center">
        {{ $t("events.upcomingEvents") }}
      </h2>

      <!-- Carosello -->
      <div class="relative overflow-hidden">
        <!-- Freccia Sinistra -->
        <button v-if="events.length > 1" @click="prevSlide"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 z-10"
          aria-label="{{ $t('events.previous') }}">
          <i class="fas fa-chevron-left text-gray-800 dark:text-gray-200"></i>
        </button>

        <!-- Contenitore delle Card -->
        <div ref="carousel" class="flex justify-center transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="event in events" :key="event.id" class="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4">
            <div
              class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105">
              <img v-if="event.locandina" :src="event.locandina" alt="{{ $t('events.posterAlt') }}"
                class="w-full h-40 object-cover rounded-md mb-4" />
              <h3 class="text-xl font-semibold mb-2">{{ event.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>{{ $t('events.venue') }}:</strong> {{ event.venue }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>{{ $t('events.address') }}:</strong> {{ event.address }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <strong>{{ $t('Date') }}:</strong>
                {{ formatDateTime(event.event_date) }}
              </p>
              <div class="flex justify-between items-center">
                <a v-if="event.ticket_purchase_url" :href="event.ticket_purchase_url" target="_blank"
                  class="glass-button text-sm">
                  {{ $t("events.buyTickets") }}
                </a>
                <button @click="openShareModal(event)" class="social-button" aria-label="{{ $t('events.shareEvent') }}">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Freccia Destra -->
        <button v-if="events.length > 1" @click="nextSlide"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 z-10"
          aria-label="{{ $t('events.next') }}">
          <i class="fas fa-chevron-right text-gray-800 dark:text-gray-200"></i>
        </button>
      </div>
    </div>

    <!-- Modal per condivisione social -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="modal-content">
        <button @click="closeShareModal" class="close-button">
          <i class="fas fa-times"></i>
        </button>
        <h3 class="text-xl font-semibold mb-4">
          {{ $t("events.share") }} "{{ selectedEvent?.title }}"
        </h3>
        <div class="flex justify-around">
          <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedEvent?.title)}&url=${encodeURIComponent(selectedEvent?.ticket_purchase_url)}`"
            target="_blank" class="social-link twitter">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a :href="`https://t.me/share/url?url=${encodeURIComponent(selectedEvent?.ticket_purchase_url)}&text=${encodeURIComponent(selectedEvent?.title)}`"
            target="_blank" class="social-link telegram">
            <i class="fab fa-telegram fa-2x"></i>
          </a>
          <a :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedEvent?.title)}%20${encodeURIComponent(selectedEvent?.ticket_purchase_url)}`"
            target="_blank" class="social-link whatsapp">
            <i class="fab fa-whatsapp fa-2x"></i>
          </a>
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedEvent?.ticket_purchase_url)}`"
            target="_blank" class="social-link facebook">
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
      currentIndex: 0,
      visibleCards: 3,
      showModal: false,
      selectedEvent: null,
    };
  },
  methods: {
    formatDateTime(dateTime) {
      const date = new Date(dateTime.replace(" ", "T"));
      if (isNaN(date)) {
        return this.$t("events.invalidDate");
      }
      return date.toLocaleString();
    },
    nextSlide() {
      if (this.currentIndex < Math.ceil(this.events.length / this.visibleCards) - 1) {
        this.currentIndex++;
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    openShareModal(event) {
      this.selectedEvent = event;
      this.showModal = true;
    },
    closeShareModal() {
      this.showModal = false;
      this.selectedEvent = null;
    },
    updateVisibleCards() {
      const screenWidth = window.innerWidth;
      this.visibleCards = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3;
      this.currentIndex = 0;
    },
    async fetchEvents() {
      try {
        const response = await fetch("https://api.bitcoinbeer.events/get_events.php");
        const data = await response.json();
        this.events = data.events.filter((event) => event.category === this.category);
      } catch (error) {
        console.error("Errore nel caricamento degli eventi:", error);
      }
    },
  },
  async created() {
    await this.fetchEvents();
  },
  mounted() {
    this.updateVisibleCards();
    window.addEventListener("resize", this.updateVisibleCards);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateVisibleCards);
  },
};

</script>

<style scoped>
/* Background della sezione */
section {
  background: linear-gradient(135deg, #000000, #121212);
  /* Sfondo elegante scuro */
  color: white;
  /* Testo in bianco per visibilità */
  padding: 2rem 0;
}

/* Titolo della sezione */
h2 {
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Contenitore delle card */
/* Dimensioni generali delle card */
.flex-shrink-0 {
  flex-shrink: 0;
  padding: 0.5rem;
  /* Spaziatura esterna */
}

.bg-gray-100,
.dark\:bg-gray-800 {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  /* Riduciamo gli angoli arrotondati */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  /* Limita la larghezza delle card */
  margin: auto;
  /* Centra le card nel loro contenitore */
}

/* Immagini nelle card */
.bg-gray-100 img,
.dark\:bg-gray-800 img {
  height: 120px;
  /* Riduciamo l'altezza delle immagini */
  object-fit: cover;
  border-radius: 8px;
  /* Riduciamo gli angoli dell'immagine */
}

/* Testo nelle card */
h3 {
  color: white;
  font-size: 1rem;
  /* Riduciamo la dimensione del titolo */

}

p {
  font-size: 0.875rem;
  /* Riduciamo la dimensione del testo */
  color: rgba(255, 255, 255, 0.7);
}

/* Pulsante Glass Morphism */
.glass-button {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  /* Riduciamo il padding interno */
  font-size: 0.875rem;
  /* Riduciamo la dimensione del testo */
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
}

/* Pulsante Condivisione */
.social-button {
  width: 32px;
  height: 32px;
  /* Riduciamo il pulsante di condivisione */
  font-size: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-button:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
}

/* Frecce Navigazione */
button {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s ease, transform 0.3s ease;
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

button i {
  color: white;
}

/* Modal */
.modal-content {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  text-align: center;
  backdrop-filter: blur(15px);
}
</style>