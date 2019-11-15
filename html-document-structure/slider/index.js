const slides = document.querySelector('.slides');

let currentSlide = slides.firstElementChild;
currentSlide.classList.add('slide-current');

const prev = document.querySelector('[data-action = prev]');
const next = document.querySelector('[data-action = next]');
const first = document.querySelector('[data-action = first]');
const end = document.querySelector('[data-action = last]');

function changeSlide(target) {
  switch (target) {
    case 'next':
      return currentSlide.nextElementSibling;
    case 'prev':
      return currentSlide.previousElementSibling;
    case 'first':
      return slides.firstElementChild;
    case 'last':
      return slides.lastElementChild;
    default:
      return;
  }
}
prev.classList.add('disabled');
first.classList.add('disabled');

function buttonsStatus() {  
  const changedSlide = changeSlide(event.target.dataset.action);
   
  currentSlide.classList.remove('slide-current');
  changedSlide.classList.add('slide-current');

  next.classList.toggle('disabled', changedSlide.nextElementSibling === null);
  end.classList.toggle('disabled', changedSlide.nextElementSibling === null);
  prev.classList.toggle('disabled', changedSlide.previousElementSibling === null);
  first.classList.toggle('disabled', changedSlide.previousElementSibling === null);
  currentSlide = changedSlide;
}

next.addEventListener('click', event => buttonsStatus('next'));
prev.addEventListener('click', event => buttonsStatus('prev'));
first.addEventListener('click', event => buttonsStatus('first'));
end.addEventListener('click', event => buttonsStatus('last'));