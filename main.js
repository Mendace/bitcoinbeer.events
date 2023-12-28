
      document.addEventListener('DOMContentLoaded', function() {
    var blockInfoDiv = document.getElementById('block-info');
    var ultimoHash = '';
    
    function aggiungiDatiTicker(hash) {
        if (hash !== ultimoHash) {
            ultimoHash = hash;
            fetch(`https://blockstream.info/api/block/${hash}`)
                .then(response => response.json())
                .then(blockData => {
                    var blockElement = document.createElement('span');
                    blockElement.textContent = 'Last Block - Hash: ' + blockData.id + ' | Altezza: ' + blockData.height + ' | Dimensione: ' + blockData.size + ' bytes | Orario: ' + new Date(blockData.timestamp * 1000).toLocaleString() + ' | ';
                    blockInfoDiv.innerHTML = ''; // Pulisce i vecchi dati
                    blockInfoDiv.appendChild(blockElement); // Aggiunge i nuovi dati
                })
                .catch(error => console.error('Errore nel recuperare i dati del blocco:', error));
        }
    }

    function verificaNuovoBlocco() {
        fetch('https://blockstream.info/api/blocks/tip/hash')
            .then(response => response.text())
            .then(hash => {
                aggiungiDatiTicker(hash);
            })
            .catch(error => console.error('Errore nel recuperare l\'hash del blocco:', error));
    }

    verificaNuovoBlocco();
    setInterval(verificaNuovoBlocco, 60000); // Aggiorna ogni 60 secondi
});


  

 
      $( document ).ready(function() {

        /* Open Panel */
        $( ".hamburger" ).on('click', function() {
          $(".menu").toggleClass("menu--open") && $(".hamburger").toggleClass("menu--open") ;
        });

        /* closePanel */
        $( ".menu__link" ).on('click', function() {
          $(".menu").toggleClass("menu--open") && $(".hamburger").toggleClass("menu--open") ;
        });

      });

      ScrollReveal().reveal('.reveal', { distance: '80px', duration: 600, easing: 'cubic-bezier(.215, .61, .355, 1)', interval: 500 });
      ScrollReveal().reveal('.zoom', { duration: 1500, easing: 'cubic-bezier(.215, .61, .355, 1)', interval: 200, scale: 0.65, mobile:false });


    document.addEventListener('DOMContentLoaded', function() {
    var banner = document.getElementById('tuo-banner');
    var bannerChiuso = false; // Indica se il banner è stato chiuso
    var elementoTarget = document.getElementById('cosa'); // Sostituisci con il tuo ID specifico

    // Funzione per mostrare il banner
    function mostraBanner() {
        var posizioneTarget = elementoTarget.getBoundingClientRect().top;
        var altezzaFinestra = window.innerHeight;

        if (posizioneTarget <= altezzaFinestra && !bannerChiuso) {
            banner.style.display = 'block'; // Mostra il banner
        }
    }

    // Gestore eventi per il pulsante di chiusura del banner
    document.getElementById('chiudi-banner').addEventListener('click', function() {
        banner.style.display = 'none'; // Nasconde il banner
        bannerChiuso = true; // Imposta il banner come chiuso
    });

    // Gestore eventi per lo scroll della pagina
    window.addEventListener('scroll', mostraBanner);

    // Inizializza la visualizzazione del banner
    mostraBanner();
});

 

      document.addEventListener('DOMContentLoaded', function() {
    var themeSwitch = document.getElementById('theme-switch');
    var body = document.body;

    // Carica il tema salvato
    var savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.classList.add(savedTheme);

    themeSwitch.addEventListener('click', function() {
        var newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        body.classList.replace(body.classList.item(0), newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

 



      function chiudiBanner() {
          document.querySelector('.banner-annuncio-head').style.display = 'none';
      }

  

  const target = document.getElementById('type-effect');
  const phrases = ['avvicinarsi a Bitcoin', 'orangepillare', 'condividere conoscenze', 'innovare insieme'];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = [];
  let isDeleting = false;
  let isEnd = false;

  function type() {
    isEnd = false;
    target.innerHTML = currentPhrase.join('');

    if (phraseIndex < phrases.length) {

      if (!isDeleting && letterIndex <= phrases[phraseIndex].length) {
        currentPhrase.push(phrases[phraseIndex][letterIndex]);
        letterIndex++;
        target.innerHTML = currentPhrase.join('');
      }

      if(isDeleting && letterIndex <= phrases[phraseIndex].length) {
        currentPhrase.pop(phrases[phraseIndex][letterIndex]);
        letterIndex--;
        target.innerHTML = currentPhrase.join('');
      }

      if (letterIndex == phrases[phraseIndex].length) {
        isEnd = true;
        isDeleting = true;
      }

      if (isDeleting && letterIndex === 0) {
        currentPhrase = [];
        isDeleting = false;
        phraseIndex++;
        if (phraseIndex == phrases.length) {
          phraseIndex = 0;
        }
      }
    }
    const spedUp = Math.random() * (80 - 50) + 50;
    const normalSpeed = Math.random() * (300 - 200) + 200;
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
    setTimeout(type, time);
  }

  // Inizia il ciclo di digitazione
  type();



    document.addEventListener('DOMContentLoaded', function () {
  const flkty = new Flickity('.main-carousel', {
    // Opzioni Flickity...
  });

  function updateCellStyles() {
    document.querySelectorAll('.carousel-cell').forEach(cell => {
      cell.classList.remove('focus-gradient', 'left-gradient', 'right-gradient', 'zoom');
      const cellIndex = flkty.cells.indexOf(flkty.getCell(cell));

      if (cellIndex === flkty.selectedIndex) {
        // Cella in focus
        cell.classList.add('focus-gradient', 'zoom');
      } else if (cellIndex < flkty.selectedIndex) {
        // Celle a sinistra della cella in focus
        cell.classList.add('left-gradient');
      } else {
        // Celle a destra della cella in focus
        cell.classList.add('right-gradient');
      }
    });
  }

  // Inizializza gli stili delle celle al caricamento
  updateCellStyles();

  // Aggiorna gli stili delle celle quando il carosello cambia
  flkty.on('change', function () {
    updateCellStyles();
  });

  // Gestione dei pulsanti Prev e Next
  document.querySelector('.carousel-prev').addEventListener('click', function () {
    flkty.previous();
  });

  document.querySelector('.carousel-next').addEventListener('click', function () {
    flkty.next();
  });
});



// Ottieni il contenitore e la modale
var container = document.getElementById("floating-container");
var modal = document.getElementById("subscription-modal");

// Ottieni l'elemento <span> che chiude il modale
var span = document.getElementsByClassName("close-button")[0];

// Gestisci il click sul pulsante per mostrare/chiudere la modale
container.onclick = function() {
    // Se il contenitore è chiuso, aprilo e mostra il modale
    if (container.classList.contains('closed')) {
        container.classList.remove('closed');
        container.classList.add('open');
        modal.style.display = 'block';
    } else {
        // Se clicchi sul contenitore quando è aperto, chiudi il modale
        container.classList.add('closed');
        container.classList.remove('open');
        modal.style.display = 'none';
    }
};

// Impedisci la propagazione dell'evento click dal modale al contenitore
modal.onclick = function(event) {
    event.stopPropagation();
}

// Chiudi la modale se l'utente clicca sul pulsante di chiusura
span.onclick = function(event) {
    event.stopPropagation(); // Impedisce la propagazione al contenitore
    container.classList.add('closed');
    container.classList.remove('open');
    modal.style.display = 'none';
};
