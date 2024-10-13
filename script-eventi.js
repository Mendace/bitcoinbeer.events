// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://backend.bitcoinbeer.events/api/eventi')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const eventiContainer = document.getElementById('eventi-container');
  
        if (!eventiContainer) {
          console.error('Elemento con ID "eventi-container" non trovato nel DOM.');
          return;
        }
  
        if (Array.isArray(data)) {
          if (data.length === 0) {
            eventiContainer.innerHTML = '<p>Nessun evento disponibile al momento.</p>';
          } else {
            data.forEach(evento => {
              const eventoDiv = document.createElement('div');
              eventoDiv.classList.add('evento');
  
              eventoDiv.innerHTML = `
                <h2>${evento.titolo}</h2>
                <p><strong>Descrizione:</strong> ${evento.descrizione}</p>
                <p><strong>📍 Luogo:</strong> ${evento.luogo}</p>
                <p><strong>📅 Data:</strong> ${evento.data}</p>
                <p><strong>🕒 Ora:</strong> ${evento.ora}</p>
                ${evento.link ? `<p><strong>🔗 Link:</strong> <a href="${evento.link}" target="_blank">${evento.link}</a></p>` : ''}
              `;
              eventiContainer.appendChild(eventoDiv);
            });
          }
        } else {
          console.error('I dati ricevuti non sono un array di eventi:', data);
        }
      })
      .catch(error => {
        console.error('Errore nel caricamento degli eventi:', error);
      });
  });
  