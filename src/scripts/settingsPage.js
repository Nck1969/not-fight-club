const input = document.querySelector('.settings-page__input');
const editButton = document.querySelector('.settings-page__edit-button');
const saveButton = document.querySelector('.settings-page__save-button');

const goBackButton = document.querySelector('.settings-page__footer__go-back-button');
const settingsPage = document.querySelector('.settings-page');
const currentPage = localStorage.getItem('currentPage');
const mainPage = document.querySelector('.main-page');

const chooseCharacterPageCharacterName = document.querySelector('.choose-character__character-name');
const battlePageCharacterName = document.querySelectorAll('.battle-page__character-card__name')[0];

if(currentPage === "settingsPage"){
  settingsPage.classList.remove('hidden');
}else{
  settingsPage.classList.add('hidden');
}

editButton.addEventListener('click', () => {
  input.removeAttribute('disabled');
  saveButton.classList.remove('hidden');
  editButton.classList.add('hidden');
});

saveButton.addEventListener('click', () => {
  input.setAttribute('disabled', '');
  saveButton.classList.add('hidden');
  editButton.classList.remove('hidden');
  localStorage.setItem('user', JSON.stringify(user));

  chooseCharacterPageCharacterName.textContent = user.name;
  battlePageCharacterName.textContent = user.name;
});

const user = JSON.parse(localStorage.getItem('user'));
input.value = user.name;

input.addEventListener('input', () => {
  user.name = input.value
});

goBackButton.addEventListener('click', () => {
  settingsPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  localStorage.setItem('currentPage', "mainPage");
});