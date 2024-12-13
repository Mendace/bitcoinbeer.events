document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.bitcoinbeer.events/get_events.php')
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

      // Funzione per formattare la data in formato 'YYYY-MM-DD'
      function formatDate(dateString) {
        const d = new Date(dateString);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
      }

      // Verifica che la risposta sia di successo e che contenga un array di eventi
      if (data.success && Array.isArray(data.events)) {
        const events = data.events;

        if (events.length === 0) {
          eventiContainer.innerHTML = '<p>Nessun evento disponibile al momento.</p>';
        } else {
          events.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.classList.add('evento');
            
            // Formatta la data dell'evento prima di mostrarla
            const dataFormattata = formatDate(evento.event_date);
            const orario = new Date(evento.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            eventoDiv.innerHTML = `
              <img src="${evento.locandina}" alt="${evento.title}" class="locandina-evento" />
              <h2>${evento.title}</h2>
              <p><strong>📍 Luogo:</strong> ${evento.venue}</p>
              <p><strong>📅 Data:</strong> ${dataFormattata}</p>
              <p><strong>🕒 Ora:</strong> ${orario}</p>
              ${evento.ticket_purchase_url ? `<p><strong>🔗 Acquista Biglietti:</strong> <a href="${evento.ticket_purchase_url}" target="_blank">Acquista</a></p>` : ''}
              <p><strong>📍 Indirizzo:</strong> ${evento.address}</p>
            `;
            eventiContainer.appendChild(eventoDiv);
          });
        }
      } else {
        console.error('I dati ricevuti non sono validi o non contengono eventi:', data);
        eventiContainer.innerHTML = '<p>Errore nel caricamento degli eventi. Riprova più tardi.</p>';
      }
    })
    .catch(error => {
      console.error('Errore nel caricamento degli eventi:', error);
      const eventiContainer = document.getElementById('eventi-container');
      if (eventiContainer) {
        eventiContainer.innerHTML = '<p>Errore nel caricamento degli eventi. Riprova più tardi.</p>';
      }
    });
});
