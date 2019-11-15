

addEventListener("keydown", function(event) {
    (event.ctrlKey && event.altKey && event.keyCode === 84) ? document.getElementsByTagName('nav')[0].classList.toggle('visible') : secret(event.keyCode);
 });
 
 const secretWord = [
   89,
   84,
   78,
   74,
   75,
   74,
   85,
   66,
   90
 ];
 
 let trueInput = [];
 
 function secret(number) {
   
   if (test(number)) {    
     trueInput.push(1);    
     if (trueInput[8] === 1) {
       document.getElementsByClassName('secret')[0].classList.toggle('visible');
       trueInput.splice(0, trueInput.length);
     }    
   } 
   else {    
     trueInput.splice(0, trueInput.length);
   }
 }
 
 function test(number) {
   let id = 0;
   
   if (trueInput.length > 0) {
     id = trueInput.length;
   }
   
  return (number === secretWord[id]) ? true : false;
 }

 // const tagNav = document.querySelector('nav');
 // const classSecret = document.querySelector('.secret');
 // const password = 'YTNJKJUBZ';
 // let inputString = '';
 
 // function secretItems(event) {
 //   if(event.altKey && event.ctrlKey && event.keyCode === 84){
 //     tagNav.classList.toggle('visible')
 //   } else {
 //     inputString+=String.fromCharCode(event.keyCode);
 //     if (inputString === password) {
 //       classSecret.classList.add('visible');
 //     } 
 //   }
 // }
 
 // document.addEventListener('keydown', secretItems);
 