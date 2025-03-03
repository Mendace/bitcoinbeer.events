<template>
  <!-- Contenitore fullscreen con sfondo pulsante -->
  <div class="dark-neon-bg min-h-screen flex flex-col items-center justify-start text-white relative overflow-hidden">
    
    <!-- Titolo e sottotitolo -->
    <div class="down text-center pt-16 pb-8 px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold neon-title">
        Il Tuo Profilo
      </h1>
      <p class="text-base md:text-lg text-gray-300 max-w-xl mx-auto mt-3">
        Benvenuto nella tua area personale. Scopri tutte le tue reazioni e commenti!
      </p>
    </div>

    <!-- WRAPPER Card Profilo -->
    <div class="w-full max-w-3xl mb-10 mx-auto px-4">
      <!-- Card Profilo vera e propria -->
      <div class="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6">
        <!-- Header Profilo: Avatar + Nome + Data + Statistiche -->
        <div class="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between">
          <!-- Avatar + Nome + Data -->
          <div class="flex flex-col items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0">
            <img
              :src="profile.avatar || defaultAvatar"
              alt="Avatar"
              class="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover
                     border-4 border-purple-600 shadow-lg mb-2"
            />
            <h1 class="text-2xl md:text-3xl font-bold text-pink-400">
              {{ profile.username || 'Utente' }}
            </h1>
            <p class="text-sm text-gray-400">
              Membro da {{ formatDateToMonthYear(profile.created_at) }}
            </p>
          </div>

          <!-- Statistiche Reazioni (card style) -->
          <div class="mt-4 sm:mt-0 flex flex-wrap gap-4 justify-center">
            <!-- Heart -->
            <div class="stats-card">
              <div class="text-2xl font-extrabold">{{ totalHeart }}</div>
              <div class="text-pink-400 flex items-center justify-center space-x-1">
                <i class="bi bi-heart-fill"></i>
                <span>❤️</span>
              </div>
            </div>
            <!-- Star -->
            <div class="stats-card">
              <div class="text-2xl font-extrabold">{{ totalStar }}</div>
              <div class="text-yellow-400 flex items-center justify-center space-x-1">
                <i class="bi bi-star-fill"></i>
                <span>⭐</span>
              </div>
            </div>
            <!-- Thumbs Up -->
            <div class="stats-card">
              <div class="text-2xl font-extrabold">{{ totalThumbsUp }}</div>
              <div class="text-green-400 flex items-center justify-center space-x-1">
                <i class="bi bi-hand-thumbs-up"></i>
                <span>👍</span>
              </div>
            </div>
            <!-- Thumbs Down -->
            <div class="stats-card">
              <div class="text-2xl font-extrabold">{{ totalThumbsDown }}</div>
              <div class="text-red-500 flex items-center justify-center space-x-1">
                <i class="bi bi-hand-thumbs-down"></i>
                <span>👎</span>
              </div>
            </div>
            <!-- Totale (opzionale) -->
            <div class="stats-card">
              <div class="text-2xl font-extrabold">{{ totalReactions }}</div>
              <div class="text-purple-400 flex items-center justify-center space-x-1">
                <i class="bi bi-emoji-smile-upside-down"></i>
                <span>Totale</span>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- Fine Card Profilo -->
    </div> <!-- Fine WRAPPER Profilo -->

    <!-- WRAPPER Sezione Commenti -->
    <div class="w-full max-w-3xl mb-16 mx-auto px-4">
      <!-- Card Commenti vera e propria -->
      <div class="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6">
        <h2 class="text-xl md:text-2xl font-bold text-center mb-6">
          I miei commenti ({{ commentsCount }})
        </h2>
        <div v-if="comments.length === 0" class="text-gray-200 text-center">
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
            <p class="text-sm text-gray-300 mt-1 flex items-center space-x-2">
              <i class="bi bi-clock-fill"></i>
              <span>{{ formatDate(comment.created_at) }}</span>
              <span>–</span>
              <a
                :href="`/article/${comment.article_id}#comment-${comment.id}`"
                class="spectacular-link"
              >
                Vai al commento
              </a>
            </p>
          </div>
        </div>
      </div> <!-- Fine Card Commenti -->
    </div> <!-- Fine WRAPPER Commenti -->

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const profile = ref({});
const comments = ref([]);
const defaultAvatar = '/assets/default-avatar.png';

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

function formatDate(dt) {
  return new Date(dt).toLocaleString('it-IT');
}
function formatDateToMonthYear(dt) {
  const options = { month: 'short', year: 'numeric' };
  return new Date(dt).toLocaleDateString('it-IT', options);
}

// Numero totale dei commenti
const commentsCount = computed(() => comments.value.length);

// Somma reazioni
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
const totalReactions = computed(() =>
  totalHeart.value + totalStar.value + totalThumbsUp.value + totalThumbsDown.value
);
</script>

<style scoped>
.down {
  margin-top: 4rem;
}
.dark-neon-bg {
  background: #000; /* nero di base */
  position: relative;
  overflow: hidden;
}

.dark-neon-bg::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1800px;
  height: 1800px;
  transform: translate(-50%, -50%) scale(0.7);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,0,128,0.25) 0%, transparent 70%);
  animation: pulse-glow 4s infinite ease-in-out;
  z-index: 0;
}

@keyframes pulse-glow {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.7);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
}

.dark-neon-bg > * {
  position: relative;
  z-index: 1;
}

.neon-title {
  color: #f0f0f0;
  text-shadow:
    0 0 5px #e91e63,
    0 0 10px #e91e63;
}

.stats-card {
  min-width: 64px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  text-align: center;
  transition: transform 0.3s ease;
}
.stats-card:hover {
  transform: translateY(-3px) scale(1.05);
  background: rgba(255, 255, 255, 0.15);
}

.spectacular-link {
  background: linear-gradient(to right, #00b9d1, #1793f8);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.4s ease;
}
.spectacular-link:hover {
  background: linear-gradient(to right, #facc15, #f97316);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow:
    0 0 6px rgba(249, 115, 22, 0.6),
    0 0 12px rgba(234, 179, 8, 0.5);
}

@media (max-width: 640px) {
  .dark-neon-bg::before {
    width: 1200px;
    height: 1200px;
    transform: translate(-50%, -50%) scale(0.8);
  }
  .neon-title {
    font-size: 1.75rem;
  }

  .dark-neon-bg img[alt="Avatar"] {
    width: 6rem;
    height: 6rem;
  }

  .bg-white\/10.p-6 {
    padding: 1rem;
  }
}
</style>
