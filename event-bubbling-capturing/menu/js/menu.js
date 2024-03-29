function toggleMenu(event) {
  if (this.classList.contains('show')) {
   this.classList.remove('show');
    this.classList.add('hide');
  } else {
   this.classList.add('show');
    this.classList.remove('hide');
  } 
}

function openLink(event) {
  event.stopPropagation();  
  event.preventDefault();
  console.log(this.textContent);  
}

function init(node) {
  node.addEventListener('click', toggleMenu);  
}

function initLink(node) {
  if (node.dataset.toggle) {
    return;
  } 
  node.addEventListener('click', openLink, true);  
}

Array
  .from(document.querySelectorAll('.dropdown'))
  .forEach(init);

Array
  .from(document.querySelectorAll('a'))
  .forEach(initLink);

