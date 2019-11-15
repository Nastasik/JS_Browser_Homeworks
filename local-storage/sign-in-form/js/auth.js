'use strict';
const SignIn = document.querySelector('.sign-in-htm');
const formDataIn = new FormData(SignIn);
const SignUp = document.querySelector('.sign-up-htm');
const formDataUp = new FormData(SignUp);

const xhrSignIn = new XMLHttpRequest();
const xhrSignUp = new XMLHttpRequest();
xhrSignIn.open('POST', 'https://neto-api.herokuapp.com/signin');
xhrSignUp.open('POST', 'https://neto-api.herokuapp.com/signup');

const buttonSignIn = SignIn.querySelector('.button');
const buttonSignUp = SignUp.querySelector('.button');



buttonSignIn.addEventListener('click', () => {
  xhrSignIn.send(JSON.stringify(formDataIn)); 
  xhrSignIn.addEventListener('load', () => { 
    let response = JSON.parse(xhrSignIn.responseText);
    let errorMessage = SignIn.querySelector('.error-message');
    ('error' in response) ? errorMessage.textContent = response.message : errorMessage.textContent = `Пользователь ${response.name} успешно авторизован`
  })
})



buttonSignUp.addEventListener('click', () => {
  xhrSignUp.send(JSON.stringify(formDataUp)); 
  xhrSignUp.addEventListener('load', () => { 
    let response = JSON.parse(xhrSignUp.responseText);
    let errorMessage = SignUp.querySelector('.error-message');
    ('error' in response) ? errorMessage.textContent =response.message : errorMessage.textContent = `Пользователь ${response.name} успешно зарегестрирован`    
  })
})


