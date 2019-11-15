let galleryView = document.getElementById('view');
let aSet = document.getElementsByTagName('a');

function selectImg(event) {
   event.preventDefault();
   const galleryCurrent =  Array.from(document.getElementsByClassName('gallery-current'))[0];

    if (galleryCurrent) {
        galleryCurrent.classList.remove('gallery-current');
    }
    let currentImg = event.currentTarget;   
    currentImg.classList.add('gallery-current');   
    galleryView.src = currentImg.href;  
}

for (const a of aSet) {  
    a.addEventListener('click', selectImg);
 }
