<template>
  <div class="results-page">
    <!-- Barra di ricerca -->
    <div class="search-header">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cerca (es. Ristorante Bitcoin Milano / 25 marzo)"
          @input="fetchData"
          @keyup.enter="doSearch"
        />
        <button @click="doSearch">Cerca</button>
      </div>
    </div>

    <!-- Contenitore risultati centrato -->
    <div class="results-wrapper">
      <div class="results-container">
        <h1 class="results-title">Risultati per: "{{ searchQuery }}"</h1>

        <!-- Se la query è una data ed esiste un evento, lo mostriamo come primo risultato -->
        <EventBox 
          v-if="dateEvent" 
          :event_date="dateEvent.event_date" 
          :title="dateEvent.title" 
          :description="dateEvent.description" 
        />

        <!-- Se loading, mostra lo skeleton loader -->
        <div v-if="loading">
          <SkeletonCard v-for="n in 6" :key="n" />
        </div>

        <!-- Altrimenti mostra i risultati normali -->
        <div v-else>
          <p v-if="places.length === 0" class="status">Nessun risultato trovato.</p>
          <div
            v-for="place in places"
            :key="place.id"
            class="result-item"
            @click="openModal(place)"
          >
            <!-- Nome -->
            <h2 class="result-name">{{ place.name || 'Senza nome' }}</h2>

            <!-- Indirizzo -->
            <p class="result-address">
              {{ place.address_street || '' }}
              {{ place.address_housenumber || '' }},
              {{ place.address_city || 'N/A' }}
            </p>

            <!-- Metodi di pagamento -->
            <p
              class="payment-line"
              v-if="place.payment_onchain === 1 || place.payment_lightning === 1 || place.payment_lightning_contactless === 1"
            >
              Payment:
              <span v-if="place.payment_onchain === 1" class="icon-with-text">
                <img :src="bitcoinIcon" alt="Bitcoin Onchain" class="icon-crypto" />
                On-chain
              </span>
              <span
                v-if="place.payment_lightning === 1 || place.payment_lightning_contactless === 1"
                class="icon-with-text"
              >
                <img :src="lightningIcon" alt="Lightning Payment" class="icon-crypto" />
                Lightning
              </span>
            </p>

            <!-- Descrizione -->
            <p v-if="place.description" class="result-description">
              {{ place.description }}
            </p>

            <!-- Sito web -->
            <p v-if="place.website" class="result-website">
              <a :href="place.website" target="_blank">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/841/841364.png"
                  alt="Sito web"
                  class="web-icon"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal con dettagli -->
    <transition name="fade">
      <div v-if="selectedPlace" class="modal-overlay" @click="selectedPlace = null">
        <div class="modal-content" @click.stop>
          <span class="close-btn" @click="selectedPlace = null">&times;</span>
          <div class="modal-body">
            <div class="modal-text">
              <h2>{{ selectedPlace.name }}</h2>
              <p>
                <strong>Indirizzo:</strong>
                {{ selectedPlace.address_street || '' }}
                {{ selectedPlace.address_housenumber || '' }},
                {{ selectedPlace.address_city || 'N/A' }}
              </p>
              <!-- Metodi di pagamento nel modal -->
              <p
                class="payment-line"
                v-if="selectedPlace.payment_onchain === 1 || selectedPlace.payment_lightning === 1 || selectedPlace.payment_lightning_contactless === 1"
              >
                Payment:
                <span v-if="selectedPlace.payment_onchain === 1" class="icon-with-text">
                  <img :src="bitcoinIcon" alt="Bitcoin Onchain" class="icon-crypto" />
                  On-chain
                </span>
                <span
                  v-if="selectedPlace.payment_lightning === 1 || selectedPlace.payment_lightning_contactless === 1"
                  class="icon-with-text"
                >
                  <img :src="lightningIcon" alt="Lightning Payment" class="icon-crypto" />
                  Lightning
                </span>
              </p>
              <p v-if="selectedPlace.website" class="modal-website">
                <strong>Sito web:</strong>
                <a :href="selectedPlace.website" target="_blank">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/841/841364.png"
                    alt="Sito web"
                    class="web-icon"
                  />
                </a>
              </p>
              <p class="modal-description">{{ selectedPlace.description }}</p>
            </div>
            <!-- Mappa Leaflet -->
            <div class="modal-map" ref="map"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import L from "leaflet";
import SkeletonCard from "../components/SkeletonCard.vue";
import EventBox from "../components/EventBox.vue";
import bitcoinIconPath from "/logos/icons8-bitcoin-48.png";
import lightningIconPath from "/logos/icons8-fulmine-48.png";

