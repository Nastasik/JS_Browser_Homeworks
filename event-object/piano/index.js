const lower = [
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'
  ];
  
  const middle = [
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3'
  ];
  
  const higher = [
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'
  ];
  
  
  let piano = Array.from(document.getElementsByTagName('ul'))[0];
  const audio = document.getElementsByTagName('audio');
  const li = Array.from(document.getElementsByTagName('li'));
  
  function pressButtons(event, numberButton) {
    let audio = event.currentTarget.getElementsByTagName('audio')[0];
    console.log(audio)
    if (event.altKey) {  
      piano.classList.remove('lower', 'middle');
      piano.classList.add('higher');
      
      audio.src = higher[numberButton];
      audio.play();
    } 
    else if (event.shiftKey) {  
      piano.classList.remove('higher', 'middle');
      piano.classList.add('lower');
      
      audio.src = lower[numberButton];
      audio.play();
    }    
    else {
      piano.classList.remove('higher', 'lower');
      piano.classList.add('middle');
      audio.src = middle[numberButton];
      audio.play();
    } 
  }
  
  function notPress() {
      piano.classList.remove('higher', 'lower');
      piano.classList.add('middle');   
      audio.play();
  }
  
  document.addEventListener('keyup', notPress);
  li.forEach((li, i) => li.addEventListener('click', function() {
        pressButtons(event, i)}
  ));
  