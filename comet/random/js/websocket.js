'use strict';
function flipIt() {
    const flipIt = document.querySelector('.flip-it');
          if (flipIt) {
              flipIt.classList.remove('flip-it');
          }
   }
  
  
  const websocket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
  websocket.addEventListener('message', event => {
     flipIt(document.querySelector('.websocket'));
      document.querySelector('.websocket').children[parseInt(event.data)].classList.add('flip-it');
  })