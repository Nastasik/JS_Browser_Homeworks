'use strict';
const pooling = new XMLHttpRequest();
window.addEventListener('load',() => {
    setInterval( () => {
        pooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
        pooling.send();
    }, 5000)
})
                        
pooling.addEventListener('load', () => {
  flipIt();
  document.querySelector('.pooling').children[parseInt(pooling.responseText)].classList.add('flip-it');
});

function flipIt() {
  const flipIt = document.querySelector('.flip-it');
        if (flipIt) {
            flipIt.classList.remove('flip-it');
        }
 }