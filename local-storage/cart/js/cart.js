'use strict';

const colorSwatch = document.getElementById('colorSwatch'),
      sizeSwatch = document.getElementById('sizeSwatch'),
      quickCart = document.getElementById('quick-cart'),
      cartForm = document.getElementById('AddToCartForm'),
      urls = [
        'https://neto-api.herokuapp.com/cart/colors',
        'https://neto-api.herokuapp.com/cart/sizes',
        'https://neto-api.herokuapp.com/cart'
      ];

function swatchColor(items, defaultColor = 'red') {
  if (!items.length) {
    return;
  }
  if (!localStorage.selectedColor) {
    localStorage.selectedColor = defaultColor;
  }

  for (let item of items) {
    const tmp = document.createElement('div');
    tmp.dataset.value = item.type;
    tmp.classList.add('swatch-element', 'color', item.type, item.isAvailable ? 'available' : 'soldout');
    tmp.innerHTML = `
      <div class="tooltip">${item.title}</div>
      <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${item.type === defaultColor ? 'checked' : ''} ${!item.isAvailable ? 'disabled' : ''}>
      <label for="swatch-1-${item.type}" style="border-color: ${item.code};">
        <span style="background-color: ${item.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    `;

    const radio = tmp.querySelector('input');
    radio.checked = localStorage.selectedColor === radio.value;
    radio.addEventListener('change', (event) => {
      localStorage.selectedColor = event.target.value;
    });

    colorSwatch.appendChild(tmp);
  }
}

function swatchSize(items, sizeDefault = 'xl') {
  if (!items.length) {
    return;
  }

  if (localStorage.selectedSize === undefined) {
    localStorage.selectedSize = sizeDefault;
  }

  for (let item of items) {
    const tmp = document.createElement('div');
    tmp.dataset.value = item.type;
    tmp.classList.add('swatch-element', 'plain', item.type, item.isAvailable ? 'available' : 'soldout');
    tmp.innerHTML = `
      <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${item.type === sizeDefault ? 'checked' : ''} ${!item.isAvailable ? 'disabled' : ''}>
      <label for="swatch-0-${item.type}">
        ${item.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    `;

    const radio = tmp.querySelector('input');
    radio.checked = localStorage.selectedSize === radio.value;
    radio.addEventListener('change', (event) => {
      localStorage.selectedSize = event.target.value;
    });

    sizeSwatch.appendChild(tmp);
  }
}

function cart(items) {
  if (!items.length) {
    return;
  }

  let totalPrice = 0;

  while (quickCart.firstChild) {
    quickCart.removeChild(quickCart.firstChild);
  }

  for (let item of items) {
    const tmp = document.createElement('div');
    tmp.id = `quick-cart-product-${item.id}`;
    tmp.classList.add('quick-cart-product', 'quick-cart-product-static');
    tmp.setAttribute('style', 'opacity: 1;');
    tmp.innerHTML = `
      <div class="quick-cart-product-wrap">
        <img src="${item.pic}" title="${item.title}">
        <span class="s1" style="background-color: ${item.color}; opacity: .5">$${item.price.toFixed(2)}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
    `;
    totalPrice += item.price * item.quantity;
    quickCart.appendChild(tmp);
  }

  const tmpCart = document.createElement('a');
  tmpCart.id = 'quick-cart-pay';
  tmpCart.setAttribute('quickbeam', 'cart-pay');
  tmpCart.classList.add('cart-ico', items.length ? 'open' : '');
  tmpCart.innerHTML = `
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">$${totalPrice.toFixed(2)}</span>
    </span>
  `;

  quickCart.appendChild(tmpCart);

  const removeButton = quickCart.querySelector('.remove'),
  count = quickCart.querySelector('.count');

  removeButton.addEventListener('click', (event) => {
    const id = event.target.dataset.id,
    formData = new FormData();
    formData.append('productId', id);
    fetchRequest(formData, 'https://neto-api.herokuapp.com/cart/remove');

    if (parseInt(count.textContent) === 1) {
      while (quickCart.firstChild) {
        quickCart.removeChild(quickCart.firstChild);
      }
    }
  });
}

Promise.all(urls.map(url => fetch(url)))
  .then(response => Promise.all(response.map(result => result.json())))
  .then(([dataColors, dataSizes, dataCart]) => {
    swatchColor(dataColors);
    swatchSize(dataSizes);
    cart(dataCart);
});

cartForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.currentTarget);
  formData.append('productId', event.currentTarget.dataset.productId);
  fetchRequest(formData, 'https://neto-api.herokuapp.com/cart');
});

function fetchRequest(data, url) {
  fetch(url, {
    body: data,
    credentials: 'same-origin',
    method: 'POST'
  })
  .then((result) => {
    if (200 <= result.status && result.status < 300) {
      return result;
    }
    throw new Error(response.statusText);
  })
  .then((result) => result.json())
  .then((data) => data.error ? console.error(data.message) : cart(data)
  );
}