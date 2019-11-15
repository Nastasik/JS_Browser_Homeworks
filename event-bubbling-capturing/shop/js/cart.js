'use strict';
function addToBasket(event){
    if (event.target.classList.contains('add-to-cart')) {
      event.preventDefault();
      let title = event.target.dataset.title;
      let price = event.target.dataset.price;
      addToCart({title, price});
    }
  }
  
  const itemsList = document.querySelector('.items-list');
  itemsList.addEventListener('click', addToBasket);