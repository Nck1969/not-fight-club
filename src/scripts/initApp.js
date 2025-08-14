const registerPage = document.querySelector('.register-page');

const user = JSON.parse(localStorage.getItem('user')) || {};

if(user.name){
  registerPage.classList.add('hidden');
}