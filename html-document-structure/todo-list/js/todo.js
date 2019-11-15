const todoList = document.querySelector('.todo-list');
const done = document.querySelector('.todo-list .done');
const undone = document.querySelector('.todo-list .undone');
const inputs = document.querySelectorAll('.todo-list input');

function status(event) {     
    let label = this.parentElement; 
    event.currentTarget.parentElement.classList.contains('done') || !event.currentTarget.checked ? undone.appendChild(label) : done.appendChild(label);
}
     

for (let item of inputs) {
  item.addEventListener('change', status);
}
