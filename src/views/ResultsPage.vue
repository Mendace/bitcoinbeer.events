<template>
  <div class="results-page">
    <!-- Search header fisso -->
    <div class="search-header">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Inserisci ricerca (es. ristorante firenze, dentista prato, …)"
          @keyup.enter="doSearch"
        />
        <button @click="doSearch">Cerca</button>
      </div>
    </div>

    <!-- Contenitore dei risultati (uno sotto l'altro) -->
    <div class="results-container">
      <h1 class="results-title">Risultati per: "{{ searchQuery }}"</h1>
      <div v-if="loading" class="status">Caricamento dati...</div>
      <div v-else>
        <p v-if="filteredPlaces.length === 0" class="status">Nessun risultato trovato.</p>
        <div
          v-for="place in filteredPlaces"
          :key="place.id"
          class="result-item"
        >
          <div class="result-content">
            <h2 class="result-name">{{ place.name || 'Senza nome' }}</h2>
            <p class="result-address">
              <strong>Indirizzo:</strong>
              {{ place.address_street || 'N/A' }}
              {{ place.address_housenumber || '' }}, 
              {{ place.address_city || 'N/A' }}
            </p>
            <p class="result-cap">
              <strong>CAP:</strong> {{ place.address_postcode || 'N/A' }}
            </p>
            <div class="payment-info">
              <span
                v-if="place.currency_XBT == 1"
                class="icon bitcoin-icon"
                title="Pagamento Bitcoin"
              >₿</span>
              <span
                v-if="place.payment_lightning == 1"
                class="icon lightning-icon"
                title="Lightning Network"
              >⚡</span>
            </div>
          </div>
          <div class="action-buttons">
            <button class="share-btn" @click="sharePlace(place)">Condividi</button>
            <button class="maps-btn" @click="openMaps(place)">Mappe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsPage",
  data() {
    return {
      places: [],
      loading: false,
      searchQuery: this.$route.query.q || ""
    };
  },
  computed: {
    tokens() {
      return this.searchQuery
        .toLowerCase()
        .split(" ")
        .map(token => token.trim())
        .filter(token => token.length > 0);
    },
    filteredPlaces() {
      if (this.tokens.length === 0) {
        return this.places;
      }
      return this.places.filter(place => {
        const searchableText = [
          place.name,
          place.address_city,
          place.address_street,
          place.address_housenumber,
          place.address_postcode,
          place.description,
          place.category,
          place.shop_type
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return this.tokens.every(token => searchableText.includes(token));
      });
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await fetch(
          "https://api.bitcoinbeer.events/api/places.php?limit=1000&offset=0"
        );
        const result = await response.json();
        this.places = result.data || [];
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        this.places = [];
      }
      this.loading = false;
    },
    doSearch() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push({ name: "Results", query: { q: this.searchQuery } });
        this.fetchData();
      }
    },
    sharePlace(place) {
      // Costruisci il contenuto da condividere
      const shareData = {
        title: place.name || "Senza nome",
        text: `Scopri ${place.name} situato in ${place.address_street}, ${place.address_city}.`,
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData)
          .then(() => console.log('Condiviso con successo'))
          .catch(error => console.error('Errore nella condivisione:', error));
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url)
          .then(() => alert("Link copiato negli appunti"))
          .catch(error => console.error('Errore nel copiare il link:', error));
      }
    },
    openMaps(place) {
      let url = "";
      if (place.latitude && place.longitude) {
        url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
      } else {
        const query = encodeURIComponent(`${place.address_street} ${place.address_housenumber} ${place.address_city}`);
        url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      }
      window.open(url, "_blank");
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
/* Pagina dei risultati con sfondo scuro */
.results-page {
  background-color: #1a1a1a;
  min-height: 100vh;
  padding-top: 10rem; /* spazio per il search header fisso */
  color: #fff;
}

/* Search header fisso in alto */
.search-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #111;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
}

.search-box {
  width: 100%;
  max-width: 500px;
  display: flex;
}

.search-box input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-right: none;
  border-radius: 4px 0 0 4px;
  background-color: #222;
  color: #fff;
}

.search-box button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #333;
  border-left: none;
  background-color: #f4a261;
  color: #fff;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.2s ease;
}

.search-box button:hover {
  background-color: #e0884a;
}

/* Container dei risultati */
.results-container {
  padding: 2rem;
}

.results-title {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
}

.status {
  font-size: 18px;
  margin: 20px 0;
  text-align: center;
}

/* Box polyglass per ogni risultato */
.result-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
}

.result-item:hover {
  box-shadow: 0 0 15px rgba(0, 153, 255, 0.8);
}

.result-content {
  margin-bottom: 1rem;
}

.result-name {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.result-address,
.result-cap {
  font-size: 1rem;
  margin: 0.2rem 0;
  color: #ccc;
}

.payment-info {
  margin-top: 0.5rem;
  font-size: 1.5rem;
}

.icon {
  margin-right: 0.5rem;
}

.bitcoin-icon {
  color: #f2a900; /* Logo Bitcoin arancione classico */
}

.lightning-icon {
  color: #00baff;
}

/* Azioni: pulsanti Condividi e Mappe */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.share-btn,
.maps-btn {
  background-color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.share-btn:hover,
.maps-btn:hover {
  background-color: #555;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .search-box {
    max-width: 90%;
  }
  .search-box input[type="text"] {
    font-size: 14px;
    padding: 8px;
  }
  .search-box button {
    font-size: 14px;
    padding: 8px 16px;
  }
  .results-title {
    font-size: 1.8rem;
  }
  .result-item {
    width: 100%;
  }
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  .share-btn,
  .maps-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
