const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
console.log(ws);//Передаются файлы blob c JSON строкой
ws.addEventListener('message', event => {
  if (isFirst) {
    JSON.parse(event.data).forEach(data =>       
       realtime.addData([Number(data.online)], data.time));    
    isFirst = false;
  } else {
      const data = JSON.parse(event.data);
      realtime.removeData();
      realtime.addData([Number(data.online)], data.time);
  }
});
