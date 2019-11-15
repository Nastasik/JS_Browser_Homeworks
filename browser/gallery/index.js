'use strict';
const imgs = [
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg',
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'
];

let counter = 0;
let imgCurrent = document.getElementById('currentPhoto');
imgCurrent.src = imgs[counter];

const prev = document.getElementById('prevPhoto');
const next = document.getElementById('nextPhoto');

function changeImgs() {  
  if (this.id === 'nextPhoto') {
    (counter === imgs.length - 1) ? counter = 0 : counter++; 
  }  
  
  if (this.id === 'prevPhoto') {
    (counter === 0 ) ? counter = imgs.length -1 : counter--; 
  }    
  imgCurrent.src = imgs[counter];
}

for (const buttons of [prev, next]) {
  buttons.onclick = changeImgs;
}