'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  document.querySelector('.counter').textContent = message.connections;
  document.querySelector('output.errors').textContent = message.errors;  
});

window.addEventListener('beforeunload', () => {
  connection.onclose = function () {};
  connection.close(1000);
});
