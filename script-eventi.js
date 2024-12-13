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

      if (Array.isArray(data)) {
        if (data.length === 0) {
          eventiContainer.innerHTML = '<p>Nessun evento disponibile al momento.</p>';
        } else {
          data.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.classList.add('evento');
            
            // Formatta la data dell'evento prima di mostrarla
            const dataFormattata = formatDate(evento.data);

            eventoDiv.innerHTML = `
              <h2>${evento.titolo}</h2>
              <p><strong>Descrizione:</strong> ${evento.descrizione}</p>
              <p><strong>📍 Luogo:</strong> ${evento.luogo}</p>
              <p><strong>📅 Data:</strong> ${dataFormattata}</p>
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
