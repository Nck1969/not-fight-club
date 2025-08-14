const registerPage = document.querySelector('.register-page');
const registerForm = document.querySelector('.register-page__form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log("TEST", registerForm.characterNameInput.value);

    const user = JSON.parse(localStorage.getItem('user')) || {};

    user.name = registerForm.characterNameInput.value;

    localStorage.setItem('user', JSON.stringify(user))
    registerPage.classList.add('hidden');
});