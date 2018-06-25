const dictionary = require('./data/dictionary');
import {arrayRandomNumber} from '../utils/utils';

export class Translate {
  constructor() {
    this.currentWord = dictionary[arrayRandomNumber(dictionary)];
    this.isAnswered = '';
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
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

    modal.appendChild(description);
    form.appendChild(answer);
    form.appendChild(submit);
    modal.appendChild(form);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        if (this.currentWord.translate.indexOf(
            answer.value.toLowerCase()) > -1) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}