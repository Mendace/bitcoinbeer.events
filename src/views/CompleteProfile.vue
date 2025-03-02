<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white p-4">
      <!-- Contenitore principale -->
      <div class="max-w-3xl mx-auto pt-8">
        <!-- Card Profilo -->
        <div class="main bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
          <!-- Sezione Header Profilo -->
          <div class="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
            <div class="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
              <img
                :src="profile.avatar || defaultAvatar"
                alt="Avatar"
                class="w-24 h-24 rounded-full object-cover border-4 border-white shadow mb-2"
              />
              <h1 class="text-2xl font-bold">{{ profile.username || 'Utente' }}</h1>
              <p class="text-sm text-gray-300">
                Membro da {{ formatDateToMonthYear(profile.created_at) }}
              </p>
            </div>
            <!-- Box statistiche reazioni -->
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
              <!-- Heart -->
              <div>
                <span class="text-2xl font-bold">{{ totalHeart }}</span>
                <div class="flex items-center justify-center space-x-1 text-red-400">
                  <i class="bi bi-heart-fill"></i>
                  <span class="text-sm">❤️</span>
                </div>
              </div>
              <!-- Star -->
              <div>
                <span class="text-2xl font-bold">{{ totalStar }}</span>
                <div class="flex items-center justify-center space-x-1 text-yellow-400">
                  <i class="bi bi-star-fill"></i>
                  <span class="text-sm">⭐️</span>
                </div>
              </div>
              <!-- Thumbs Up -->
              <div>
                <span class="text-2xl font-bold">{{ totalThumbsUp }}</span>
                <div class="flex items-center justify-center space-x-1 text-green-400">
                  <i class="bi bi-hand-thumbs-up"></i>
                  <span class="text-sm">👍</span>
                </div>
              </div>
              <!-- Thumbs Down -->
              <div>
                <span class="text-2xl font-bold">{{ totalThumbsDown }}</span>
                <div class="flex items-center justify-center space-x-1 text-red-400">
                  <i class="bi bi-hand-thumbs-down"></i>
                  <span class="text-sm">👎</span>
                </div>
              </div>
              <!-- Totale (opzionale) -->
              <div>
                <span class="text-2xl font-bold">{{ totalReactions }}</span>
                <div class="flex items-center justify-center space-x-1 text-pink-200">
                  <i class="bi bi-emoji-smile-upside-down"></i>
                  <span class="text-sm">Totale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Sezione Commenti -->
        <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold mb-4">I miei commenti ({{ commentsCount }})</h2>
          <div v-if="comments.length === 0" class="text-gray-200">
            Non hai ancora commentato nulla.
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="p-4 bg-white/20 hover:bg-white/30 transition rounded"
            >
              <p class="text-gray-100">
                <strong>Commento #{{ comment.id }}</strong> – {{ comment.content }}
              </p>
              <p class="text-sm text-gray-300 mt-1">
                <i class="bi bi-clock-fill"></i>
                {{ formatDate(comment.created_at) }} –
                <a
                  :href="`/article/${comment.article_id}#comment-${comment.id}`"
                  class="text-blue-300 underline"
                >
                  Vai al commento
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Stato reattivo per il profilo e i commenti
  const profile = ref({});
  const comments = ref([]);
  const defaultAvatar = '/assets/default-avatar.png';
  
  // Funzione per caricare il profilo dall'API
  async function loadProfile() {
    const token = localStorage.getItem('user_token');
    if (!token) return;
    try {
      const response = await fetch('https://api.bitcoinbeer.events/api/get_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await response.json();
      if (data.success) {
        profile.value = data.data.user;
        comments.value = data.data.comments;
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  onMounted(() => {
    loadProfile();
  });
  
  // Formatta la data in locale "it-IT"
  function formatDate(dt) {
    return new Date(dt).toLocaleString('it-IT');
  }
  
  // Formatta la data in formato "Mese Anno" (es. "Mar 2025")
  function formatDateToMonthYear(dt) {
    const options = { month: 'short', year: 'numeric' };
    return new Date(dt).toLocaleDateString('it-IT', options);
  }
  
  // Computed: Numero totale dei commenti
  const commentsCount = computed(() => comments.value.length);
  
  // Computed: Somma reazioni
  const totalLike = computed(() =>
    comments.value.reduce((sum, c) => sum + (c.like_count || 0), 0)
  );
  const totalHeart = computed(() =>
    comments.value.reduce((sum, c) => sum + (c.heart_count || 0), 0)
  );
  const totalStar = computed(() =>
    comments.value.reduce((sum, c) => sum + (c.star_count || 0), 0)
  );
  const totalThumbsUp = computed(() =>
    comments.value.reduce((sum, c) => sum + (c.thumbsup_count || 0), 0)
  );
  const totalThumbsDown = computed(() =>
    comments.value.reduce((sum, c) => sum + (c.thumbsdown_count || 0), 0)
  );
  
  // Esempio: Totale reazioni (solo positive, o positive - negative, a tua scelta)
  // In questo caso le sommiamo tutte e basta
  const totalReactions = computed(() =>
    totalLike.value +
    totalHeart.value +
    totalStar.value +
    totalThumbsUp.value +
    totalThumbsDown.value
  );
  </script>
  
  <style scoped>
  .main{
    margin-top: 6rem;
  }
  /* Se usi Tailwind, queste classi funzionano "out of the box".
     Altrimenti, puoi copiare i concetti e adattarli al tuo CSS. */
  
  /* Esempio: potresti dover definire .bg-white/10 come un colore RGBA nel tuo CSS */
  </style>
  