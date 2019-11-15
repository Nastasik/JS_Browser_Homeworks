'use strict';
const app = document.querySelector('.app'),
      controls = document.querySelector('.app .controls'),
      list = document.querySelector('.list'),
      video = document.createElement('video'),
      audio = document.createElement('audio'),
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
video.autoplay = true;
app.appendChild(video);
audio.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3';
app.appendChild(audio);

function sendPhoto() {   
  const sending = new XMLHttpRequest(),
        url = this.parentNode.parentNode.firstChild.src;
  sending.open('POST', 'https://neto-api.herokuapp.com/photo-booth');  
  
  fetch(url)
    .then(result => result.blob())
    .then(blob => {
       let formData = new FormData();
       formData.append('image', blob);       
       sending.send(formData); 
    });  
}

function createPhotoNode(url) {
  const figure = document.createElement('figure');
   figure.innerHTML = `
        <img src="${url}">
        <figcaption>
          <a href="${url}" download="snapshot${list.children.length + 1}.png">
            <i class="material-icons">file_download</i>
          </a>
          <a><i class="material-icons">file_upload</i></a>
          <a><i class="material-icons">delete</i></a>
        </figcaption>`;
      list.appendChild(figure);
}

function takePhoto() {
  audio.play();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  let url = canvas.toDataURL();
  list.insertBefore(createPhotoNode(url), list.firstChild);
  
  Array.from(document.querySelectorAll('figure .upload'))
    .forEach(el => {
        el.addEventListener('click', sendPhoto);
      })
  
  function getFoto(tag) {
   while (tag.parentElement !== list) {
      tag = tag.parentElement;
  }
  return (tag.parentElement === list) ? tag : null;
}
  
   Array.from(document.querySelectorAll('figure .delete'))
    .forEach(el => {
        el.addEventListener('click', (event) => {           
            el.removeChild(getFoto(event));                   
      })  
   })
  
   Array.from(document.querySelectorAll('figure .file_download'))
    .forEach(el => {
        el.addEventListener('click', (event) => {            
            event.target.parentElement.style.display = 'none';            
      })  
   })
}

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(stream => {    
    video.srcObject = stream;
    controls.style.display = 'initial';
    document.getElementById('take-photo').addEventListener('click', takePhoto);
  })
  .catch(err => console.warn(err)); 

