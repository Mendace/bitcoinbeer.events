<template>
	<section class="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
		<!-- Hero Section -->
		<div v-if="article" class="relative">
			<!-- Cover Image -->
			<div class="h-[500px] bg-cover bg-center shadow-md"
				:style="{ backgroundImage: `url(${article.cover_image})` }"></div>

			<!-- Title and Subtitle -->
			<div class="container mx-auto px-6 md:px-12 lg:px-20 py-12 text-center">
				<h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">{{ article.title }}
				</h1>
				<p class="text-xl md:text-2xl text-gray-400 italic">{{ article.subtitle }}</p>
				<div v-if="article.original_url" class="mt-4">
					<a :href="article.original_url" target="_blank" class="text-lg text-blue-500 hover:underline">
						👉 Tradotto dall'articolo originale su BlockDyor 👈
					</a>
				</div>
			</div>
		</div>

		<div v-else class="flex items-center justify-center h-screen">
			<p class="text-lg font-semibold text-gray-400">Caricamento articolo...</p>
		</div>

		<!-- Main Content -->
		<div v-if="article" class="container mx-auto px-6 md:px-12 lg:px-20 py-16">
			<!-- Author and Date -->
			<div class="flex items-center space-x-6 mb-12">
				<img src="/public/logos/blockdyor.webp" alt="BlockDyor"
					class="w-16 h-16 rounded-full shadow-md border border-yellow-400" />
				<div>
					<a href="https://blockdyor.com" target="_blank"
						class="text-lg font-semibold text-yellow-400 hover:underline">
						BlockDyor
					</a>
					<p class="text-gray-400">Pubblicato il {{ formatDate(article.created_at) }}</p>
				</div>
			</div>

			<!-- Banner Ad -->
			<div class="relative w-full mb-8 h-25 rounded-lg overflow-hidden shadow-lg">
				<a href="https://bitbox.swiss/it/bitbox02/?utm_source=bitcoinbeer&utm_medium=webcast&utm_campaign=landingpage&ref=XiwIgfY4X6mvWS"
					target="_blank">
					<img src="/public/assets/bitbox-banner.png" alt="Banner" class="w-full h-full object-cover" />
				</a>
			</div>

			<!-- Article Content -->
			<article class="prose prose-xl prose-invert mx-auto leading-relaxed">
				<h2 class="text-3xl font-bold mb-8 text-yellow-400">Introduzione</h2>
				<p>{{ article.intro }}</p>

				<figure class="my-8 text-center">
					<img :src="article.image" alt="" class="rounded-lg shadow-md w-4/5 mx-auto max-w-md" />
					<figcaption class="text-gray-500 mt-2 text-sm">{{ article.image_caption }}</figcaption>
				</figure>

				<div v-html="article.content" class="leading-loose text-gray-300"></div>

				<h3 class="text-2xl font-semibold mt-12 text-yellow-400">Conclusione</h3>
				<p>{{ article.conclusion }}</p>
			</article>

			<!-- Social Sharing -->
			<div class="mt-12 flex flex-wrap gap-4 justify-center">
				<a :href="generateShareUrl('twitter')" target="_blank"
					class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-md flex items-center gap-2">
					<i class="fab fa-twitter"></i> Condividi su Twitter
				</a>
				<a :href="generateShareUrl('facebook')" target="_blank"
					class="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded shadow-md flex items-center gap-2">
					<i class="fab fa-facebook"></i> Condividi su Facebook
				</a>
				<a :href="generateShareUrl('linkedin')" target="_blank"
					class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-md flex items-center gap-2">
					<i class="fab fa-linkedin"></i> Condividi su LinkedIn
				</a>
				<a :href="generateShareUrl('telegram')" target="_blank"
					class="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded shadow-md flex items-center gap-2">
					<i class="fab fa-telegram"></i> Condividi su Telegram
				</a>
			</div>

			<!-- Footer Banner Ad -->
			<div class="relative w-full mt-8 h-25 rounded-lg overflow-hidden shadow-lg">
				<a href="https://pocketbitcoin.com/it?ref=btctalk" target="_blank">
					<img src="/public/assets/Pocket-banner.png" alt="Footer Banner"
						class="w-full h-full object-cover" />
				</a>
			</div>

			<!-- Related Blog Component -->
			<div class="mt-16">
				<Blog />
			</div>
		</div>
	</section>
</template>

<script>
import Blog from "../components/Blog.vue"; // Import corretto del componente Blog
import { onMounted, ref, watch } from 'vue';

export default {
  name: "Article",
  components: {
    Blog // Registrazione del componente
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
      validator: (value) => !isNaN(parseInt(value))
    }
  },
  setup(props) {
    // ... (Il resto del codice setup() rimane invariato)
    const article = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const fetchArticle = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`https://api.bitcoinbeer.events/api/articles_api.php?id=${props.id}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Errore API: ${response.status} - ${errorText}`);
            }
            const data = await response.json();

            if (data.success) {
                article.value = data.data;
            } else {
                throw new Error(data.message || 'Articolo non trovato');
            }
        } catch (err) {
            error.value = err.message;
            console.error("Errore fetchArticle:", err);
        } finally {
            loading.value = false;
        }
    };

    const updateMetaTag = (selector, content) => {
        if (!content) return;
        let meta = document.querySelector(selector);
        if (!meta) {
            meta = document.createElement('meta');
            document.head.appendChild(meta);
        }
        meta.setAttribute(selector.startsWith('meta[property') ? 'property' : 'name', selector.split('"')[1]);
        meta.setAttribute('content', content);
    };

    const addMetaTags = () => {
        if (!article.value) return;

        updateMetaTag('meta[name="title"]', article.value.meta_title || article.value.title || 'Bitcoin Beer');
        updateMetaTag('meta[name="description"]', article.value.meta_description || 'Bitcoin Beer');
        updateMetaTag('meta[name="keywords"]', article.value.meta_keywords || 'Bitcoin, Blockchain');

        updateMetaTag('meta[property="og:title"]', article.value.meta_title || article.value.title || 'Bitcoin Beer');
        updateMetaTag('meta[property="og:description"]', article.value.meta_description || 'Bitcoin Beer');
        updateMetaTag('meta[property="og:image"]', article.value.og_image || article.value.cover_image);
        updateMetaTag('meta[property="og:url"]', window.location.href);
        updateMetaTag('meta[property="og:type"]', 'article');

        updateMetaTag('link[rel="canonical"]', article.value.original_url || window.location.href);
    };

    onMounted(() => {
        fetchArticle();
    });

    watch(article, () => {
        addMetaTags();
    });

    const formatDate = (date) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('it-IT', options);
        } catch (e) {
            console.error("Error parsing date:", date, e);
            return "Data non disponibile";
        }
    };

    const generateShareUrl = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(article.value ? article.value.title : '');

        switch (platform) {
            case 'twitter':
                return `https://twitter.com/share?url=${url}&text=${text}`;
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            case 'linkedin':
                return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
            case 'telegram':
                return `https://t.me/share/url?url=${url}&text=${text}`;
            default:
                return '#';
        }
    };

    return { article, error, loading, formatDate, generateShareUrl };
  }
};
</script>


<style scoped>
body {
	font-family: 'Inter', sans-serif;
	background-color: #121212;
	color: #ffffff;
}

h1,
h2,
h3 {
	color: #facc15;
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

@media (max-width: 768px) {
	.prose {
		font-size: 1rem;
	}
}
</style>