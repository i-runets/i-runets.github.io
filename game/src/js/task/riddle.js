const riddles = require('./data/riddles');
import {arrayRandomNumber} from '../utils/utils';

export class Riddle {
  constructor(modal) {
    this.modal = modal;
    this.currentRiddle = riddles[arrayRandomNumber(riddles)];
    this.render();
  }

  render() {
    const description = document.createElement('p');
    description.textContent = `Отгадайте загадку: ${this.currentRiddle.riddle}`;

    const form = document.createElement('form');

    const answer = document.createElement('input');
    answer.required = true;
    answer.type = 'text';
    answer.classList.add('answer');

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    form.appendChild(answer);
    form.appendChild(submit);
    this.modal.appendChild(description);
    this.modal.appendChild(form);
  }
}