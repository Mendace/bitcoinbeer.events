<template>
	<section class="bg-black text-white py-12">
		<div class="container p-6 mx-auto space-y-8">
			<div class="space-y-2 text-center">
				<h2 class="text-4xl font-extrabold text-white">Articoli Recenti</h2>
				<p class="font-serif text-lg text-gray-400">Ultimi articoli pubblicati nel blog</p>
			</div>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<article
					v-for="article in articles"
					:key="article.id"
					class="relative flex flex-col p-4 rounded-xl shadow-lg bg-opacity-60 bg-white dark:bg-opacity-10 backdrop-blur-lg transition hover:scale-105"
				>
					<a :href="'/article/' + article.id" class="block overflow-hidden rounded-lg">
						<img
							:src="article.cover_image"
							alt="Copertina articolo"
							class="w-full h-52 object-cover rounded-md transition-transform duration-300 hover:scale-105"
						/>
					</a>
					<div class="flex flex-col flex-1 p-4 space-y-2">
						<a
							:href="'/article/' + article.id"
							class="text-sm uppercase tracking-wide font-semibold text-orange-500 hover:underline"
						>
							Blog
						</a>
						<h3 class="text-lg font-bold leading-snug">{{ article.title }}</h3>
						<p class="text-sm text-gray-300">{{ article.subtitle }}</p>
						<div class="flex justify-between items-center mt-4 text-gray-400 text-xs">
							<span>{{ formatDate(article.created_at) }}</span>
							<!-- Social Icons -->
							<div class="flex items-center space-x-3">
								<a
									:href="generateShareUrl('twitter', article.title)"
									target="_blank"
									class="text-blue-400 hover:text-blue-500"
								>
									<i class="fab fa-twitter"></i>
								</a>
								<a
									:href="generateShareUrl('facebook', article.title)"
									target="_blank"
									class="text-blue-700 hover:text-blue-800"
								>
									<i class="fab fa-facebook"></i>
								</a>
								<a
									:href="generateShareUrl('linkedin', article.title)"
									target="_blank"
									class="text-blue-500 hover:text-blue-600"
								>
									<i class="fab fa-linkedin"></i>
								</a>
							</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	data() {
		return {
			articles: [], // Array per gli articoli
			error: null, // Gestione errori
		};
	},
	mounted() {
		// Recupera gli articoli dall'API
		fetch('https://api.bitcoinbeer.events/api/articles_api.php')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Errore API: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data.success) {
					this.articles = data.data; // Assegna gli articoli recuperati
				} else {
					this.error = data.error || 'Errore sconosciuto.';
				}
			})
			.catch((error) => {
				this.error = `Errore nella richiesta API: ${error.message}`;
			});
	},
	methods: {
		// Formatta la data
		formatDate(date) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(date).toLocaleDateString('it-IT', options);
		},
		// Genera URL di condivisione
		generateShareUrl(platform, title) {
			const url = encodeURIComponent(window.location.href);
			const text = encodeURIComponent(title);

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
/* Animazioni immagini */
article img {
	border-radius: 0.5rem;
	transition: transform 0.3s ease-in-out;
}
article img:hover {
	transform: scale(1.05);
}

/* Glass Effect */
article {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Hover Effect */
article:hover {
	transform: scale(1.05);
	transition: transform 0.3s ease-in-out;
}

/* Social Icons */
i.fab {
	font-size: 1.2rem;
	transition: color 0.2s ease-in-out;
}
</style>
