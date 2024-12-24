<template>
  <div class="w-full bg-black text-white relative overflow-hidden">
    <div
      class="absolute inset-0 opacity-20"
      style="background-image: url('/path/to/polyform.svg'); background-size: cover;"
    ></div>
    <div
      class="container flex flex-col flex-wrap content-center justify-center p-6 py-20 mx-auto relative"
    >
      <h1 class="text-4xl font-semibold leading-tight text-center">
        {{ $t("subscribe.heroTitle") }}
      </h1>
      <p class="pt-4 pb-8 text-lg text-center">
        {{ $t("subscribe.heroDescription") }}
      </p>

      <!-- Form di iscrizione -->
      <form @submit.prevent="handleSubscribe" class="w-full max-w-lg mx-auto space-y-6">
        <!-- Email -->
        <div class="flex flex-col">
          <label for="email" class="text-sm font-medium mb-2">
            {{ $t("subscribe.labelEmail") }}
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            :placeholder="$t('subscribe.placeholderEmail')"
            class="p-3 rounded bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:ring-orange-500 focus:ring-2"
          />
        </div>

        <!-- Nome -->
        <div class="flex flex-col">
          <label for="name" class="text-sm font-medium mb-2">
            {{ $t("subscribe.labelName") }}
          </label>
          <input
            type="text"
            id="name"
            v-model="name"
            :placeholder="$t('subscribe.placeholderName')"
            class="p-3 rounded bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:ring-orange-500 focus:ring-2"
          />
        </div>

        <!-- Bottone -->
        <button
          type="submit"
          class="w-full p-3 font-semibold rounded bg-orange-600 hover:bg-orange-700"
        >
          {{ $t("subscribe.button") }}
        </button>
      </form>

      <!-- Toast -->
      <div
        v-if="toastMessage"
        :class="['toast', toastType]"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded"
      >
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SubscribeSection",
  data() {
    return {
      email: "",
      name: "",
      toastMessage: null,
      toastType: "success", // or "error"
    };
  },
  methods: {
    async handleSubscribe() {
      if (!this.email || !this.validateEmail(this.email)) {
        this.showToast(this.$t("subscribe.invalidEmail"), "error");
        return;
      }

      try {
        // Invia i dati al server di Listmonk
        const response = await fetch("https://listmonk.bitcoinbeer.events/subscription/form", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: this.email,
            name: this.name,
            l: "818b4ea2-ea1f-48c1-843f-2f40c62604f6", // ID lista
          }),
        });

        if (response.ok) {
          this.showToast(this.$t("subscribe.success"), "success");
          this.email = "";
          this.name = "";
        } else {
          const error = await response.text();
          console.error("Errore durante la richiesta:", error);
          this.showToast(this.$t("subscribe.serverError"), "error");
        }
      } catch (error) {
        console.error("Errore di rete:", error);
        this.showToast(this.$t("subscribe.networkError"), "error");
      }
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      setTimeout(() => {
        this.toastMessage = null;
      }, 3000); // Il toast scompare dopo 3 secondi
    },
  },
};
</script>


<style scoped>
.container {
  background: linear-gradient(135deg, #000000, #121212);
}
input {
  transition: box-shadow 0.2s, border-color 0.2s;
}
input:focus {
  border-color: orange;
  box-shadow: 0 0 0 4px rgba(255, 153, 51, 0.3);
}
button {
  transition: background 0.2s ease-in-out;
}
button:hover {
  background: #cc4700;
}
.bg-black {
  background: linear-gradient(135deg, #000000, #121212);
}
.placeholder-gray-500::placeholder {
  color: #9ca3af; /* Grigio tenue per il placeholder */
}

.toast {
  position: fixed;
  z-index: 9999;
  padding: 1rem 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

.toast.success {
  background-color: #28a745; /* Verde per il successo */
}

.toast.error {
  background-color: #dc3545; /* Rosso per l'errore */
}
</style>
