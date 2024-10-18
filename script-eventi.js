document.addEventListener('DOMContentLoaded', () => {
  fetch('https://backend.bitcoinbeer.events/api/eventi')
    .then(response => response.json())
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
            // Imposta il colore del bordo e del badge in base alla categoria
            const borderColor = evento.categoria === 'EDU' ? 'green' : 'bordeaux';
            const badgeColor = evento.categoria === 'EDU' ? 'green' : 'bordeaux';
            
            // Crea il box dell'evento
            const eventoDiv = document.createElement('div');
            eventoDiv.classList.add('evento');
            eventoDiv.style.border = `3px solid ${borderColor}`; // Cornice colorata

            eventoDiv.innerHTML = `
              <span class="badge" style="background-color: ${badgeColor};">${evento.categoria}</span>
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
