const selectImages = document.querySelectorAll('.choose-character__character-select-image');
const characterImage = document.querySelector('.choose-character__character-image');
const characterName = document.querySelector('.choose-character__character-name');
const characterWins = document.querySelector('.choose-character__character-wins');
const characterLoses = document.querySelector('.choose-character__character-loses');

const goBackButton = document.querySelector('.choose-character-page__footer__go-back-button');
const currentPage = localStorage.getItem('currentPage');
const chooseCharacterPage = document.querySelector('.choose-character-page');
const mainPage = document.querySelector('.main-page');

if(currentPage === "chooseCharacterPage"){
  chooseCharacterPage.classList.remove('hidden');
}else{
  chooseCharacterPage.classList.add('hidden');
}

const user = JSON.parse(localStorage.getItem('user'));
const wins = localStorage.getItem('wins');
const loses = localStorage.getItem('loses');

characterName.textContent = user.name
characterWins.textContent = `Wins: ${wins}`;
characterLoses.textContent = `Loses: ${loses}`;

characterImage.setAttribute('src', user.imgSrc);

selectImages.forEach(image =>
  image.addEventListener(
    'click',
    (event) => {
      const test = event.target.getAttribute('src');

      characterImage.setAttribute('src', test);
      user.imgSrc = test;
      localStorage.setItem('user', JSON.stringify(user));

      const battlePageCharacterImage = document.querySelectorAll('.battle-page__character-card__image')[0];
      if(battlePageCharacterImage.childElementCount !== 0){
        battlePageCharacterImage.children[0].setAttribute('src', test);
      }else{
        let characterImg = document.createElement('img');
        characterImg.setAttribute('src', test);
        battlePageCharacterImage.appendChild(characterImg);
      }
    })
);

goBackButton.addEventListener('click', () => {
  chooseCharacterPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  localStorage.setItem('currentPage', "mainPage");
});