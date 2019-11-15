let sounds = document.getElementsByClassName('drum-kit__drum');

function audio() {
  let currentSound = this.querySelector('audio'); 
  currentSound.pause();
  currentSound.currentTime = 0; 
  currentSound.play(); 
}


for (sound of sounds) {
  sound.addEventListener('click', audio);
}