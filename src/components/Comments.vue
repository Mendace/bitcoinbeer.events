<template>
  <div class="mt-12">
  
    <!-- BOX Login / Registrazione (se non loggato) -->
    <div v-if="!loggedIn" class="p-4 bg-gray-900 rounded mb-4">
      <h2 class="text-xl font-bold text-yellow-400">Login / Registrazione</h2>
      <div class="mt-2">
        <label for="privateKey" class="block text-gray-300">
          Ottieni la tua private key registrandoti oppure inseriscila se ne possiedi una:
        </label>
        <input
          id="privateKey"
          v-model="privateKey"
          type="text"
          placeholder="Private key"
          class="w-full p-2 my-2 rounded bg-gray-700 text-white border"
        />
        <div class="flex space-x-2">
          <button @click="login" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
          <button @click="registerUser" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Registrati
          </button>
        </div>
        <p v-if="authMessage" class="mt-2 text-gray-300">{{ authMessage }}</p>
      </div>
    </div>
  
    <!-- Titolo "Commenti" (sempre visibile) -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-yellow-400">Commenti</h2>
      <!-- Se loggato, mostra info utente e pulsante Profilo -->
      <div v-if="loggedIn" class="flex items-center space-x-2">
        <img :src="userAvatar" alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
        <span class="text-yellow-400 font-semibold">{{ profile.username || 'Utente' }}</span>
        <button @click="openProfileModal" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded">
          Profilo
        </button>
      </div>
    </div>
  
    <!-- Elenco commenti: SEMPRE visibili -->
    <div v-if="thread.length === 0" class="text-gray-300 my-2">
      Nessun commento. Sii il primo a commentare!
    </div>
    <div class="mt-4 space-y-4">
      <CommentItem
        v-for="c in thread"
        :key="c.id"
        :comment="c"
        :formatDate="formatDate"
        :refresh="loadComments"
        :loggedIn="loggedIn"
      />
    </div>
  
    <!-- Box "Aggiungi commento" SOLO se loggato -->
    <div v-if="loggedIn" class="mt-8 p-4 bg-gray-900 rounded">
      <div class="flex items-center space-x-3 mb-3">
        <img :src="userAvatar" alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
        <span class="text-yellow-400 font-semibold">{{ profile.username || 'Utente' }}</span>
      </div>
      <h3 class="text-lg font-bold text-yellow-400">Aggiungi un commento</h3>
      <div class="mt-2">
        <textarea
          v-model="content"
          rows="4"
          placeholder="Scrivi il tuo commento..."
          class="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-white border-none"
        ></textarea>
        <button class="bg-yellow-500 text-black px-3 py-1 rounded" @click="addComment">
          Invia
        </button>
      </div>
    </div>
  
    <!-- Modal Profilo (se loggato) -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-900 rounded p-6 w-11/12 md:w-1/2">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-yellow-400">Il mio profilo</h3>
          <button @click="closeProfileModal" class="text-gray-300 text-2xl">&times;</button>
        </div>
        <div v-if="profileLoading" class="text-gray-300">Caricamento...</div>
        <div v-else>
          <div class="mb-4">
            <label class="block text-gray-300 mb-1" for="profileUsername">Nome Utente</label>
            <input
              id="profileUsername"
              v-model="profile.username"
              type="text"
              placeholder="Inserisci il tuo nome utente"
              class="w-full p-2 rounded bg-gray-700 text-white border"
            />
          </div>
          <div class="flex justify-between items-center">
            <button @click="updateProfile" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Aggiorna Profilo
            </button>
            <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
          <p v-if="profileMessage" class="mt-2 text-gray-300">{{ profileMessage }}</p>
          <div class="mt-6">
            <h4 class="text-lg font-bold text-yellow-400 mb-2">I miei commenti</h4>
            <div v-if="myComments.length === 0" class="text-gray-300">Non hai commenti.</div>
            <ul>
              <li
                v-for="c in myComments"
                :key="c.id"
                class="text-gray-300 text-sm"
              >
                Commento #{{ c.id }} ({{ c.like_count || 0 }} like) –
                <a :href="`/article/${c.article_id}#comment-${c.id}`" class="underline text-blue-400">
                  Vai al commento
                </a>
              </li>
            </ul>
            <div class="mt-4">
              <router-link to="/CompleteProfile" class="text-blue-400 underline flex items-center">
  <i class="bi bi-person-lines-fill mr-1"></i>
  Profilo Completo
