const contentform = document.querySelector('.contentform');

//console.log(contentform2);
const  buttonContact = document.getElementsByClassName('button-contact')[0];
const editButton = document.getElementsByClassName('button-contact')[1];
const output = document.getElementById('output');
const outputsArr = output.querySelectorAll('output');
console.log(outputsArr);
let form = Array.from(contentform);
contentform.zip.addEventListener('input', zip);

function zip() {
    this.value = this.value.replace(/\D/gi, '').replace (/^0+/, '');
}

for (let item of form) {
    item.addEventListener('change', formTest);
}

function  formTest() {
    let value = true;
    form.forEach( (item, i) => {
        if (i === 0 || i === 7 || i === 13) return;
        if (item.value === "") value = false;
    })
    
    if (value === true) {
        buttonContact.removeAttribute('disabled');
        buttonContact.addEventListener('click', editForm);
        buttonContact.addEventListener('click', (event) => {
            event.preventDefault(event);
        })
    }
    else {
        if (!buttonContact.hasAttribute('disabled')) {
            buttonContact.setAttribute('disabled',"");
            buttonContact.removeEventListener('click', editForm);
        }
    }
}

function editForm() {  
      outputsArr.forEach(function (item) { 
          item.value = document.querySelector(`[name="${item.id}"]`).value;
      })   
  
      contentform.classList.add('hidden');
      output.classList.remove('hidden');
      editButton.addEventListener('click', edit);
      editButton.addEventListener('click', (event) => {
                  event.preventDefault(event);     
      })
  


    // document.getElementById('name').innerText = contentform.name.value;
    // document.getElementById('lastname').innerText = contentform.lastname.value;
    // document.getElementById('company').innerText = contentform.company.value;
    // document.getElementById('role').innerText = contentform.role.value;
    // document.getElementById('zip').innerText = contentform.zip.value;
    // document.getElementById('city').innerText = contentform.city.value;
    // document.getElementById('address').innerText = contentform.address.value;
    // document.getElementById('subject').innerText = contentform.subject.value;
    // document.getElementById('message').innerText = contentform.message.value;
}

function edit() {
    output.classList.add('hidden');
    contentform.classList.remove('hidden');
}
