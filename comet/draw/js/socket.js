'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');
editor.addEventListener('update', (event) => canvas.toBlob((obj) => connection.send(obj)));