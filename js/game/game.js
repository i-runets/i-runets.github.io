import Hero from './characters/hero';
import Monster from './characters/monster';
import Spell from './spell/spell';
import $ from 'jquery';
import sortable from 'jquery-ui/sortable';
import {generateTask} from './task/generateTask';

const shuffle = array => {
  let currentIndex = array.length,
      temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

/* ****************************************************************************************** */

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 1100;
canvas.height = 700;
context.fillStyle = '#382B5F';
context.font = '30px Ryuk';
context.textAlign = 'center';

const result = {};
const gameState = {
  rounds: 0,
  name: 'lol',
  monsterState: 'idle',
  heroState: 'idle',
};
const spellsIcon = {
  heal: './img/game/heal.png',
  bullet: './img/game/hit.png',
};
const lighting = new Spell().spells.lighting;
const bullet = new Spell().spells.bullet;
const heal = new Spell().spells.heal;
let hero;
let monster;
const spellbook = new Image();
spellbook.src = './img/game/Spellbook.png';
/**********************************************************************************************************/
const startGame = () => {
  hero = new Hero({
    context,
    width: 300,
    height: 342,
    imageSrc: './img/game/girl-min.png',
    frameWidth: 651,
    frameHeight: 542,
    x: 100,
    y: 250,
    hp: 100,
    name: gameState.name,
    ticksPerFrame: 4,
    numberOfframes: 13,
  });
  monster = new Monster({
    context,
    x: 800,
    y: 250,
  });
  gameLoop();
};

const drawImages = () => {
  /* background */
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.fillStyle = '#382B5F';
  context.fillText(`Монстров   убито: ${gameState.rounds}`, canvas.width - 160,
      50);

  /*spellbook*/
  context.drawImage(spellbook, 50, canvas.height - 100, 100, 100);

  /* monster */
  monster.render();
  if (monster.state === 'attacking') {
    context.drawImage(lighting, hero.x + 30, hero.y - 190, 250, 200);
  }

  /* hero */
  hero.render();
  if (hero.state === 'attacking') {
    context.drawImage(bullet, monster.x + 20, monster.y + 150, 50, 50);
  }
  if (hero.state === 'healing') {
    context.drawImage(heal, hero.x + 30, hero.y + 140, 200, 250);
  }

};

const createQ = () => {
  const qWrapper = document.createElement('div');
  qWrapper.classList.add('qWrapper');
  document.body.appendChild(qWrapper);
  const modal = document.createElement('div');
  modal.classList.add('task');
  const description = document.createElement('p');
  let answer = document.createElement('input');
  answer.type = 'text';
  const submit = document.createElement('button');
  submit.textContent = 'OK';
  submit.classList.add('submitBtn');

  let task = generateTask();
  let currentTask;
  let number;
  let wordForRecognizer;
  let resultForRecognizer;
  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play';
  playBtn.classList.add('playBtn');

  const taskType = Math.floor(Math.random() * Object.keys(task).length);
  if (taskType === 0) {
    currentTask = task.math;
    description.textContent = `Решить: ${currentTask}`;
  }
  if (taskType === 1) {
    currentTask = task.translateArray;
    number = Math.floor(Math.random() * currentTask.length);
    const translatable = currentTask[number].translatable;
    description.textContent = `Перевести: ${translatable}`;
  }
  if (taskType === 2) {
    const synth = window.speechSynthesis;
    modal.appendChild(playBtn);
    currentTask = task.audio;
    number = Math.floor(Math.random() * currentTask.length);
    description.textContent = 'Введите услышаное слово';
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-GB';
    speech.text = currentTask[number];
    playBtn.addEventListener('click', e => {
      e.preventDefault();
      synth.speak(speech);
    });
  }
  if (taskType === 3) {
    currentTask = task.drag;
    number = Math.floor(Math.random() * currentTask.length);
    description.textContent = 'Расставьте в правильном порядке';
    const drag = document.createElement('div');
    const ul = document.createElement('ul');

    const word = shuffle(currentTask[number].split('')).join('');

    for (let i = 0; i < currentTask[number].length; i++) {
      const li = document.createElement('li');
      li.textContent = word[i];
      ul.appendChild(li);
    }
    ul.classList.add('drag');
    drag.appendChild(ul);
    answer = drag;

    $(function() {
      $('.drag').sortable();
    });
  }
  if (taskType === 4) {
    currentTask = task.capitals;
    number = Math.floor(Math.random() * currentTask.length);
    description.textContent = 'Столица: ';
    const img = new Image();
    img.src = currentTask[number].img;
    modal.appendChild(img);
  }
  if (taskType === 5) {
    currentTask = task.sort;
    description.textContent = 'Расставить в порядке возрастания:';
    const sort = document.createElement('ul');
    currentTask.forEach(elem => {
      const num = document.createElement('li');
      num.textContent = elem;
      sort.appendChild(num);
    });
    sort.classList.add('sort');
    answer = sort;

    $(function() {
      $('.sort').sortable();
    });
  }
  if (taskType === 6) {
    currentTask = task.recognizer;
    wordForRecognizer = task.audio;
    number = Math.floor(Math.random() * wordForRecognizer.length);
    description.textContent = `Произнести: ${wordForRecognizer[number]}`;
    answer = document.createElement('p');
    currentTask.onresult = e => {
      resultForRecognizer = e.results[e.resultIndex];
      if (resultForRecognizer.isFinal) {
        answer.textContent = resultForRecognizer[0].transcript;
      }
    };

    const play = document.createElement('button');
    play.textContent = 'Press me';
    play.classList.add('playBtn');
    play.addEventListener('click', (e) => {
      currentTask.start();
    });
    modal.appendChild(play);
  }
  if (taskType === 7) {
    currentTask = task.riddles;
    number = Math.floor(Math.random() * currentTask.length);
    description.textContent = `Ответьте на загадку: \n ${currentTask[number].riddle}`;
  }

  if (taskType === 8) {
    currentTask = task.toBin;
    description.textContent = `Перевелите число ${currentTask} в двоичную систему счисления`;
  }

  modal.appendChild(description);
  modal.appendChild(answer);
  modal.appendChild(submit);
  qWrapper.appendChild(modal);

  submit.addEventListener('click', e => {
    e.preventDefault();
    if (taskType === 0) {
      if (Number(answer.value) === eval(currentTask)) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 1) {
      if (currentTask[number].translate.indexOf(
          answer.value.toLowerCase()) > -1) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 2) {
      if (answer.value.toLowerCase() === currentTask[number]) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 3) {
      let res = '';
      let drag = document.querySelector('.drag');
      for (let i = 0; i < drag.childElementCount; i++) {
        res += drag.children[i].textContent;
      }
      if (res === currentTask[number]) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 4) {
      if (answer.value.toLowerCase() ===
          currentTask[number].capital) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 5) {
      let res = [];
      const sort = document.querySelector('.sort');
      for (let i = 0; i < sort.childElementCount; i++) {
        res.push(sort.children[i].textContent);
      }
      if (res.join('') === currentTask.sort((a, b) => {
        return a - b;
      }).join('')) {
        castSpell(gameState.selectedSpell, 'monster');
      }
      else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 6) {
      if (answer.textContent === wordForRecognizer[number]) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 7) {
      if (answer.value.toLowerCase() === currentTask[number].answer) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }
    if (taskType === 8) {
      if (parseInt(answer.value, 2) === currentTask) {
        castSpell(gameState.selectedSpell, 'monster');
      } else {
        castSpell('lighting', 'hero');
      }
    }

    qWrapper.remove();
  });
};

const chooseSpell = () => {
  const spellWindowWrapper = document.createElement('div');
  spellWindowWrapper.classList.add('spellWrapper');
  const spellWindow = document.createElement('div');
  spellWindow.classList.add('spell');
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'OK';
  const spellList = document.createElement('div');
  spellList.classList.add('spellList');
  spellWindow.appendChild(spellList);
  spellWindowWrapper.appendChild(spellWindow);

  for (const spell in spellsIcon) {
    if (spellsIcon.hasOwnProperty(spell)) {
      const label = document.createElement('label');
      const img = new Image();
      img.src = './img/game/icon_spell_' + spell + '.png';
      label.setAttribute('for', spell);
      const spellSelect = document.createElement('input');
      spellSelect.type = 'radio';
      spellSelect.name = 'spell';
      spellSelect.setAttribute('id', spell);
      label.appendChild(spellSelect);
      label.appendChild(img);
      spellList.appendChild(label);
    }
  }

  spellWindow.appendChild(submit);
  document.body.appendChild(spellWindowWrapper);

  submit.addEventListener('click', e => {
    e.preventDefault();
    const spells = document.querySelectorAll('.spellList input');
    for (let i = 0; i < spells.length; i++) {
      if (spells[i].checked) {
        gameState.selectedSpell = spells[i].id;
      }
    }
    spellWindowWrapper.remove();
    createQ();
  });
};

const castSpell = (spellType, target) => {
  let cast;
  if (target === 'monster') {
    if (spellType === 'bullet') {
      hero.state = 'attacking';
      gunSound.play();
      monster.hp -= 20;
    }
    if (spellType === 'heal') {
      hero.state = 'healing';
      if (hero.hp >= 100) {
        hero.hp = 100;
      } else {
        hero.hp += 20;
      }
      healSound.play();
    }
  }
  if (target === 'hero') {
    monster.state = 'attacking';
    hero.hp -= 20;
    lightingSound.play();
  }
  setTimeout(() => {
    hero.state = 'idle';
    monster.state = 'idle';
  }, 400);
};

const createScoreboard = () => {
  cancelAnimationFrame(loop);
  const scoreboardContainer = document.createElement('div');
  scoreboardContainer.classList.add('scoreboard');
  const currentResult = document.createElement('div');
  currentResult.classList.add('result');
  const player = document.createElement('div');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');

  const topScore = document.createElement('div');
  topScore.classList.add('topScore');
  const scores = JSON.parse(localStorage.Journey);
  scores.sort((a, b) => {
    return b.rounds - a.rounds;
  });
  scores.forEach(item => {
    const player = document.createElement('div');
    player.classList.add('player');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    p1.textContent = `Имя: ${item.name}`;
    p2.textContent = `Убито монстров: ${item.rounds}`;

    player.appendChild(p1);
    player.appendChild(p2);

    topScore.appendChild(player);
  });

  h2.textContent = gameState.name;
  p.textContent = `Убито монстров: ${gameState.rounds}`;
  player.appendChild(h2);
  player.appendChild(p);
  currentResult.appendChild(player);
  scoreboardContainer.appendChild(currentResult);
  scoreboardContainer.appendChild(topScore);
  document.body.appendChild(scoreboardContainer);
};

const checkState = () => {
  if (hero.hp <= 0) {
    result.name = gameState.nickname;
    result.rounds = gameState.rounds;
    let oldResults = JSON.parse(localStorage.getItem('Journey')) || [];
    oldResults.push(result);
    localStorage.setItem('Journey', JSON.stringify(oldResults));
    createScoreboard();
  }
  if (monster.hp <= 0) {
    gameState.rounds++;
    monster.generateHealth(gameState.rounds);
    monster.generateBody();
    monster.generateName();

  }
};

/**********************************************************************************************************/

const background = new Image();
background.src = './img/game/background.png';

const lightingSound = new Audio('./sound/lighting.mp3');
const healSound = new Audio('./sound/heal.mp3');
const gunSound = new Audio('./sound/gun.mp3');
const bgMusic = new Audio('./sound/background.mp3');
bgMusic.loop = true;

/**********************************************************************************************************/
let loop;
const gameLoop = () => {
  loop = requestAnimationFrame(gameLoop);
  checkState();
  drawImages();
};

const welcome = document.querySelector('.welcome');
const name = document.getElementById('name');
const submit = document.getElementById('submitName');

submit.addEventListener('click', e => {
  e.preventDefault();

  bgMusic.play();
  bgMusic.volume = 0.1;
  gameState.name = name.value;
  startGame();
  document.body.appendChild(canvas);

  welcome.remove();
});

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (y >= 612 && y <= 685 && x >= 65 && x <= 145) {
    chooseSpell();
  }
});