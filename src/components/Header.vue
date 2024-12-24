<template>
    <header
      class="bg-white bg-opacity-30 backdrop-blur-md shadow-md rounded-full fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[80%] flex justify-between items-center p-4 z-50"
    >
      <!-- Hamburger Menu (solo mobile) -->
      <button
        class="lg:hidden text-gray-800 focus:outline-none"
        @click="toggleMobileMenu"
      >
        <i class="fas fa-bars text-2xl"></i>
      </button>
  
      <!-- Logo -->
      <div class="flex items-center justify-center flex-grow lg:flex-grow-0">
        <router-link to="/" class="flex items-center">
          <img src="/src/assets/logos/marker.png" alt="Logo" class="h-10 w-auto" />
        </router-link>
      </div>
  
      <!-- Navigazione Desktop -->
      <nav class="hidden lg:flex flex-grow justify-center">
        <ul class="flex space-x-6 text-gray-800">
          <li>
            <router-link
              to="/"
              class="hover:underline hover:text-orange-600 transition-all"
              :class="{ 'text-orange-600 font-semibold': isActive('/home') }"
            >
              {{ $t('navigation.home') }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/start"
              class="hover:underline hover:text-orange-600 transition-all"
              :class="{ 'text-orange-600 font-semibold': isActive('/start') }"
            >
              {{ $t('navigation.start') }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/explore"
              class="hover:underline hover:text-orange-600 transition-all"
              :class="{ 'text-orange-600 font-semibold': isActive('/explore') }"
            >
              {{ $t('navigation.explore') }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/dashboard"
              class="hover:underline hover:text-orange-600 transition-all"
              :class="{ 'text-orange-600 font-semibold': isActive('/dashboard') }"
            >
              {{ $t('navigation.dashboard') }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/contact"
              class="hover:underline hover:text-orange-600 transition-all"
              :class="{ 'text-orange-600 font-semibold': isActive('/contact') }"
            >
              {{ $t('navigation.contact') }}
            </router-link>
          </li>
        </ul>
      </nav>
  
      <!-- Cambio Lingua -->
      <div class="hidden lg:flex items-center space-x-4">
        <button
          @click="setLanguage('it')"
          :class="{ 'text-orange-600 font-semibold': currentLanguage === 'it' }"
          class="hover:text-orange-600 transition-all"
        >
          IT
        </button>
        <span>|</span>
        <button
          @click="setLanguage('en')"
          :class="{ 'text-orange-600 font-semibold': currentLanguage === 'en' }"
          class="hover:text-orange-600 transition-all"
        >
          ENG
        </button>
      </div>
  
      <!-- Menu Mobile Fullscreen -->
      <transition name="fade">
        <div class="menu-mobile"
            :class="{ open: isMobileMenuOpen }"
            >
            <button class="close" @click="toggleMobileMenu">
                <i class="fas fa-times"></i>
            </button>
            <ul>
                <li>
                <router-link to="/" @click="toggleMobileMenu">{{ $t('navigation.home') }}</router-link>
                </li>
                <li>
                <router-link to="/start" @click="toggleMobileMenu">{{ $t('navigation.start') }}</router-link>
                </li>
                <li>
                <router-link to="/explore" @click="toggleMobileMenu">{{ $t('navigation.explore') }}</router-link>
                </li>
                <li>
                <router-link to="/dashboard" @click="toggleMobileMenu">{{ $t('navigation.dashboard') }}</router-link>
                </li>
                <li>
                <router-link to="/contact" @click="toggleMobileMenu">{{ $t('navigation.contact') }}</router-link>
                </li>
            </ul>
          <!-- Cambio Lingua in Basso -->
          <div class="absolute bottom-8 flex space-x-4">
            <button
              @click="setLanguage('it')"
              :class="{ 'text-blue-400 font-semibold': currentLanguage === 'it' }"
              class="hover:text-blue-400 transition-all"
            >
              IT
            </button>
            <span>|</span>
            <button
              @click="setLanguage('en')"
              :class="{ 'text-blue-400 font-semibold': currentLanguage === 'en' }"
              class="hover:text-blue-400 transition-all"
            >
              ENG
            </button>
          </div>
        </div>
      </transition>
    </header>
  </template>
  
  
  <script>
  import { useRoute } from "vue-router";
  import { useI18n } from "vue-i18n";
  import { ref } from "vue";
  
  export default {
    name: "Header",
    setup() {
      const { locale } = useI18n();
      const route = useRoute();
      const isActive = (path) => route.path === path;
  
      const setLanguage = (lang) => {
        locale.value = lang; // Cambia la lingua
      };
  
      // Gestione Menu Mobile
      const isMobileMenuOpen = ref(false);
      const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value;
      };
  
      return {
        isActive,
        currentLanguage: locale,
        setLanguage,
        isMobileMenuOpen,
        toggleMobileMenu,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Menu Mobile: Stile specifico */
.menu-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Copre tutto lo schermo */
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Massima priorità */
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(-100%);
  opacity: 0;
}

.menu-mobile.open {
  transform: translateY(0);
  opacity: 1;
}

.menu-mobile ul {
  list-style: none;
  text-align: center;
  padding: 0;
}

.menu-mobile ul li {
  margin: 20px 0;
}

.menu-mobile ul li a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.3s ease;
}

.menu-mobile ul li a:hover {
  color: #0072ff;
}

.menu-mobile button.close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.menu-mobile button.close:hover {
  color: #ff4747;
}

/* Limita il menu mobile ai dispositivi mobili */
@media (min-width: 768px) {
  .menu-mobile {
    display: none;
  }
}

  /* Animazioni per il menu mobile */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter, 
  .fade-leave-to {
    opacity: 0;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  </style>
  