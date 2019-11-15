'use strict';
const url = 'wss://neto-api.herokuapp.com/mouse';
const connect = new WebSocket(url);

function onclick(event) {
   connect.send(JSON.stringify({'x':event.pageX, 'y':event.pageY}));
 };   
document.addEventListener('click', onclick);

showBubbles(connect);