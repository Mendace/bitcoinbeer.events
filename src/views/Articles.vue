<template>
	<section class="bg-black text-white min-h-screen">
		<!-- Hero Section -->
		<div v-if="article">
			<!-- Copertina -->
			<div
				class="h-96 bg-cover bg-center"
				:style="{ backgroundImage: `url(${article.cover_image})` }"
			></div>

			<!-- Titolo e sottotitolo -->
			<div class="container mx-auto px-4 py-8 text-center">
				<h1 class="text-4xl md:text-5xl font-extrabold mb-4">{{ article.title }}</h1>
				<p class="text-lg md:text-xl text-gray-400">{{ article.subtitle }}</p>
			</div>
		</div>

		<div v-else class="flex items-center justify-center h-screen">
			<p class="text-lg font-semibold text-gray-400">Caricamento articolo...</p>
		</div>

		<!-- Contenuto -->
		<div v-if="article" class="container mx-auto max-w-4xl py-10 px-4">
			<!-- Autore e Data -->
			<div class="flex items-center space-x-4 mb-8">
				<a href="https://blockdyor.com" target="_blank">
					<img
						src="/public/logos/blockdyor.webp"
						alt="BlockDyor"
						class="w-12 h-12 rounded-full"
					/>
				</a>
				<div>
					<a
						href="https://blockdyor.com"
						target="_blank"
						class="font-semibold text-lg hover:underline"
					>
						Articolo fornito da BlockDyor
					</a>
					<p class="text-gray-400">Pubblicato il {{ formatDate(article.created_at) }}</p>
				</div>
			</div>

			<!-- Banner -->
			<div class="w-full h-50 mb-8 bg-gray-800 border border-gray-700">
				<a href="https://bitbox.swiss/it/bitbox02/?utm_source=bitcoinbeer&utm_medium=webcast&utm_campaign=landingpage&ref=XiwIgfY4X6mvWS" target="_blank">
					<img src="/public/assets/bitbox-banner.png" alt="Banner" class="w-full h-full" />
				</a>
			</div>

			<!-- Contenuto dell'articolo -->
			<div class="prose prose-invert mt-8" v-html="article.content"></div>

			<!-- Pulsanti di condivisione sui social -->
			<div class="mt-12 flex flex-wrap justify-center space-x-4">
				<a
					:href="generateShareUrl('twitter')"
					target="_blank"
					class="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
				>
					<span class="mr-2">Twitter</span>
					<i class="fab fa-twitter"></i>
				</a>
				<a
					:href="generateShareUrl('facebook')"
					target="_blank"
					class="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded hover:bg-blue-800"
				>
					<span class="mr-2">Facebook</span>
					<i class="fab fa-facebook"></i>
				</a>
				<a
					:href="generateShareUrl('linkedin')"
					target="_blank"
					class="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
				>
					<span class="mr-2">LinkedIn</span>
					<i class="fab fa-linkedin"></i>
				</a>
			</div>

			<!-- Banner in fondo all'articolo -->
			<div class="w-full h-50 mt-12 bg-gray-800 border border-gray-700">
				<a href="https://pocketbitcoin.com/it?ref=btctalk" target="_blank">
					<img src="/public/assets/Pocket-banner.png" alt="Banner" class="w-full h-full" />
				</a>
			</div>

			<!-- Componente Blog -->
			<div class="container mx-auto mt-10">
				<Blog />
			</div>
		</div>
	</section>
</template>
<script>
import Blog from "../components/Blog.vue"; // Assicurati che il percorso sia corretto

export default {
	name: "Article",
	components: {
		Blog, // Registra il componente
	},
	props: ['id'], // ID passato dal router
	data() {
		return {
			article: null, // Dati dell'articolo
			error: null, // Messaggi di errore
		};
	},
	mounted() {
		this.fetchArticle(); // Recupera l'articolo al montaggio
	},
	methods: {
		fetchArticle() {
			if (!this.id) {
				this.error = 'ID articolo non specificato.';
				return;
			}

			fetch(`https://api.bitcoinbeer.events/api/articles_api.php?id=${this.id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Errore API: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					if (data.success) {
						this.article = data.data;
					} else {
						this.error = data.error || 'Errore sconosciuto.';
					}
				})
				.catch((error) => {
					this.error = `Errore nella richiesta API: ${error.message}`;
				});
		},
		formatDate(date) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(date).toLocaleDateString('it-IT', options);
		},
		generateShareUrl(platform) {
			const url = encodeURIComponent(window.location.href);
			const text = encodeURIComponent(this.article ? this.article.title : '');

			switch (platform) {
				case 'twitter':
					return `https://twitter.com/share?url=${url}&text=${text}`;
				case 'facebook':
					return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
				case 'linkedin':
					return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
				default:
					return '#';
			}
		},
	},
};
</script>

<style scoped>
/* Stile per il contenuto */
.prose a {
	color: #facc15; /* Giallo per i link */
	text-decoration: none;
}
.prose a:hover {
	text-decoration: underline;
}

/* Hero Styling */
.h-96 {
	height: 24rem;
}
</style>
