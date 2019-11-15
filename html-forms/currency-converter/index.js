const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.addEventListener('DOMContentLoaded', start);
request.open('GET', 'https://neto-api.herokuapp.com/currency', true);

request.send();

function onLoad() {
    const data = JSON.parse(request.responseText);   

    let to = document.querySelector('#to');
    let from = document.querySelector('#from');    
    const mainContent = document.querySelector('#content');
    const inputSource = document.querySelector('#source');
  
    mainContent.classList.toggle('hidden');
    loader.classList.add('hidden');
    loader.removeEventListener("load", onLoad);
  
     
    let valueName = "";
    data.forEach( item => {
        valueName = valueName + `<option value="${item['code']}">${item['code']}</option>`
    }); console.log(data)
    from.innerHTML = valueName;
    to.innerHTML = valueName;
    from.addEventListener('change', function() { converter(data, from, to, inputSource)});
    to.addEventListener('change',  function() { converter(data, from, to, inputSource)});
    
    inputSource.addEventListener('input',  function() {converter(data, from, to, inputSource)});
    converter(data, from, to, inputSource);   
}
 
function start() {
    if (request.readyState == 1)    {                                  
        loader.classList.toggle('hidden');}
}

function converter(data, from, to, inputSource) {
    let fromValue = 1;
    let toValue = 1;
 console.log(data, 'ds');
 
    data.forEach(currency => {
        if (currency.code == from.options[from.selectedIndex].value) {
          fromValue = currency.value;
          console.log( from.options[from.selectedIndex].value)
        }
        if (currency.code == to.options[to.selectedIndex].value) {
          toValue = currency.value;
        }
    })   
    const outputResult = document.querySelector('#result');
    outputResult.innerText = inputSource.value * fromValue / toValue;
   
}
