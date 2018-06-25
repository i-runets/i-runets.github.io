const wordsForSort = require('./data/wordsForSort');
import $ from 'jquery';
import sortable from 'jquery-ui/sortable';
import {arrayRandomNumber, shuffle} from '../utils/utils';

export class SortLetters {
  constructor() {
    this.currentWord = wordsForSort[arrayRandomNumber(wordsForSort)];
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

    modal.appendChild(description);
    modal.appendChild(answer);
    modal.appendChild(submit);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        let res = [];
        const sort = document.querySelector('.sort');
        for (let i = 0; i < sort.childElementCount; i++) {
          res.push(sort.children[i].textContent);
        }
        if (res.join('') === this.currentWord) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}