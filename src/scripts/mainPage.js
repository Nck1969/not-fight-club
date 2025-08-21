const mainPage = document.querySelector('.main-page');
const currentPage = localStorage.getItem('currentPage');
const chooseCharacterPage = document.querySelector('.choose-character-page');
const settingsPage = document.querySelector('.settings-page');
const battlePage = document.querySelector('.battle-page');

if(currentPage === "mainPage"){
  mainPage.classList.remove('hidden');
}else{
  mainPage.classList.add('hidden');
}

const chooseCharacterButton = document.querySelector('.go-to-choose-character-page');
chooseCharacterButton.addEventListener('click', () => {
  localStorage.setItem('currentPage', "chooseCharacterPage");
  mainPage.classList.add('hidden');
  chooseCharacterPage.classList.remove('hidden');
});

const settingsButton = document.querySelector('.go-to-settings-page');
settingsButton.addEventListener('click', () => {
  localStorage.setItem('currentPage', "settingsPage");
  mainPage.classList.add('hidden');
  settingsPage.classList.remove('hidden');
});

const battleButton = document.querySelector('.go-to-battle-page');
battleButton.addEventListener('click', () => {
  localStorage.setItem('currentPage', "battlePage");
  mainPage.classList.add('hidden');
  battlePage.classList.remove('hidden');
})