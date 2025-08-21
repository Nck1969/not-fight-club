const attackButton = document.querySelector(".battle-page__controls__attack-button");

const logs = JSON.parse(localStorage.getItem('battleLogs'));
console.log(logs);
if(logs){
  generateBattleLogs(logs);
}

const ZONES = ["head", "neck", "body", "belly", "legs"];
const PLAYER_DAMAGE = 10;
const ENEMY_DAMAGE = 15;
const CRIT_MULTIPLIER = 1.5;

const isCriticalHit = () => (Math.floor(Math.random() * 4) + 1) === 1;

function calculateDamage(playerBattleInfo, enemyBattleInfo){
  const playerAttacks = playerBattleInfo.attackZones.map(zone => {
    return {
      zone: zone,
      isCriticalHit: isCriticalHit(),
    }
  })

  const enemyAttacks = enemyBattleInfo.attackZones.map(zone => {
    return {
      zone: zone,
      isCriticalHit: isCriticalHit(),
    }
  })

  const battleLogsInfo = [];
  let damageToPlayer = 0;
  let damageToEnemy = 0;

  const user = JSON.parse(localStorage.getItem('user'));
  const enemies = JSON.parse(localStorage.getItem('enemies'));
  const enemy = enemies.filter(enemy => !enemy.defeated)[0];

  playerAttacks.forEach(attack => {
    const isCrit = attack.isCriticalHit;
    const isEnemyHasBlock = enemyBattleInfo.defenceZones.includes(attack.zone);
    let damage = 0

    if(isCrit || !isEnemyHasBlock){
      damage = PLAYER_DAMAGE * (isCrit ? CRIT_MULTIPLIER : 1);
      damageToEnemy += damage;
    }

    battleLogsInfo.push({
      from: user.name,
      to: enemy.name,
      zone: attack.zone,
      isCrit: isCrit,
      isBlocked: isEnemyHasBlock,
      damage: damage,
    })
  })

  enemyAttacks.forEach(attack => {
    const isCrit = attack.isCriticalHit;
    const isPlayerHasBlock = playerBattleInfo.defenceZones.includes(attack.zone);
    let damage = 0

    if(isCrit || !isPlayerHasBlock){
      damage = ENEMY_DAMAGE * (isCrit ? CRIT_MULTIPLIER : 1);
      damageToPlayer += damage;
    }

    battleLogsInfo.push({
      from: enemy.name,
      to: user.name,
      zone: attack.zone,
      isCrit: isCrit,
      isBlocked: isPlayerHasBlock,
      damage: damage,
    })
  })

  return {
    battleLogsInfo,
    damageToPlayer,
    damageToEnemy,
  }
}

// 1. Успешная атака
// 2. Блокированная атака
// 3. Критическая атака
// 4. Критическая атака пробивающая блок

function generateBattleLogs(battleLogsInfo){
  localStorage.setItem('battleLogs', JSON.stringify(battleLogsInfo));
  const logsContainer = document.querySelector('.battle-page__footer__battle-logs');
  logsContainer.innerHTML = '';

  battleLogsInfo.map(log => {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';

    if (log.isBlocked) {
      logEntry.innerHTML = `
            <span class="attacker">${log.from}</span> атаковал 
            <span class="defender">${log.to}</span> в 
            <span class="zone">${log.zone}</span>, но 
            <span class="defender">${log.to}</span> смог защититься!
        `;
    } else if (log.isCrit) {
      logEntry.innerHTML = `
            <span class="attacker">${log.from}</span> нанес 
            <span class="crit">критический удар</span> 
            <span class="defender">${log.to}</span> в 
            <span class="zone">${log.zone}</span> и нанес 
            <span class="damage">${log.damage} урона</span>!
        `;
    } else {
      logEntry.innerHTML = `
            <span class="attacker">${log.from}</span> атаковал 
            <span class="defender">${log.to}</span> в 
            <span class="zone">${log.zone}</span> и нанес 
            <span class="damage">${log.damage} урона</span>
        `;
    }

    logsContainer.appendChild(logEntry);
  })
}

function showModal(isWin){
  const modal = document.querySelector('.battle-page__battle-result-modal');
  modal.classList.remove('hidden');

  const modalText = document.querySelector('.battle-page__battle-result-modal__text');

  modalText.textContent = isWin ? "You win!" : "You lose!"
  modal.style.backgroundColor = isWin ? "green" : "red";
}

function initNewEnemy(){
  const enemies = JSON.parse(localStorage.getItem('enemies'));
  const notDefeatedEnemies = enemies.filter(enemy => !enemy.defeated);

  if(notDefeatedEnemies.length !== 0){
    const characterName = document.querySelectorAll('.battle-page__character-card__name');
    characterName[1].textContent = notDefeatedEnemies[0].name;

    const characterImage = document.querySelectorAll('.battle-page__character-card__image');
    characterImage[1].children[0].setAttribute('src', notDefeatedEnemies[0].imgSrc);

    let hpValue = document.querySelectorAll('.battle-page__character-card__hp-value');
    hpValue[1].textContent = `${notDefeatedEnemies[0].hpCurrent}/${notDefeatedEnemies[0].hpTotal}`;
  }else{
    enemies.forEach(enemy => {
      enemy.defeated = false;
      enemy.hpCurrent = enemy.hpTotal;
    });

    localStorage.setItem('enemies', JSON.stringify(enemies));

    initNewEnemy();
  }
}

function calculateWinner(userHP, enemyHP){
  const logsContainer = document.querySelector('.battle-page__footer__battle-logs');
  logsContainer.innerHTML = '';
  localStorage.removeItem('battleLogs');


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

    initNewEnemy();
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

function updateAllHPValues(damageToPlayer, damageToEnemy){
  const user = JSON.parse(localStorage.getItem('user'));
  const userHP = user.hpCurrent;
  const newUserHP = userHP - damageToPlayer;

  const enemies = JSON.parse(localStorage.getItem('enemies'));
  const currentEnemy = enemies.filter(enemy => !enemy.defeated)[0];
  const enemyHP = currentEnemy.hpCurrent;
  const newEnemyHP = enemyHP - damageToEnemy;

  if(newUserHP <= 0 || newEnemyHP <= 0){
    calculateWinner(Number(newUserHP), Number(newEnemyHP));
  }else{
    user.hpCurrent = newUserHP;
    localStorage.setItem('user', JSON.stringify(user));

    currentEnemy.hpCurrent = newEnemyHP;
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

  const hpBarFill = document.querySelectorAll('.battle-page__character-card__hp-bar__fill');
  hpBarFill[0].style.width = `${user.hpCurrent / user.hpTotal * 100}%`;
  hpBarFill[1].style.width = `${currentEnemy.hpCurrent / currentEnemy.hpTotal * 100}%`;
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

  const { battleLogsInfo, damageToPlayer, damageToEnemy} = calculateDamage(playerBattleInfo, enemyBattleInfo);
  generateBattleLogs(battleLogsInfo);
  updateAllHPValues(damageToPlayer, damageToEnemy);
  updateHPUI();
});