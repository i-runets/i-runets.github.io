import $ from 'jquery';
import sortable from 'jquery-ui/sortable';

export class SortNumbers {
  constructor(modal) {
    this.modal = modal;
    this.sortArr = [];
    this.sortedArr = [];
    this.initArrs();
    this.render();
  }

  initArrs() {
    for (let i = 0; i < 5; i++) {
      this.sortArr.push(Math.floor(Math.random() * 100));
    }
    this.sortedArr = this.sortArr.slice().sort((a, b) => {
      return a - b;
    });
  }

  render() {
    const description = document.createElement('p');
    description.textContent = 'Расставить в порядке возрастания:';
    const answer = document.createElement('div');
    answer.classList.add('sort', 'answer');
    this.sortArr.forEach(elem => {
      const span = document.createElement('span');
      span.textContent = elem;
      answer.appendChild(span);
    });
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    $(function() {
      $('.sort').sortable();
    });

    this.modal.appendChild(description);
    this.modal.appendChild(answer);
    this.modal.appendChild(submit);
  }
}