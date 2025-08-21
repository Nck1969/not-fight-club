const registerPage = document.querySelector('.register-page');

const user = JSON.parse(localStorage.getItem('user')) || {};

if(localStorage.getItem('currentPage') === null){
  registerPage.classList.remove('hidden');
  localStorage.setItem('currentPage', "registerPage");
}

if(!user.name){
  user.name = "Player";
  localStorage.setItem('user', JSON.stringify(user));
}

if(user.name){
  registerPage.classList.add('hidden');
}

const defaultEnemies = [
  {
    name: "Spider",
    imgSrc: "src/images/enemies/spider.jpg",
    hpTotal: "100",
    hpCurrent: "100",
    attackZonesCount: 2,
    defenceZonesCount: 1,
    defeated: false,
  },
  {
    name: "Demon",
    imgSrc: "src/images/enemies/demon.jpg",
    hpTotal: "150",
    hpCurrent: "150",
    attackZonesCount: 1,
    defenceZonesCount: 3,
    defeated: false,
  }
]

const enemies = JSON.parse(localStorage.getItem('enemies'));

if(!enemies){
  localStorage.setItem('enemies', JSON.stringify(defaultEnemies));
}

const loses = localStorage.getItem('loses');
if(!loses){
  localStorage.setItem("loses", "0");
}

const wins = localStorage.getItem('wins');
if(!wins){
  localStorage.setItem("wins", "0");
}

const currentPage = localStorage.getItem('currentPage');
if(!currentPage){
  localStorage.setItem('currentPage', "registerPage");
}