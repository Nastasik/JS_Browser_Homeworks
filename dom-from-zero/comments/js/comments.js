'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createComment);
  const fragment = comments.reduce((prev, cur) => {
    prev.appendChild(cur);
    return prev;
  }, document.createDocumentFragment());
  
  commentsContainer.appendChild(fragment);
  commentsContainer.style.whiteSpace = 'pre-line';
}

function el(tag, attribute, child){
  const elem = document.createElement(tag);
  if(typeof attribute === 'object'){
    Object.keys(attribute).forEach(el => elem.setAttribute(el, attribute[el]));
  }
  if(typeof child === 'string' || typeof child === 'number'){
    elem.textContent = child;
  } else if (child instanceof Array){
    child.forEach(el => elem.appendChild(el))
  }
  return elem;
}

function createComment(comment) {
  return el('div', {class: "comment-wrap"}, [
    el('div', {class: "photo", title: comment.author.name}, [
       el('div', {class: "avatar", style: `background-image: url(${comment.author.pic})` })
    ]),
     el('div', {class: "comment-block"}, [
      el('p', {class: "comment-text"}, `${comment.text}`),
      el('div', {class: "bottom-comment"}, [
        el('div', {class: "comment-date"}, `${new Date(comment.date).toLocaleString('ru-Ru')}`),
        el('ul', {class: "comment-actions"}, [
          el('li', {class: "complain"}, 'Пожаловаться'),
          el('li', {class: "reply"}, 'Ответить')
        ]),
      ]),
    ])
  ]);
}

async function loadData () {
    const load = await fetch('https://neto-api.herokuapp.com/comments');
    const parse = await load.json();
    showComments(parse);
}

loadData();



