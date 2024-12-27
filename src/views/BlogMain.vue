<script setup>
import { useHead } from '@vueuse/head';

useHead({
  title: 'Bitcoin Beer Blog - Notizie e Guide su Bitcoin e Tecnologia',
  meta: [
    { name: 'description', content: 'Esplora le ultime notizie, approfondimenti e guide dal mondo Bitcoin e tecnologia. Tieniti aggiornato con BitcoinBeerBlog.' },
    { name: 'keywords', content: 'Bitcoin, Tecnologia, Blockchain, Notizie Bitcoin, Guide Bitcoin, Sicurezza, Blog Tecnologico' },
    { name: 'author', content: 'BitcoinBeerBlog' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { property: 'og:title', content: 'BitcoinBeerBlog - Notizie e Guide su Bitcoin e Tecnologia' },
    { property: 'og:description', content: 'Esplora le ultime notizie, approfondimenti e guide dal mondo Bitcoin e tecnologia.' },
    { property: 'og:image', content: '/assets/blog.webp' },
    { property: 'og:url', content: 'https://bitcoinbeer.events/blogmain' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'BitcoinBeerBlog - Notizie e Guide su Bitcoin e Tecnologia' },
    { name: 'twitter:description', content: 'Tieniti aggiornato con BitcoinBeerBlog. Notizie e approfondimenti sul mondo Bitcoin.' },
    { name: 'twitter:image', content: '/assets/blog.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'BitcoinBeerBlog',
        description: 'Esplora le ultime notizie, approfondimenti e guide dal mondo Bitcoin e tecnologia.',
        url: 'https://bitcoinbeer.events/blogmain',
        publisher: {
          '@type': 'Organization',
          name: 'BitcoinBeer',
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
            dateModified: '{{ featuredArticle.created_at }}',
            description: '{{ featuredArticle.subtitle }}',
            url: '/article/{{ featuredArticle.id }}',
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <section class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
    <!-- Hero Section -->
    <div class="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
         :style="{ backgroundImage: 'url(/assets/blog-hero.jpg)' }">
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="relative z-10 text-center px-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">BitcoinBeerBlog</h1>
        <p class="text-lg md:text-xl text-gray-300">
          Esplora le ultime notizie, approfondimenti e guide dal mondo Bitcoin e tecnologia.
        </p>
      </div>
    </div>

    <!-- Featured and Recent Articles -->
    <div class="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Featured Article -->
        <div class="lg:col-span-2 relative bg-gray-800 shadow-lg featured-article">
          <a :href="`/article/${featuredArticle.id}`">
            <img :src="featuredArticle.cover_image" alt="Immagine Articolo" class="w-full h-64 md:h-[60vh] object-cover" />
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
          </div>
        </div>

        <!-- Recent Articles -->
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-gray-200">Ultimi Articoli</h3>
          <div v-for="article in recentArticles" :key="article.id" class="bg-gray-800 shadow-md">
            <a :href="`/article/${article.id}`">
              <img :src="article.cover_image" alt="Immagine di {{ article.title }}" class="w-full h-40 object-cover" />
            </a>
            <div class="p-4">
              <h4 class="text-lg font-bold text-yellow-400 hover:text-yellow-300">
                <a :href="`/article/${article.id}`">{{ article.title }}</a>
              </h4>
              <p class="text-sm text-gray-400 mt-2">{{ formatDate(article.created_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Articles -->
    <div class="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="article in additionalArticles" :key="article.id" class="bg-gray-800 shadow-lg">
          <a :href="`/article/${article.id}`">
            <div class="relative h-48 bg-cover bg-center"
                 :style="{ backgroundImage: `url(${article.cover_image})` }">
              <div class="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold mb-2 hover:text-orange-500 transition-colors">
                {{ article.title }}
              </h2>
              <p class="text-sm text-gray-400 mb-4">{{ formatDate(article.created_at) }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Blog Provided By -->
    <div class="bg-yellow-500 py-4">
      <div class="container mx-auto text-center">
        <p class="text-lg font-semibold text-black">Questo blog è fornito da <a href="https://blockdyor.com" target="_blank" class="underline hover:text-gray-700">BlockDyor</a></p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-12" v-if="hasPagination">
      <button @click="loadPreviousPage" :disabled="currentPage === 1"
              class="px-4 py-2 bg-gray-700 text-white rounded-l hover:bg-gray-600 disabled:opacity-50">
        Precedente
      </button>
      <span class="px-4 py-2 bg-gray-800 text-white">Pagina {{ currentPage }}</span>
      <button @click="loadNextPage" :disabled="!hasMorePages"
              class="px-4 py-2 bg-gray-700 text-white rounded-r hover:bg-gray-600 disabled:opacity-50">
        Successivo
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "BlogMainPage",
  data() {
    return {
      featuredArticle: {},
      recentArticles: [],
      additionalArticles: [],
      error: null,
      currentPage: 1,
      hasMorePages: true,
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      const url = `https://api.bitcoinbeer.events/api/articles_api.php?page=${this.currentPage}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore nel recupero degli articoli");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            this.featuredArticle = data.data[0];
            this.recentArticles = data.data.slice(1, 3);
            this.additionalArticles = data.data.slice(3);
            this.hasMorePages = data.hasMorePages;
          } else {
            this.error = data.error || "Errore sconosciuto";
          }
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchArticles();
      }
    },
    loadNextPage() {
      if (this.hasMorePages) {
        this.currentPage++;
        this.fetchArticles();
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("it-IT", options);
    },
  },
};
</script>

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

