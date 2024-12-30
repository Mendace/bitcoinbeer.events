<template>
  <section class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 w-full">
    <div class="w-full relative">
      <!-- Titolo della Sezione -->
      <h2 class="text-3xl font-bold mb-6 text-center">
        {{ $t("events.upcomingEvents") }}
      </h2>

      <!-- Carosello -->
      <div class="relative overflow-hidden">
        <!-- Freccia Sinistra -->
        <button
          v-if="showArrows"
          @click="prevSlide"
          class="carousel-arrow
                 absolute left-2 top-1/2 transform -translate-y-1/2
                 z-10
                 p-2 rounded-full
                 text-sm md:text-base lg:text-lg
                 w-8 h-8 md:w-10 md:h-10
                 flex items-center justify-center"
          aria-label="{{ $t('events.previous') }}"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

        <!-- Contenitore delle Card -->
        <div
          ref="carousel"
          class="flex items-center transition-transform duration-300
                 overflow-hidden"
          :class="{
            'justify-center': events.length <= visibleCards
          }"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <!-- Singola Card -->
          <div
            v-for="event in events"
            :key="event.id"
            class="flex-shrink-0 px-4"
            :class="getCardWidthClass()"
          >
            <div
              class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4
                     transition-transform duration-300 hover:scale-105"
            >
              <img
                v-if="event.locandina"
                :src="event.locandina"
                alt="{{ $t('events.posterAlt') }}"
                class="w-full h-40 object-cover rounded-md mb-4"
              />
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
                <a
                  v-if="event.ticket_purchase_url"
                  :href="event.ticket_purchase_url"
                  target="_blank"
                  class="glass-button text-sm"
                >
                  {{ $t("events.buyTickets") }}
                </a>
                <button
                  @click="openShareModal(event)"
                  class="social-button"
                  aria-label="{{ $t('events.shareEvent') }}"
                >
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Freccia Destra -->
        <button
          v-if="showArrows"
          @click="nextSlide"
          class="carousel-arrow
                 absolute right-2 top-1/2 transform -translate-y-1/2
                 z-10
                 p-2 rounded-full
                 text-sm md:text-base lg:text-lg
                 w-8 h-8 md:w-10 md:h-10
                 flex items-center justify-center"
          aria-label="{{ $t('events.next') }}"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Modal per condivisione social -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="modal-content">
        <button @click="closeShareModal" class="close-button">
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
      currentIndex: 0,
      visibleCards: 3, // di base desktop, riconfigurato al resize
      showModal: false,
      selectedEvent: null,
    };
  },
  computed: {
    // Mostra le frecce solo se ci sono più eventi di quelli che si possono vedere contemporaneamente
    showArrows() {
      return this.events.length > this.visibleCards;
    },
  },
  methods: {
    formatDateTime(dateTime) {
      // Semplice sostituzione spazio->T, se la data è in formato "YYYY-MM-DD HH:MM:SS"
      const date = new Date(dateTime.replace(" ", "T"));
      if (isNaN(date)) {
        return this.$t("events.invalidDate");
      }
      return date.toLocaleString();
    },
    // Avanzamento carosello
    nextSlide() {
      const maxIndex = Math.ceil(this.events.length / this.visibleCards) - 1;
      if (this.currentIndex < maxIndex) {
        this.currentIndex++;
      }
    },
    // Retrocedi carosello
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    // Apertura modale condivisione
    openShareModal(event) {
      this.selectedEvent = event;
      this.showModal = true;
    },
    // Chiusura modale condivisione
    closeShareModal() {
      this.showModal = false;
      this.selectedEvent = null;
    },
    // Gestisce quante card mostrare
    updateVisibleCards() {
      const screenWidth = window.innerWidth;
      // < 640px => 1 card
      if (screenWidth < 640) {
        this.visibleCards = 1;
      }
      // >= 640px e < 1024px => 2 card
      else if (screenWidth < 1024) {
        this.visibleCards = 2;
      }
      // >= 1024px => 3 card
      else {
        this.visibleCards = 3;
      }
      // reimposta l'indice quando cambia la "griglia"
      this.currentIndex = 0;
    },
    getCardWidthClass() {
      if (this.visibleCards === 1) return "w-full";
      if (this.visibleCards === 2) return "w-1/2";
      return "w-1/3";
    },
    // Caricamento eventi
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
/* Sezione background scuro */
section {
  background: linear-gradient(135deg, #000000, #121212);
  color: white;
  padding: 2rem 0;
}

/* Titolo */
h2 {
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Card Container & Card Style */
.flex-shrink-0 {
  padding: 0.5rem;
}

.bg-gray-100,
.dark\:bg-gray-800 {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  margin: auto; /* Centra la card nel suo spazio */
}

.bg-gray-100 img,
.dark\:bg-gray-800 img {
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

h3 {
  color: white;
  font-size: 1rem;
}

p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Pulsante Glass */
.glass-button {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
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
.carousel-arrow {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: none;
  transition: background 0.3s ease, transform 0.3s ease;
}
.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: scale(1.1);
}

/* Modal Condivisione */
.modal-content {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  text-align: center;
  backdrop-filter: blur(15px);
}

.close-button {
  background: transparent;
  border: none;
  color: white;
  float: right;
  font-size: 1.2rem;
  cursor: pointer;
}

.close-button:hover {
  color: #ccc;
}
</style>
