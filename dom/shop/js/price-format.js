function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function addToBasket(event) {   
  let countEl = document.querySelector('#cart-count');
  let count = countEl.innerHTML;
  let totalEl = document.querySelector('#cart-total-price'); 
  let total = totalEl.innerHTML.replace(' ',''); 
  
  //console.log(total);
  let result = parseInt(event.target.dataset.price) + parseInt(total);
  countEl.innerHTML = parseInt(count) + 1;
  totalEl.innerHTML= getPriceFormatted(result); 
}

const buttonsBox = document.querySelectorAll('.add');
Array.from(buttonsBox).forEach(el => {
  el.addEventListener('click', addToBasket)
})
