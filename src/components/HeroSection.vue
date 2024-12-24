<template>
	<section
	  class="relative bg-cover bg-center h-screen flex items-center justify-center parallax-container"
	>
	  <div class="absolute inset-0 bg-black bg-opacity-70 parallax-background"></div>
	  <div class="relative z-10 text-center text-white px-4 responsive-layout">
		<!-- Titolo -->
		<h1 class="text-5xl md:text-7xl font-bold mb-4 glowing-text">
		  {{ $t('hero.title') }}
		</h1>
		<!-- Sottotitolo -->
		<h2 class="text-2xl md:text-4xl font-semibold mb-8 opacity-90">
		  {{ $t('hero.subtitle') }}
		</h2>
		<!-- Pulsanti -->
		<div class="flex flex-col md:flex-row justify-center gap-4">
		  <router-link
			to="/explore"
			class="glass-button"
		  >
			{{ $t('hero.explore') }}
		  </router-link>
		  <router-link
			to="/start"
			class="glass-button"
		  >
			{{ $t('hero.getStarted') }}
		  </router-link>
		</div>
	  </div>


	</section>
  </template>
  
  
  <script>
  import { useI18n } from 'vue-i18n';
  
  export default {
	name: 'HeroSection',
	setup() {
	  const { t } = useI18n();
	  return { t };
	},
  };
  </script>
  
  <style scoped>
  .responsive-layout {
  padding-top: 4rem; /* Spaziatura extra in modalità desktop */
}
/* Spaziatura generale per il contenuto */
.relative.z-10.text-center.text-white.px-4 {
  padding-top: 2rem; /* Default padding */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* Effetto Glass Morphism per i pulsanti */
.glass-button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2); /* Sfondo semi-trasparente */
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px); /* Effetto sfocatura */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(255, 255, 255, 0.2);
}

.glass-button:hover::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 0.6s ease-out forwards;
}

@keyframes ripple {
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

/* Effetto Parallasse */
.parallax-container {
  perspective: 1000px;
  overflow: hidden;
}

.parallax-background {
  position: absolute;
  inset: 0;
  background-image: url("/src/assets/hero.jpg");
  background-size: cover;
  background-position: center;
  animation: backgroundScroll 20s linear infinite;
  transform: translateZ(-1px) scale(2);
  z-index: -1;
}

@keyframes backgroundScroll {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 100% 100%;
  }
}

/* Titolo Glow Effect */
.glowing-text {
  font-size: 5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ffae00, #ff9100);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textParallax 2s ease-in-out infinite alternate;
}

@keyframes textParallax {
  from {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(5px);
  }
}


@keyframes glow {
  0% {
    text-shadow: 0 0 10px #ffae00, 0 0 20px #ff9900, 0 0 30px #ff6600;
  }
  50% {
    text-shadow: 0 0 20px #ffae00, 0 0 40px #ff9900, 0 0 60px #ff6600;
  }
  100% {
    text-shadow: 0 0 10px #ffae00, 0 0 20px #ff9900, 0 0 30px #ff6600;
  }
}

/* Riduci la dimensione del titolo e abbassa il contenuto sui dispositivi mobili */
@media (max-width: 768px) {
  .glowing-text {
    font-size: 2.5rem; /* Riduce la dimensione del titolo */
    line-height: 1.2; /* Migliora la leggibilità */
  }

  .relative.z-10.text-center.text-white.px-4 {
    margin-top: 3rem; /* Aggiunge spazio tra il titolo e la navbar */
    padding: 6rem 1rem 0;
  }

  .glass-button {
    font-size: 0.9rem; /* Riduce la dimensione del testo */
    padding: 8px 16px; /* Riduce il padding interno */
    border-radius: 12px; /* Rende il pulsante più compatto */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(255, 255, 255, 0.1); /* Ombra ridotta */
    min-width: 100px; /* Riduce la larghezza minima */
  }

  /* Allinea i pulsanti fianco a fianco */
  .flex.flex-col.md\:flex-row {
    flex-direction: row; /* Cambia da colonna a riga */
    justify-content: center;
    gap: 1rem; /* Spaziatura tra i pulsanti */
  }

  /* Per ulteriore compattezza */
  .flex.flex-col.md\:flex-row > .glass-button {
    flex: 1; /* Pulsanti della stessa larghezza */
    max-width: 150px; /* Limita la larghezza su mobile */
  }
  .responsive-layout {
    padding-top: 6rem; /* Più spazio su mobile */
  }
}

</style>

  