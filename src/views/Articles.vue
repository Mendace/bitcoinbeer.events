<template>
  <section class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
    <!-- Hero Section -->
    <div
      class="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
      :style="{ backgroundImage: 'url(/assets/blog-hero.jpg)' }"
    >
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="relative z-10 text-center px-6">
        <!-- Logo del blog -->
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

    <!-- Se l'articolo è caricato -->
    <div v-if="article" class="relative">
      <!-- Cover Image dell'articolo -->
      <div
        class="h-[500px] bg-cover bg-center shadow-md"
        :style="{ backgroundImage: `url(${article.cover_image})` }"
      ></div>

      <!-- Title and Subtitle -->
      <div class="container mx-auto px-6 md:px-12 lg:px-20 py-12 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
          {{ article.title }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-400 italic">
          {{ article.subtitle }}
        </p>
      </div>
    </div>

    <!-- Se l'articolo non è ancora caricato (loading) -->
    <div v-else class="flex items-center justify-center h-screen">
      <p class="text-lg font-semibold text-gray-400">
        Caricamento articolo...
      </p>
    </div>

    <!-- Main Content -->
    <div v-if="article" class="container mx-auto px-6 md:px-12 lg:px-20 py-16">
      <!-- Autore e data -->
      <div class="flex items-center space-x-6 mb-12">
        <!-- Logo dell'autore: prelevato da article.author_logo -->
        <img
          :src="article.author_logo"
          alt="Autore"
          class="w-16 h-16 rounded-full shadow-md border border-yellow-400"
        />
        <div>
          <!-- Nome autore -->
          <p class="text-lg font-semibold text-yellow-400">
            {{ article.author }}
          </p>
          <p class="text-gray-400">
            Pubblicato il {{ formatDate(article.created_at) }}
          </p>
        </div>
      </div>

      <!-- Banner Ad -->
      <div class="relative w-full mb-8 h-25 rounded-lg overflow-hidden shadow-lg">
        <a
          href="https://bitbox.swiss/it/bitbox02/?utm_source=bitcoinbeer&utm_medium=webcast&utm_campaign=landingpage&ref=XiwIgfY4X6mvWS"
          target="_blank"
        >
          <img
            src="/public/assets/bitbox-banner.png"
            alt="Banner"
            class="w-full h-full object-cover"
          />
        </a>
      </div>

      <!-- Article Content -->
      <article class="prose prose-xl prose-invert mx-auto leading-relaxed">
        <h2 class="text-3xl font-bold mb-8 text-yellow-400">Introduzione</h2>
        <p>{{ article.intro }}</p>

        <figure class="my-8 text-center">
          <img
            :src="article.image"
            alt=""
            class="rounded-lg shadow-md w-4/5 mx-auto max-w-md"
          />
          <figcaption class="text-gray-500 mt-2 text-sm">
            {{ article.image_caption }}
          </figcaption>
        </figure>

        <div
          v-html="article.content"
          class="leading-loose text-gray-300"
        ></div>

        <h3 class="text-2xl font-semibold mt-12 text-yellow-400">
          Conclusione
        </h3>
        <p>{{ article.conclusion }}</p>
      </article>

      <!-- Categorie (Badge) -->
      <div v-if="categoriesList.length" class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="cat in categoriesList"
          :key="cat"
          class="inline-block bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-medium"
        >
          {{ cat }}
        </span>
      </div>

      <!-- Social Sharing -->
      <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
        <!-- Twitter -->
        <a
          :href="generateShareUrl('twitter')"
          target="_blank"
          class="inline-flex items-center justify-center px-3 py-2 text-sm sm:text-base
                bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md
                transition-colors duration-200"
        >
          <i class="fab fa-twitter mr-2 text-lg"></i>
          <span class="hidden sm:inline">Twitter</span>
        </a>

        <!-- Facebook -->
        <a
          :href="generateShareUrl('facebook')"
          target="_blank"
          class="inline-flex items-center justify-center px-3 py-2 text-sm sm:text-base
                bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow-md
                transition-colors duration-200"
        >
          <i class="fab fa-facebook mr-2 text-lg"></i>
          <span class="hidden sm:inline">Facebook</span>
        </a>

        <!-- LinkedIn -->
        <a
          :href="generateShareUrl('linkedin')"
          target="_blank"
          class="inline-flex items-center justify-center px-3 py-2 text-sm sm:text-base
                bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md
                transition-colors duration-200"
        >
          <i class="fab fa-linkedin mr-2 text-lg"></i>
          <span class="hidden sm:inline">LinkedIn</span>
        </a>

        <!-- Telegram -->
        <a
          :href="generateShareUrl('telegram')"
          target="_blank"
          class="inline-flex items-center justify-center px-3 py-2 text-sm sm:text-base
                bg-sky-500 hover:bg-sky-600 text-white rounded-md shadow-md
                transition-colors duration-200"
        >
          <i class="fab fa-telegram mr-2 text-lg"></i>
          <span class="hidden sm:inline">Telegram</span>
        </a>
      </div>

      <!-- Footer Banner Ad -->
      <div class="relative w-full mt-8 h-25 rounded-lg overflow-hidden shadow-lg">
        <a href="https://go.getproton.me/SH1Ma" target="_blank">
          <img
            src="/public/assets/VPN_HSD_950X200@2x.png"
            alt="Footer Banner"
            class="w-full h-full object-cover"
          />
        </a>
      </div>

      <!-- Commenti (usiamo il tuo "Comments" come plugin) -->
      <Comments :articleId="id" />

      <!-- Related Blog Component (se presente) -->
      <div class="mt-16">
        <Blog />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import Blog from "../components/Blog.vue";
import Comments from "../components/Comments.vue";

export default {
  name: "Article",
  components: {
    Blog,
    Comments,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
      validator: (value) => !isNaN(parseInt(value)),
    },
  },
  setup(props) {
    const article = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const fetchArticle = async () => {
      loading.value = true;
      error.value = null;
      try {
        // Adatta l'URL API di conseguenza
        const response = await fetch(
          `https://api.bitcoinbeer.events/api/articles_api.php?id=${props.id}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Errore API: ${response.status} - ${errorText}`);
        }
        const data = await response.json();

        if (data.success) {
          article.value = data.data;
        } else {
          throw new Error(data.message || "Articolo non trovato");
        }
      } catch (err) {
        error.value = err.message;
        console.error("Errore fetchArticle:", err);
      } finally {
        loading.value = false;
      }
    };

    // Funzione per meta tag
    const updateMetaTag = (selector, content) => {
      if (!content) return;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        selector.startsWith('meta[property') ? 'property' : 'name',
        selector.split('"')[1]
      );
      meta.setAttribute("content", content);
    };

    const addMetaTags = () => {
      if (!article.value) return;

      updateMetaTag(
        'meta[name="title"]',
        article.value.meta_title || article.value.title || "Bitcoin Beer"
      );
      updateMetaTag(
        'meta[name="description"]',
        article.value.meta_description || "Bitcoin Beer"
      );
      updateMetaTag(
        'meta[name="keywords"]',
        article.value.meta_keywords || "Bitcoin, Blockchain"
      );

      updateMetaTag(
        'meta[property="og:title"]',
        article.value.meta_title || article.value.title || "Bitcoin Beer"
      );
      updateMetaTag(
        'meta[property="og:description"]',
        article.value.meta_description || "Bitcoin Beer"
      );
      updateMetaTag(
        'meta[property="og:image"]',
        article.value.og_image || article.value.cover_image
      );
      updateMetaTag("meta[property=\"og:url\"]", window.location.href);
      updateMetaTag("meta[property=\"og:type\"]", "article");

      updateMetaTag(
        'link[rel="canonical"]',
        article.value.original_url || window.location.href
      );
    };

    onMounted(() => {
      fetchArticle();
    });

    watch(article, () => {
      addMetaTags();
    });

    // calcola array di categorie
    const categoriesList = computed(() => {
      if (!article.value || !article.value.categories) {
        return [];
      }
      return article.value.categories.split(",").map((c) => c.trim());
    });

    // format date
    const formatDate = (date) => {
      try {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("it-IT", options);
      } catch (e) {
        console.error("Error parsing date:", date, e);
        return "Data non disponibile";
      }
    };

    // share url
    const generateShareUrl = (platform) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(article.value ? article.value.title : "");

      switch (platform) {
        case "twitter":
          return `https://twitter.com/share?url=${url}&text=${text}`;
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "linkedin":
          return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        case "telegram":
          return `https://t.me/share/url?url=${url}&text=${text}`;
        default:
          return "#";
      }
    };

    return {
      article,
      error,
      loading,
      categoriesList,
      formatDate,
      generateShareUrl,
    };
  },
};
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: #121212;
  color: #ffffff;
}

h1,
h2,
h3 {
  color: #facc15;
}

/* Sottolinea con gradiente */
:deep(.prose a),
:deep(.prose u) {
  text-decoration: none;
  position: relative;
}
:deep(.prose a)::after,
:deep(.prose u)::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(to right, #facc15, #f97316);
}

p {
  line-height: 1.8;
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

figcaption {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

figure img {
  max-width: 200px;
  margin: 0 auto;
}

/* Se usi Tailwind Typography, la classe .prose gestirà i font-size e i margini.
   Qui si aggiunge un override con "text-gray-300", ecc.
*/
@media (max-width: 768px) {
  .prose {
    font-size: 1rem;
  }
}
</style>
