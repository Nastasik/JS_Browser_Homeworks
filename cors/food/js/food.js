'use strict';
function randomName() {
    return 'callback' + Math.floor(Math.random() * 10);
  }
  
  function loadData(url) {
    const name = randomName();
    return new Promise((resolve, reject) => {
      window[name] = resolve;
      const script = document.createElement('script')
      script.src = `${url}?jsonp=${name}`;
      document.body.appendChild(script);
    });
  };
  
  loadData('https://neto-api.herokuapp.com/food/42').then(loadRecipe);
  loadData('https://neto-api.herokuapp.com/food/42/rating').then(loadRating);
  loadData('https://neto-api.herokuapp.com/food/42/consumers').then(loadConsumers);
  
  function loadRecipe(data) { 
    title.textContent = data.title;
    ingredients.textContent = data.ingredients.join(', ');
    pic.style = `background-image: url("${data.pic}");`;
  }
  
  function loadRating(data) {
    rating.textContent = data.rating.toFixed(2);
    star.style.width = `${data.rating * 100 / 10}%`;
    votes.textContent = `(${data.votes} оценок)`;
  }
  
  function loadConsumers(data) { 
    data.consumers.forEach(el => {
      const img = document.createElement('img');
      img.src = el.pic;
      img.title = el.name;
      consumers.appendChild(img);
    });
    const span = document.createElement('span'); 
    span.textContent = `(+${data.total})`;
    consumers.appendChild(span);
  };
  
  const pic = document.querySelector('[data-pic]');
  const title = document.querySelector('[data-title]');
  const ingredients = document.querySelector('[data-ingredients]');
  const rating = document.querySelector('[data-rating]');
  const star = document.querySelector('[data-star]');
  const votes = document.querySelector('[data-votes]');
  const consumers = document.querySelector('[data-consumers]');