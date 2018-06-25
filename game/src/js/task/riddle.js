const riddles = require('./data/riddles');
import {arrayRandomNumber} from '../utils/utils';

export class Riddle {
  constructor() {
    this.currentRiddle = riddles[arrayRandomNumber(riddles)];
    this.render();
    this.isAnswered = '';
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
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
    modal.appendChild(description);
    modal.appendChild(form);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        if (answer.value.trim().toLowerCase() ===
            this.currentRiddle.answer) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}