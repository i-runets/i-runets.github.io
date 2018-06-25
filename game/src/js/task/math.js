import {arrayRandomNumber} from '../utils/utils';

export class MathTask {
  constructor() {
    this.isAnswered = '';
    this.equation;
    this.generateEquation();
    this.render();
  }

  generateEquation() {
    const operator = ['+', '-', '*'];
    const firstMember = Math.floor(Math.random() * 15 + 1);
    const secondMember = Math.floor(Math.random() * 15 + 1);
    this.equation = firstMember + operator[arrayRandomNumber(operator)] +
        secondMember;
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
    const description = document.createElement('p');
    description.textContent = `Решите ${this.equation}`;

    const form = document.createElement('form');
    const answer = document.createElement('input');
    answer.required = true;
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    answer.type = 'text';
    answer.classList.add('answer');

    form.appendChild(answer);
    form.appendChild(submit);
    modal.appendChild(description);
    modal.appendChild(form);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        if (+answer.value.trim() === +eval(this.equation)) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}