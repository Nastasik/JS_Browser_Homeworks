'use strict';
const webSocket = new WebSocket('wss://neto-api.herokuapp.com/chat');
webSocket.addEventListener('open', open);
webSocket.addEventListener('message', message);

const content = document.querySelector('.messages-content');
const submit = document.querySelector('.message-submit');
const status = document.getElementsByClassName('message message-status')[0];
const input =document.querySelector('input[type="text"]');
const personal = document.querySelector('.message-personal');


function open() {
  if(webSocket) {
    submit.removeAttribute('disabled'); 
    document.querySelector('.chat-status').textContent = document.querySelector('.chat-status').getAttribute('data-online'); 
    status.cloneNode(true);
    status.textContent = 'Пользователь появился в сети';
    content.appendChild(status);
    document.getElementsByClassName('timestamp')[1].textContent = `${new Date().getHours()}:${new Date().getMinutes()}`;
  }
};

function message(event) {
  remove(event);
  const span = document.querySelector('.message span');
  const spanClone = span.cloneNode(true);
  document.getElementsByClassName('timestamp')[0].textContent = `${new Date().getHours()}:${new Date().getMinutes()}`;
  
 
  if(event.data === "...") {
    span.textContent = 'Пользователь печатает сообщение.';
    content.appendChild(document.querySelector('.loading').cloneNode(true))
  } else {
      span.textContent = "";
      const clone = document.getElementsByClassName('message')[1].cloneNode(true);
      content.appendChild(clone);
      spanClone.textContent = event.data;
      clone.appendChild(spanClone); 
  }
};

submit.addEventListener('click', send);

function send(event) {
  remove(event);
  event.preventDefault();
  webSocket.send(input.value);
  personal.querySelector('span').textContent = input.value;
  content.appendChild(personal.cloneNode(true));
  input.value = "";
};

function remove(event) {
    if(content.children.length > 6) {
     content.querySelector('.message').remove(); 
    }
};