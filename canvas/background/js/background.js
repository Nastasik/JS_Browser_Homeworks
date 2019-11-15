
const wall = document.getElementById('wall');
const ctx = wall.getContext("2d");
const bodyWidth = () => window.innerWidth;
const bodyHeight = () => window.innerHeight;
wall.setAttribute('width', bodyWidth());
wall.setAttribute('height', bodyHeight());
let figures = [];

const random = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
const randomFloat = (min, max, precision = 1) => random(min * Math.pow(10, precision), max * Math.pow(10, precision)) / Math.pow(10, precision);

// Функция времени № 1
function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

// Функция времени № 2
function nextPoint2(x, y, time) {
   return {
     x: x + Math.sin((x + (time / 10)) / 100) * 5,
     y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
   }
}


function circle() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';  
    ctx.lineWidth = this.size * 5;
    ctx.arc(this.currX, this.currY, this.size * 12, 0, 2 * Math.PI);
    ctx.stroke(); 
    ctx.restore();
}

function cross() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';  
    ctx.lineWidth = this.size * 5;
    ctx.rotate(Math.PI * this.angle / 180);
    ctx.moveTo(this.currX - this.size * 10, this.currY);
    ctx.lineTo(this.currX + this.size * 10, this.currY);
    ctx.stroke(); 
    ctx.moveTo(this.currX, this.currY - this.size * 10);
    ctx.lineTo(this.currX, this.currY + this.size * 10);
    ctx.stroke(); 
    ctx.restore();
}

let countFigures = random(50, 200); 
for (let i = 0; i < countFigures; i++) {
  figures.push({
    x: random(0, wall.width),    
    y: random(0, wall.height),  
    size: randomFloat(0.1, 0.6, 1), 
    speedRotate: randomFloat(-0.2, 0.2, 1),  
    angle: random(0, 360),   
    funcNextPoint: random(0,1) === 0 ? nextPoint1 : nextPoint2, 
    funcDrawFigure: random(0,1) === 0 ? circle : cross 
  });
}

function move() {
  for (let i = 0; i < countFigures; i++) {
    let result = figures[i].funcNextPoint(figures[i].x, figures[i].y, Date.now());
    figures[i].currX = result.x; 
    figures[i].currY = result.y; 
    figures[i].angle += figures[i].speedRotate;
    
    if (figures[i].angle > 360) {
      figures[i].angle = 0;
    } 
    if (figures[i].angle < 0) {
      figures[i].angle = 360;
    }
  }  
}

function drawFigures() {
  for (let i = 0; i < countFigures; i++) {
    figures[i].funcDrawFigure();
  }
}

setInterval(function() {
  ctx.clearRect(0, 0, wall.width, wall.height);   
  move();
  drawFigures();
}, 20); 

