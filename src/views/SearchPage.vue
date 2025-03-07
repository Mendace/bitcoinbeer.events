<template>
    <div class="search-container">
      <!-- Titolo e sottotitolo centrati -->
      <h1 class="title">Satoshi Urban</h1>
      <p class="subtitle">Il motore di ricerca che non sa niente di te</p>
      
      <!-- Wrapper per la barra di ricerca e il pannello dei suggerimenti -->
      <div class="search-wrapper" :class="{ expanded: isExpanded }">
        <div class="search-box" @mouseover="hover = true" @mouseleave="hover = false">
          <input 
            type="text" 
            v-model="query" 
            placeholder="Cerca..." 
            @focus="onFocus" 
            @blur="onBlur" 
            @input="onInput" 
            @keyup.enter="doSearch"
          />
          <button class="search-btn" @click="doSearch">
            <span class="search-icon">🔍</span>
          </button>
        </div>
        <!-- Pannello dei suggerimenti: si apre verso il basso -->
        <transition name="fade">
          <div class="suggestions" v-if="isExpanded && suggestions.length > 0">
            <div 
              class="suggestion-item" 
              v-for="(item, index) in suggestions" 
              :key="index"
              @mousedown.prevent="selectSuggestion(item)"
            >
              {{ item }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchPage",
    data() {
      return {
        query: "",
        hover: false,
        focused: false,
        suggestions: []
      };
    },
    computed: {
      isExpanded() {
        // Espandi il pannello se l'input è focalizzato o contiene testo
        return this.focused || this.query.trim() !== "";
      }
    },
    methods: {
      onFocus() {
        this.focused = true;
        this.fetchSuggestions();
      },
      onBlur() {
        // Ritardo per permettere il click sul suggerimento
        setTimeout(() => {
          this.focused = false;
        }, 200);
      },
      onInput() {
        // Chiamata all'API per ottenere i suggerimenti dal DB
        if (this.query.trim().length < 1) {
          this.suggestions = [];
          return;
        }
        const url = "https://api.bitcoinbeer.events/api/api_suggestions.php?q=" + encodeURIComponent(this.query);
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
        this.query = item;
        this.doSearch();
      },
      doSearch() {
        // Naviga alla pagina dei risultati se la query non è vuota
        if (this.query.trim() !== "") {
          this.$router.push({ name: 'Results', query: { q: this.query } });
        }
      },
      fetchSuggestions() {
        // Puoi eventualmente pre-caricare suggerimenti (qui richiami onInput)
        this.onInput();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Contenitore principale: background nero con radial gradient blu */
  .search-container {
    min-height: 100vh;
    background: radial-gradient(circle at center, rgba(0, 30, 60, 0.9) 0%, #000 80%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: #fff;
  }
  
  /* Titolo grande in stile Qwant */
  .title {
    font-size: 4rem;
    margin: 0;
    text-align: center;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin: 0.5rem 0 2rem;
    text-align: center;
    color: #aaa;
  }
  
  /* Wrapper per barra di ricerca e suggerimenti */
  .search-wrapper {
    width: 600px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  /* Barra di ricerca effetto glass: si illumina di blu al hover */
  .search-box {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border-radius: 25px;
    padding: 0 1rem;
    height: 50px;
    transition: box-shadow 0.3s ease;
  }
  
  .search-box:hover {
    box-shadow: 0 0 12px rgba(0, 153, 255, 0.8);
  }
  
  .search-box input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    color: #fff;
    font-size: 1.2rem;
    padding: 0.5rem;
  }
  
  .search-box input::placeholder {
    color: #aaa;
  }
  
  .search-btn {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
  
  .search-btn:hover {
    color: #00baff;
  }
  
  /* Pannello dei suggerimenti: si apre verso il basso come un pannello espanso */
  .suggestions {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    margin-top: 10px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0, 153, 255, 0.7);
    padding: 0.5rem 0;
  }
  
  /* Stile per ciascun suggerimento */
  .suggestion-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .suggestion-item:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* Transizione fade per l'apertura/chiusura dei suggerimenti */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  @media (max-width: 768px) {
  /* Riduci la larghezza del wrapper a quasi tutta la larghezza dello schermo */
  .search-wrapper {
    width: 90%;
  }
  /* Adatta la barra di ricerca per schermi piccoli */
  .search-box {
    height: 45px;
    padding: 0 0.5rem;
  }
  .search-box input {
    font-size: 1rem;
    padding: 0.5rem;
  }
  .search-btn {
    font-size: 1.2rem;
    margin-left: 0.3rem;
  }
  /* Riduci la dimensione del titolo e del sottotitolo */
  .title {
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1rem;
  }
  /* Suggerimenti a larghezza completa e padding minore */
  .suggestions {
    width: 100%;
    margin-top: 8px;
  }
  .suggestion-item {
    padding: 0.5rem 0.75rem;
  }
}

  </style>
  