'use stict';
const starfield = document.getElementById('starfield');
starfield.setAttribute('width', '800');
starfield.setAttribute('height', '400');

const ctx = starfield.getContext('2d');
ctx.fillRect(0, 0, starfield.width, starfield.height); 

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function resetCanvas() {  
  ctx.clearRect(0, 0, starfield.width, starfield.height);   
}

starfield.addEventListener('click', resetCanvas);
                                    
starfield.addEventListener('click', (event) => {
   ctx.beginPath();
   const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
   let range = random(200, 400); // кол-во звезд
  
   for(let i = 0; i <= range; i++) {
      const points = [i.layerX= random(0, 800), i.layerY = random(0, 400)];
      ctx.globalAlpha = random(0.8, 1); 
      ctx.rect(...points, 1, 1);
      ctx.fillStyle = colors[random(0, 3)];
      ctx.fill();
   }    
});
