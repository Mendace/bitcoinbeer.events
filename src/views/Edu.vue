<template>
    <transition name="fade">
    <router-view />
   </transition>
  <section class="edu-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">{{ $t('edu.title') }}</h1>
        <p class="hero-description">{{ $t('edu.description') }}</p>
      </div>
      <img src="/src/assets/img/gufo.png" alt="EDU Owl" class="hero-image" />
    </div>

    <!-- Info Section -->
    <div class="info-section">
      <div class="info-block">
        <h2>{{ $t('edu.section1Title') }}</h2>
        <p>{{ $t('edu.section1Description') }}</p>
      </div>
      <div class="info-block">
        <h2>{{ $t('edu.section2Title') }}</h2>
        <p>{{ $t('edu.section2Description') }}</p>
      </div>
    </div>

    <!-- Gallery Section -->
    <div class="gallery-section">
      <h2>{{ $t('edu.galleryTitle') }}</h2>
      <div class="gallery">
        <img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt" class="gallery-image" />
      </div>
    </div>

    <!-- Event Details -->
    <event-details category="edu" />
  </section>
</template>

<script>
import EventDetails from '/src/components/EventDetail.vue';

export default {
  name: 'EduPage',
  components: {
    EventDetails,
  },
  data() {
    return {
      images: [
        { src: '/src/assets/img/edu/DSC01623.JPG', alt: 'EDU Image 1' },
        { src: '/src/assets/img/edu/DSC01642.JPG', alt: 'EDU Image 2' },
        { src: '/src/assets/img/edu/DSC01684.JPG', alt: 'EDU Image 3' },
      ],
    };
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


/* EDU PAGE */
.edu-page {
  font-family: 'Arial', sans-serif;
  color: #f5f5f5;
  background: linear-gradient(to bottom, #1a3d34, #0c1e17);
  overflow-x: hidden;
}

/* HERO SECTION */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  overflow: hidden;
}

.hero-content {
  z-index: 2;
  max-width: 600px;
  text-align: left;
  animation: fadeInUp 1.2s ease-in-out;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #2b8c69;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.5rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.cta-button {
  display: inline-block;
  padding: 12px 24px;
  background: #f5f5f5;
  color: #2b8c69;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* HERO IMAGE */
.hero-image {
  position: absolute;
  bottom: -10px;
  right: 5%;
  max-width: 450px;
  height: auto;
  object-fit: contain;
  animation: zoomIn 1.5s ease-in-out;
}

/* INFO SECTION */
.info-section {
  background: #0c1e17;
  padding: 60px 5%;
  text-align: center;
}

.info-block h2 {
  font-size: 2.5rem;
  color: #2b8c69;
  margin-bottom: 1rem;
}

.info-block p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

/* GALLERY SECTION */
.gallery-section {
  padding: 60px 5%;
  background: #1a3d34;
  text-align: center;
}

.gallery-section h2 {
  font-size: 2.5rem;
  color: #f5f5f5;
  margin-bottom: 2rem;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.gallery-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

/* ANIMATIONS */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* RESPONSIVITY */
@media (max-width: 768px) {
  .hero-section {
    margin-top: 5em;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.2rem;
  }

  .hero-image {
    max-width: 300px;
  }

  .gallery-image {
    width: 100%;
    height: auto;
  }
}
</style>
