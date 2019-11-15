
const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/book/', true);

request.send();
function onLoad() {
  const data = JSON.parse(request.responseText);
    //console.log(request.responseText);

  let contentlist = document.querySelector('#content');
  console.log(contentlist);
  data.forEach(item => {
      const liTag = document.createElement('li');      
      console.log(item, 'item');      
      let pic = document.createElement("IMG");
      pic.src = item.cover.small;
      liTag.appendChild(pic);
      liTag.dataset.title = item.title;
      liTag.dataset.info = item.info;
      liTag.dataset.price = item.price;
      liTag.dataset.author = item.author.name;  
      contentlist.appendChild(liTag);
  });
}

/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});
