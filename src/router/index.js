import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Contact from '../views/Contact.vue';
import Explore from '../views/Explore.vue'; 
import EventDetail from '../components/EventDetail.vue';
import Chapters from '../views/Start.vue';
import Edu from '../views/Edu.vue';
import Pub from '../views/Pub.vue';
import Logos from '../views/Logos.vue';
import Typography from '../views/Typography.vue';
import Colors from '../views/Colors.vue';
import Brands from '../views/Brands.vue';
import Partners from '../views/Partners.vue';
import About from '../views/About.vue';
import Faq from '../views/Faq.vue';
import ComingSoon from '../views/ComingSoon.vue';
import Articles from '../views/Articles.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Bitcoin Beer - Home',
      description: 'Benvenuti in Bitcoin Beer, il punto di riferimento per i meetup Bitcoin in Italia.',
      ogTitle: 'Bitcoin Beer - Home',
      ogDescription: 'Benvenuti in Bitcoin Beer, il punto di riferimento per i meetup Bitcoin in Italia.',
      ogImage: '/src/assets/img/og-home.png',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Bitcoin Beer - Dashboard',
      description: 'Gestisci e monitora le tue attività con la Dashboard di Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Dashboard',
      ogDescription: 'Gestisci e monitora le tue attività con la Dashboard di Bitcoin Beer.',
      ogImage: '/src/assets/img/og-dashboard.png',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Bitcoin Beer - Contatti',
      description: 'Contattaci per qualsiasi domanda o collaborazione con Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Contatti',
      ogDescription: 'Contattaci per qualsiasi domanda o collaborazione con Bitcoin Beer.',
      ogImage: '/src/assets/img/og-contact.png',
    },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    meta: {
      title: 'Bitcoin Beer - Esplora',
      description: 'Scopri i capitoli di Bitcoin Beer in tutta Italia.',
      ogTitle: 'Bitcoin Beer - Esplora',
      ogDescription: 'Scopri i capitoli di Bitcoin Beer in tutta Italia.',
      ogImage: '/src/assets/img/og-explore.png',
    },
  },
  {
    path: '/brands',
    name: 'Brands',
    component: Brands,
    meta: {
      title: 'Bitcoin Beer - Brands',
      description: 'Loghi e risorse ufficiali di Bitcoin Beer per il branding.',
      ogTitle: 'Bitcoin Beer - Brands',
      ogDescription: 'Loghi e risorse ufficiali di Bitcoin Beer per il branding.',
      ogImage: '/src/assets/img/og-brands.png',
    },
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
    props: true,
    meta: {
      title: 'Bitcoin Beer - Evento',
      description: 'Dettagli sull’evento Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Evento',
      ogDescription: 'Dettagli sull’evento Bitcoin Beer.',
      ogImage: '/src/assets/img/og-event.png',
    },
  },
  {
    path: '/start',
    name: 'Start',
    component: Chapters,
    meta: {
      title: 'Bitcoin Beer - Inizia',
      description: 'Inizia il tuo viaggio con Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Inizia',
      ogDescription: 'Inizia il tuo viaggio con Bitcoin Beer.',
      ogImage: '/src/assets/img/og-start.png',
    },
  },
  {
    path: '/edu',
    name: 'Edu',
    component: Edu,
    meta: {
      title: 'Bitcoin Beer - Educazione',
      description: 'Scopri il lato educativo di Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Educazione',
      ogDescription: 'Scopri il lato educativo di Bitcoin Beer.',
      ogImage: '/src/assets/img/og-edu.png',
    },
  },
  {
    path: '/pub',
    name: 'Pub',
    component: Pub,
    meta: {
      title: 'Bitcoin Beer - Meetup Pub',
      description: 'Eventi sociali di Bitcoin Beer nei pub locali.',
      ogTitle: 'Bitcoin Beer - Meetup Pub',
      ogDescription: 'Eventi sociali di Bitcoin Beer nei pub locali.',
      ogImage: '/src/assets/img/og-pub.png',
    },
  },
  {
    path: '/logos',
    name: 'Logos',
    component: Logos,
    meta: {
      title: 'Bitcoin Beer - Loghi',
      description: 'Scarica i loghi ufficiali di Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Loghi',
      ogDescription: 'Scarica i loghi ufficiali di Bitcoin Beer.',
      ogImage: '/src/assets/img/og-logos.png',
    },
  },
  {
    path: '/typography',
    name: 'Typography',
    component: Typography,
    meta: {
      title: 'Bitcoin Beer - Tipografia',
      description: 'Esplora la tipografia ufficiale di Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Tipografia',
      ogDescription: 'Esplora la tipografia ufficiale di Bitcoin Beer.',
      ogImage: '/src/assets/img/og-typography.png',
    },
  },
  {
    path: '/colors',
    name: 'Colors',
    component: Colors,
    meta: {
      title: 'Bitcoin Beer - Colori',
      description: 'Scopri la palette colori ufficiale di Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Colori',
      ogDescription: 'Scopri la palette colori ufficiale di Bitcoin Beer.',
      ogImage: '/src/assets/img/og-colors.png',
    },
  },
  {
    path: '/partners',
    name: 'Partners',
    component: Partners,
    meta: {
      title: 'Bitcoin Beer - Partners',
      description: 'I partner ufficiali che supportano Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - Partners',
      ogDescription: 'I partner ufficiali che supportano Bitcoin Beer.',
      ogImage: '/src/assets/img/og-partners.png',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'Bitcoin Beer - About',
      description: 'Scopri di più sull’organizzazione Bitcoin Beer e la sua missione.',
      ogTitle: 'Bitcoin Beer - About',
      ogDescription: 'Scopri di più sull’organizzazione Bitcoin Beer e la sua missione.',
      ogImage: '/src/assets/img/og-about.png',
    },
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq,
    meta: {
      title: 'Bitcoin Beer - FAQ',
      description: 'Risposte alle domande più frequenti su Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - FAQ',
      ogDescription: 'Risposte alle domande più frequenti su Bitcoin Beer.',
      ogImage: '/src/assets/img/og-faq.png',
    },
  },
  {
    path: '/comingsoon',
    name: 'ComingSoon',
    component: ComingSoon,
    meta: {
      title: 'Bitcoin Beer - In Arrivo',
      description: 'Funzionalità e aggiornamenti in arrivo su Bitcoin Beer.',
      ogTitle: 'Bitcoin Beer - In Arrivo',
      ogDescription: 'Funzionalità e aggiornamenti in arrivo su Bitcoin Beer.',
      ogImage: '/src/assets/img/og-comingsoon.png',
    },
  },
	{
		path: '/article/:id', // Route dinamica per gli articoli
		name: 'Articles',
		component: Articles,
		props: true // Passa l'ID come prop
	},
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Pagina Non Trovata',
      description: 'Siamo spiacenti, la pagina che stai cercando non esiste.',
      ogTitle: 'Pagina Non Trovata',
      ogDescription: 'Siamo spiacenti, la pagina che stai cercando non esiste.',
      ogImage: '/src/assets/img/og-notfound.png',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const { title, description, ogTitle, ogDescription, ogImage } = to.meta || {};

  // Set page title
  if (title) {
    document.title = title;
  }

  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
  metaDescription.name = 'description';
  metaDescription.content = description || '';
  document.head.appendChild(metaDescription);

  // Set Open Graph meta tags
  const setOgMeta = (property, content) => {
    const metaTag = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
    metaTag.setAttribute('property', property);
    metaTag.setAttribute('content', content || '');
    document.head.appendChild(metaTag);
  };

  setOgMeta('og:title', ogTitle || title);
  setOgMeta('og:description', ogDescription || description);
  setOgMeta('og:image', ogImage || '/src/assets/img/og-default.png');
  setOgMeta('og:type', 'website');
  setOgMeta('og:url', window.location.href);

  next();
});

export default router;