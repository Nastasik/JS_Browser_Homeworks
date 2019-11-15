'use strict';

const pupil = document.querySelector('.big-book__pupil');

document.addEventListener("mousemove", (e) => {  
    const eye = pupil.getBoundingClientRect(),
          eyeX = eye.left + eye.width / 2,
          eyeY = eye.top + eye.height / 2,
          x = ((e.clientX - eyeX) / document.documentElement.clientWidth),
          y = ((e.clientY - eyeY) / document.documentElement.clientHeight),
          size = 3 - Math.round((Math.abs(e.clientY - eyeY) / window.innerHeight + Math.abs(e.clientX - eyeX) / window.innerWidth) * 2);
          //size = 3 - ((Math.abs(e.clientY - eyeY) / window.innerHeight + Math.abs(e.clientX - eyeX) / window.innerWidth) * 3); //более плавный вариант

    pupil.style.setProperty('--pupil-x', x * 60 + 'px');
    pupil.style.setProperty('--pupil-y', y * 60 + 'px');
    pupil.style.setProperty('--pupil-size', size);
  });
