const capitals = require('./data/capitals');
import {arrayRandomNumber} from '../utils/utils';

export class Capital {
  constructor(modal) {
    this.currentCapital = capitals[arrayRandomNumber(capitals)];
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
    const img = new Image();
    img.src = this.currentCapital.img;
    const description = document.createElement('p');
    description.textContent = 'Столица:';

    const form = document.createElement('form');

    const answer = document.createElement('input');
    answer.required = true;
    answer.type = 'text';
    answer.classList.add('answer');

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    modal.appendChild(img);
    modal.appendChild(description);
    form.appendChild(answer);
    form.appendChild(submit);
    modal.appendChild(form);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        if (answer.value.trim().toLowerCase() ===
            this.currentCapital.capital) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}