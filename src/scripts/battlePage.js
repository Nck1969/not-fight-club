const currentPage = localStorage.getItem('currentPage');
const battlePage = document.querySelector('.battle-page');
const mainPage = document.querySelector('.main-page');

if(currentPage === "battlePage"){
  battlePage.classList.remove('hidden');
}else{
  battlePage.classList.add('hidden');
}

document.getElementById('attack-zones').addEventListener('click', (e) => {
  if (e.target.classList.contains('zone-btn')) {
    // Снимаем активный класс со всех кнопок атаки
    document.querySelectorAll('#attack-zones .zone-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    // Добавляем активный класс нажатой кнопке
    e.target.classList.add('active');
  }
});

// Обработка защиты (до двух зон)
document.getElementById('defence-zones').addEventListener('click', (e) => {
  if (e.target.classList.contains('zone-btn')) {
    const activeDefences = document.querySelectorAll('#defence-zones .zone-btn.active');

    if (e.target.classList.contains('active')) {
      // Если зона уже активна - снимаем выделение
      e.target.classList.remove('active');
    } else if (activeDefences.length < 2) {
      // Если активных зон меньше двух - добавляем
      e.target.classList.add('active');
    }
    // Если уже две выбраны и кликаем на третью - ничего не происходит
  }
});

function navigateToMainPage(){
  battlePage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  localStorage.setItem('currentPage', "mainPage");
}

const goBackButton = document.querySelector('.battle-page__footer__go-back-button');
goBackButton.addEventListener('click', () => navigateToMainPage());

const modal = document.querySelector('.battle-page__battle-result-modal');
const modalCloseButton = document.querySelector('.battle-page__battle-result-modal__close-button');

modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden');
  navigateToMainPage();
});