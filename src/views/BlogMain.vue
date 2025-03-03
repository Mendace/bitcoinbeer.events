<script setup>
import { useHead } from '@vueuse/head';
import { ref, watch, onMounted } from 'vue';

useHead({
  title: 'Bitcoin Beer Blog - Notizie, Guide e Approfondimenti su Bitcoin e Tecnologia',
  meta: [
    { name: 'description', content: 'Tieniti aggiornato con Bitcoin Beer Blog: notizie, guide e approfondimenti su Bitcoin, blockchain e tecnologia. Scopri di più.' },
    { name: 'keywords', content: 'Bitcoin, Tecnologia, Blockchain, Notizie Bitcoin, Guide Bitcoin, Sicurezza, Blog Tecnologico, Meetup Bitcoin, Eventi Bitcoin Italia' },
    { name: 'author', content: 'BitcoinBeerBlog' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'Italian' },
    { name: 'revisit-after', content: '7 days' },
    { property: 'og:title', content: 'Bitcoin Beer Blog - Notizie e Guide su Bitcoin e Tecnologia' },
    { property: 'og:description', content: 'Tieniti aggiornato con Bitcoin Beer Blog: notizie, guide e approfondimenti su Bitcoin, blockchain e tecnologia.' },
    { property: 'og:image', content: '/assets/blog.webp' },
    { property: 'og:url', content: 'https://bitcoinbeer.events/blogmain' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'it_IT' },
    { property: 'og:site_name', content: 'Bitcoin Beer Blog' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Bitcoin Beer Blog - Notizie e Guide su Bitcoin e Tecnologia' },
    { name: 'twitter:description', content: 'Tieniti aggiornato con Bitcoin Beer Blog: notizie e approfondimenti su Bitcoin, blockchain e tecnologia.' },
    { name: 'twitter:image', content: '/assets/blog.webp' },
    { name: 'twitter:site', content: '@bitcoinbeer' },
    { name: 'twitter:creator', content: '@bitcoinbeer' },
  ],
  link: [
    { rel: 'canonical', href: 'https://bitcoinbeer.events/blogmain' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Bitcoin Beer Blog',
        description: 'Tieniti aggiornato con Bitcoin Beer Blog: notizie, guide e approfondimenti su Bitcoin, blockchain e tecnologia.',
        url: 'https://bitcoinbeer.events/blogmain',
        publisher: {
          '@type': 'Organization',
          name: 'Bitcoin Beer',
          logo: {
            '@type': 'ImageObject',
            url: '/assets/blog.webp',
          },
        },
        blogPost: [
          {
            '@type': 'BlogPosting',
            headline: '{{ featuredArticle.title }}',
            image: '{{ featuredArticle.cover_image }}',
            author: {
              '@type': 'Person',
              name: 'BitcoinBeer',
            },
            datePublished: '{{ featuredArticle.created_at }}',
            dateModified: '{{ featuredArticle.updated_at }}',
            description: '{{ featuredArticle.subtitle }}',
            url: '/article/{{ featuredArticle.id }}',
            keywords: 'Bitcoin, Tecnologia, Blockchain, Notizie Bitcoin, Guide Bitcoin, Meetup Bitcoin, Eventi Bitcoin Italia',
            interactionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/CommentAction',
              userInteractionCount: '{{ featuredArticle.comments_count }}',
            },
          },
        ],
      }),
    },
  ],
});
// Stato e variabili
const allArticles         = ref([]);
const featuredArticle     = ref({});
const recentArticles      = ref([]);
const additionalArticles  = ref([]);
const error               = ref(null);

// Per la paginazione (se la vuoi)
const currentPage   = ref(1);
const hasMorePages  = ref(true);

// Filtri
const searchTerm        = ref('');
const selectedCategory  = ref('');

// Fai la fetch degli articoli una volta
onMounted(() => {
  fetchArticles();
});

