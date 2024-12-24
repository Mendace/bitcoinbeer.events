<template>
  <transition name="fade">
    <router-view />
  </transition>
  <section>
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>{{ $t('chapters.title') }}</h1>
        <p>{{ $t('chapters.subtitle') }}</p>
        <a href="https://bitcoinbeer.events" target="_blank" class="cta-button">
          {{ $t('chapters.coordinationGroup') }}
        </a>
      </div>
      <div class="scroll-indicator" @click="scrollToSteps">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <!-- Steps Section -->
    <div id="steps-section" class="steps-section">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <div class="step-icon">
          <i :class="step.icon"></i>
        </div>
        <div class="step-content">
          <h2>{{ $t(step.title) }}</h2>
          <p>
            {{ $t(step.description) }}
            <a v-if="step.link" :href="step.link" target="_blank" class="text-link">
              {{ $t(step.linkText) }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Chapters',
  data() {
    return {
      steps: [
        {
          icon: 'fas fa-map-marked-alt',
          title: 'chapters.step1Title',
          description: 'chapters.step1Description',
          link: 'https://bitcoinbeer.events/map',
          linkText: 'chapters.mapLink',
        },
        {
          icon: 'fab fa-telegram',
          title: 'chapters.step2Title',
          description: 'chapters.step2Description',
          link: 'https://bitcoinbeer.events',
          linkText: 'chapters.coordinationGroup',
        },
        {
          icon: 'fas fa-user-friends',
          title: 'chapters.step3Title',
          description: 'chapters.step3Description',
        },
        {
          icon: 'fas fa-tachometer-alt',
          title: 'chapters.step4Title',
          description: 'chapters.step4Description',
        },
      ],
    };
  },
  methods: {
    scrollToSteps() {
      const stepsSection = document.getElementById('steps-section');
      if (stepsSection) {
        stepsSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hero Section */
.hero-section {
  position: relative;
  background-image: url('/assets/DSC01637.webp');
  /* Aggiungi l'immagine di background */
  background-size: cover;
  background-position: center;
  height: 100vh;
  /* Ora occupa l'intera altezza dello schermo */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #E0E0E0;
}

.hero-section .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  /* Layer scuro sovrapposto */
}

.hero-section .hero-content {
  position: relative;
  z-index: 1;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 1.5rem;
}

.hero-section .cta-button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: #E0E0E0;
  background: rgba(247, 147, 27);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero-section .cta-button:hover {
  background: #f4c01a;
  transform: scale(1.05);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  font-size: 2rem;
  color: #E0E0E0;
  animation: bounce 2s infinite;
  cursor: pointer;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

/* Steps Section */
.steps-section {
  background: #121212;
  padding: 4rem 1rem;
}

.step {
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 1.5rem;
}

.step-icon {
  flex: 0 0 64px;
  margin: 0 1.5rem;
  font-size: 2rem;
  color: #f4c01a;
}

.step-content {
  flex: 1;
}

.step-content h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #E0E0E0;
}

.step-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.text-link {
  color: #2B8C69;
  text-decoration: underline;
}

.text-link:hover {
  text-decoration: none;
  color: #1A3D34;
}

@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    /* Assicura che la Hero occupi tutto lo schermo anche su mobile */
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1rem;
  }

  .step {
    flex-direction: column;
    text-align: center;
  }

  .step-icon {
    margin-bottom: 1rem;
  }

  .scroll-indicator {
    font-size: 1.5rem;
    /* Adatta la dimensione per mobile */
  }
}
</style>
