'use strict';

const imgs = [
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png',
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png',
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png',
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png',
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'
];

let counter = 0;
let imgCurrent = document.getElementById('slider');
imgCurrent.src = imgs[0];

setInterval(() => {  
  if (counter < imgs.length) {
    imgCurrent.src = imgs[counter];
  counter++;
  } else {
    counter = 0;
  }
}, 2500)
