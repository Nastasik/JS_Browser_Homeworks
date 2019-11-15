const listBlock = document.querySelector('.list-block');
let output = document.querySelector('output');
const inputs = document.querySelectorAll('input');
console.log(inputs);
console.log(output);
let calc = 0; 

function check() {  
  this.checked === true ? calc++ : calc--;
  output.value = `${calc} из 4`;
  (calc === 4) ?  listBlock.classList.add('complete') :
      listBlock.classList.remove('complete');
 
}

for (let item of inputs) {
  item.addEventListener('input', check);
   if (item.checked === true) calc++;
  
}

output.value = `${calc} из ${inputs.length}`;