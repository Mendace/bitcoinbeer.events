// script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/eventi')
        .then(response => response.json())
        .then(data => {
            const eventiContainer = document.getElementById('eventi-container');
            data.eventi.forEach(evento => {
                const eventoDiv = document.createElement('div');
                eventoDiv.classList.add('evento');
                eventoDiv.innerHTML = `
                    <h2>${evento.titolo}</h2>
                    <p>${evento.descrizione}</p>
                    <p><strong>Data:</strong> ${evento.data}</p>
                `;
                eventiContainer.appendChild(eventoDiv);
            });
        })
        .catch(error => console.error('Errore nel caricamento degli eventi:', error));
});