export default {
  name: "ResultsPage",
  components: {
    SkeletonCard,
    EventBox,
  },
  data() {
    return {
      places: [],
      loading: false,
      searchQuery: this.$route.query.q || "",
      selectedPlace: null,
      bitcoinIcon: bitcoinIconPath,
      lightningIcon: lightningIconPath,
      dateEvent: null // Variabile per l'evento della data cercata
    };
  },
  computed: {
    formattedDay() {
      return this.event_date ? new Date(this.event_date).getDate() : "--";
    },
    formattedMonth() {
      const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
      return this.event_date ? months[new Date(this.event_date).getMonth()] : "--";
    }
  },

  methods: {
    async fetchData() {
      this.loading = true;
      try {
        // Se la query è una data, esegui la fetch dell'evento per data
        if (this.isDateQuery && this.formattedSearchDate) {
          await this.fetchEventByDate(this.formattedSearchDate);
        } else {
          this.dateEvent = null;
        }
        // Carica i normali risultati di ricerca
        const params = new URLSearchParams({ limit: 1000, offset: 0 });
        if (this.searchQuery.trim()) {
          params.append("search", this.searchQuery.trim());
        }
        const response = await fetch(`https://api.bitcoinbeer.events/api/places.php?${params.toString()}`);
        const result = await response.json();
        this.places = result.data || [];
      } catch (error) {
        console.error("Errore nel fetch dei dati:", error);
        this.places = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchEventByDate(formattedDate) {
      try {
        const url = "https://api.bitcoinbeer.events/api/events_box.php?q=" + encodeURIComponent(formattedDate);
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.event_date) {
          this.dateEvent = data;
        } else {
          this.dateEvent = null;
        }
      } catch (error) {
        console.error("Errore nella ricerca per data:", error);
        this.dateEvent = null;
      }
    },
    doSearch() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push({ name: "Results", query: { q: this.searchQuery } });
        this.fetchData();
      }
    },
    openModal(place) {
      this.selectedPlace = place;
      this.$nextTick(() => {
        this.loadMap(place);
      });
    },
    loadMap(place) {
      if (this.map) this.map.remove();
      this.map = L.map(this.$refs.map).setView(
        [place.latitude, place.longitude],
        15
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(this.map);
      L.marker([place.latitude, place.longitude]).addTo(this.map);
    },
    onFocus() {
      this.focused = true;
      this.fetchSuggestions();
    },
    onBlur() {
      setTimeout(() => {
        this.focused = false;
      }, 200);
    },
    onInput() {
      if (this.searchQuery.trim().length < 1) {
        this.suggestions = [];
        return;
      }
      const url = "https://api.bitcoinbeer.events/api/api_suggestions.php?q=" + encodeURIComponent(this.searchQuery);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.suggestions = data.suggestions || [];
        })
        .catch(error => {
          console.error("Errore API suggerimenti:", error);
          this.suggestions = [];
        });
    },
    selectSuggestion(item) {
      this.searchQuery = item;
      this.doSearch();
    },
    fetchSuggestions() {
      this.onInput();
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
/* Sfondo e layout della pagina */
.results-page {
  background: linear-gradient(180deg, #1a1d23, #0d0f14);
  min-height: 100vh;
  padding-top: 8rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-header {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.search-box {
  display: flex;
  gap: 0.5rem;
}

.results-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.results-container {
  width: 50%;
  max-width: 800px;
}

.results-title {
  margin-bottom: 1rem;
}

/* Stili dei risultati */
.result-item {
  padding: 12px;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
}

.result-item:hover {
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.05);
}

.result-name {
  font-size: 22px;
  color: #5faaff;
  font-weight: bold;
}

.result-address {
  font-size: 14px;
  margin: 4px 0;
  color: #ccc;
}

.result-description {
  font-size: 15px;
  color: #bbb;
  margin-top: 5px;
}

.payment-line {
  margin-top: 4px;
  color: #bbb;
  font-size: 15px;
}

.icon-with-text {
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
}

.icon-crypto {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgba(25, 25, 25, 0.4);
  backdrop-filter: blur(25px);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 900px;
  color: #fff;
  display: flex;
  gap: 20px;
}

.modal-body {
  display: flex;
  gap: 20px;
  width: 100%;
}

.modal-text {
  flex: 1;
}

.modal-map {
  width: 40%;
  height: 300px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 15px;
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
  }
  .modal-map {
    width: 100%;
    height: 250px;
    border-left: none;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    padding-top: 15px;
  }
}

.web-icon {
  width: 24px;
  height: 24px;
  filter: invert(1);
}
</style>
