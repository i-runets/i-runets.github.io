import {arrayRandomNumber} from '../utils/utils';

export class MathTask {
  constructor(modal) {
    this.modal = modal;
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
    this.modal.appendChild(description);
    this.modal.appendChild(form);
  }
}