const dictionary = require('./data/dictionary');
import {arrayRandomNumber} from '../utils/utils';

export class Translate {
  constructor(modal) {
    this.modal = modal;
    this.currentWord = dictionary[arrayRandomNumber(dictionary)];
    this.render();
  }

  render() {
    const description = document.createElement('p');
    description.textContent = `Перевести: ${this.currentWord.word}`;

    const form = document.createElement('form');

    const answer = document.createElement('input');
    answer.required = true;
    answer.type = 'text';
    answer.classList.add('answer');

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    this.modal.appendChild(description);
    form.appendChild(answer);
    form.appendChild(submit);
    this.modal.appendChild(form);
  }
}