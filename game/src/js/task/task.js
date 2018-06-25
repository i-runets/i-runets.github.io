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
  constructor() {
    this.currentTask = '';
  }

  chooseTask() {
    const selectedTask = Math.floor(Math.random() * 9);
    switch (selectedTask) {
      case 0:
        this.currentTask = new AudioTask();
        break;
      case 1:
       this.currentTask = new Capital();
        break;
      case 2:
        this.currentTask = new MathTask();
        break;
      case 3:
        this.currentTask = new Translate();
        break;
      case 4:
        this.currentTask = new Riddle();
        break;
      case 5:
        this.currentTask = new Recognizer();
        break;
      case 6:
        this.currentTask = new SortNumbers();
        break;
      case 7:
        this.currentTask = new SortLetters();
        break;
      case 8:
        this.currentTask = new ToBin();
        break;
    }
  }

  show() {
    document.body.querySelector('.qWrapper').style.display = 'flex';
  }
}