'use strict';
const canvas = document.getElementById('draw'),
      ctx = canvas.getContext('2d');
let shift = false;

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

let currentAction = '';
let curves = []; 

let lineColor = 1;
let lineWidth = 100; 
let widthDirection = false; 
let needsRepaint = false;

canvas.addEventListener('dblClick', event => { ctx.clearRect(0, 0, canvas.width, canvas.height); });

window.addEventListener('resize', event => {
  canvas.width = window.innerWidth - 10;
  canvas.height = window.innerHeight - 10;
})

canvas.addEventListener("mouseleave", (event) => {
  curves = [];
  currentAction = '';
});

canvas.addEventListener('mousedown', event => {
  currentAction = 'down';
  curves.push(makeCurve(event.offsetX, event.offsetY, event.shiftKey));
}); 

canvas.addEventListener('mouseup', event => {
  curves = [];
  currentAction = 'up';
});

canvas.addEventListener('mousemove', event => {
  if (! isButtonPressed(1, event.buttons)) { return; } 
  if (currentAction === 'down') {
    curves.push(makeCurve(event.offsetX, event.offsetY, event.shiftKey)); 
    shiftFlag = event.shiftKey;
    needsRepaint = true;
  }
});

const isButtonPressed = (buttonCode, pressed) => (pressed & buttonCode) === buttonCode;
const makeCurve = (x, y, reflect = false) => [x, y];


function repaint() {  
  (widthDirection) ? ((lineWidth == 100) ? (widthDirection = false && lineWidth--) :  lineWidth++) : ((lineWidth == 5) ? (widthDirection = true && lineWidth++) : lineWidth--);
  
  shift ? ((lineColor < 1) ? lineColor = 359 : lineColor--) : ((lineColor > 358) ? lineColor = 0 : lineColor++); 

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap  = 'round';
  ctx.strokeStyle = `hsl(${lineColor}, 100%, 50%)`;

  ctx.moveTo(curves[0], curves[1]);
  for (let i = 1; i <= curves.length - 1; i++) {
      ctx.lineTo(...curves[i]);    
  }
  ctx.stroke();
  ctx.closePath();
  curves.splice(0, curves.length - 2);
}

function tick() {
  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

tick();