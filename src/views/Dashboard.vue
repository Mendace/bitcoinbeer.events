<template>
    <div class="dashboard-page">
    <!-- Hero Section -->
    <section class="hero relative bg-black text-white flex items-center h-screen overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      <div class="relative z-10 flex flex-col md:flex-row items-center w-full max-w-screen-xl mx-auto px-8">
        <!-- Testo -->
        <div class="text-content md:w-1/2 text-left text">
          <h1 class="text-5xl font-bold leading-tight mb-6">
            {{ $t('dashboardpage.heroTitle') }}
          </h1>
          <p class="text-lg mb-8 opacity-80">
            {{ $t('dashboardpage.heroSubtitle') }}
          </p>
          <a
            href="https://t.me/+m7F8BCFwODc5ODhk"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-orange-500 text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-400 transition-transform transform hover:scale-105"
          >
            {{ $t('dashboardpage.tryNowButton') }}
          </a>
        </div>

        <!-- Immagine -->
        <div class="image-content md:w-1/2 relative">
          <img
            src="/src/assets/img/dashboard.png"
            alt="{{ $t('dashboardpage.heroImageAlt') }}"
            class="dashboard-image"
          />
        </div>
      </div>
    </section>

     <!-- Video Section -->
     <section class="video-section py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div class="container mx-auto px-8 text-center">
        <div class="video-wrapper max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <!-- Video -->
          <video
            autoplay
            loop
            muted
            playsinline
            class="w-full h-auto rounded-lg shadow-lg"
            poster="/src/assets/img/tablet.png"
          >
            <source src="/src/assets/img/video/dashboard.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div class="container mx-auto px-8">
        <h2 class="text-4xl font-semibold text-center mb-12">
          {{ $t('dashboardpage.featuresTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature Cards -->
          <div class="feature-card bg-gray-800 p-6 rounded shadow-lg text-center">
            <h3 class="text-2xl font-bold mb-4">
              {{ $t('dashboardpage.feature1Title') }}
            </h3>
            <p class="text-sm opacity-75">
              {{ $t('dashboardpage.feature1Desc') }}
            </p>
          </div>
          <div class="feature-card bg-gray-800 p-6 rounded shadow-lg text-center">
            <h3 class="text-2xl font-bold mb-4">
              {{ $t('dashboardpage.feature2Title') }}
            </h3>
            <p class="text-sm opacity-75">
              {{ $t('dashboardpage.feature2Desc') }}
            </p>
          </div>
          <div class="feature-card bg-gray-800 p-6 rounded shadow-lg text-center">
            <h3 class="text-2xl font-bold mb-4">
              {{ $t('dashboardpage.feature3Title') }}
            </h3>
            <p class="text-sm opacity-75">
              {{ $t('dashboardpage.feature3Desc') }}
            </p>
          </div>
          <div class="feature-card bg-gray-800 p-6 rounded shadow-lg text-center">
            <h3 class="text-2xl font-bold mb-4">
              {{ $t('dashboardpage.feature4Title') }}
            </h3>
            <p class="text-sm opacity-75">
              {{ $t('dashboardpage.feature4Desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: "DashboardPage",
};
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
}

.text {
  margin-top: 8rem;
}
.text-content {
  z-index: 10;
  text-align: left;
}

.dashboard-image {
  width: 200%;
  height: 100%;
  object-fit: cover;
  position: relative;
  right: -20%;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
}

.dashboard-image:hover {
  transform: scale(1.05);
}

/* Per il Mobile */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }

  .text-content {
    text-align: center;
    margin-bottom: 2rem;
  }

  .dashboard-image {
    width: 100%;
    right: 0;
    box-shadow: none;
  }
}
</style>