</router-link>                
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal Registrazione: inserimento nome -->
    <div v-if="showRegistrationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-900 rounded p-6 w-11/12 md:w-1/3">
        <h3 class="text-xl font-bold text-yellow-400 mb-4">Registrazione</h3>
        <label class="block text-gray-300 mb-2" for="registrationUsername">
          Inserisci il nome da registrare:
        </label>
        <input id="registrationUsername"
          v-model="registrationUsername"
          type="text"
          placeholder="Nome utente"
          class="w-full p-2 rounded bg-gray-700 text-white border"
        />
        <p v-if="registrationMessage" class="mt-2 text-red-400">{{ registrationMessage }}</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="cancelRegistration" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Annulla
          </button>
          <button @click="submitRegistration" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Registrati
          </button>
        </div>
      </div>
    </div>
  
    <!-- Modal Private Key (mostra la chiave dopo la registrazione) -->
    <div v-if="showPrivateKeyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-900 rounded p-6 w-11/12 md:w-1/3">
        <h3 class="text-xl font-bold text-yellow-400 mb-4">Registrazione completata</h3>
        <p class="text-gray-300 mb-4">
          Salva con cura la tua private key. Sarà necessaria per accedere al tuo profilo:
        </p>
        <div class="bg-gray-800 p-4 rounded text-white font-mono text-center mb-4">
          {{ registrationPrivateKey }}
        </div>
        <div class="flex justify-end">
          <button @click="closePrivateKeyModal" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CommentItem from './CommentItem.vue';

// Props
const props = defineProps({
  articleId: { type: [String, Number], required: true }
});

// Stato di login
const loggedIn = ref(false);
const privateKey = ref('');
const authMessage = ref('');

// Dati per i commenti
const rawComments = ref([]);
const thread = ref([]);
const content = ref('');

// Profilo utente
const profile = ref({ user_id: null, username: '', avatar: '' });
const myComments = ref([]);
const profileLoading = ref(false);
const profileMessage = ref('');

// Modal e registrazioni
const showProfileModal = ref(false);
const showRegistrationModal = ref(false);
const registrationUsername = ref('');
const registrationMessage = ref('');
const showPrivateKeyModal = ref(false);
const registrationPrivateKey = ref('');

// Avatar di default
const defaultAvatar = '/assets/default-avatar.png';
const userAvatar = computed(() => {
  return profile.value.avatar && profile.value.avatar.trim() !== ''
    ? profile.value.avatar
    : defaultAvatar;
});

// Computed: Totale like ricevuti da tutti i commenti dell'utente
const totalLikes = computed(() =>
  myComments.value.reduce((sum, comment) => sum + (comment.like_count || 0), 0)
);

// Controlla login
function checkLogin() {
  const token = localStorage.getItem('user_token');
  loggedIn.value = !!token;
}
checkLogin();

// onMounted => carica commenti e, se loggato, carica il profilo
onMounted(() => {
  loadComments();
  if (loggedIn.value) {
    loadProfile();
  }
});

/**
 * Carica commenti da comments_api.php?article_id=...
 */
async function loadComments() {
  try {
    const url = `https://api.bitcoinbeer.events/api/comments_api.php?article_id=${props.articleId}`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.success) {
      rawComments.value = data.data;
      buildThread();
    } else {
      console.error(data.error);
    }
  } catch (e) {
    console.error('loadComments error', e);
  }
}

/**
 * Ricostruisce la thread con replies
 */
function buildThread() {
  const map = {};
  rawComments.value.forEach(c => {
    c.replies = [];
    map[c.id] = c;
  });
  const roots = [];
  rawComments.value.forEach(c => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].replies.push(c);
    } else {
      roots.push(c);
    }
  });
  thread.value = roots;
}

/**
 * Aggiunge un commento (solo se loggato)
 */
async function addComment() {
  if (!content.value.trim()) {
    alert("Testo commento vuoto!");
    return;
  }
  try {
    const body = {
      article_id: Number(props.articleId),
      content: content.value,
      token: localStorage.getItem('user_token') || ""
    };
    if (profile.value.username) {
      body.author = profile.value.username;
    }
  
    const resp = await fetch('https://api.bitcoinbeer.events/api/comments_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (data.success) {
      localStorage.setItem(`commentKey_${data.data.id}`, data.data.edit_key);
  
      rawComments.value.push({
        id: data.data.id,
        parent_id: null,
        article_id: props.articleId,
        user_id: profile.value.user_id || null,
        author: profile.value.username || 'Anonimo',
        avatar: userAvatar.value,
        content: content.value,
        status: data.data.status || 'pending',
        like_count: 0,
        heart_count: 0,
        star_count: 0,
        thumbsup_count: 0,
        thumbsdown_count: 0,
        created_at: new Date().toISOString()
      });
  
      buildThread();
      content.value = '';
    } else {
      console.error(data.error);
    }
  } catch (e) {
    console.error('addComment error', e);
  }
}

