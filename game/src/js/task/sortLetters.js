const wordsForSort = require('./data/wordsForSort');
import $ from 'jquery';
import sortable from 'jquery-ui/sortable';
import {arrayRandomNumber, shuffle} from '../utils/utils';

export class SortLetters {
  constructor(modal) {
    this.modal = modal;
    this.currentWord = wordsForSort[arrayRandomNumber(wordsForSort)];
    this.render();
  }

  render() {
    const description = document.createElement('p');
    description.textContent = 'Составте слово: ';

    const answer = document.createElement('div');
    answer.classList.add('sort', 'answer');

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    const shuffledWord = shuffle(this.currentWord.split('')).join('');

    for (let i = 0; i < shuffledWord.length; i++) {
      const span = document.createElement('span');
      span.textContent = shuffledWord[i];
      answer.appendChild(span);
    }

    $(function() {
      $('.sort').sortable();
    });

    this.modal.appendChild(description);
    this.modal.appendChild(answer);
    this.modal.appendChild(submit);
  }
}