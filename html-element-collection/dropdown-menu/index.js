let btn = document.getElementsByClassName('wrapper-dropdown')[0];

function buttonActive() {
  btn.classList.toggle('active');
}

btn.onclick = buttonActive;