'use strict';
localStorage.setItem('counter', 0);
let count  = Number(localStorage.counter);

const counter = document .getElementById('counter');
counter.textContent = localStorage.counter;

const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

incrementBtn.addEventListener('click', () => {
    counter.textContent = ++count;
    localStorage.setItem('counter', count);
});

decrementBtn.addEventListener('click', () => {
  if (count > 0) {
    counter.textContent = --count;
    localStorage.setItem('counter', count);
  }
});

resetBtn.addEventListener('click', () => {
  counter.textContent = 0;
  localStorage.setItem('counter', 0);
});