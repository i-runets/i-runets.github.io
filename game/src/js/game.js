import {background, spellbook} from './assets';
import Hero from './characters/hero';
import Monster from './characters/monster';
import Spell from './spell/spell';
import {Task} from './task/task';
import {pushLocalStorage} from './utils/utils';

export default class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.player;
    this.monster;
    this.monsterKilled = 0;
    this.spell = new Spell();
    this.task = new Task();
    this.loop;

    this.initCanvas();
    this.setTextStyle();
  }

  initCanvas() {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1100;
    this.canvas.height = 700;
  }

  initNps(optionsPlayer, optionsMonster) {
    this.player = new Hero(optionsPlayer);
    this.monster = new Monster(optionsMonster);
  }

  setTextStyle() {
    this.context.fillStyle = '#382B5F';
    this.context.font = '30px Ryuk';
    this.context.textAlign = 'center';
  }

  drawBackground() {
    this.context.drawImage(background, 0, 0, this.canvas.width,
        this.canvas.height);
    this.context.fillStyle = '#382B5F';
    this.context.fillText(`Монстров убито: ${this.monsterKilled}`, 900, 50);
  }

  spellBook() {
    this.context.drawImage(spellbook, 70, 300, 100, 100);
    this.canvas.onclick = e => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y >= 320 && y <= 400 && x >= 90 && x <= 165) {
        this.spell.show();
        this.task.chooseTask();
      }
    };
  }

  render() {
    this.drawBackground();
    this.spellBook();
    this.monster.render();
    this.player.render();
  }

  gameLoop() {
    this.loop = requestAnimationFrame(() => {
      this.gameLoop();
    });
    this.checkState();
    this.render();
  }

  checkState() {
    if (this.spell.isSpellSelected) {
      this.spell.isSpellSelected = false;
      this.task.show();
    }
    if (this.task.currentTask.isAnswered === true) {
      if (this.spell.selectedSpell === 'bullet') {
        this.player.attack(this.monster);
      }
      if (this.spell.selectedSpell === 'heal') {
        this.player.heal();
      }
      this.task.currentTask.isAnswered = '';
    }
    if (this.task.currentTask.isAnswered === false) {
      this.monster.attack(this.player);
      this.task.currentTask.isAnswered = '';
    }
    if (this.player.hp <= 0) {
      this.cancelAnimation();
      this.createScoreboard();
      this.canvas.remove();
    }
    if (this.monster.hp <= 0) {
      this.monsterKilled++;
      this.monster.generateHealth(this.monsterKilled);
      setTimeout(() => {
        this.monster.generateBody();
        this.monster.generateName();
      }, 400);
    }
  }

  restart() {
    this.initCanvas();
    this.monsterKilled = 0;
    this.player.hp = 100;
    this.monster.generateBody();
    this.monster.generateHealth(this.monsterKilled);
    this.monster.generateName();
    this.setTextStyle();
    this.gameLoop();
  }

  createScoreboard() {
    pushLocalStorage('finalGame', {
      name: this.player.name,
      result: this.monsterKilled,
    });
    const scoreboardContainer = document.createElement('div');
    scoreboardContainer.classList.add('scoreboard');
    const currentResult = document.createElement('div');
    currentResult.classList.add('result');
    const player = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    const topScore = document.createElement('div');
    topScore.classList.add('topScore');
    const scores = JSON.parse(localStorage.finalGame);
    scores.sort((a, b) => {
      return b.result - a.result;
    });
    scores.forEach(item => {
      const player = document.createElement('div');
      player.classList.add('player');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');

      p1.textContent = `Имя: ${item.name}`;
      p2.textContent = `Убито монстров: ${item.result}`;

      player.appendChild(p1);
      player.appendChild(p2);

      topScore.appendChild(player);
    });

    h2.textContent = this.player.name;
    p.textContent = `Убито монстров: ${this.monsterKilled}`;
    player.appendChild(h2);
    player.appendChild(p);
    currentResult.appendChild(player);
    scoreboardContainer.appendChild(currentResult);
    scoreboardContainer.appendChild(topScore);
    document.body.appendChild(scoreboardContainer);

    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart';
    restartBtn.classList.add('restart');

    scoreboardContainer.appendChild(restartBtn);
    restartBtn.onclick = () => {
      scoreboardContainer.remove();
      this.restart();
    };
  }

  cancelAnimation() {
    cancelAnimationFrame(this.loop);
  }
}
