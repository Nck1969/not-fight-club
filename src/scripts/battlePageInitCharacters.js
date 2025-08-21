const user = JSON.parse(localStorage.getItem('user'));
if(!user.hpCurrent && !user.hpTotal){
  user.hpCurrent = 250;
  user.hpTotal = 250;
  localStorage.setItem('user', JSON.stringify(user));
}

const enemies = JSON.parse(localStorage.getItem('enemies'));
const notDefeatedEnemies = enemies.filter(enemy => !enemy.defeated);

const characterName = document.querySelectorAll('.battle-page__character-card__name');
characterName[0].textContent = user.name;
characterName[1].textContent = notDefeatedEnemies[0].name;

const characterImage = document.querySelectorAll('.battle-page__character-card__image');
let character1img = document.createElement('img');
character1img.setAttribute('src', user.imgSrc);
characterImage[0].appendChild(character1img);

let character2img = document.createElement('img');
character2img.setAttribute('src', notDefeatedEnemies[0].imgSrc);
characterImage[1].appendChild(character2img);

let hpValue = document.querySelectorAll('.battle-page__character-card__hp-value');
hpValue[0].textContent = `${user.hpCurrent}/${user.hpTotal}`;
hpValue[1].textContent = `${notDefeatedEnemies[0].hpCurrent}/${notDefeatedEnemies[0].hpTotal}`;