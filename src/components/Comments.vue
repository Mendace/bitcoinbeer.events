<template>
    <div class="mt-12">
      <!-- Pulsante Login Telegram -->
      <TelegramLoginButton />
  
      <h2 class="text-2xl font-bold text-yellow-400 mt-4">Commenti</h2>
  
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
        />
      </div>
  
      <div class="mt-8 p-4 bg-gray-900 rounded">
        <h3 class="text-lg font-bold text-yellow-400">Aggiungi un commento</h3>
        <div class="mt-2">
          <input
            v-model="author"
            type="text"
            placeholder="Nome (opzionale)"
            class="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-white border-none"
          />
          <textarea
            v-model="content"
            rows="4"
            placeholder="Scrivi il tuo commento..."
            class="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-white border-none"
          ></textarea>
          <button
            class="bg-yellow-500 text-black px-3 py-1 rounded"
            @click="addComment"
          >
            Invia
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue'
  import CommentItem from './CommentItem.vue'
  import TelegramLoginButton from './TelegramLoginButton.vue'
  
  // (Opzionale) Dai un nome al componente
  // Non è strettamente necessario, ma se vuoi:
  defineOptions({ name: 'Comments' })
  
  // Props
  const props = defineProps({
    articleId: { type: [String, Number], required: true }
  })
  
  // Stato e variabili
  const baseUrl = 'https://api.bitcoinbeer.events/api/comments_api.php'
  const rawComments = ref([])
  const thread = ref([])
  const author = ref('')
  const content = ref('')
  
  // Metodi
  async function loadComments() {
    try {
      const url = `${baseUrl}?article_id=${props.articleId}`
      const resp = await fetch(url)
      const data = await resp.json()
      if (data.success) {
        rawComments.value = data.data
        buildThread()
      } else {
        console.error(data.error)
      }
    } catch (e) {
      console.error('loadComments error', e)
    }
  }
  
  function buildThread() {
    const map = {}
    rawComments.value.forEach(c => {
      c.replies = []
      map[c.id] = c
    })
    const roots = []
    rawComments.value.forEach(c => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies.push(c)
      } else {
        roots.push(c)
      }
    })
    thread.value = roots
  }
  
  async function addComment() {
    if (!content.value.trim()) {
      alert("Testo commento vuoto!")
      return
    }
    try {
      const body = {
        article_id: Number(props.articleId),
        author: author.value,
        content: content.value,
        token: localStorage.getItem('tg_token') || ""
      }
      const resp = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await resp.json()
      if (data.success) {
        localStorage.setItem(`commentKey_${data.data.id}`, data.data.edit_key)
        rawComments.value.push({
          id: data.data.id,
          parent_id: null,
          author: author.value || 'Anonimo',
          content: content.value,
          status: data.data.status || 'pending',
          heart_count: 0,
          star_count: 0,
          thumbsup_count: 0,
          thumbsdown_count: 0,
          created_at: new Date().toISOString()
        })
        buildThread()
        author.value = ''
        content.value = ''
      } else {
        console.error(data.error)
      }
    } catch (e) {
      console.error('addComment error', e)
    }
  }
  
  function formatDate(dt) {
    return new Date(dt).toLocaleString('it-IT')
  }
  
  // Lifecycle
  onMounted(() => {
    loadComments()
  })
  </script>
  