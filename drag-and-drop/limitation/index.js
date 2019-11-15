'use strict'
let block = document.querySelector('.block');
let message = document.querySelector('.message');
let textarea = document.querySelector('.textarea');
document.addEventListener('keydown', lookDown);

function lookDown(event) {
  if(!event.target.classList.contains('textarea')) return;
  if(message.classList.contains('view')) {
      message.classList.remove('view')  
  }  
  block.classList.add('active');
  document.addEventListener('keyup', lookUp)
};

// function lookUp(event) {  
//   setTimeout(function() {
//     if(block.classList.contains('active')){
//         block.classList.remove('active');
//         message.classList.add('view');
//   }
//   }, 2000)}

 function debounce(callback, delay) {
   let timeout;
   return () => {
     clearTimeout(timeout);
     timeout = setTimeout(function() {
           timeout = null;
           callback();
     }, delay)
   }
 }

document.addEventListener('keyup', debounce(() => {
  if(block.classList.contains('active')) {
        block.classList.remove('active');
        message.classList.add('view');
  }
}, 2000));