// Funzione fetch
function fetchArticles() {
  const url = `https://api.bitcoinbeer.events/api/articles_api.php?page=${currentPage.value}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Errore nel recupero degli articoli');
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        allArticles.value = data.data;
        applyFilter(); // Applica subito i filtri iniziali
        hasMorePages.value = data.hasMorePages ?? false;
      } else {
        error.value = data.error || 'Errore sconosciuto';
      }
    })
    .catch((err) => {
      error.value = err.message;
    });
}

// Applica i filtri sul client
function applyFilter() {
  let filtered = [...allArticles.value];

  // 1) Filtro testuale su title, subtitle, content
  if (searchTerm.value.trim() !== '') {
    const s = searchTerm.value.toLowerCase();
    filtered = filtered.filter((art) => {
      return (
        (art.title || '').toLowerCase().includes(s) ||
        (art.subtitle || '').toLowerCase().includes(s) ||
        (art.content || '').toLowerCase().includes(s)
      );
    });
  }

  // 2) Filtro categorie
  if (selectedCategory.value) {
    filtered = filtered.filter((art) => {
      if (!art.categories) return false;
      const cats = art.categories.split(',').map(c => c.trim().toLowerCase());
      return cats.includes(selectedCategory.value.toLowerCase());
    });
  }

  // Suddividi
  if (filtered.length > 0) {
    featuredArticle.value    = filtered[0];
    recentArticles.value     = filtered.slice(1, 3);
    additionalArticles.value = filtered.slice(3);
  } else {
    featuredArticle.value    = {};
    recentArticles.value     = [];
    additionalArticles.value = [];
  }
}

// Reset filtri
function resetFilter() {
  searchTerm.value       = '';
  selectedCategory.value = '';
  applyFilter();
}

// Gestione pagine (se la vuoi “server-side”)
function loadPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchArticles();
  }
}
function loadNextPage() {
  if (hasMorePages.value) {
    currentPage.value++;
    fetchArticles();
  }
}

// Utils
function formatDate(date) {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('it-IT', options);
}

function parseCategories(str) {
  if (!str) return [];
  return str.split(',').map(c => c.trim());
}

function categoryColor(cat) {
  const colorMap = {
    notizie:     'bg-blue-500',
    recensione:  'bg-green-500',
    inchiesta:   'bg-red-500',
    intervista:  'bg-indigo-500',
    altro:       'bg-yellow-500',
  };
  return colorMap[cat.toLowerCase()] || 'bg-gray-500';
}

// Watch per filtrare in tempo reale
watch([searchTerm, selectedCategory], () => {
  applyFilter();
});
</script>

<template>
  <section class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
    <!-- Hero Section -->
    <div
      class="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
      :style="{ backgroundImage: 'url(/assets/blog-hero.jpg)' }"
    >
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="relative z-10 text-center px-6">
        <img
          src="/assets/ilBlog.png"
          alt="BitcoinBeer Blog"
          class="mx-auto mb-4 w-48 sm:w-64 h-auto"
        />
        <p class="text-lg md:text-xl text-gray-300">
          Bitcoin spiegato bene.
        </p>
      </div>
    </div>

<!-- Filter Bar (centrata, glass effect) -->
<div class="container mx-auto py-8 flex flex-col items-center justify-center px-4">
  <div class="w-full md:w-2/3 lg:w-1/2 bg-white/10 backdrop-blur-md 
              rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">

    <!-- Input di ricerca con icona -->
    <div class="relative flex-1">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Cerca..."
        class="search-input w-full px-4 py-2 rounded-full
               placeholder-gray-300 bg-gray-800 text-white
               focus:outline-none"
      />
      <!-- Icona di ricerca assoluta a destra -->
      <span
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <!-- Usando un'icona inline SVG, oppure un <i> di FontAwesome ecc. -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16l-4.293 4.293a1 1 0 001.414 
               1.414L9.414 17.414A8 8 0 1116 8a7.964 7.964 0 01-1.414 
               4.586l4.293 4.293a1 1 0 001.414-1.414L18 11.586l.293-.293 
               C19.635 10.22 20 9.134 20 8a8 8 0 10-8 8z"
          />
        </svg>
      </span>
    </div>

    <!-- Select categoria -->
    <select
      v-model="selectedCategory"
      class="px-4 py-2 bg-transparent text-white 
             focus:outline-none rounded-full
             border border-white/20"
    >
      <option value="">Tutte</option>
      <option value="notizie">Notizie</option>
      <option value="recensione">Recensione</option>
      <option value="inchiesta">Inchiesta</option>
      <option value="intervista">Intervista</option>
      <option value="altro">Altro</option>
    </select>
  </div>
</div>
<!-- Fine Filter Bar -->

    <!-- Featured + Recent -->
    <div class="container mx-auto py-6 px-4 md:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Featured Article -->
        <div
          class="lg:col-span-2 relative bg-gray-800 shadow-lg featured-article"
          v-if="featuredArticle.title"
        >
          <a :href="`/article/${featuredArticle.id}`">
            <img
              :src="featuredArticle.cover_image"
              alt="Immagine Articolo"
              class="w-full h-64 md:h-[60vh] object-cover"
            />
          </a>
          <div class="p-6">
            <p class="text-sm text-gray-400 uppercase">In Evidenza</p>
            <h2 class="text-2xl md:text-4xl font-bold text-yellow-400">
              <a :href="`/article/${featuredArticle.id}`" class="hover:text-yellow-300">
                {{ featuredArticle.title }}
              </a>
            </h2>
            <p class="text-base md:text-lg text-gray-300 mt-2 line-clamp-3">
              {{ featuredArticle.subtitle }}
            </p>
            <!-- Badge categorie -->
            <div v-if="featuredArticle.categories" class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="cat in parseCategories(featuredArticle.categories)"
                :key="cat"
                :class="[ categoryColor(cat), 'inline-block text-black px-2 py-1 rounded-md text-sm' ]"
              >
                {{ cat }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Articles -->
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-gray-200" v-if="recentArticles.length">
            Ultimi Articoli
          </h3>
          <div
            v-for="article in recentArticles"
            :key="article.id"
            class="bg-gray-800 shadow-md"
          >
            <a :href="`/article/${article.id}`">
              <img
                :src="article.cover_image"
                alt="Immagine di {{ article.title }}"
                class="w-full h-40 object-cover"
              />
            </a>
            <div class="p-4">
              <h4 class="text-lg font-bold text-yellow-400 hover:text-yellow-300">
                <a :href="`/article/${article.id}`">
                  {{ article.title }}
                </a>
              </h4>
              <p class="text-sm text-gray-400 mt-2">
                {{ formatDate(article.created_at) }}
              </p>
              <!-- Badge categorie -->
              <div v-if="article.categories" class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="cat in parseCategories(article.categories)"
                  :key="cat"
                  :class="[ categoryColor(cat), 'inline-block text-black px-2 py-1 rounded-md text-sm' ]"
                >
                  {{ cat }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Articles -->
    <div class="container mx-auto py-6 px-4 md:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="article in additionalArticles"
          :key="article.id"
          class="bg-gray-800 shadow-lg"
        >
          <a :href="`/article/${article.id}`">
            <div
              class="relative h-48 bg-cover bg-center"
              :style="{ backgroundImage: `url(${article.cover_image})` }"
            >
              <div class="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold mb-2 hover:text-orange-500 transition-colors">
                {{ article.title }}
              </h2>
              <p class="text-sm text-gray-400 mb-4">
                {{ formatDate(article.created_at) }}
              </p>
              <!-- Badge categorie -->
              <div v-if="article.categories" class="flex flex-wrap gap-2">
                <span
                  v-for="cat in parseCategories(article.categories)"
                  :key="cat"
                  :class="[ categoryColor(cat), 'inline-block text-black px-2 py-1 rounded-md text-sm' ]"
                >
                  {{ cat }}
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- RIMOSSA la sezione "Blog Provided By" -->

    <!-- Pagination Buttons (più belli) -->
    <div class="flex justify-center items-center mt-12" v-if="true">
      <button
        @click="loadPreviousPage"
        :disabled="currentPage === 1"
        class="px-5 py-2 rounded-l-full bg-white/10
               text-white hover:bg-white/20 transition-colors
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Precedente
      </button>
      <span class="px-4 py-2 bg-white/10 text-white">
        Pagina {{ currentPage }}
      </span>
      <button
        @click="loadNextPage"
        :disabled="!hasMorePages"
        class="px-5 py-2 rounded-r-full bg-white/10
               text-white hover:bg-white/20 transition-colors
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Successivo
      </button>
    </div>
  </section>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #121212;
  color: #ffffff;
}

h1, h2, h3, h4 {
  color: #facc15;
}

p {
  line-height: 1.8;
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  height: auto;
}

/* Imposta altezza max e trim del testo */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

.search-input {
  /* stato normale */
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2); /* bordo grigio chiaro */
  border-radius: 9999px; /* effetto “pill” */
  color: #ffffff;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
}

.search-input::placeholder {
  color: #9ca3af; /* per placeholder grigio chiaro */
}

.search-input:focus {
  outline: none;
  border: 5px solid transparent; /* toglie il bordo standard */
  /* Glow dal giallo (#facc15) all'arancio (#ea580c) */
  box-shadow: 
    0 0 10px 2px #facc15,    /* alone giallo più vicino */
    0 0 20px 5px #ea580c;    /* alone arancione più esterno */
}


/* Responsive Adjustments */
@media (max-width: 768px) {
  .featured-article {
    text-align: left;
    padding: 1rem;
  }

  .featured-article img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .featured-article h2 {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }

  .featured-article p {
    font-size: 1rem;
    line-height: 1.5;
  }

  .container {
    padding: 1 1rem;
  }
}
</style>
