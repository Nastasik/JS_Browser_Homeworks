'use strict';
function showProfile(profile) {
    document.querySelector('[data-name]').innerHTML = profile.name;
    document.querySelector('[data-description]').innerHTML = profile.description;
    document.querySelector('[data-pic]').src = profile.pic;
    document.querySelector('[data-position]').innerHTML = profile.position;
  }
  
  function technologies(tech) {
    for (let item of tech) {
      let spanTag = document.createElement('span');
      spanTag.classList.add(`devicons`, `devicons-${item}`);
      document.querySelector('[data-technologies]').appendChild(spanTag);
    }
  }
  
  function loadProfile(src, callback) {
      let script = document.createElement("script");
      script.src = `${src}?jsonp=${callback}`;
      document.head.appendChild(script);
  }
  
  loadProfile('https://neto-api.herokuapp.com/profile/me', 'showProfile');
  
  function loadTechnologies(id, callback) {
      let script = document.createElement("script");
      script.src = `https://neto-api.herokuapp.com/profile/${id}/technologies?jsonp=${callback}`;
      document.head.appendChild(script);
  }
  
  loadTechnologies(90210, 'showStack');
  
  
  document.getElementsByClassName('content')[0].style.display = 'initial';
    