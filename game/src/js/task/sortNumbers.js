import $ from 'jquery';
import sortable from 'jquery-ui/sortable';

export class SortNumbers {
  constructor() {
    this.sortArr = [];
    this.sortedArr = [];
    this.initArrs();
    this.isAnswered = '';
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
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
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
        if (res.join('') === this.sortedArr.join('')) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}