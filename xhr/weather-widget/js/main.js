const request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);

request.send();
request.onload = function () {
  //if (request.status == 200) {
   const response = JSON.parse(request.responseText);
   setData(response); 
 // }
}