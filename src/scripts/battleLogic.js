const attackButton = document.querySelector(".battle-page__controls__attack-button");

const ZONES = ["head", "neck", "body", "belly", "legs"];
const PLAYER_DAMAGE = 10;
const ENEMY_DAMAGE = 15;

function calculateDamage(playerBattleInfo, enemyBattleInfo){
  const hitsToPlayer = enemyBattleInfo.attackZones.filter(zone => !playerBattleInfo.defenceZones.includes(zone)).length;
  const hitsToEnemy = playerBattleInfo.attackZones.filter(zone => !enemyBattleInfo.defenceZones.includes(zone)).length;

  return { hitsToPlayer, hitsToEnemy }
}

function showModal(isWin){
  const modal = document.querySelector('.battle-page__battle-result-modal');
  modal.classList.remove('hidden');

  const modalText = document.querySelector('.battle-page__battle-result-modal__text');

  modalText.textContent = isWin ? "You win!" : "You lose!"
  modal.style.backgroundColor = isWin ? "green" : "red";
}

function calculateWinner(userHP, enemyHP){
  if(enemyHP <= 0){
    const chooseCharacterPageCharacterWins = document.querySelector('.choose-character__character-wins');

    console.log("WINNER");
    const wins = localStorage.getItem('wins');
    localStorage.setItem('wins', Number(wins) + 1);
    chooseCharacterPageCharacterWins.textContent = `Wins: ${Number(wins) + 1}`;

    const enemies = JSON.parse(localStorage.getItem('enemies'));
    const currentEnemy = enemies.filter(enemy => !enemy.defeated)[0];
    currentEnemy.defeated = true;
    localStorage.setItem('enemies', JSON.stringify(enemies));

    const user = JSON.parse(localStorage.getItem('user'));
    user.hpCurrent = user.hpTotal;
    localStorage.setItem('user', JSON.stringify(user));

    showModal(true);
  }else if(+userHP <= 0 && +enemyHP > 0){
    const chooseCharacterPageCharacterLoses = document.querySelector('.choose-character__character-loses');

    console.log("LOSER");
    const user = JSON.parse(localStorage.getItem('user'));
    user.hpCurrent = user.hpTotal;
    localStorage.setItem('user', JSON.stringify(user));

    const loses = localStorage.getItem('loses');
    localStorage.setItem('loses', Number(loses) + 1);
    chooseCharacterPageCharacterLoses.textContent = `Loses: ${Number(loses) + 1}`;

    const enemies = JSON.parse(localStorage.getItem('enemies'));
    const currentEnemy = enemies.filter(enemy => !enemy.defeated)[0];
    currentEnemy.hpCurrent = currentEnemy.hpTotal;
    localStorage.setItem('enemies', JSON.stringify(enemies));

    showModal(false);
  }
}

function updateAllHPValues(hitsToPlayer, hitsToEnemy){
  const user = JSON.parse(localStorage.getItem('user'));
  const userHP = user.hpCurrent;
  const newUserHP = userHP - (ENEMY_DAMAGE * hitsToPlayer);

  const enemies = JSON.parse(localStorage.getItem('enemies'));
  const currentEnemy = enemies.filter(enemy => !enemy.defeated)[0];
  const enemyHP = currentEnemy.hpCurrent;
  const newEnemyHP = enemyHP - (PLAYER_DAMAGE * hitsToEnemy);

  if(newUserHP <= 0 || newEnemyHP <= 0){
    calculateWinner(Number(newUserHP), Number(newEnemyHP));
  }else{
    user.hpCurrent = userHP - (ENEMY_DAMAGE * hitsToPlayer);
    localStorage.setItem('user', JSON.stringify(user));

    currentEnemy.hpCurrent = enemyHP - (PLAYER_DAMAGE * hitsToEnemy);
    localStorage.setItem('enemies', JSON.stringify(enemies));
  }
}

function updateHPUI(){
  let hpValue = document.querySelectorAll('.battle-page__character-card__hp-value');
  const user = JSON.parse(localStorage.getItem('user'));
  const enemies = JSON.parse(localStorage.getItem('enemies'));
  const currentEnemy = enemies.filter(enemy => !enemy.defeated)[0];

  hpValue[0].textContent = `${user.hpCurrent}/${user.hpTotal}`;
  hpValue[1].textContent = `${currentEnemy.hpCurrent}/${currentEnemy.hpTotal}`;
}

function getRandomZones(n) {
  const randomZones = []
  while (randomZones.length < n) {
    const randomIndex = Math.floor(Math.random() * ZONES.length);
    if (!randomZones.includes(ZONES[randomIndex])) {
      randomZones.push(ZONES[randomIndex]);
    }
  }
  return randomZones;
}

attackButton.addEventListener("click", () => {
  const playerBattleInfo = {
    attackZones: [],
    defenceZones: [],
  };

  const enemies = JSON.parse(localStorage.getItem('enemies'));
  const currentEnemy = enemies.filter(enemy => !enemy.defeated)[0];

  const playerAttackZones = document.querySelector('#attack-zones .zone-btn.active');
  playerBattleInfo.attackZones = [playerAttackZones.getAttribute("data-zone")];

  document.querySelectorAll('#defence-zones .zone-btn.active').forEach(zone =>
    playerBattleInfo.defenceZones.push(zone.getAttribute("data-zone")));


  const enemyBattleInfo = {
    attackZones: getRandomZones(currentEnemy.attackZonesCount),
    defenceZones: getRandomZones(currentEnemy.defenceZonesCount),
  };

  const {hitsToPlayer, hitsToEnemy} = calculateDamage(playerBattleInfo, enemyBattleInfo);
  updateAllHPValues(hitsToPlayer, hitsToEnemy);
  updateHPUI();
});