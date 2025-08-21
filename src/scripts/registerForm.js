const mainPage = document.querySelector('.main-page');
const registerPage = document.querySelector('.register-page');
const registerForm = document.querySelector('.register-page__form');

const currentPage = localStorage.getItem('currentPage');

if(currentPage === "registerPage"){
  registerPage.classList.remove('hidden');
}else{
  registerPage.classList.add('hidden');
}

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log("TEST", registerForm.characterNameInput.value);

    const user = JSON.parse(localStorage.getItem('user')) || {};

    user.name = registerForm.characterNameInput.value;
    user.imgSrc = "src/images/chooseCharacterPage/character1.jpg";

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('currentPage', "mainPage");
    mainPage.classList.remove('hidden');
    registerPage.classList.add('hidden');
    location.reload();
});