'use strict'

let moved = null,
    posX = null, 
    posY = null; 

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('logo')) {        
        moved = event.target;
        moved.classList.add('moving');
    }
});

document.addEventListener('mousemove', (event) => {
        event.preventDefault();
        moved.style.left = `${event.pageX - (moved.width / 2)}px`;
        moved.style.top = `${event.pageY - (moved.height / 2)}px`;    
});

document.addEventListener('mouseup', (event) => {    
        moved.classList.remove('moving');
        moved.style.visibility = 'hidden';
        const trashBin = document.elementFromPoint(event.clientX, event.clientY).closest('#trash_bin');
        moved.style.visibility = 'visible';
         if (trashBin) {
            moved.style.display = 'none'; // Удалить элемен в области корзины
            moved = null;
            
        }  else {
            moved.style.left = `${posX}px`;
            moved.style.top = `${posY}px`;            
            moved = null;
        } 
})