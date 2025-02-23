<template>
    <div>
      <button @click="initTgLogin" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Login con Telegram
      </button>
    </div>
  </template>
  
  <script setup>
  const initTgLogin = () => {
    // Carica dinamicamente lo script di Telegram
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute('data-telegram-login', 'mysite_comments_bot'); // Cambia con il tuo bot
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    // callback JS
    script.setAttribute('data-onauth', 'handleTelegramAuth(user)');
    document.body.appendChild(script);
  };
  
  // Funzione globale
  window.handleTelegramAuth = (user) => {
    console.log("Dati Telegram:", user);
    fetch('https://api.bitcoinbeer.events/api/telegram_auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('tg_token', data.token);
        alert("Login Telegram effettuato con successo: " + data.username);
      } else {
        alert("Errore nel login: " + data.error);
      }
    })
    .catch(e => console.error(e));
  };
  </script>
  