/**
 * Formatta la data in stile IT
 */
function formatDate(dt) {
  return new Date(dt).toLocaleString('it-IT');
}

/**
 * Login con private key
 */
async function login() {
  if (!privateKey.value.trim()) {
    authMessage.value = 'Inserisci la private key.';
    return;
  }
  try {
    const response = await fetch('https://api.bitcoinbeer.events/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ private_key: privateKey.value.trim() })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('user_token', data.data.token);
      authMessage.value = 'Login effettuato con successo!';
      loggedIn.value = true;
      privateKey.value = '';
      loadComments();
      loadProfile();
    } else {
      authMessage.value = 'Errore: ' + data.error;
    }
  } catch (e) {
    console.error(e);
    authMessage.value = 'Errore di rete.';
  }
}

/**
 * Registrazione (apre il modal per l'inserimento del nome)
 */
function registerUser() {
  showRegistrationModal.value = true;
}

/**
 * Gestisce la cancellazione della registrazione
 */
function cancelRegistration() {
  showRegistrationModal.value = false;
  registrationUsername.value = '';
  registrationMessage.value = '';
}

/**
 * Invia la richiesta di registrazione con il nome scelto
 */
async function submitRegistration() {
  if (!registrationUsername.value.trim()) {
    registrationMessage.value = 'Inserisci un nome utente.';
    return;
  }
  try {
    const response = await fetch('https://api.bitcoinbeer.events/api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: registrationUsername.value.trim() })
    });
    const data = await response.json();
    if (data.success) {
      registrationPrivateKey.value = data.data.private_key;
      showRegistrationModal.value = false;
      showPrivateKeyModal.value = true;
      authMessage.value = "Ora puoi usare la tua private key per il login.";
    } else {
      registrationMessage.value = data.error || 'Errore durante la registrazione.';
    }
  } catch (e) {
    console.error(e);
    registrationMessage.value = 'Errore di rete durante la registrazione.';
  }
}

/**
 * Chiude il modal della private key
 */
function closePrivateKeyModal() {
  showPrivateKeyModal.value = false;
}

/**
 * Carica profilo (solo se loggato)
 */
async function loadProfile() {
  const token = localStorage.getItem('user_token');
  if (!token) return;
  profileLoading.value = true;
  try {
    const resp = await fetch('https://api.bitcoinbeer.events/api/get_profile.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    const data = await resp.json();
    if (data.success) {
      profile.value = data.data.user;
      myComments.value = data.data.comments;
      // Salva i dati dell'utente in localStorage per il controllo di ownership
      localStorage.setItem('user_data', JSON.stringify(data.data.user));
    } else {
      console.error(data.error);
    }
  } catch (e) {
    console.error(e);
  }
  profileLoading.value = false;
}

/**
 * Apre la modal profilo
 */
function openProfileModal() {
  showProfileModal.value = true;
  loadProfile();
}

/**
 * Chiude la modal profilo
 */
function closeProfileModal() {
  showProfileModal.value = false;
}

/**
 * Aggiorna profilo (solo username)
 */
async function updateProfile() {
  const token = localStorage.getItem('user_token');
  if (!token) return;
  profileMessage.value = '';
  const formData = new FormData();
  formData.append('token', token);
  formData.append('username', profile.value.username);

  try {
    const resp = await fetch('https://api.bitcoinbeer.events/api/update_profile.php', {
      method: 'POST',
      body: formData
    });
    const data = await resp.json();
    if (data.success) {
      profile.value.username = data.data.username;
      profile.value.avatar = '';
      profileMessage.value = 'Profilo aggiornato con successo!';
    } else {
      profileMessage.value = 'Errore: ' + data.error;
    }
  } catch (e) {
    console.error(e);
    profileMessage.value = 'Errore di rete durante l’aggiornamento del profilo.';
  }
}

/**
 * Logout
 */
function logout() {
  localStorage.removeItem('user_token');
  loggedIn.value = false;
  showProfileModal.value = false;
  authMessage.value = 'Logout effettuato.';
  profile.value = { user_id: null, username: '', avatar: '' };
  myComments.value = [];
}
</script>

<style scoped>
.mt-12 {
  margin-top: 3rem;
}
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0; right: 0; bottom: 0; left: 0;
}
.z-50 {
  z-index: 50;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
