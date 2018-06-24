const capitals = require('./data/capitals');
import {arrayRandomNumber} from '../utils/utils';

export class Capital {
  constructor(modal) {
    this.currentCapital = capitals[arrayRandomNumber(capitals)];
    this.modal = modal;
    this.render();
  }

  render() {
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

    this.modal.appendChild(img);
    this.modal.appendChild(description);
    form.appendChild(answer);
    form.appendChild(submit);
    this.modal.appendChild(form);
  }
}