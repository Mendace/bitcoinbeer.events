var mymap = L.map('mapid').setView([42.391, 12.261], 5);

// Aggiungi lo stile Mapbox Dark
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVuZGFjZSIsImEiOiJjbGRxYm1yZnIxYTVnM29xZzN6eTl6bW04In0.I7CE7Iu7PQHsis_4dvqucw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',
    accessToken: 'TUO_ACCESS_TOKEN' // Sostituisci con la tua API key
}).addTo(mymap);

// Crea un array di informazioni per i pop-up
var popupData = [
    { name: 'PRATO', address: 'Est. block 774582 ⚡', buttons: ['https://t.me/mendace', 'https://t.me/bitcoinpratohub', 'https://bitcoinbeer.events/prato.html'] },
    { name: 'BERGAMO', address: 'Est. block 775810 ⚡', buttons: ['https://t.me/Overnight_gio', 'https://t.me/BitcoinBergamo/', 'https://bitcoinbeer.events/bergamo.html'] },
    { name: 'BIELLA', address: 'Est. block 787319 ⚡', buttons: ['https://t.me/borgodoro', 'https://t.me/BitcoinBiella/', 'https://bitcoinbeer.events/biella.html'] },
    { name: 'BRESCIA', address: 'Est. block 776060 ⚡', buttons: ['https://t.me/fts789', 'https://t.me/BitcoinBresciahub/', 'https://bitcoinbeer.events/brescia.html'] },
    { name: 'BOLOGNA', address: 'Est. block 821335 ⚡', buttons: ['https://t.me/hostfat', 'https://t.me/Bitcoinbeerbologna/', 'https://bitcoinbeer.events/bologna.html'] },
    { name: 'BOSA', address: 'Est. block 777290 ⚡', buttons: ['https://t.me/carlfitz', 'https://t.me/bitcoinbosa', 'https://bitcoinbeer.events/bosa.html'] },
    { name: 'FAENZA', address: 'Est. block 816818 ⚡', buttons: ['https://t.me/Irebus', 'https://t.me/BitcoinBeerfaenza/', 'https://bitcoinbeer.events/faenza.html'] },
    { name: 'FORLI CESENA', address: 'Est. block 775128 ⚡', buttons: ['https://t.me/valgetto', 'https://t.me/bitcoinforlicesena', 'https://bitcoinbeer.events/forli.html'] },
    { name: 'GENOVA', address: 'Est. block 775652 ⚡', buttons: ['https://t.me/Frankj42', 'https://t.me/Bitcoingenova/', 'https://bitcoinbeer.events/genova.html'] },
    { name: 'ISTRIA', address: 'Est. block 774993 ⚡', buttons: ['https://t.me/anarchy4wd', 'https://t.me/Bitcoinistria', 'https://bitcoinbeer.events/istria.html'] },
    { name: 'MALTA', address: 'Est. block 799628 ⚡', buttons: ['https://t.me/anonrunner', 'https://t.me/Bitcoinmaltahub', 'https://bitcoinbeer.events/malta.html'] },
    { name: 'MONFALCONE', address: 'Est. block 806500 ⚡', buttons: ['https://t.me/loziodm', 'https://t.me/Bitcoinmonfalconegruppo', 'https://bitcoinbeer.events/monfalcone.html'] },

    // Aggiungi altre informazioni per i pop-up qui
];

// Crea un array di posizioni dei marker
var markerPositions = [
    { lat: 43.8902, lon: 11.0875 },
    { lat: 45.69468, lon: 9.67004 },
    { lat: 45.56642, lon: 8.05482 }, 
    { lat: 45.53983, lon: 10.22002 }, 
    { lat: 44.49386, lon: 11.34275 }, 
    { lat: 40.29713, lon: 8.50052 }, 
    { lat: 44.28571, lon: 11.88244 }, 
    { lat: 44.17718, lon: 12.14822 }, 
    { lat: 44.40725, lon: 8.93361  }, 
    { lat: 45.40893, lon: 13.66082 }, 
    { lat: 35.89904, lon: 14.51325 },  
    { lat: 45.80489, lon: 13.53306 }, 
    // Aggiungi altre posizioni dei marker qui
];

// Personalizza l'icona del marker
var customIcon = L.icon({
    iconUrl: 'assets/marker.png', // Sostituisci con il percorso dell'icona
    iconSize: [30, 30], // Dimensioni dell'icona
    iconAnchor: [15, 15], // Punto di ancoraggio dell'icona (centro)
    popupAnchor: [0, -15] // Posizione del popup rispetto all'icona
});

// Itera sull'array delle posizioni dei marker e aggiungi i marker alla mappa
for (var i = 0; i < markerPositions.length; i++) {
    var position = markerPositions[i];
    var marker = L.marker([position.lat, position.lon], { icon: customIcon }).addTo(mymap);

    // Recupera le informazioni per il pop-up corrente
    var popupInfo = popupData[i];

    // Definisci il contenuto HTML del pop-up
    var customPopupContent = `
        <div class="popup-content-container">
            <h2>${popupInfo.name}</h2>
            <p>${popupInfo.address}</p>
            <div class="popup-button-container">
                <button class="popup-button" onclick="window.location.href='${popupInfo.buttons[0]}'"><i class="fa-solid fa-user"></i></button>
                <button class="popup-button" onclick="window.location.href='${popupInfo.buttons[1]}'"><i class="fa-brands fa-telegram"></i></button>
                <button class="popup-button" onclick="window.location.href='${popupInfo.buttons[2]}'"><i class="fa-solid fa-city"></i></button>
            </div>
        </div>
    `;

    // Aggiungi un pop-up personalizzato al marker
    marker.bindPopup(customPopupContent, {
        className: 'custom-popup' // Questa classe è utilizzata per la personalizzazione CSS
    });
}





