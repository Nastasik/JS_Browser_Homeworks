'use strict'

const acSelect = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMap = document.querySelector('#seatMapDiv');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

totalPax.textContent = 0;
totalHalf.textContent = 0;
totalAdult.textContent = 0;

btnSeatMap.addEventListener('click', (el) => {
    el.preventDefault();
    getData(acSelect.value).then(data => showScheme(data));
});

btnSetFull.setAttribute('disabled', true);
btnSetEmpty.setAttribute('disabled', true);

function getData(id) {
    return fetch(`https://neto-api.herokuapp.com/plane/${id}`)
        .then(res => res.json())
        .catch(err => { console.log(err);   });
}

function showScheme(data) {
    btnSetFull.disabled = false;
    btnSetEmpty.disabled = false;
    seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
    while (seatMap.hasChildNodes()) {
        seatMap.removeChild(seatMap.firstChild);
    }
  
    for (let i = 0; i < data.scheme.length; i++) {
       seatMap.appendChild(createRow(i + 1, data.scheme[i], data));
    }
}

function createRow(rowNumber, seatsInRow, data) {
    return el('div', {class: 'row seating-row text-center' }, [
            createRowNumber(rowNumber),
            createSeats(['A', 'B', 'C'], seatsInRow, data),
            createSeats(['D', 'E', 'F'], seatsInRow, data),
        ]);    
}

function createRowNumber(number) {
    return el('div', {class: 'col-xs-1 row-number'}, [
        el('h2', {class : ''}, `${number}`)
    ]);
}


function createSeats(seatLabels, seatsInRow, data) {
    let seats = [];
    for (let label of seatLabels) {
        seats.push(seatsTest(label, seatsInRow, data));
    }
    return el('div', {class: 'col-xs-5'}, seats);
}


function seatsTest(seatLabel, seatsInRow, data) {
  let letters = data['letters' + seatsInRow];
     return (seatsInRow !== 0 && letters && letters.includes(seatLabel)) ? el('div', {class: 'col-xs-4 seat'}, [el('span', {class: 'seat-label'}, seatLabel)]) : el('div', {class: 'col-xs-4 no-seat'}, [])
}


function el(tag, attributes, children) {
    const element = document.createElement(tag);
    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
    }
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (children instanceof Array) {
        children.forEach(child => element.appendChild(child));
    }
    return element;
}

seatMap.addEventListener('click', selectSeat);
btnSetFull.addEventListener('click', selectAll);
btnSetEmpty.addEventListener('click', clearAll);


function selectSeat(el) {
    let target = el.target;
    if (target.tagName === 'SPAN')
        target = target.parentElement;
    if (target.tagName === 'DIV' && target.classList.contains('seat')) {
        let total = 0;
        if (el.altKey) {
            (target.classList.contains('adult')) ? target.classList.remove('adult') : target.classList.add('half');
        } else {
            if (target.classList.contains('half')) {
                target.classList.remove('half');
            }
            else if (target.classList.contains('adult')) {
                target.classList.remove('adult');
            } else {
                target.classList.add('adult');
            }
        }
    }
    showTotal();
}

function selectAll(el) {
    el.preventDefault();
    if (el.shiftKey) {
        Array.from(document.querySelectorAll('.seat')).forEach(element => {
            (element.classList.contains('adult')) ? element.classList.remove('adult') : element.classList.add('half');            
        });
    } else {
        Array.from(document.querySelectorAll('.seat')).forEach(element => {
            (element.classList.contains('half')) ? element.classList.add('half') : element.classList.add('adult');
        });
    }
    showTotal();
}

function clearAll(el) {
    el.preventDefault();
    Array.from(document.querySelectorAll('.seat')).forEach(element => element.classList.remove('adult', 'half'));
    showTotal();
}

function showTotal() {
    totalPax.textContent = (document.querySelectorAll('.adult')).length + (document.querySelectorAll('.half')).length;
    totalAdult.textContent = (document.querySelectorAll('.adult')).length;
    totalHalf.textContent = (document.querySelectorAll('.half')).length;
}