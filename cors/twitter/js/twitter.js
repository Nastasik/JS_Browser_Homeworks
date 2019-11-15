'use strict';
function loadData(callbackName, url) {
    return new Promise((done, fail) => {
      const script = document.createElement('script');
      script.src = `${url}?callback=${callbackName}`;
      document.body.appendChild(script);
      window[callbackName] = done;
    });
  }
   
  Promise.all([loadData('callback', 'https://neto-api.herokuapp.com/twitter/jsonp')])
      .then(profile);
   
  function profile(data) {
    let pic = data[0].pic;
    let wallpaper = data[0].wallpaper;
    document.querySelector('[data-pic]').setAttribute('src', pic);
    document.querySelector('[data-wallpaper]').setAttribute('src', wallpaper);
    document.querySelector('[data-username]').innerText = data[0].username;
    document.querySelector('[data-description]').innerText = data[0].description;
    document.querySelector('[data-tweets]').innerText = data[0].tweets;
    document.querySelector('[data-followers]').innerText = data[0].followers;
    document.querySelector('[data-following]').innerText = data[0].following;
  };