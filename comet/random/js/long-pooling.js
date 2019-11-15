'use strict';

function flipIt() {
  const flipIt = document.querySelector('.flip-it');
        if (flipIt) {
            flipIt.classList.remove('flip-it');
        }
 }

window.addEventListener('load', longPooling);
function longPooling() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
       flipIt();
       document.querySelector('.long-pooling').children[parseInt(xhr.responseText)].classList.add('flip-it');
      longPooling();
    })
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
    xhr.send();
}

