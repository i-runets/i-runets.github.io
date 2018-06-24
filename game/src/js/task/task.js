import {AudioTask} from './audio';
import {Capital} from './capitals';
import {MathTask} from './math';
import {Translate} from './translate';
import {Riddle} from './riddle';
import {Recognizer} from './recognizer';
import {SortLetters} from './sortLetters';
import {SortNumbers} from './sortNumbers';
import {ToBin} from './toBin';

export class Task {
  constructor(selectedSpell) {
    this.selectedTask;
    this.isAnswered = '';
    this.selectedSpell = selectedSpell;
  }

  chooseTask() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);

    let playBtn;
    let submit;
    let answer;

    this.selectedTask = Math.floor(Math.random() * 9);
    switch (this.selectedTask) {
      case 0:
        const audio = new AudioTask(modal);
        playBtn = document.querySelector('.playBtn');
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === playBtn) {
            audio.synth.speak(audio.speech);
          }
          if (target === submit) {
            if (answer.value.trim().toLowerCase() === audio.currentWord) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 1:
        const capital = new Capital(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            if (answer.value.trim().toLowerCase() ===
                capital.currentCapital.capital) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 2:
        const math = new MathTask(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            if (+answer.value.trim() === +eval(math.equation)) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 3:
        const translate = new Translate(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            if (translate.currentWord.translate.indexOf(
                answer.value.toLowerCase()) > -1) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 4:
        const riddle = new Riddle(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            if (answer.value.trim().toLowerCase() ===
                riddle.currentRiddle.answer) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 5:
        const recognizer = new Recognizer(modal);
        playBtn = document.querySelector('.playBtn');
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            if (+answer.textContent.trim().toLowerCase() ===
                recognizer.currentWord) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 6:
        const sortNumbers = new SortNumbers(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            let res = [];
            const sort = document.querySelector('.sort');
            for (let i = 0; i < sort.childElementCount; i++) {
              res.push(sort.children[i].textContent);
            }
            if (res.join('') === sortNumbers.sortedArr.join('')) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 7:
        const sortLetters = new SortLetters(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            let res = [];
            const sort = document.querySelector('.sort');
            for (let i = 0; i < sort.childElementCount; i++) {
              res.push(sort.children[i].textContent);
            }
            if (res.join('') === sortLetters.currentWord) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
      case 8:
        const toBin = new ToBin(modal);
        submit = document.querySelector('.submitBtn');
        answer = document.querySelector('.answer');
        modal.addEventListener('click', e => {
          e.preventDefault();
          const target = e.target;
          if (target === submit) {
            if (parseInt(answer.value.trim().toLowerCase(), 2) ===
                toBin.number) {
              this.isAnswered = true;
            } else {
              this.isAnswered = false;
            }
            qWrapper.remove();
          }
        });
        break;
    }
  }

  show() {
    document.body.querySelector('.qWrapper').style.display = 'flex';
  }
}